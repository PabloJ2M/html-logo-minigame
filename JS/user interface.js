class Score
{
    constructor()
    {
        this.step = 50;
        this.dificulty = 0;
        this.score = 0;
        this.time = 0;
    }

    setup() { }
    update()
    {
        textSize(32);
        textAlign(LEFT);
        text('score: ' + this.score.toString(), 10, 32);

        textAlign(RIGHT);
        text(Math.floor(this.time), gameWidth - 10, 32);

        this.time += 0.05;
        if (this.time > this.step * (this.dificulty + 1)) { this.dificulty++; console.log(this.dificulty); }
    }

    addScore = (amount) => this.score = Clamp(this.score += amount, 0, 100000);
}