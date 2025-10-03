
import { System } from '../ecs/System.js';

const allUpgrades = [
    { id: 'MAX_HP', title: 'Vitalidade Celestial', description: '+20 Vida Máxima' },
    { id: 'PLAYER_SPEED', title: 'Movimento Etéreo', description: '+10% Velocidade de Movimento' },
    { id: 'FIRE_RATE', title: 'Cadência Acelerada', description: 'Dispara 15% mais rápido' },
    { id: 'PROJECTILE_DAMAGE', title: 'Raio Potencializado', description: '+2 Dano por projétil' },
];

export class UpgradeSystem extends System {
    generateChoices() {
        const choices = [];
        const available = [...allUpgrades];
        for (let i = 0; i < 3; i++) {
            if (available.length === 0) break;
            const choiceIndex = Math.floor(Math.random() * available.length);
            choices.push(available[choiceIndex]);
            available.splice(choiceIndex, 1);
        }
        this.world.setResource('upgradeChoices', choices);
    }

    applyUpgrade(upgradeId) {
        const players = this.world.getEntitiesWith('PlayerControlled');
        if (players.size === 0) return;
        const player = players.values().next().value;

        switch (upgradeId) {
            case 'MAX_HP': {
                const health = this.world.getComponent(player, 'Health');
                if (health) {
                    health.maxHp += 20;
                    health.hp += 20;
                }
                break;
            }
            case 'PLAYER_SPEED': {
                const pc = this.world.getComponent(player, 'PlayerControlled');
                if (pc) pc.speed *= 1.1;
                break;
            }
            case 'FIRE_RATE': {
                const weapon = this.world.getComponent(player, 'Weapon');
                if (weapon) weapon.baseCooldown *= 0.85;
                break;
            }
            case 'PROJECTILE_DAMAGE': {
                const weapon = this.world.getComponent(player, 'Weapon');
                if (weapon) weapon.damage += 2;
                break;
            }
        }
    }
}
