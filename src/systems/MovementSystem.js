
import { System } from '../ecs/System.js';

export class MovementSystem extends System {
    update(dt) {
        const entities = this.world.getEntitiesWith('Position', 'Velocity');
        for (const entity of entities) {
            const position = this.world.getComponent(entity, 'Position');
            const velocity = this.world.getComponent(entity, 'Velocity');
            position.x += velocity.vx * dt;
            position.y += velocity.vy * dt;
        }
    }
}
