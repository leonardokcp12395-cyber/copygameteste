
import { System } from '../ecs/System.js';
import { XPOrb } from '../components/XPOrb.js';
import { Position } from '../components/Position.js';
import { Renderable } from '../components/Renderable.js';
import { Collidable } from '../components/Collidable.js';
import { XP_ORB_COLOR } from '../constants.js';
import { createExplosion } from '../entities/creators.js';

export class DamageSystem extends System {
    update(dt) {
        const entities = this.world.getEntitiesWith('Health', 'Damage');

        for (const entity of entities) {
            const health = this.world.getComponent(entity, 'Health');
            const damage = this.world.getComponent(entity, 'Damage');

            health.hp -= damage.amount;

            const isPlayer = this.world.hasComponent(entity, 'PlayerControlled');

            if (isPlayer && damage.amount > 0) {
                const camera = this.world.getResource('camera');
                if (camera) {
                    camera.shakeIntensity = 8;
                    camera.shakeDuration = 0.25;
                }
            }

            if (health.hp <= 0) {
                if (!isPlayer) { // Is an enemy
                    const position = this.world.getComponent(entity, 'Position');
                    const renderable = this.world.getComponent(entity, 'Renderable');
                    const enemy = this.world.getComponent(entity, 'Enemy');

                    if (position && renderable) {
                        createExplosion(this.world, position, renderable.color, 15);
                    }

                    if (enemy && position) {
                        const orb = this.world.createEntity();
                        this.world.addComponent(orb, new Position(position.x, position.y));
                        this.world.addComponent(orb, new Renderable(5, XP_ORB_COLOR));
                        this.world.addComponent(orb, new XPOrb(enemy.xpValue));
                        this.world.addComponent(orb, new Collidable(5));
                    }
                }
                this.world.destroyEntity(entity);
            } else {
                this.world.removeComponent(entity, 'Damage');
            }
        }
    }
}
