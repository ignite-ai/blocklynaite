/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ESP32 (C++) for logic blocks.
 */
'use strict';

goog.module('Blockly.ESP32.logic');

const {esp32Generator: ESP32} = goog.require('Blockly.ESP32');


ESP32['controls_if'] = function(block) {
  // If/elseif/else condition.
  let n = 0;
  let argument =
      this.valueToCode(block, 'IF' + n, this.ORDER_NONE) || 'false';
  let branch = this.statementToCode(block, 'DO' + n);
  let code = 'if (' + argument + ') {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument =
        this.valueToCode(block, 'IF' + n, this.ORDER_NONE) || 'false';
    branch = this.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = this.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + '\n';
};

ESP32['logic_compare'] = function(block) {
  const OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  const operator = OPERATORS[block.getFieldValue('OP')];
  const order =
      (operator == '==' || operator == '!=') ? this.ORDER_EQUALITY
      : this.ORDER_RELATIONAL;
  const argument0 = this.valueToCode(block, 'A', order) || '0';
  const argument1 = this.valueToCode(block, 'B', order) || '0';
  const code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

ESP32['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  const operator = (block.getFieldValue('OP') == 'AND') ? '&&' : '||';
  const order =
      (operator == '&&') ? this.ORDER_LOGICAL_AND : this.ORDER_LOGICAL_OR;
  let argument0 = this.valueToCode(block, 'A', order) || 'false';
  let argument1 = this.valueToCode(block, 'B', order) || 'false';
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
    const defaultArgument = (operator == '&&') ? 'true' : 'false';
    if (!argument0) {
      argument0 = defaultArgument;
    }
    if (!argument1) {
      argument1 = defaultArgument;
    }
  }
  const code = argument0 + ' ' + operator + ' ' + argument1;
  return [code, order];
};

ESP32['logic_negate'] = function(block) {
  // Negation.
  const order = this.ORDER_UNARY_PREFIX;
  const argument0 = this.valueToCode(block, 'BOOL', order) || 'false';
  const code = '!' + argument0;
  return [code, order];
};

ESP32['logic_boolean'] = function(block) {
  // Boolean values true and false.
  const code = (block.getFieldValue('BOOL') == 'TRUE') ? 'true' : 'false';
  return [code, this.ORDER_ATOMIC];
};

ESP32['logic_null'] = function(block) {
  // Null data type.
  return ['NULL', this.ORDER_ATOMIC];
};

ESP32['logic_ternary'] = function(block) {
  // Ternary operator.
  const valueIf = this.valueToCode(block, 'IF', this.ORDER_CONDITIONAL) || 'false';
  const valueThen = this.valueToCode(block, 'THEN', this.ORDER_CONDITIONAL) || 'null';
  const valueElse = this.valueToCode(block, 'ELSE', this.ORDER_CONDITIONAL) || 'null';
  const code = valueIf + ' ? ' + valueThen + ' : ' + valueElse;
  return [code, this.ORDER_CONDITIONAL];
};