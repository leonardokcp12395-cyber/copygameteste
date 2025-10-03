
import { System } from '../ecs/System.js';
import { Quadtree } from './Quadtree.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants.js';

class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(point) {
        return (
            point.x >= this.x &&
            point.x < this.x + this.width &&
            point.y >= this.y &&
            point.y < this.y + this.height
        );
    }

    intersects(range) {
        return !(
            range.x > this.x + this.width ||
            range.x + range.width < this.x ||
            range.y > this.y + this.height ||
            range.y + range.height < this.y
        );
    }
}

export class SpatialPartitioningSystem extends System {
    constructor(world) {
        super(world);
        const bounds = new Rectangle(0, 0, GAME_WIDTH, GAME_HEIGHT);
        this.quadtree = new Quadtree(bounds, 4);
        this.world.setResource('quadtree', this.quadtree);
    }

    update(dt) {
        this.quadtree.clear();
        const entities = this.world.getEntitiesWith('Position', 'Collidable');
        for (const entity of entities) {
            const position = this.world.getComponent(entity, 'Position');
            this.quadtree.insert({ x: position.x, y: position.y, entity: entity });
        }
    }
}
