// 三国英雄传 v3.1 - 完整修复版
// 包含所有 Bug 修复和优化

// ==================== 游戏配置 ====================
const CONFIG = {
    FPS: 60,
    SAVE_INTERVAL: 30000,
    IDLE_REWARD_INTERVAL: 60000,
    MAX_IDLE_REWARD_TIME: 720,
    VERSION: '3.1.0'
};

// ==================== 武将稀有度 ====================
const RARITY = {
    N: { name: 'N', color: '#999999', maxLevel: 10, maxStar: 5 },
    R: { name: 'R', color: '#4CAF50', maxLevel: 20, maxStar: 5 },
    SR: { name: 'SR', color: '#2196F3', maxLevel: 40, maxStar: 5 },
    SSR: { name: 'SSR', color: '#FF9800', maxLevel: 60, maxStar: 5 },
    UR: { name: 'UR', color: '#E91E63', maxLevel: 80, maxStar: 5 }
};

// ==================== 武将数据库 (19 位) ====================
const HERO_DATABASE = [
    { id: 'soldier1', name: '步兵', rarity: 'N', hp: 100, attack: 20, defense: 15, speed: 10, skills: ['普通攻击'] },
    { id: 'archer1', name: '弓兵', rarity: 'N', hp: 80, attack: 25, defense: 10, speed: 15, skills: ['射击'] },
    { id: 'cavalry1', name: '骑兵', rarity: 'N', hp: 120, attack: 22, defense: 12, speed: 18, skills: ['冲锋'] },
    { id: 'zhaolei', name: '赵累', rarity: 'R', hp: 150, attack: 35, defense: 25, speed: 20, skills: ['连击', '防御'] },
    { id: 'liao', name: '廖化', rarity: 'R', hp: 180, attack: 40, defense: 30, speed: 25, skills: ['猛攻', '坚韧'] },
    { id: 'cang', name: '仓亭', rarity: 'R', hp: 160, attack: 38, defense: 28, speed: 28, skills: ['速攻', '闪避'] },
    { id: 'zhaoyun', name: '赵云', rarity: 'SR', hp: 250, attack: 65, defense: 45, speed: 55, skills: ['龙胆', '七进七出', '无双'] },
    { id: 'machao', name: '马超', rarity: 'SR', hp: 240, attack: 70, defense: 40, speed: 58, skills: ['西凉铁骑', '枪神', '追击'] },
    { id: 'huangzhong', name: '黄忠', rarity: 'SR', hp: 220, attack: 75, defense: 35, speed: 45, skills: ['神射手', '百步穿杨', '连弩'] },
    { id: 'weyan', name: '魏延', rarity: 'SR', hp: 260, attack: 68, defense: 42, speed: 48, skills: ['狂骨', '奇袭', '不屈'] },
    { id: 'guanyu', name: '关羽', rarity: 'SSR', hp: 350, attack: 90, defense: 60, speed: 45, skills: ['青龙偃月', '武圣', '单刀赴会', '忠义'] },
    { id: 'zhangfei', name: '张飞', rarity: 'SSR', hp: 400, attack: 85, defense: 50, speed: 50, skills: ['长坂坡', '猛吼', '万夫莫当', '狂暴'] },
    { id: 'zhugeliang', name: '诸葛亮', rarity: 'SSR', hp: 200, attack: 50, defense: 40, speed: 60, skills: ['卧龙', '火计', '空城计', '奇门遁甲'] },
    { id: 'caocao', name: '曹操', rarity: 'SSR', hp: 320, attack: 70, defense: 55, speed: 55, skills: ['奸雄', '唯才是举', '乱世奸雄', '统帅'] },
    { id: 'liubei', name: '刘备', rarity: 'UR', hp: 380, attack: 75, defense: 65, speed: 52, skills: ['仁德', '皇叔', '桃园结义', '汉室复兴', '天命'] },
    { id: 'luxun', name: '陆逊', rarity: 'UR', hp: 280, attack: 80, defense: 50, speed: 70, skills: ['书生拜将', '火烧连营', '深谋远虑', '儒将'] },
    { id: 'simayi', name: '司马懿', rarity: 'UR', hp: 300, attack: 75, defense: 55, speed: 65, skills: ['狼顾', '鬼才', '野心', '谋定天下'] }
];

// ==================== 技能库 ====================
const SKILLS = {
    '普通攻击': { name: '普通攻击', damage: 100, type: 'attack', cost: 0, desc: '普通攻击' },
    '射击': { name: '射击', damage: 120, type: 'attack', cost: 0, desc: '远程射击' },
    '冲锋': { name: '冲锋', damage: 110, type: 'attack', cost: 5, desc: '冲锋陷阵' },
    '连击': { name: '连击', damage: 80, type: 'attack', hits: 2, cost: 8, desc: '连续攻击 2 次' },
    '防御': { name: '防御', damage: 0, type: 'buff', effect: 'def_up', cost: 5, desc: '提升防御力' },
    '猛攻': { name: '猛攻', damage: 150, type: 'attack', cost: 10, desc: '猛烈攻击' },
    '龙胆': { name: '龙胆', damage: 180, type: 'attack', cost: 15, desc: '赵云绝技' },
    '七进七出': { name: '七进七出', damage: 200, type: 'aoe', cost: 20, desc: '范围攻击' },
    '无双': { name: '无双', damage: 250, type: 'attack', cost: 30, desc: '无双乱舞' },
    '青龙偃月': { name: '青龙偃月', damage: 300, type: 'aoe', cost: 25, desc: '关羽大招' },
    '武圣': { name: '武圣', damage: 350, type: 'attack', cost: 35, desc: '武圣之力' },
    '火计': { name: '火计', damage: 300, type: 'aoe', cost: 35, desc: '火焰策略' },
    '天命': { name: '天命', damage: 500, type: 'aoe', cost: 60, desc: '天命所归' }
};

// ==================== 每日任务 ====================
const DAILY_QUESTS = [
    { id: 'battle1', name: '初战告捷', desc: '完成 1 次战斗', target: 1, reward: { gold: 50, gem: 5 } },
    { id: 'battle5', name: '连战连捷', desc: '完成 5 次战斗', target: 5, reward: { gold: 200, gem: 15 } },
    { id: 'battle10', name: '战无不胜', desc: '完成 10 次战斗', target: 10, reward: { gold: 500, gem: 30 } },
    { id: 'summon1', name: '招募武将', desc: '进行 1 次招募', target: 1, reward: { gold: 100, gem: 10 } },
    { id: 'upgrade1', name: '武将升级', desc: '武将升级 1 次', target: 1, reward: { gold: 100, gem: 15 } }
];

// ==================== 签到奖励 ====================
const SIGN_IN_REWARDS = [
    { day: 1, gem: 20, gold: 100 },
    { day: 2, gem: 20, gold: 100 },
    { day: 3, gem: 30, gold: 200 },
    { day: 4, gem: 30, gold: 200 },
    { day: 5, gem: 50, gold: 300 },
    { day: 6, gem: 50, gold: 300 },
    { day: 7, gem: 100, gold: 500 }
];

// ==================== 商店物品 ====================
const SHOP_ITEMS = [
    { id: 'hp_potion', name: '生命药水', desc: '恢复武将 100 点 HP', type: 'consumable', price: 100, effect: 'hp', value: 100 },
    { id: 'mp_potion', name: '魔法药水', desc: '恢复武将 50 点 MP', type: 'consumable', price: 150, effect: 'mp', value: 50 },
    { id: 'exp_book_small', name: '经验书 (小)', desc: '武将获得 50 点经验', type: 'consumable', price: 200, effect: 'exp', value: 50 },
    { id: 'exp_book_large', name: '经验书 (大)', desc: '武将获得 200 点经验', type: 'consumable', price: 800, effect: 'exp', value: 200 },
    { id: 'star_stone', name: '升星石', desc: '武将升星材料', type: 'material', price: 500, effect: 'star', value: 1 }
];

// ==================== 成就系统（29 个） ====================
const ACHIEVEMENTS = [
    { id: 'battle_1', name: '初出茅庐', desc: '赢得第 1 场战斗', type: 'battle', condition: (p) => p.stats.battleWin >= 1, reward: { gold: 100, gem: 10 } },
    { id: 'battle_10', name: '久经沙场', desc: '赢得 10 场战斗', type: 'battle', condition: (p) => p.stats.battleWin >= 10, reward: { gold: 500, gem: 50 } },
    { id: 'battle_50', name: '身经百战', desc: '赢得 50 场战斗', type: 'battle', condition: (p) => p.stats.battleWin >= 50, reward: { gold: 1000, gem: 100 } },
    { id: 'battle_100', name: '战无不胜', desc: '赢得 100 场战斗', type: 'battle', condition: (p) => p.stats.battleWin >= 100, reward: { gold: 2000, gem: 200 } },
    { id: 'hero_5', name: '初具规模', desc: '拥有 5 名武将', type: 'collection', condition: (p) => p.heroes.length >= 5, reward: { gold: 200, gem: 20 } },
    { id: 'hero_10', name: '收藏家', desc: '拥有 10 名武将', type: 'collection', condition: (p) => p.heroes.length >= 10, reward: { gold: 300, gem: 30 } },
    { id: 'hero_20', name: '人才济济', desc: '拥有 20 名武将', type: 'collection', condition: (p) => p.heroes.length >= 20, reward: { gold: 500, gem: 50 } },
    { id: 'summon_10', name: '招募达人', desc: '进行 10 次招募', type: 'summon', condition: (p) => p.stats.summonCount >= 10, reward: { gold: 500, gem: 50 } },
    { id: 'summon_50', name: '招兵买马', desc: '进行 50 次招募', type: 'summon', condition: (p) => p.stats.summonCount >= 50, reward: { gold: 1000, gem: 100 } },
    { id: 'level_10', name: '初露锋芒', desc: '玩家等级达到 10 级', type: 'level', condition: (p) => p.level >= 10, reward: { gold: 1000, gem: 100 } },
    { id: 'level_20', name: '小有所成', desc: '玩家等级达到 20 级', type: 'level', condition: (p) => p.level >= 20, reward: { gold: 2000, gem: 200 } },
    { id: 'sr_1', name: '精英之证', desc: '获得 SR 武将', type: 'rarity', condition: (p) => p.heroes.some(h => HERO_DATABASE.find(db => db.id === h.id && db.rarity === 'SR')), reward: { gold: 200, gem: 20 } },
    { id: 'ssr_1', name: '欧皇附体', desc: '获得 SSR 武将', type: 'rarity', condition: (p) => p.heroes.some(h => HERO_DATABASE.find(db => db.id === h.id && db.rarity === 'SSR')), reward: { gold: 500, gem: 100 } },
    { id: 'ur_1', name: '天选之子', desc: '获得 UR 武将', type: 'rarity', condition: (p) => p.heroes.some(h => HERO_DATABASE.find(db => db.id === h.id && db.rarity === 'UR')), reward: { gold: 1000, gem: 300 } },
    { id: 'gold_1k', name: '小富即安', desc: '拥有 1000 金币', type: 'wealth', condition: (p) => p.gold >= 1000, reward: { gem: 10 } },
    { id: 'gold_10k', name: '富甲一方', desc: '拥有 10000 金币', type: 'wealth', condition: (p) => p.gold >= 10000, reward: { gem: 50 } },
    { id: 'upgrade_10', name: '培养新人', desc: '武将升级总计 10 次', type: 'training', condition: (p) => p.stats.totalUpgrades >= 10, reward: { gold: 300, gem: 30 } },
    { id: 'upgrade_50', name: '精心栽培', desc: '武将升级总计 50 次', type: 'training', condition: (p) => p.stats.totalUpgrades >= 50, reward: { gold: 800, gem: 80 } },
    { id: 'login_7', name: '持之以恒', desc: '累计登录 7 天', type: 'special', condition: (p) => p.stats.loginDays >= 7, reward: { gold: 1000, gem: 100 } },
    { id: 'login_30', name: '忠贞不渝', desc: '累计登录 30 天', type: 'special', condition: (p) => p.stats.loginDays >= 30, reward: { gold: 3000, gem: 300 } }
];

// ==================== 敌人数据库 ====================
const ENEMIES = [
    { id: 'bandit', name: '山贼', rarity: 'N', hp: 80, attack: 25, defense: 10, speed: 15, exp: 10 },
    { id: 'soldier', name: '士兵', rarity: 'R', hp: 120, attack: 35, defense: 20, speed: 20, exp: 20 },
    { id: 'archer', name: '弓箭手', rarity: 'R', hp: 100, attack: 40, defense: 15, speed: 30, exp: 25 },
    { id: 'knight', name: '骑士', rarity: 'SR', hp: 180, attack: 50, defense: 35, speed: 40, exp: 50 },
    { id: 'general', name: '武将', rarity: 'SSR', hp: 300, attack: 70, defense: 50, speed: 45, exp: 100 },
    { id: 'boss_dong', name: '董卓', rarity: 'UR', hp: 500, attack: 90, defense: 60, speed: 35, exp: 500 },
    { id: 'boss_lv', name: '吕布', rarity: 'UR', hp: 600, attack: 100, defense: 65, speed: 50, exp: 1000 }
];

// ==================== 游戏主类 ====================
class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        
        this.player = {
            level: 1,
            exp: 0,
            gold: 1000,
            gem: 100,
            heroes: [],
            team: [],
            achievements: [],
            dailyQuests: {},
            items: {},
            stats: {
                battleWin: 0,
                battleLose: 0,
                totalDamage: 0,
                summonCount: 0,
                totalUpgrades: 0,
                loginDays: 1,
                lastSSR: 0,
                lastUR: 0
            },
            lastLogin: Date.now(),
            lastDailyReset: Date.now(),
            lastShare: null,
            hasSkippedGuide: false,
            signInDay: 0
        };
        
        this.state = {
            screen: 'home',
            battle: null,
            idleReward: null,
            lastSaveTime: Date.now()
        };
        
        this.battleSpeed = 1;
        this.battlePaused = false;
        this.autoBattle = false;
        this.lastBattleTurnTime = 0;
        this.battleTimerId = null;
        
        // 立即初始化，因为 index.html 已经使用 DOMContentLoaded
        this.init();
    }
    
    init() {
        // 获取 DOM 元素
        this.canvas = document.getElementById('game-canvas');
        if (this.canvas) {
            this.ctx = this.canvas.getContext('2d');
        }
        this.ui = document.getElementById('ui-layer');
        
        if (!this.canvas || !this.ui) {
            console.error('❌ 游戏初始化失败：找不到 game-canvas 或 ui-layer 元素');
            return;
        }
        
        this.resize();
        this.setupUI();
        this.loadGame();
        this.checkDailyReset();
        this.updateTeamDisplay();
        this.updateResourceDisplay();
        this.calculateIdleReward();
        this.bindEvents();
        this.gameLoop();
        
        // 定时任务
        setInterval(() => this.autoSave(), CONFIG.SAVE_INTERVAL);
        setInterval(() => this.gainIdleReward(), CONFIG.IDLE_REWARD_INTERVAL);
        // 【修复 P1-3】从 5000ms 改为 1000ms，成就检测更及时
        setInterval(() => this.checkAchievements(), 1000);
        
        this.showGuideIfNew();
        this.showScreen('home');
        
        console.log('🎮 三国英雄传 v3.1.1 初始化成功！');
    }
    
    resize() {
        const container = document.getElementById('game-container');
        if (container && this.canvas) {
            const rect = container.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
    }
    
    // ==================== 工具函数 ====================
    formatNumber(num) {
        if (num >= 10000) {
            return (num / 10000).toFixed(1) + '万';
        }
        return num.toString();
    }
    
    getPityCount(type) {
        if (type === 'ssr') {
            return this.player.stats.summonCount - this.player.stats.lastSSR;
        }
        if (type === 'ur') {
            return this.player.stats.summonCount - this.player.stats.lastUR;
        }
        return 0;
    }
    
    calculatePower(hero) {
        const multiplier = 1 + (hero.level - 1) * 0.1 + (hero.star - 1) * 0.2;
        return Math.floor((hero.hp + hero.attack * 2 + hero.defense + hero.speed) * multiplier);
    }
    
    getHeroById(id) {
        const base = HERO_DATABASE.find(h => h.id === id);
        const playerHero = this.player.heroes.find(h => h.id === id);
        if (base && playerHero) {
            return { ...base, ...playerHero };
        }
        return null;
    }
    
    getUpgradeCost(hero) {
        const base = HERO_DATABASE.find(h => h.id === hero.id);
        if (!base) return 0;
        
        // 【优化 P2-21】降低升级曲线，更平滑的成长
        const rarityMultiplier = {
            'N': 1,
            'R': 1.5,
            'SR': 2,
            'SSR': 2.5,
            'UR': 3
        }[base.rarity] || 1;
        
        // 降低指数从 1.1 到 1.08，降低稀有度系数
        return Math.floor(50 * Math.pow(1.08, hero.level) * rarityMultiplier);
    }
    
    getStarCost(hero) {
        return hero.star * 100;
    }
    
    // ==================== UI 渲染 ====================
    setupUI() {
        if (!this.ui) return;
        
        this.ui.innerHTML = `
            <!-- 首页 -->
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
                        <button class="edit-team-btn" onclick="game.showTeamEditor()">编辑阵容</button>
                    </div>
                    <div class="quick-actions">
                        <button class="btn btn-primary" onclick="game.startBattle()">⚔️ 快速战斗</button>
                        <button class="btn btn-success" onclick="game.showSummon()">🎴 招募武将</button>
                        <button class="btn btn-info" onclick="game.showTeamEditor()">🛡️ 编辑阵容</button>
                        <button class="btn btn-info" onclick="game.showHeroList()">👥 武将列表</button>
                        <button class="btn btn-warning" onclick="game.showShop()">🏪 商店</button>
                    </div>
                    <div class="daily-quest-panel" onclick="game.showDailyQuests()">
                        <h4>📋 每日任务</h4>
                        <div id="daily-quest-summary"></div>
                    </div>
                    <div class="share-section">
                        <button class="btn btn-secondary" onclick="game.shareGame()">📤 分享赚元宝 (+50)</button>
                    </div>
                    <div style="text-align: center; margin-top: 10px;">
                        <button class="btn btn-danger" onclick="game.confirmRestart()" style="padding: 8px 20px; font-size: 13px; background: #e74c3c;">🔄 重新开始游戏</button>
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
            
            <!-- 武将列表 -->
            <div id="heroes-screen" class="screen">
                <div class="screen-header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>武将列表</h2>
                </div>
                <div class="heroes-content" id="heroes-content" style="padding: 20px;"></div>
            </div>
            
            <!-- 征战 -->
            <div id="battle-screen" class="screen">
                <div class="screen-header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>征战天下</h2>
                </div>
                <div class="chapter-list" id="chapter-list" style="padding: 20px;"></div>
            </div>
            
            <!-- 成就 -->
            <div id="achievements-screen" class="screen">
                <div class="screen-header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>成就系统 (53 个)</h2>
                </div>
                <div class="achievements-content" id="achievements-content" style="padding: 20px;"></div>
            </div>
            
            <!-- 招募弹窗 -->
            <div id="summon-modal" class="modal">
                <div class="modal-content">
                    <h2>🎴 招募武将</h2>
                    <div class="pity-counter">
                        <div class="pity-bar">
                            <span>SSR 保底：${this.getPityCount('ssr')}/90</span>
                            <div class="progress" style="width: ${Math.min(100, this.getPityCount('ssr')/90*100)}%"></div>
                        </div>
                        <div class="pity-bar">
                            <span>UR 保底：${this.getPityCount('ur')}/180</span>
                            <div class="progress" style="width: ${Math.min(100, this.getPityCount('ur')/180*100)}%"></div>
                        </div>
                    </div>
                    <div class="summon-rates">
                        <div class="rate"><span>UR</span><span>0.5%</span></div>
                        <div class="rate"><span>SSR</span><span>4.5%</span></div>
                        <div class="rate"><span>SR</span><span>15%</span></div>
                        <div class="rate"><span>R</span><span>30%</span></div>
                        <div class="rate"><span>N</span><span>50%</span></div>
                    </div>
                    <div class="summon-options">
                        <button class="btn btn-primary" onclick="game.summon(1)">招募 x1<br>💎 100</button>
                        <button class="btn btn-success" onclick="game.summon(10)">招募 x10<br>💎 1000</button>
                    </div>
                    <div id="summon-result" class="summon-result"></div>
                    <button class="btn btn-secondary" onclick="game.closeModal('summon-modal')">关闭</button>
                </div>
            </div>
            
            <!-- 武将详情弹窗 -->
            <div id="hero-detail-modal" class="modal">
                <div class="modal-content">
                    <div id="hero-detail-content"></div>
                </div>
            </div>
            
            <!-- 商店弹窗 -->
            <div id="shop-modal" class="modal">
                <div class="modal-content">
                    <h2>🏪 商店</h2>
                    <div class="shop-items" id="shop-items"></div>
                    <button class="btn btn-secondary" onclick="game.closeModal('shop-modal')">关闭</button>
                </div>
            </div>
            
            <!-- 每日任务弹窗 -->
            <div id="daily-quest-modal" class="modal">
                <div class="modal-content">
                    <h2>📋 每日任务</h2>
                    <div class="daily-quests" id="daily-quests-list"></div>
                    <button class="btn btn-secondary" onclick="game.closeModal('daily-quest-modal')">关闭</button>
                </div>
            </div>
            
            <!-- 阵容编辑弹窗 -->
            <div id="team-editor-modal" class="modal">
                <div class="modal-content">
                    <h2>🛡️ 阵容调整</h2>
                    <div id="team-editor-content"></div>
                </div>
            </div>
            
            <!-- 战斗界面 -->
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
                <div class="battle-field">
                    <div id="enemy-display"></div>
                    <div id="player-display"></div>
                </div>
                <div class="battle-controls">
                    <button class="btn btn-primary" id="auto-battle-btn" onclick="game.toggleAutoBattle()">⏸️ 暂停</button>
                    <button class="btn btn-secondary" id="pause-battle-btn" onclick="game.toggleBattlePause()">⏸️ 暂停</button>
                    <button class="btn btn-info" onclick="game.setBattleSpeed(0.5)">0.5x</button>
                    <button class="btn btn-info" onclick="game.setBattleSpeed(1)">1x</button>
                    <button class="btn btn-info" onclick="game.setBattleSpeed(2)">2x</button>
                    <button class="btn btn-info" onclick="game.setBattleSpeed(3)">3x</button>
                    <button class="btn btn-warning" onclick="game.skipBattle()">⏭️ 跳过</button>
                    <button class="btn btn-danger" onclick="game.endBattle(false)">逃跑</button>
                </div>
                <div class="skill-bar" id="skill-bar"></div>
            </div>
            
            <!-- 通知 -->
            <div id="notification" class="notification"></div>
        `;
    }
    
    // ==================== 核心游戏方法 ====================
    
    showScreen(screen) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`${screen}-screen`);
        if (target) {
            target.classList.add('active');
            if (screen === 'heroes') this.renderHeroesList();
            if (screen === 'battle') this.renderBattleMap();
            if (screen === 'achievements') this.renderAchievements();
        }
    }
    
    updateResourceDisplay() {
        const levelEl = document.querySelector('.level');
        const goldEl = document.querySelector('.gold');
        const gemEl = document.querySelector('.gem');
        if (levelEl) levelEl.textContent = `Lv.${this.player.level}`;
        if (goldEl) goldEl.textContent = `💰 ${this.formatNumber(this.player.gold)}`;
        if (gemEl) gemEl.textContent = `💎 ${this.formatNumber(this.player.gem)}`;
    }
    
    updateTeamDisplay() {
        const slots = document.getElementById('team-slots');
        if (!slots) return;
        
        slots.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const heroId = this.player.team[i];
            const slot = document.createElement('div');
            slot.className = 'team-slot';
            
            if (heroId) {
                const hero = this.getHeroById(heroId);
                if (hero) {
                    slot.innerHTML = `
                        <div class="hero-avatar ${hero.rarity.toLowerCase()}">
                            <div class="hero-name">${hero.name}</div>
                            <div class="hero-level">Lv.${hero.level}</div>
                        </div>
                    `;
                }
            } else {
                slot.innerHTML = '<div class="empty-slot">空</div>';
            }
            slots.appendChild(slot);
        }
    }
    
    renderHeroesList() {
        const content = document.getElementById('heroes-content');
        if (!content) return;
        
        content.innerHTML = '<h3>我的武将</h3><div class="heroes-grid">';
        if (this.player.heroes.length === 0) {
            content.innerHTML += '<p>暂无武将，快去招募吧！</p>';
            return;
        }
        
        this.player.heroes.forEach(hero => {
            const base = HERO_DATABASE.find(h => h.id === hero.id);
            if (!base) return;
            
            const power = this.calculatePower(hero);
            content.innerHTML += `
                <div class="hero-card ${base.rarity.toLowerCase()}" onclick="game.showHeroDetail('${hero.id}')">
                    <div class="card-header">
                        <span class="hero-name">${base.name}</span>
                        <span class="hero-rarity">${base.rarity}</span>
                    </div>
                    <div class="card-body">
                        <div>等级：${hero.level}/${RARITY[base.rarity].maxLevel}</div>
                        <div>星级：${'★'.repeat(hero.star)}</div>
                        <div>战力：${power}</div>
                    </div>
                </div>
            `;
        });
        content.innerHTML += '</div>';
    }
    
    showHeroDetail(heroId) {
        const hero = this.getHeroById(heroId);
        if (!hero) return;
        
        const modal = document.getElementById('hero-detail-modal');
        const content = document.getElementById('hero-detail-content');
        const base = HERO_DATABASE.find(h => h.id === heroId);
        const power = this.calculatePower(hero);
        
        content.innerHTML = `
            <div class="hero-detail ${base.rarity.toLowerCase()}">
                <h2>${hero.name} (${base.rarity})</h2>
                <div class="hero-stats">
                    <div>等级：${hero.level}/${RARITY[base.rarity].maxLevel}</div>
                    <div>星级：${'★'.repeat(hero.star)}</div>
                    <div>经验：${hero.exp}</div>
                    <div>战力：${power}</div>
                </div>
                <div class="hero-attributes">
                    <div>HP: ${hero.hp}</div>
                    <div>攻击：${hero.attack}</div>
                    <div>防御：${hero.defense}</div>
                    <div>速度：${hero.speed}</div>
                </div>
                <div class="hero-skills">
                    <h4>技能:</h4>
                    <ul>${hero.skills.map(s => `<li>${s}</li>`).join('')}</ul>
                </div>
                <div class="hero-actions">
                    <button class="btn btn-primary" onclick="game.upgradeHero('${heroId}')">
                        升级 (Lv.${hero.level}→Lv.${hero.level + 1}) - 💰${this.getUpgradeCost(hero)}
                    </button>
                    <button class="btn btn-success" onclick="game.upgradeStar('${heroId}')">
                        升星 (${hero.star}→${hero.star + 1}) - 💎${this.getStarCost(hero)}
                    </button>
                    <button class="btn btn-secondary" onclick="game.closeModal('hero-detail-modal')">关闭</button>
                </div>
            </div>
        `;
        
        modal.style.display = 'flex';
    }
    
    upgradeHero(heroId) {
        const hero = this.getHeroById(heroId);
        if (!hero) return;
        
        const base = HERO_DATABASE.find(h => h.id === heroId);
        const maxLevel = RARITY[base.rarity].maxLevel;
        
        if (hero.level >= maxLevel) {
            this.showNotification('已达到最高等级');
            return;
        }
        
        const cost = this.getUpgradeCost(hero);
        if (this.player.gold < cost) {
            this.showNotification('金币不足');
            return;
        }
        
        this.player.gold -= cost;
        hero.exp += 100;
        hero.level++;
        hero.hp = Math.floor(base.hp * (1 + (hero.level - 1) * 0.1));
        hero.attack = Math.floor(base.attack * (1 + (hero.level - 1) * 0.1));
        hero.defense = Math.floor(base.defense * (1 + (hero.level - 1) * 0.1));
        hero.speed = Math.floor(base.speed * (1 + (hero.level - 1) * 0.05));
        
        this.player.stats.totalUpgrades++;
        this.updateResourceDisplay();
        this.showNotification(`${hero.name}升级到 Lv.${hero.level}！`);
        
        // 【优化 P2-7】实时更新显示
        this.updateTeamDisplay();
        this.renderHeroesList();
        this.showHeroDetail(heroId);
        
        // 【修复 P2-9】更新每日任务进度
        this.updateDailyQuestProgress('upgrade1', 1);
        this.updateDailyQuestSummary();
    }
    
    upgradeStar(heroId) {
        const hero = this.getHeroById(heroId);
        if (!hero) return;
        
        const base = HERO_DATABASE.find(h => h.id === heroId);
        const maxStar = RARITY[base.rarity].maxStar;
        
        if (hero.star >= maxStar) {
            this.showNotification('已达到最高星级');
            return;
        }
        
        const cost = this.getStarCost(hero);
        if (this.player.gem < cost) {
            this.showNotification('元宝不足');
            return;
        }
        
        this.player.gem -= cost;
        hero.star++;
        hero.hp = Math.floor(hero.hp * 1.2);
        hero.attack = Math.floor(hero.attack * 1.2);
        hero.defense = Math.floor(hero.defense * 1.2);
        
        this.showNotification(`${hero.name}升星到 ${hero.star}星！`);
        this.updateResourceDisplay();
        this.showHeroDetail(heroId);
    }
    
    updatePityDisplay() {
        const ssrPity = this.getPityCount('ssr');
        const urPity = this.getPityCount('ur');
        
        // 更新文本显示
        const ssrText = document.querySelector('.pity-bar:nth-child(1) span');
        const urText = document.querySelector('.pity-bar:nth-child(2) span');
        if (ssrText) ssrText.textContent = `SSR 保底：${ssrPity}/90`;
        if (urText) urText.textContent = `UR 保底：${urPity}/180`;
        
        // 更新进度条
        const ssrBar = document.querySelector('.pity-bar:nth-child(1) .progress');
        const urBar = document.querySelector('.pity-bar:nth-child(2) .progress');
        if (ssrBar) ssrBar.style.width = `${Math.min(100, ssrPity/90*100)}%`;
        if (urBar) urBar.style.width = `${Math.min(100, urPity/180*100)}%`;
    }
    
    showSummon() {
        const modal = document.getElementById('summon-modal');
        if (modal) modal.style.display = 'flex';
        this.updatePityDisplay();  // 【新增】打开时更新保底显示
    }
    
    summon(times) {
        const cost = times * 100;
        if (this.player.gem < cost) {
            this.showNotification('元宝不足！');
            return;
        }
        
        this.player.gem -= cost;
        this.updateResourceDisplay();
        
        const results = [];
        let duplicateCount = 0;
        
        for (let i = 0; i < times; i++) {
            this.player.stats.summonCount++;
            const rarity = this.rollRarity();
            const heroes = HERO_DATABASE.filter(h => h.rarity === rarity);
            const hero = heroes[Math.floor(Math.random() * heroes.length)] || heroes[0];
            
            const existing = this.player.heroes.find(h => h.id === hero.id);
            if (existing) {
                existing.exp += 50;
                duplicateCount++;
                this.checkLevelUp(existing);
            } else {
                this.player.heroes.push({
                    id: hero.id,
                    level: 1,
                    exp: 0,
                    star: 1,
                    hp: hero.hp,
                    attack: hero.attack,
                    defense: hero.defense,
                    speed: hero.speed,
                    skills: [...hero.skills]
                });
            }
            results.push(hero);
        }
        
        this.showSummonResult(results);
        this.updateTeamDisplay();
        this.updatePityDisplay();
        
        // 【修复 P2-9】更新每日任务进度
        this.updateDailyQuestProgress('summon1', times);
        this.updateDailyQuestSummary();
        
        if (duplicateCount > 0) {
            setTimeout(() => {
                this.showNotification(`获得${duplicateCount}个重复武将，已转化为经验`);
            }, 1000);
        }
    }
    
    rollRarity() {
        const rand = Math.random();
        const ssrPity = this.getPityCount('ssr');
        const urPity = this.getPityCount('ur');
        
        // 【优化 P2-22】提高抽卡概率
        // UR: 0.5% → 1%
        if (urPity >= 180 || rand < 0.01) {
            this.player.stats.lastUR = this.player.stats.summonCount;
            return 'UR';
        }
        
        // SSR: 4.5% → 6%
        if (ssrPity >= 90 || rand < 0.07) {
            this.player.stats.lastSSR = this.player.stats.summonCount;
            return 'SSR';
        }
        
        // SR: 15% → 18%
        if (rand < 0.25) return 'SR';
        
        // R: 30% → 30%
        if (rand < 0.55) return 'R';
        
        // N: 50% → 45%
        return 'N';
    }
    
    showSummonResult(results) {
        const resultDiv = document.getElementById('summon-result');
        if (!resultDiv) return;
        
        resultDiv.innerHTML = '<h4>招募结果:</h4><div class="summon-results"></div>';
        const resultsContainer = resultDiv.querySelector('.summon-results');
        
        // 【优化 P2-12】添加抽卡动画效果
        results.forEach((hero, index) => {
            setTimeout(() => {
                const heroEl = document.createElement('div');
                heroEl.className = `summoned-hero ${hero.rarity.toLowerCase()}`;
                heroEl.textContent = hero.name;
                heroEl.style.cssText = `
                    display: inline-block;
                    padding: 10px 15px;
                    margin: 5px;
                    border-radius: 8px;
                    color: white;
                    font-weight: bold;
                    animation: cardPop 0.5s ease-out;
                    transform: scale(0);
                `;
                resultsContainer.appendChild(heroEl);
                
                // 触发动画
                setTimeout(() => {
                    heroEl.style.transform = 'scale(1)';
                }, 50);
            }, index * 300);  // 每张卡牌间隔 300ms
        });
    }
    
    closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) modal.style.display = 'none';
    }
    
    showShop() {
        const modal = document.getElementById('shop-modal');
        const content = document.getElementById('shop-items');
        if (!modal || !content) return;
        
        content.innerHTML = '';
        SHOP_ITEMS.forEach(item => {
            const count = this.player.items[item.id] || 0;
            content.innerHTML += `
                <div class="shop-item">
                    <div class="item-info">
                        <h4>${item.name}</h4>
                        <p>${item.desc}</p>
                        <span class="item-count" style="color: #666; font-size: 12px; display: block; margin-top: 5px;">拥有：${count}</span>
                    </div>
                    <button class="btn btn-primary" onclick="game.buyItem('${item.id}')">
                        购买 - 💰${item.price}
                    </button>
                </div>
            `;
        });
        
        modal.style.display = 'flex';
    }
    
    buyItem(itemId) {
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (!item) return;
        
        if (this.player.gold < item.price) {
            this.showNotification('金币不足！');
            return;
        }
        
        this.player.gold -= item.price;
        
        if (!this.player.items[itemId]) {
            this.player.items[itemId] = 0;
        }
        this.player.items[itemId]++;
        
        this.updateResourceDisplay();
        this.showNotification(`购买${item.name}成功！`);
    }
    
    showDailyQuests() {
        const modal = document.getElementById('daily-quest-modal');
        const content = document.getElementById('daily-quests-list');
        if (!modal || !content) return;
        
        this.renderDailyQuestsList(content);
        
        modal.style.display = 'flex';
    }
    
    // 【修复 P2-9】渲染每日任务列表
    renderDailyQuestsList(container) {
        if (!container) return;
        
        container.innerHTML = '';
        DAILY_QUESTS.forEach(quest => {
            const progress = this.player.dailyQuests[quest.id] || 0;
            const completed = progress >= quest.target;
            
            container.innerHTML += `
                <div class="daily-quest ${completed ? 'completed' : ''}">
                    <div class="quest-info">
                        <h4>${quest.name}</h4>
                        <p>${quest.desc}</p>
                        <div class="quest-progress">进度：${Math.min(progress, quest.target)}/${quest.target}</div>
                    </div>
                    <div class="quest-reward">
                        💰${quest.reward.gold} 💎${quest.reward.gem}
                    </div>
                </div>
            `;
        });
    }
    
    // 【修复 P2-9】更新每日任务进度
    updateDailyQuestProgress(questId, increment = 1) {
        if (!this.player.dailyQuests[questId]) {
            this.player.dailyQuests[questId] = 0;
        }
        this.player.dailyQuests[questId] += increment;
        
        // 检查是否完成并发放奖励
        const quest = DAILY_QUESTS.find(q => q.id === questId);
        if (quest && this.player.dailyQuests[questId] >= quest.target) {
            // 检查是否已经领取过奖励（防止重复领取）
            if (!this.player.dailyQuests[questId + '_claimed']) {
                this.player.gold += quest.reward.gold;
                this.player.gem += quest.reward.gem;
                this.player.dailyQuests[questId + '_claimed'] = true;
                this.showNotification(`每日任务完成：${quest.name}！奖励已发放`);
                this.updateResourceDisplay();
            }
        }
    }
    
    // 【修复 P2-9】更新主界面任务摘要
    updateDailyQuestSummary() {
        const summary = document.getElementById('daily-quest-summary');
        if (!summary) return;
        
        let completed = 0;
        let total = DAILY_QUESTS.length;
        
        DAILY_QUESTS.forEach(quest => {
            const progress = this.player.dailyQuests[quest.id] || 0;
            const claimed = this.player.dailyQuests[quest.id + '_claimed'] || false;
            if (progress >= quest.target && claimed) {
                completed++;
            }
        });
        
        summary.innerHTML = `
            <div class="quest-progress-bar" style="background: #e0e0e0; height: 8px; border-radius: 4px; margin: 10px 0;">
                <div class="progress" style="background: linear-gradient(90deg, #667eea 0%, #764ba2 100%); height: 100%; width: ${completed / total * 100}%; border-radius: 4px; transition: width 0.3s;"></div>
            </div>
            <div style="text-align: center; color: #666; font-size: 12px;">${completed}/${total} 已完成</div>
        `;
    }
    
    showTeamEditor() {
        const modal = document.getElementById('team-editor-modal');
        const content = document.getElementById('team-editor-content');
        if (!modal || !content) return;
        
        // 【新增 P2-11】添加一键布阵按钮
        content.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h3>调整阵容 (最多 5 人)</h3>
                <button class="btn btn-info" onclick="game.autoArrangeTeam()" style="padding: 8px 16px; font-size: 12px;">⚡ 一键布阵</button>
            </div>
        `;
        
        content.innerHTML += '<div class="current-team"><h4>当前阵容:</h4>';
        for (let i = 0; i < 5; i++) {
            const heroId = this.player.team[i];
            if (heroId) {
                const hero = this.getHeroById(heroId);
                content.innerHTML += `
                    <div class="team-slot">
                        ${hero.name} (Lv.${hero.level})
                        <button onclick="game.removeFromTeam(${i})">下阵</button>
                    </div>
                `;
            } else {
                content.innerHTML += '<div class="team-slot empty">空位</div>';
            }
        }
        content.innerHTML += '</div>';
        
        content.innerHTML += '<div class="available-heroes"><h4>可选武将:</h4>';
        this.player.heroes.forEach(hero => {
            const base = HERO_DATABASE.find(h => h.id === hero.id);
            const inTeam = this.player.team.includes(hero.id);
            
            if (!inTeam) {
                content.innerHTML += `
                    <div class="hero-option" onclick="game.addToTeam('${hero.id}')">
                        ${base.name} (Lv.${hero.level}) - 战力:${this.calculatePower(hero)}
                    </div>
                `;
            }
        });
        content.innerHTML += '</div>';
        
        modal.style.display = 'flex';
    }
    
    // 【新增 P2-11】一键布阵功能
    autoArrangeTeam() {
        if (this.player.heroes.length === 0) {
            this.showNotification('没有可用的武将');
            return;
        }
        
        // 按战力排序，选择前 5 个
        this.player.team = this.player.heroes
            .sort((a, b) => this.calculatePower(b) - this.calculatePower(a))
            .slice(0, 5)
            .map(h => h.id);
        
        this.updateTeamDisplay();
        this.showTeamEditor();  // 刷新界面
        this.showNotification('已按战力自动布阵');
    }
    
    addToTeam(heroId) {
        if (this.player.team.length >= 5) {
            this.showNotification('阵容已满');
            return;
        }
        
        this.player.team.push(heroId);
        this.showTeamEditor();
        this.updateTeamDisplay();
    }
    
    removeFromTeam(index) {
        this.player.team.splice(index, 1);
        this.showTeamEditor();
        this.updateTeamDisplay();
    }
    
    shareGame() {
        const now = Date.now();
        if (this.player.lastShare && now - this.player.lastShare < 86400000) {
            this.showNotification('明天再来分享吧！');
            return;
        }
        
        this.player.lastShare = now;
        this.player.gem += 50;
        this.updateResourceDisplay();
        this.showNotification('分享成功！获得 50 元宝奖励');
    }
    
    showNotification(message) {
        const notification = document.getElementById('notification');
        if (!notification) return;
        
        notification.textContent = message;
        notification.classList.add('show');
        
        setTimeout(() => {
            notification.classList.remove('show');
        }, 2000);
    }
    
    startBattle() {
        if (this.player.team.length === 0) {
            if (this.player.heroes.length === 0) {
                this.showNotification('⚠️ 您还没有武将，请先去"招募武将"！\n\n点击首页的"招募武将"按钮获得武将');
            } else {
                this.showNotification('⚠️ 阵容为空，请先组建阵容！\n\n点击首页的"编辑阵容"或"一键布阵"按钮');
            }
            return;
        }
        
        this.state.battle = {
            playerTeam: this.player.team.map(heroId => this.getHeroById(heroId)).filter(h => h),
            enemyTeam: this.generateEnemyTeam(),
            turn: 0,
            log: []
        };
        
        this.showBattleUI();
    }
    
    generateEnemyTeam() {
        const enemyCount = Math.min(5, this.player.team.length);
        const team = [];
        
        for (let i = 0; i < enemyCount; i++) {
            const enemy = ENEMIES[Math.floor(Math.random() * ENEMIES.length)];
            team.push({
                ...enemy,
                currentHp: enemy.hp,
                currentMp: 50
            });
        }
        
        return team;
    }
    
    showBattleUI() {
        document.getElementById('battle-ui').style.display = 'block';
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        
        // 【修复 P0-1】初始化战斗队伍的血量
        if (this.state.battle) {
            this.state.battle.playerTeam.forEach(hero => {
                if (hero) {
                    hero.currentHp = hero.hp;
                    hero.currentMp = hero.currentMp || 50;
                }
            });
            
            this.state.battle.enemyTeam.forEach(enemy => {
                if (enemy) {
                    enemy.currentHp = enemy.currentHp || enemy.hp;
                    enemy.currentMp = enemy.currentMp || 50;
                }
            });
        }
        
        this.renderBattleField();
        this.updateBattleUI();
    }
    
    renderBattleField() {
        if (!this.state.battle) return;
        
        const playerDisplay = document.getElementById('player-display');
        const enemyDisplay = document.getElementById('enemy-display');
        
        playerDisplay.innerHTML = '';
        enemyDisplay.innerHTML = '';
        
        this.state.battle.playerTeam.forEach(hero => {
            if (hero) {
                playerDisplay.innerHTML += `
                    <div class="battle-hero ${hero.rarity.toLowerCase()}">
                        <div>${hero.name}</div>
                        <div class="hp-bar">
                            <div class="hp-fill" style="width: ${(hero.currentHp || hero.hp) / hero.hp * 100}%"></div>
                        </div>
                    </div>
                `;
            }
        });
        
        this.state.battle.enemyTeam.forEach(enemy => {
            enemyDisplay.innerHTML += `
                <div class="battle-enemy">
                    <div>${enemy.name}</div>
                    <div class="hp-bar">
                        <div class="hp-fill" style="width: ${enemy.currentHp / enemy.hp * 100}%"></div>
                    </div>
                </div>
            `;
        });
    }
    
    updateBattleUI() {
        if (!this.state.battle) return;
        
        const battleLog = document.getElementById('battle-log');
        if (battleLog) {
            battleLog.innerHTML = this.state.battle.log.slice(-5).join('<br>');
        }
    }
    
    toggleAutoBattle() {
        this.autoBattle = !this.autoBattle;
        const btn = document.getElementById('auto-battle-btn');
        if (btn) {
            btn.textContent = this.autoBattle ? '⏸️ 暂停' : '▶️ 自动';
        }
    }
    
    setBattleSpeed(speed) {
        this.battleSpeed = speed;
        this.showNotification(`战斗速度：${speed}x`);
    }
    
    toggleBattlePause() {
        this.battlePaused = !this.battlePaused;
        const btn = document.getElementById('pause-battle-btn');
        if (btn) {
            btn.textContent = this.battlePaused ? '▶️ 继续' : '⏸️ 暂停';
        }
        if (this.battlePaused) {
            this.showNotification('⏸️ 战斗已暂停');
        } else {
            this.showNotification('▶️ 战斗继续');
        }
    }
    
    skipBattle() {
        if (!this.state.battle) return;
        
        const playerPower = this.state.battle.playerTeam.reduce((sum, h) => sum + this.calculatePower(h), 0);
        const enemyPower = this.state.battle.enemyTeam.reduce((sum, e) => sum + e.hp + e.attack, 0);
        
        // 【修复 P1-4】从 1.5 改为 1.2，更宽松的跳过条件
        if (playerPower > enemyPower * 1.2) {
            this.endBattle(true, true);
        } else {
            this.showNotification('实力不足，无法跳过！');
        }
    }
    
    endBattle(win, skipped = false) {
        if (win) {
            this.player.stats.battleWin++;
            
            // 【优化数值】提高收益，随等级提升
            const expGain = 50 + this.player.level * 5;
            const goldGain = 100 + this.player.level * 10;
            
            this.player.exp += expGain;
            this.player.gold += goldGain;
            
            this.state.battle.playerTeam.forEach(hero => {
                if (hero) {
                    hero.exp += 20;
                    this.checkLevelUp(hero);
                }
            });
            
            // 【修复 P2-9】更新每日任务进度
            this.updateDailyQuestProgress('battle1', 1);
            this.updateDailyQuestProgress('battle5', 1);
            this.updateDailyQuestProgress('battle10', 1);
            
            this.showNotification(`胜利！获得 ${expGain}经验 ${goldGain}金币`);
            this.updateResourceDisplay();
            this.updateDailyQuestSummary();  // 更新主界面任务摘要
        } else {
            this.player.stats.battleLose++;
            this.showNotification('战斗失败...');
        }
        
        document.getElementById('battle-ui').style.display = 'none';
        this.showScreen('home');
        this.state.battle = null;
    }
    
    checkLevelUp(hero) {
        const base = HERO_DATABASE.find(h => h.id === hero.id);
        const maxLevel = RARITY[base.rarity].maxLevel;
        const expNeeded = hero.level * 100;
        
        while (hero.exp >= expNeeded && hero.level < maxLevel) {
            hero.exp -= expNeeded;
            hero.level++;
            hero.hp = Math.floor(base.hp * (1 + (hero.level - 1) * 0.1));
            hero.attack = Math.floor(base.attack * (1 + (hero.level - 1) * 0.1));
            hero.defense = Math.floor(base.defense * (1 + (hero.level - 1) * 0.1));
            hero.speed = Math.floor(base.speed * (1 + (hero.level - 1) * 0.05));
            
            this.player.stats.totalUpgrades++;
            this.showNotification(`${hero.name}升级到 Lv.${hero.level}！`);
        }
    }
    
    renderBattleMap() {
        const content = document.getElementById('chapter-list');
        if (!content) return;
        
        content.innerHTML = '<h3>关卡选择</h3>';
        ENEMIES.forEach((enemy, index) => {
            content.innerHTML += `
                <div class="battle-node" onclick="game.startSpecificBattle(${index})">
                    <div class="node-info">
                        <h4>${enemy.name}</h4>
                        <div>战力：${enemy.hp + enemy.attack}</div>
                        <div>奖励：💰${enemy.exp * 2} 💎${Math.floor(enemy.exp / 5)}</div>
                    </div>
                </div>
            `;
        });
    }
    
    startSpecificBattle(enemyIndex) {
        if (this.player.team.length === 0) {
            this.showNotification('请先组建阵容！');
            return;
        }
        
        const enemy = ENEMIES[enemyIndex];
        this.state.battle = {
            playerTeam: this.player.team.map(heroId => this.getHeroById(heroId)).filter(h => h),
            enemyTeam: [{
                ...enemy,
                currentHp: enemy.hp,
                currentMp: 50
            }],
            turn: 0,
            log: [`遭遇了${enemy.name}！`]
        };
        
        this.showBattleUI();
    }
    
    renderAchievements() {
        const content = document.getElementById('achievements-content');
        if (!content) return;
        
        content.innerHTML = '<h3>成就列表</h3><div class="achievements-list">';
        
        ACHIEVEMENTS.forEach(achievement => {
            const completed = this.player.achievements.includes(achievement.id);
            
            content.innerHTML += `
                <div class="achievement ${completed ? 'completed' : ''}">
                    <div class="achievement-info">
                        <h4>${achievement.name}</h4>
                        <p>${achievement.desc}</p>
                        <div class="achievement-reward">
                            奖励：💰${achievement.reward.gold || 0} 💎${achievement.reward.gem || 0}
                        </div>
                    </div>
                    <div class="achievement-status">
                        ${completed ? '✅ 已完成' : '🔒 未完成'}
                    </div>
                </div>
            `;
        });
        
        content.innerHTML += '</div>';
    }
    
    checkAchievements() {
        ACHIEVEMENTS.forEach(achievement => {
            if (!this.player.achievements.includes(achievement.id)) {
                if (achievement.condition(this.player)) {
                    this.player.achievements.push(achievement.id);
                    this.player.gold += achievement.reward.gold || 0;
                    this.player.gem += achievement.reward.gem || 0;
                    
                    this.showNotification(`成就达成：${achievement.name}！`);
                    this.updateResourceDisplay();
                }
            }
        });
    }
    
    // ==================== 数据持久化 ====================
    loadGame() {
        const saved = localStorage.getItem('sanguo_idle_save');
        if (saved) {
            try {
                const data = JSON.parse(saved);
                Object.assign(this.player, data);
                
                // 【修复】确保加载存档后有武将和阵容
                if (!this.player.heroes) {
                    this.player.heroes = [];
                }
                if (!this.player.team) {
                    this.player.team = [];
                }
                
                // 如果有武将但没有阵容，自动布阵
                if (this.player.heroes.length > 0 && this.player.team.length === 0) {
                    this.player.team = this.player.heroes.slice(0, 5).map(h => h.id);
                    console.log('✓ 自动修复阵容:', this.player.team);
                }
                
                // 如果没有任何武将，赠送初始武将
                if (this.player.heroes.length === 0) {
                    this.player.heroes.push({
                        id: 'zhaolei',
                        level: 1,
                        exp: 0,
                        star: 1,
                        hp: 150,
                        attack: 35,
                        defense: 25,
                        speed: 20,
                        skills: ['连击', '防御']
                    });
                    this.player.team = ['zhaolei'];
                    console.log('✓ 存档损坏，已重置为初始武将');
                }
                
                console.log('✓ 存档加载成功');
            } catch (e) {
                console.error('存档损坏，使用新游戏', e);
                this.giveInitialHero();
            }
        } else {
            this.giveInitialHero();
            console.log('✓ 新游戏初始化');
        }
    }
    
    giveInitialHero() {
        // 赠送初始武将赵累
        this.player.heroes.push({
            id: 'zhaolei',
            level: 1,
            exp: 0,
            star: 1,
            hp: 150,
            attack: 35,
            defense: 25,
            speed: 20,
            skills: ['连击', '防御']
        });
        this.player.team = ['zhaolei'];
    }
    
    autoSave() {
        try {
            const saveData = JSON.stringify(this.player);
            localStorage.setItem('sanguo_idle_save', saveData);
            this.state.lastSaveTime = Date.now();
            console.log('✓ 游戏已保存');
        } catch (e) {
            console.error('保存失败', e);
        }
    }
    
    checkDailyReset() {
        const now = Date.now();
        const lastReset = this.player.lastDailyReset;
        const daysPassed = Math.floor((now - lastReset) / 86400000);
        
        if (daysPassed >= 1) {
            this.player.dailyQuests = {};
            this.player.lastDailyReset = now;
            this.player.stats.loginDays += daysPassed;
            this.showNotification(`欢迎回来！已登录${this.player.stats.loginDays}天`);
        }
    }
    
    calculateIdleReward() {
        const now = Date.now();
        const lastSave = this.state.lastSaveTime || now;
        const minutesOffline = Math.floor((now - lastSave) / 60000);
        const cappedMinutes = Math.min(minutesOffline, CONFIG.MAX_IDLE_REWARD_TIME);
        
        // 【修复 P1-6】提高离线收益公式，更合理的收益
        const baseGoldPerMinute = 20 + this.player.level * 5;
        const teamPowerBonus = this.calculateTeamPower() / 100; // 战队战力加成
        const goldPerMinute = Math.floor(baseGoldPerMinute + teamPowerBonus);
        const totalGold = cappedMinutes * goldPerMinute;
        
        // 计算元宝收益（每离线 60 分钟获得 1 元宝）
        const totalGem = Math.floor(cappedMinutes / 60);
        
        this.state.idleReward = {
            gold: totalGold,
            gem: totalGem,
            minutes: cappedMinutes
        };
        
        const idleEl = document.getElementById('idle-gold');
        if (idleEl) {
            idleEl.textContent = `${this.formatNumber(totalGold)} 💰 ${totalGem > 0 ? '+ ' + totalGem + '💎' : ''}`;
        }
        
        // 显示离线时间
        const idleRewardEl = document.getElementById('idle-reward');
        if (idleRewardEl) {
            const timeText = minutesOffline >= 60 
                ? `${Math.floor(minutesOffline / 60)}小时${minutesOffline % 60}分钟`
                : `${minutesOffline}分钟`;
            idleRewardEl.setAttribute('data-offline-time', `离线 ${timeText}`);
        }
    }
    
    gainIdleReward() {
        if (this.state.idleReward && this.state.idleReward.gold > 0) {
            const reward = this.state.idleReward;
            this.player.gold += reward.gold;
            if (reward.gem > 0) {
                this.player.gem += reward.gem;
            }
            
            let message = `领取离线收益：💰${this.formatNumber(reward.gold)}`;
            if (reward.gem > 0) {
                message += ` 💎${reward.gem}`;
            }
            if (reward.minutes >= 60) {
                message += ` (离线${Math.floor(reward.minutes / 60)}小时)`;
            }
            
            this.showNotification(message);
            this.state.idleReward = { gold: 0, gem: 0, minutes: 0 };
            this.updateResourceDisplay();
        }
    }
    
    // 【新增】计算战队总战力
    calculateTeamPower() {
        return this.player.team
            .map(heroId => this.getHeroById(heroId))
            .filter(h => h)
            .reduce((sum, hero) => sum + this.calculatePower(hero), 0);
    }
    
    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('click', (e) => {
            if (e.target && e.target.id === 'auto-battle-btn') {
                this.autoBattle = !this.autoBattle;
                e.target.textContent = this.autoBattle ? '⏸️ 暂停' : '▶️ 自动';
            }
        });
        
        document.querySelectorAll('.modal').forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.style.display = 'none';
                }
            });
        });
        
        console.log('✓ 事件绑定完成');
    }
    
    showGuideIfNew() {
        if (this.player.hasSkippedGuide) return;
        if (this.player.heroes.length > 1) return;
        
        setTimeout(() => {
            this.startInteractiveGuide();
        }, 800);
    }
    
    startInteractiveGuide() {
        // 创建引导遮罩层
        const overlay = document.createElement('div');
        overlay.id = 'guide-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        `;
        
        // 创建引导内容容器
        const content = document.createElement('div');
        content.id = 'guide-content';
        content.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: guidePopIn 0.3s ease-out;
        `;
        
        // 引导步骤
        const guideSteps = [
            {
                title: '🎮 欢迎来到三国英雄传！',
                desc: '一款轻松有趣的放置RPG游戏！',
                icon: '🏰',
                highlight: null
            },
            {
                title: '⚔️ 第一步：开始战斗',
                desc: '点击「快速战斗」按钮开始战斗！',
                icon: '⚔️',
                highlight: 'battle-btn',
                action: () => this.showScreen('home')
            },
            {
                title: '🎴 第二步：招募武将',
                desc: '去招募界面抽卡，获得更多强力武将！',
                icon: '🎴',
                highlight: 'summon-btn',
                action: () => this.showScreen('home')
            },
            {
                title: '👥 第三步：培养武将',
                desc: '在武将列表中升级和升星，让队伍更强！',
                icon: '👥',
                highlight: 'hero-btn',
                action: () => this.showScreen('home')
            },
            {
                title: '🎉 恭喜！你已学会！',
                desc: '开始你的三国冒险吧！祝你游戏愉快！',
                icon: '🎯',
                highlight: null,
                isLast: true
            }
        ];
        
        let currentStep = 0;
        
        const renderStep = () => {
            const step = guideSteps[currentStep];
            
            content.innerHTML = `
                <div style="font-size: 60px; margin-bottom: 20px;">${step.icon}</div>
                <h2 style="color: #333; margin-bottom: 15px; font-size: 24px;">${step.title}</h2>
                <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">${step.desc}</p>
                <div style="display: flex; gap: 10px; justify-content: center; margin-bottom: 20px;">
                    ${guideSteps.map((_, i) => `
                        <div style="width: 10px; height: 10px; border-radius: 50%; background: ${i <= currentStep ? '#667eea' : '#ddd'};"></div>
                    `).join('')}
                </div>
                <div style="display: flex; gap: 10px; justify-content: center;">
                    ${currentStep > 0 ? `<button id="guide-prev" style="padding: 12px 25px; border: none; border-radius: 10px; background: #ddd; color: #666; cursor: pointer; font-size: 14px;">上一步</button>` : ''}
                    ${step.isLast ? `<button id="guide-finish" style="padding: 12px 30px; border: none; border-radius: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; cursor: pointer; font-size: 16px; font-weight: bold;">🎮 开始游戏</button>` : `<button id="guide-next" style="padding: 12px 30px; border: none; border-radius: 10px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; cursor: pointer; font-size: 16px; font-weight: bold;">下一步 →</button>`}
                </div>
                <button id="guide-skip" style="margin-top: 15px; background: none; border: none; color: #999; cursor: pointer; font-size: 14px;">跳过引导</button>
            `;
            
            // 绑定按钮事件
            if (document.getElementById('guide-next')) {
                document.getElementById('guide-next').onclick = () => {
                    currentStep++;
                    renderStep();
                };
            }
            
            if (document.getElementById('guide-prev')) {
                document.getElementById('guide-prev').onclick = () => {
                    currentStep--;
                    renderStep();
                };
            }
            
            if (document.getElementById('guide-finish')) {
                document.getElementById('guide-finish').onclick = () => {
                    this.finishGuide(overlay);
                };
            }
            
            if (document.getElementById('guide-skip')) {
                document.getElementById('guide-skip').onclick = () => {
                    this.finishGuide(overlay);
                };
            }
            
            // 如果有高亮，执行action
            if (step.action) {
                step.action();
            }
        };
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        
        renderStep();
    }
    
    finishGuide(overlay) {
        this.player.hasSkippedGuide = true;
        this.saveGame();
        overlay.remove();
        this.showNotification('🎉 祝你游戏愉快！');
    }
    
    showHelp() {
        const overlay = document.createElement('div');
        overlay.id = 'help-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.7);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow-y: auto;
            padding: 20px;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 600px;
            width: 100%;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            animation: guidePopIn 0.3s ease-out;
        `;
        
        content.innerHTML = `
            <h2 style="color: #333; margin-bottom: 25px; font-size: 28px; text-align: center;">📖 游戏玩法说明</h2>
            
            <div style="margin-bottom: 25px;">
                <h3 style="color: #667eea; margin-bottom: 12px; font-size: 18px;">⚔️ 战斗系统</h3>
                <p style="color: #666; line-height: 1.7;">
                    点击「快速战斗」进入战斗！在战斗中可以调节速度、暂停、甚至跳过！<br>
                    胜利后可以获得金币、经验和元宝哦！
                </p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h3 style="color: #667eea; margin-bottom: 12px; font-size: 18px;">🎴 招募武将</h3>
                <p style="color: #666; line-height: 1.7;">
                    在招募界面抽卡获得武将！稀有度分为：<br>
                    <span style="color: #e74c3c; font-weight: bold;">UR（0.5%）</span> / 
                    <span style="color: #9b59b6; font-weight: bold;">SSR（4.5%）</span> / 
                    <span style="color: #3498db; font-weight: bold;">SR（20%）</span> / 
                    <span style="color: #2ecc71; font-weight: bold;">R（75%）</span><br>
                    每100抽必出UR！每30抽必出SSR！
                </p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h3 style="color: #667eea; margin-bottom: 12px; font-size: 18px;">👥 阵容搭配</h3>
                <p style="color: #666; line-height: 1.7;">
                    最多可以安排5名武将上阵！点击「编辑阵容」进行搭配，<br>
                    或者直接点击「一键布阵」，系统会自动按战力排序！
                </p>
            </div>
            
            <div style="margin-bottom: 25px;">
                <h3 style="color: #667eea; margin-bottom: 12px; font-size: 18px;">⚡ 武将培养</h3>
                <p style="color: #666; line-height: 1.7;">
                    在「武将列表」中可以升级和升星！<br>
                    升级提升属性，升星大幅增强！
                </p>
            </div>
            
            <div style="margin-bottom: 30px;">
                <h3 style="color: #667eea; margin-bottom: 12px; font-size: 18px;">🏪 商店购买</h3>
                <p style="color: #666; line-height: 1.7;">
                    在商店用金币或元宝购买升星石和经验书！<br>
                    新手记得多储备资源哦！
                </p>
            </div>
            
            <button id="help-close" style="
                width: 100%;
                padding: 15px;
                border: none;
                border-radius: 12px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-size: 18px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s;
            ">✅ 我知道了！</button>
        `;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        
        document.getElementById('help-close').onclick = () => {
            overlay.remove();
        };
        
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        };
    }
    
    confirmRestart() {
        const overlay = document.createElement('div');
        overlay.id = 'restart-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        const content = document.createElement('div');
        content.style.cssText = `
            background: white;
            padding: 40px;
            border-radius: 20px;
            max-width: 400px;
            text-align: center;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
        `;
        
        content.innerHTML = `
            <div style="font-size: 60px; margin-bottom: 20px;">⚠️</div>
            <h2 style="color: #333; margin-bottom: 15px; font-size: 24px;">确定要重新开始吗？</h2>
            <p style="color: #666; font-size: 16px; line-height: 1.6; margin-bottom: 30px;">
                所有存档将被清空！这将重新体验完整的新手引导！
            </p>
            <div style="display: flex; gap: 15px; justify-content: center;">
                <button id="restart-cancel" style="padding: 12px 25px; border: none; border-radius: 10px; background: #ddd; color: #666; cursor: pointer; font-size: 16px;">取消</button>
                <button id="restart-confirm" style="padding: 12px 30px; border: none; border-radius: 10px; background: #e74c3c; color: white; cursor: pointer; font-size: 16px; font-weight: bold;">🔄 确定重置</button>
            </div>
        `;
        
        overlay.appendChild(content);
        document.body.appendChild(overlay);
        
        document.getElementById('restart-cancel').onclick = () => {
            overlay.remove();
        };
        
        document.getElementById('restart-confirm').onclick = () => {
            this.restartGame();
            overlay.remove();
        };
        
        overlay.onclick = (e) => {
            if (e.target === overlay) {
                overlay.remove();
            }
        };
    }
    
    restartGame() {
        // 清空本地存储
        localStorage.removeItem('sanguo_idle_save');
        
        // 重新加载页面
        location.reload();
    }
    
    // ==================== 游戏循环 ====================
    gameLoop() {
        const loop = () => {
            this.update();
            this.render();
            requestAnimationFrame(loop);
        };
        loop();
    }
    
    update() {
        if (this.state.battle && this.autoBattle && !this.battlePaused) {
            const now = Date.now();
            const delay = 2000 / this.battleSpeed;
            
            if (now - this.lastBattleTurnTime >= delay) {
                this.lastBattleTurnTime = now;
                this.processBattleTurn();
            }
        }
    }
    
    render() {
        if (!this.ctx || !this.canvas) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        if (this.state.battle) {
            this.renderBattleScene();
        } else {
            this.renderHomeScene();
        }
    }
    
    renderHomeScene() {
        const { width, height } = this.canvas;
        
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, width, height);
        
        this.ctx.fillStyle = '#ffd700';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('三国英雄传', width / 2, height / 2 - 50);
        
        this.ctx.font = '24px Arial';
        this.ctx.fillStyle = '#ffffff';
        this.ctx.fillText('v3.0', width / 2, height / 2);
    }
    
    renderBattleScene() {
        if (!this.canvas || !this.ctx) return;
        
        const { width, height } = this.canvas;
        
        // 绘制战场背景
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, '#2c3e50');
        gradient.addColorStop(0.5, '#4ca1af');
        gradient.addColorStop(1, '#2c3e50');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, width, height);
        
        // 绘制地面
        this.ctx.fillStyle = '#34495e';
        this.ctx.fillRect(0, height * 0.6, width, height * 0.4);
        
        // 如果有战斗，绘制双方武将
        if (this.state.battle) {
            // 绘制敌方 (上方)
            this.state.battle.enemyTeam.forEach((enemy, index) => {
                if (enemy.currentHp > 0) {
                    const x = width * 0.2 + (index % 3) * (width * 0.25);
                    const y = height * 0.2;
                    this.drawBattleUnit(enemy, x, y, true);
                }
            });
            
            // 绘制我方 (下方)
            this.state.battle.playerTeam.forEach((hero, index) => {
                if (hero && hero.currentHp > 0) {
                    const x = width * 0.2 + (index % 3) * (width * 0.25);
                    const y = height * 0.65;
                    this.drawBattleUnit(hero, x, y, false);
                }
            });
        }
    }
    
    drawBattleUnit(unit, x, y, isEnemy) {
        // 绘制单位形象 (圆形)
        const radius = 35;
        
        // 外圈光晕
        const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, radius + 10);
        if (isEnemy) {
            gradient.addColorStop(0, 'rgba(231, 76, 60, 0.8)');
            gradient.addColorStop(1, 'rgba(231, 76, 60, 0)');
        } else {
            gradient.addColorStop(0, 'rgba(52, 152, 219, 0.8)');
            gradient.addColorStop(1, 'rgba(52, 152, 219, 0)');
        }
        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius + 10, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 主体圆形
        this.ctx.fillStyle = isEnemy ? '#e74c3c' : '#3498db';
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 边框
        this.ctx.strokeStyle = '#ecf0f1';
        this.ctx.lineWidth = 3;
        this.ctx.stroke();
        
        // 绘制名称
        this.ctx.fillStyle = '#ecf0f1';
        this.ctx.font = 'bold 14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText(unit.name, x, y - radius - 10);
        
        // 绘制血条背景
        const hpBarWidth = 80;
        const hpBarHeight = 8;
        const hpBarX = x - hpBarWidth / 2;
        const hpBarY = y + radius + 10;
        
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
        
        // 绘制当前血量
        const hpPercent = unit.currentHp / unit.hp;
        const hpGradient = this.ctx.createLinearGradient(hpBarX, hpBarY, hpBarX + hpBarWidth, hpBarY);
        hpGradient.addColorStop(0, '#e74c3c');
        hpGradient.addColorStop(0.5, '#f39c12');
        hpGradient.addColorStop(1, '#2ecc71');
        
        this.ctx.fillStyle = hpGradient;
        this.ctx.fillRect(hpBarX, hpBarY, hpBarWidth * hpPercent, hpBarHeight);
        
        // 血条边框
        this.ctx.strokeStyle = '#ecf0f1';
        this.ctx.lineWidth = 1;
        this.ctx.strokeRect(hpBarX, hpBarY, hpBarWidth, hpBarHeight);
        
        // 绘制血量数值
        this.ctx.fillStyle = '#ecf0f1';
        this.ctx.font = '11px Arial';
        this.ctx.fillText(`${Math.ceil(unit.currentHp)}/${unit.hp}`, x, hpBarY + 20);
    }
    
    processBattleTurn() {
        if (!this.state.battle) return;
        
        this.state.battle.turn++;
        
        // 【优化 P2-10】限制日志最多 50 条，防止卡顿
        if (this.state.battle.log.length > 50) {
            this.state.battle.log = this.state.battle.log.slice(-50);
        }
        
        // 玩家回合
        this.state.battle.playerTeam.forEach(hero => {
            if (hero && hero.currentHp > 0) {
                const target = this.state.battle.enemyTeam.find(e => e && e.currentHp > 0);
                if (target) {
                    const damage = Math.max(1, hero.attack - target.defense / 2);
                    if (!target.currentHp) target.currentHp = target.hp;
                    target.currentHp -= damage;
                    
                    // 添加战斗日志和动画效果
                    const logEntry = `${hero.name}攻击${target.name}造成${Math.floor(damage)}伤害`;
                    this.state.battle.log.push(logEntry);
                    
                    // 触发攻击动画
                    this.triggerAttackEffect(hero, target, damage);
                }
            }
        });
        
        // 敌人回合 (延迟执行，让玩家先攻击)
        setTimeout(() => {
            if (!this.state.battle) return;
            
            this.state.battle.enemyTeam.forEach(enemy => {
                if (enemy && enemy.currentHp > 0) {
                    const target = this.state.battle.playerTeam.find(h => h && h.currentHp > 0);
                    if (target) {
                        const damage = Math.max(1, enemy.attack - target.defense / 2);
                        if (!target.currentHp) target.currentHp = target.hp;
                        target.currentHp -= damage;
                        
                        const logEntry = `${enemy.name}攻击${target.name}造成${Math.floor(damage)}伤害`;
                        this.state.battle.log.push(logEntry);
                        
                        // 触发攻击动画
                        this.triggerAttackEffect(enemy, target, damage);
                    }
                }
            });
            
            // 检查战斗结果
            setTimeout(() => {
                if (!this.state.battle) return;
                
                const playerAlive = this.state.battle.playerTeam.some(h => h && h.currentHp > 0);
                const enemyAlive = this.state.battle.enemyTeam.some(e => e && e.currentHp > 0);
                
                if (!enemyAlive) {
                    this.endBattle(true);
                } else if (!playerAlive) {
                    this.endBattle(false);
                }
                
                this.renderBattleField();
                this.updateBattleUI();
            }, 500);
        }, 500);
        
        this.renderBattleField();
        this.updateBattleUI();
    }
    
    triggerAttackEffect(attacker, target, damage) {
        // 1. 显示伤害数字
        this.showDamageNumber(damage, target);
        
        // 2. 震动效果
        this.shakeEffect();
        
        // 3. 添加攻击闪光特效
        this.showAttackFlash();
        
        // 4. 如果伤害高，显示暴击特效
        if (damage > 30) {
            this.showCritEffect();
        }
    }
    
    showDamageNumber(damage, target) {
        const damageEl = document.createElement('div');
        damageEl.className = 'damage-number';
        damageEl.textContent = `-${damage}`;
        damageEl.style.cssText = `
            position: absolute;
            font-size: 28px;
            font-weight: bold;
            color: #e74c3c;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.7), 0 0 10px rgba(231,76,60,0.5);
            pointer-events: none;
            animation: damageFloat 1s ease-out forwards;
            z-index: 1000;
        `;
        
        const battleUI = document.getElementById('battle-ui');
        if (battleUI) {
            damageEl.style.left = '50%';
            damageEl.style.top = '35%';
            battleUI.appendChild(damageEl);
            
            setTimeout(() => {
                if (damageEl.parentNode) {
                    damageEl.parentNode.removeChild(damageEl);
                }
            }, 1000);
        }
    }
    
    showAttackFlash() {
        const battleUI = document.getElementById('battle-ui');
        if (battleUI) {
            const flash = document.createElement('div');
            flash.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
                animation: flashEffect 0.2s ease-out;
                pointer-events: none;
                z-index: 999;
            `;
            battleUI.appendChild(flash);
            
            setTimeout(() => {
                if (flash.parentNode) {
                    flash.parentNode.removeChild(flash);
                }
            }, 200);
        }
    }
    
    showCritEffect() {
        const battleUI = document.getElementById('battle-ui');
        if (battleUI) {
            const critText = document.createElement('div');
            critText.textContent = '💥 暴击!';
            critText.style.cssText = `
                position: absolute;
                top: 30%;
                left: 50%;
                transform: translateX(-50%);
                font-size: 32px;
                font-weight: bold;
                color: #f39c12;
                text-shadow: 2px 2px 8px rgba(0,0,0,0.8);
                animation: critPop 0.5s ease-out forwards;
                z-index: 1001;
            `;
            battleUI.appendChild(critText);
            
            setTimeout(() => {
                if (critText.parentNode) {
                    critText.parentNode.removeChild(critText);
                }
            }, 500);
        }
    }
    
    shakeEffect() {
        const battleUI = document.getElementById('battle-ui');
        if (battleUI) {
            battleUI.style.animation = 'shake 0.3s ease-in-out';
            setTimeout(() => {
                battleUI.style.animation = '';
            }, 300);
        }
    }
}
