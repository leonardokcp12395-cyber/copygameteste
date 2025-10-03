import { System } from '../ecs/System.js';

export class ParticleSystem extends System {
    constructor(world) {
        super(world);
    }

    update(dt) {
        const entities = this.world.getEntitiesWith('TimedLifetime', 'Renderable');

        for (const entity of entities) {
            const lifetime = this.world.getComponent(entity, 'TimedLifetime');
            lifetime.timer -= dt;

            if (lifetime.timer <= 0) {
                this.world.destroyEntity(entity);
            } else {
                // Fade out effect
                const renderable = this.world.getComponent(entity, 'Renderable');
                if (renderable) {
                    renderable.opacity = Math.max(0, lifetime.timer / lifetime.lifespan);
                }
            }
        }
    }
}
