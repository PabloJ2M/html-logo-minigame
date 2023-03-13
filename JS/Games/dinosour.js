class Dinosour extends GameTemplate
{
    maxSpeed = 15;
    currentDificulty = 0;

    constructor(position, angle, scale)
    {
        super(position, angle, scale);

        this.IsClicked = false;
        
        this.velocity = 0;
        this.ground = 0;

        this.obstacles = new Pulling();
        this.obstacleSize = 50;
    }

    preload()
    {
        this.player.image = loadImage('../../Assets/dinosour/alien.png');
        this.player.pixels = { w: 272, h: 509 };
        this.dificulty = [0.5, 0.65, 0.80, 0.95];
    }
    async start()
    {
        //draw player at begining
        this.setup();
        this.player.targetAngle = 0;
        this.player.targetScale = 5;
        this.player.target = { x: -175, y: 0 };

        this.ground = this.player.rect.w * 0.45;
        this.currentDificulty = this.dificulty[getProgress(this.dificulty.length)];

        //courutine
        while(gameEnable)
        {
            //random spawn delay
            await waitTime(Random(4) + (1.65 - this.currentDificulty));

            //spawn random row
            var amount = Random(3) + 1;
            for (let i = 0; i < amount; i++)
            {
                this.obstacles.instance({ x: world.x + (this.obstacleSize * i), y: -this.ground }, 0, 1);
            }
        }
    }
    update()
    {
        //calculate player position & draw player
        this.transition();
        this.player.drawEntity(() => this.drawImage(this.player));

        this.currentDificulty = this.dificulty[getProgress(this.dificulty.length)];

        //gravity
        if (this.IsClicked)
        {
            this.player.target.y += this.velocity;
            this.player.position.y = this.player.target.y;
            this.velocity += 0.8 * this.currentDificulty;

            //ground detection
            if (this.player.position.y > 0)
            {
                this.player.position.y = this.player.target.y = 0;
                this.IsClicked = false;
            }
        }

        //obstacles
        var size = { x: this.obstacleSize, y: this.obstacleSize };

        this.obstacles.items.forEach(obs =>
        {
            if (obs.enable) //draw only availables
            {
                //destroy
                if (obs.position.x < -world.x - this.obstacleSize) obs.time = 0;
    
                //draw & move
                obs.drawEntity(() => square(0, 0, this.obstacleSize));
                obs.position.x -= this.speed * this.currentDificulty;

                //detect collision
                var obsSize = this.obstacleSize * 0.5;
                var obsPosition = { x: obs.position.x + obsSize, y: obs.position.y + obsSize }; 
                if (BoxCast(this.player.position, obsPosition, size, 10))
                {
                    gameOver();
                }
            }
        });
    }

    input()
    {
        if (this.IsClicked) return;
        this.IsClicked = true;
        this.velocity = -9 - (5 * this.currentDificulty);
    }
}