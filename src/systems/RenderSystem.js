
import { System } from '../ecs/System.js';

export class RenderSystem extends System {
    constructor(world, ctx) {
        super(world);
        this.ctx = ctx;
        this.canvas = ctx.canvas;
    }

    update(dt) {
        const gameState = this.world.getResource('gameState');
        if (!gameState || gameState.currentState !== 'PLAYING') {
            return;
        }

        const camera = this.world.getResource('camera');
        if (!camera) return;

        this.ctx.save();
        this.ctx.translate(-camera.x, -camera.y);

        const entities = this.world.getEntitiesWith('Position');

        for (const entity of entities) {
            if (this.world.hasComponent(entity, 'Sprite')) {
                this.drawSprite(entity);
            } else if (this.world.hasComponent(entity, 'Renderable')) {
                this.drawShape(entity);
            }
        }

        this.ctx.restore();
    }

    drawSprite(entity) {
        const position = this.world.getComponent(entity, 'Position');
        const sprite = this.world.getComponent(entity, 'Sprite');
        const velocity = this.world.getComponent(entity, 'Velocity') ?? { x: 0, y: -1 };
        const angle = Math.atan2(velocity.y, velocity.x) + Math.PI / 2;

        this.ctx.save();
        this.ctx.translate(position.x, position.y);
        this.ctx.rotate(angle);
        this.ctx.globalAlpha = sprite.opacity ?? 1;

        const scaledWidth = sprite.width * sprite.scale;
        const scaledHeight = sprite.height * sprite.scale;

        this.ctx.drawImage(
            sprite.image,
            0,
            0,
            sprite.width,
            sprite.height,
            -scaledWidth / 2,
            -scaledHeight / 2,
            scaledWidth,
            scaledHeight
        );

        this.ctx.restore();
    }

    drawShape(entity) {
        const position = this.world.getComponent(entity, 'Position');
        const renderable = this.world.getComponent(entity, 'Renderable');

        this.ctx.save();
        this.ctx.globalAlpha = renderable.opacity ?? 1;
        this.ctx.fillStyle = renderable.color;
        if (renderable.shadowBlur > 0) {
            this.ctx.shadowColor = renderable.shadowColor;
            this.ctx.shadowBlur = renderable.shadowBlur;
        }

        const isPlayer = this.world.hasComponent(entity, 'PlayerControlled');

        if (isPlayer || renderable.shape === 'circle') {
            this.ctx.beginPath();
            this.ctx.arc(position.x, position.y, renderable.radius, 0, Math.PI * 2);
            this.ctx.fill();
        }
        this.ctx.restore();
    }
}
