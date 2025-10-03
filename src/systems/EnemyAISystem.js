
import { System } from '../ecs/System.js';

export class EnemyAISystem extends System {
    update(dt) {
        const enemies = this.world.getEntitiesWith('Enemy', 'Position', 'Velocity');
        const players = this.world.getEntitiesWith('PlayerControlled', 'Position');

        if (players.size === 0) return;
        const playerEntity = players.values().next().value; // Get the first player
        const playerPosition = this.world.getComponent(playerEntity, 'Position');

        for (const entity of enemies) {
            const position = this.world.getComponent(entity, 'Position');
            const velocity = this.world.getComponent(entity, 'Velocity');
            const enemy = this.world.getComponent(entity, 'Enemy');

            const angle = Math.atan2(playerPosition.y - position.y, playerPosition.x - position.x);
            velocity.vx = Math.cos(angle) * enemy.speed;
            velocity.vy = Math.sin(angle) * enemy.speed;
        }
    }
}
