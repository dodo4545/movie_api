// main-es6.js - ES6 modules version
import { area, circumference } from './circle-es6.js';

let r = 3;
console.log(`Circle with radius ${r} has
  area: ${area(r)}
  circumference: ${circumference(r)}`);