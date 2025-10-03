
import { System } from '../ecs/System.js';

export class GameStateSystem extends System {
    update(dt) {
        const gameState = this.world.getResource('gameState');
        if (!gameState) return;

        if (gameState.currentState === 'PLAYING') {
            const players = this.world.getEntitiesWith('PlayerControlled');
            if (players.size === 0) {
                gameState.currentState = 'GAME_OVER';
            }
        }
    }
}
