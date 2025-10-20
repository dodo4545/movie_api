// circle.js - Browser compatible version
let PI = 3.14159265359;

// Option 1: Using window object for global access
window.Circle = {
  area: (radius) => Math.pow(radius, 2) * PI,
  circumference: (radius) => 2 * radius * PI
};

// Option 2: If you want to use ES6 modules (modern browsers)
// export const area = (radius) => Math.pow(radius, 2) * PI;
// export const circumference = (radius) => 2 * radius * PI;