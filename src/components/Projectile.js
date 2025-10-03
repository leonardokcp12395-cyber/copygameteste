
import { Component } from '../ecs/Component.js';

export class Projectile extends Component {
    constructor(damage) {
        super();
        this.damage = damage;
    }
}
