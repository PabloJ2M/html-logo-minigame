let gameIndex = 0;
let gameEnable = false;
let animation = false, waiting = false;

let listOfGames = [];
let listOfEnemy = [];
let score = new Score();

let container = document.getElementById("background");
let gameWidth;
let gameHeight;

async function preload()
{
    await waitTime(0.01);
    
    listOfGames[gameIndex].preload();
    listOfEnemy[gameIndex].preload();
    console.log("preloading games images");
}
async function setup()
{
    gameWidth = container.clientWidth;
    gameHeight = container.clientHeight;
    var canvas = createCanvas(gameWidth, gameHeight);
    canvas.parent("minigame");

    angleMode(DEGREES);
    imageMode(CENTER);
    pixelDensity(1);

    await until(() => gameEnable);
    listOfGames[gameIndex].setup();
    listOfEnemy[gameIndex].setup(score);
}
async function draw()
{
    if (!gameEnable || waiting) return;
    clear();

    if (!animation)
    {
        waiting = true;
        await waitTime(0.5);
        listOfGames[gameIndex].animation();
        animation = true; waiting = false;
    }

    listOfEnemy[gameIndex].update();
    listOfGames[gameIndex].update();
    score.update();
}

function mouseClicked()
{
    if (!gameEnable || !animation) return;
    listOfEnemy[gameIndex]?.input(listOfGames[gameIndex], score);
    listOfGames[gameIndex]?.input();
}

function inverseTransform(x, y, rotation) { rotate(-rotation); transform(-x, -y); }
function transform(x, y, rotation) { translate(x, y); rotate(rotation); }