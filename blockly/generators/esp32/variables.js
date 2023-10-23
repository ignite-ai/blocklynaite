/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ESP32 (C++) for variable blocks.
 */
'use strict';

goog.module('Blockly.ESP32.variables');

const {NameType} = goog.require('Blockly.Names');
const {esp32Generator: ESP32} = goog.require('Blockly.ESP32');


ESP32['variables_get'] = function(block) {
  // Variable getter
  const code =
      this.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
  return [code, this.ORDER_ATOMIC];
};

ESP32['variables_set'] = function(block) {
  // Variable setter
  const argument0 =
      this.valueToCode(block, 'VALUE', this.ORDER_ASSIGNMENT) || '0';
  const varName =
      this.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
  return varName + ' = ' + argument0 + ';\n';
};

ESP32['variables_set_type'] = function(block) {
  // Variable cast
  const argument0 =
      this.valueToCode(block, 'VARIABLE_SETTYPE_INPUT', this.ORDER_ASSIGNMENT) || '0';
  const varType =
      this.getESP32Type_(Types[block.getFieldValue('VARIABLE_SETTYPE_TYPE')]);
  const code = '(' + varType + ')(' + argument0 + ')';
  return [code, this.ORDER_ATOMIC];
};

ESP32['variables_convert_type'] = function(block) {
  // Variable convertion
  const argument0 =
      this.valueToCode(block, 'VARIABLE_CONVERTTYPE_INPUT', this.ORDER_ASSIGNMENT) || '0';
  const varType =
      this.getESP32Type_(Types[block.getFieldValue('VARIABLE_CONVERTTYPE_TYPE')]);

  let convertionFunction = "";
  switch(varType) {
    case "boolean":
      convertionFunction = "";
      break;
    case "char":
      convertionFunction = ".toInt()";
      break;
    case "int":
      convertionFunction = ".toInt()";
      break;
    case "long":
      convertionFunction = ".toLong()";
      break;
    case "float":
      convertionFunction = ".toFloat()";
      break;
  }
  const code = argument0 + convertionFunction;
  return [code, this.ORDER_ATOMIC];
};