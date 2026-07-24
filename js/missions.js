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
    tests: [
      {
        name: "El total es numerico",
        expression: 'typeof total === "number"',
      },
      {
        name: "El total de la once es 4950",
        expression: "total === 4950",
      },
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
    tests: [
      {
        name: "Valida el gol limpio",
        expression: 'revisarGol(false, false) === "GOL"',
      },
      {
        name: "Rechaza faltas y fuera de juego",
        expression:
          'revisarGol(true, false) !== "GOL" && revisarGol(false, true) !== "GOL"',
      },
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
    tests: [
      {
        name: "Registra exactamente ocho pines",
        expression: "__logs.length === pines.length",
      },
      {
        name: "Menciona el primer y ultimo pin",
        expression:
          '__logs.some((line) => line.includes("2")) && __logs.some((line) => line.includes("32"))',
      },
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
    tests: [
      {
        name: "Convierte 1000 gramos",
        expression: "gramosAKilos(1000) === 1",
      },
      {
        name: "Redondea bolsas hacia arriba",
        expression: "bolsasNecesarias(1200) === 3",
      },
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
    tests: [
      {
        name: "Detecta la lectura 55 como anomalia",
        expression: "analizarTemperaturas(lecturas).anomalias.includes(55)",
      },
      {
        name: "Calcula minimo y maximo",
        expression:
          "analizarTemperaturas(lecturas).minimo === 21.4 && analizarTemperaturas(lecturas).maximo === 55",
      },
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
    tests: [
      {
        name: "Normaliza mayusculas y espacios",
        expression:
          'normalizarClave(" ToMaTiN-42 ").valor === "tomatin-42"',
      },
      {
        name: "Valida el formato correcto",
        expression:
          'normalizarClave(" ToMaTiN-42 ").valida === true && normalizarClave("sin-numero").valida === false',
      },
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
    tests: [
      {
        name: "Descuenta sin mutar el original",
        expression:
          "descontar(componente, 2).stock === 3 && componente.stock === 5",
      },
      {
        name: "Nunca permite stock negativo",
        expression: "descontar(componente, 99).stock >= 0",
      },
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
    tests: [
      {
        name: "El contador llega a cinco",
        expression: "contador === 5",
      },
      {
        name: "La guarda limita las iteraciones",
        expression: "iteraciones > 0 && iteraciones <= 100",
      },
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
    tests: [
      {
        name: "Acepta los limites inclusivos",
        expression:
          "esApta({ peso: 150, madurez: 6 }) === true && esApta({ peso: 300, madurez: 8 }) === true",
      },
      {
        name: "Incluye cinco casos y rechaza datos invalidos",
        expression:
          'casos.length >= 5 && esApta({ peso: "mucho", madurez: 7 }) === false',
      },
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
    tests: [
      {
        name: "Expone la API del marcador",
        expression:
          'typeof partido.registrarGol === "function" && typeof partido.obtenerResumen === "function"',
      },
      {
        name: "Registra un gol valido",
        expression:
          'partido.registrarGol("Limache", 42) !== false && partido.obtenerResumen() != null',
      },
    ],
  },
  {
    id: "p2-01-factorial-recursivo",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Recursion",
    order: 1,
    title: "El factorial porfiado",
    subtitle: "Casos base antes del abismo",
    difficulty: "Planta",
    points: 260,
    duration: 28,
    tags: ["recursion", "stack"],
    story:
      "Tomatin escribio factorial(5), pero cada llamada invita a otra llamada y nadie sabe cuando termina la reunion.",
    brief:
      "Implementa factorial de forma recursiva. Rechaza negativos y usa un caso base para cero.",
    starterCode: `function factorial(n) {
  // Caso base y paso recursivo.
}
`,
    objectives: [
      "Identificar caso base y caso recursivo.",
      "Seguir la pila de llamadas.",
      "Validar el dominio de entrada.",
    ],
    hints: [
      "Por definicion, 0! es 1.",
      "n! equivale a n multiplicado por (n - 1)!.",
    ],
    tests: [
      { name: "Resuelve el caso base", expression: "factorial(0) === 1" },
      { name: "Calcula factorial de cinco", expression: "factorial(5) === 120" },
    ],
  },
  {
    id: "p2-02-duplicados-lineales",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Complejidad",
    order: 2,
    title: "Duplicados sin doble vuelta",
    subtitle: "De O(n cuadrado) a O(n)",
    difficulty: "Planta",
    points: 280,
    duration: 30,
    tags: ["big-o", "set"],
    story:
      "Una lista de credenciales crecio a diez mil entradas. Comparar cada una con todas las demas ya alcanza para preparar un te.",
    brief:
      "Implementa tieneDuplicados en tiempo lineal esperado usando una estructura apropiada.",
    starterCode: `function tieneDuplicados(valores) {
  // Una sola pasada; evita bucles anidados.
}
`,
    objectives: [
      "Comparar costos temporales.",
      "Usar Set para pertenencia.",
      "Justificar complejidad temporal y espacial.",
    ],
    hints: [
      "Set recuerda valores vistos con busqueda promedio O(1).",
      "Puedes comparar el size del Set con length.",
    ],
    tests: [
      {
        name: "Detecta repetidos",
        expression: "tieneDuplicados([3, 1, 3]) === true",
      },
      {
        name: "Acepta valores unicos",
        expression: "tieneDuplicados([3, 1, 8]) === false",
      },
    ],
  },
  {
    id: "p2-03-busqueda-bodega",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Busqueda",
    order: 3,
    title: "La bodega binaria",
    subtitle: "Partir el problema a la mitad",
    difficulty: "Planta",
    points: 300,
    duration: 34,
    tags: ["binary-search", "log-n"],
    story:
      "Los componentes estan ordenados por codigo. Revisarlos uno a uno seria como buscar un jumper negro en una caja de jumpers negros.",
    brief:
      "Implementa busquedaBinaria iterativa y retorna el indice del objetivo o -1 cuando no exista.",
    starterCode: `function busquedaBinaria(ordenados, objetivo) {
  let izquierda = 0;
  let derecha = ordenados.length - 1;
  // Completa la busqueda.
}
`,
    objectives: [
      "Mantener un intervalo de busqueda.",
      "Calcular el punto medio sin salir del arreglo.",
      "Reconocer complejidad O(log n).",
    ],
    hints: [
      "Elimina la mitad que no puede contener el objetivo.",
      "Usa Math.floor para obtener un indice entero.",
    ],
    tests: [
      {
        name: "Encuentra un elemento central",
        expression: "busquedaBinaria([2, 4, 8, 16, 32], 8) === 2",
      },
      {
        name: "Retorna -1 si no existe",
        expression: "busquedaBinaria([2, 4, 8, 16, 32], 7) === -1",
      },
    ],
  },
  {
    id: "p2-04-merge-sensores",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Ordenamiento",
    order: 4,
    title: "Merge de sensores",
    subtitle: "Ordenar sin improvisar",
    difficulty: "Bosque",
    points: 340,
    duration: 40,
    tags: ["merge-sort", "divide"],
    story:
      "Dos estaciones entregaron marcas de tiempo desordenadas. El grafico parece electrocardiograma de alguien viendo produccion caerse.",
    brief:
      "Implementa merge sort sin usar Array.prototype.sort. La funcion debe retornar un arreglo nuevo.",
    starterCode: `function ordenar(valores) {
  // Divide, ordena y mezcla.
}

function mezclar(izquierda, derecha) {
  // Combina dos arreglos ya ordenados.
}
`,
    objectives: [
      "Aplicar divide y venceras.",
      "Mezclar secuencias ordenadas.",
      "Evitar mutar la entrada.",
    ],
    hints: [
      "Un arreglo de largo cero o uno ya esta ordenado.",
      "Compara el primer elemento disponible de cada mitad.",
    ],
    tests: [
      {
        name: "Ordena positivos y negativos",
        expression:
          'JSON.stringify(ordenar([4, -1, 8, 2])) === "[-1,2,4,8]"',
      },
      {
        name: "No muta la entrada",
        expression:
          '(() => { const base = [3, 1, 2]; ordenar(base); return JSON.stringify(base) === "[3,1,2]"; })()',
      },
    ],
  },
  {
    id: "p2-05-lista-jumpers",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Estructuras",
    order: 5,
    title: "Cadena de jumpers",
    subtitle: "Una lista enlazada de verdad",
    difficulty: "Bosque",
    points: 360,
    duration: 42,
    tags: ["linked-list", "clases"],
    story:
      "Cada jumper apunta al siguiente. Si uno se pierde, el resto queda filosofando sobre la identidad de null.",
    brief:
      "Crea ListaEnlazada con agregar, eliminar y contiene. Mantiene cabeza y largo consistentes.",
    starterCode: `class Nodo {
  constructor(valor) {
    this.valor = valor;
    this.siguiente = null;
  }
}

class ListaEnlazada {
  // Implementa agregar, eliminar y contiene.
}
`,
    objectives: [
      "Manipular referencias entre nodos.",
      "Tratar cabeza y lista vacia.",
      "Mantener invariantes de largo.",
    ],
    hints: [
      "Eliminar la cabeza es un caso especial.",
      "Recorre con un puntero actual hasta encontrar null.",
    ],
    tests: [
      {
        name: "Agrega y encuentra valores",
        expression:
          '(() => { const l = new ListaEnlazada(); l.agregar("A"); l.agregar("B"); return l.contiene("B") === true; })()',
      },
      {
        name: "Elimina sin romper la lista",
        expression:
          '(() => { const l = new ListaEnlazada(); l.agregar("A"); l.agregar("B"); l.eliminar("A"); return !l.contiene("A") && l.contiene("B"); })()',
      },
    ],
  },
  {
    id: "p2-06-cola-taller",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Estructuras",
    order: 6,
    title: "La fila del taller",
    subtitle: "FIFO, sin colados",
    difficulty: "Bosque",
    points: 360,
    duration: 38,
    tags: ["queue", "fifo"],
    story:
      "Cinco equipos esperan el cautin. El ultimo que llego no puede salir primero por mucha seguridad que tenga al decir 'es rapidito'.",
    brief:
      "Implementa una Cola con encolar, desencolar, frente y estaVacia. Evita usar shift para mantener operaciones O(1).",
    starterCode: `class Cola {
  constructor() {
    // Puedes usar un objeto y dos indices.
  }
}
`,
    objectives: [
      "Diferenciar pila y cola.",
      "Mantener indices de entrada y salida.",
      "Implementar una API FIFO.",
    ],
    hints: [
      "Guarda inicio y fin como contadores.",
      "Desencolar debe borrar la referencia consumida.",
    ],
    tests: [
      {
        name: "Respeta orden FIFO",
        expression:
          '(() => { const q = new Cola(); q.encolar("A"); q.encolar("B"); return q.desencolar() === "A" && q.frente() === "B"; })()',
      },
      {
        name: "Reconoce una cola vacia",
        expression: "new Cola().estaVacia() === true",
      },
    ],
  },
  {
    id: "p2-07-arbol-decisiones",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Arboles",
    order: 7,
    title: "Arbol de decisiones",
    subtitle: "Insertar y buscar sin perder ramas",
    difficulty: "Bosque",
    points: 400,
    duration: 48,
    tags: ["bst", "tree"],
    story:
      "El inventario crecio con forma de arbol. A la izquierda vive lo menor; a la derecha, lo mayor; arriba, un tomate organizando.",
    brief:
      "Implementa un arbol binario de busqueda con insertar y contiene. Ignora duplicados.",
    starterCode: `class ArbolBusqueda {
  constructor() {
    this.raiz = null;
  }

  insertar(valor) {}
  contiene(valor) {}
}
`,
    objectives: [
      "Aplicar el invariante de un BST.",
      "Recorrer iterativa o recursivamente.",
      "Tratar raiz vacia y duplicados.",
    ],
    hints: [
      "Cada comparacion elige exactamente una rama.",
      "Un nodo puede ser un objeto { valor, izquierda, derecha }.",
    ],
    tests: [
      {
        name: "Inserta y encuentra nodos",
        expression:
          "(() => { const a = new ArbolBusqueda(); [8, 3, 10, 1].forEach((n) => a.insertar(n)); return a.contiene(1) && a.contiene(10); })()",
      },
      {
        name: "Rechaza un valor ausente",
        expression:
          "(() => { const a = new ArbolBusqueda(); a.insertar(8); return a.contiene(7) === false; })()",
      },
    ],
  },
  {
    id: "p2-08-ruta-maker",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Grafos",
    order: 8,
    title: "Ruta maker",
    subtitle: "BFS entre talleres",
    difficulty: "Cordillera",
    points: 440,
    duration: 52,
    tags: ["graph", "bfs"],
    story:
      "Las sedes del circuito maker forman una red. Tomatin quiere la ruta con menos saltos antes de que cierren el ultimo bus.",
    brief:
      "Implementa distanciaMinima con busqueda en anchura sobre una lista de adyacencia. Retorna -1 si no hay ruta.",
    starterCode: `function distanciaMinima(grafo, origen, destino) {
  // BFS: cola, visitados y distancia.
}

const red = {
  Limache: ["Quillota", "Olmue"],
  Quillota: ["Limache", "Valparaiso"],
  Olmue: ["Limache"],
  Valparaiso: ["Quillota"],
};
`,
    objectives: [
      "Modelar un grafo con adyacencias.",
      "Usar una cola y un conjunto de visitados.",
      "Encontrar caminos minimos no ponderados.",
    ],
    hints: [
      "BFS visita por capas de distancia.",
      "Marca visitado al encolar, no al desencolar.",
    ],
    tests: [
      {
        name: "Encuentra la ruta a Valparaiso",
        expression:
          'distanciaMinima(red, "Limache", "Valparaiso") === 2',
      },
      {
        name: "Distancia cero al mismo nodo",
        expression: 'distanciaMinima(red, "Olmue", "Olmue") === 0',
      },
    ],
  },
  {
    id: "p2-09-frecuencias-serial",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Hashing",
    order: 9,
    title: "Frecuencias del serial",
    subtitle: "Hash maps para domar datos",
    difficulty: "Cordillera",
    points: 460,
    duration: 42,
    tags: ["map", "frequency"],
    story:
      "El monitor serial repite WARN, OK y ERROR con entusiasmo. Contarlos a mano ya fue declarado patrimonio de las malas ideas.",
    brief:
      "Implementa frecuencias y masComun. En empates, conserva el valor que aparecio primero.",
    starterCode: `function frecuencias(valores) {
  // Retorna un Map.
}

function masComun(valores) {
  // Retorna el valor mas frecuente.
}
`,
    objectives: [
      "Construir una tabla de frecuencias.",
      "Elegir Map frente a un objeto.",
      "Resolver empates de forma estable.",
    ],
    hints: [
      "Map conserva el orden de insercion.",
      "Actualiza el ganador solo cuando la frecuencia sea estrictamente mayor.",
    ],
    tests: [
      {
        name: "Cuenta cada estado",
        expression:
          'frecuencias(["OK", "WARN", "OK"]).get("OK") === 2',
      },
      {
        name: "Conserva el primero en un empate",
        expression: 'masComun(["WARN", "OK"]) === "WARN"',
      },
    ],
  },
  {
    id: "p2-10-cambio-micro",
    course: "programacion-2",
    courseLabel: "Programacion II",
    module: "Programacion dinamica",
    order: 10,
    title: "Cambio para la micro",
    subtitle: "Subproblemas que pagan el pasaje",
    difficulty: "Cordillera",
    points: 520,
    duration: 60,
    tags: ["dynamic-programming", "memo"],
    story:
      "Quedan monedas de 1, 3 y 4. El algoritmo codicioso elige 4+1+1 para pagar 6, mientras Tomatin ya encontro 3+3.",
    brief:
      "Implementa minMonedas con programacion dinamica. Retorna -1 cuando el monto no pueda formarse.",
    starterCode: `function minMonedas(monedas, monto) {
  // dp[x] guarda el minimo para formar x.
}
`,
    objectives: [
      "Definir estado y transicion.",
      "Construir soluciones desde casos menores.",
      "Diferenciar DP de una estrategia codiciosa.",
    ],
    hints: [
      "Inicializa dp[0] en cero y el resto en Infinity.",
      "Para cada monto, prueba cada moneda que quepa.",
    ],
    tests: [
      {
        name: "Supera al algoritmo codicioso",
        expression: "minMonedas([1, 3, 4], 6) === 2",
      },
      {
        name: "Detecta montos imposibles",
        expression: "minMonedas([4, 6], 5) === -1",
      },
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
