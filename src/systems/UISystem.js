
import { System } from '../ecs/System.js';
import { UI_COLOR } from '../constants.js';

export class UISystem extends System {
    constructor(world, ctx) {
        super(world);
        this.ctx = ctx;
    }

    update(dt) {
        const gameState = this.world.getResource('gameState');
        if (!gameState) return;

        if (gameState.currentState === 'PLAYING' || gameState.currentState === 'LEVEL_UP') {
            const players = this.world.getEntitiesWith('PlayerControlled', 'Health');
            const playerStats = this.world.getResource('playerStats');

            if (players.size > 0) {
                const player = players.values().next().value;
                const health = this.world.getComponent(player, 'Health');
                
                // HP bar
                const hpBarWidth = 200;
                const hpBarHeight = 20;
                const hpPercentage = Math.max(0, health.hp / health.maxHp);

                // Background
                this.ctx.fillStyle = '#333';
                this.ctx.fillRect(10, 10, hpBarWidth, hpBarHeight);

                // Fill
                const hpGradient = this.ctx.createLinearGradient(10, 10, 10, 30);
                hpGradient.addColorStop(0, '#ff5555');
                hpGradient.addColorStop(1, '#cc0000');
                this.ctx.fillStyle = hpGradient;
                this.ctx.fillRect(10, 10, hpBarWidth * hpPercentage, hpBarHeight);

                // Border
                this.ctx.strokeStyle = UI_COLOR;
                this.ctx.strokeRect(10, 10, hpBarWidth, hpBarHeight);
            }

            if (playerStats) {
                // XP bar
                const xpBarWidth = 200;
                const xpBarHeight = 15;
                const xpPercentage = playerStats.xp / playerStats.requiredXp;

                // Background
                this.ctx.fillStyle = '#333';
                this.ctx.fillRect(10, 35, xpBarWidth, xpBarHeight);

                // Fill
                const xpGradient = this.ctx.createLinearGradient(10, 35, 10, 50);
                xpGradient.addColorStop(0, '#ffee58');
                xpGradient.addColorStop(1, '#f5c500');
                this.ctx.fillStyle = xpGradient;
                this.ctx.fillRect(10, 35, xpBarWidth * xpPercentage, xpBarHeight);

                // Border
                this.ctx.strokeStyle = UI_COLOR;
                this.ctx.strokeRect(10, 35, xpBarWidth, xpBarHeight);

                // Level text
                this.ctx.fillStyle = UI_COLOR; this.ctx.font = '20px sans-serif';
                this.ctx.fillText(`Level: ${playerStats.level}`, 10, 75);
            }

            // Game Timer
            const gameTime = this.world.getResource('gameTime');
            const minutes = Math.floor(gameTime / 60).toString().padStart(2, '0');
            const seconds = Math.floor(gameTime % 60).toString().padStart(2, '0');
            this.ctx.font = '30px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillStyle = UI_COLOR;
            this.ctx.fillText(`${minutes}:${seconds}`, this.ctx.canvas.width / 2, 40);
            this.ctx.textAlign = 'left';
        }

        if (gameState.currentState === 'GAME_OVER') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillStyle = UI_COLOR; this.ctx.font = '50px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('GAME OVER', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
            this.ctx.textAlign = 'left';
        }

        if (gameState.currentState === 'LEVEL_UP') {
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
            this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.ctx.fillStyle = UI_COLOR; this.ctx.font = '40px sans-serif';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('LEVEL UP!', this.ctx.canvas.width / 2, 100);
            this.ctx.font = '20px sans-serif';
            this.ctx.fillText('Choose an upgrade:', this.ctx.canvas.width / 2, 140);

            const upgradeChoices = this.world.getResource('upgradeChoices');
            if (upgradeChoices) {
                upgradeChoices.forEach((upgrade, index) => {
                    const boxY = 180 + index * 110;
                    this.ctx.strokeStyle = UI_COLOR;
                    this.ctx.strokeRect(this.ctx.canvas.width / 2 - 150, boxY, 300, 100);
                    this.ctx.font = 'bold 22px sans-serif';
                    this.ctx.fillText(upgrade.title, this.ctx.canvas.width / 2, boxY + 40);
                    this.ctx.font = '16px sans-serif';
                    this.ctx.fillText(upgrade.description, this.ctx.canvas.width / 2, boxY + 70);
                });
            }
            this.ctx.textAlign = 'left';
        }
    }
}
