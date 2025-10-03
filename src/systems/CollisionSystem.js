
import { System } from '../ecs/System.js';
import { distance } from '../utils.js';
import { Damage } from '../components/Damage.js';

export class CollisionSystem extends System {
    update(dt) {
        const projectiles = this.world.getEntitiesWith('Projectile', 'Position');
        const enemies = this.world.getEntitiesWith('Enemy', 'Position', 'Collidable');
        const players = this.world.getEntitiesWith('PlayerControlled', 'Position', 'Collidable');

        // Projectile-Enemy Collisions
        for (const projectile of projectiles) {
            const projPos = this.world.getComponent(projectile, 'Position');
            const proj = this.world.getComponent(projectile, 'Projectile');

            for (const enemy of enemies) {
                const enemyPos = this.world.getComponent(enemy, 'Position');
                const enemyCollidable = this.world.getComponent(enemy, 'Collidable');

                if (distance(projPos.x, projPos.y, enemyPos.x, enemyPos.y) < enemyCollidable.radius) {
                    this.world.destroyEntity(projectile);
                    this.world.addComponent(enemy, new Damage(proj.damage));
                    // Break the inner loop because the projectile is gone
                    break;
                }
            }
        }

        const orbs = this.world.getEntitiesWith('XPOrb', 'Position', 'Collidable');

        // Projectile-Enemy Collisions
        for (const projectile of projectiles) {
            const projPos = this.world.getComponent(projectile, 'Position');
            const proj = this.world.getComponent(projectile, 'Projectile');

            for (const enemy of enemies) {
                const enemyPos = this.world.getComponent(enemy, 'Position');
                const enemyCollidable = this.world.getComponent(enemy, 'Collidable');

                if (distance(projPos.x, projPos.y, enemyPos.x, enemyPos.y) < enemyCollidable.radius) {
                    this.world.destroyEntity(projectile);
                    this.world.addComponent(enemy, new Damage(proj.damage));
                    break;
                }
            }
        }

        // Player-Enemy Collisions
        for (const player of players) {
            const playerPos = this.world.getComponent(player, 'Position');
            const playerCollidable = this.world.getComponent(player, 'Collidable');

            for (const enemy of enemies) {
                const enemyPos = this.world.getComponent(enemy, 'Position');
                const enemyCollidable = this.world.getComponent(enemy, 'Collidable');

                if (distance(playerPos.x, playerPos.y, enemyPos.x, enemyPos.y) < playerCollidable.radius + enemyCollidable.radius) {
                    this.world.addComponent(player, new Damage(10));
                }
            }
        }

        // Player-XPOrb Collisions
        for (const player of players) {
            const playerPos = this.world.getComponent(player, 'Position');
            const playerCollidable = this.world.getComponent(player, 'Collidable');

            for (const orb of orbs) {
                const orbPos = this.world.getComponent(orb, 'Position');
                const orbCollidable = this.world.getComponent(orb, 'Collidable');

                if (distance(playerPos.x, playerPos.y, orbPos.x, orbPos.y) < playerCollidable.radius + orbCollidable.radius) {
                    const xpOrb = this.world.getComponent(orb, 'XPOrb');
                    const playerStats = this.world.getResource('playerStats');
                    if (playerStats) {
                        playerStats.xp += xpOrb.xpValue;
                        if (playerStats.xp >= playerStats.requiredXp) {
                            playerStats.level++;
                            playerStats.xp -= playerStats.requiredXp;
                            playerStats.requiredXp = Math.floor(playerStats.requiredXp * 1.5);
                            const gameState = this.world.getResource('gameState');
import { UpgradeSystem } from './UpgradeSystem.js';

import { Rectangle } from '../ecs/Quadtree.js';

export class CollisionSystem extends System {
    update(dt) {
        const quadtree = this.world.getResource('quadtree');
        if (!quadtree) return;

        const projectiles = this.world.getEntitiesWith('Projectile', 'Position');
        const players = this.world.getEntitiesWith('PlayerControlled', 'Position', 'Collidable');

        // Projectile-Enemy Collisions
        for (const projectile of projectiles) {
            const projPos = this.world.getComponent(projectile, 'Position');
            const proj = this.world.getComponent(projectile, 'Projectile');
            const range = new Rectangle(projPos.x, projPos.y, 10, 10);
            const nearbyEnemies = quadtree.query(range);

            for (const point of nearbyEnemies) {
                const enemy = point.entity;
                if (!this.world.getComponent(enemy, 'Enemy')) continue;

                const enemyPos = this.world.getComponent(enemy, 'Position');
                const enemyCollidable = this.world.getComponent(enemy, 'Collidable');

                if (distance(projPos.x, projPos.y, enemyPos.x, enemyPos.y) < enemyCollidable.radius) {
                    this.world.destroyEntity(projectile);
                    this.world.addComponent(enemy, new Damage(proj.damage));
                    break;
                }
            }
        }

        // Player-Enemy and Player-XPOrb Collisions
        for (const player of players) {
            const playerPos = this.world.getComponent(player, 'Position');
            const playerCollidable = this.world.getComponent(player, 'Collidable');
            const range = new Rectangle(playerPos.x, playerPos.y, playerCollidable.radius * 2, playerCollidable.radius * 2);
            const nearbyEntities = quadtree.query(range);

            for (const point of nearbyEntities) {
                const entity = point.entity;

                // Player-Enemy
                if (this.world.getComponent(entity, 'Enemy')) {
                    const enemyPos = this.world.getComponent(entity, 'Position');
                    const enemyCollidable = this.world.getComponent(entity, 'Collidable');
                    if (distance(playerPos.x, playerPos.y, enemyPos.x, enemyPos.y) < playerCollidable.radius + enemyCollidable.radius) {
                        this.world.addComponent(player, new Damage(10));
                    }
                }

                // Player-XPOrb
                if (this.world.getComponent(entity, 'XPOrb')) {
                    const orbPos = this.world.getComponent(entity, 'Position');
                    const orbCollidable = this.world.getComponent(entity, 'Collidable');
                    if (distance(playerPos.x, playerPos.y, orbPos.x, orbPos.y) < playerCollidable.radius + orbCollidable.radius) {
                        const xpOrb = this.world.getComponent(entity, 'XPOrb');
                        const playerStats = this.world.getResource('playerStats');
                        if (playerStats) {
                            playerStats.xp += xpOrb.xpValue;
                            if (playerStats.xp >= playerStats.requiredXp) {
                                playerStats.level++;
                                playerStats.xp -= playerStats.requiredXp;
                                playerStats.requiredXp = Math.floor(playerStats.requiredXp * 1.5);
                                const gameState = this.world.getResource('gameState');
                                if(gameState) {
                                    gameState.currentState = 'LEVEL_UP';
                                    const upgradeSystem = this.world.systems.find(s => s instanceof UpgradeSystem);
                                    if (upgradeSystem) {
                                        upgradeSystem.generateChoices();
                                    }
                                }
                            }
                        }
                        this.world.destroyEntity(entity);
                    }
                }
            }
        }
    }
}                    }
                    this.world.destroyEntity(orb);
                }
            }
        }
    }
