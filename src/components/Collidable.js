
import { Component } from '../ecs/Component.js';

export class Collidable extends Component {
    constructor(radius) {
        super();
        this.radius = radius;
    }
}
