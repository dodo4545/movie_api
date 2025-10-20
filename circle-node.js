// circle-node.js - Node.js version with proper module.exports
let PI = 3.14159265359;

module.exports = {
  area: (radius) => Math.pow(radius, 2) * PI,
  circumference: (radius) => 2 * radius * PI
};