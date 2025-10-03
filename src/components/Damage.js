
import { Component } from '../ecs/Component.js';

export class Damage extends Component {
    constructor(amount) {
        super();
        this.amount = amount;
    }
}
