var Blocklynaite = Blocklynaite || {};
Blocklynaite.LOCALISED_TEXT = {
  translationLanguage: "Italian",
  title: "Blocklynaite",
  blocks: "Blocchi",
  /* Menu */
  open: "Apri",
  save: "Salva",
  deleteAll: "Cancella Tutto",
  settings: "Impostazioni",
  documentation: "Documentazione",
  reportBug: "Segnala un Errore",
  examples: "Esempi",
  /* Settings */
  compilerLocation: "Posizione del compilatore",
  compilerLocationDefault: "Posizione del compilatore sconosciuta",
  sketchFolder: "Cartella degli Sketch",
  sketchFolderDefault: "Cartella degli Sketch sconosciuta",
  ESP32Board: "Scheda ESP 32",
  ESP32BoardDefault: "Scheda ESP 32 Sconosciuta",
  comPort: "Porta COM",
  comPortDefault: "Porta COM sconosciuta",
  defaultIdeButton: "Pulsante di default dell'IDE",
  defaultIdeButtonDefault: "Opzioni IDE sconosciute",
  language: "Lingua",
  languageDefault: "Lingua sconosciuta",
  sketchName: "Nome dello Sketch",
  /* ESP 32 console output */
  ESP32OpMainTitle: "Output dell'IDE ESP 32",
  ESP32OpWaiting: "In attesa dell'output dell'IDE...",
  ESP32OpUploadedTitle: "Sketch caricato con successo",
  ESP32OpVerifiedTitle: "Sketch verificato con successo",
  ESP32OpOpenedTitle: "Sketch aperto nell'IDE",
  ESP32OpOpenedBody: "Lo sketch dovrebbe essere stato caricato nell'IDE ESP 32.",
  ESP32OpErrorUpVerTitle: "Compilazione o Caricamento fallito",
  ESP32OpErrorSketchTitle: "Sketch non torvato",
  ESP32OpErrorFlagTitle: "Argomento a linea di comando non valido",
  ESP32OpErrorFlagPrefTitle: "L'opzione passata al flag 'get-pref' non esiste",
  ESP32OpErrorIdeDirTitle: "Impossibile trovare l'IDE ESP 32",
  ESP32OpErrorIdeDirBody: "La cartella del compilatore non è stata configurata.<br>" +
                            "Per favore selezionala nelle impostazioni.",
  ESP32OpErrorIdeOptionTitle: "Cosa dobbiamo fare con lo Sketch?",
  ESP32OpErrorIdeOptionBody: "L'opzione per lanciare l'IDE non è stata impostata.<br>" +
                               "Per favore configura l'opzione IDE nelle impostazioni.",
  ESP32OpErrorIdePortTitle: "Porta seriale non disponibile",
  ESP32OpErrorIdePortBody: "La porta seriale non è accessibile.<br>" +
                             "Per favore controlla che ESP 32 sia collegato correttamente al PC e seleziona la porta seriale nelle impostazioni.",
  ESP32OpErrorIdeBoardTitle: "Scheda ESP 32 sconosciuta",
  ESP32OpErrorIdeBoardBody: "La scheda ESP 32 non è stata configurata.<br>" +
                              "Per favore seleziona la scheda ESP 32 nelle opzioni.",
  /* Modals */
  noServerTitle: "L'applicazione Blocklynaite non sta girando",
  noServerTitleBody: "<p>Affinché tutte le funzionalità di Blocklynaite vengano abilitate, l'applicazione desktop di Blocklynaite deve girare sul tuo computer.</p>" +
                     "<p>Se stai usando una versione online, non potrai configurare le opzioni e nemmeno caricare il codice dei blocchi su una scheda ESP 32 collegata al tuo PC.</p>" +
                     "<p>Le istruzioni di installazione si possono trovare nel <a href=\"https://github.com/carlosperate/Blocklynaite\">repository Blocklynaite</a>.</p>" +
                     "<p>Se hai già installato Blocklynaite, accertati che l'applicazione stia girando correttamente.</p>",
  noServerNoLangBody: "Se l'applicazione Blocklynaite non sta girando, non si può cambiare lingua.",
  addBlocksTitle: "Blocchi aggiuntivi",
  /* Alerts */
  loadNewBlocksTitle: "Confermi il caricamento dei nuovi blocchi?",
  loadNewBlocksBody: "Caricando un nuovo file XML verranno sovrascritti i blocchi nell'area di lavoro attuale.<br>" +
                     "Sei sicuro di voler continuare?",
  discardBlocksTitle: "Confermi la cancellazione dei blocchi?",
  discardBlocksBody: "Ci sono %1 blocchi nell'area di lavoro.<br>" +
                     "Sei sicuro di volerli cancellare?",
  invalidXmlTitle: "XML non valido",
  invalidXmlBody: "Il file XML non è stato convertito correttamente. Per favore controlla il codice XML e riprova.",
  /* Tooltips */
  uploadingSketch: "Caricamento dello Sketch sulla scheda ESP 32 in corso...",
  uploadSketch: "Carica lo sketch sulla scheda ESP 32",
  verifyingSketch: "Verifica dello Sketch in corso...",
  verifySketch: "Verifica lo Sketch",
  openingSketch: "Apertura dello Sketch nell'IDE di ESP 32...",
  openSketch: "Apri lo Sketch nell'IDE",
  notImplemented: "Funzione non ancora implementata",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Annulla",
  return: "Ritorna",
  /* Cards */
  ESP32SourceCode: "Codice Sorgente ESP 32",
  blocksXml: "XML dei blocchi",
  /* Toolbox Categories*/
  catLogic: "Logica",
  catLoops: "Cicli",
  catMath: "Matematica",
  catText: "Testo",
  catVariables: "Variabili",
  catFunctions: "Funzioni",
  catInputOutput: "Input/Output",
  catTime: "Tempo",
  catAudio: "Audio",
  catMotors: "Motori",
  catComms: "Comunicazione",
};
