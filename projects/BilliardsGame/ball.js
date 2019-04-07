function Ball(name, positionindex) {
    this.name = name || null;
    this.positionIndex = positionindex;
    this.point = { x: null, y: null };
    this.speed = 0;
    this.beginSpeed = 0;
    this.tween = null;
    this.goX = null;
    this.goY = null;
    this.allgoX = null;
    this.allgoY = null;
    this.deg = null;
    this.path = [];
    this.hitObj = null;
    this.diameter = 29
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

    let x = this.Position().x;
    let y = this.Position().y;
    let deg = this.deg;
    this.path.push({ x, y, deg });

    this.hitAmount();
    this.hitBall();
    // this.tweenFn();
}
Ball.prototype.tweenFn = function () {
    let tweenArray = new Array();
    let point_ball = this;

    for (let i = 0; i < this.path.length - 1; i++) {
        let tool1 = {}, tool2 = {};
        tool1.x = this.path[i].x, tool1.y = this.path[i].y, tool1.time = this.path[i].time;
        tool2.x = this.path[i + 1].x, tool2.y = this.path[i + 1].y;
        tweenArray.push(new TWEEN.Tween(tool1));
        tweenArray[i].to({ x: tool2.x, y: tool2.y }, tool1.time)
            .easing(TWEEN.Easing.Linear.None)
            .onUpdate(function () {
                $(point_ball.name).css('left', `${tool1.x}px`);
                $(point_ball.name).css('top', `${tool1.y}px`);
            })
    }
    for (let i = 0; i < this.path.length - 1; i++) {
        if (i + 1 < tweenArray.length)
            tweenArray[i].chain(tweenArray[i + 1]);
    }

    tweenArray[0].start();
    tweenArray[tweenArray.length - 1].onComplete(function () {
        cueFollow();
        cuecon.css('visibility', 'visible');
        point_ball.path = [];
    })
}
Ball.prototype.sumTime = function () {
    if (this.path.length == 2)
        this.path[0].time = Number(this.speed) * 1000;
    else {
        let timeArr = new Array();
        let speed = Number(this.speed);
        for (let i = 0; i < this.path.length - 1; i++) {
            let weiyi = Math.sqrt(Math.pow(this.path[i + 1].x - this.path[i].x, 2)
                + Math.pow(this.path[i + 1].y - this.path[i].y, 2))
            weiyi = weiyi * 0.005;

            let time = speed - Math.sqrt(speed * speed - 2 * weiyi);
            timeArr.push(time);
            speed = speed - time;
        }
        for (let i = 0; i < timeArr.length; i++) {
            this.path[i].time = timeArr[i] * 1000;
        }
    }
}
Ball.prototype.direction = function () {
    if (this.allgoX >= 0 && this.allgoY >= 0)
        return '右下';
    if (this.allgoX >= 0 && this.allgoY <= 0)
        return '右上';
    if (this.allgoX <= 0 && this.allgoY <= 0)
        return '左上';
    if (this.allgoX <= 0 && this.allgoY >= 0)
        return '左下';
}
Ball.prototype.hitWhich = function () {
    let deg, ball_x, compare_x;
    switch (this.direction()) {
        case '右上':
            deg = Math.atan((8 - this.Position().y) / (1220 - this.Position().x));
            ball_x = 2 * Math.PI - this.deg;
            compare_x = Math.abs(deg);
            if (ball_x < compare_x) return '右';
            else return '上';
        case '右下':
            deg = Math.atan((587 - this.Position().y) / (1220 - this.Position().x));
            ball_x = this.deg;
            compare_x = Math.abs(deg);
            if (ball_x < compare_x) return '右';
            else return '下';
        case '左下':
            deg = Math.atan((587 - this.Position().y) / (10 - this.Position().x));
            ball_x = Math.PI - this.deg;
            compare_x = Math.abs(deg);
            if (ball_x < compare_x) return '左';
            else return '下';
        case '左上':
            deg = Math.atan((8 - this.Position().y) / (10 - this.Position().x));
            ball_x = this.deg - Math.PI;
            compare_x = Math.abs(deg);
            if (ball_x < compare_x) return '左';
            else return '上';
    }
}
Ball.prototype.isHit = function () {
    switch (this.hitWhich()) {
        case '右':
            if (this.allgoX + this.Position().x > 1220)
                return true;
            else return false;
        case '下':
            if (this.allgoY + this.Position().y > 587)
                return true;
            else return false;
        case '左':
            if (this.allgoX + this.Position().x < 10)
                return true;
            else return false;
        case '上':
            if (this.allgoY + this.Position().y < 8)
                return true;
            else return false;
    }
}
Ball.prototype.hitAmount = function () {
    let x, y, deg;
    while (this.isHit()) {
        switch (this.hitWhich()) {
            case '右':
                this.goX = 1220 - this.Position().x;
                this.goY = this.goX * Math.tan(this.deg);
                this.allgoX = -(this.allgoX - this.goX);
                this.allgoY = this.allgoY - this.goY;
                if (this.allgoY < 0)
                    this.deg = 3 * Math.PI - this.deg;
                else
                    this.deg = Math.PI - this.deg
                this.point.x = this.goX + this.Position().x;
                this.point.y = this.goY + this.Position().y;
                x = this.point.x;
                y = this.point.y;
                deg = this.deg
                this.path.push({ x, y, deg });
                break;
            case '下':
                this.goY = 587 - this.Position().y;
                this.goX = this.goY / Math.tan(this.deg);
                this.allgoX = this.allgoX - this.goX;
                this.allgoY = -(this.allgoY - this.goY);
                this.deg = Math.PI * 2 - this.deg
                this.point.x = this.goX + this.Position().x;
                this.point.y = this.goY + this.Position().y;
                x = this.point.x;
                y = this.point.y;
                deg = this.deg
                this.path.push({ x, y, deg });
                break;
            case '左':
                this.goX = 10 - this.Position().x;
                this.goY = this.goX * Math.tan(this.deg);
                this.allgoX = -(this.allgoX - this.goX);
                this.allgoY = this.allgoY - this.goY;
                if (this.allgoY < 0)
                    this.deg = 3 * Math.PI - this.deg;
                else
                    this.deg = Math.PI - this.deg;
                this.point.x = this.goX + this.Position().x;
                this.point.y = this.goY + this.Position().y;
                x = this.point.x;
                y = this.point.y;
                deg = this.deg
                this.path.push({ x, y, deg });
                break;
            case '上':
                this.goY = 8 - this.Position().y;
                this.goX = this.goY / Math.tan(this.deg);
                this.allgoX = this.allgoX - this.goX;
                this.allgoY = -(this.allgoY - this.goY);
                this.deg = 2 * Math.PI - this.deg;
                this.point.x = this.goX + this.Position().x;
                this.point.y = this.goY + this.Position().y;
                x = this.point.x;
                y = this.point.y;
                deg = this.deg
                this.path.push({ x, y, deg });
                break;
        }
    }
    if (!this.isHit()) {
        this.point.x = this.allgoX + this.Position().x;
        this.point.y = this.allgoY + this.Position().y;
        x = this.point.x;
        y = this.point.y;
        this.path.push({ x, y });
    }
    this.sumTime();
}
Ball.prototype.hitBall = function () {
    for (let i = 0; i < this.path.length - 1; i++) {
        for (let j = 0; j < position.length; j++) {
            if (j != this.positionIndex) {
                if (isInpath(this.path[i], this.path[i + 1], this.deg, 14.5, position[j]))
                    this.path.splice(i + 1, this.path.length - i - 1);
            }
        }
    }
    console.log(this.path);

}
Ball.prototype.Position = function () {
    if (this.point.x == null)
        this.point.x = parseInt($(this.name).css('left'));
    if (this.point.y == null)
        this.point.y = parseInt($(this.name).css('top'));
    return this.point;
}
Ball.prototype.cssPosition = function () {
    return {
        x: parseInt($(this.name).css('left'))
        , y: parseInt($(this.name).css('top'))
    }
}
function kit() {
    return parseInt(process.css('width')) * 5 / parseInt(processcon.css('width'));
}
function pointToline(p1, arr) {
    let top = Math.abs(arr.a * p1.x + arr.b * p1.y + arr.c);
    let bottom = Math.sqrt(arr.a * arr.a + arr.b * arr.b);
    return top / bottom;
}
function isInpath(p1, p2, angle, radius, p) {
    let p3 = {};
    p3.x = p1.x - radius * Math.abs(Math.sin(angle));
    p3.y = p1.y - radius * Math.abs(Math.cos(angle));
    let point_arr = [{}, {}];
    if (angle == 0 || angle == Math.PI / 2) {
        if (angle == 0) {
            point_arr[0].a = 0;
            point_arr[0].b = 1;
            point_arr[0].c = -p3.y;

            point_arr[1].a = 1;
            point_arr[1].b = 0;
            point_arr[1].c = -p3.x;
        }
        if (angle == Math.PI / 2) {
            point_arr[1].a = 0;
            point_arr[1].b = 1;
            point_arr[1].c = -p3.y;

            point_arr[0].a = 1;
            point_arr[0].b = 0;
            point_arr[0].c = -p3.x;
        }
    }
    else {
        point_arr[0].a = Math.tan(angle);
        point_arr[0].b = - 1;
        point_arr[0].c = p3.y - Math.tan(angle) * p3.x;

        point_arr[1].a = Math.tan(angle - Math.PI / 2);
        point_arr[1].b = - 1;
        point_arr[1].c = p3.y - Math.tan(angle - Math.PI / 2) * p3.x;
    }
    let distance = Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    let top = pointToline(p, point_arr[0]);
    let left = pointToline(p, point_arr[1]);
    if (left <= distance && top <= 2 * radius)
        return true;
    else
        return false;
}