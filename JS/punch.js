class PunchGame
{
    constructor(scale, angle, position)
    {
        this.characterImg;
        this.characterSize = [383, 469];

        this.speed = 0;
        this.maxSpeed = 0.8;
        this.angle = angle;
        this.angleTarget = angle;

        this.position = [container.clientWidth * position[0], container.clientHeight * position[1]];
        this.positionTarget = this.position;

        this.width = this.characterSize[0] * (container.clientWidth / scale);
        this.height = this.characterSize[1] * (container.clientWidth / scale);

        this.IsClicked = false;
    }

    preload() { this.characterImg = loadImage('../Assets/punch/hand.png'); }
    setup() { this.drawPlayer(); }
    update() { this.drawPlayer(); }

    async input()
    {
        if (this.IsClicked) return;

        this.IsClicked = true;
        this.positionTarget[1] += this.height;

        await waitTime(0.15);
        this.positionTarget[1] -= this.height;
        
        await waitTime(0.15);
        this.IsClicked = false;
    }

    drawPlayer()
    {
        if (this.speed < this.maxSpeed) this.speed += deltatime * 10;
        var x = Lerp(this.position[0], this.positionTarget[0], this.speed);
        var y = Lerp(this.position[1], this.positionTarget[1], this.speed);
        var r = Lerp(this.angle, this.angleTarget, this.speed);

        transform(x, y, r); image(this.characterImg, 0, 0, this.width, this.height); inverseTransform(x, y, r);
        this.position = [x, y];
        this.angle = r;
    }
    animation()
    {
        this.positionTarget = [gameWidth * 0.5, gameHeight * 0.5 - this.height];
        this.angleTarget = 0;
    }
}
class PunchEnemy
{
    constructor()
    {
        this.enemyImg = [];
        this.enemySize = 50;
        this.position = [];

        this.hideSize = 80;
        this.hideTarget = 0;
        this.hidePosition = 0;

        this.IsEnemy = false;

        this.score;
        this.showTime = [2, 1, 0.5, 0.3];
        this.animationComplete = false;
    }
    preload()
    {

    }
    async setup(score)
    {
        this.position = [gameWidth * 0.5, gameHeight];
        await until(() => this.animationComplete);

        while(gameEnable) //courutine
        {
            this.IsEnemy = Random(2) != 0 ? true : false;
            await waitTime(Random(3) + 1);

            this.hideTarget = -this.hideSize;
            await waitTime(this.showTime[Clamp(score.dificulty, 0, this.showTime.length - 1)]);

            this.hideTarget = 0;
            await waitTime(0.8);
        }
    }
    update()
    {
        transform(this.position[0], this.position[1], 0);
        var xPos = -this.hideSize * 0.5; 

        //inner enemy
        fill(this.IsEnemy ? color(255, 0, 0) : color(0, 255, 0));
        this.hidePosition = Lerp(this.hidePosition, this.hideTarget, deltatime * 500);
        square(xPos, this.hidePosition, this.hideSize, 20, 20, 0, 0);
        
        //base
        fill(color(255, 255, 255));
        rect(xPos, 0, this.hideSize, this.hideSize);

        inverseTransform(this.position[0], this.position[1], 0);
        this.displayAnimation();
    }
    async input(player, score)
    {
        if (player.IsClicked) return;

        await waitTime(0.05);
        if (this.hidePosition > -this.hideSize * 0.5) return;

        //succesfull
        if (this.IsEnemy) score.addScore(100); else score.addScore(-50);
        this.hideTarget = 0;
    }

    displayAnimation()
    {
        var yTarget = (gameHeight * 0.5) + (this.hideSize * 0.5);
        if (Abs(this.position[1] - yTarget) < 0.1) this.animationComplete = true;
        else this.position[1] = Lerp(this.position[1], yTarget, deltatime * 100);
    }
}