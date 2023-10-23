/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ESP32 (C++) for math blocks.
 */
'use strict';

goog.module('Blockly.ESP32.math');

const {NameType} = goog.require('Blockly.Names');
const {esp32Generator: ESP32} = goog.require('Blockly.ESP32');


ESP32['math_number'] = function(block) {
  // Numeric value.
  let code = parseFloat(block.getFieldValue('NUM'));
  if (code == Infinity) {
    code = 'INFINITY';
  } else if (code == -Infinity) {
    code = '-INFINITY';
  }
  return [code, this.ORDER_ATOMIC];
};

ESP32['math_arithmetic'] = function(block) {
  // Basic arithmetic operators, and power.
  const OPERATORS = {
    ADD: [' + ', this.ORDER_ADDITIVE],
    MINUS: [' - ', this.ORDER_ADDITIVE],
    MULTIPLY: [' * ', this.ORDER_MULTIPLICATIVE],
    DIVIDE: [' / ', this.ORDER_MULTIPLICATIVE],
    POWER: [null, this.ORDER_NONE]
  };
  const tuple = OPERATORS[block.getFieldValue('OP')];
  const operator = tuple[0];
  const order = tuple[1];
  const argument0 = this.valueToCode(block, 'A', order) || '0';
  const argument1 = this.valueToCode(block, 'B', order) || '0';
  let code;
  // Power in C++ requires a special case since it has no operator.
  if (!operator) {
    code = 'pow(' + argument0 + ', ' + argument1 + ')';
    return [code, this.ORDER_UNARY_POSTFIX];
  }
  code = argument0 + operator + argument1;
  return [code, order];
};

ESP32['math_single'] = function(block) {
  // Math operators with single operand.
  const operator = block.getFieldValue('OP');
  let arg, code;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedents.
    arg = this.valueToCode(block, 'NUM', this.ORDER_UNARY_PREFIX) || '0';
    if (arg[0] == '-') {
      arg = ' ' + arg;
    }
    code = '-' + arg;
    return [code, this.ORDER_UNARY_PREFIX];
  }
  if (operator == 'ABS' || operator.substring(0, 5) == 'ROUND') {
    arg = this.valueToCode(block, 'NUM', this.ORDER_UNARY_POSTFIX) || '0';
  } else if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = this.valueToCode(block, 'NUM', this.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = this.valueToCode(block, 'NUM', this.ORDER_NONE) || '0';
  }

  // Cases which generate values without parentheses.
  switch (operator) {
    case 'ABS':
      code = 'abs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'log(' + arg + ')';
      break;
    case 'EXP':
      code = 'exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'sin(' + arg + ' / 180 * M_PI)';
      break;
    case 'COS':
      code = 'cos(' + arg + ' / 180 * M_PI)';
      break;
    case 'TAN':
      code = 'tan(' + arg + ' / 180 * M_PI)';
      break;
  }
  if (code) {
    return [code, this.ORDER_UNARY_POSTFIX];
  }
  // Cases which generate values with parentheses.
  switch (operator) {
    case 'LOG10':
      code = 'log(' + arg + ') / log(10)';
      break;
    case 'ASIN':
      code = 'asin(' + arg + ') / M_PI * 180';
      break;
    case 'ACOS':
      code = 'acos(' + arg + ') / M_PI * 180';
      break;
    case 'ATAN':
      code = 'atan(' + arg + ') / M_PI * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, this.ORDER_MULTIPLICATIVE];
};

ESP32['math_constant'] = function(block) {
  // Constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  var CONSTANTS = {
    'PI': ['M_PI', this.ORDER_UNARY_POSTFIX],
    'E': ['M_E', this.ORDER_UNARY_POSTFIX],
    'GOLDEN_RATIO': ['(1 + sqrt(5)) / 2', this.ORDER_MULTIPLICATIVE],
    'SQRT2': ['M_SQRT2', this.ORDER_UNARY_POSTFIX],
    'SQRT1_2': ['M_SQRT1_2', this.ORDER_UNARY_POSTFIX],
    'INFINITY': ['INFINITY', this.ORDER_ATOMIC]
  };
  return CONSTANTS[block.getFieldValue('CONSTANT')];
};

ESP32['math_number_property'] = function(block) {
  // Check if a number is even, odd, prime, whole, positive, or negative
  // or if it is divisible by certain number. Returns true or false.
  const number_to_check =
      this.valueToCode(block, 'NUMBER_TO_CHECK', this.ORDER_MULTIPLICATIVE) || '0';
  const dropdown_property = block.getFieldValue('PROPERTY');
  let code;
  if (dropdown_property == 'PRIME') {
    const functionName = ESP32.provideFunction_('mathIsPrime',
        'boolean ' + this.DEF_FUNC_NAME + '(int n) {',
        '  // https://en.wikipedia.org/wiki/Primality_test#Naive_methods',
        '  if (n == 2 || n == 3) {',
        '    return true;',
        '  }',
        '  // False if n is NaN, negative, is 1.',
        '  // And false if n is divisible by 2 or 3.',
        '  if (isnan(n) || (n <= 1) || (n == 1) || (n % 2 == 0) || ' +
            '(n % 3 == 0)) {',
        '    return false;',
        '  }',
        '  // Check all the numbers of form 6k +/- 1, up to sqrt(n).',
        '  for (int x = 6; x <= sqrt(n) + 1; x += 6) {',
        '    if (n % (x - 1) == 0 || n % (x + 1) == 0) {',
        '      return false;',
        '    }',
        '  }',
        '  return true;',
        '}\n');
    this.addInclude('math', '#include <math.h>');
    code = functionName + '(' + number_to_check + ')';
    return [code, this.ORDER_UNARY_POSTFIX];
  }
  switch (dropdown_property) {
    case 'EVEN':
      code = number_to_check + ' % 2 == 0';
      break;
    case 'ODD':
      code = number_to_check + ' % 2 == 1';
      break;
    case 'WHOLE':
      this.addInclude('math', '#include <math.h>');
      code = '(floor(' + number_to_check + ') == ' + number_to_check + ')';
      break;
    case 'POSITIVE':
      code = number_to_check + ' > 0';
      break;
    case 'NEGATIVE':
      code = number_to_check + ' < 0';
      break;
    case 'DIVISIBLE_BY':
      var divisor =
          this.valueToCode(block, 'DIVISOR', this.ORDER_MULTIPLICATIVE) || '0';
      code = number_to_check + ' % ' + divisor + ' == 0';
      break;
  }
  return [code, this.ORDER_EQUALITY];
};

ESP32['math_change'] = function(block) {
  // Add to a variable in place.
  const argument0 = this.valueToCode(block, 'DELTA', this.ORDER_ADDITIVE) || '0';
  const varName =
      this.variableDB_.getName(block.getFieldValue('VAR'), NameType.VARIABLE);
  return varName + ' += ' + argument0 + ';\n';
};

// Rounding functions have a single operand.
ESP32['math_round'] = this['math_single'];

// Trigonometry functions have a single operand.
ESP32['math_trig'] = this['math_single'];

// Math functions for lists.
ESP32['math_on_list'] = this.noGeneratorCodeInline;

ESP32['math_modulo'] = function(block) {
  // Remainder computation.
  const argument0 =
      this.valueToCode(block, 'DIVIDEND', this.ORDER_MULTIPLICATIVE) || '0';
  const argument1 =
      this.valueToCode(block, 'DIVISOR', this.ORDER_MULTIPLICATIVE) || '0';
  const code = argument0 + ' % ' + argument1;
  return [code, this.ORDER_MULTIPLICATIVE];
};

ESP32['math_constrain'] = function(block) {
  // Constrain a number between two limits.
  const argument0 = this.valueToCode(block, 'VALUE', this.ORDER_NONE) || '0';
  const argument1 = this.valueToCode(block, 'LOW', this.ORDER_NONE) || '0';
  const argument2 = this.valueToCode(block, 'HIGH', this.ORDER_NONE) || '0';
  const code = '(' + argument0 + ' < ' + argument1 + ' ? ' + argument1 +
      ' : ( ' + argument0 + ' > ' + argument2 + ' ? ' + argument2 + ' : ' +
      argument0 + '))';
  return [code, this.ORDER_UNARY_POSTFIX];
};

ESP32['math_random_int'] = function(block) {
  // Random integer between [X] and [Y].
  const argument0 = this.valueToCode(block, 'FROM', this.ORDER_NONE) || '0';
  const argument1 = this.valueToCode(block, 'TO', this.ORDER_NONE) || '0';
  const functionName =
      this.variableDB_.getDistinctName('math_random_int', Generator.NAME_TYPE);
  this.math_random_int.random_function = functionName;
  const funcName = ESP32.provideFunction_('mathRandomInt',
      'int ' + this.DEF_FUNC_NAME + '(int min, int max) {',
      '  if (min > max) {',
      '    // Swap min and max to ensure min is smaller.',
      '    int temp = min;',
      '    min = max;',
      '    max = temp;',
      '  }',
      '  return min + (rand() % (max - min + 1));',
      '}\n');
  const code = funcName + '(' + argument0 + ', ' + argument1 + ')';
  return [code, this.ORDER_UNARY_POSTFIX];
};

ESP32['math_random_float'] = function(block) {
  // Random fraction between 0 and 1.
  return ['((float)(rand()) / RAND_MAX)', this.ORDER_UNARY_POSTFIX];
};