import { Position } from '../components/Position.js';
import { Velocity } from '../components/Velocity.js';
import { Renderable } from '../components/Renderable.js';
import { TimedLifetime } from '../components/TimedLifetime.js';

export function createExplosion(world, { x, y }, color, count = 10) {
    for (let i = 0; i < count; i++) {
        const particle = world.createEntity();
        world.addComponent(particle, new Position(x, y));

        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 100 + 50; // pixels per second
        const velocity = new Velocity(Math.cos(angle) * speed, Math.sin(angle) * speed);
        world.addComponent(particle, velocity);

        const radius = Math.random() * 2 + 1;
        world.addComponent(particle, new Renderable(radius, color));

        const lifespan = Math.random() * 0.5 + 0.2; // in seconds
        world.addComponent(particle, new TimedLifetime(lifespan));
    }
}
