import * as state from './state.js';
import { GAME_WIDTH, GAME_HEIGHT, UI_COLOR, PLAYER_GLOW } from './constants.js';
import { permanentUpgrades } from './upgrades.js';

function drawButton(ctx, text, x, y, width, height) {
    ctx.strokeStyle = UI_COLOR;
    ctx.strokeRect(x, y, width, height);
    ctx.font = '24px sans-serif';
    ctx.fillStyle = UI_COLOR;
    ctx.textAlign = 'center';
    ctx.fillText(text, x + width / 2, y + height / 2 + 8);
    ctx.textAlign = 'left';
}

export function drawMainMenu(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.font = '60px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = UI_COLOR;
    ctx.shadowColor = PLAYER_GLOW;
    ctx.shadowBlur = 20;
    ctx.fillText('Celestial Survivor', GAME_WIDTH / 2, 150);
    ctx.shadowBlur = 0;

    ctx.font = '20px sans-serif';
    ctx.fillText(`Fragmentos Estelares: ${state.totalStarFragments}`, GAME_WIDTH / 2, 220);

    drawButton(ctx, 'Jogar', GAME_WIDTH / 2 - 100, 280, 200, 50);
    drawButton(ctx, 'Loja', GAME_WIDTH / 2 - 100, 350, 200, 50);
}

export function drawMetaStore(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.font = '40px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillStyle = UI_COLOR;
    ctx.fillText('Melhorias Permanentes', GAME_WIDTH / 2, 80);

    ctx.font = '20px sans-serif';
    ctx.fillText(`Fragmentos: ${state.totalStarFragments}`, GAME_WIDTH / 2, 120);

    let i = 0;
    for (const key in permanentUpgrades) {
        const upgrade = permanentUpgrades[key];
        const currentLevel = state.permanentUpgrades[key]?.level || 0;
        const cost = Math.floor(upgrade.cost * Math.pow(upgrade.costIncrease, currentLevel));
        const yPos = 180 + i * 70;

        ctx.font = '20px sans-serif';
        ctx.textAlign = 'left';
        ctx.fillText(`${upgrade.name} (Nível ${currentLevel})`, 50, yPos + 25);
        
        drawButton(ctx, `Comprar (${cost})`, 550, yPos, 200, 40);
        i++;
    }

    drawButton(ctx, 'Voltar', GAME_WIDTH / 2 - 100, GAME_HEIGHT - 100, 200, 50);
}

export function drawUI(ctx) {
    ctx.fillStyle = UI_COLOR; ctx.font = '20px sans-serif'; ctx.fillText(`Level: ${state.level}`, 10, 75); ctx.fillText(`Score: ${state.score}`, 10, 100);
    const minutes = Math.floor(state.gameTime / 60).toString().padStart(2, '0'); const seconds = Math.floor(state.gameTime % 60).toString().padStart(2, '0');
    ctx.font = '30px sans-serif'; ctx.fillText(`${minutes}:${seconds}`, GAME_WIDTH / 2 - 40, 40);
    ctx.fillStyle = '#333'; ctx.fillRect(10, 10, 200, 20); ctx.fillStyle = 'red'; ctx.fillRect(10, 10, (state.player.hp / state.player.maxHp) * 200, 20); ctx.strokeStyle = UI_COLOR; ctx.strokeRect(10, 10, 200, 20);
    ctx.fillStyle = '#333'; ctx.fillRect(10, 35, 200, 15); ctx.fillStyle = 'gold'; ctx.fillRect(10, 35, (state.xp / state.requiredXp) * 200, 15); ctx.strokeStyle = UI_COLOR; ctx.strokeRect(10, 35, 200, 15);
    if (state.boss) {
        ctx.fillStyle = '#333'; ctx.fillRect(GAME_WIDTH / 4, GAME_HEIGHT - 40, GAME_WIDTH / 2, 25);
        ctx.fillStyle = state.boss.weakSpotColor; ctx.fillRect(GAME_WIDTH / 4, GAME_HEIGHT - 40, (state.boss.hp / state.boss.maxHp) * (GAME_WIDTH / 2), 25);
        ctx.strokeStyle = UI_COLOR; ctx.strokeRect(GAME_WIDTH / 4, GAME_HEIGHT - 40, GAME_WIDTH / 2, 25);
    }
}

export function drawLevelUpScreen(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = UI_COLOR; ctx.font = '40px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('Nível Aumentado!', GAME_WIDTH / 2, 100);
    ctx.font = '20px sans-serif'; ctx.fillText('Escolha uma melhoria:', GAME_WIDTH / 2, 140);
    state.upgradeChoices.forEach((upgrade, index) => {
        const boxY = 180 + index * 110;
        ctx.strokeStyle = UI_COLOR; ctx.strokeRect(GAME_WIDTH / 2 - 150, boxY, 300, 100);
        ctx.font = 'bold 22px sans-serif'; ctx.fillText(upgrade.title, GAME_WIDTH / 2, boxY + 40);
        ctx.font = '16px sans-serif'; ctx.fillText(upgrade.description, GAME_WIDTH / 2, boxY + 70);
    });
    ctx.textAlign = 'left';
}

export function drawGameOverScreen(ctx) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'; ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = UI_COLOR; ctx.font = '50px sans-serif'; ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', GAME_WIDTH / 2, GAME_HEIGHT / 2 - 20);
    ctx.font = '20px sans-serif'; ctx.fillText(`Você sobreviveu por ${Math.floor(state.gameTime)} segundos.`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 20);
    ctx.fillText(`Fragmentos coletados: ${state.runStarFragments}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 50);
    ctx.fillText('Clique para voltar ao menu', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 80);
    ctx.textAlign = 'left';
}

export function drawVictoryScreen(ctx) {
    ctx.fillStyle = 'rgba(0, 255, 255, 0.3)'; ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = UI_COLOR; ctx.font = '60px sans-serif'; ctx.textAlign = 'center';
    ctx.shadowColor = PLAYER_GLOW; ctx.shadowBlur = 20;
    ctx.fillText('VITÓRIA!', GAME_WIDTH / 2, GAME_HEIGHT / 2);
    ctx.font = '20px sans-serif'; ctx.fillText('O Colosso Sombrio foi derrotado!', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 40);
    ctx.fillText(`Fragmentos coletados: ${state.runStarFragments}`, GAME_WIDTH / 2, GAME_HEIGHT / 2 + 70);
    ctx.fillText('Clique para voltar ao menu', GAME_WIDTH / 2, GAME_HEIGHT / 2 + 100);
    ctx.textAlign = 'left'; ctx.shadowBlur = 0;
}