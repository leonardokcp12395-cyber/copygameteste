import * as state from './state.js';
import { saveGame } from './save.js';

// In-run upgrades
const allUpgrades = [
    { id: 'MAX_HP', title: 'Vitalidade Celestial', description: '+20 Vida Máxima e cura 20%' },
    { id: 'PLAYER_SPEED', title: 'Movimento Etéreo', description: '+10% Velocidade de Movimento' },
    { id: 'FIRE_RATE', title: 'Cadência Acelerada', description: 'Dispara 15% mais rápido' },
    { id: 'PROJECTILE_DAMAGE', title: 'Raio Potencializado', description: '+2 Dano por projétil' },
    { id: 'AURA_UNLOCK', title: 'Aura Celestial', description: 'Cria um orbe que causa dano ao redor' },
    { id: 'AURA_ORBS', title: 'Orbes Adicionais', description: '+1 Orbe para a Aura Celestial' },
];

// Permanent upgrades
export const permanentUpgrades = {
    maxHp: { name: 'Vida Inicial', level: 0, cost: 50, costIncrease: 1.5, effect: (level) => level * 10 },
    moveSpeed: { name: 'Velocidade Base', level: 0, cost: 50, costIncrease: 1.5, effect: (level) => level * 0.05 },
    xpGain: { name: 'Ganho de XP', level: 0, cost: 100, costIncrease: 2, effect: (level) => level * 0.1 },
};

export function generateUpgradeChoices() {
    let availableUpgrades = allUpgrades.filter(upgrade => {
        if (upgrade.id === 'AURA_ORBS') return state.player.weapons.aura.level > 0;
        if (upgrade.id === 'AURA_UNLOCK') return state.player.weapons.aura.level === 0;
        return true;
    });

    const choices = [];
    for (let i = 0; i < 3; i++) {
        if (availableUpgrades.length === 0) break;
        const choiceIndex = Math.floor(Math.random() * availableUpgrades.length);
        choices.push(availableUpgrades[choiceIndex]);
        availableUpgrades.splice(choiceIndex, 1);
    }
    state.setUpgradeChoices(choices);
}

export function applyUpgrade(upgradeId) {
    switch (upgradeId) {
        case 'MAX_HP':
            state.player.maxHp += 20;
            state.player.hp = Math.min(state.player.maxHp, state.player.hp + state.player.maxHp * 0.2);
            break;
        case 'PLAYER_SPEED':
            state.player.speed *= 1.10;
            break;
        case 'FIRE_RATE':
            state.player.weapons.bolt.baseCooldown *= 0.85;
            break;
        case 'PROJECTILE_DAMAGE':
            state.player.weapons.bolt.damage += 2;
            break;
        case 'AURA_UNLOCK':
            state.player.weapons.aura.level = 1;
            state.player.weapons.aura.orbs = 1;
            break;
        case 'AURA_ORBS':
            state.player.weapons.aura.orbs++;
            break;
    }
    state.setState('PLAYING');
}

export function purchasePermanentUpgrade(upgradeId) {
    const upgrade = permanentUpgrades[upgradeId];
    const currentLevel = state.permanentUpgrades[upgradeId].level || 0;
    const cost = Math.floor(upgrade.cost * Math.pow(upgrade.costIncrease, currentLevel));

    if (state.totalStarFragments >= cost) {
        state.setTotalStarFragments(state.totalStarFragments - cost);
        state.permanentUpgrades[upgradeId].level++;
        saveGame();
    }
}