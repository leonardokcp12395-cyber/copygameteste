
import { System } from '../ecs/System.js';
import { keys } from '../input.js';

export class PlayerInputSystem extends System {
    update(dt) {
        const entities = this.world.getEntitiesWith('PlayerControlled', 'Velocity');
        for (const entity of entities) {
            const velocity = this.world.getComponent(entity, 'Velocity');
            const playerControlled = this.world.getComponent(entity, 'PlayerControlled');

            velocity.vx = 0;
            velocity.vy = 0;

            if (keys.w) velocity.vy -= 1;
            if (keys.s) velocity.vy += 1;
            if (keys.a) velocity.vx -= 1;
            if (keys.d) velocity.vx += 1;

            // Normalize vector
            const magnitude = Math.sqrt(velocity.vx * velocity.vx + velocity.vy * velocity.vy);
            if (magnitude > 0) {
                velocity.vx = (velocity.vx / magnitude) * playerControlled.speed;
                velocity.vy = (velocity.vy / magnitude) * playerControlled.speed;
            }
        }
    }
}
