// circle.js - Browser compatible version
/* global window */

let PI = 3.14159265359;

// Option 1: Using window object for global access
window.Circle = {
  area: (radius) => Math.pow(radius, 2) * PI,
  circumference: (radius) => 2 * radius * PI
};