export const missions = [
  {
    id: "p1-01-la-once",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Fundamentos",
    order: 1,
    title: "La once de Tomatin",
    subtitle: "Variables, tipos y operaciones",
    difficulty: "Semilla",
    points: 100,
    duration: 12,
    tags: ["variables", "numeros"],
    story:
      "Tomatin invito al taller completo a tomar once. El presupuesto esta en codigo y alguien mezclo strings con numeros.",
    brief:
      "Declara el precio unitario y la cantidad de cada producto. Calcula el total como numero y muestra un mensaje legible.",
    starterCode: `const precioPan = 1200;
const cantidadPan = 2;
const precioTomate = 850;
const cantidadTomate = 3;

// Calcula el total y muestralo en consola.
`,
    objectives: [
      "Distinguir numeros y strings.",
      "Nombrar variables con intencion.",
      "Construir una salida con template literals.",
    ],
    hints: [
      "Multiplica precio por cantidad antes de sumar.",
      "Usa const para valores que no cambian.",
    ],
  },
  {
    id: "p1-02-var-limache",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Control de flujo",
    order: 2,
    title: "El VAR de Limache",
    subtitle: "Condicionales sin polemica",
    difficulty: "Semilla",
    points: 120,
    duration: 15,
    tags: ["if", "booleanos"],
    story:
      "El marcador necesita decidir si un gol es valido. La tribuna exige una respuesta antes de que termine el recreo.",
    brief:
      "Crea una funcion revisarGol que reciba fueraDeJuego y falta. Debe devolver GOL solo cuando ambos sean falsos.",
    starterCode: `function revisarGol(fueraDeJuego, falta) {
  // Tu decision va aqui.
}

console.log(revisarGol(false, false));
`,
    objectives: [
      "Combinar expresiones booleanas.",
      "Escribir ramas exhaustivas.",
      "Retornar valores predecibles.",
    ],
    hints: [
      "Un gol es valido si NO hay fuera de juego Y NO hay falta.",
      "Puedes resolverlo con if/else o con un ternario.",
    ],
  },
  {
    id: "p1-03-semaforo-led",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Control de flujo",
    order: 3,
    title: "Semaforo de protoboard",
    subtitle: "Bucles que no queman LEDs",
    difficulty: "Semilla",
    points: 140,
    duration: 18,
    tags: ["for", "arrays"],
    story:
      "En un taller de Fundacion Mustakis hay ocho LEDs esperando una secuencia. El noveno no existe, aunque el for insista.",
    brief:
      "Recorre el arreglo de pines y registra PIN n: ON para cada posicion, sin acceder fuera de sus limites.",
    starterCode: `const pines = [2, 4, 5, 12, 13, 14, 27, 32];

// Recorre todos los pines exactamente una vez.
`,
    objectives: [
      "Controlar inicio, condicion e incremento.",
      "Recorrer arreglos sin errores de indice.",
      "Reconocer un off-by-one.",
    ],
    hints: [
      "El ultimo indice siempre es length - 1.",
      "for...of evita trabajar con indices cuando no los necesitas.",
    ],
  },
  {
    id: "p1-04-conversor-hallulla",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Funciones",
    order: 4,
    title: "Conversor de hallullas",
    subtitle: "Funciones pequenas y confiables",
    difficulty: "Brote",
    points: 150,
    duration: 20,
    tags: ["funciones", "retorno"],
    story:
      "La receta viene en gramos, pero la balanza del laboratorio reporta kilogramos. Hambre y conversiones implicitas: mala dupla.",
    brief:
      "Implementa gramosAKilos y calcula cuantas bolsas de 0.5 kg se necesitan. Redondea siempre hacia arriba.",
    starterCode: `function gramosAKilos(gramos) {
  // Retorna un numero.
}

function bolsasNecesarias(gramos) {
  // Cada bolsa contiene 0.5 kg.
}
`,
    objectives: [
      "Separar responsabilidades en funciones.",
      "Elegir parametros y retornos.",
      "Aplicar Math.ceil a una cantidad discreta.",
    ],
    hints: [
      "Un kilogramo contiene 1000 gramos.",
      "Primero convierte; luego divide por la capacidad de una bolsa.",
    ],
  },
  {
    id: "p1-05-esp-con-fiebre",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Colecciones",
    order: 5,
    title: "El ESP con fiebre",
    subtitle: "Arreglos y estadistica basica",
    difficulty: "Brote",
    points: 180,
    duration: 24,
    tags: ["arrays", "reduce"],
    story:
      "Un sensor ESP envio diez temperaturas. Una lectura parece venir desde el interior de un volcan y hay que detectarla.",
    brief:
      "Calcula promedio, minimo y maximo. Filtra como anomalia toda lectura que se aleje mas de 8 grados del promedio.",
    starterCode: `const lecturas = [21.4, 21.8, 22.1, 55.0, 22.3, 21.9, 22.0];

function analizarTemperaturas(valores) {
  // Retorna { promedio, minimo, maximo, anomalias }.
}
`,
    objectives: [
      "Transformar una coleccion de datos.",
      "Usar reduce, Math.min y Math.max.",
      "Expresar una regla de deteccion.",
    ],
    hints: [
      "Suma con reduce y divide por length.",
      "Math.abs mide la distancia sin importar el signo.",
    ],
  },
  {
    id: "p1-06-clave-del-profe",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Texto",
    order: 6,
    title: "La clave del profe",
    subtitle: "Strings, limpieza y validacion",
    difficulty: "Brote",
    points: 190,
    duration: 25,
    tags: ["strings", "regex"],
    story:
      "La pista del laboratorio dice: ' ToMaTiN-42 '. El sistema, con la simpatia de una impresora sin tinta, rechaza los espacios.",
    brief:
      "Normaliza una entrada: elimina espacios externos, pasa a minusculas y valida que tenga letras, guion y dos digitos finales.",
    starterCode: `function normalizarClave(entrada) {
  // Retorna { valor, valida }.
}

console.log(normalizarClave(" ToMaTiN-42 "));
`,
    objectives: [
      "Normalizar datos antes de validarlos.",
      "Encadenar metodos de string.",
      "Leer una expresion regular sencilla.",
    ],
    hints: [
      "trim elimina espacios al inicio y al final.",
      "La expresion /^[a-z]+-\\d{2}$/ describe el formato esperado.",
    ],
  },
  {
    id: "p1-07-inventario-maker",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Datos estructurados",
    order: 7,
    title: "Inventario maker",
    subtitle: "Objetos que si representan algo",
    difficulty: "Brote",
    points: 210,
    duration: 28,
    tags: ["objetos", "metodos"],
    story:
      "Hay placas, resistencias y cables, pero la planilla dice 'varias cositas'. Es hora de darle estructura al taller.",
    brief:
      "Modela un componente con nombre, stock y stockMinimo. Agrega necesitaReposicion y una funcion para descontar unidades de forma segura.",
    starterCode: `const componente = {
  nombre: "ESP32",
  stock: 5,
  stockMinimo: 3,
};

function descontar(item, cantidad) {
  // No permitas stock negativo.
}
`,
    objectives: [
      "Modelar entidades con objetos.",
      "Leer y actualizar propiedades.",
      "Proteger invariantes de dominio.",
    ],
    hints: [
      "Rechaza cantidades negativas o mayores al stock.",
      "Puedes retornar un nuevo objeto y evitar mutaciones.",
    ],
  },
  {
    id: "p1-08-loop-viernes",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Depuracion",
    order: 8,
    title: "El loop del viernes",
    subtitle: "Depurar antes de las 18:00",
    difficulty: "Planta",
    points: 230,
    duration: 25,
    tags: ["debug", "while"],
    story:
      "El codigo debia contar hasta cinco. Lleva 400 millones de iteraciones y el ventilador ya esta dando una charla TED.",
    brief:
      "Corrige el bucle, explica la causa del error y agrega una guarda que impida mas de 100 iteraciones.",
    starterCode: `let contador = 0;
let iteraciones = 0;

while (contador < 5) {
  console.log(contador);
  contador - 1;
}
`,
    objectives: [
      "Seguir el estado de un programa paso a paso.",
      "Detectar una expresion sin asignacion.",
      "Agregar una condicion de seguridad.",
    ],
    hints: [
      "contador - 1 calcula, pero no guarda.",
      "La guarda debe cortar el ciclo incluso si otra condicion falla.",
    ],
  },
  {
    id: "p1-09-paltas-qa",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Calidad",
    order: 9,
    title: "QA de paltas",
    subtitle: "Pruebas y casos borde",
    difficulty: "Planta",
    points: 250,
    duration: 30,
    tags: ["testing", "bordes"],
    story:
      "Un clasificador promete elegir paltas listas para la once. Funciona perfecto, salvo con listas vacias, pesos cero y la realidad.",
    brief:
      "Implementa esApta y escribe al menos cinco casos de prueba, incluyendo limites y entradas invalidas.",
    starterCode: `function esApta(palta) {
  // Una palta apta pesa entre 150 y 300 g
  // y su madurez esta entre 6 y 8.
}

const casos = [
  // { entrada, esperado }
];
`,
    objectives: [
      "Convertir requisitos en casos de prueba.",
      "Probar limites inclusivos.",
      "Manejar datos ausentes sin romper el programa.",
    ],
    hints: [
      "Prueba justo bajo, justo en y justo sobre cada limite.",
      "typeof ayuda a rechazar propiedades que no son numeros.",
    ],
  },
  {
    id: "p1-10-marcador-naranja",
    course: "programacion-1",
    courseLabel: "Programacion I",
    module: "Proyecto",
    order: 10,
    title: "Marcador naranja",
    subtitle: "Mini proyecto integrador",
    difficulty: "Planta",
    points: 320,
    duration: 45,
    tags: ["proyecto", "estado"],
    story:
      "El estadio necesita un marcador para goles, tarjetas y tiempo. El operador solo tiene tres botones y cero paciencia.",
    brief:
      "Construye un objeto marcador con metodos para registrar eventos y obtener un resumen. Valida que el minuto este entre 0 y 120.",
    starterCode: `function crearMarcador(local, visita) {
  // Retorna el estado y los metodos registrarGol,
  // registrarTarjeta y obtenerResumen.
}

const partido = crearMarcador("Limache", "Visitante");
`,
    objectives: [
      "Integrar funciones, arrays y objetos.",
      "Encapsular estado con una API pequena.",
      "Validar eventos antes de guardarlos.",
    ],
    hints: [
      "Guarda los eventos en un arreglo interno.",
      "El resumen puede calcularse desde los eventos, sin duplicar datos.",
    ],
  },
];

export function getMissionById(id) {
  return missions.find((mission) => mission.id === id);
}

export function getMissionsByCourse(course) {
  if (course === "all") return missions;
  return missions.filter((mission) => mission.course === course);
}

