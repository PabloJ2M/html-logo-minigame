let score = new Score();
let animation = false, waiting = false;
let gameIndex = Random(listOfGames.length);

//#region --------------- Events ---------------
let game = listOfGames[gameIndex];
listOfGames = null;

addEventListener("Awake", () => game.preload());
addEventListener("Start", () => game.setup());
addEventListener("Input", () => game.input());

addEventListener("Enable", () => game.start());
addEventListener("Update", () => game.update());
addEventListener("Update", () => score.update());

//#region ----------------- P5 -----------------
function preload() { dispatchEvent(onAwake); }

async function setup()
{
    var canvas = createCanvas(fitter.clientWidth, fitter.clientHeight);
    canvas.parent("minigame");

    angleMode(DEGREES);
    imageMode(CENTER);
    pixelDensity(1);

    await until(() => gameEnable);
    dispatchEvent(onStart);
}
async function draw()
{
    if (!gameEnable || waiting) return;
    clear();

    if (!animation)
    {
        waiting = true;
        await waitTime(0.5);
        dispatchEvent(onEnable);
        animation = true; waiting = false;
    }

    dispatchEvent(onUpdate);
}

//#region ------------- Extensions -------------

//input
function mouseClicked() { if (gameEnable && animation) dispatchEvent(onInput); }

//movement
function transform(position, rotation) { translate(position.x, position.y); rotate(rotation); }
function inverseTransform(position, rotation) { rotate(-rotation); translate(-position.x, -position.y); }