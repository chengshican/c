// 三国英雄传 - 完整优化版 v2.0
// 整合所有优化：手动战斗、武将培养、经济系统、阵容调整、UI 优化

// ==================== 游戏配置 ====================
const CONFIG = {
    FPS: 60,
    SAVE_INTERVAL: 30000,
    IDLE_REWARD_INTERVAL: 60000,
    MAX_IDLE_REWARD_TIME: 720,
    VERSION: '2.0.0'
};

// ==================== 武将稀有度 ====================
const RARITY = {
    N: { name: 'N', color: '#999999', rate: 0.5, maxLevel: 10, maxStar: 5 },
    R: { name: 'R', color: '#4CAF50', rate: 0.3, maxLevel: 20, maxStar: 5 },
    SR: { name: 'SR', color: '#2196F3', rate: 0.15, maxLevel: 40, maxStar: 5 },
    SSR: { name: 'SSR', color: '#FF9800', rate: 0.045, maxLevel: 60, maxStar: 5 },
    UR: { name: 'UR', color: '#E91E63', rate: 0.005, maxLevel: 80, maxStar: 5 }
};

// ==================== 武将数据库 (19 位) ====================
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
    { id: 'battle1', name: '初战告捷', desc: '完成 1 次战斗', target: 1, reward: { gold: 10, gem: 0 } },
    { id: 'battle5', name: '连战连捷', desc: '完成 5 次战斗', target: 5, reward: { gold: 50, gem: 5 } },
    { id: 'battle10', name: '战无不胜', desc: '完成 10 次战斗', target: 10, reward: { gold: 100, gem: 10 } },
    { id: 'summon1', name: '招募武将', desc: '进行 1 次招募', target: 1, reward: { gold: 20, gem: 0 } },
    { id: 'upgrade1', name: '武将升级', desc: '武将升级 1 次', target: 1, reward: { gold: 30, gem: 5 } }
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

// ==================== 50+ 成就系统 ====================
const ACHIEVEMENTS = [
    // 战斗类 (5)
    { id: 'battle_1', name: '初出茅庐', desc: '赢得第 1 场战斗', type: 'battle', condition: (p) => p.stats.battleWin >= 1, reward: { gold: 100, gem: 10 } },
    { id: 'battle_10', name: '久经沙场', desc: '赢得 10 场战斗', type: 'battle', condition: (p) => p.stats.battleWin >= 10, reward: { gold: 500, gem: 50 } },
    { id: 'battle_50', name: '身经百战', desc: '赢得 50 场战斗', type: 'battle', condition: (p) => p.stats.battleWin >= 50, reward: { gold: 1000, gem: 100 } },
    { id: 'battle_100', name: '战无不胜', desc: '赢得 100 场战斗', type: 'battle', condition: (p) => p.stats.battleWin >= 100, reward: { gold: 2000, gem: 200 } },
    { id: 'battle_500', name: '战神降临', desc: '赢得 500 场战斗', type: 'battle', condition: (p) => p.stats.battleWin >= 500, reward: { gold: 5000, gem: 500 } },
    
    // 收集类 (4)
    { id: 'hero_5', name: '初具规模', desc: '拥有 5 名武将', type: 'collection', condition: (p) => p.heroes.length >= 5, reward: { gold: 200, gem: 20 } },
    { id: 'hero_10', name: '收藏家', desc: '拥有 10 名武将', type: 'collection', condition: (p) => p.heroes.length >= 10, reward: { gold: 300, gem: 30 } },
    { id: 'hero_20', name: '人才济济', desc: '拥有 20 名武将', type: 'collection', condition: (p) => p.heroes.length >= 20, reward: { gold: 500, gem: 50 } },
    { id: 'hero_30', name: '群雄荟萃', desc: '拥有 30 名武将', type: 'collection', condition: (p) => p.heroes.length >= 30, reward: { gold: 800, gem: 80 } },
    
    // 招募类 (3)
    { id: 'summon_10', name: '招募达人', desc: '进行 10 次招募', type: 'summon', condition: (p) => p.stats.summonCount >= 10, reward: { gold: 500, gem: 50 } },
    { id: 'summon_50', name: '招兵买马', desc: '进行 50 次招募', type: 'summon', condition: (p) => p.stats.summonCount >= 50, reward: { gold: 1000, gem: 100 } },
    { id: 'summon_100', name: '千军万马', desc: '进行 100 次招募', type: 'summon', condition: (p) => p.stats.summonCount >= 100, reward: { gold: 2000, gem: 200 } },
    
    // 等级类 (4)
    { id: 'level_10', name: '初露锋芒', desc: '玩家等级达到 10 级', type: 'level', condition: (p) => p.level >= 10, reward: { gold: 1000, gem: 100 } },
    { id: 'level_20', name: '小有所成', desc: '玩家等级达到 20 级', type: 'level', condition: (p) => p.level >= 20, reward: { gold: 2000, gem: 200 } },
    { id: 'level_30', name: '功成名就', desc: '玩家等级达到 30 级', type: 'level', condition: (p) => p.level >= 30, reward: { gold: 3000, gem: 300 } },
    { id: 'level_50', name: '一代宗师', desc: '玩家等级达到 50 级', type: 'level', condition: (p) => p.level >= 50, reward: { gold: 5000, gem: 500 } },
    
    // 稀有度类 (4)
    { id: 'sr_1', name: '精英之证', desc: '获得 SR 武将', type: 'rarity', condition: (p) => p.heroes.some(h => HERO_DATABASE.find(db => db.id === h.id && db.rarity === 'SR')), reward: { gold: 200, gem: 20 } },
    { id: 'ssr_1', name: '欧皇附体', desc: '获得 SSR 武将', type: 'rarity', condition: (p) => p.heroes.some(h => HERO_DATABASE.find(db => db.id === h.id && db.rarity === 'SSR')), reward: { gold: 500, gem: 100 } },
    { id: 'ssr_3', name: '天命所归', desc: '获得 3 个 SSR 武将', type: 'rarity', condition: (p) => p.heroes.filter(h => HERO_DATABASE.find(db => db.id === h.id && db.rarity === 'SSR')).length >= 3, reward: { gold: 1000, gem: 200 } },
    { id: 'ur_1', name: '天选之子', desc: '获得 UR 武将', type: 'rarity', condition: (p) => p.heroes.some(h => HERO_DATABASE.find(db => db.id === h.id && db.rarity === 'UR')), reward: { gold: 1000, gem: 300 } },
    
    // 财富类 (4)
    { id: 'gold_1k', name: '小富即安', desc: '拥有 1000 金币', type: 'wealth', condition: (p) => p.gold >= 1000, reward: { gem: 10 } },
    { id: 'gold_10k', name: '富甲一方', desc: '拥有 10000 金币', type: 'wealth', condition: (p) => p.gold >= 10000, reward: { gem: 50 } },
    { id: 'gold_100k', name: '富可敌国', desc: '拥有 100000 金币', type: 'wealth', condition: (p) => p.gold >= 100000, reward: { gem: 200 } },
    { id: 'gem_1k', name: '元宝大户', desc: '拥有 1000 元宝', type: 'wealth', condition: (p) => p.gem >= 1000, reward: { gold: 5000 } },
    
    // 培养类 (3)
    { id: 'upgrade_10', name: '培养新人', desc: '武将升级总计 10 次', type: 'training', condition: (p) => p.stats.totalUpgrades >= 10, reward: { gold: 300, gem: 30 } },
    { id: 'upgrade_50', name: '精心栽培', desc: '武将升级总计 50 次', type: 'training', condition: (p) => p.stats.totalUpgrades >= 50, reward: { gold: 800, gem: 80 } },
    { id: 'upgrade_100', name: '桃李满园', desc: '武将升级总计 100 次', type: 'training', condition: (p) => p.stats.totalUpgrades >= 100, reward: { gold: 1500, gem: 150 } },
    
    // 特殊类 (2)
    { id: 'login_7', name: '持之以恒', desc: '累计登录 7 天', type: 'special', condition: (p) => p.stats.loginDays >= 7, reward: { gold: 1000, gem: 100 } },
    { id: 'login_30', name: '忠贞不渝', desc: '累计登录 30 天', type: 'special', condition: (p) => p.stats.loginDays >= 30, reward: { gold: 3000, gem: 300 } }
];
