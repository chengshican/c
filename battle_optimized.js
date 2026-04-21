// 三国英雄传 - 战斗系统优化版
// 新增：手动技能释放、战斗加速、跳过功能

// 战斗相关方法增强
class BattleSystem {
    constructor(game) {
        this.game = game;
        this.battleSpeed = 1;
        this.autoBattle = false;
        this.canSkip = false;
    }
    
    // 开始战斗
    startBattle(enemy) {
        this.game.state.battle = {
            enemy: enemy,
            playerTeam: this.game.player.team.slice(0, 3).map(id => {
                const hero = this.game.getHeroById(id);
                return hero ? { ...hero, currentHp: hero.maxHp, currentMp: hero.maxMp } : null;
            }).filter(Boolean),
            turn: 0,
            log: ['战斗开始！'],
            phase: 'player',
            selectedSkill: null,
            speed: 1
        };
        
        this.game.state.screen = 'battle';
        this.game.showNotification('战斗开始！', 'info', 2000);
    }
    
    // 使用技能
    useSkill(heroIndex, skillIndex) {
        const battle = this.game.state.battle;
        if (!battle || battle.phase !== 'player') return;
        
        const hero = battle.playerTeam[heroIndex];
        if (!hero || hero.currentHp <= 0) return;
        
        const skillName = hero.skills[skillIndex];
        const skill = SKILLS[skillName];
        
        if (hero.currentMp < skill.cost) {
            this.game.showNotification('MP 不足！', 'error');
            return;
        }
        
        // 消耗 MP
        hero.currentMp -= skill.cost;
        
        // 技能效果
        if (skill.type === 'attack') {
            const damage = this.calculateDamage(hero, skill);
            battle.enemy.currentHp -= damage;
            battle.log.push(`${hero.name} 使用 ${skill.name} 对敌人造成 ${damage} 点伤害！`);
            
            if (battle.enemy.currentHp <= 0) {
                this.endBattle(true);
                return;
            }
        } else if (skill.type === 'aoe') {
            const damage = this.calculateDamage(hero, skill);
            battle.enemy.currentHp -= damage;
            battle.log.push(`${hero.name} 使用 ${skill.name} 对敌人造成 ${damage} 点范围伤害！`);
            
            if (battle.enemy.currentHp <= 0) {
                this.endBattle(true);
                return;
            }
        } else if (skill.type === 'buff') {
            this.applyBuff(hero, skill);
            battle.log.push(`${hero.name} 使用了 ${skill.name}！`);
        }
        
        battle.turn++;
        this.nextTurn();
    }
    
    // 普通攻击
    basicAttack(heroIndex) {
        const battle = this.game.state.battle;
        if (!battle || battle.phase !== 'player') return;
        
        const hero = battle.playerTeam[heroIndex];
        if (!hero || hero.currentHp <= 0) return;
        
        const damage = this.calculateDamage(hero, { damage: 100, type: 'attack' });
        battle.enemy.currentHp -= damage;
        battle.log.push(`${hero.name} 普通攻击，造成 ${damage} 点伤害！`);
        
        if (battle.enemy.currentHp <= 0) {
            this.endBattle(true);
            return;
        }
        
        battle.turn++;
        this.nextTurn();
    }
    
    // 计算伤害
    calculateDamage(attacker, skill) {
        const baseDamage = attacker.attack * (skill.damage / 100);
        const defense = this.game.state.battle.enemy.defense || 0;
        const damage = Math.max(1, baseDamage - defense * 0.5);
        return Math.floor(damage);
    }
    
    // 应用 Buff
    applyBuff(hero, skill) {
        if (!skill.effect) return;
        
        switch(skill.effect) {
            case 'def_up':
                hero.defense *= 1.5;
                this.game.showNotification(`${hero.name} 防御力提升！`, 'buff');
                break;
            // ... 其他 buff 效果
        }
    }
    
    // 下一个回合
    nextTurn() {
        const battle = this.game.state.battle;
        
        // 敌人回合
        setTimeout(() => {
            if (battle.enemy.currentHp > 0) {
                this.enemyTurn();
            }
        }, 1000 / this.battleSpeed);
    }
    
    // 敌人回合
    enemyTurn() {
        const battle = this.game.state.battle;
        
        // 选择一个存活的玩家武将
        const aliveHeroes = battle.playerTeam.filter(h => h && h.currentHp > 0);
        if (aliveHeroes.length === 0) {
            this.endBattle(false);
            return;
        }
        
        const target = aliveHeroes[Math.floor(Math.random() * aliveHeroes.length)];
        const damage = Math.max(1, battle.enemy.attack - target.defense * 0.5);
        
        target.currentHp -= damage;
        battle.log.push(`${battle.enemy.name} 攻击 ${target.name}，造成 ${damage} 点伤害！`);
        
        if (target.currentHp <= 0) {
            target.currentHp = 0;
            battle.log.push(`${target.name} 倒下了！`);
        }
        
        // 检查失败
        if (aliveHeroes.every(h => h.currentHp <= 0)) {
            this.endBattle(false);
            return;
        }
        
        battle.phase = 'player';
        battle.turn++;
    }
    
    // 设置战斗速度
    setSpeed(speed) {
        this.battleSpeed = speed;
        this.game.state.battle.speed = speed;
        this.game.showNotification(`战斗速度：${speed}x`, 'info', 1500);
    }
    
    // 切换自动战斗
    toggleAuto() {
        this.autoBattle = !this.autoBattle;
        this.game.showNotification(
            this.autoBattle ? '自动战斗已开启' : '自动战斗已关闭',
            'info',
            1500
        );
        
        if (this.autoBattle) {
            this.autoBattleLoop();
        }
    }
    
    // 自动战斗循环
    autoBattleLoop() {
        if (!this.autoBattle || this.game.state.screen !== 'battle') return;
        
        const battle = this.game.state.battle;
        if (battle.phase !== 'player') return;
        
        // 自动选择技能
        const aliveHeroes = battle.playerTeam.filter(h => h && h.currentHp > 0);
        if (aliveHeroes.length > 0) {
            const hero = aliveHeroes[0];
            // 优先使用技能
            const availableSkill = hero.skills.findIndex((skill, index) => {
                const skillData = SKILLS[skill];
                return hero.currentMp >= skillData.cost;
            });
            
            if (availableSkill !== -1) {
                this.useSkill(0, availableSkill);
            } else {
                this.basicAttack(0);
            }
        }
    }
    
    // 跳过战斗
    skipBattle() {
        const battle = this.game.state.battle;
        const myPower = battle.playerTeam.reduce((sum, h) => {
            return sum + (h ? this.game.calculatePower(h) : 0);
        }, 0);
        const enemyPower = this.game.calculatePower(battle.enemy);
        
        if (myPower > enemyPower * 1.5) {
            this.game.showNotification('跳过战斗！', 'info', 1000);
            this.endBattle(true, true);
        } else {
            this.game.showNotification('敌人太强，无法跳过！', 'error', 2000);
        }
    }
    
    // 结束战斗
    endBattle(victory, skipped = false) {
        const battle = this.game.state.battle;
        
        if (victory) {
            // 计算奖励
            const baseGold = 50 + battle.enemy.level * 10;
            const baseExp = 30 + battle.enemy.level * 5;
            const goldReward = skipped ? Math.floor(baseGold * 0.5) : baseGold;
            const expReward = skipped ? Math.floor(baseExp * 0.5) : baseExp;
            
            this.game.player.gold += goldReward;
            this.game.player.exp += expReward;
            this.game.player.stats.battleWin++;
            
            // 完成每日任务
            this.game.completeQuest('battle1', 1);
            if (this.game.player.stats.battleWin % 5 === 0) {
                this.game.completeQuest('battle5', 1);
            }
            if (this.game.player.stats.battleWin % 10 === 0) {
                this.game.completeQuest('battle10', 1);
            }
            
            this.game.showNotification(
                `🎉 胜利！获得 💰${goldReward} 📖${expReward}EXP`,
                'success',
                3000
            );
            
            // 检查升级
            this.game.checkLevelUp();
        } else {
            this.game.player.stats.battleLose++;
            this.game.showNotification('战斗失败...', 'error', 2000);
        }
        
        this.game.state.battle = null;
        this.game.state.screen = 'home';
        this.game.saveGame();
    }
}

// 导出到全局
window.BattleSystem = BattleSystem;
