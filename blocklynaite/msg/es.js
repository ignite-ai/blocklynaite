var Blocklynaite = Blocklynaite || {};
Blocklynaite.LOCALISED_TEXT = {
  translationLanguage: 'Español',
  title: "Blocklynaite",
  blocks: "Bloques",
  /* Menu */
  open: "Abrir",
  save: "Guardar",
  deleteAll: "Borrar todo",
  settings: "Opciones",
  documentation: "Documentación",
  reportBug: "Reportar Fallo",
  examples: "Ejemplos",
  /* Settings */
  compilerLocation: "Localización del Compilador",
  compilerLocationDefault: "Localización del Compilador desconocida",
  sketchFolder: "Carpeta del Sketch",
  sketchFolderDefault: "Carpeta del Sketch desconocida",
  ESP32Board: "Placa de ESP 32",
  ESP32BoardDefault: "Placa de ESP 32 desconocida",
  comPort: "Puerto COM",
  comPortDefault: "Puerto COM desconocido",
  defaultIdeButton: "Botón de IDE por defecto",
  defaultIdeButtonDefault: "Opción de IDE desconocida",
  language: "Lenguaje",
  languageDefault: "Lenguaje desconocido",
  sketchName: "Nombre del Sketch",
  /* ESP 32 console output */
  ESP32OpMainTitle: "Salida del ESP 32 IDE",
  ESP32OpWaiting: "Esperando la salida del ESP 32 IDE...",
  ESP32OpUploadedTitle: "Sketch subido exitosamente",
  ESP32OpVerifiedTitle: "Sketch verificado exitosamente",
  ESP32OpOpenedTitle: "Sketch abierto en el IDE",
  ESP32OpOpenedBody: "El sketch debería estar cargado en el IDE de ESP 32.",
  ESP32OpErrorUpVerTitle: "Fallo en la construcción o subida",
  ESP32OpErrorSketchTitle: "Sketch no encontrado",
  ESP32OpErrorFlagTitle: "Argumento invalido en la linea de comandos",
  ESP32OpErrorFlagPrefTitle: "Preferencia pasada a la bandera 'get-pref' no existe",
  ESP32OpErrorIdeDirTitle: "Incapaz de encontrar el ESP 32 IDE",
  ESP32OpErrorIdeDirBody: "El directorio del compilador no ha sido configurado.<br>" +
                            "Por favor configuralo en las Opciones.",
  ESP32OpErrorIdeOptionTitle: "¿Que debemos hacer con el Sketch?",
  ESP32OpErrorIdeOptionBody: "La opción de cargar el ESP 32 IDE no ha sido configurada.<br>" +
                               "Por favor, selecciona una opción del IDE en las Opciones.",
  ESP32OpErrorIdePortTitle: "Puerto communicaciones no disponible",
  ESP32OpErrorIdePortBody: "El puerto de comunicaciones no es accesible.<br>" +
                             "Por favor, asegurate si el ESP 32 esta correctamente conectado al ordenador y si el puerto correcto esta selecionado en las Opciones.",
  ESP32OpErrorIdeBoardTitle: "Placa de ESP 32 desconocida",
  ESP32OpErrorIdeBoardBody: "La placa de ESP 32 no ha sido seleccionada.<br>" +
                              "Por favor, selecciona la placa adecuada en las Opciones.",
  /* Modals */
  noServerTitle: "Aplicación Blocklynaite sin ejecutar",
  noServerTitleBody: "<p>Para que todas las funciones de Blocklynaite estén disponibles, la aplicación de escritorio de Blocklynaite debe de estar ejecutándose en su ordenador.</p>" +
                     "<p>Si estas usando una versión online no seras capaz de configurar las opciones o cargar el código de los bloques en un ESP 32.</p>" +
                     "<p>Puedes encontrar las instrucciones de instalación en el <a href=\"https://github.com/carlosperate/Blocklynaite\">repositorio de Blocklynaite</a>.</p>" +
                     "<p>Si ya tienes Blocklynaite instalado, asegurate de que la aplicación este ejecutándose de forma correcta.</p>",
  noServerNoLangBody: "Si la aplicación de Blocklynaite no esta ejecutándose el lenguaje no puede cargarse de forma completa.",
  addBlocksTitle: "Bloques Adicionales",
  /* Alerts */
  loadNewBlocksTitle: "¿Cargar bloques nuevos?",
  loadNewBlocksBody: "Cargar un nuevo archivo XML reemplazara los bloques actuales.<br>" +
                     "¿Estas seguro de proceder?",
  discardBlocksTitle: "¿Borrar todos los bloques?",
  discardBlocksBody: "Hay %1 bloques en el area de trabajo.<br>" +
                     "¿Estas seguro de borrarlos?",
  invalidXmlTitle: "XML invalido",
  invalidXmlBody: "El archivo XML no a sido convertido en bloques exitosamente. Por favor revisa el código XML e intentalo de nuevo.",
  /* Tooltips */
  uploadingSketch: "Subiendo el Sketch al ESP 32...",
  uploadSketch: "Subir el Sketch al ESP 32",
  verifyingSketch: "Verificando el Sketch...",
  verifySketch: "Verificar el Sketch",
  openingSketch: "Abriendo el Sketch en el ESP 32 IDE...",
  openSketch: "Abrir el Sketch en el IDE",
  notImplemented: "Función no implementada todavía",
  /* Prompts */
  ok: "OK",
  okay: "Okay",
  cancel: "Cancelar",
  return: "Volver",
  /* Cards */
  ESP32SourceCode: "Codigo de ESP 32",
  blocksXml: "Bloques XML",
  /* Toolbox Categories*/
  catLogic: "Lógica",
  catLoops: "Secuencias",
  catMath: "Matemáticas",
  catText: "Texto",
  catVariables: "Variables",
  catFunctions: "Funciones",
  catInputOutput: "Input/Output",
  catTime: "Tiempo",
  catAudio: "Audio",
  catMotors: "Motores",
  catComms: "Comunicación",
};
