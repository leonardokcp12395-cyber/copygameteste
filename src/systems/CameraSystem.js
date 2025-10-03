
import { System } from '../ecs/System.js';

export class CameraSystem extends System {
    update(dt) {
        const players = this.world.getEntitiesWith('PlayerControlled', 'Position');
        if (players.size === 0) return;

        const player = players.values().next().value;
        const playerPos = this.world.getComponent(player, 'Position');
        
        let camera = this.world.getResource('camera');
        if (!camera) {
            camera = { x: 0, y: 0, shakeIntensity: 0, shakeDuration: 0 };
            this.world.setResource('camera', camera);
        }

        const canvas = this.world.getResource('canvas');
        const targetX = playerPos.x - canvas.width / 2;
        const targetY = playerPos.y - canvas.height / 2;

        // Smooth camera follow
        camera.x += (targetX - camera.x) * 0.1;
        camera.y += (targetY - camera.y) * 0.1;

        // Screen shake
        if (camera.shakeDuration > 0) {
            camera.shakeDuration -= dt;
            const shakeX = (Math.random() - 0.5) * camera.shakeIntensity;
            const shakeY = (Math.random() - 0.5) * camera.shakeIntensity;
            camera.x += shakeX;
            camera.y += shakeY;
        } else {
            camera.shakeIntensity = 0;
        }
    }
}
