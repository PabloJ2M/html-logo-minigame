class Asteroid extends GameTemplate
{
    maxSpeed = 15;
    constructor(position, angle, scale)
    {
        super(position, angle, scale);
        this.pivot = { x: 0, y: 0 };

        this.shoots = new Pulling();
        this.obstacles = new Pulling();
        this.obsThreshold = 50;
    }

    preload()
    {
        this.player.image = loadImage('../../Assets/asteroid/pen.png');
        this.player.pixels = { w: 332, h: 1090 };
        this.dificulty = [1, 1.3, 1.6, 1.9, 2.2];
    }
    async start()
    {
        //draw player at begining
        this.player.drawEntity(() => this.drawImage(this.player));
        this.player.targetScale = 10;

        //couroutine
        while(gameEnable) {
            await until(() => isLooping());
            await waitTime(Random(5) + 1);

            var angle = Random(360);
            var point = Direction(angle);
            point.x *= world.x + 100; point.y *= world.y + 100;

            console.log("spanw");
            this.obstacles.instance(point, -angle);
        }
    }
    update()
    {
        //calculate player position
        this.transition();

        //draw player
        this.player.drawEntity(() => this.drawImage(this.player));
        this.player.targetAngle += 2;
        
        //draw bullets
        this.shoots.items.forEach(bullet =>
        {
            if (bullet.enable) //show only visibles
            {
                //move bullet
                var dir = Direction(bullet.angle);
                bullet.position.x += dir.x * 10;
                bullet.position.y -= dir.y * 10;
                bullet.time -= deltatime * 5;

                //draw bullet
                bullet.drawEntity(() => circle(0, 0, 10));

                //detect obstacles
                var obs = this.obstacles.items;
                for(let i = 0; i < obs.length; i++)
                {
                    if (!obs[i].enable) continue;
                    if (CircleCast(bullet.position, 5, obs[i].position, 25))
                    {
                        score.addScore(10);
                        obs[i].destroy();
                        bullet.time = 0;
                        continue;
                    }
                }
            }
        });

        //calculate speed
        var index = Clamp(progress, 0, this.dificulty.length - 1);
        var speed = 0.5 * this.dificulty[index];

        //draw obstacles
        this.obstacles.items.forEach(obstacle =>
        {
            if (obstacle.enable)
            {
                var dir = Direction(obstacle.angle);
                obstacle.position.x += dir.x * speed;
                obstacle.position.y -= dir.y * speed;

                obstacle.drawEntity(() => circle(0, 0, 40));

                //detect collision with player
                if (CircleCast(obstacle.position, 40, { x: 0, y: 0 }, 15))
                {
                    obstacle.destroy();
                }
            }
        });
    }

    async input()
    {
        //calculte pivot
        var threshold = this.player.rect.h * 0.5;
        var dir = Direction(this.player.angle);
        dir.x *= threshold; dir.y *= threshold;

        //spawn bullet
        this.shoots.instance({ x: dir.x, y: -dir.y }, this.player.angle, 0.5);
    }
}