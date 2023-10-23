/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ESP32 (C++) for text blocks.
 */
'use strict';

goog.module('Blockly.ESP32.text');

const {NameType} = goog.require('Blockly.Names');
const {esp32Generator: ESP32} = goog.require('Blockly.ESP32');


ESP32['text'] = function(block) {
  // Text value.
  const code = this.quote_(block.getFieldValue('TEXT'));
  return [code, this.ORDER_ATOMIC];
};

ESP32['text_join'] = function(block) {
  // Create a string made up of any number of elements of any type.
  let code;
  if (block.itemCount_ == 0) {
    return ['""', this.ORDER_ATOMIC];
  } else if (block.itemCount_ == 1) {
    const argument0 = this.valueToCode(block, 'ADD0', this.ORDER_UNARY_POSTFIX) || '""';
    code = 'String(' + argument0 + ')';
    return [code, this.ORDER_UNARY_POSTFIX];
  } else {
    let argument;
    let code = [];
    for (let n = 0; n < block.itemCount_; n++) {
      argument = this.valueToCode(block, 'ADD' + n, this.ORDER_NONE);
      if (argument == '') {
        code[n] = '""';
      } else {
        code[n] = 'String(' + argument + ')';
      }
    }
    code = code.join(' + ');
    return [code, this.ORDER_UNARY_POSTFIX];
  }
};

ESP32['text_append'] = function(block) {
  // Append to a variable in place.
  const varName = this.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
  let argument0 = this.valueToCode(block, 'TEXT', this.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  return varName + ' += ' + argument0 + ';\n';
};

ESP32['text_length'] = function(block) {
  // String or array length.
  const argument0 = this.valueToCode(block, 'VALUE', this.ORDER_UNARY_POSTFIX) || '""';
  const code = 'String(' + argument0 + ').length()';
  return [code, this.ORDER_UNARY_POSTFIX];
};

ESP32['text_isEmpty'] = function(block) {
  // Is the string null or array empty?
  let func = [];
  func.push('boolean ' + this.DEF_FUNC_NAME + '(String msg) {');
  func.push('  if (msg.length() == 0) {');
  func.push('    return true;');
  func.push('  } else {');
  func.push('    return false;');
  func.push('  }');
  func.push('}');
  const funcName = this.addFunction('isStringEmpty', func.join('\n'));
  let argument0 = this.valueToCode(block, 'VALUE', this.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  const code = funcName + '(' + argument0 + ')';
  return [code, this.ORDER_UNARY_POSTFIX];
};

ESP32['text_trim'] = function(block) {
  // Trim spaces.
  const OPERATORS = {LEFT: '.trim()', RIGHT: '.trim()', BOTH: '.trim()'};
  const operator = OPERATORS[block.getFieldValue('MODE')];
  let argument0 = this.valueToCode(block, 'TEXT', this.ORDER_UNARY_POSTFIX);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  return [argument0 + operator, this.ORDER_UNARY_POSTFIX];
};

ESP32['text_print'] = function(block) {
  // Print statement.
  const serialId = this.Boards.selected.serial[0][1];
  const setupCode = serialId + '.begin(9600);';
  this.addSetup('serial_' + serialId, setupCode, false);
  let argument0 = this.valueToCode(block, 'TEXT', this.ORDER_NONE);
  if (argument0 == '') {
    argument0 = '""';
  } else {
    argument0 = 'String(' + argument0 + ')';
  }
  return serialId + '.print(' + argument0 + ');\n';
};

ESP32['text_prompt_ext'] = function(block) {
  // Prompt function.
  const serialId = this.Boards.selected.serial[0][1];
  const returnType = block.getFieldValue('TYPE');

  let func = [];
  const toNumber = block.getFieldValue('TYPE') === 'NUMBER';
  if (toNumber) {
    func.push('int ' + this.DEF_FUNC_NAME + '(String msg) {');
  } else {
    func.push('String ' + this.DEF_FUNC_NAME + '(String msg) {');
  }
  func.push('  ' + serialId + '.println(msg);');
  func.push('  boolean stringComplete = false;');
  if (toNumber) {
    func.push('  int content = 0;');
  } else {
    func.push('  String content = "";');
  }
  func.push('  while (stringComplete == false) {');
  func.push('    if (' + serialId + '.available()) {');
  if (toNumber) {
    func.push('      content = ' + serialId + '.parseInt();');
    func.push('      stringComplete = true;');
  } else {
    func.push('      char readChar = (char)' + serialId + '.read();');
    func.push('      if (readChar == \'\\n\' || readChar == \'\\r\') {');
    func.push('        stringComplete = true;');
    func.push('      } else {');
    func.push('        content += readChar;');
    func.push('      }');
  }
  func.push('    }');
  func.push('  }');
  func.push('  while(Serial.available()) { Serial.read(); };');
  func.push('  return content;');
  func.push('}');
  const funcName = this.addFunction('getUserInputPrompt' + returnType, func.join('\n'));

  const setupCode = serialId + '.begin(9600);';
  this.addSetup('serial_' + serialId, setupCode, false);

  const msg = this.valueToCode(block, 'TEXT', this.ORDER_NONE) || '""';
  const code = funcName + '(' + msg + ')';

  return [code, this.ORDER_UNARY_POSTFIX];
};


/* ***************************************************************** *
 * The rest of the blocks have been left unimplemented, as they have *
 * been removed from the toolbox and not used for ESP32 code.      *
 * ***************************************************************** */
ESP32['text_endString'] = function(block) {
  return ['', ESP32.ORDER_UNARY_POSTFIX];
};

ESP32['text_indexOf'] = function(block) {
  return ['', ESP32.ORDER_UNARY_POSTFIX];
};

ESP32['text_charAt'] = function(block) {
  return ['', ESP32.ORDER_UNARY_POSTFIX];
};

ESP32['text_getSubstring'] = function(block) {
  return ['', ESP32.ORDER_UNARY_POSTFIX];
};

ESP32['text_changeCase'] = function(block) {
  return ['', ESP32.ORDER_UNARY_POSTFIX];
};

ESP32['text_prompt'] = function(block) {
  return ['', ESP32.ORDER_UNARY_POSTFIX];
};