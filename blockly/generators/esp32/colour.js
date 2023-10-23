/**
 * @license
 * Copyright 2016 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Generating ESP32 (C++) for color blocks.
 */
'use strict';

goog.module('Blockly.ESP32.colour');

const {esp32Generator: ESP32} = goog.require('Blockly.ESP32');


ESP32['colour_picker'] = ESP32.noGeneratorCodeInline;

ESP32['colour_random'] = ESP32.noGeneratorCodeInline;

ESP32['colour_rgb'] = ESP32.noGeneratorCodeInline;

ESP32['colour_blend'] = ESP32.noGeneratorCodeInline;