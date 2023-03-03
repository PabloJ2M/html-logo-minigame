class GameObject
{
    image = null;
    size = { w: 0, h: 0 };

    constructor(position, angle, scale)
    {
        //position
        this.position = { x: fitter.clientWidth * position.x, y: fitter.clientHeight * position.y }
        this.target = { x: this.position.x, y: this.position.y }

        //angle
        this.angle = angle;
        this.targetAngle = angle;

        //size in pixels
        this.scale = scale * 1000;
        this.width;
        this.height;
    }

    setImgSize()
    {
        var percent = fitter.clientWidth / this.scale;
        this.width = this.size.w * percent;
        this.height = this.size.h * percent;
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
    }
}

class GameTemplate
{
    maxSpeed = 0;

    constructor(position, angle, scale)
    {
        this.speed = 0;
        this.player = new GameObject(position, angle, scale);
    }

    setup()
    {
        //set size percent base on gameplay box area
        this.player.setImgSize();

        //draw player in logo
        this.drawEntity(this.player);
    }
    transition()
    {
        //move element to target position
        this.player.translate(this.speed);

        //add speed form static start
        if (this.speed >= this.maxSpeed) return;
        this.speed += 0.5;
    }
    drawEntity(gameObject)
    {
        transform(gameObject.position, gameObject.angle);
        image(gameObject.image, 0, 0, gameObject.width, gameObject.height);
        inverseTransform(gameObject.position, gameObject.angle);
    }
}

class SimpleEnemy extends GameObject
{
    constructor(position, angle, scale, dificulty)
    {
        super(position, angle, scale);
        this.dificulty = dificulty;
    }
}