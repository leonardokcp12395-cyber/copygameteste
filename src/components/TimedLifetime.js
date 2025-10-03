
import { Component } from '../ecs/Component.js';

export class TimedLifetime extends Component {
    constructor(lifespan) {
        super();
        this.lifespan = lifespan;
        this.timer = lifespan;
    }
}
