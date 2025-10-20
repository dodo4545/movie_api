// main-node.js - Node.js version with require
const circle = require('./circle-node.js');

let r = 3;
console.log(`Circle with radius ${r} has
  area: ${circle.area(r)}
  circumference: ${circle.circumference(r)}`);