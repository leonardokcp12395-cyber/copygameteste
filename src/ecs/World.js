
export class World {
    constructor() {
        this.entities = new Map();
        this.nextEntityId = 0;
        this.systems = [];
        this.queries = {};
        this.resources = new Map();
    }

    // Resource methods
    setResource(name, value) {
        this.resources.set(name, value);
    }

    getResource(name) {
        return this.resources.get(name);
    }

    hasResource(name) {
        return this.resources.has(name);
    }

    createEntity() {
        const entity = this.nextEntityId++;
        this.entities.set(entity, new Map());
        return entity;
    }

    addComponent(entity, component) {
        const componentName = component.constructor.name;
        this.entities.get(entity).set(componentName, component);
        this.updateQueries(entity, componentName);
    }

    getEntitiesWith(...componentNames) {
        const queryKey = componentNames.sort().join('-');
        if (!this.queries[queryKey]) {
            this.queries[queryKey] = new Set();
            for (const [entity, components] of this.entities.entries()) {
                if (componentNames.every(name => components.has(name))) {
                    this.queries[queryKey].add(entity);
                }
            }
        }
        return this.queries[queryKey];
    }

    getComponent(entity, componentName) {
        return this.entities.get(entity).get(componentName);
    }

    removeComponent(entity, componentName) {
        const components = this.entities.get(entity);
        if (components) {
            components.delete(componentName);
            this.updateQueries(entity, componentName);
        }
    }

    destroyEntity(entity) {
        for (const queryKey in this.queries) {
            this.queries[queryKey].delete(entity);
        }
        this.entities.delete(entity);
    }

    registerSystem(system) {
        this.systems.push(system);
    }

    update(dt) {
        for (const system of this.systems) {
            system.update(dt);
        }
    }

    updateQueries(entity, componentName) {
        for (const queryKey in this.queries) {
            if (queryKey.includes(componentName)) {
                const components = this.entities.get(entity);
                const componentNames = queryKey.split('-');
                if (componentNames.every(name => components.has(name))) {
                    this.queries[queryKey].add(entity);
                } else {
                    this.queries[queryKey].delete(entity);
                }
            }
        }
    }
}
