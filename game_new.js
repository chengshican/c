// 三国英雄传 - 放置 RPG 爆款游戏
// 核心特性：放置挂机、抽卡收集、轻松上手、社交分享

// ==================== 游戏配置 ====================
const CONFIG = {
    FPS: 60,
    SAVE_INTERVAL: 30000, // 30 秒自动保存
    IDLE_REWARD_INTERVAL: 60000, // 60 秒挂机奖励
    MAX_IDLE_REWARD_TIME: 720 // 最多 12 小时挂机
};

// ==================== 武将稀有度 ====================
const RARITY = {
    N: { name: 'N', color: '#999999', rate: 0.5, maxLevel: 10 },
    R: { name: 'R', color: '#4CAF50', rate: 0.3, maxLevel: 20 },
    SR: { name: 'SR', color: '#2196F3', rate: 0.15, maxLevel: 40 },
    SSR: { name: 'SSR', color: '#FF9800', rate: 0.045, maxLevel: 60 },
    UR: { name: 'UR', color: '#E91E63', rate: 0.005, maxLevel: 80 }
};

// ==================== 武将数据库 ====================
const HERO_DATABASE = [
    // N 卡
    { id: 'soldier1', name: '步兵', rarity: 'N', hp: 100, attack: 20, defense: 15, speed: 10, skills: ['普通攻击'] },
    { id: 'archer1', name: '弓兵', rarity: 'N', hp: 80, attack: 25, defense: 10, speed: 15, skills: ['射击'] },
    { id: 'cavalry1', name: '骑兵', rarity: 'N', hp: 120, attack: 22, defense: 12, speed: 18, skills: ['冲锋'] },
    
    // R 卡
    { id: 'zhaolei', name: '赵累', rarity: 'R', hp: 150, attack: 35, defense: 25, speed: 20, skills: ['连击', '防御'] },
    { id: 'liao', name: '廖化', rarity: 'R', hp: 180, attack: 40, defense: 30, speed: 25, skills: ['猛攻', '坚韧'] },
    { id: 'cang', name: '仓亭', rarity: 'R', hp: 160, attack: 38, defense: 28, speed: 28, skills: ['速攻', '闪避'] },
    
    // SR 卡
    { id: 'zhaoyun', name: '赵云', rarity: 'SR', hp: 250, attack: 65, defense: 45, speed: 55, skills: ['龙胆', '七进七出', '无双'] },
    { id: 'machao', name: '马超', rarity: 'SR', hp: 240, attack: 70, defense: 40, speed: 58, skills: ['西凉铁骑', '枪神', '追击'] },
    { id: 'huangzhong', name: '黄忠', rarity: 'SR', hp: 220, attack: 75, defense: 35, speed: 45, skills: ['神射手', '百步穿杨', '连弩'] },
    { id: 'weyan', name: '魏延', rarity: 'SR', hp: 260, attack: 68, defense: 42, speed: 48, skills: ['狂骨', '奇袭', '不屈'] },
    
    // SSR 卡
    { id: 'guanyu', name: '关羽', rarity: 'SSR', hp: 350, attack: 90, defense: 60, speed: 45, skills: ['青龙偃月', '武圣', '单刀赴会', '忠义'] },
    { id: 'zhangfei', name: '张飞', rarity: 'SSR', hp: 400, attack: 85, defense: 50, speed: 50, skills: ['长坂坡', '猛吼', '万夫莫当', '狂暴'] },
    { id: 'zhugeliang', name: '诸葛亮', rarity: 'SSR', hp: 200, attack: 50, defense: 40, speed: 60, skills: ['卧龙', '火计', '空城计', '奇门遁甲'] },
    { id: 'caocao', name: '曹操', rarity: 'SSR', hp: 320, attack: 70, defense: 55, speed: 55, skills: ['奸雄', '唯才是举', '乱世奸雄', '统帅'] },
    
    // UR 卡
    { id: 'liubei', name: '刘备', rarity: 'UR', hp: 380, attack: 75, defense: 65, speed: 52, skills: ['仁德', '皇叔', '桃园结义', '汉室复兴', '天命'] },
    { id: 'luxun', name: '陆逊', rarity: 'UR', hp: 280, attack: 80, defense: 50, speed: 70, skills: ['书生拜将', '火烧连营', '深谋远虑', '儒将'] },
    { id: 'simayi', name: '司马懿', rarity: 'UR', hp: 300, attack: 75, defense: 55, speed: 65, skills: ['狼顾', '鬼才', '野心', '谋定天下'] }
];

// ==================== 技能库 ====================
const SKILLS = {
    // 普通技能
    '普通攻击': { name: '普通攻击', damage: 100, type: 'attack' },
    '射击': { name: '射击', damage: 120, type: 'attack' },
    '冲锋': { name: '冲锋', damage: 110, type: 'attack', effect: 'speed_up' },
    '连击': { name: '连击', damage: 80, type: 'attack', hits: 2 },
    '防御': { name: '防御', damage: 50, type: 'defense', effect: 'def_up' },
    '猛攻': { name: '猛攻', damage: 150, type: 'attack', cost: 10 },
    '坚韧': { name: '坚韧', damage: 0, type: 'buff', effect: 'hp_regen' },
    '速攻': { name: '速攻', damage: 90, type: 'attack', effect: 'speed_up' },
    '闪避': { name: '闪避', damage: 0, type: 'buff', effect: 'dodge_up' },
    
    // 高级技能
    '龙胆': { name: '龙胆', damage: 180, type: 'attack', effect: 'crit_up' },
    '七进七出': { name: '七进七出', damage: 200, type: 'aoe', cost: 20 },
    '无双': { name: '无双', damage: 250, type: 'attack', cost: 30 },
    '西凉铁骑': { name: '西凉铁骑', damage: 160, type: 'aoe', cost: 15 },
    '枪神': { name: '枪神', damage: 200, type: 'attack', effect: 'penetrate' },
    '追击': { name: '追击', damage: 120, type: 'counter' },
    '神射手': { name: '神射手', damage: 180, type: 'attack', effect: 'accuracy_up' },
    '百步穿杨': { name: '百步穿杨', damage: 220, type: 'attack', cost: 18 },
    '连弩': { name: '连弩', damage: 150, type: 'aoe', cost: 20 },
    '狂骨': { name: '狂骨', damage: 170, type: 'attack', effect: 'lifesteal' },
    '奇袭': { name: '奇袭', damage: 190, type: 'attack', effect: 'stun' },
    '不屈': { name: '不屈', damage: 0, type: 'buff', effect: 'revive' },
    
    // 终极技能
    '青龙偃月': { name: '青龙偃月', damage: 300, type: 'aoe', cost: 25 },
    '武圣': { name: '武圣', damage: 350, type: 'attack', cost: 35 },
    '单刀赴会': { name: '单刀赴会', damage: 400, type: 'attack', cost: 40 },
    '忠义': { name: '忠义', damage: 0, type: 'buff', effect: 'team_attack_up' },
    '长坂坡': { name: '长坂坡', damage: 320, type: 'aoe', cost: 28 },
    '猛吼': { name: '猛吼', damage: 280, type: 'aoe', cost: 22, effect: 'fear' },
    '万夫莫当': { name: '万夫莫当', damage: 380, type: 'attack', cost: 38 },
    '狂暴': { name: '狂暴', damage: 0, type: 'buff', effect: 'berserk' },
    '卧龙': { name: '卧龙', damage: 250, type: 'aoe', cost: 30 },
    '火计': { name: '火计', damage: 300, type: 'aoe', cost: 35, effect: 'burn' },
    '空城计': { name: '空城计', damage: 0, type: 'buff', effect: 'counter_magic' },
    '奇门遁甲': { name: '奇门遁甲', damage: 350, type: 'aoe', cost: 45, effect: 'chaos' },
    '奸雄': { name: '奸雄', damage: 280, type: 'attack', cost: 25 },
    '唯才是举': { name: '唯才是举', damage: 0, type: 'buff', effect: 'team_power_up' },
    '乱世奸雄': { name: '乱世奸雄', damage: 320, type: 'aoe', cost: 35 },
    '统帅': { name: '统帅', damage: 0, type: 'buff', effect: 'team_all_up' },
    
    // 天命技能
    '仁德': { name: '仁德', damage: 0, type: 'buff', effect: 'team_heal' },
    '皇叔': { name: '皇叔', damage: 350, type: 'attack', cost: 40 },
    '桃园结义': { name: '桃园结义', damage: 400, type: 'aoe', cost: 50 },
    '汉室复兴': { name: '汉室复兴', damage: 0, type: 'buff', effect: 'team_revive' },
    '天命': { name: '天命', damage: 500, type: 'aoe', cost: 60 },
    '书生拜将': { name: '书生拜将', damage: 300, type: 'attack', cost: 35 },
    '火烧连营': { name: '火烧连营', damage: 450, type: 'aoe', cost: 55, effect: 'burn_all' },
    '深谋远虑': { name: '深谋远虑', damage: 0, type: 'buff', effect: 'predict' },
    '儒将': { name: '儒将', damage: 380, type: 'attack', cost: 45 },
    '狼顾': { name: '狼顾', damage: 320, type: 'attack', cost: 35, effect: 'counter' },
    '鬼才': { name: '鬼才', damage: 400, type: 'aoe', cost: 50 },
    '野心': { name: '野心', damage: 0, type: 'buff', effect: 'power_steal' },
    '谋定天下': { name: '谋定天下', damage: 480, type: 'aoe', cost: 60 }
};

// ==================== 成就系统 ====================
const ACHIEVEMENTS = [
    { id: 'first_blood', name: '初出茅庐', desc: '赢得第 1 场战斗', condition: (p) => p.stats.battleWin >= 1, reward: { gold: 100, gem: 10 } },
    { id: 'veteran', name: '久经沙场', desc: '赢得 10 场战斗', condition: (p) => p.stats.battleWin >= 10, reward: { gold: 500, gem: 50 } },
    { id: 'warrior', name: '战无不胜', desc: '赢得 100 场战斗', condition: (p) => p.stats.battleWin >= 100, reward: { gold: 2000, gem: 200 } },
    { id: 'collector', name: '收藏家', desc: '拥有 10 名武将', condition: (p) => p.heroes.length >= 10, reward: { gold: 300, gem: 30 } },
    { id: 'rich', name: '富甲一方', desc: '拥有 10000 金币', condition: (p) => p.gold >= 10000, reward: { gem: 100 } },
    { id: 'summoner', name: '招募达人', desc: '进行 10 次招募', condition: (p) => p.stats.summonCount >= 10, reward: { gold: 500, gem: 50 } },
    { id: 'level10', name: '初露锋芒', desc: '玩家等级达到 10 级', condition: (p) => p.level >= 10, reward: { gold: 1000, gem: 100 } },
    { id: 'level20', name: '小有所成', desc: '玩家等级达到 20 级', condition: (p) => p.level >= 20, reward: { gold: 2000, gem: 200 } },
    { id: 'ssr', name: '欧皇附体', desc: '获得 SSR 武将', condition: (p) => p.heroes.some(h => HERO_DATABASE.find(db => db.id === h.id && db.rarity === 'SSR')), reward: { gold: 500, gem: 100 } },
    { id: 'ur', name: '天选之子', desc: '获得 UR 武将', condition: (p) => p.heroes.some(h => HERO_DATABASE.find(db => db.id === h.id && db.rarity === 'UR')), reward: { gold: 1000, gem: 300 } }
];

// ==================== 游戏主类 ====================
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        
        // 初始化玩家数据
        this.player = {
            level: 1,
            exp: 0,
            gold: 1000,
            gem: 100,
            heroes: [],
            team: [],
            achievements: [],
            stats: {
                battleWin: 0,
                battleLose: 0,
                totalDamage: 0,
                summonCount: 0
            },
            lastLogin: Date.now()
        };
        
        // 游戏状态
        this.state = {
            screen: 'home',
            battle: null,
            summon: null,
            idleReward: 0,
            lastSaveTime: Date.now()
        };
        
        this.autoBattle = true;
        
        // 延迟获取 ui-layer
        setTimeout(() => {
            this.ui = document.getElementById('ui-layer');
            if (this.ui) {
                this.init();
            }
        }, 100);
    }
    
    init() {
        this.resize();
        
        // 先设置 UI，再加载存档
        this.setupUI();
        
        // 加载存档
        this.loadGame();
        
        // 更新显示
        this.updateTeamDisplay();
        this.updateResourceDisplay();
        this.calculateIdleReward();
        
        this.bindEvents();
        this.gameLoop();
        
        // 自动保存
        setInterval(() => this.autoSave(), CONFIG.SAVE_INTERVAL);
        
        // 挂机奖励
        setInterval(() => this.gainIdleReward(), CONFIG.IDLE_REWARD_INTERVAL);
        
        // 成就检查
        setInterval(() => this.checkAchievements(), 5000);
        
        // 新手引导
        this.showGuideIfNew();
        
        this.showScreen('home');
    }
    
    resize() {
        const container = document.getElementById('game-container');
        const rect = container.getBoundingClientRect();
        this.canvas.width = rect.width;
        this.canvas.height = rect.height;
    }
    
    setupUI() {
        this.ui.innerHTML = `
            <div id="home-screen" class="screen active">
                <div class="header">
                    <div class="player-info">
                        <span class="level">Lv.${this.player.level}</span>
                        <span class="gold">💰 ${this.player.gold}</span>
                        <span class="gem">💎 ${this.player.gem}</span>
                    </div>
                </div>
                <div class="main-content">
                    <div class="team-display">
                        <h3>我的阵容</h3>
                        <div class="team-slots" id="team-slots"></div>
                    </div>
                    <div class="quick-actions">
                        <button class="btn btn-primary" onclick="game.startBattle()">⚔️ 快速战斗</button>
                        <button class="btn btn-success" onclick="game.showSummon()">🎴 招募武将</button>
                        <button class="btn btn-info" onclick="game.showHeroList()">👥 武将列表</button>
                        <button class="btn btn-warning" onclick="game.showShop()">🏪 商店</button>
                    </div>
                    <div class="share-section">
                        <button class="btn btn-secondary" onclick="game.shareResult()">📤 分享战绩</button>
                    </div>
                    <div class="idle-reward" id="idle-reward">
                        ⏰ 离线收益：<span id="idle-gold">0</span> 💰
                    </div>
                </div>
                <div class="bottom-nav">
                    <button class="nav-btn active" onclick="game.showScreen('home')">🏠 首页</button>
                    <button class="nav-btn" onclick="game.showScreen('heroes')">武将</button>
                    <button class="nav-btn" onclick="game.showScreen('battle')">征战</button>
                    <button class="nav-btn" onclick="game.showScreen('achievements')">成就</button>
                </div>
            </div>
            
            <div id="achievements-screen" class="screen">
                <div class="screen-header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>成就系统</h2>
                </div>
                <div class="achievements-list" id="achievements-list"></div>
            </div>
            
            <div id="battle-screen" class="screen">
                <div class="screen-header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>征战天下</h2>
                </div>
                <div class="chapter-list" id="chapter-list"></div>
            </div>
            
            <div id="summon-screen" class="screen modal">
                <div class="modal-content">
                    <h2>🎴 招募武将</h2>
                    <div class="summon-rates">
                        <div class="rate">UR: 0.5%</div>
                        <div class="rate">SSR: 4.5%</div>
                        <div class="rate">SR: 15%</div>
                        <div class="rate">R: 30%</div>
                        <div class="rate">N: 50%</div>
                    </div>
                    <div class="summon-options">
                        <button class="btn btn-primary" onclick="game.summon(1)">
                            招募 x1<br>💎 100
                        </button>
                        <button class="btn btn-success" onclick="game.summon(10)">
                            招募 x10<br>💎 1000
                        </button>
                    </div>
                    <div id="summon-result" class="summon-result"></div>
                    <button class="btn btn-secondary" onclick="game.closeModal('summon-screen')">关闭</button>
                </div>
            </div>
            
            <div id="battle-ui" class="battle-ui" style="display:none;">
                <div class="battle-info">
                    <div class="enemy-info">
                        <h3 id="enemy-name">敌人</h3>
                        <div class="hp-bar">
                            <div class="hp-fill" id="enemy-hp-bar"></div>
                        </div>
                        <span id="enemy-hp-text">100/100</span>
                    </div>
                    <div class="battle-log" id="battle-log"></div>
                </div>
                <div class="team-battle">
                    <div id="enemy-team"></div>
                    <div id="player-team-battle"></div>
                </div>
                <div class="battle-controls">
                    <button class="btn btn-primary" id="auto-battle-btn">
                        ⏸️ 暂停
                    </button>
                    <button class="btn btn-danger" onclick="game.endBattle()">逃跑</button>
                </div>
            </div>
        `;
        
        this.updateTeamDisplay();
        this.updateResourceDisplay();
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        // 自动战斗按钮
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'auto-battle-btn') {
                this.autoBattle = !this.autoBattle;
                e.target.textContent = this.autoBattle ? '⏸️ 暂停' : '▶️ 自动';
            }
        });
    }
    
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`${screenName}-screen`);
        if (target) {
            target.classList.add('active');
        }
        this.state.screen = screenName;
        
        if (screenName === 'battle') {
            this.renderChapterList();
        } else if (screenName === 'achievements') {
            this.renderAchievements();
        }
    }
    
    showModal(modalId) {
        document.getElementById(modalId).style.display = 'flex';
    }
    
    closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }
    
    updateTeamDisplay() {
        const container = document.getElementById('team-slots');
        if (!container) {
            console.warn('team-slots 元素未找到');
            return;
        }
        
        container.innerHTML = '';
        const team = this.player.team.slice(0, 5);
        
        if (team.length === 0) {
            container.innerHTML = '<p class="empty-tip">点击"招募武将"获取新武将</p>';
            return;
        }
        
        team.forEach((heroId, index) => {
            const hero = this.getHeroById(heroId);
            if (hero) {
                const div = document.createElement('div');
                div.className = `hero-card rarity-${RARITY[hero.rarity].name.toLowerCase()}`;
                div.innerHTML = `
                    <div class="hero-name">${hero.name}</div>
                    <div class="hero-stats">Lv.${hero.level} ⭐${hero.star || 1}</div>
                    <div class="hero-power">战力：${this.calculatePower(hero)}</div>
                `;
                container.appendChild(div);
            }
        });
    }
    
    updateResourceDisplay() {
        const goldEl = document.querySelector('.gold');
        const gemEl = document.querySelector('.gem');
        if (goldEl) goldEl.textContent = `💰 ${this.player.gold}`;
        if (gemEl) gemEl.textContent = `💎 ${this.player.gem}`;
    }
    
    calculateIdleReward() {
        const now = Date.now();
        const lastLogin = this.player.lastLogin || now;
        const hoursOffline = Math.min((now - lastLogin) / 3600000, CONFIG.MAX_IDLE_REWARD_TIME);
        
        if (hoursOffline > 0) {
            const goldReward = Math.floor(hoursOffline * 100 * this.player.level);
            const expReward = Math.floor(hoursOffline * 50 * this.player.level);
            this.state.idleReward = { gold: goldReward, exp: expReward, hours: hoursOffline };
            
            const idleGoldEl = document.getElementById('idle-gold');
            if (idleGoldEl) {
                idleGoldEl.textContent = goldReward;
            }
        }
    }
    
    gainIdleReward() {
        if (this.state.idleReward && this.state.idleReward.gold > 0) {
            this.player.gold += this.state.idleReward.gold;
            this.player.exp += this.state.idleReward.exp;
            
            this.showNotification(`获得离线奖励：💰${this.state.idleReward.gold} 📖${this.state.idleReward.exp}EXP`);
            this.state.idleReward = { gold: 0, exp: 0, hours: 0 };
            this.updateResourceDisplay();
        }
    }
    
    getHeroById(id) {
        const base = HERO_DATABASE.find(h => h.id === id);
        const playerHero = this.player.heroes.find(h => h.id === id);
        
        if (base && playerHero) {
            return {
                ...base,
                level: playerHero.level || 1,
                star: playerHero.star || 1,
                exp: playerHero.exp || 0
            };
        }
        return null;
    }
    
    calculatePower(hero) {
        const multiplier = 1 + (hero.level - 1) * 0.1 + (hero.star - 1) * 0.2;
        return Math.floor((hero.hp + hero.attack * 2 + hero.defense + hero.speed) * multiplier);
    }
    
    showSummon() {
        this.showModal('summon-screen');
        document.getElementById('summon-result').innerHTML = '';
    }
    
    summon(count) {
        const cost = count * 100;
        if (this.player.gem < cost) {
            this.showNotification('💎 元宝不足！', 'error');
            return;
        }
        
        this.player.gem -= cost;
        this.player.stats.summonCount += count;
        
        const results = [];
        let hasGuaranteed = false;
        
        // 首抽保底：第一次招募必得 SR
        if (this.player.stats.summonCount <= count && this.player.heroes.length === 0) {
            hasGuaranteed = true;
            const srPool = HERO_DATABASE.filter(h => h.rarity === 'SR');
            const guaranteedHero = srPool[Math.floor(Math.random() * srPool.length)];
            results.push({ ...guaranteedHero });
            
            const existing = this.player.heroes.find(h => h.id === guaranteedHero.id);
            if (existing) {
                existing.star = (existing.star || 1) + 1;
            } else {
                this.player.heroes.push({ ...guaranteedHero, level: 1, star: 1, exp: 0 });
            }
            
            count--;
            this.showNotification('🎉 首抽保底：获得 SR 武将！', 'success', 2000);
        }
        
        for (let i = 0; i < count; i++) {
            const hero = this.randomSummon();
            results.push(hero);
            
            const existing = this.player.heroes.find(h => h.id === hero.id);
            if (existing) {
                existing.star = (existing.star || 1) + 1;
            } else {
                this.player.heroes.push({ ...hero, level: 1, star: 1, exp: 0 });
            }
        }
        
        this.displaySummonResult(results);
        this.updateResourceDisplay();
        this.updateTeamDisplay();
        this.checkAchievements();
    }
    
    randomSummon() {
        const rand = Math.random();
        let rarity;
        
        if (rand < 0.005) rarity = 'UR';
        else if (rand < 0.05) rarity = 'SSR';
        else if (rand < 0.20) rarity = 'SR';
        else if (rand < 0.50) rarity = 'R';
        else rarity = 'N';
        
        const pool = HERO_DATABASE.filter(h => h.rarity === rarity);
        const randomHero = pool[Math.floor(Math.random() * pool.length)];
        
        return { ...randomHero };
    }
    
    displaySummonResult(results) {
        const container = document.getElementById('summon-result');
        container.innerHTML = '<h3>招募结果</h3><div class="summon-items"></div>';
        
        const itemsContainer = container.querySelector('.summon-items');
        results.forEach(hero => {
            const div = document.createElement('div');
            div.className = `summon-item rarity-${RARITY[hero.rarity].name.toLowerCase()}`;
            div.innerHTML = `
                <div class="hero-name">${hero.name}</div>
                <div class="rarity">${RARITY[hero.rarity].name}</div>
            `;
            itemsContainer.appendChild(div);
        });
        
        if (results.some(h => h.rarity === 'SSR' || h.rarity === 'UR')) {
            this.showNotification('🎉 恭喜获得稀有武将！');
        }
    }
    
    startBattle() {
        const enemy = this.generateEnemy(this.player.level);
        
        this.state.battle = {
            enemy: enemy,
            playerTeam: this.player.team.slice(0, 3).map(id => this.getHeroById(id)),
            turn: 0,
            log: [],
            auto: true
        };
        
        if (this.state.battle.playerTeam.length === 0) {
            this.showNotification('请先招募武将！', 'error');
            return;
        }
        
        document.getElementById('battle-ui').style.display = 'block';
        this.updateBattleUI();
        this.showNotification('战斗开始！');
    }
    
    generateEnemy(level) {
        const templates = HERO_DATABASE.filter(h => ['N', 'R', 'SR'].includes(h.rarity));
        const template = templates[Math.floor(Math.random() * templates.length)];
        
        return {
            ...template,
            level: level,
            hp: template.hp * (1 + level * 0.1),
            attack: template.attack * (1 + level * 0.1),
            defense: template.defense * (1 + level * 0.1),
            maxHp: template.hp * (1 + level * 0.1)
        };
    }
    
    updateBattleUI() {
        const battle = this.state.battle;
        if (!battle) return;
        
        document.getElementById('enemy-name').textContent = `${battle.enemy.name} Lv.${battle.enemy.level}`;
        
        const hpPercent = (battle.enemy.hp / battle.enemy.maxHp) * 100;
        document.getElementById('enemy-hp-bar').style.width = `${hpPercent}%`;
        document.getElementById('enemy-hp-text').textContent = `${Math.floor(battle.enemy.hp)}/${Math.floor(battle.enemy.maxHp)}`;
        
        const logContainer = document.getElementById('battle-log');
        logContainer.innerHTML = battle.log.slice(-5).map(log => `<div>${log}</div>`).join('');
    }
    
    battleLoop() {
        if (!this.state.battle) return;
        
        const battle = this.state.battle;
        const playerTeam = battle.playerTeam.filter(h => h && h.hp > 0);
        
        if (playerTeam.length === 0) {
            this.endBattle(false);
            return;
        }
        
        if (battle.enemy.hp <= 0) {
            this.endBattle(true);
            return;
        }
        
        // 玩家回合
        if (battle.turn % 2 === 0) {
            const attacker = playerTeam[battle.turn % playerTeam.length];
            if (attacker && attacker.hp > 0) {
                this.battleAttack(attacker, battle.enemy);
            }
        } else {
            // 敌人回合
            const target = playerTeam.find(h => h && h.hp > 0);
            if (target) {
                this.battleAttack(battle.enemy, target);
            }
        }
        
        battle.turn++;
        this.updateBattleUI();
    }
    
    battleAttack(attacker, defender) {
        const damage = Math.max(1, attacker.attack - defender.defense * 0.5);
        defender.hp -= damage;
        
        const log = `${attacker.name} 攻击 ${defender.name}，造成 ${Math.floor(damage)} 点伤害`;
        this.state.battle.log.push(log);
    }
    
    endBattle(victory) {
        const battle = this.state.battle;
        
        if (victory) {
            const goldReward = Math.floor(50 + battle.enemy.level * 10);
            const expReward = Math.floor(30 + battle.enemy.level * 5);
            
            this.player.gold += goldReward;
            this.player.exp += expReward;
            this.player.stats.battleWin++;
            
            this.showNotification(`🎉 胜利！获得 💰${goldReward} 📖${expReward}EXP`);
            
            // 升级检测
            this.checkLevelUp();
        } else {
            this.player.stats.battleLose++;
            this.showNotification('战斗失败...', 'error');
        }
        
        document.getElementById('battle-ui').style.display = 'none';
        this.state.battle = null;
        this.updateResourceDisplay();
    }
    
    checkLevelUp() {
        const expNeeded = this.player.level * 100;
        if (this.player.exp >= expNeeded) {
            this.player.level++;
            this.player.exp = 0;
            this.player.gold += 200;
            this.showNotification(`🎉 升级了！当前等级：${this.player.level}`, 'success', 3000);
        }
    }
    
    checkAchievements() {
        ACHIEVEMENTS.forEach(achievement => {
            if (!this.player.achievements.includes(achievement.id) && achievement.condition(this.player)) {
                this.player.achievements.push(achievement.id);
                
                // 发放奖励
                if (achievement.reward.gold) {
                    this.player.gold += achievement.reward.gold;
                }
                if (achievement.reward.gem) {
                    this.player.gem += achievement.reward.gem;
                }
                
                this.showNotification(`🏆 成就达成：${achievement.name}\n奖励：💰${achievement.reward.gold || 0} 💎${achievement.reward.gem || 0}`, 'success', 4000);
                this.updateResourceDisplay();
            }
        });
    }
    
    showGuideIfNew() {
        const saved = localStorage.getItem('sanguo_idle_save');
        const isNew = !saved || this.player.heroes.length === 0;
        
        if (isNew) {
            console.log('新玩家，启动新手引导');
            this.showGuide();
        } else {
            console.log('老玩家，跳过新手引导');
        }
    }
    
    resetGame() {
        if (confirm('确定要重置游戏吗？所有进度将丢失！')) {
            localStorage.removeItem('sanguo_idle_save');
            location.reload();
        }
    }
    
    async showGuide() {
        const steps = [
            { text: '欢迎来到《三国英雄传》！这是一款轻松放置的 RPG 游戏~', duration: 3000 },
            { text: '点击"招募武将"可以获得新的三国名将', duration: 3000 },
            { text: '首次招募必得 SR 武将！快来试试吧！', duration: 3000, action: () => this.showSummon() },
            { text: '武将可以用来组建你的最强阵容', duration: 2000 },
            { text: '点击"快速战斗"可以挑战敌人，获得金币和经验', duration: 3000 },
            { text: '即使离线也会获得收益哦！', duration: 2000 },
            { text: '祝你游戏愉快！', duration: 2000 }
        ];
        
        for (const step of steps) {
            if (step.action) step.action();
            this.showNotification(step.text, 'info', step.duration);
            await new Promise(resolve => setTimeout(resolve, step.duration + 500));
        }
        
        // 首次登录奖励
        this.player.gem += 200;
        this.showNotification('🎁 新手礼包：获得 200 元宝！', 'success', 3000);
        this.updateResourceDisplay();
    }
    
    showHeroList() {
        if (this.player.heroes.length === 0) {
            this.showNotification('还没有武将，快去招募吧！', 'error');
            return;
        }
        
        const heroList = this.player.heroes.map(h => {
            const base = HERO_DATABASE.find(hero => hero.id === h.id);
            return { ...base, ...h };
        }).sort((a, b) => this.calculatePower(b) - this.calculatePower(a));
        
        let msg = '【武将列表】\n\n';
        heroList.forEach((hero, i) => {
            msg += `${i + 1}. ${hero.name} [${RARITY[hero.rarity].name}] Lv.${hero.level} ⭐${hero.star}\n`;
            msg += `   战力：${this.calculatePower(hero)}\n\n`;
        });
        
        this.showNotification(msg, 'info', 10000);
    }
    
    shareResult() {
        const topHeroes = this.player.team.slice(0, 3).map(id => {
            const hero = this.getHeroById(id);
            return hero ? `${hero.name}(${RARITY[hero.rarity].name})` : '';
        }).filter(Boolean);
        
        const shareText = `我在《三国英雄传》中等级达到${this.player.level}级，最强阵容：${topHeroes.join(' + ')}，总战力${this.calculateTotalPower()}！快来一起游戏吧！`;
        
        // 复制到剪贴板
        if (navigator.clipboard) {
            navigator.clipboard.writeText(shareText).then(() => {
                this.showNotification('📋 战绩已复制到剪贴板，快去分享吧！', 'success', 3000);
            });
        } else {
            this.showNotification(shareText, 'info', 5000);
        }
        
        // 分享奖励
        this.player.gold += 50;
        this.updateResourceDisplay();
    }
    
    calculateTotalPower() {
        return this.player.team.map(id => this.getHeroById(id)).filter(Boolean).reduce((sum, hero) => {
            return sum + this.calculatePower(hero);
        }, 0);
    }
    
    showShop() {
        this.showNotification('🏪 商店功能开发中...\n\n敬请期待！', 'info', 3000);
    }
    
    renderChapterList() {
        const chapters = [
            { id: 1, name: '第一章 黄巾之乱', levels: 10, unlocked: true },
            { id: 2, name: '第二章 讨董联盟', levels: 15, unlocked: this.player.level >= 10 },
            { id: 3, name: '第三章 群雄逐鹿', levels: 20, unlocked: this.player.level >= 20 }
        ];
        
        const container = document.getElementById('chapter-list');
        container.innerHTML = chapters.map(chapter => `
            <div class="chapter ${chapter.unlocked ? '' : 'locked'}" onclick="${chapter.unlocked ? `game.startChapter(${chapter.id})` : ''}">
                <h3>${chapter.name}</h3>
                <p>关卡数：${chapter.levels}</p>
                ${chapter.unlocked ? '<span class="start-btn">开始征战</span>' : `<span class="lock-req">需要等级：${(chapter.id - 1) * 10 + 10}</span>`}
            </div>
        `).join('');
    }
    
    renderAchievements() {
        const container = document.getElementById('achievements-list');
        if (!container) return;
        
        container.innerHTML = ACHIEVEMENTS.map(achievement => {
            const completed = this.player.achievements.includes(achievement.id);
            return `
                <div class="achievement-item ${completed ? 'completed' : ''}">
                    <div class="achievement-info">
                        <h3>${completed ? '✅' : '🔒'} ${achievement.name}</h3>
                        <p>${achievement.desc}</p>
                        <div class="achievement-reward">
                            奖励：💰${achievement.reward.gold || 0} 💎${achievement.reward.gem || 0}
                        </div>
                    </div>
                    <div class="achievement-status">
                        ${completed ? '<span class="completed-badge">已完成</span>' : '<span class="pending-badge">未完成</span>'}
                    </div>
                </div>
            `;
        }).join('');
    }
    
    startChapter(chapterId) {
        this.showNotification('章节功能开发中...', 'info', 2000);
    }
    
    autoSave() {
        this.player.lastSaveTime = Date.now();
        localStorage.setItem('sanguo_idle_save', JSON.stringify(this.player));
        console.log('游戏已自动保存');
    }
    
    loadGame() {
        const saved = localStorage.getItem('sanguo_idle_save');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                // 合并保存的数据，保留必要字段
                Object.assign(this.player, data);
                console.log('游戏已加载');
            } catch (e) {
                console.error('加载存档失败:', e);
            }
        }
    }
    
    showNotification(message, type = 'info', duration = 2000) {
        let notification = document.getElementById('notification');
        if (!notification) {
            notification = document.createElement('div');
            notification.id = 'notification';
            notification.className = 'notification';
            document.body.appendChild(notification);
        }
        
        notification.textContent = message;
        notification.className = `notification ${type}`;
        notification.style.display = 'block';
        
        setTimeout(() => {
            notification.style.display = 'none';
        }, duration);
    }
    
    gameLoop() {
        // 渲染逻辑
        if (this.state.battle) {
            this.battleLoop();
        }
        
        requestAnimationFrame(() => this.gameLoop());
    }
}

// 全局游戏实例
let game;

window.onload = () => {
    console.log('游戏开始加载...');
    try {
        game = new Game();
        console.log('游戏初始化成功！');
    } catch (e) {
        console.error('游戏初始化失败:', e);
    }
};
