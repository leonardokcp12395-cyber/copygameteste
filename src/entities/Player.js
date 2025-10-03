import { GAME_WIDTH, GAME_HEIGHT, PLAYER_COLOR, PLAYER_GLOW } from '../constants.js';
import { keys } from '../input.js';

export class Player {
    constructor() {
        this.x = GAME_WIDTH / 2;
        this.y = GAME_HEIGHT / 2;
        this.radius = 15;
        this.speed = 3;
        this.maxHp = 100;
        this.hp = this.maxHp;
        this.weapons = {
            bolt: { level: 1, damage: 5, baseCooldown: 30, cooldown: 0 },
            aura: { level: 0, damage: 2, orbs: 0, rotationSpeed: 0.02, distance: 50, radius: 10 }
        };
    }

    update() {
        if (keys.w && this.y > this.radius) this.y -= this.speed;
        if (keys.s && this.y < GAME_HEIGHT - this.radius) this.y += this.speed;
        if (keys.a && this.x > this.radius) this.x -= this.speed;
        if (keys.d && this.x < GAME_WIDTH - this.radius) this.x += this.speed;
    }

    draw(ctx) {
        ctx.save();
        ctx.shadowColor = PLAYER_GLOW;
        ctx.shadowBlur = 20;
        ctx.fillStyle = PLAYER_COLOR;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }

    takeDamage(amount) {
        this.hp -= amount;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }
}