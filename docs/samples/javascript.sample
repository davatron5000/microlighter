// --- Demonstration of imports ---

// Importing named exports and the default export
import defaultAnimal, { person, add } from './module.js';

// Importing everything from the module as an alias
import * as Module from './module.js';


// --- Demonstration of exports ---

// Named exports
export const person = { name: "Alice", age: 30 };

export function add(x, y = 0) {
  return x + y;
}

// Default export
const defaultAnimal = { name: "Default Animal" };
export default defaultAnimal;

// Generator function
export function* idGenerator() {
  let id = 0;
  while (true) {
    yield id++;
  }
}

// Using typeof for runtime type checks
console.log(typeof person);  // object
console.log(add(2, 3));      // 5
console.log(defaultAnimal);  // { name: "Default Animal" }

// Emulating 'satisfies' behavior using runtime checks
function createAnimal(animal) {
  if (typeof animal.name === 'string') {
    return animal;  // Ensures the animal has a 'name' property
  }
  throw new Error("Animal must have a name");
}

const dog = createAnimal({ name: "Buddy", breed: "Golden Retriever" });
console.log(dog);  // { name: 'Buddy', breed: 'Golden Retriever' }

// Generator usage
const generator = Module.idGenerator();
console.log(generator.next().value);  // 0
console.log(generator.next().value);  // 1
console.log(generator.next().value);  // 2

// Handling a generic-like behavior by allowing any type and runtime checks
function identity(arg) {
  return arg;
}

let str = identity("Hello");
let num = identity(42);
console.log(str, num);  // "Hello", 42

// Emulating default generics by using default parameters
function wrapInArray(value = "") {
  return [value];
}

const stringArray = wrapInArray();  // Default is empty string
const numberArray = wrapInArray(42);  // Passes 42 explicitly
console.log(stringArray, numberArray);  // [""] , [42]

// --- for-of and for-in loops ---

// for-of: Iterates over iterable objects like arrays, strings, maps, etc.
const fruits = ["apple", "banana", "cherry"];
for (const fruit of fruits) {
  console.log(fruit);  // Outputs: apple, banana, cherry
}

// for-in: Iterates over enumerable properties of an object
const car = { make: "Tesla", model: "Model S", year: 2021 };
for (const key in car) {
  if (car.hasOwnProperty(key)) {
    console.log(`${key}: ${car[key]}`);  // Outputs key-value pairs of car object
  }
}

// --- IIFE (Immediately Invoked Function Expression) ---

(function () {
  console.log("This IIFE runs immediately after it's defined.");
  const privateVar = "I'm private inside the IIFE!";
  console.log(privateVar);  // Accessing the private variable inside the IIFE
})();

// --- Using a generator to loop indefinitely ---
function* infiniteGenerator() {
  let i = 0;
  while (true) {
    yield i++;
  }
}

const gen = infiniteGenerator();
console.log(gen.next().value);  // 0
console.log(gen.next().value);  // 1

// --- Async and Await ---

async function fetchData(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}

// Example usage of async function
fetchData('https://jsonplaceholder.typicode.com/todos/1')
  .then(data => console.log(data))  // Outputs fetched data
  .catch(error => console.error(error));

// JSDoc type annotations
/**
 * @typedef {Object} Task
 * @property {string} title
 * @property {boolean} completed
 */

/**
 * Create a task
 * @param {Task} task
 * @returns {Task}
 */
function createTask(task) {
  return task;
}

const myTask = createTask({
  title: "Learn JavaScript",
  completed: false,
});
console.log(myTask);

// Importing everything as a namespace (simulated for demonstration)
console.log(Module.person);  // { name: "Alice", age: 30 }
console.log(Module.add(10, 20));  // 30
