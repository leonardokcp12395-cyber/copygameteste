
import { Component } from '../ecs/Component.js';

export class Weapon extends Component {
    constructor(baseCooldown, damage) {
        super();
        this.baseCooldown = baseCooldown;
        this.cooldown = 0;
        this.damage = damage;
    }
}
