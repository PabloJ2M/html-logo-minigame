class Asteroid extends GameTemplate
{
    maxSpeed = 15;
    constructor(position, angle, scale)
    {
        super(position, angle, scale);
        this.pivot = { x: 0, y: 0 };

        this.shoots = new Pulling();
        this.obstacles = new Pulling();
    }

    preload()
    {
        this.player.pixels = { w: 332, h: 1090 };
        this.player.image = loadImage('../../Assets/asteroid/pen.png');
    }
    async start()
    {
        //draw player at begining
        this.player.drawEntity(() => this.drawImage(this.player));
        this.player.targetScale = 5;

        //couroutine
        while(gameEnable)
        {
            await waitTime(Random(5) + 1);
            var point = Direction(Random(1) * 360);
            console.log("spawn", point);
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
        for(let i = 0; i < this.shoots.items.length; i++)
        {
            //dont show invisibles
            if (!this.shoots.items[i].enable) continue;
            
            //move bullet
            this.shoots.items[i].target -= 10;
            this.shoots.items[i].drawEntity(() => circle(0, this.shoots.items[i].target, 10))

            //detect collision
        }

        //draw obstacles
        for(let i = 0; i < this.obstacles.items.length; i++)
        {
            if (!this.obstacles.items[i].enable) continue;
        }
    }

    async input()
    {
        //calculte pivot
        var threshold = this.player.rect.h * 0.5;
        var dir = Direction(this.player.angle);
        dir.x *= threshold; dir.y *= threshold;

        this.shoots.instance({ x: dir.x, y: -dir.y }, this.player.angle, 0, 0.5);
    }
}