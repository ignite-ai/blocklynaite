var Blocklynaite = Blocklynaite || {};
Blocklynaite.LOCALISED_TEXT = {
  translationLanguage: "English",
  title: "IoT-Workshop",
  blocks: "Blocks",
  /* Menu */
  open: "Open",
  save: "Save",
  deleteAll: "Delete All",
  settings: "Settings",
  documentation: "Documentation",
  reportBug: "Report Bug",
  examples: "Examples",
  /* Settings */
  compilerLocation: "Compiler Location",
  compilerLocationDefault: "Compiler Location unknown",
  sketchFolder: "Sketch Folder",
  sketchFolderDefault: "Sketch Folder unknown",
  ESP32Board: "ESP 32 Board",
  ESP32BoardDefault: "ESP 32 Board unknown",
  comPort: "COM Port",
  comPortDefault: "COM Port unknown",
  defaultIdeButton: "Default IDE Button",
  defaultIdeButtonDefault: "IDE options unknown",
  language: "Language",
  languageDefault: "Language unknown",
  sketchName: "Sketch Name",
  /* ESP 32 console output */
  ESP32OpMainTitle: "ESP 32 IDE output",
  ESP32OpWaiting: "Waiting for the IDE output...",
  ESP32OpUploadedTitle: "Successfully Uploaded Sketch",
  ESP32OpVerifiedTitle: "Successfully Verified Sketch",
  ESP32OpOpenedTitle: "Sketch opened in IDE",
  ESP32OpOpenedBody: "The sketch should be loaded in the ESP 32 IDE.",
  ESP32OpErrorTitle: "There has been an error",
  ESP32OpErrorIdContext_0: "No error.",
  ESP32OpErrorIdContext_1: "Build or Upload failed.",
  ESP32OpErrorIdContext_2: "Sketch not found.",
  ESP32OpErrorIdContext_3: "Invalid command line argument.",
  ESP32OpErrorIdContext_4: "Preference passed to 'get-pref' flag does not exist.",
  ESP32OpErrorIdContext_5: "Not Clear, but ESP 32 IDE sometimes errors with this.",
  ESP32OpErrorIdContext_50: "Unexpected error code from ESP 32 IDE",
  ESP32OpErrorIdContext_51: "Could not create sketch file",
  ESP32OpErrorIdContext_52: "Invalid path to internally created sketch file",
  ESP32OpErrorIdContext_53: "Unable to find ESP 32 IDE<br>" +
                              "The compiler directory has not been set correctly.<br>" +
                              "Please ensure the path is correct in the Settings.",
  ESP32OpErrorIdContext_54: "What should we do with the Sketch?<br>" +
                              "The launch IDE option has not been set.<br>" +
                              "Please select an IDE option in the Settings.",
  ESP32OpErrorIdContext_55: "Serial Port unavailable<br>" +
                              "The Serial Port is not accessible.<br>" +
                              "Please check if the ESP 32 is correctly connected to the PC and select the Serial Port in the Settings.",
  ESP32OpErrorIdContext_56: "Unknown ESP 32 Board<br>" +
                              "The ESP 32 Board has not been set.<br>" +
                              "Please select the appropriate ESP 32 Board from the settings.",
  ESP32OpErrorIdContext_52: "Unexpected server error.",
  ESP32OpErrorIdContext_64: "Unable to parse sent JSON.",
  ESP32OpErrorUnknown: "Unexpected error",
  /* Modals */
  noServerTitle: "Blocklynaite app not running",
  noServerTitleBody: "<p>For all the Blocklynaite features to be enabled, the Blocklynaite desktop application must be running locally on your computer.</p>" +
                     "<p>If you are using an online version you will not be able to configure the settings nor load the blocks code into an ESP 32.</p>" +
                     "<p>Installation instruction can be found in the <a href=\"https://github.com/carlosperate/Blocklynaite\">Blocklynaite repository</a>.</p>" +
                     "<p>If you have Blocklynaite already installed, make sure the application is running correctly.</p>",
  noServerNoLangBody: "If the Blocklynaite application is not running the language cannot be fully changed.",
  addBlocksTitle: "Additional Blocks",
  /* Alerts */
  loadNewBlocksTitle: "Load new blocks?",
  loadNewBlocksBody: "Loading a new XML file will replace the current blocks from the workspace.<br>" +
                     "Are you sure you want to proceed?",
  discardBlocksTitle: "Delete blocks?",
  discardBlocksBody: "There are %1 blocks on the workspace.<br>" +
                     "Are you sure you want to delete them?",
  invalidXmlTitle: "Invalid XML",
  invalidXmlBody: "The XML file was not successfully parsed into blocks. Please review the XML code and try again.",
  /* Tooltips */
  uploadingSketch: "Uploading Sketch into ESP 32...",
  uploadSketch: "Upload Sketch to the ESP 32",
  verifyingSketch: "Verifying Sketch...",
  verifySketch: "Verify the Sketch",
  openingSketch: "Opening Sketch in the ESP 32 IDE...",
  openSketch: "Open Sketch in IDE",
  notImplemented: "Function not yet implemented",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Cancel",
  return: "Return",
  /* Cards */
  ESP32SourceCode: "ESP 32 Source Code",
  blocksXml: "Blocks XML",
  /* Toolbox Categories*/
  catLogic: "Logic",
  catLoops: "Loops",
  catMath: "Math",
  catText: "Text",
  catVariables: "Variables",
  catFunctions: "Functions",
  catInputOutput: "Input/Output",
  catTime: "Time",
  catAudio: "Audio",
  catMotors: "Motors",
  catComms: "Comms",
  catNTP_time: "NTP-Time",
  catPrivacy: "Privacy",
  catBlynk_protocols: "Blynk protocols",
  catMINT: "Mint",
  catEsp_system: "ESP: System",
  catExtern_interfaces: "Extern interfaces",
  /* IoT Werkstatt */
  close: "Close",
  copiedToClipboard: "Code has been copied to the clipboard.",
  importNodeRedHint: "Please import the code in Node-RED.",
  importNodeRedPath: "Menu &rarr; Import &rarr; Clipboard.",
  errorMissingMqttNodes: "You need at least one MQTT and one MQTT Publish or Subscribe block for the export",
  errorMqttCodeGeneration: "Code generation for the MQTT nodes has failed",
  exportNodeRedTitle: "Node-RED Export",
  download: "Download",
  copyToClipboard: "Copy to Clipboard",
  catInternet: "Internet",
  catDisplays: "Displays",
  catMqtt: "MQTT",
  catSensors: "Sensors",
  catHTTP_protocols: "HTTP-Protocols",
  catLoRa: "LoRa-Protocols",
  catSD: "SD Card"
};
