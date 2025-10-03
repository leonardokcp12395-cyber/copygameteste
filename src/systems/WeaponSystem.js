
import { System } from '../ecs/System.js';
import { Position } from '../components/Position.js';
import { Projectile } from '../components/Projectile.js';
import { Velocity } from '../components/Velocity.js';
import { Renderable } from '../components/Renderable.js';
import { PROJECTILE_COLOR } from '../constants.js';
import { distance } from '../utils.js';

export class WeaponSystem extends System {
    update(dt) {
        const players = this.world.getEntitiesWith('PlayerControlled', 'Position', 'Weapon');
        if (players.size === 0) return;

        const player = players.values().next().value;
        const weapon = this.world.getComponent(player, 'Weapon');
        const playerPosition = this.world.getComponent(player, 'Position');

        weapon.cooldown -= dt;
        if (weapon.cooldown <= 0) {
            const enemies = this.world.getEntitiesWith('Enemy', 'Position');
            let closestEnemy = null;
            let minDistance = Infinity;

            for (const enemy of enemies) {
                const enemyPosition = this.world.getComponent(enemy, 'Position');
                const dist = distance(playerPosition.x, playerPosition.y, enemyPosition.x, enemyPosition.y);
                if (dist < minDistance) {
                    minDistance = dist;
                    closestEnemy = enemy;
                }
            }

            if (closestEnemy) {
                const enemyPosition = this.world.getComponent(closestEnemy, 'Position');
                const angle = Math.atan2(enemyPosition.y - playerPosition.y, enemyPosition.x - playerPosition.x);
                
                const projectile = this.world.createEntity();
                this.world.addComponent(projectile, new Position(playerPosition.x, playerPosition.y));
                const speed = 500;
                this.world.addComponent(projectile, new Velocity(Math.cos(angle) * speed, Math.sin(angle) * speed));
                this.world.addComponent(projectile, new Renderable(5, PROJECTILE_COLOR));
                this.world.addComponent(projectile, new Projectile(weapon.damage));

                weapon.cooldown = weapon.baseCooldown;
            }
        }
    }
}
