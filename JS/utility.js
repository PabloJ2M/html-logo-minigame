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

const ClampAngle = (num, fn) => 
{
    if (num > 360) { num -= 360; fn(); }
    else if (num < 0) { fn(); num += 360; }
    return num;
}
const Direction = (angle) =>
{
    let t = angle * Math.PI / 180;
    let x = Math.sin(t);
    let y = Math.cos(t);
    return { x: x, y: y };
}

//Collision
const CircleCast = (position, r1, target, r2) =>
{
    var rad = r1 + r2;
    var x = position.x - target.x;
    var y = position.y - target.y;
    
    return (rad > Math.sqrt((x * x) + (y * y)));
}