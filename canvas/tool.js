class Moon {
    constructor(x, y, ctx, r = 25) {
        this.x = x;
        this.y = y;
        this.ctx = ctx;
        this.r = r;
    }
    draw() {
        this.ctx.fillStyle = 'rgba(255,255,255,0.6)';
        this.ctx.shadowBlur = this.r + 5;
        this.ctx.shadowColor = "#fff";
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
    }
}
class Star extends Moon {
    constructor(x, y, ctx, r) {
        super(x, y, ctx, r);
    }
    draw() {
        this.ctx.fillStyle = 'rgba(255,255,255,0.8)';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
    }
    move() {
        this.x += 0.08;
        if (this.x > meteorCanvas.width) {
            this.x = 0;
        }
        this.draw();
    }
}
class Meteor extends Star {
    constructor(x, y, ctx, r,angle) {
        super(x, y, ctx, r);
        this.angle = angle;
    }
    draw() {
        this.ctx.fillStyle = '#ffffff';
        this.ctx.rotate(this.angle);
        this.ctx.translate(100, -meteorCanvas.height / 1.5);
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        this.ctx.closePath();
        this.ctx.fill();
        this.ctx.translate(-100, meteorCanvas.height / 1.5);
        this.ctx.rotate(-this.angle);
    }
    move() {
        this.x += 4;
        this.y += 1;
        if (this.x > meteorCanvas.width) {
            this.x = Math.random() * 5
            this.y = -2 * meteorCanvas.height + Math.random() * meteorCanvas.height * 3;
        }
        this.draw();
    }
}