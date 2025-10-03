import { player } from './state.js';
import { distance } from './utils.js';

export class StarFragment {
    constructor(x, y) { 
        this.x = x; 
        this.y = y; 
        this.radius = 7;
        this.value = 1;
        this.angle = Math.random() * Math.PI * 2;
    }
    update() {
        if (distance(this.x, this.y, player.x, player.y) < 80) {
            const angle = Math.atan2(player.y - this.y, player.x - this.x);
            this.x += Math.cos(angle) * 5;
            this.y += Math.sin(angle) * 5;
        }
    }
    draw(ctx) { 
        ctx.save(); 
        ctx.shadowColor = '#ffff00'; 
        ctx.shadowBlur = 15; 
        ctx.fillStyle = '#ffff00'; 
        ctx.beginPath();
        this.angle += 0.1;
        for (let i = 0; i < 10; i++) {
            const length = i % 2 === 0 ? this.radius : this.radius / 2;
            const x = this.x + length * Math.cos(this.angle + (i * Math.PI / 5));
            const y = this.y + length * Math.sin(this.angle + (i * Math.PI / 5));
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill(); 
        ctx.restore(); 
    }
}