
import { Component } from '../ecs/Component.js';

export class Health extends Component {
    constructor(hp, maxHp) {
        super();
        this.hp = hp;
        this.maxHp = maxHp || hp;
    }
}
