class PunchGame extends GameTemplate
{
    maxSpeed = 15;
    constructor(position, angle, scale)
    {
        super(position, angle, scale);

        this.pivot = 0, this.speed = 0;
        this.IsClicked = false;

        this.enemy = new SimpleEnemy({ x: 0, y: 0.5 }, 0, 0.7);
        this.hidePosition = 0, this.hideTarget = 0, this.hideThreshold = 0;
        this.IsEnemy = false;
    }

    preload()
    {
        this.player.image = loadImage('../../Assets/punch/hand.png');
        this.player.pixels = { w: 383, h: 446 };
        this.enemy.pixels = { w: 100, h: 100 };
        this.dificulty = [2, 1, 0.5, 0.3];
    }
    async start()
    {
        //draw player at beginning
        this.player.drawEntity(() => this.drawImage(this.player));

        //player settings
        this.player.target = { x: 0, y: -this.player.rect.h };
        this.pivot = this.player.target.y;
        this.player.targetAngle = 0;

        //enemy settings
        this.enemy.setImgSize();
        this.enemy.target.y = this.enemy.rect.h * 0.5;
        this.hideThreshold = -this.enemy.rect.w * 0.5; //only for shapes not images
        
        //couroutine
        await until(() => Abs(this.enemy.position.y - this.enemy.target.y) < 0.01);
        while (gameEnable) {
            await until(() => isLooping());
            
            //select enemy random
            this.IsEnemy = Random(2) != 0 ? true : false;
            await waitTime(Random(3) + 1);

            //set speed by dificulty
            var index = Clamp(progress, 0, this.dificulty.length - 1);
            this.hideTarget = -this.enemy.rect.h;
            await waitTime(this.dificulty[index]);

            //hide current enemy
            this.hideTarget = 0;
            await waitTime(0.8);
        }
    }
    update()
    {
        //calculate player position & draw player
        this.transition();
        this.player.drawEntity(() => this.drawImage(this.player));

        //draw enemy
        this.enemy.translate(this.speed);
        this.enemy.drawEntity(() => 
        {
            //inner enemy movement
            this.hidePosition = Lerp(this.hidePosition, this.hideTarget, this.speed * deltatime * 10);

            //inner enemy
            fill(this.IsEnemy ? color(255, 0, 0) : color(0, 255, 0));
            square(this.hideThreshold, this.hidePosition, this.enemy.rect.w, 20, 20, 0, 0);

            //hide base enemy
            fill(color(255));
            rect(this.hideThreshold, 0, this.enemy.rect.w, this.enemy.rect.h);
        });
    }
    async input()
    {
        if (this.IsClicked) return;

        this.player.target.y += this.player.rect.h;
        this.IsClicked = true;

        //hide showed enemy
        if (Abs(this.hidePosition) > this.enemy.rect.h * 0.25)
        {
            this.hideTarget = 0;
            if (this.IsEnemy) score.addScore(100);
        }

        await waitTime(0.2);
        if (Abs(this.hidePosition) > 1 && !this.IsEnemy) gameOver();

        this.player.target.y = this.pivot;
        shakeEffect();

        await waitTime(0.2);
        this.IsClicked = false;
    }
}