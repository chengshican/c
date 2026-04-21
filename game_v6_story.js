// 三国英雄传 v6.0 - 关卡剧情版
// 新增：关卡系统、主线剧情、任务系统、进度系统

const CONFIG = {
    FPS: 60,
    SAVE_INTERVAL: 30000,
    VERSION: '6.0.0'
};

const RARITY = {
    N: { name: 'N', color: '#999999' },
    R: { name: 'R', color: '#4CAF50' },
    SR: { name: 'SR', color: '#2196F3' },
    SSR: { name: 'SSR', color: '#FF9800' },
    UR: { name: 'UR', color: '#E91E63' }
};

const HERO_DATABASE = [
    { id: 'zhaolei', name: '赵累', rarity: 'R', hp: 150, attack: 35, defense: 25, speed: 20 },
    { id: 'liao', name: '廖化', rarity: 'R', hp: 180, attack: 40, defense: 30, speed: 25 },
    { id: 'zhaoyun', name: '赵云', rarity: 'SR', hp: 250, attack: 65, defense: 45, speed: 55 },
    { id: 'machao', name: '马超', rarity: 'SR', hp: 240, attack: 70, defense: 40, speed: 58 },
    { id: 'huangzhong', name: '黄忠', rarity: 'SR', hp: 220, attack: 75, defense: 35, speed: 45 },
    { id: 'weyan', name: '魏延', rarity: 'SR', hp: 260, attack: 68, defense: 42, speed: 48 },
    { id: 'guanyu', name: '关羽', rarity: 'SSR', hp: 350, attack: 90, defense: 60, speed: 45 },
    { id: 'zhangfei', name: '张飞', rarity: 'SSR', hp: 400, attack: 85, defense: 50, speed: 50 },
    { id: 'zhugeliang', name: '诸葛亮', rarity: 'SSR', hp: 200, attack: 50, defense: 40, speed: 60 },
    { id: 'liubei', name: '刘备', rarity: 'UR', hp: 380, attack: 75, defense: 65, speed: 52 },
    { id: 'caocao', name: '曹操', rarity: 'UR', hp: 320, attack: 70, defense: 55, speed: 55 }
];

// ==================== 关卡系统 ====================
const LEVELS = [
    {
        id: 1,
        name: '涿郡起兵',
        difficulty: '简单',
        enemyCount: 2,
        enemies: [
            { name: '黄巾小兵', hp: 80, attack: 15, defense: 8 },
            { name: '黄巾小兵', hp: 80, attack: 15, defense: 8 }
        ],
        reward: { gold: 50, exp: 30, gem: 0 },
        unlockReq: '新游戏解锁',
        story: '黄巾起义爆发，你在涿郡起兵响应...'
    },
    {
        id: 2,
        name: '讨伐董卓',
        difficulty: '简单',
        enemyCount: 2,
        enemies: [
            { name: '董卓军', hp: 120, attack: 25, defense: 15 },
            { name: '董卓军', hp: 120, attack: 25, defense: 15 }
        ],
        reward: { gold: 80, exp: 50, gem: 1 },
        unlockReq: '通过第 1 关',
        story: '董卓祸乱朝纲，十八路诸侯共讨之...'
    },
    {
        id: 3,
        name: '三英战吕布',
        difficulty: '中等',
        enemyCount: 3,
        enemies: [
            { name: '吕布', hp: 300, attack: 80, defense: 50 },
            { name: '并州狼骑', hp: 100, attack: 30, defense: 20 },
            { name: '并州狼骑', hp: 100, attack: 30, defense: 20 }
        ],
        reward: { gold: 150, exp: 100, gem: 3 },
        unlockReq: '通过第 2 关',
        story: '虎牢关前，吕布逞威，谁敢与之一战？'
    },
    {
        id: 4,
        name: '徐州风云',
        difficulty: '中等',
        enemyCount: 3,
        enemies: [
            { name: '曹军', hp: 150, attack: 40, defense: 25 },
            { name: '曹军', hp: 150, attack: 40, defense: 25 },
            { name: '曹军', hp: 150, attack: 40, defense: 25 }
        ],
        reward: { gold: 200, exp: 150, gem: 5 },
        unlockReq: '通过第 3 关',
        story: '曹操东征徐州，刘备危在旦夕...'
    },
    {
        id: 5,
        name: '官渡之战',
        difficulty: '困难',
        enemyCount: 4,
        enemies: [
            { name: '袁绍军', hp: 180, attack: 45, defense: 30 },
            { name: '袁绍军', hp: 180, attack: 45, defense: 30 },
            { name: '颜良', hp: 250, attack: 60, defense: 40 },
            { name: '文丑', hp: 250, attack: 60, defense: 40 }
        ],
        reward: { gold: 300, exp: 200, gem: 10 },
        unlockReq: '通过第 4 关',
        story: '官渡决战，以少胜多的经典战役...'
    },
    {
        id: 6,
        name: '赤壁之战',
        difficulty: '极难',
        enemyCount: 5,
        enemies: [
            { name: '曹军', hp: 200, attack: 50, defense: 35 },
            { name: '曹军', hp: 200, attack: 50, defense: 35 },
            { name: '曹军', hp: 200, attack: 50, defense: 35 },
            { name: '曹操', hp: 400, attack: 70, defense: 55 },
            { name: '曹军', hp: 200, attack: 50, defense: 35 }
        ],
        reward: { gold: 500, exp: 300, gem: 20 },
        unlockReq: '通过第 5 关',
        story: '赤壁火攻，三分天下由此定...'
    }
];

// ==================== 任务系统 ====================
const DAILY_QUESTS = [
    { id: 1, name: '初战告捷', desc: '赢得 1 场战斗胜利', target: 1, reward: { gold: 100, gem: 10 } },
    { id: 2, name: '百战百胜', desc: '赢得 10 场战斗胜利', target: 10, reward: { gold: 500, gem: 50 } },
    { id: 3, name: '招兵买马', desc: '招募 1 名武将', target: 1, reward: { gold: 200, gem: 20 } },
    { id: 4, name: '精兵强将', desc: '升级 1 次武将', target: 1, reward: { gold: 150, gem: 15 } },
    { id: 5, name: '过关斩将', desc: '通过 1 个关卡', target: 1, reward: { gold: 300, gem: 30 } }
];

class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.ui = null;
        
        this.player = {
            level: 1,
            exp: 0,
            gold: 1000,
            gem: 100,
            heroes: [],
            team: [],
            passedLevels: [], // 已通过的关卡
            currentLevel: 1,  // 当前关卡
            dailyQuests: {},  // 每日任务进度
            stats: {
                battleWin: 0,
                summonCount: 0,
                totalDamage: 0
            },
            hasSkippedGuide: false
        };
        
        this.state = {
            screen: 'home',
            battle: null
        };
        
        this.battleTimer = null;
        this.battleRunning = false;
        
        setTimeout(() => this.init(), 100);
    }
    
    init() {
        console.log('🎮 三国英雄传 v6.0 关卡剧情版 初始化中...');
        
        this.canvas = document.getElementById('game-canvas');
        this.ui = document.getElementById('ui-layer');
        
        if (!this.canvas || !this.ui) {
            console.error('❌ 初始化失败');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        this.loadGame();
        this.setupUI();
        this.render();
        
        console.log('✅ 游戏初始化成功！');
    }
    
    resize() {
        const container = document.getElementById('game-container');
        if (container) {
            const rect = container.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
    }
    
    formatNumber(num) {
        if (num >= 10000) return (num / 10000).toFixed(1) + '万';
        return num.toString();
    }
    
    // ==================== UI 设置 ====================
    setupUI() {
        if (!this.ui) return;
        
        this.ui.innerHTML = `
            <div id="home-screen" class="screen active">
                <div class="header">
                    <div class="player-info">
                        <span class="level">Lv.${this.player.level}</span>
                        <span class="gold">💰 ${this.formatNumber(this.player.gold)}</span>
                        <span class="gem">💎 ${this.formatNumber(this.player.gem)}</span>
                        <span class="chapter">📍 第${this.player.currentLevel}关</span>
                    </div>
                </div>
                <div class="main-content">
                    <div class="team-display">
                        <h3>我的阵容</h3>
                        <div class="team-slots" id="team-slots"></div>
                        <button class="btn btn-secondary" onclick="game.showTeamEditor()">🛡️ 编辑阵容</button>
                    </div>
                    
                    <div class="quick-actions">
                        <button class="btn btn-primary" onclick="game.showLevelSelect()" style="background: linear-gradient(135deg, #e74c3c, #c0392b);">🗺️ 征战天下</button>
                        <button class="btn btn-success" onclick="game.showSummon()">🎴 招募武将</button>
                        <button class="btn btn-info" onclick="game.showHeroList()">👥 武将列表</button>
                        <button class="btn btn-warning" onclick="game.showShop()">🏪 商店</button>
                    </div>
                    
                    <div class="daily-quests" style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-top: 20px;">
                        <h3>📋 每日任务</h3>
                        <div id="daily-quest-list"></div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="btn btn-danger" onclick="game.confirmRestart()" style="padding: 10px 20px; font-size: 14px;">🔄 重新开始</button>
                    </div>
                </div>
            </div>
            
            <div id="level-screen" class="screen">
                <div class="header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>🗺️ 征战天下</h2>
                </div>
                <div class="main-content">
                    <div id="level-list" style="display: grid; gap: 15px;"></div>
                </div>
            </div>
            
            <div id="battle-screen" class="screen">
                <div class="header">
                    <button class="back-btn" onclick="game.endBattle(false)">← 逃跑</button>
                    <h2>⚔️ <span id="battle-level-name">战斗中</span></h2>
                </div>
                <div class="battle-content" id="battle-content"></div>
            </div>
            
            <div id="heroes-screen" class="screen">
                <div class="header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>👥 武将列表 (<span id="hero-count">0</span>)</h2>
                </div>
                <div class="heroes-content" id="heroes-content"></div>
            </div>
            
            <div id="summon-modal" class="modal">
                <div class="modal-content">
                    <h2>🎴 招募武将</h2>
                    <div class="summon-rates">
                        <div class="rate"><span>UR</span><span>1%</span></div>
                        <div class="rate"><span>SSR</span><span>6%</span></div>
                        <div class="rate"><span>SR</span><span>20%</span></div>
                        <div class="rate"><span>R</span><span>73%</span></div>
                    </div>
                    <div class="summon-options">
                        <button class="btn btn-success" onclick="game.summon(1)">🎴 招募一次 (100💎)</button>
                        <button class="btn btn-primary" onclick="game.summon(10)">🎴 招募十次 (1000💎)</button>
                    </div>
                    <div id="summon-result" class="summon-result"></div>
                    <button class="btn btn-secondary" onclick="game.closeModal('summon-modal')">关闭</button>
                </div>
            </div>
            
            <div id="shop-modal" class="modal">
                <div class="modal-content">
                    <h2>🏪 商店</h2>
                    <div class="shop-items">
                        <div class="shop-item">
                            <span>📜 经验书</span>
                            <span>💰 100</span>
                            <button class="btn btn-sm" onclick="game.buyItem('exp', 100)">购买</button>
                        </div>
                    </div>
                    <button class="btn btn-secondary" onclick="game.closeModal('shop-modal')">关闭</button>
                </div>
            </div>
            
            <div id="team-editor-modal" class="modal">
                <div class="modal-content" style="max-width: 800px;">
                    <h2>🛡️ 编辑阵容</h2>
                    <div class="current-team" id="current-team"></div>
                    <div class="available-heroes" id="available-heroes"></div>
                    <button class="btn btn-primary" onclick="game.autoArrangeTeam()">⚡ 一键布阵</button>
                    <button class="btn btn-secondary" onclick="game.closeModal('team-editor-modal')">关闭</button>
                </div>
            </div>
        `;
        
        this.updateTeamDisplay();
        this.updateResourceDisplay();
        this.renderDailyQuests();
    }
    
    // ==================== 界面控制 ====================
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`${screenName}-screen`);
        if (target) {
            target.classList.add('active');
            this.state.screen = screenName;
            
            if (screenName === 'heroes') {
                this.renderHeroesList();
            }
        }
    }
    
    showModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.add('show');
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.classList.remove('show');
    }
    
    // ==================== 🗺️ 关卡系统 ====================
    showLevelSelect() {
        this.showScreen('level');
        this.renderLevelList();
    }
    
    renderLevelList() {
        const listDiv = document.getElementById('level-list');
        if (!listDiv) return;
        
        listDiv.innerHTML = LEVELS.map(level => {
            const isUnlocked = level.id === 1 || this.player.passedLevels.includes(level.id - 1);
            const isPassed = this.player.passedLevels.includes(level.id);
            const isCurrent = this.player.currentLevel === level.id;
            
            return `
                <div style="background: ${isUnlocked ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#555'}; padding: 20px; border-radius: 15px; opacity: ${isUnlocked ? 1 : 0.6};">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="flex: 1;">
                            <h3 style="font-size: 20px; margin-bottom: 5px;">
                                ${isPassed ? '✅' : isCurrent ? '📍' : '🔒'} 
                                第${level.id}关：${level.name}
                            </h3>
                            <p style="font-size: 14px; opacity: 0.8; margin-bottom: 5px;">难度：${level.difficulty}</p>
                            <p style="font-size: 13px; opacity: 0.7; margin-bottom: 10px;">${level.story}</p>
                            <div style="font-size: 14px;">
                                🎁 奖励：💰${level.reward.gold} ✨${level.reward.exp} ${level.reward.gem > 0 ? '💎' + level.reward.gem : ''}
                            </div>
                        </div>
                        ${isUnlocked ? `
                            <button class="btn btn-success" onclick="game.startLevel(${level.id})" style="padding: 15px 30px;">
                                ${isPassed ? '再次挑战' : '开始挑战'}
                            </button>
                        ` : '<div style="font-size: 14px; color: #aaa;">需通过第' + (level.id - 1) + '关</div>'}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    startLevel(levelId) {
        const level = LEVELS.find(l => l.id === levelId);
        if (!level) return;
        
        if (this.player.team.length === 0) {
            alert('⚠️ 阵容为空！请先编辑阵容');
            this.showTeamEditor();
            return;
        }
        
        this.stopBattle();
        
        const enemyTeam = level.enemies.map(e => ({ ...e, maxHp: e.hp, currentHp: e.hp }));
        
        this.state.battle = {
            turn: 1,
            level: level,
            playerTeam: this.player.team.map(id => {
                const hero = this.player.heroes.find(h => h.id === id);
                return hero ? { ...hero, currentHp: hero.hp } : null;
            }).filter(h => h),
            enemyTeam: enemyTeam,
            log: [`📜 ${level.story}`, `战斗开始！敌人：${enemyTeam.map(e => e.name).join('、')}`]
        };
        
        this.battleRunning = true;
        this.showScreen('battle');
        document.getElementById('battle-level-name').textContent = level.name;
        this.renderBattle();
        
        this.battleTimer = setInterval(() => this.battleLoop(), 1500);
    }
    
    battleLoop() {
        if (!this.battleRunning || !this.state.battle) return;
        
        const battle = this.state.battle;
        
        // 检查胜利条件
        const aliveEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (aliveEnemies.length === 0) {
            this.winBattle();
            return;
        }
        
        // 检查失败条件
        const alivePlayers = battle.playerTeam.filter(p => p.currentHp > 0);
        if (alivePlayers.length === 0) {
            this.loseBattle();
            return;
        }
        
        // 玩家回合：随机一个存活的武将攻击
        const playerAttacker = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const enemyTarget = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        
        const playerDamage = Math.max(1, playerAttacker.attack - enemyTarget.defense / 2);
        enemyTarget.currentHp = Math.max(0, enemyTarget.currentHp - playerDamage);
        
        battle.log.push(`⚔️ ${playerAttacker.name}攻击${enemyTarget.name}造成${Math.floor(playerDamage)}伤害`);
        
        if (enemyTarget.currentHp <= 0) {
            battle.log.push(`💀 ${enemyTarget.name}被击败！`);
        }
        
        // 检查敌人是否全灭
        const remainingEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (remainingEnemies.length === 0) {
            this.renderBattle();
            setTimeout(() => this.winBattle(), 500);
            return;
        }
        
        // 敌人回合：每个存活的敌人随机攻击一个玩家武将
        const alivePlayersAfterAttack = battle.playerTeam.filter(p => p.currentHp > 0);
        for (const enemy of aliveEnemies) {
            const playerTarget = alivePlayersAfterAttack[Math.floor(Math.random() * alivePlayersAfterAttack.length)];
            
            const enemyDamage = Math.max(1, enemy.attack - playerTarget.defense / 2);
            playerTarget.currentHp = Math.max(0, playerTarget.currentHp - enemyDamage);
            
            battle.log.push(`🔥 ${enemy.name}攻击${playerTarget.name}造成${Math.floor(enemyDamage)}伤害`);
            
            if (playerTarget.currentHp <= 0) {
                battle.log.push(`💔 ${playerTarget.name}被击败！`);
            }
        }
        
        // 检查玩家是否全灭
        const remainingPlayers = battle.playerTeam.filter(p => p.currentHp > 0);
        if (remainingPlayers.length === 0) {
            this.renderBattle();
            setTimeout(() => this.loseBattle(), 500);
            return;
        }
        
        battle.turn++;
        this.renderBattle();
    }
    
    winBattle() {
        this.stopBattle();
        
        const level = this.state.battle.level;
        const reward = level.reward;
        
        this.player.gold += reward.gold;
        this.player.exp += reward.exp;
        if (reward.gem > 0) {
            this.player.gem += reward.gem;
        }
        
        // 记录通关
        if (!this.player.passedLevels.includes(level.id)) {
            this.player.passedLevels.push(level.id);
            this.player.currentLevel = level.id + 1;
        }
        
        // 更新任务
        this.updateDailyQuest('battle_win');
        
        this.player.stats.battleWin = (this.player.stats.battleWin || 0) + 1;
        
        this.saveGame();
        
        let rewardText = `🎉 战斗胜利！\n📜 关卡：${level.name}\n💰 金币 +${reward.gold}\n✨ 经验 +${reward.exp}`;
        if (reward.gem > 0) {
            rewardText += `\n💎 元宝 +${reward.gem}`;
        }
        
        if (!this.player.passedLevels.includes(level.id - 1) || level.id === 1) {
            rewardText += `\n\n🎊 首次通关！解锁下一关！`;
        }
        
        alert(rewardText);
        
        this.state.battle = null;
        this.showScreen('home');
        this.updateResourceDisplay();
        this.renderDailyQuests();
    }
    
    loseBattle() {
        this.stopBattle();
        alert('❌ 战斗失败！请强化武将后再来挑战！');
        this.state.battle = null;
        this.showScreen('home');
    }
    
    endBattle(isRun) {
        this.stopBattle();
        if (isRun) {
            alert('🏃 逃跑成功！');
        }
        this.state.battle = null;
        this.showScreen('home');
    }
    
    stopBattle() {
        if (this.battleTimer) {
            clearInterval(this.battleTimer);
            this.battleTimer = null;
        }
        this.battleRunning = false;
    }
    
    renderBattle() {
        const content = document.getElementById('battle-content');
        const turnDisplay = document.getElementById('battle-turn');
        
        if (!content || !this.state.battle) return;
        
        const battle = this.state.battle;
        
        if (turnDisplay) {
            turnDisplay.textContent = battle.turn;
        }
        
        content.innerHTML = `
            <div style="padding: 20px;">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h3>🎮 第 ${battle.turn} 回合</h3>
                </div>
                
                <div style="display: flex; justify-content: space-around; margin-bottom: 40px;">
                    ${battle.enemyTeam.map(e => `
                        <div style="background: #e74c3c; padding: 15px; border-radius: 10px; min-width: 150px; text-align: center;">
                            <div style="font-size: 20px; margin-bottom: 10px;">👹 ${e.name}</div>
                            <div style="background: #333; height: 15px; border-radius: 8px; overflow: hidden;">
                                <div style="background: #2ecc71; height: 100%; width: ${(e.currentHp / e.maxHp) * 100}%; transition: width 0.3s;"></div>
                            </div>
                            <div style="margin-top: 5px;">${Math.ceil(e.currentHp)}/${e.maxHp}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="display: flex; justify-content: space-around;">
                    ${battle.playerTeam.map(h => `
                        <div style="background: #3498db; padding: 15px; border-radius: 10px; min-width: 150px; text-align: center;">
                            <div style="font-size: 20px; margin-bottom: 10px;">⚔️ ${h.name}</div>
                            <div style="background: #333; height: 15px; border-radius: 8px; overflow: hidden;">
                                <div style="background: #2ecc71; height: 100%; width: ${(h.currentHp / h.hp) * 100}%; transition: width 0.3s;"></div>
                            </div>
                            <div style="margin-top: 5px;">${Math.ceil(h.currentHp)}/${h.hp}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div style="margin-top: 40px; text-align: center;">
                    <div style="background: rgba(0,0,0,0.5); padding: 20px; border-radius: 10px; max-height: 200px; overflow-y: auto;">
                        <h4>📝 战斗记录</h4>
                        <div style="text-align: left; margin-top: 10px; font-size: 14px;">
                            ${battle.log.slice(-10).map(log => `<div>${log}</div>`).join('') || '<div>战斗开始...</div>'}
                        </div>
                    </div>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <button class="btn btn-danger" onclick="game.endBattle(true)" style="margin: 5px;">🏃 逃跑</button>
                </div>
            </div>
        `;
    }
    
    // ==================== 任务系统 ====================
    renderDailyQuests() {
        const listDiv = document.getElementById('daily-quest-list');
        if (!listDiv) return;
        
        listDiv.innerHTML = DAILY_QUESTS.map(quest => {
            const progress = (this.player.dailyQuests[quest.id] || 0);
            const completed = progress >= quest.target;
            const claimed = this.player.dailyQuests[quest.id + '_claimed'];
            
            return `
                <div style="background: ${completed && !claimed ? 'rgba(46, 204, 113, 0.2)' : 'rgba(0,0,0,0.2)'}; padding: 15px; border-radius: 10px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                        <div style="font-weight: bold; margin-bottom: 5px;">${quest.name}</div>
                        <div style="font-size: 13px; opacity: 0.8;">${quest.desc}</div>
                        <div style="font-size: 12px; margin-top: 5px;">
                            进度：${Math.min(progress, quest.target)}/${quest.target}
                            ${completed ? ' ✅' : ''}
                        </div>
                    </div>
                    ${completed && !claimed ? `
                        <button class="btn btn-success" onclick="game.claimQuestReward(${quest.id})" style="padding: 8px 15px;">
                            领取奖励
                        </button>
                    ` : claimed ? '<div style="color: #999; font-size: 12px;">已领取</div>' : ''}
                </div>
            `;
        }).join('');
    }
    
    updateDailyQuest(type) {
        if (type === 'battle_win') {
            DAILY_QUESTS.forEach(quest => {
                if (quest.id === 1) { // 初战告捷
                    this.player.dailyQuests[quest.id] = (this.player.dailyQuests[quest.id] || 0) + 1;
                }
                if (quest.id === 2) { // 百战百胜
                    this.player.dailyQuests[quest.id] = (this.player.dailyQuests[quest.id] || 0) + 1;
                }
            });
        }
        if (type === 'summon') {
            const quest = DAILY_QUESTS.find(q => q.id === 3);
            if (quest) {
                this.player.dailyQuests[quest.id] = (this.player.dailyQuests[quest.id] || 0) + 1;
            }
        }
        this.renderDailyQuests();
    }
    
    claimQuestReward(questId) {
        const quest = DAILY_QUESTS.find(q => q.id === questId);
        if (!quest) return;
        
        const progress = this.player.dailyQuests[questId] || 0;
        if (progress < quest.target) {
            alert('❌ 任务未完成');
            return;
        }
        
        if (this.player.dailyQuests[questId + '_claimed']) {
            alert('❌ 奖励已领取');
            return;
        }
        
        this.player.gold += quest.reward.gold;
        this.player.gem += quest.reward.gem;
        this.player.dailyQuests[questId + '_claimed'] = true;
        
        alert(`✅ 领取奖励！\n💰 金币 +${quest.reward.gold}\n💎 元宝 +${quest.reward.gem}`);
        
        this.saveGame();
        this.updateResourceDisplay();
        this.renderDailyQuests();
    }
    
    // ==================== 武将系统 ====================
    getHeroById(id) {
        return this.player.heroes.find(h => h.id === id);
    }
    
    showHeroList() {
        this.showScreen('heroes');
    }
    
    renderHeroesList() {
        const content = document.getElementById('heroes-content');
        const countDisplay = document.getElementById('hero-count');
        
        if (!content) return;
        
        if (countDisplay) {
            countDisplay.textContent = this.player.heroes.length;
        }
        
        if (this.player.heroes.length === 0) {
            content.innerHTML = '<div style="text-align: center; padding: 50px; color: #999;">暂无武将，快去招募吧！</div>';
            return;
        }
        
        content.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; padding: 20px;">
                ${this.player.heroes.map((hero, index) => {
                    const template = HERO_DATABASE.find(h => h.id === hero.id) || hero;
                    const rarity = RARITY[template.rarity];
                    return `
                        <div style="background: linear-gradient(135deg, ${rarity ? rarity.color : '#999'} 0%, #333 100%); padding: 20px; border-radius: 15px;">
                            <div style="font-size: 24px; margin-bottom: 10px;">${template.name}</div>
                            <div style="font-size: 14px; margin-bottom: 10px;">
                                <div>❤️ HP: ${hero.hp}</div>
                                <div>⚔️ 攻击：${hero.attack}</div>
                                <div>🛡️ 防御：${hero.defense}</div>
                                <div>💨 速度：${hero.speed}</div>
                            </div>
                            <button class="btn btn-sm" onclick="game.removeHero(${index})" style="background: #e74c3c; width: 100%;">🗑️ 解散</button>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    removeHero(index) {
        if (confirm('确定要解散这个武将吗？')) {
            const removedHero = this.player.heroes[index];
            
            if (removedHero && this.player.team.includes(removedHero.id)) {
                const teamIndex = this.player.team.indexOf(removedHero.id);
                this.player.team.splice(teamIndex, 1);
            }
            
            this.player.heroes.splice(index, 1);
            this.renderHeroesList();
            this.updateTeamDisplay();
            alert('✅ 武将已解散');
        }
    }
    
    // ==================== 抽卡系统 ====================
    showSummon() {
        this.showModal('summon-modal');
    }
    
    summon(count) {
        const cost = count * 100;
        
        if (this.player.gem < cost) {
            alert(`❌ 元宝不足！需要 ${cost} 元宝`);
            return;
        }
        
        this.player.gem -= cost;
        
        const results = [];
        for (let i = 0; i < count; i++) {
            const rand = Math.random() * 100;
            let rarity = 'R';
            if (rand < 1) rarity = 'UR';
            else if (rand < 7) rarity = 'SSR';
            else if (rand < 27) rarity = 'SR';
            
            const pool = HERO_DATABASE.filter(h => h.rarity === rarity);
            const hero = pool[Math.floor(Math.random() * pool.length)];
            
            if (hero) {
                const existing = this.player.heroes.find(h => h.id === hero.id);
                if (existing) {
                    this.player.gold += 50;
                    results.push({ ...hero, isDupe: true });
                } else {
                    this.player.heroes.push({
                        id: hero.id,
                        name: hero.name,
                        rarity: hero.rarity,
                        hp: hero.hp,
                        attack: hero.attack,
                        defense: hero.defense,
                        speed: hero.speed
                    });
                    results.push(hero);
                }
            }
        }
        
        this.updateResourceDisplay();
        this.renderSummonResult(results);
        this.updateDailyQuest('summon');
    }
    
    renderSummonResult(results) {
        const resultDiv = document.getElementById('summon-result');
        if (!resultDiv) return;
        
        resultDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 20px;">
                ${results.map(r => {
                    const rarity = RARITY[r.rarity];
                    return `
                        <div style="background: linear-gradient(135deg, ${rarity ? rarity.color : '#999'} 0%, #333 100%); padding: 15px; border-radius: 10px; text-align: center;">
                            <div style="font-size: 18px; font-weight: bold;">${r.name}</div>
                            <div style="font-size: 12px; margin-top: 5px;">${r.rarity}</div>
                            ${r.isDupe ? '<div style="font-size: 10px; color: #f39c12;">+50 金币</div>' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    // ==================== 阵容系统 ====================
    showTeamEditor() {
        this.showModal('team-editor-modal');
        this.renderTeamEditor();
    }
    
    renderTeamEditor() {
        const currentDiv = document.getElementById('current-team');
        const availableDiv = document.getElementById('available-heroes');
        
        if (!currentDiv || !availableDiv) return;
        
        currentDiv.innerHTML = `
            <h4>当前阵容 (${this.player.team.length}/5)</h4>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 20px;">
                ${Array(5).fill(null).map((_, i) => {
                    const heroId = this.player.team[i];
                    const hero = this.player.heroes.find(h => h.id === heroId);
                    return `
                        <div style="background: ${hero ? '#3498db' : '#ecf0f1'}; padding: 15px; border-radius: 10px; text-align: center; min-height: 100px;">
                            ${hero ? `
                                <div style="font-weight: bold;">${hero.name}</div>
                                <button class="btn btn-sm" onclick="game.removeFromTeam(${i})" style="margin-top: 5px; background: #e74c3c; padding: 5px 10px;">下阵</button>
                            ` : '<div style="color: #999; margin-top: 35px;">空位</div>'}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        const availableHeroes = this.player.heroes.filter(h => !this.player.team.includes(h.id));
        availableDiv.innerHTML = `
            <h4>可选武将</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;">
                ${availableHeroes.length > 0 ? availableHeroes.map(hero => `
                    <div style="background: #2ecc71; padding: 10px; border-radius: 8px; text-align: center; cursor: pointer;" onclick="game.addToTeam('${hero.id}')">
                        <div style="font-weight: bold;">${hero.name}</div>
                        <div style="font-size: 12px;">点击上阵</div>
                    </div>
                `).join('') : '<div style="color: #999;">没有可上阵的武将</div>'}
            </div>
        `;
    }
    
    addToTeam(heroId) {
        if (this.player.team.length >= 5) {
            alert('⚠️ 阵容已满 (5 人)');
            return;
        }
        
        if (!this.player.team.includes(heroId)) {
            this.player.team.push(heroId);
            this.renderTeamEditor();
            this.updateTeamDisplay();
        }
    }
    
    removeFromTeam(index) {
        this.player.team.splice(index, 1);
        this.renderTeamEditor();
        this.updateTeamDisplay();
    }
    
    autoArrangeTeam() {
        if (this.player.heroes.length === 0) {
            alert('⚠️ 没有武将可布阵');
            return;
        }
        
        this.player.team = this.player.heroes.slice(0, 5).map(h => h.id);
        this.renderTeamEditor();
        this.updateTeamDisplay();
        alert('✅ 已按战力自动布阵');
    }
    
    updateTeamDisplay() {
        const slotsDiv = document.getElementById('team-slots');
        if (!slotsDiv) return;
        
        slotsDiv.innerHTML = `
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                ${Array(5).fill(null).map((_, i) => {
                    const heroId = this.player.team[i];
                    const hero = this.player.heroes.find(h => h.id === heroId);
                    return `
                        <div style="width: 60px; height: 60px; background: ${hero ? '#3498db' : '#ecf0f1'}; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 12px;">
                            ${hero ? hero.name.substring(0, 2) : '空'}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    // ==================== 商店系统 ====================
    showShop() {
        this.showModal('shop-modal');
    }
    
    buyItem(itemId, cost) {
        if (this.player.gold >= cost) {
            this.player.gold -= cost;
            alert('✅ 购买成功！');
            this.updateResourceDisplay();
        } else {
            alert('❌ 金币不足');
        }
    }
    
    // ==================== 资源显示 ====================
    updateResourceDisplay() {
        const goldEl = document.querySelector('.gold');
        const gemEl = document.querySelector('.gem');
        
        if (goldEl) goldEl.textContent = `💰 ${this.formatNumber(this.player.gold)}`;
        if (gemEl) gemEl.textContent = `💎 ${this.formatNumber(this.player.gem)}`;
    }
    
    // ==================== 存档系统 ====================
    saveGame() {
        try {
            localStorage.setItem('sanguo_idle_save_v6', JSON.stringify(this.player));
            console.log('✅ 游戏已保存');
        } catch (e) {
            console.error('❌ 保存失败', e);
        }
    }
    
    loadGame() {
        try {
            const saved = localStorage.getItem('sanguo_idle_save_v6');
            if (saved) {
                const data = JSON.parse(saved);
                Object.assign(this.player, data);
                console.log('✅ 存档已加载');
            } else {
                this.player.heroes.push({
                    id: 'zhaolei',
                    name: '赵累',
                    rarity: 'R',
                    hp: 150,
                    attack: 35,
                    defense: 25,
                    speed: 20
                });
                this.player.team = ['zhaolei'];
                console.log('✅ 新游戏初始化完成');
            }
        } catch (e) {
            console.error('❌ 加载失败', e);
        }
    }
    
    confirmRestart() {
        if (confirm('⚠️ 确定要重新开始吗？\n\n所有存档将被清空！')) {
            localStorage.removeItem('sanguo_idle_save_v6');
            location.reload();
        }
    }
}

// ==================== 全局函数 ====================
let game = null;

window.onload = () => {
    game = new Game();
};

window.onresize = () => {
    if (game) game.resize();
};
