
import { Component } from '../ecs/Component.js';

export class Velocity extends Component {
    constructor(vx = 0, vy = 0) {
        super();
        this.vx = vx;
        this.vy = vy;
    }
}
