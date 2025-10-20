// circle-universal.js - Works in both Node.js and browsers
(function(global) {
  'use strict';
  
  let PI = 3.14159265359;
  
  const CircleModule = {
    area: (radius) => Math.pow(radius, 2) * PI,
    circumference: (radius) => 2 * radius * PI
  };
  
  // Universal module definition (UMD pattern)
  if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = CircleModule;
  } else if (typeof window !== 'undefined') {
    // Browser environment
    window.Circle = CircleModule;
  } else {
    // Other environments
    global.Circle = CircleModule;
  }
  
})(typeof window !== 'undefined' ? window : global);