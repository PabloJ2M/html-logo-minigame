class Score
{
    constructor()
    {
        this.time = 0;
        this.score = 0;
        this.step = 50;
    }

    update()
    {
        textSize(32);
        textAlign(LEFT);
        fill(color(255));
        text('score: ' + this.score.toString(), 10, 32);

        textAlign(RIGHT);
        text(Math.floor(this.time), fitter.clientWidth - 10, 32);

        this.time += 0.05;
        if (this.time > this.step * (progress + 1)) { progress++; console.log(progress); }
    }

    addScore = (amount) => this.score = Clamp(this.score += amount, 0, 100000);
}