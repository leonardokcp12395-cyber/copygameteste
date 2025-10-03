import { Component } from '../ecs/Component.js';

export class PlayerStats extends Component {
    constructor(level = 1, xp = 0, requiredXp = 10) {
        super();
        this.level = level;
        this.xp = xp;
        this.requiredXp = requiredXp;
    }
}
