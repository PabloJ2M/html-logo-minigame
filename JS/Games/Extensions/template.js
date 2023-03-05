class GameTemplate
{
    maxSpeed = 0;
    dificulty = [0];

    constructor(position, angle, scale)
    {
        this.speed = 0;
        this.player = new GameObject(position, angle, scale);
    }

    drawImage(gameObject) { image(gameObject.image, 0, 0, gameObject.rect.w, gameObject.rect.h); }

    setup()
    {
        //set size percent base on gameplay box area
        this.player.setImgSize();

        //draw player in logo
        this.player.drawEntity(() => this.drawImage(this.player));
    }
    transition()
    {
        //move element to target position
        this.player.translate(this.speed);

        //add speed form static start
        if (this.speed >= this.maxSpeed) return;
        this.speed += 0.5;
    }
}

class TObject 
{
    image = null;
    pixels = { w: 0, h: 0 }

    constructor(position, angle)
    {
        this.position = position;
        this.angle = angle;
        this.rect = { w: 0, h: 0 };
    }

    drawEntity(fn)
    {
        transform(this.position, this.angle);
        fn();
        inverseTransform(this.position, this.angle);
    }
}

class GameObject extends TObject
{
    constructor(position, angle, scale)
    {
        //set position in screen percent
        super({ x: fitter.clientWidth * position.x, y: fitter.clientHeight * position.y }, angle);
        
        //scale factor in screen percent
        this.scale = scale;

        //lerp values
        this.target = { x: 0, y: 0 }
        this.targetAngle = angle;
        this.targetScale = this.scale;
    }

    setImgSize()
    {
        var percent = fitter.clientWidth / (this.scale * 1000);
        this.rect = { w: this.pixels.w * percent, h: this.pixels.h * percent };
    }
    translate(speed)
    {
        var current = deltatime * speed * 20;

        if (Abs(this.position.x - this.target.x) > 0.01 || Abs(this.position.y - this.target.y) > 0.01)
        {
            this.position.x = Lerp(this.position.x, this.target.x, current);
            this.position.y = Lerp(this.position.y, this.target.y, current);
        }

        if (Abs(this.angle - this.targetAngle) > 0.01)   
        {
            //clamp angle
            this.angle = ClampAngle(this.angle, () =>
            this.targetAngle = (this.targetAngle > 0) ? this.targetAngle - 360 : this.targetAngle + 360);

            this.angle = Lerp(this.angle, this.targetAngle, current);
        }

        if (Abs(this.scale - this.targetScale) > 0.01)
        {
            this.scale = Lerp(this.scale, this.targetScale, current);
            this.setImgSize();
        }
    }
}