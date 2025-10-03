import { GAME_WIDTH } from '../constants.js';
import { player, enemies } from '../state.js';
import { Enemy } from './Enemy.js';

export class Boss {
    constructor() {
        this.x = GAME_WIDTH / 2; this.y = -100; this.radius = 60; this.weakSpotRadius = 20;
        this.maxHp = 1000; this.hp = this.maxHp; this.speed = 0.5; this.color = '#2c003e';
        this.weakSpotColor = '#ff00ff'; this.summonCooldown = 300;
    }
    update() {
        if (this.y < 150) this.y += this.speed;
        if (Math.abs(this.x - player.x) > 5) this.x += Math.sign(player.x - this.x) * this.speed;
        this.summonCooldown--;
        if (this.summonCooldown <= 0) {
            for (let i = 0; i < 3; i++) enemies.push(new Enemy(this.x, this.y));
            this.summonCooldown = 300 + Math.random() * 100;
        }
    }
    draw(ctx) {
        ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill();
        ctx.save(); ctx.shadowColor = this.weakSpotColor; ctx.shadowBlur = 25; ctx.fillStyle = this.weakSpotColor; ctx.beginPath(); ctx.arc(this.x, this.y, this.weakSpotRadius, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    }
}