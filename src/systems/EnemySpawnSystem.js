
import { System } from '../ecs/System.js';
import { Position } from '../components/Position.js';
import { Velocity } from '../components/Velocity.js';
import { Renderable } from '../components/Renderable.js';
import { Enemy } from '../components/Enemy.js';
import { Collidable } from '../components/Collidable.js';
import { Health } from '../components/Health.js';
import { ENEMY_COLOR } from '../constants.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants.js';

export class EnemySpawnSystem extends System {
    constructor(world) {
        super(world);
        this.spawnCooldown = 2; // seconds
        this.spawnTimer = this.spawnCooldown;
    }

    update(dt) {
        const gameState = this.world.getResource('gameState');
        if (!gameState || gameState.currentState !== 'PLAYING') return;

        this.spawnTimer -= dt;
        if (this.spawnTimer <= 0) {
            this.spawnTimer = this.spawnCooldown;
            this.spawnEnemy();
        }
    }

    spawnEnemy() {
        const side = Math.floor(Math.random() * 4);
        let x, y;
        if (side === 0) { x = -30; y = Math.random() * GAME_HEIGHT; } 
        else if (side === 1) { x = GAME_WIDTH + 30; y = Math.random() * GAME_HEIGHT; } 
        else if (side === 2) { x = Math.random() * GAME_WIDTH; y = -30; } 
        else { x = Math.random() * GAME_WIDTH; y = GAME_HEIGHT + 30; }

        const enemy = this.world.createEntity();
        this.world.addComponent(enemy, new Position(x, y));
        this.world.addComponent(enemy, new Velocity());
        this.world.addComponent(enemy, new Renderable(20, ENEMY_COLOR));
        const enemyComponent = new Enemy(2); // xpValue
        enemyComponent.speed = 100 + Math.random() * 50;
        this.world.addComponent(enemy, enemyComponent);
        this.world.addComponent(enemy, new Collidable(20));
        this.world.addComponent(enemy, new Health(10));
    }
}
