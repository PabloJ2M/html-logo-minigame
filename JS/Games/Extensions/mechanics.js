class PulledObject extends TObject
{
    constructor(position, angle)
    {
        super(position, angle);
        this.enable = false;
        this.time = 0;
    }

    reset(position, angle)
    {
        this.position = position;
        this.angle = angle;
        this.enable = false;
    }
    async destroy()
    {
        await until(() => this.time <= 0);
        this.enable = false;
        console.log("destroy");
    }
}

class Pulling
{
    constructor() { this.items = []; }

    instance(position, angle, time)
    {
        var item = null;

        //find disabled item
        for(let i = 0; i < this.items.length; i++)
        { if (!this.items[i].enable) { item = this.items[i]; break; } }

        //spawn new or use existing
        if (this.items.length != 0 && item != null) item.reset(position, angle);
        else { item = new PulledObject(position, angle); this.items.push(item); }
        console.log("spawn");

        //setup
        item.enable = true;
        if (time == null) return;
        item.time = time;
        item.destroy();
    }
}

class SimpleEnemy extends GameObject
{
    constructor(position, angle, scale)
    {
        super(position, angle, scale);
    }
}