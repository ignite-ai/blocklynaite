/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Helper functions for generating ESP32 (C++) for blocks.
 * Based on work of Fred Lin (gasolin@gmail.com) for Blocklyduino.
 */
'use strict';

goog.module('Blockly.ESP32');

//const {staticTyping} = goog.require('Blockly.StaticTyping');
const {stringUtils} = goog.require('Blockly.utils.string');
const {Block} = goog.requireType('Blockly.Block');
const {CodeGenerator} = goog.require('Blockly.CodeGenerator');
const {inputTypes} = goog.require('Blockly.inputTypes');
const {Names} = goog.require('Blockly.Names');
const {Workspace} = goog.requireType('Blockly.Workspace');


/**
 * ESP32 code generator.
 * @type {!CodeGenerator}
 */
const ESP32 = new CodeGenerator('ESP32');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 */
ESP32.addReservedWords(
    'setup,loop,if,else,for,switch,case,while,do,break,continue,return,goto,' +
    'define,include,HIGH,LOW,INPUT,OUTPUT,INPUT_PULLUP,true,false,integer,' +
    'constants,floating,point,void,boolean,char,unsigned,byte,int,word,long,' +
    'float,double,string,String,array,static,volatile,const,sizeof,pinMode,' +
    'digitalWrite,digitalRead,analogReference,analogRead,analogWrite,tone,' +
    'noTone,shiftOut,shitIn,pulseIn,millis,micros,delay,delayMicroseconds,' +
    'min,max,abs,constrain,map,pow,sqrt,sin,cos,tan,randomSeed,random,' +
    'lowByte,highByte,bitRead,bitWrite,bitSet,bitClear,bit,attachInterrupt,' +
    'detachInterrupt,interrupts,noInterrupts,Blockly'
);

/** Order of operation ENUMs. */
ESP32.ORDER_ATOMIC = 0;         // 0 "" ...
ESP32.ORDER_UNARY_POSTFIX = 1;  // expr++ expr-- () [] .
ESP32.ORDER_UNARY_PREFIX = 2;   // -expr !expr ~expr ++expr --expr
ESP32.ORDER_MULTIPLICATIVE = 3; // * / % ~/
ESP32.ORDER_ADDITIVE = 4;       // + -
ESP32.ORDER_SHIFT = 5;          // << >>
ESP32.ORDER_RELATIONAL = 6;     // >= > <= <
ESP32.ORDER_EQUALITY = 7;       // == != === !==
ESP32.ORDER_BITWISE_AND = 8;    // &
ESP32.ORDER_BITWISE_XOR = 9;    // ^
ESP32.ORDER_BITWISE_OR = 10;    // |
ESP32.ORDER_LOGICAL_AND = 11;   // &&
ESP32.ORDER_LOGICAL_OR = 12;    // ||
ESP32.ORDER_CONDITIONAL = 13;   // expr ? expr : expr
ESP32.ORDER_ASSIGNMENT = 14;    // = *= /= ~/= %= += -= <<= >>= &= ^= |=
ESP32.ORDER_NONE = 99;          // (...)

/**
 * A list of types tasks that the pins can be assigned. Used to track usage and
 * warn if the same pin has been assigned to more than one task.
 * TODO check these
*/
ESP32.PinTypes = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT',
  PWM: 'PWM',
  SERVO: 'SERVO',
  STEPPER: 'STEPPER',
  SERIAL: 'SERIAL',
  I2C: 'I2C/TWI',
  SPI: 'SPI'
};

/**
 * Whether the init method has been called.
 * @type {?boolean}
 */
ESP32.isInitialized = false;

/**
 * Initialises the database of global definitions, the setup function, function
 * names, and variable names.
 * @param {Workspace} workspace Workspace to generate code from.
 */
ESP32.init = function(workspace) {
  // Call CodeGenerator's init.
  Object.getPrototypeOf(this).init.call(this);

  if (!this.nameDB_) {
    this.nameDB_ = new Names(this.RESERVED_WORDS_);
  } else {
    this.nameDB_.reset();
  }
  this.nameDB_.setVariableMap(workspace.getVariableMap());
  this.nameDB_.populateVariables(workspace);
  this.nameDB_.populateProcedures(workspace);

  /** 
   * Create dictionaries for inlcudes, definitions, variables, generator functions,
   * user functions, setups, pins
   */ 
  this.includes_ = Object.create(null);
  this.definitions_ = Object.create(null);
  this.variables_ = Object.create(null);
  this.generatorFunctions_ = Object.create(null);
  this.userFunctions_ = Object.create(null);
  this.setups_ = Object.create(null);
  this.pins_ = Object.create(null);

  /**
   * Create a dictionary mapping desired function names in definitions_
   * to actual function names (to avoid collisions with user functions)
   */
  this.functionNames_ = Object.create(null);

  // Iterate through to capture all blocks types and set the function arguments
  const varsWithTypes = this.StaticTyping.collectVarsWithTypes(workspace);
  this.StaticTyping.setProcedureArgs(workspace, varsWithTypes);

  // Set variable declarations with their C++ type in the defines dictionary
  for (const varName in varsWithTypes) {
    this.addVariable(varName,
        this.getESP32Type_(varsWithTypes[varName]) +' ' +
        this.nameDB_.getName(varName, Variables.NAME_TYPE) + ';');
  }

  this.isInitialized = true;
};

/**
 * Prepend the generated code with define and include statements.
 * @param {string} code Generated main program code.
 * @return {string} Completed code.
 */
ESP32.finish = function(code) {
  // Convert the includes, definitions, and functions dictionaries into lists
  let includes = [], definitions = [], variables = [], functions = [];
  for (const name in this.includes_) {
    includes.push(this.includes_[name]);
  }
  if (includes.length) {
    includes.push('\n');
  }
  for (const name in this.variables_) {
    variables.push(this.variables_[name]);
  }
  if (variables.length) {
    variables.push('\n');
  }
  for (const name in this.definitions_) {
    definitions.push(this.definitions_[name]);
  }
  if (definitions.length) {
    definitions.push('\n');
  }
  for (const name in this.codeFunctions_) {
    functions.push(this.codeFunctions_[name]);
  }
  for (const name in this.userFunctions_) {
    functions.push(this.userFunctions_[name]);
  }
  if (functions.length) {
    functions.push('\n');
  }

  // Add userSetupCode at the end of the setup function
  let setups = [''], userSetupCode= '';
  if (this.setups_['userSetupCode'] !== undefined) {
    userSetupCode = '\n' + this.setups_['userSetupCode'];
    delete this.setups_['userSetupCode'];
  }
  for (const name in this.setups_) {
    setups.push(this.setups_[name]);
  }
  if (userSetupCode) {
    setups.push(userSetupCode);
  }

  // Clean up temporary data
  delete this.includes_;
  delete this.definitions_;
  delete this.codeFunctions_;
  delete this.userFunctions_;
  delete this.functionNames_;
  delete this.setups_;
  delete this.pins_;
  this.nameDB_.reset();

  const allDefs = includes.join('\n') + variables.join('\n') +
      definitions.join('\n') + functions.join('\n\n');
  const setup = 'void setup() {' + setups.join('\n  ') + '\n}\n\n';
  const loop = 'void loop() {\n  ' + code.replace(/\n/g, '\n  ') + '\n}';
  return allDefs + setup + loop;
};

/**
 * Adds a library to the includes section.
 * Include can't get overriden.
 * @param {!string} includeTag Identifier for the include.
 * @param {!string} code Code to be included.
 */
ESP32.addInclude = function(includeTag, code) {
  if (this.includes_[includeTag] === undefined) {
    this.includes_[includeTag] = code;
  }
};

/**         
 * Adds a global declaration.
 * Global declarations can't get overriden.
 * @param {!string} declarationTag Identifier for this declaration.
 * @param {!string} code Code to be added.
 */
ESP32.addDeclaration = function(declarationTag, code) {
  if (this.definitions_[declarationTag] === undefined) {
    this.definitions_[declarationTag] = code;
  }
};

/**
 * Adds a global variable.
 * Value can be overwritten if overwrite is set to True.
 * @param {!string} varName Name of the declared variable.
 * @param {!string} code Code to be added.
 * @param {boolean=} overwrite Flag to allow/disallow overwriting.
 * @return {!boolean} If previous value was overwritten.
 */
ESP32.addVariable = function(varName, code, overwrite) {
  if (overwrite || (this.variables_[varName] === undefined)) {
    this.variables_[varName] = code;
    return true;
  }
  return false;
};

/**
 * Adds code to the setup() function.
 * Code can be overwritten if overwrite is set to True.
 * @param {!string} setupTag Tag for the added code.
 * @param {!string} code Code to be added.
 * @param {boolean=} overwrite Flag to allow/disallow overwriting.
 * @return {!boolean} If previous code was overwritten.
 */
ESP32.addSetup = function(setupTag, code, overwrite) {
  if (overwrite || (this.setups_[setupTag] === undefined)) {
    this.setups_[setupTag] = code;
    return true
  }
  return false;
};

/**
 * Adds code as a function.
 * @param {!string} preferedName Function name.
 * @param {!string} code Code to be added.
 * @return {!string} Unique function name.
 */
ESP32.addFunction = function(preferedName, code) {
  if (this.codeFunctions_[preferedName] === undefined) {
    const uniqueName = this.nameDB_.getDistinctName(
        preferedName, CodeGenerator.NAME_TYPE);
        this.codeFunctions_[preferedName] =
        code.replace(this.DEF_FUNC_NAME, uniqueName);
        this.functionNames_[preferedName] = uniqueName;
  }
  return this.functionNames_[preferedName];
};

/**
 * Description.
 * @param {!Block} block Description.
 * @param {!string} pin Description.
 * @param {!string} pinType Description.
 * @param {!string} warningTag Description.
 */
ESP32.reservePin = function(block, pin, pinType, warningTag) {
  if (this.pins_[pin] !== undefined) {
    if (this.pins_[pin] != pinType) {
      block.setWarningText(Msg.ARD_PIN_WARN1.replace('%1', pin)
		.replace('%2', warningTag).replace('%3', pinType)
		.replace('%4', this.pins_[pin]), warningTag);
    } else {
      block.setWarningText(null, warningTag);
    }
  } else {
    this.pins_[pin] = pinType;
    block.setWarningText(null, warningTag);
  }
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
ESP32.scrubNakedValue = function(line) {
  return line + ';\n';
};

/**
 * Encode a string as a properly escaped ESP32 string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} ESP32 string.
 * @private
 */
ESP32.quote_ = function(string) {
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\$/g, '\\$')
                 .replace(/'/g, '\\\'');
  return '\"' + string + '\"';
};

/**
 * Common tasks for generating ESP32 from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Block} block The current block.
 * @param {string} code The ESP32 code created for this block.
 * @return {string} ESP32 code with comments and subsequent blocks added.
 * @this {CodeGenerator}
 * @private
 */
ESP32.scrub_ = function(block, code) {
  if (code === null) { return ''; } // Block has handled code generation itself

  let commentCode = '';
  // Only collect comments for blocks that aren't inline
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    let comment = block.getCommentText();
    if (comment) {
      commentCode += this.prefixLines(comment, '// ') + '\n';
    }
    // Collect comments for all value arguments
    // Don't collect comments for nested statements
    for (let i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == inputTypes.VALUE) {
        const childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          comment = this.allNestedComments(childBlock);
          if (comment) {
            commentCode += this.prefixLines(comment, '// ');
          }
        }
      }
    }
  }
  const nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  const nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Generates ESP32 Types from a Blockly Type.
 * @param {!Type} typeBlockly The Blockly type to be converted.
 * @return {string} ESP32 type for the respective Blockly input type.
 * @private
 */
ESP32.getESP32Type_ = function(typeBlockly) {
  switch (typeBlockly.typeId) {
    case Types.SHORT_NUMBER.typeId:
      return 'char';
    case Types.NUMBER.typeId:
      return 'int';
    case Types.LARGE_NUMBER.typeId:
      return 'long';
    case Types.DECIMAL.typeId:
      return 'float';
    case Types.TEXT.typeId:
      return 'String';
    case Types.CHARACTER.typeId:
      return 'char';
    case Types.BOOLEAN.typeId:
      return 'boolean';
    case Types.NULL.typeId:
      return 'void';
    case Types.UNDEF.typeId:
      return 'undefined';
    case Types.CHILD_BLOCK_MISSING.typeId:
      return 'int';
    default:
      return 'Invalid Blockly Type';
    }
};

/** Used for not-yet-implemented block code generators */
ESP32.noGeneratorCodeInline = function() {
  return ['', this.ORDER_ATOMIC];
};

/** Used for not-yet-implemented block code generators */
ESP32.noGeneratorCodeLine = function() { return ''; };