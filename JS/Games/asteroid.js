class Asteroid extends GameTemplate
{
    maxSpeed = 15;
    constructor(position, angle, scale)
    {
        super(position, angle, scale);
        this.obstacles = [];
        this.shoots = [];
    }

    preload()
    {
        this.player.size = { w: 383, h: 469 };
        this.player.image = loadImage('../Assets/punch/hand.png');
    }
    start()
    {
        this.player.angleTarget = 0;
        this.player.target = { x: fitter.clientWidth * 0.5, y: fitter.clientHeight * 0.5 };
        
        //draw player at begining
        this.drawEntity(this.player);
    }
    update()
    {
        //calculate player position
        this.transition();

        //draw player
        this.drawEntity(this.player);

        //rotate
        this.player.targetAngle += 3;
    }
    async input()
    {
        console.log("shoot");
    }
}

//adding gameplay to list
listOfGames.push(new Asteroid({ x: 0.475, y: 0.275 }, 48, 2.7));