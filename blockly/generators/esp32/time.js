/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ESP32 (C++) for the time blocks.
 */
'use strict';

goog.module('Blockly.ESP32.time');

const {esp32Generator: ESP32} = goog.require('Blockly.ESP32');


ESP32['time_delay'] = function(block) {
  const delayTime = this.valueToCode(block, 'DELAY_TIME_MILI', this.ORDER_ATOMIC) || '0';
  const code = 'delay(' + delayTime + ');\n';
  return code;
};

ESP32['time_delaymicros'] = function(block) {
  const delayTimeMs = this.valueToCode(block, 'DELAY_TIME_MICRO', this.ORDER_ATOMIC) || '0';
  const code = 'delayMicroseconds(' + delayTimeMs + ');\n';
  return code;
};

ESP32['time_millis'] = function(block) {
  const code = 'millis()';
  return [code, this.ORDER_ATOMIC];
};

ESP32['time_micros'] = function(block) {
  const code = 'micros()';
  return [code, this.ORDER_ATOMIC];
};

ESP32['infinite_loop'] = function(block) {
  return 'while(true);\n';
};
