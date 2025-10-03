
import { GAME_WIDTH, GAME_HEIGHT, PLAYER_COLOR, PLAYER_GLOW, ENEMY_COLOR } from './constants.js';
import { initInputListeners } from './input.js';
import { World } from './ecs/World.js';

// Systems
import { PlayerInputSystem } from './systems/PlayerInputSystem.js';
import { MovementSystem } from './systems/MovementSystem.js';
import { RenderSystem } from './systems/RenderSystem.js';
import { EnemyAISystem } from './systems/EnemyAISystem.js';
import { WeaponSystem } from './systems/WeaponSystem.js';
import { CollisionSystem } from './systems/CollisionSystem.js';
import { DamageSystem } from './systems/DamageSystem.js';
import { GameStateSystem } from './systems/GameStateSystem.js';
import { UISystem } from './systems/UISystem.js';
import { EnemySpawnSystem } from './systems/EnemySpawnSystem.js';
import { XPOrbSystem } from './systems/XPOrbSystem.js';
import { UpgradeSystem } from './systems/UpgradeSystem.js';
import { SpatialPartitioningSystem } from './systems/SpatialPartitioningSystem.js';
import { CameraSystem } from './systems/CameraSystem.js';
import { StarfieldSystem } from './systems/StarfieldSystem.js';
import { ParticleSystem } from './systems/ParticleSystem.js';

// Components
import { Position } from './components/Position.js';
import { Velocity } from './components/Velocity.js';
import { Renderable } from './components/Renderable.js';
import { PlayerControlled } from './components/PlayerControlled.js';
import { Enemy } from './components/Enemy.js';
import { Weapon } from './components/Weapon.js';
import { Collidable } from './components/Collidable.js';
import { Health } from './components/Health.js';
import { PlayerStats } from './components/PlayerStats.js';

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const world = new World();

// Set initial resources
world.setResource('canvas', canvas);
world.setResource('gameState', { currentState: 'PLAYING' });
world.setResource('gameTime', 0);

// Register Systems
const upgradeSystem = new UpgradeSystem(world);
world.registerSystem(new GameStateSystem(world));
world.registerSystem(new PlayerInputSystem(world));
world.registerSystem(new EnemyAISystem(world));
world.registerSystem(new MovementSystem(world));
world.registerSystem(new WeaponSystem(world));
world.registerSystem(new SpatialPartitioningSystem(world));
world.registerSystem(new CollisionSystem(world));
world.registerSystem(new DamageSystem(world));
world.registerSystem(new EnemySpawnSystem(world));
world.registerSystem(new XPOrbSystem(world));
world.registerSystem(upgradeSystem);
world.registerSystem(new ParticleSystem(world));
world.registerSystem(new CameraSystem(world));
world.registerSystem(new StarfieldSystem(world, ctx));
world.registerSystem(new RenderSystem(world, ctx));
world.registerSystem(new UISystem(world, ctx));

// Create Player
const player = world.createEntity();
world.addComponent(player, new Position(GAME_WIDTH / 2, GAME_HEIGHT / 2));
world.addComponent(player, new Velocity());
const playerRenderable = new Renderable(15, PLAYER_COLOR);
playerRenderable.shadowColor = PLAYER_GLOW;
playerRenderable.shadowBlur = 20;
world.addComponent(player, playerRenderable);
world.addComponent(player, new PlayerControlled(300)); // speed
world.addComponent(player, new Weapon(0.5, 5)); // baseCooldown, damage
world.addComponent(player, new Health(100));
world.addComponent(player, new Collidable(15));

canvas.addEventListener('click', (e) => {
    const gameState = world.getResource('gameState');
    if (gameState && gameState.currentState === 'LEVEL_UP') {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const upgradeChoices = world.getResource('upgradeChoices');
        if (upgradeChoices) {
            upgradeChoices.forEach((upgrade, index) => {
                const boxY = 180 + index * 110;
                if (mouseX > GAME_WIDTH / 2 - 150 && mouseX < GAME_WIDTH / 2 + 150 && mouseY > boxY && mouseY < boxY + 100) {
                    upgradeSystem.applyUpgrade(upgrade.id);
                    gameState.currentState = 'PLAYING';
                }
            });
        }
    }
});

let lastTime = 0;
function gameLoop(timestamp) {
    const dt = (timestamp - lastTime) / 1000; // delta time in seconds
    lastTime = timestamp;

    const gameState = world.getResource('gameState');
    if (gameState && gameState.currentState === 'PLAYING') {
        let gameTime = world.getResource('gameTime');
        world.setResource('gameTime', gameTime + dt);
    }

    world.update(dt);

    requestAnimationFrame(gameLoop);
}

// --- Initialization ---
initInputListeners();
requestAnimationFrame(gameLoop);
