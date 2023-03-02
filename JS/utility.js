//delay
const delay = (ms) => new Promise( resolve => setTimeout(resolve, ms));
async function until(fn) { while(!fn()) { await delay(100); } }
async function waitTime(s) { await delay(s * 1000); }

//Math
const deltatime = 0.001;
const Lerp = (a, b, t) => a -= (a - b) * t;
const Clamp = (num, min, max) => Math.min(Math.max(num, min), max);
const Random = (maxValue) => Math.floor(Math.random() * maxValue);
const Abs = (num) => Math.abs(num);