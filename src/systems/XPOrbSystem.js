
import { System } from '../ecs/System.js';
import { distance } from '../utils.js';
import { Velocity } from '../components/Velocity.js';

export class XPOrbSystem extends System {
    update(dt) {
        const orbs = this.world.getEntitiesWith('XPOrb', 'Position');
        const players = this.world.getEntitiesWith('PlayerControlled', 'Position');

        if (players.size === 0) return;
        const playerEntity = players.values().next().value;
        const playerPosition = this.world.getComponent(playerEntity, 'Position');

        for (const orb of orbs) {
            const orbPosition = this.world.getComponent(orb, 'Position');

            if (distance(orbPosition.x, orbPosition.y, playerPosition.x, playerPosition.y) < 100) {
                let velocity = this.world.getComponent(orb, 'Velocity');
                if (!velocity) {
                    velocity = new Velocity();
                    this.world.addComponent(orb, velocity);
                }
                const angle = Math.atan2(playerPosition.y - orbPosition.y, playerPosition.x - orbPosition.x);
                const speed = 200;
                velocity.vx = Math.cos(angle) * speed;
                velocity.vy = Math.sin(angle) * speed;
            }
        }
    }
}
