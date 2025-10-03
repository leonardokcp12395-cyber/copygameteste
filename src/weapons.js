
import { player, enemies, boss, projectiles } from './state.js';
import { distance } from './utils.js';
import { Projectile } from './entities/Projectile.js';
import { PLAYER_GLOW, PLAYER_COLOR } from './constants.js';

export function updateWeapons() {
    const bolt = player.weapons.bolt;
    if (bolt.level > 0) {
        bolt.cooldown--;
        if (bolt.cooldown <= 0) {
            let closestEnemy = null; let minDistance = Infinity;
            let targets = boss ? [boss] : enemies;
            targets.forEach(enemy => {
                const dist = distance(player.x, player.y, enemy.x, enemy.y);
                if (dist < minDistance) { minDistance = dist; closestEnemy = enemy; }
            });
            if (closestEnemy) {
                const angle = Math.atan2(closestEnemy.y - player.y, closestEnemy.x - player.x);
                projectiles.push(new Projectile(player.x, player.y, angle, bolt.damage));
                bolt.cooldown = bolt.baseCooldown;
            }
        }
    }
}

export function drawWeapons(ctx, gameTime) {
    const aura = player.weapons.aura;
    if (aura.level > 0) {
        const angleIncrement = (Math.PI * 2) / aura.orbs;
        for (let i = 0; i < aura.orbs; i++) {
            const angle = (gameTime * 50 * aura.rotationSpeed) + (i * angleIncrement);
            const orbX = player.x + Math.cos(angle) * aura.distance;
            const orbY = player.y + Math.sin(angle) * aura.distance;
            ctx.save(); ctx.shadowColor = PLAYER_GLOW; ctx.shadowBlur = 15; ctx.fillStyle = PLAYER_COLOR; ctx.beginPath(); ctx.arc(orbX, orbY, aura.radius, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        }
    }
}
// Este arquivo está obsoleto e sua lógica foi movida para os sistemas ECS apropriados,
// como WeaponSystem e RenderSystem, para se alinhar com a arquitetura do projeto.
// Recomendo remover este arquivo do projeto para evitar confusão.