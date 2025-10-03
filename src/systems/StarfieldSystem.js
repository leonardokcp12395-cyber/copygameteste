
import { System } from '../ecs/System.js';

export class StarfieldSystem extends System {
    constructor(world, ctx) {
        super(world);
        this.ctx = ctx;
        this.stars = [];
        this.numStars = 200;
        this.world.setResource('stars', this.stars);

        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * 2000 - 1000,
                y: Math.random() * 2000 - 1000,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.5 + 0.1
            });
        }
    }

    update(dt) {
        const camera = this.world.getResource('camera');
        if (!camera) return;

        this.ctx.save();
        this.ctx.fillStyle = '#FFF';
        this.ctx.translate(-camera.x, -camera.y);

        for (const star of this.stars) {
            const parallaxX = star.x - camera.x * (1 - star.speed);
            const parallaxY = star.y - camera.y * (1 - star.speed);
            this.ctx.beginPath();
            this.ctx.arc(parallaxX, parallaxY, star.size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }
}
