// main.js - Browser compatible version
// This assumes circle.js is loaded first via script tag

/* global Circle */

let r = 3;
console.log(`Circle with radius ${r} has
  area: ${Circle.area(r)}
  circumference: ${Circle.circumference(r)}`);