import * as state from './state.js';
import { permanentUpgrades } from './upgrades.js';

export function saveGame() {
    const saveData = {
        totalStarFragments: state.totalStarFragments,
        upgrades: state.permanentUpgrades
    };
    localStorage.setItem('celestialSurvivorSave', JSON.stringify(saveData));
}

export function loadGame() {
    const savedData = localStorage.getItem('celestialSurvivorSave');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        state.setTotalStarFragments(parsedData.totalStarFragments || 0);
        
        // Ensure all permanent upgrades are initialized
        const loadedUpgrades = parsedData.upgrades || {};
        for (const key in permanentUpgrades) {
            if (loadedUpgrades[key]) {
                state.permanentUpgrades[key] = loadedUpgrades[key];
            } else {
                state.permanentUpgrades[key] = { level: 0 };
            }
        }

    } else {
        // Initialize for a fresh game
        for (const key in permanentUpgrades) {
            state.permanentUpgrades[key] = { level: 0 };
        }
    }
}