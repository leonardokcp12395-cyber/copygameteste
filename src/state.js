export let player = null;
export let enemies = [];
export let projectiles = [];
export let xpOrbs = [];
export let particles = [];
export let boss = null;
export let bossHasSpawned = false;

export let level = 1;
export let xp = 0;
export let requiredXp = 10;
export let score = 0;
export let gameTime = 0;

export let gameState = 'PLAYING'; // PLAYING, LEVEL_UP, GAME_OVER, VICTORY
export let upgradeChoices = [];

export let damageFlashTimer = 0;

export function setState(newState) {
    gameState = newState;
}

export function setPlayer(newPlayer) { player = newPlayer; }
export function setEnemies(newEnemies) { enemies = newEnemies; }
export function setProjectiles(newProjectiles) { projectiles = newProjectiles; }
export function setXpOrbs(newXpOrbs) { xpOrbs = newXpOrbs; }
export function setParticles(newParticles) { particles = newParticles; }
export function setBoss(newBoss) { boss = newBoss; }
export function setBossHasSpawned(value) { bossHasSpawned = value; }
export function setLevel(newLevel) { level = newLevel; }
export function setXp(newXp) { xp = newXp; }
export function setRequiredXp(newRequiredXp) { requiredXp = newRequiredXp; }
export function setScore(newScore) { score = newScore; }
export function setGameTime(newGameTime) { gameTime = newGameTime; }
export function setUpgradeChoices(choices) { upgradeChoices = choices; }
export function setDamageFlashTimer(timer) { damageFlashTimer = timer; }

export function setTotalStarFragments(count) { totalStarFragments = count; }
export function setRunStarFragments(count) { runStarFragments = count; }
export function setPermanentUpgrades(upgrades) { permanentUpgrades = upgrades; }
