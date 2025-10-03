
export class System {
    constructor(world) {
        this.world = world;
    }

    update(dt) {
        throw new Error('System.update() must be implemented by subclass');
    }
}
