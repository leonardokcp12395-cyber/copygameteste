export class Particle {
    constructor(x, y, color) { this.x = x; this.y = y; this.radius = Math.random() * 3 + 1; this.color = color; this.lifespan = 100; this.vx = (Math.random() - 0.5) * 3; this.vy = (Math.random() - 0.5) * 3; }
    update() { this.x += this.vx; this.y += this.vy; this.lifespan--; }
    draw(ctx) { ctx.save(); ctx.globalAlpha = this.lifespan / 100; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
}