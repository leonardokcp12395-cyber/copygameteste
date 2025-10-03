
import { Component } from '../ecs/Component.js';

export class Renderable extends Component {
    constructor(radius, color, shape = 'circle') {
        super();
        this.radius = radius;
        this.color = color;
        this.shape = shape;
        this.shadowBlur = 0;
        this.shadowColor = '#000';
        this.opacity = 1;
    }
}
