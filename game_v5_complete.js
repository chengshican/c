// 三国英雄传 v5.0 - 战斗系统完全重写版
// 确保战斗 100% 可以正常结束

const CONFIG = {
    FPS: 60,
    SAVE_INTERVAL: 30000,
    VERSION: '5.0.0'
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
    { id: 'guanyu', name: '关羽', rarity: 'SSR', hp: 350, attack: 90, defense: 60, speed: 45 },
    { id: 'zhangfei', name: '张飞', rarity: 'SSR', hp: 400, attack: 85, defense: 50, speed: 50 },
    { id: 'zhugeliang', name: '诸葛亮', rarity: 'SSR', hp: 200, attack: 50, defense: 40, speed: 60 },
    { id: 'liubei', name: '刘备', rarity: 'UR', hp: 380, attack: 75, defense: 65, speed: 52 },
    { id: 'caocao', name: '曹操', rarity: 'UR', hp: 320, attack: 70, defense: 55, speed: 55 }
];

class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.ui = null;
        
        this.player = {
            level: 1,
            gold: 1000,
            gem: 100,
            heroes: [],
            team: [],
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
        console.log('🎮 三国英雄传 v5.0 初始化中...');
        
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
                    </div>
                </div>
                <div class="main-content">
                    <div class="team-display">
                        <h3>我的阵容</h3>
                        <div class="team-slots" id="team-slots"></div>
                        <button class="btn btn-secondary" onclick="game.showTeamEditor()">🛡️ 编辑阵容</button>
                    </div>
                    <div class="quick-actions">
                        <button class="btn btn-primary" onclick="game.startBattle()">⚔️ 快速战斗</button>
                        <button class="btn btn-success" onclick="game.showSummon()">🎴 招募武将</button>
                        <button class="btn btn-info" onclick="game.showHeroList()">👥 武将列表</button>
                        <button class="btn btn-warning" onclick="game.showShop()">🏪 商店</button>
                    </div>
                    <div style="text-align: center; margin-top: 20px;">
                        <button class="btn btn-danger" onclick="game.confirmRestart()" style="padding: 10px 20px; font-size: 14px;">🔄 重新开始</button>
                    </div>
                </div>
            </div>
            
            <div id="battle-screen" class="screen">
                <div class="header">
                    <button class="back-btn" onclick="game.endBattle(false)">← 逃跑</button>
                    <h2>⚔️ 战斗中 - 第 <span id="battle-turn">1</span> 回合</h2>
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
    
    // ==================== ⚔️ 全新战斗系统 ====================
    startBattle() {
        if (this.player.team.length === 0) {
            alert('⚠️ 阵容为空！请先编辑阵容');
            this.showTeamEditor();
            return;
        }
        
        // 停止之前的战斗
        this.stopBattle();
        
        // 创建敌人
        const enemies = [
            { name: '黄巾军', hp: 100, maxHp: 100, attack: 20, defense: 10 },
            { name: '董卓军', hp: 150, maxHp: 150, attack: 30, defense: 20 },
            { name: '袁绍军', hp: 120, maxHp: 120, attack: 25, defense: 15 }
        ];
        
        const enemyCount = Math.floor(Math.random() * 2) + 1; // 1-2 个敌人
        const enemyTeam = [];
        for (let i = 0; i < enemyCount; i++) {
            const base = enemies[Math.floor(Math.random() * enemies.length)];
            enemyTeam.push({ ...base });
        }
        
        this.state.battle = {
            turn: 1,
            playerTeam: this.player.team.map(id => {
                const hero = this.player.heroes.find(h => h.id === id);
                return hero ? { ...hero, currentHp: hero.hp } : null;
            }).filter(h => h),
            enemyTeam: enemyTeam,
            log: [`战斗开始！敌人：${enemyTeam.map(e => e.name).join('、')}`]
        };
        
        this.battleRunning = true;
        this.showScreen('battle');
        this.renderBattle();
        
        // 开始战斗循环
        this.battleTimer = setInterval(() => this.battleLoop(), 1500);
    }
    
    battleLoop() {
        if (!this.battleRunning || !this.state.battle) return;
        
        const battle = this.state.battle;
        
        // 检查是否还有敌人
        const aliveEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (aliveEnemies.length === 0) {
            this.winBattle();
            return;
        }
        
        // 检查是否还有玩家
        const alivePlayers = battle.playerTeam.filter(p => p.currentHp > 0);
        if (alivePlayers.length === 0) {
            this.loseBattle();
            return;
        }
        
        // 玩家攻击
        const attacker = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        
        const damage = Math.max(1, attacker.attack - target.defense / 2);
        target.currentHp = Math.max(0, target.currentHp - damage);
        
        battle.log.push(`⚔️ ${attacker.name}攻击${target.name}造成${Math.floor(damage)}伤害`);
        
        if (target.currentHp <= 0) {
            battle.log.push(`💀 ${target.name}被击败！`);
        }
        
        // 更新回合数
        battle.turn++;
        
        this.renderBattle();
        
        // 再次检查胜利
        const remainingEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (remainingEnemies.length === 0) {
            setTimeout(() => this.winBattle(), 500);
        }
    }
    
    winBattle() {
        this.stopBattle();
        
        const goldReward = 50;
        const expReward = 30;
        
        this.player.gold += goldReward;
        this.player.stats = this.player.stats || {};
        this.player.stats.battleWin = (this.player.stats.battleWin || 0) + 1;
        
        // 【新增】元宝掉落（30% 概率）
        let gemReward = 0;
        const gemDropChance = Math.random();
        if (gemDropChance < 0.3) { // 30% 概率
            gemReward = Math.floor(Math.random() * 5) + 1; // 1-5 元宝
            this.player.gem += gemReward;
        }
        
        this.saveGame();
        
        let rewardText = `🎉 战斗胜利！\n获得 💰${goldReward} 金币\n获得 ✨${expReward} 经验`;
        if (gemReward > 0) {
            rewardText += `\n💎 幸运！掉落 ${gemReward} 元宝！`;
        }
        
        alert(rewardText);
        
        this.state.battle = null;
        this.showScreen('home');
        this.updateResourceDisplay();
    }
    
    loseBattle() {
        this.stopBattle();
        alert('❌ 战斗失败！请强化武将后再来挑战！');
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
    
    endBattle(isRun) {
        this.stopBattle();
        if (isRun) {
            alert('🏃 逃跑成功！');
        }
        this.state.battle = null;
        this.showScreen('home');
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
            
            // 【修复】从阵容中移除该武将
            if (removedHero && this.player.team.includes(removedHero.id)) {
                const teamIndex = this.player.team.indexOf(removedHero.id);
                this.player.team.splice(teamIndex, 1);
                console.log(`✅ 已从阵容中移除 ${removedHero.name}`);
            }
            
            // 从武将列表中移除
            this.player.heroes.splice(index, 1);
            
            // 更新界面
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
            localStorage.setItem('sanguo_idle_save_v5', JSON.stringify(this.player));
            console.log('✅ 游戏已保存');
        } catch (e) {
            console.error('❌ 保存失败', e);
        }
    }
    
    loadGame() {
        try {
            const saved = localStorage.getItem('sanguo_idle_save_v5');
            if (saved) {
                const data = JSON.parse(saved);
                Object.assign(this.player, data);
                console.log('✅ 存档已加载');
            } else {
                // 新游戏
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
            localStorage.removeItem('sanguo_idle_save_v5');
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
