import { player } from '../state.js';
import { ENEMY_COLOR } from '../constants.js';

export class Enemy {
    constructor(x, y, type = 'normal') {
        this.x = x;
        this.y = y;
        this.type = type;
        if (this.type === 'armored') {
            this.radius = 25 + Math.random() * 5;
            this.hp = 50;
            this.speed = 0.8 + Math.random() * 0.3;
            this.color = '#800080';
            this.xpValue = 10;
        } else {
            this.radius = 10 + Math.random() * 10;
            this.hp = 10;
            this.speed = 1 + Math.random() * 0.5;
            this.color = ENEMY_COLOR;
            this.xpValue = 2;
        }
    }

    update() {
        const angle = Math.atan2(player.y - this.y, player.x - this.x);
        this.x += Math.cos(angle) * this.speed;
        this.y += Math.sin(angle) * this.speed;
    }

    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
}