import { Position } from '../components/Position.js';
import { Velocity } from '../components/Velocity.js';
import { PlayerControlled } from '../components/PlayerControlled.js';
import { Weapon } from '../components/Weapon.js';
import { Health } from '../components/Health.js';
import { Collidable } from '../components/Collidable.js';
import { Sprite } from '../components/Sprite.js';
import { GAME_WIDTH, GAME_HEIGHT } from '../constants.js';

export function createPlayer(world) {
    const player = world.createEntity();
    const assetLoader = world.getResource('assetLoader');
    const playerSprite = assetLoader.get('player');

    world.addComponent(player, new Position(GAME_WIDTH / 2, GAME_HEIGHT / 2));
    world.addComponent(player, new Velocity());
    world.addComponent(player, new Sprite(playerSprite, 64, 64, 0, 0.5));
    world.addComponent(player, new PlayerControlled(300)); // speed
    world.addComponent(player, new Weapon(0.5, 5)); // baseCooldown, damage
    world.addComponent(player, new Health(100));
    world.addComponent(player, new Collidable(15));
    return player;
}