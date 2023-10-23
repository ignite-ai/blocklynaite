var Blocklynaite = Blocklynaite || {};
Blocklynaite.LOCALISED_TEXT = {
  translationLanguage: "Deutsch",
  title: "Blocklynaite",
  blocks: "Blöcke",
  /* Menu */
  open: "Öffnen",
  save: "Speichern",
  exportNodeRED: "Node-RED Export",
  deleteAll: "Alles löschen",
  settings: "Einstellungen",
  documentation: "Dokumentation",
  reportBug: "Fehler melden",
  examples: "Beispiele",
  /* Settings */
  compilerLocation: "Pfad zum ESP 32 Compiler",
  compilerLocationDefault: "Pfad zum ESP 32 unbekannt",
  sketchFolder: "Sketch Ordner",
  sketchFolderDefault: "Sketch Ordner unbekannt",
  ESP32Board: "ESP 32 Board",
  ESP32BoardDefault: "ESP 32-Board unbekannt",
  comPort: "COM-Schnittstelle",
  comPortDefault: "COM-Schnittstelle unbekannt",
  defaultIdeButton: "Standard IDE Button",
  defaultIdeButtonDefault: "IDE Optionen unbekannt",
  language: "Sprache",
  languageDefault: "Sprache unbekannt",
  sketchName: "Sketch Name",
  /* ESP 32 console output */
  ESP32OpMainTitle: "ESP 32 IDE Ausgabe",
  ESP32OpWaiting: "Warte auf die IDE-Ausgabe...",
  ESP32OpUploadedTitle: "Sketch erfolgreich hochgeladen",
  ESP32OpVerifiedTitle: "Sketch erfolgreich geprüft",
  ESP32OpOpenedTitle: "Sketch in IDE geöffnet",
  ESP32OpOpenedBody: "Der Sketch sollte in der ESP 32 IDE geöffnet werden.",
  ESP32OpErrorTitle: "Es ist ein Fehler aufgetreten.",
  ESP32OpErrorIdContext_0: "Kein Fehler.",
  ESP32OpErrorIdContext_1: "Erstellung oder Upload fehlgeschlagen.",
  ESP32OpErrorIdContext_2: "Sketch nicht gefunden.",
  ESP32OpErrorIdContext_3: "Ungültiges Befehlszeilenargument.",
  ESP32OpErrorIdContext_4: "Die Einstellung, die an das Flag 'get-pref' übergeben wurde, existiert nicht.",
  ESP32OpErrorIdContext_5: "Die ESP 32 IDE kann manchmal diesen Fehler produzieren.",
  ESP32OpErrorIdContext_50: "Unbekannter Fehlercode von der ESP 32 IDE",
  ESP32OpErrorIdContext_51: "Sketch-Datei konnte nicht erstellt werden",
  ESP32OpErrorIdContext_52: "Ungültiger Pfad zur intern erstellten Sketch-Datei",
  ESP32OpErrorIdContext_53: "ESP 32 IDE konnte nicht gefunden werden.<br>" +
                              "Das Compilerverzeichnis wurde nicht korrekt eingestellt.<br>" +
                              "Bitte stelle sicher, dass der Pfad in den Einstellungen korrekt ist.",
  ESP32OpErrorIdContext_54: "Was soll mit der Sketch-Datei gemacht werden?<br>" +
                              "Die IDE-Starten-Option wurde nicht gesetzt.<br>" +
                              "Bitte wähle eine IDE-Option in den Einstellungen aus.",
  ESP32OpErrorIdContext_55: "Serielle Schnittstelle nicht verfügbar<br>" +
                              "Auf die Serielle Schnittstelle kann nicht zugegriffen werden.<br>" +
                              "Bitte überprüfe, ob der ESP 32 korrekt mit dem PC verbunden ist und wähle die serielle Schnittstelle in den Einstellungen aus.",
  ESP32OpErrorIdContext_56: "Unbekanntes ESP 32-Board<br>" +
                              "Das ESP 32-Board wurde nicht festgelegt.<br>" +
                              "Bitte wähle das entsprechende ESP 32-Board in den Einstellungen aus.",
  ESP32OpErrorIdContext_52: "Unerwarteter Serverfehler.",
  ESP32OpErrorIdContext_64: "Fehler bei der Analyse der gesendeten JSON-Datei.",
  ESP32OpErrorUnknown: "Unerwarteter Fehler",
  /* Modals */
  noServerTitle: "Blocklynaite-Anwendung läuft nicht",
  noServerTitleBody: "<p>Damit alle Blocklynaite-Funktionen aktiviert werden können, muss die Blocklynaite-Desktopanwendung lokal auf deinem Computer ausgeführt werden.</p>" +
                     "<p>Wenn du eine Online-Version verwenden, kannst du die Einstellungen nicht konfigurieren oder den Blockcode auf einen ESP 32 laden.</p>" +
                     "<p>Die Installationsanweisung findest du <a href=\"https://github.com/carlosperate/Blocklynaite\">hier</a>.</p>" +
                     "<p>Wenn du Blocklynaite bereits installiert hast, stelle sicher, dass die Anwendung korrekt ausgeführt wird.</p>",
  noServerNoLangBody: "Wenn die Anwendung Blocklynaite nicht läuft, kann die Sprache nicht vollständig geändert werden.",
  addBlocksTitle: "Zusätzliche Blöcke",
  /* Alerts */
  loadNewBlocksTitle: "Neue Blöcke laden?",
  loadNewBlocksBody: "Das Laden einer neuen XML-Datei ersetzt die aktuellen Blöcke aus dem Arbeitsbereich..<br>" +
                     "Bist du sicher, dass du fortfahren willst?",
  discardBlocksTitle: "Blöcke löschen?",
  discardBlocksBody: "Es gibt %1 Blöcke auf dem Arbeitsbereich.<br>" +
                     "Bist du sicher, dass du sie löschen willst?",
  invalidXmlTitle: "Ungültiges XML",
  invalidXmlBody: "Die XML-Datei wurde nicht erfolgreich in Blöcke übersetzt. Bitte überprüfe den XML-Code und versuche es erneut.",
  /* Tooltips */
  uploadingSketch: "Lade Sketch in ESP 32...",
  uploadSketch: "Upload Sketch to the ESP 32",
  verifyingSketch: "Überprüfe Sketch...",
  verifySketch: "Sketch überprüfen",
  openingSketch: "Öffne Sketch in der ESP 32 IDE...",
  openSketch: "Sketch in IDE öffnen",
  notImplemented: "Funktion noch nicht verfügbar",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Abbrechen",
  return: "Zurück",
  /* Cards */
  ESP32SourceCode: "ESP 32 Quellcode",
  blocksXml: "Blöcke als XML",
  /* Toolbox Categories*/
  catLogic: "Logik",
  catLoops: "Schleifen",
  catMath: "Mathematik",
  catText: "Text",
  catVariables: "Variablen",
  catFunctions: "Funktionen",
  catInputOutput: "Ein-/Ausgänge",
  catTime: "Zeit",
  catAudio: "Ton",
  catMotors: "Motoren",
  catComms: "Kommunikation",
  catBlynk_protocols: "Blynk-Protokolle",
  catNTP_time: "NTP-Uhrzeit",
  catPrivacy: "Privatsphäre",
  catMINT: "Mint",
  catEsp_system: "ESP: System",
  catExtern_interfaces: "Externe Interfaces",
  close: "Schließen",
  copiedToClipboard: "Code wurde in die Zwischenablage eingefügt.",
  importNodeRedHint: "Bitte importiere ihn jetzt in Node-RED.",
  importNodeRedPath: "Menü &rarr; Import &rarr; Clipboard.",
  errorMissingMqttNodes: "Zum Export wird mindestens ein MQTT- und ein MQTT Publish- oder Subscribe-Block benötigt",
  errorMqttCodeGeneration: "Die Code-Generierung ür die MQTT-Nodes ist fehlgeschlagen",
  exportNodeRedTitle: "Code für Node-RED exportieren",
  download: "Herunterladen",
  copyToClipboard: "In Zwischenablage kopieren",
  catInternet: "Internet",
  catDisplays: "Anzeigen",
  catMqtt: "MQTT",
  catSensors: "Sensoren",
  catHTTP_protocols :"HTTP-Protokolle",
  catLoRa: "LoRa-Protokolle",
  catSD: "SD Karte"
};
