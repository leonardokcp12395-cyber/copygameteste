import { PROJECTILE_COLOR } from '../constants.js';

export class Projectile {
    constructor(x, y, angle, damage) {
        this.x = x; this.y = y; this.radius = 5; this.speed = 8; this.damage = damage;
        this.vx = Math.cos(angle) * this.speed; this.vy = Math.sin(angle) * this.speed;
    }
    update() { this.x += this.vx; this.y += this.vy; }
    draw(ctx) { ctx.fillStyle = PROJECTILE_COLOR; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill(); }
}