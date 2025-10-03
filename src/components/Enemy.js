
import { Component } from '../ecs/Component.js';

export class Enemy extends Component {
    constructor(xpValue) {
        super();
        this.xpValue = xpValue;
    }
}
