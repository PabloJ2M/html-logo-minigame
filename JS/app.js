const logo = document.getElementById("top");
const button = document.getElementById("button");

button.addEventListener('click', selectRandomGame);
listOfGames.push(new PunchGame(2700, 48, [0.475, 0.275]));
listOfEnemy.push(new PunchEnemy());

gameIndex = Random(listOfGames.length);

function selectRandomGame()
{
    logo.classList.replace("show", "hide");
    button.classList.add("hide");
    gameEnable = true;
}