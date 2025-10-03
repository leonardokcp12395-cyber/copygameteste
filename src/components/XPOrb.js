
import { Component } from '../ecs/Component.js';

export class XPOrb extends Component {
    constructor(xpValue) {
        super();
        this.xpValue = xpValue;
    }
}
