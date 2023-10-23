/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ESP32 (C++) for the loop blocks.
 */
'use strict';

goog.module('Blockly.ESP32.loops');

const stringUtils = goog.require('Blockly.utils.string');
const {NameType} = goog.require('Blockly.Names');
const {esp32Generator: ESP32} = goog.require('Blockly.ESP32');


ESP32['controls_repeat'] = function(block) {
  // repeat block using a For loop statement (number in dropdown).
  const repeats = Number(block.getFieldValue('TIMES'));
  let branch = this.statementToCode(block, 'DO');
  branch = this.addLoopTrap(branch, block.id);
  const loopVar =
      this.nameDB_.getName(block.getFieldValue('count'), NameType.VARIABLE);
  const code = 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + repeats + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

ESP32['controls_repeat_ext'] = function(block) {
  // repeat block using a For loop statement (external number block).
  const repeats = this.valueToCode(block, 'TIMES', this.ORDER_ADDITIVE) || '0';
  let branch = this.statementToCode(block, 'DO');
  branch = this.addLoopTrap(branch, block.id);
  let code = '';
  const loopVar =
      this.nameDB_.getName(block.getFieldValue('count'), NameType.VARIABLE);
  let endVar = repeats;
  if (!repeats.match(/^\w+$/) && !isNumber(repeats)) {
    endVar = 
        this.nameDB_.getName(block.getFieldValue('repeat_end'), NameType.VARIABLE);
    code += 'int ' + endVar + ' = ' + repeats + ';\n';
  }
  code += 'for (int ' + loopVar + ' = 0; ' +
      loopVar + ' < ' + endVar + '; ' +
      loopVar + '++) {\n' +
      branch + '}\n';
  return code;
};

ESP32['controls_whileUntil'] = function(block) {
  // Do while/until loop.
  const until = block.getFieldValue('MODE') == 'UNTIL';
  let argument0 = this.valueToCode(block, 'BOOL',
      until ? this.ORDER_LOGICAL_OR :
      this.ORDER_NONE) || 'false';
  let branch = this.statementToCode(block, 'DO');
  branch = this.addLoopTrap(branch, block.id);
  if (until) {
    if (!argument0.match(/^\w+$/)) {
      argument0 = '(' + argument0 + ')';
    }
    argument0 = '!' + argument0;
  }
  return 'while (' + argument0 + ') {\n' + branch + '}\n';
};

ESP32['controls_for'] = function(block) {
  // For loop.
  const variable0 = 
      this.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
  const argument0 = this.valueToCode(block, 'FROM', this.ORDER_ASSIGNMENT) || '0';
  const argument1 = this.valueToCode(block, 'TO', this.ORDER_ASSIGNMENT) || '0';
  const increment = this.valueToCode(block, 'BY', this.ORDER_ASSIGNMENT) || '1';
  let branch = this.statementToCode(block, 'DO');
  branch = this.addLoopTrap(branch, block.id);
  let code = '';
  if (stringUtils.isNumber(argument0) && stringUtils.isNumber(argument1) &&
      stringUtils.isNumber(increment)) {
    // All arguments are simple numbers.
    const up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for (' + variable0 + ' = ' + argument0 + '; ' +
        variable0 + (up ? ' <= ' : ' >= ') + argument1 + '; ' +
        variable0;
    const step = Math.abs(parseFloat(increment));
    if (step == 1) {
      code += up ? '++' : '--';
    } else {
      code += (up ? ' += ' : ' -= ') + step;
    }
    code += ') {\n' + branch + '}\n';
  } else {
    code = '';
    let incValue
    // Cache non-trivial values to variables to prevent repeated look-ups.
    let startVar = argument0;
    if (!argument0.match(/^\w+$/) && !stringUtils.isNumber(argument0)) {
      startVar =
          this.nameDB_.getName(block.getFieldValue('_start'), NameType.VARIABLE);
      code += 'int ' + startVar + ' = ' + argument0 + ';\n';
    }
    let endVar = argument1;
    if (!argument1.match(/^\w+$/) && !stringUtils.isNumber(argument1)) {
      endVar =
          this.nameDB_.getName(block.getFieldValue('_end'), NameType.VARIABLE);
      code += 'int ' + endVar + ' = ' + argument1 + ';\n';
    }
    // Determine loop direction at start, in case one of the bounds
    // changes during loop execution.
    incValue =
        this.nameDB_.getName(block.getFieldValue('_inc'), NameType.VARIABLE);
    code += 'int ' + incValue + ' = ';
    if (stringUtils.isNumber(increment)) {
      code += Math.abs(increment) + ';\n';
    } else {
      code += 'abs(' + increment + ');\n';
    }
    code += 'if (' + startVar + ' > ' + endVar + ') {\n';
    code += this.INDENT + incValue + ' = -' + incValue + ';\n';
    code += '}\n';
    code += 'for (' + variable0 + ' = ' + startVar + ';\n' +
        '     ' + incVar + ' >= 0 ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '     ' + variable0 + ' += ' + incValue + ') {\n' +
        branch + '}\n';
  }
  return code;
};

ESP32['controls_forEach'] = function(block) {
// For each loop.
  const variable0 =
      this.nameDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
  const argument0 = this.valueToCode(block, 'LIST', this.ORDER_NONE) || '{}';
  let branch = this.statementToCode(block, 'DO');
  branch = this.addLoopTrap(branch, block.id);
  const code = 'for (' + variable0 + ' : ' + argument0 + ') {\n' +
      branch + '}\n';
  return code;
}

ESP32['controls_flow_statements'] = function(block) {
  // Flow statements: continue, break.
  switch (block.getFieldValue('FLOW')) {
    case 'BREAK':
      return 'break;\n';
    case 'CONTINUE':
      return 'continue;\n';
  }
  throw 'Unknown flow statement.';
};