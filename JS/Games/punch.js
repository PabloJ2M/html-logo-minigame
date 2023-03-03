class PunchGame extends GameTemplate
{
    maxSpeed = 15;
    constructor(position, angle, scale)
    {
        super(position, angle, scale);

        this.pivot = 0, this.speed = 0;
        this.IsClicked = false;

        this.enemy = new SimpleEnemy({ x: 0.5, y: 1 }, 0, 0.7, [2, 1, 0.5, 0.3]);
        this.hidePosition = 0, this.hideTarget = 0;
        this.IsEnemy = false;
    }

    preload()
    {
        this.player.size = { w: 383, h: 469 };
        this.enemy.size = { w: 100, h: 100 };

        this.player.image = loadImage('../Assets/punch/hand.png');
    }
    async start()
    {
        //player settings
        this.player.target = { x: fitter.clientWidth * 0.5, y: fitter.clientHeight * 0.5 - this.player.height };
        this.pivot = this.player.target.y;
        this.player.targetAngle = 0;

        //enemy settings
        this.enemy.setImgSize();
        this.enemy.position.y += this.enemy.height;
        this.enemy.target.y = (fitter.clientHeight * 0.5) + (this.enemy.height * 0.5);

        //draw player at begining
        this.drawEntity(this.player);

        //couroutine
        await until(() => Abs(this.enemy.position.y - this.enemy.target.y) < 0.01);
        while (gameEnable) {
            //select enemy random
            this.IsEnemy = Random(2) != 0 ? true : false;
            await waitTime(Random(3) + 1);

            //set speed by dificulty
            var index = Clamp(progress, 0, this.enemy.dificulty.length - 1);
            this.hideTarget = -this.enemy.height;
            await waitTime(this.enemy.dificulty[index]);

            //hide current enemy
            this.hideTarget = 0;
            await waitTime(0.8);
        }
    }
    update()
    {
        //calculate player position
        this.transition();

        //draw player
        this.drawEntity(this.player);

        //draw enemy
        var xThreshold = -this.enemy.width * 0.5;
        transform(this.enemy.position, 0);

        //inner enemy movement
        this.hidePosition = Lerp(this.hidePosition, this.hideTarget, this.speed * deltatime * 10);
        
        //inner enemy
        fill(this.IsEnemy ? color(255, 0, 0) : color(0, 255, 0));
        square(xThreshold, this.hidePosition, this.enemy.width, 20, 20, 0, 0);

        //hide base enemy
        fill(color(255, 255, 255));
        rect(xThreshold, 0, this.enemy.width, this.enemy.height);
        inverseTransform(this.enemy.position, 0);

        this.enemy.translate(this.speed);
    }
    async input()
    {
        if (this.IsClicked) return;

        this.player.target.y += this.player.height;
        this.IsClicked = true;

        //hide showed enemy
        if (Abs(this.hidePosition) > this.enemy.height * 0.25)
        {
            this.hideTarget = 0;
            if (this.IsEnemy) score.addScore(100); else score.addScore(-50);
        }

        await waitTime(0.2);
        this.player.target.y = this.pivot;
        shakeEffect();

        await waitTime(0.2);
        this.IsClicked = false;
    }
}

//adding gameplay to list
listOfGames.push(new PunchGame({ x: 0.475, y: 0.275 }, 48, 2.7));