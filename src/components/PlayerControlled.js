
import { Component } from '../ecs/Component.js';

export class PlayerControlled extends Component {
    constructor(speed) {
        super();
        this.speed = speed;
    }
}
