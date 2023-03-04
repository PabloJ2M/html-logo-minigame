class PulledObject extends TObject
{
    constructor(position, angle)
    {
        super(position, angle);
        this.enable = false;
        this.target = 0;
    }

    reset(position, angle, target)
    {
        this.position = position;
        this.angle = angle;
        this.enable = false;
        this.target = target;
    }
}

class Pulling
{
    constructor() { this.items = []; }

    instance(position, angle, target, time)
    {
        var item = null;

        //find disable item
        for(let i = 0; i < this.items.length; i++)
        { if (!this.items[i].enable) { item = this.items[i]; break; } }

        if (this.items.length != 0 && item != null) item.reset(position, angle, target); 
        else { item = new PulledObject(position, angle); this.items.push(item); }
        this.destroy(item, time);
        item.enable = true;
    }

    async destroy(item, time)
    {
        if (time == null) return;
        await waitTime(time);
        item.enable = false;
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