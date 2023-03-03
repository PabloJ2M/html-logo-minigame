//#region ------------------- HTML -------------------

const logo = document.getElementById("top");
const button = document.getElementById("button");
const fitter = document.getElementById("background");
const container = document.getElementById("minigame");

button.addEventListener('click', selectRandomGame);

function selectRandomGame()
{
    logo.classList.replace("show", "hide");
    button.classList.add("hide");
    gameEnable = true;
}

//#region ----------------- Gameplay -----------------

let listOfGames = [];
let gameEnable = false;
let progress = 0;

const onInput = new Event("Input");
const onAwake = new Event("Awake");
const onEnable = new Event("Enable");
const onStart = new Event("Start");
const onUpdate = new Event("Update");

async function shakeEffect()
{
    container.classList.add("shake");
    await waitTime(0.1);
    container.classList.remove("shake");
}