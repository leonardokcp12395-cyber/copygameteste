import { player } from '../state.js';
import { distance } from '../utils.js';
import { XP_ORB_COLOR } from '../constants.js';

export class XpOrb {
    constructor(x, y, value = 2) { this.x = x; this.y = y; this.radius = 5; this.value = value; }
    update() {
        if (distance(this.x, this.y, player.x, player.y) < 70) {
            const angle = Math.atan2(player.y - this.y, player.x - this.x);
            this.x += Math.cos(angle) * 4; this.y += Math.sin(angle) * 4;
        }
    }
    draw(ctx) { ctx.save(); ctx.shadowColor = XP_ORB_COLOR; ctx.shadowBlur = 10; ctx.fillStyle = XP_ORB_COLOR; ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore(); }
}