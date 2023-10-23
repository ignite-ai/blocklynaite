/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ESP32 (C++) for procedure blocks.
 */
'use strict';

goog.module('Blockly.ESP32.procedures');

const {NameType} = goog.require('Blockly.Names');
const {esp32Generator: ESP32} = goog.require('Blockly.ESP32');


ESP32['procedures_defreturn'] = function(block) {
  // Define a procedure with a return value.
  const funcName =
      this.variableDB_.getName(block.getFieldValue('NAME'), NameType.PROCEDURE);
  let branch = this.statementToCode(block, 'STACK');
  if (this.STATEMENT_PREFIX) {
    branch = this.prefixLines(
        this.STATEMENT_PREFIX.replace(/%1/g,
        '\'' + block.id + '\''), this.INDENT) + branch;
  }
  if (this.INFINITE_LOOP_TRAP) {
    branch =
        this.INFINITE_LOOP_TRAP.replace(/%1/g, '\'' + block.id + '\'') + branch;
  }
  let returnValue =
      this.valueToCode(block, 'RETURN', this.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }

  const args = [];
  for (let x = 0; x < block.arguments_.length; x++) {
    args[x] =
        this.getArduinoType_(block.getArgType(block.arguments_[x])) +
        ' ' +
        this.variableDB_.getName(block.arguments_[x], NameType.VARIABLE);
  }

  let returnType = Types.NULL;
  if (block.getReturnType) {
    returnType = block.getReturnType();
  }
  returnType = this.getArduinoType_(returnType);

  let code = returnType + ' ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}';
  code = this.scrub_(block, code);
  this.userFunctions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
ESP32['procedures_defnoreturn'] = this['procedures_defreturn'];

ESP32['procedures_callreturn'] = function(block) {
  // Call a procedure with a return value.
  const funcName =
      this.nameDB_.getName(block.getFieldValue('NAME'), NameType.PROCEDURE);
  const args = [];
  for (let x = 0; x < block.arguments_.length; x++) {
    args[x] = this.valueToCode(block, 'ARG' + x, this.ORDER_NONE) || 'null';
  }
  const code = funcName + '(' + args.join(', ') + ')';
  return [code, this.ORDER_UNARY_POSTFIX];
};

ESP32['procedures_callnoreturn'] = function(block) {
  // Call a procedure with no return value.
  // Generated code is for a function call as a statement is the same as a
  // function call as a value, with the addition of line ending.
  const funcName = this.nameDB_.getName(
      block.getFieldValue('NAME'), NameType.PROCEDURE);
  const args = [];
  for (let x = 0; x < block.arguments_.length; x++) {
    args[x] = this.valueToCode(block, 'ARG' + x, this.ORDER_NONE) || 'null';
  }
  const code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

ESP32['procedures_ifreturn'] = function(block) {
  // Conditionally return value from a procedure.
  var condition = Blockly.Arduino.valueToCode(block, 'CONDITION',
      Blockly.Arduino.ORDER_NONE) || 'false';
  var code = 'if (' + condition + ') {\n';
  if (block.hasReturnValue_) {
    var value = Blockly.Arduino.valueToCode(block, 'VALUE',
        Blockly.Arduino.ORDER_NONE) || 'null';
    code += '  return ' + value + ';\n';
  } else {
    code += '  return;\n';
  }
  code += '}\n';
  return code;
};

ESP32['esp32_functions'] = function(block) {
  // Edited version of Blockly.Generator.prototype.statementToCode
  function statementToCodeNoTab(block, name) {
    const targetBlock = block.getInputTargetBlock(name);
    const code = this.blockToCode(targetBlock);
    if (!goog.isString(code)) {
      throw 'Expecting code from statement block "' + targetBlock.type + '".';
    }
    return code;
  }

  const setupBranch = this.statementToCode(block, 'SETUP_FUNC');
  if (setupBranch) {
    this.addSetup('userSetupCode', setupBranch, true);
  }

  return this.statementToCodeNoTab(block, 'LOOP_FUNC');
};