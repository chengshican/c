// 三国英雄传 v7.0 - 多人版
// 新增：账号系统、多人游戏、独立存档、账号切换

const CONFIG = {
    FPS: 60,
    SAVE_INTERVAL: 30000,
    VERSION: '7.0.0',
    SAVE_PREFIX: 'sanguo_idle_v7_'
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
// ========== v8.0 P0 功能开始 ==========

// 扩充至 30 武将
const HERO_DATABASE = [
    // 蜀国（12 人）
    { id: 'liubei', name: '刘备', rarity: 'UR', faction: '蜀', hp: 380, attack: 75, defense: 65, speed: 52 },
    { id: 'guanyu', name: '关羽', rarity: 'UR', faction: '蜀', hp: 450, attack: 110, defense: 70, speed: 50 },
    { id: 'zhangfei', name: '张飞', rarity: 'UR', faction: '蜀', hp: 500, attack: 95, defense: 60, speed: 55 },
    { id: 'zhugeliang', name: '诸葛亮', rarity: 'UR', faction: '蜀', hp: 280, attack: 90, defense: 50, speed: 70 },
    { id: 'zhaoyun', name: '赵云', rarity: 'SSR', faction: '蜀', hp: 350, attack: 85, defense: 55, speed: 75 },
    { id: 'machao', name: '马超', rarity: 'SSR', faction: '蜀', hp: 340, attack: 90, defense: 50, speed: 78 },
    { id: 'huangzhong', name: '黄忠', rarity: 'SSR', faction: '蜀', hp: 320, attack: 95, defense: 45, speed: 60 },
    { id: 'weyan', name: '魏延', rarity: 'SSR', faction: '蜀', hp: 360, attack: 88, defense: 52, speed: 58 },
    { id: 'jiangwei', name: '姜维', rarity: 'SSR', faction: '蜀', hp: 330, attack: 82, defense: 55, speed: 65 },
    { id: 'liao', name: '廖化', rarity: 'SR', faction: '蜀', hp: 220, attack: 50, defense: 40, speed: 35 },
    { id: 'zhaolei', name: '赵累', rarity: 'R', faction: '蜀', hp: 180, attack: 40, defense: 35, speed: 30 },
    { id: 'mangchang', name: '孟获', rarity: 'SR', faction: '蜀', hp: 380, attack: 70, defense: 50, speed: 40 },
    // 魏国（10 人）
    { id: 'caocao', name: '曹操', rarity: 'UR', faction: '魏', hp: 400, attack: 85, defense: 65, speed: 60 },
    { id: 'simayi', name: '司马懿', rarity: 'UR', faction: '魏', hp: 350, attack: 95, defense: 55, speed: 65 },
    { id: 'xiahoudun', name: '夏侯惇', rarity: 'SSR', faction: '魏', hp: 420, attack: 80, defense: 60, speed: 50 },
    { id: 'caoren', name: '曹仁', rarity: 'SSR', faction: '魏', hp: 450, attack: 70, defense: 80, speed: 45 },
    { id: 'guojia', name: '郭嘉', rarity: 'SSR', faction: '魏', hp: 250, attack: 85, defense: 40, speed: 60 },
    { id: 'dianwei', name: '典韦', rarity: 'SSR', faction: '魏', hp: 480, attack: 90, defense: 55, speed: 48 },
    { id: 'xuchu', name: '许褚', rarity: 'SSR', faction: '魏', hp: 500, attack: 85, defense: 58, speed: 45 },
    { id: 'zhangliao', name: '张辽', rarity: 'SSR', faction: '魏', hp: 360, attack: 82, defense: 55, speed: 68 },
    { id: 'xiahoun', name: '夏侯渊', rarity: 'SR', faction: '魏', hp: 320, attack: 78, defense: 45, speed: 72 },
    { id: 'caohong', name: '曹洪', rarity: 'SR', faction: '魏', hp: 380, attack: 65, defense: 60, speed: 48 },
    // 吴国（6 人）
    { id: 'sunquan', name: '孙权', rarity: 'UR', faction: '吴', hp: 370, attack: 75, defense: 60, speed: 58 },
    { id: 'zhouyu', name: '周瑜', rarity: 'UR', faction: '吴', hp: 300, attack: 92, defense: 50, speed: 68 },
    { id: 'luxun', name: '陆逊', rarity: 'SSR', faction: '吴', hp: 310, attack: 85, defense: 52, speed: 65 },
    { id: 'lumeng', name: '吕蒙', rarity: 'SSR', faction: '吴', hp: 340, attack: 78, defense: 58, speed: 60 },
    { id: 'ganning', name: '甘宁', rarity: 'SSR', faction: '吴', hp: 350, attack: 88, defense: 50, speed: 70 },
    { id: 'taishici', name: '太史慈', rarity: 'SSR', faction: '吴', hp: 380, attack: 82, defense: 55, speed: 62 },
    // 群雄（2 人）
    { id: 'lvbu', name: '吕布', rarity: 'UR', faction: '群', hp: 520, attack: 120, defense: 65, speed: 58 },
    { id: 'dongzhuo', name: '董卓', rarity: 'SSR', faction: '群', hp: 550, attack: 85, defense: 70, speed: 40 }
];

