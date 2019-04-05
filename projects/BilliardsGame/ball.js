function Ball(name) {
    this.name = name || null;
    this.point = { x: null, y: null };
    this.speed = 0;
    this.zuli_a = 0.01;
    this.angle = 0;
    this.tween = null;
    this.goX = null;
    this.goY = null;
    this.restX = null;
    this.restY = null;
    this.allgoX = null;
    this.allgoY = null;
    this.deg = null;
}
let cue_angle = 0;

Ball.prototype.setSpeed = function (kit) {
    this.speed = kit().toFixed(2);
}
Ball.prototype.jianSu = function () {
    let interval = setInterval(() => {
        this.speed = (this.speed - this.zuli_a).toFixed(2);
        if (this.speed <= 0) clearInterval(interval);
    }, 10)
}
Ball.prototype.setAngle = function (angle) {
    this.angle = angle;
}
Ball.prototype.getAngle = function () {
    return this.angle;
}
Ball.prototype.move = function () {

    let weiyi = parseInt((Math.pow(this.speed, 2) - 1 / 2 * Math.pow(this.speed, 2)) / 0.005);
    this.deg = cue_angle * Math.PI / 180;
    this.allgoX = weiyi * Math.cos(this.deg);
    this.allgoY = weiyi * Math.sin(this.deg);
    this.point.x = this.Position().x;
    this.point.y = this.Position().y;
    let time = parseInt(this.speed * 1000);
    let tool = this.point;
    let ball = this;
    this.tween = new TWEEN.Tween(tool)
        .to({ x: this.allgoX + tool.x, y: tool.y + this.allgoY }, time)
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(function () {
            ball.hitTest();
            circle.css('left', `${tool.x}px`);
            circle.css('top', `${tool.y}px`);
        })
        .onComplete(function () {
            cueFollow();
            cuecon.css('visibility', 'visible');
        })
        .start();
}
Ball.prototype.hitTest = function () {
    let left = parseInt($(this.name).css('left'));
    let top = parseInt($(this.name).css('top'));
    if (left > 1220 || top > 587 || left < 10 || top < 8) {
        TWEEN.remove(this.tween);
        if (this.Position().x >= 1220 && this.Position().y >= 8 && this.Position().y <= 587) {
            this.goX = 1220 - this.point.x;
            this.goY = this.goX * Math.tan(this.deg);
            this.restX = this.allgoX - 1220;
            this.restY = this.allgoY - this.goY;

            this.moveAgain_lr();
        }
        if (this.Position().x <= 10 && this.Position().y >= 8 && this.Position().y <= 587) {
            this.goX = 10 - this.point.x;
            this.goY = this.goX * Math.tan(this.deg);
            this.restX = this.allgoX - 10;
            this.restY = this.allgoY - this.goY;

            this.moveAgain_lr();
        }
        if (this.Position().y <= 8 && this.Position().x >= 10 && this.Position().x <= 1220) {
            this.goY = 8 - this.point.y;
            this.goX = this.goY / Math.tan(this.deg);
            this.restY = this.allgoY - 8;
            this.restX = this.allgoX - this.goX;

            this.moveAgain_tb();
        }
        if (this.Position().y >= 587 && this.Position().x >= 10 && this.Position().x <= 1220) {
            this.goY = 587 - this.point.y;
            this.goX = this.goY / Math.tan(this.deg);
            this.restY = this.allgoY - 587;
            this.restX = this.allgoX - this.goX;

            this.moveAgain_tb();
        }
    }
}
Ball.prototype.moveAgain_lr = function () {
    this.point.x = this.Position().x;
    this.point.y = this.Position().y;
    let tool = this.point;
    let ball = this;
    let a = 0;
    this.tween = new TWEEN.Tween(tool)
        .to({ x: tool.x - ball.restX, y: tool.y + ball.restY })
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(function () {
            a++;
            if(a>2)
            ball.hitTest();
            circle.css('left', `${tool.x}px`);
            circle.css('top', `${tool.y}px`);
        })
        .onComplete(function () {
            cueFollow();
            cuecon.css('visibility', 'visible');
        })
        .start();
}
Ball.prototype.moveAgain_tb = function () {
    this.point.x = this.Position().x;
    this.point.y = this.Position().y;
    let tool = this.point;
    let ball = this;
    let a = 0;
    this.tween = new TWEEN.Tween(tool)
        .to({ x: tool.x + ball.restX, y: tool.y - ball.restY })
        .easing(TWEEN.Easing.Cubic.Out)
        .onUpdate(function () {
            a++;
            if(a>2)
            ball.hitTest();
            circle.css('left', `${tool.x}px`);
            circle.css('top', `${tool.y}px`);
        })
        .onComplete(function () {
            cueFollow();
            cuecon.css('visibility', 'visible');
        })
        .start();
}
Ball.prototype.Position = function () {
    return { x: parseInt($(this.name).css('left')), y: parseInt($(this.name).css('top')) }
}
function kit() {
    return parseInt(process.css('width')) * 5 / parseInt(processcon.css('width'));
}