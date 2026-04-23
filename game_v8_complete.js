// 三国英雄传 v1.0.0 - 正式发布版
// 核心功能：30 武将、完整升级系统、装备系统、20 关卡、剧情模式

const CONFIG = {
    FPS: 60,
    SAVE_INTERVAL: 30000,
    VERSION: '1.0.0',
    SAVE_PREFIX: 'sanguo_idle_'
};

const RARITY = {
    N: { name: 'N', color: '#999999' },
    R: { name: 'R', color: '#4CAF50' },
    SR: { name: 'SR', color: '#2196F3' },
    SSR: { name: 'SSR', color: '#FF9800' },
    UR: { name: 'UR', color: '#E91E63' }
};

const FACTION_COLORS = {
    '蜀': '#e74c3c',
    '魏': '#3498db',
    '吴': '#2ecc71',
    '群': '#9b59b6'
};

// ==================== 60 武将数据库 ====================
const HERO_DATABASE = [
    // 蜀国（15 人）
    { id: 'liubei', name: '刘备', rarity: 'UR', faction: '蜀', hp: 380, attack: 75, defense: 65, speed: 52, icon: '👑', title: '仁德之君' },
    { id: 'guanyu', name: '关羽', rarity: 'UR', faction: '蜀', hp: 450, attack: 110, defense: 70, speed: 50, icon: '🐉', title: '武圣' },
    { id: 'zhangfei', name: '张飞', rarity: 'UR', faction: '蜀', hp: 500, attack: 95, defense: 60, speed: 55, icon: '🐍', title: '万人敌' },
    { id: 'zhugeliang', name: '诸葛亮', rarity: 'UR', faction: '蜀', hp: 280, attack: 90, defense: 50, speed: 70, icon: '🦢', title: '卧龙' },
    { id: 'zhaoyun', name: '赵云', rarity: 'SSR', faction: '蜀', hp: 350, attack: 85, defense: 55, speed: 75, icon: '⚡', title: '常胜将军' },
    { id: 'machao', name: '马超', rarity: 'SSR', faction: '蜀', hp: 340, attack: 90, defense: 50, speed: 78, icon: '🐎', title: '神威天将军' },
    { id: 'huangzhong', name: '黄忠', rarity: 'SSR', faction: '蜀', hp: 320, attack: 95, defense: 45, speed: 60, icon: '🏹', title: '神射手' },
    { id: 'weyan', name: '魏延', rarity: 'SSR', faction: '蜀', hp: 360, attack: 88, defense: 52, speed: 58, icon: '⚔️', title: '征西大将军' },
    { id: 'jiangwei', name: '姜维', rarity: 'SSR', faction: '蜀', hp: 330, attack: 82, defense: 55, speed: 65, icon: '🎯', title: '麒麟儿' },
    { id: 'pangtong', name: '庞统', rarity: 'SSR', faction: '蜀', hp: 270, attack: 88, defense: 45, speed: 62, icon: '🦅', title: '凤雏' },
    { id: 'liao', name: '廖化', rarity: 'SR', faction: '蜀', hp: 220, attack: 50, defense: 40, speed: 35, icon: '🛡️', title: '先锋大将' },
    { id: 'zhaolei', name: '赵累', rarity: 'R', faction: '蜀', hp: 180, attack: 40, defense: 35, speed: 30, icon: '🔰', title: '忠诚副将' },
    { id: 'mangchang', name: '孟获', rarity: 'SR', faction: '蜀', hp: 380, attack: 70, defense: 50, speed: 40, icon: '👹', title: '南蛮王' },
    { id: 'zhurong', name: '祝融夫人', rarity: 'SR', faction: '蜀', hp: 290, attack: 68, defense: 42, speed: 55, icon: '🔥', title: '蛮族女王' },
    { id: 'huatuo', name: '华佗', rarity: 'SR', faction: '蜀', hp: 240, attack: 45, defense: 38, speed: 48, icon: '💊', title: '神医' },
    // 魏国（18 人）
    { id: 'caocao', name: '曹操', rarity: 'UR', faction: '魏', hp: 400, attack: 85, defense: 65, speed: 60, icon: '🐲', title: '魏武帝' },
    { id: 'simayi', name: '司马懿', rarity: 'UR', faction: '魏', hp: 350, attack: 95, defense: 55, speed: 65, icon: '🦅', title: '冢虎' },
    { id: 'xiahoudun', name: '夏侯惇', rarity: 'SSR', faction: '魏', hp: 420, attack: 80, defense: 60, speed: 50, icon: '👁️', title: '独眼将军' },
    { id: 'caoren', name: '曹仁', rarity: 'SSR', faction: '魏', hp: 450, attack: 70, defense: 80, speed: 45, icon: '🏰', title: '天人将军' },
    { id: 'guojia', name: '郭嘉', rarity: 'SSR', faction: '魏', hp: 250, attack: 85, defense: 40, speed: 60, icon: '🌙', title: '鬼才' },
    { id: 'dianwei', name: '典韦', rarity: 'SSR', faction: '魏', hp: 480, attack: 90, defense: 55, speed: 48, icon: '🪓', title: '古之恶来' },
    { id: 'xuchu', name: '许褚', rarity: 'SSR', faction: '魏', hp: 500, attack: 85, defense: 58, speed: 45, icon: '🐯', title: '虎痴' },
    { id: 'zhangliao', name: '张辽', rarity: 'SSR', faction: '魏', hp: 360, attack: 82, defense: 55, speed: 68, icon: '🌪️', title: '威震逍遥津' },
    { id: 'xiahoun', name: '夏侯渊', rarity: 'SR', faction: '魏', hp: 320, attack: 78, defense: 45, speed: 72, icon: '🏃', title: '疾行将军' },
    { id: 'caohong', name: '曹洪', rarity: 'SR', faction: '魏', hp: 380, attack: 65, defense: 60, speed: 48, icon: '💂', title: '护国将军' },
    { id: 'xunyu', name: '荀彧', rarity: 'SSR', faction: '魏', hp: 260, attack: 80, defense: 42, speed: 58, icon: '📜', title: '王佐之才' },
    { id: 'xunyou', name: '荀攸', rarity: 'SR', faction: '魏', hp: 240, attack: 72, defense: 40, speed: 55, icon: '🎯', title: '谋主' },
    { id: 'jiaxu', name: '贾诩', rarity: 'SSR', faction: '魏', hp: 270, attack: 83, defense: 43, speed: 60, icon: '🦊', title: '毒士' },
    { id: 'chengyu', name: '程昱', rarity: 'SR', faction: '魏', hp: 250, attack: 70, defense: 38, speed: 52, icon: '🔮', title: '谋士' },
    { id: 'caopi', name: '曹丕', rarity: 'SR', faction: '魏', hp: 310, attack: 68, defense: 52, speed: 50, icon: '📖', title: '魏文帝' },
    { id: 'caizhen', name: '蔡文姬', rarity: 'SSR', faction: '魏', hp: 230, attack: 65, defense: 35, speed: 55, icon: '🎵', title: '才女' },
    { id: 'zhanghe', name: '张郃', rarity: 'SR', faction: '魏', hp: 340, attack: 75, defense: 50, speed: 65, icon: '⚔️', title: '巧变将军' },
    { id: 'xuhuang', name: '徐晃', rarity: 'SR', faction: '魏', hp: 360, attack: 73, defense: 55, speed: 48, icon: '🪓', title: '平寇将军' },
    // 吴国（15 人）
    { id: 'sunquan', name: '孙权', rarity: 'UR', faction: '吴', hp: 370, attack: 75, defense: 60, speed: 58, icon: '👑', title: '吴大帝' },
    { id: 'zhouyu', name: '周瑜', rarity: 'UR', faction: '吴', hp: 300, attack: 92, defense: 50, speed: 68, icon: '🎵', title: '美周郎' },
    { id: 'sunce', name: '孙策', rarity: 'UR', faction: '吴', hp: 420, attack: 95, defense: 58, speed: 65, icon: '🐯', title: '小霸王' },
    { id: 'luxun', name: '陆逊', rarity: 'SSR', faction: '吴', hp: 310, attack: 85, defense: 52, speed: 65, icon: '🔥', title: '书生大将' },
    { id: 'lumeng', name: '吕蒙', rarity: 'SSR', faction: '吴', hp: 340, attack: 78, defense: 58, speed: 60, icon: '📚', title: '白衣渡江' },
    { id: 'ganning', name: '甘宁', rarity: 'SSR', faction: '吴', hp: 350, attack: 88, defense: 50, speed: 70, icon: '🔔', title: '锦帆贼' },
    { id: 'taishici', name: '太史慈', rarity: 'SSR', faction: '吴', hp: 380, attack: 82, defense: 55, speed: 62, icon: '🎯', title: '神箭将军' },
    { id: 'huanggai', name: '黄盖', rarity: 'SR', faction: '吴', hp: 370, attack: 68, defense: 58, speed: 45, icon: '🔥', title: '苦肉计' },
    { id: 'zhugejin', name: '诸葛瑾', rarity: 'SR', faction: '吴', hp: 260, attack: 65, defense: 45, speed: 50, icon: '📜', title: '谋士' },
    { id: 'lusu', name: '鲁肃', rarity: 'SSR', faction: '吴', hp: 290, attack: 75, defense: 48, speed: 55, icon: '🤝', title: '战略家' },
    { id: 'sunshangxiang', name: '孙尚香', rarity: 'SSR', faction: '吴', hp: 320, attack: 80, defense: 45, speed: 68, icon: '🏹', title: '弓腰姬' },
    { id: 'daitai', name: '大乔', rarity: 'SSR', faction: '吴', hp: 250, attack: 60, defense: 40, speed: 58, icon: '🌸', title: '国色' },
    { id: 'xiaoqiao', name: '小乔', rarity: 'SSR', faction: '吴', hp: 240, attack: 62, defense: 38, speed: 60, icon: '🌺', title: '天香' },
    { id: 'zhurong_wu', name: '朱然', rarity: 'SR', faction: '吴', hp: 330, attack: 72, defense: 50, speed: 58, icon: '⚔️', title: '火攻将军' },
    { id: 'panzhang', name: '潘璋', rarity: 'SR', faction: '吴', hp: 340, attack: 70, defense: 52, speed: 52, icon: '🔱', title: '擒龙将军' },
    // 群雄（12 人）
    { id: 'lvbu', name: '吕布', rarity: 'UR', faction: '群', hp: 520, attack: 120, defense: 65, speed: 58, icon: '😈', title: '飞将' },
    { id: 'dongzhuo', name: '董卓', rarity: 'SSR', faction: '群', hp: 550, attack: 85, defense: 70, speed: 40, icon: '👿', title: '暴君' },
    { id: 'yuanhao', name: '袁绍', rarity: 'SSR', faction: '群', hp: 380, attack: 75, defense: 55, speed: 50, icon: '👑', title: '四世三公' },
    { id: 'gongsunzan', name: '公孙瓒', rarity: 'SR', faction: '群', hp: 340, attack: 72, defense: 50, speed: 62, icon: '🐎', title: '白马将军' },
    { id: 'diaochan', name: '貂蝉', rarity: 'UR', faction: '群', hp: 260, attack: 78, defense: 40, speed: 72, icon: '🌙', title: '闭月' },
    { id: 'zhangjiao', name: '张角', rarity: 'SSR', faction: '群', hp: 290, attack: 85, defense: 42, speed: 55, icon: '⚡', title: '天公将军' },
    { id: 'zhangbao', name: '张宝', rarity: 'SR', faction: '群', hp: 270, attack: 70, defense: 40, speed: 50, icon: '🔮', title: '地公将军' },
    { id: 'zhangliang', name: '张梁', rarity: 'SR', faction: '群', hp: 280, attack: 68, defense: 42, speed: 48, icon: '🗡️', title: '人公将军' },
    { id: 'huaxiong', name: '华雄', rarity: 'SR', faction: '群', hp: 400, attack: 75, defense: 55, speed: 45, icon: '👹', title: '勇将' },
    { id: 'liubiao', name: '刘表', rarity: 'SR', faction: '群', hp: 320, attack: 65, defense: 50, speed: 45, icon: '📜', title: '荆州牧' },
    { id: 'maoteng', name: '毛玠', rarity: 'R', faction: '群', hp: 200, attack: 48, defense: 38, speed: 42, icon: '📋', title: '会计' },
    { id: 'chen', name: '陈宫', rarity: 'SR', faction: '群', hp: 280, attack: 72, defense: 45, speed: 52, icon: '🎯', title: '谋士' }
];

// ==================== 装备数据库（24 件）====================
const EQUIPMENT_DATABASE = {
    weapon: [
        { id: 'w1', name: '铁剑', type: 'weapon', quality: 'white', attack: 10 },
        { id: 'w2', name: '青铜剑', type: 'weapon', quality: 'green', attack: 20 },
        { id: 'w3', name: '钢剑', type: 'weapon', quality: 'blue', attack: 35 },
        { id: 'w4', name: '紫电剑', type: 'weapon', quality: 'purple', attack: 55 },
        { id: 'w5', name: '霸者之剑', type: 'weapon', quality: 'orange', attack: 80 },
        { id: 'w6', name: '青龙偃月刀', type: 'weapon', quality: 'red', attack: 120 }
    ],
    armor: [
        { id: 'a1', name: '布甲', type: 'armor', quality: 'white', defense: 8 },
        { id: 'a2', name: '皮甲', type: 'armor', quality: 'green', defense: 18 },
        { id: 'a3', name: '铁甲', type: 'armor', quality: 'blue', defense: 30 },
        { id: 'a4', name: '紫铠', type: 'armor', quality: 'purple', defense: 48 },
        { id: 'a5', name: '战甲', type: 'armor', quality: 'orange', defense: 70 },
        { id: 'a6', name: '凤凰羽衣', type: 'armor', quality: 'red', defense: 100 }
    ],
    helmet: [
        { id: 'h1', name: '布帽', type: 'helmet', quality: 'white', hp: 20 },
        { id: 'h2', name: '铁盔', type: 'helmet', quality: 'green', hp: 40 },
        { id: 'h3', name: '钢盔', type: 'helmet', quality: 'blue', hp: 70 },
        { id: 'h4', name: '紫盔', type: 'helmet', quality: 'purple', hp: 110 },
        { id: 'h5', name: '虎头盔', type: 'helmet', quality: 'orange', hp: 160 },
        { id: 'h6', name: '龙头盔', type: 'helmet', quality: 'red', hp: 240 }
    ],
    boots: [
        { id: 'b1', name: '布鞋', type: 'boots', quality: 'white', speed: 5 },
        { id: 'b2', name: '皮靴', type: 'boots', quality: 'green', speed: 10 },
        { id: 'b3', name: '铁靴', type: 'boots', quality: 'blue', speed: 18 },
        { id: 'b4', name: '紫云靴', type: 'boots', quality: 'purple', speed: 28 },
        { id: 'b5', name: '疾风靴', type: 'boots', quality: 'orange', speed: 40 },
        { id: 'b6', name: '神行靴', type: 'boots', quality: 'red', speed: 60 }
    ]
};

const QUALITY_COLORS = {
    white: '#FFFFFF',
    green: '#2ECC71',
    blue: '#3498DB',
    purple: '#9B59B6',
    orange: '#E67E22',
    red: '#E74C3C'
};

const QUALITY_NAMES = {
    white: '白色',
    green: '绿色',
    blue: '蓝色',
    purple: '紫色',
    orange: '橙色',
    red: '红色'
};

// ==================== 计谋策略数据库（FC 吞食天地经典计谋）====================
const TACTICS_DATABASE = [
    // ===== 火系计谋（5 级）=====
    { 
        id: 'lian_huo', 
        name: '炼火计', 
        type: 'damage', 
        effect: '对敌方造成极少量火属性伤害',
        damageBase: 30,
        target: 'single_enemy',
        levelReq: 1,
        cooldown: 1,
        mpCost: 2,
        icon: '🔥',
        description: '初级火攻，烈焰初现！'
    },
    { 
        id: 'ye_huo', 
        name: '业火计', 
        type: 'damage', 
        effect: '对敌方造成少量火属性伤害',
        damageBase: 80,
        target: 'single_enemy',
        levelReq: 11,
        cooldown: 1,
        mpCost: 4,
        icon: '🔥🔥',
        description: '火势渐旺，焚尽敌军！'
    },
    { 
        id: 'yan_re', 
        name: '炎热计', 
        type: 'damage', 
        effect: '对敌方造成中等火属性伤害',
        damageBase: 150,
        target: 'single_enemy',
        levelReq: 20,
        cooldown: 2,
        mpCost: 6,
        icon: '🔥🔥🔥',
        description: '烈火燎原，势不可挡！'
    },
    { 
        id: 'da_re', 
        name: '大热计', 
        type: 'damage', 
        effect: '对敌方造成大量火属性伤害',
        damageBase: 300,
        target: 'single_enemy',
        levelReq: 32,
        cooldown: 2,
        mpCost: 6,
        icon: '🔥🔥🔥🔥',
        description: '烈焰冲天，焚尽八荒！'
    },
    { 
        id: 'huo_shen', 
        name: '火神计', 
        type: 'damage', 
        effect: '对敌方造成海量火属性伤害',
        damageBase: 600,
        target: 'single_enemy',
        levelReq: 40,
        cooldown: 3,
        mpCost: 8,
        icon: '🔥🔥🔥🔥🔥',
        description: '火神降临，万物俱焚！'
    },
    
    // ===== 水系计谋（5 级）=====
    { 
        id: 'shui_tuo', 
        name: '水途计', 
        type: 'damage', 
        effect: '对敌方造成极少量水属性伤害',
        damageBase: 40,
        target: 'single_enemy',
        levelReq: 3,
        cooldown: 1,
        mpCost: 3,
        icon: '💧',
        description: '细水长流，润物无声！'
    },
    { 
        id: 'shui_xing', 
        name: '水星计', 
        type: 'damage', 
        effect: '对敌方造成少量水属性伤害',
        damageBase: 100,
        target: 'single_enemy',
        levelReq: 12,
        cooldown: 1,
        mpCost: 5,
        icon: '💧💧',
        description: '水星闪耀，寒光逼人！'
    },
    { 
        id: 'shui_lei', 
        name: '水雷计', 
        type: 'damage', 
        effect: '对敌方造成中等水属性伤害',
        damageBase: 180,
        target: 'single_enemy',
        levelReq: 22,
        cooldown: 2,
        mpCost: 6,
        icon: '💧⚡',
        description: '水雷交加，震慑三军！'
    },
    { 
        id: 'hong_shui', 
        name: '洪水计', 
        type: 'damage', 
        effect: '对敌方造成大量水属性伤害',
        damageBase: 350,
        target: 'single_enemy',
        levelReq: 34,
        cooldown: 2,
        mpCost: 8,
        icon: '🌊',
        description: '洪水滔天，吞噬一切！'
    },
    { 
        id: 'shui_long', 
        name: '水龙计', 
        type: 'damage', 
        effect: '对敌方造成海量水属性伤害',
        damageBase: 700,
        target: 'single_enemy',
        levelReq: 42,
        cooldown: 3,
        mpCost: 10,
        icon: '🐉💧',
        description: '水龙咆哮，翻江倒海！'
    },
    
    // ===== 石系计谋（5 级）=====
    { 
        id: 'luo_mu', 
        name: '落木计', 
        type: 'damage', 
        effect: '对敌方造成极少量石属性伤害',
        damageBase: 50,
        target: 'single_enemy',
        levelReq: 4,
        cooldown: 1,
        mpCost: 4,
        icon: '🪨',
        description: '落木萧萧，随风而下！'
    },
    { 
        id: 'liu_mu', 
        name: '流木计', 
        type: 'damage', 
        effect: '对敌方造成少量石属性伤害',
        damageBase: 120,
        target: 'single_enemy',
        levelReq: 13,
        cooldown: 1,
        mpCost: 4,
        icon: '🌲🪨',
        description: '流木冲击，势如破竹！'
    },
    { 
        id: 'luo_shi', 
        name: '落石计', 
        type: 'damage', 
        effect: '对敌方造成中等石属性伤害',
        damageBase: 200,
        target: 'single_enemy',
        levelReq: 24,
        cooldown: 2,
        mpCost: 6,
        icon: '🪨🪨',
        description: '落石滚滚，山崩地裂！'
    },
    { 
        id: 'tou_shi', 
        name: '投石计', 
        type: 'damage', 
        effect: '对敌方造成大量石属性伤害',
        damageBase: 400,
        target: 'single_enemy',
        levelReq: 35,
        cooldown: 2,
        mpCost: 8,
        icon: '🪨🪨🪨',
        description: '投石问路，石破天惊！'
    },
    { 
        id: 'ji_shi', 
        name: '激石计', 
        type: 'damage', 
        effect: '对敌方造成海量石属性伤害',
        damageBase: 800,
        target: 'single_enemy',
        levelReq: 44,
        cooldown: 3,
        mpCost: 10,
        icon: '🪨🪨🪨🪨',
        description: '激石飞溅，碎石穿空！'
    },
    
    // ===== 回复系计谋（5 级）=====
    { 
        id: 'chi_xin', 
        name: '赤心计', 
        type: 'heal', 
        effect: '回复我方兵力 200 点左右',
        healBase: 200,
        target: 'single_ally',
        levelReq: 2,
        cooldown: 1,
        mpCost: 3,
        icon: '💚',
        description: '赤心相待，救死扶伤！'
    },
    { 
        id: 'tong_xian', 
        name: '铜仙计', 
        type: 'heal', 
        effect: '回复我方兵力 800 点左右',
        healBase: 800,
        target: 'single_ally',
        levelReq: 17,
        cooldown: 1,
        mpCost: 5,
        icon: '💚💚',
        description: '铜仙妙手，起死回生！'
    },
    { 
        id: 'yin_xian', 
        name: '银仙计', 
        type: 'heal', 
        effect: '回复我方兵力 2000 点左右',
        healBase: 2000,
        target: 'single_ally',
        levelReq: 28,
        cooldown: 2,
        mpCost: 6,
        icon: '💚💚💚',
        description: '银仙降临，妙手回春！'
    },
    { 
        id: 'wan_fu', 
        name: '完复计', 
        type: 'heal', 
        effect: '回复我方兵力 5000 点左右',
        healBase: 5000,
        target: 'single_ally',
        levelReq: 38,
        cooldown: 2,
        mpCost: 8,
        icon: '💚💚💚💚',
        description: '完全恢复，力挽狂澜！'
    },
    { 
        id: 'jin_xian', 
        name: '金仙计', 
        type: 'heal', 
        effect: '回复我方兵力 10000 点左右',
        healBase: 10000,
        target: 'single_ally',
        levelReq: 46,
        cooldown: 3,
        mpCost: 10,
        icon: '💚💚💚💚💚',
        description: '金仙大法，普济众生！'
    },
    
    // ===== 离间系计谋 =====
    { 
        id: 'yi_xin', 
        name: '疑心计', 
        type: 'confuse', 
        effect: '使敌方单体疑心，不会行动',
        debuffType: 'confuse',
        debuffDuration: 2,
        target: 'single_enemy',
        levelReq: 10,
        cooldown: 2,
        mpCost: 6,
        icon: '❓',
        description: '疑心重重，举棋不定！'
    },
    { 
        id: 'li_jian', 
        name: '离间计', 
        type: 'confuse', 
        effect: '使敌方单体离间，攻击自己人',
        debuffType: 'confuse_attack',
        debuffDuration: 2,
        target: 'single_enemy',
        levelReq: 25,
        cooldown: 3,
        mpCost: 8,
        icon: '💔',
        description: '离间之计，坐山观虎！'
    },
    { 
        id: 'pan_li', 
        name: '叛离计', 
        type: '叛离', 
        effect: '使敌方单体叛离，帮助我方攻击',
        debuffType: '叛离',
        debuffDuration: 2,
        target: 'single_enemy',
        levelReq: 39,
        cooldown: 4,
        mpCost: 16,
        icon: '⚔️💔',
        description: '叛离之计，反戈一击！'
    },
    
    // ===== 特殊计谋 =====
    { 
        id: 'an_sha', 
        name: '暗杀计', 
        type: 'assassinate', 
        effect: '直接秒杀敌方单体（对部分将领无效）',
        target: 'single_enemy',
        levelReq: 45,
        cooldown: 5,
        mpCost: 16,
        icon: '🗡️',
        description: '暗杀无形，一击必杀！'
    },
    { 
        id: 'zhao_hun', 
        name: '招魂计', 
        type: 'revive', 
        effect: '复活我方单体武将',
        revivePercent: 1.0,
        target: 'dead_ally',
        levelReq: 36,
        cooldown: 4,
        mpCost: 32,
        icon: '✨',
        description: '招魂归位，起死回生！'
    },
    { 
        id: 'xue_lu', 
        name: '血路计', 
        type: 'escape', 
        effect: '强行从战斗中逃跑',
        target: 'special',
        levelReq: 15,
        cooldown: 1,
        mpCost: 8,
        icon: '🏃',
        description: '杀出重围，全身而退！'
    },
    { 
        id: 'yan_dun', 
        name: '烟遁计', 
        type: 'escape', 
        effect: '使用烟雾遁走，必定成功逃跑',
        target: 'special',
        levelReq: 20,
        cooldown: 2,
        mpCost: 8,
        icon: '💨',
        description: '烟遁无形，神不知鬼不觉！'
    }
];

// ==================== 关卡数据库 ====================
const LEVELS = [
    {
        id: 1, name: '涿郡起兵', difficulty: '简单', enemyCount: 2,
        enemies: [
            { name: '黄巾小兵', hp: 80, attack: 15, defense: 8, intelligence: 10 },
            { name: '黄巾小兵', hp: 80, attack: 15, defense: 8, intelligence: 10 }
        ],
        reward: { gold: 50, exp: 30, gem: 0, equipment: null },
        unlockReq: '新游戏解锁',
        story: '黄巾起义爆发，你在涿郡起兵响应...'
    },
    {
        id: 2, name: '讨伐董卓', difficulty: '简单', enemyCount: 2,
        enemies: [
            { name: '董卓军', hp: 120, attack: 25, defense: 15, intelligence: 20 },
            { name: '董卓军', hp: 120, attack: 25, defense: 15, intelligence: 20 }
        ],
        reward: { gold: 80, exp: 50, gem: 1, equipment: 'w1' },
        unlockReq: '通过第 1 关',
        story: '董卓祸乱朝纲，十八路诸侯共讨之...'
    },
    {
        id: 3, name: '三英战吕布', difficulty: '中等', enemyCount: 3,
        enemies: [
            { name: '吕布', hp: 300, attack: 80, defense: 50, intelligence: 60, isBoss: true },
            { name: '并州狼骑', hp: 100, attack: 30, defense: 20, intelligence: 15 },
            { name: '并州狼骑', hp: 100, attack: 30, defense: 20, intelligence: 15 }
        ],
        reward: { gold: 150, exp: 100, gem: 3, equipment: 'a1' },
        unlockReq: '通过第 2 关',
        story: '虎牢关前，吕布逞威，谁敢与之一战？'
    },
    {
        id: 4, name: '徐州风云', difficulty: '中等', enemyCount: 3,
        enemies: [
            { name: '曹军', hp: 150, attack: 40, defense: 25 },
            { name: '曹军', hp: 150, attack: 40, defense: 25 },
            { name: '曹军', hp: 150, attack: 40, defense: 25 }
        ],
        reward: { gold: 200, exp: 150, gem: 5, equipment: 'h1' },
        unlockReq: '通过第 3 关',
        story: '曹操东征徐州，刘备危在旦夕...'
    },
    {
        id: 5, name: '官渡之战', difficulty: '困难', enemyCount: 4,
        enemies: [
            { name: '袁绍军', hp: 180, attack: 45, defense: 30 },
            { name: '袁绍军', hp: 180, attack: 45, defense: 30 },
            { name: '颜良', hp: 250, attack: 60, defense: 40 },
            { name: '文丑', hp: 250, attack: 60, defense: 40 }
        ],
        reward: { gold: 300, exp: 200, gem: 10, equipment: 'b1' },
        unlockReq: '通过第 4 关',
        story: '官渡决战，以少胜多的经典战役...'
    },
    {
        id: 6, name: '赤壁之战', difficulty: '极难', enemyCount: 5,
        enemies: [
            { name: '曹军', hp: 200, attack: 50, defense: 35 },
            { name: '曹军', hp: 200, attack: 50, defense: 35 },
            { name: '曹军', hp: 200, attack: 50, defense: 35 },
            { name: '曹操', hp: 400, attack: 70, defense: 55 },
            { name: '曹军', hp: 200, attack: 50, defense: 35 }
        ],
        reward: { gold: 500, exp: 300, gem: 20, equipment: 'w2' },
        unlockReq: '通过第 5 关',
        story: '赤壁火攻，三分天下由此定...'
    },
    // 第 7-10 关：三国鼎立（中等难度）
    {
        id: 7, name: '荆州之争', difficulty: '中等', enemyCount: 4,
        enemies: [
            { name: '吴军', hp: 160, attack: 42, defense: 28 },
            { name: '吴军', hp: 160, attack: 42, defense: 28 },
            { name: '周瑜', hp: 280, attack: 65, defense: 45 },
            { name: '吕蒙', hp: 260, attack: 60, defense: 48 }
        ],
        reward: { gold: 350, exp: 220, gem: 12, equipment: 'a2' },
        unlockReq: '通过第 6 关',
        story: '赤壁战后，荆州归属成为焦点...'
    },
    {
        id: 8, name: '益州攻略', difficulty: '中等', enemyCount: 4,
        enemies: [
            { name: '刘璋军', hp: 170, attack: 44, defense: 30 },
            { name: '刘璋军', hp: 170, attack: 44, defense: 30 },
            { name: '严颜', hp: 240, attack: 55, defense: 42 },
            { name: '张任', hp: 250, attack: 58, defense: 40 }
        ],
        reward: { gold: 400, exp: 250, gem: 15, equipment: 'h2' },
        unlockReq: '通过第 7 关',
        story: '刘备入川，谋取益州...'
    },
    {
        id: 9, name: '汉中之战', difficulty: '困难', enemyCount: 5,
        enemies: [
            { name: '曹军', hp: 190, attack: 48, defense: 32 },
            { name: '曹军', hp: 190, attack: 48, defense: 32 },
            { name: '夏侯渊', hp: 300, attack: 68, defense: 50 },
            { name: '张郃', hp: 280, attack: 65, defense: 48 },
            { name: '曹军', hp: 190, attack: 48, defense: 32 }
        ],
        reward: { gold: 450, exp: 280, gem: 18, equipment: 'b2' },
        unlockReq: '通过第 8 关',
        story: '刘备曹操争夺汉中，势在必得...'
    },
    {
        id: 10, name: '襄樊之战', difficulty: '困难', enemyCount: 5,
        enemies: [
            { name: '曹军', hp: 200, attack: 50, defense: 35 },
            { name: '曹军', hp: 200, attack: 50, defense: 35 },
            { name: '于禁', hp: 270, attack: 62, defense: 50 },
            { name: '庞德', hp: 290, attack: 68, defense: 48 },
            { name: '曹仁', hp: 320, attack: 65, defense: 55 }
        ],
        reward: { gold: 500, exp: 320, gem: 22, equipment: 'w3' },
        unlockReq: '通过第 9 关',
        story: '关羽北伐，水淹七军，威震华夏...'
    },
    // 第 11-15 关：三国后期（困难难度）
    {
        id: 11, name: '夷陵之战', difficulty: '困难', enemyCount: 5,
        enemies: [
            { name: '吴军', hp: 210, attack: 52, defense: 36 },
            { name: '吴军', hp: 210, attack: 52, defense: 36 },
            { name: '陆逊', hp: 300, attack: 70, defense: 52 },
            { name: '朱然', hp: 280, attack: 65, defense: 50 },
            { name: '韩当', hp: 270, attack: 63, defense: 48 }
        ],
        reward: { gold: 550, exp: 350, gem: 25, equipment: 'a3' },
        unlockReq: '通过第 10 关',
        story: '刘备为报关羽之仇，兴兵伐吴...'
    },
    {
        id: 12, name: '白帝托孤', difficulty: '困难', enemyCount: 5,
        enemies: [
            { name: '魏军', hp: 220, attack: 54, defense: 38 },
            { name: '魏军', hp: 220, attack: 54, defense: 38 },
            { name: '曹丕', hp: 310, attack: 68, defense: 55 },
            { name: '司马懿', hp: 330, attack: 75, defense: 52 },
            { name: '魏军', hp: 220, attack: 54, defense: 38 }
        ],
        reward: { gold: 600, exp: 380, gem: 28, equipment: 'h3' },
        unlockReq: '通过第 11 关',
        story: '刘备兵败夷陵，托孤于诸葛亮...'
    },
    {
        id: 13, name: '南征孟获', difficulty: '困难', enemyCount: 5,
        enemies: [
            { name: '南蛮兵', hp: 230, attack: 56, defense: 40 },
            { name: '南蛮兵', hp: 230, attack: 56, defense: 40 },
            { name: '孟获', hp: 350, attack: 72, defense: 55 },
            { name: '祝融夫人', hp: 300, attack: 68, defense: 50 },
            { name: '南蛮兵', hp: 230, attack: 56, defense: 40 }
        ],
        reward: { gold: 650, exp: 400, gem: 30, equipment: 'b3' },
        unlockReq: '通过第 12 关',
        story: '诸葛亮南征，七擒七纵孟获...'
    },
    {
        id: 14, name: '北伐中原', difficulty: '极难', enemyCount: 6,
        enemies: [
            { name: '魏军', hp: 240, attack: 58, defense: 42 },
            { name: '魏军', hp: 240, attack: 58, defense: 42 },
            { name: '曹真', hp: 320, attack: 70, defense: 55 },
            { name: '张郃', hp: 310, attack: 72, defense: 53 },
            { name: '魏军', hp: 240, attack: 58, defense: 42 },
            { name: '魏军', hp: 240, attack: 58, defense: 42 }
        ],
        reward: { gold: 700, exp: 430, gem: 32, equipment: 'w4' },
        unlockReq: '通过第 13 关',
        story: '诸葛亮六出祁山，北伐中原...'
    },
    {
        id: 15, name: '街亭之战', difficulty: '极难', enemyCount: 6,
        enemies: [
            { name: '魏军', hp: 250, attack: 60, defense: 44 },
            { name: '魏军', hp: 250, attack: 60, defense: 44 },
            { name: '司马懿', hp: 340, attack: 78, defense: 58 },
            { name: '张郃', hp: 320, attack: 75, defense: 55 },
            { name: '魏军', hp: 250, attack: 60, defense: 44 },
            { name: '魏军', hp: 250, attack: 60, defense: 44 }
        ],
        reward: { gold: 750, exp: 460, gem: 35, equipment: 'a4' },
        unlockReq: '通过第 14 关',
        story: '马谡失街亭，诸葛亮挥泪斩马谡...'
    },
    // 第 16-20 关：三国归晋（极难难度）
    {
        id: 16, name: '五丈原之战', difficulty: '极难', enemyCount: 6,
        enemies: [
            { name: '魏军', hp: 260, attack: 62, defense: 46 },
            { name: '魏军', hp: 260, attack: 62, defense: 46 },
            { name: '司马懿', hp: 360, attack: 80, defense: 60 },
            { name: '郭淮', hp: 330, attack: 72, defense: 56 },
            { name: '魏军', hp: 260, attack: 62, defense: 46 },
            { name: '魏军', hp: 260, attack: 62, defense: 46 }
        ],
        reward: { gold: 800, exp: 500, gem: 38, equipment: 'h4' },
        unlockReq: '通过第 15 关',
        story: '诸葛亮星落五丈原，蜀汉由盛转衰...'
    },
    {
        id: 17, name: '姜维北伐', difficulty: '极难', enemyCount: 6,
        enemies: [
            { name: '魏军', hp: 270, attack: 64, defense: 48 },
            { name: '魏军', hp: 270, attack: 64, defense: 48 },
            { name: '邓艾', hp: 350, attack: 78, defense: 58 },
            { name: '钟会', hp: 340, attack: 75, defense: 56 },
            { name: '魏军', hp: 270, attack: 64, defense: 48 },
            { name: '魏军', hp: 270, attack: 64, defense: 48 }
        ],
        reward: { gold: 850, exp: 530, gem: 40, equipment: 'b4' },
        unlockReq: '通过第 16 关',
        story: '姜维九伐中原，继承丞相遗志...'
    },
    {
        id: 18, name: '邓艾偷渡', difficulty: '极难', enemyCount: 6,
        enemies: [
            { name: '蜀军', hp: 280, attack: 66, defense: 50 },
            { name: '蜀军', hp: 280, attack: 66, defense: 50 },
            { name: '邓艾', hp: 370, attack: 82, defense: 60 },
            { name: '诸葛绪', hp: 340, attack: 75, defense: 55 },
            { name: '蜀军', hp: 280, attack: 66, defense: 50 },
            { name: '蜀军', hp: 280, attack: 66, defense: 50 }
        ],
        reward: { gold: 900, exp: 560, gem: 42, equipment: 'w5' },
        unlockReq: '通过第 17 关',
        story: '邓艾偷渡阴平，直逼成都...'
    },
    {
        id: 19, name: '成都之战', difficulty: '极难', enemyCount: 7,
        enemies: [
            { name: '魏军', hp: 290, attack: 68, defense: 52 },
            { name: '魏军', hp: 290, attack: 68, defense: 52 },
            { name: '邓艾', hp: 380, attack: 85, defense: 62 },
            { name: '钟会', hp: 360, attack: 80, defense: 58 },
            { name: '魏军', hp: 290, attack: 68, defense: 52 },
            { name: '魏军', hp: 290, attack: 68, defense: 52 },
            { name: '魏军', hp: 290, attack: 68, defense: 52 }
        ],
        reward: { gold: 950, exp: 600, gem: 45, equipment: 'a5' },
        unlockReq: '通过第 18 关',
        story: '刘禅出降，蜀汉灭亡...'
    },
    {
        id: 20, name: '三国归晋', difficulty: '极难', enemyCount: 7,
        enemies: [
            { name: '吴军', hp: 300, attack: 70, defense: 54 },
            { name: '吴军', hp: 300, attack: 70, defense: 54 },
            { name: '孙皓', hp: 390, attack: 82, defense: 60 },
            { name: '陆抗', hp: 370, attack: 78, defense: 58 },
            { name: '魏军', hp: 300, attack: 70, defense: 54 },
            { name: '魏军', hp: 300, attack: 70, defense: 54 },
            { name: '司马炎', hp: 400, attack: 88, defense: 65 }
        ],
        reward: { gold: 1000, exp: 650, gem: 50, equipment: 'h5' },
        unlockReq: '通过第 19 关',
        story: '天下大势，分久必合，三国归晋...'
    }
];

// ==================== 优化后的每日任务 ====================
const DAILY_QUESTS = [
    { id: 1, name: '初战告捷', desc: '赢得 1 场战斗胜利', target: 1, reward: { gold: 100, gem: 10, exp: 50 }, type: 'battle_win' },
    { id: 2, name: '百战百胜', desc: '赢得 10 场战斗胜利', target: 10, reward: { gold: 500, gem: 50, exp: 200 }, type: 'battle_win' },
    { id: 3, name: '招兵买马', desc: '招募 1 名武将', target: 1, reward: { gold: 200, gem: 20, exp: 100 }, type: 'summon' },
    { id: 4, name: '精兵强将', desc: '升级武将 1 次', target: 1, reward: { gold: 150, gem: 15, exp: 80 }, type: 'hero_upgrade' },
    { id: 5, name: '过关斩将', desc: '通过 1 个关卡', target: 1, reward: { gold: 300, gem: 30, exp: 150 }, type: 'level_pass' },
    { id: 6, name: '装备强化', desc: '强化装备 1 次', target: 1, reward: { gold: 100, gem: 10, exp: 50 }, type: 'equip_upgrade' },
    { id: 7, name: '任务达人', desc: '完成 5 个每日任务', target: 5, reward: { gold: 500, gem: 50, exp: 200 }, type: 'daily_complete' }
];

// ==================== 账号管理系统 ====================
class AccountManager {
    constructor() {
        this.ACCOUNT_LIST_KEY = 'sanguo_accounts';
        this.CURRENT_ACCOUNT_KEY = 'sanguo_current';
    }
    
    getAllAccounts() {
        const accounts = localStorage.getItem(this.ACCOUNT_LIST_KEY);
        return accounts ? JSON.parse(accounts) : [];
    }
    
    createAccount(username, password) {
        const accounts = this.getAllAccounts();
        if (accounts.find(a => a.username === username)) {
            return { success: false, message: '❌ 账号已存在！' };
        }
        
        const newAccount = {
            username: username,
            password: password,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
        };
        
        accounts.push(newAccount);
        localStorage.setItem(this.ACCOUNT_LIST_KEY, JSON.stringify(accounts));
        
        const defaultData = this.getDefaultPlayerData();
        localStorage.setItem(CONFIG.SAVE_PREFIX + username, JSON.stringify(defaultData));
        
        return { success: true, message: `✅ 账号 ${username} 创建成功！` };
    }
    
    login(username, password) {
        const accounts = this.getAllAccounts();
        const account = accounts.find(a => a.username === username && a.password === password);
        
        if (!account) {
            return { success: false, message: '❌ 账号或密码错误！' };
        }
        
        account.lastLogin = new Date().toISOString();
        localStorage.setItem(this.ACCOUNT_LIST_KEY, JSON.stringify(accounts));
        localStorage.setItem(this.CURRENT_ACCOUNT_KEY, username);
        
        return { success: true, message: `✅ 欢迎回来，${username}！` };
    }
    
    // 创建超级账户
    createSuperAccount(username, password) {
        const accounts = this.getAllAccounts();
        const existingAccount = accounts.find(a => a.username === username);
        
        // 如果账号不存在，创建新账号
        if (!existingAccount) {
            const newAccount = {
                username: username,
                password: password,
                createdAt: new Date().toISOString(),
                lastLogin: new Date().toISOString()
            };
            
            accounts.push(newAccount);
            localStorage.setItem(this.ACCOUNT_LIST_KEY, JSON.stringify(accounts));
        } else {
            // 账号已存在，更新密码
            existingAccount.password = password;
            existingAccount.lastLogin = new Date().toISOString();
            localStorage.setItem(this.ACCOUNT_LIST_KEY, JSON.stringify(accounts));
        }
        
        // 创建超级玩家数据（覆盖旧数据）
        const superData = this.getSuperPlayerData();
        localStorage.setItem(CONFIG.SAVE_PREFIX + username, JSON.stringify(superData));
        
        console.log(`✅ 超级账户 ${username} 创建/更新成功`);
        console.log(`  - 金币：${superData.gold}`);
        console.log(`  - 元宝：${superData.gem}`);
        console.log(`  - 武将数量：${superData.heroes.length}`);
        console.log(`  - 装备数量：${superData.inventory.length}`);
        
        return { 
            success: true, 
            message: `✅ 超级账户 ${username} 创建成功！\n拥有无限资源和最强武将！` 
        };
    }
    
    // 获取超级玩家数据（满级武将 + 无限资源）
    getSuperPlayerData() {
        // 创建所有 UR 和 SSR 武将（满级满星）
        const superHeroes = HERO_DATABASE
            .filter(h => h.rarity === 'UR' || h.rarity === 'SSR')
            .map(hero => {
                // 计算满星满级属性
                const baseHero = HERO_DATABASE.find(h => h.id === hero.id);
                const starBonus = 1 + (5 * 0.2); // 5 星加成 2.0 倍
                
                return {
                    ...hero,
                    level: 100,  // 满级
                    star: 5,     // 5 星满星
                    currentHp: baseHero.hp * starBonus * 2,  // 满星加成
                    hp: baseHero.hp * starBonus,
                    attack: baseHero.attack * starBonus,
                    defense: baseHero.defense * starBonus,
                    speed: baseHero.speed * starBonus,
                    equipment: {
                        weapon: { id: 'w6', name: '青龙偃月刀', type: 'weapon', quality: 'red', attack: 120, level: 10 },
                        armor: { id: 'a6', name: '凤凰羽衣', type: 'armor', quality: 'red', defense: 100, level: 10 },
                        helmet: { id: 'h6', name: '龙头盔', type: 'helmet', quality: 'red', hp: 240, level: 10 },
                        boots: { id: 'b6', name: '神行靴', type: 'boots', quality: 'red', speed: 60, level: 10 }
                    }
                };
            });
        
        // 所有装备（使用固定数据，不依赖 EQUIPMENT_DATABASE）
        const allEquipment = [
            // 红色装备（+10）
            { id: 'w6', name: '青龙偃月刀', type: 'weapon', quality: 'red', attack: 120, level: 10 },
            { id: 'a6', name: '凤凰羽衣', type: 'armor', quality: 'red', defense: 100, level: 10 },
            { id: 'h6', name: '龙头盔', type: 'helmet', quality: 'red', hp: 240, level: 10 },
            { id: 'b6', name: '神行靴', type: 'boots', quality: 'red', speed: 60, level: 10 },
            // 橙色装备（+10）
            { id: 'w5', name: '霸者之剑', type: 'weapon', quality: 'orange', attack: 80, level: 10 },
            { id: 'a5', name: '战甲', type: 'armor', quality: 'orange', defense: 70, level: 10 },
            { id: 'h5', name: '虎头盔', type: 'helmet', quality: 'orange', hp: 160, level: 10 },
            { id: 'b5', name: '疾风靴', type: 'boots', quality: 'orange', speed: 40, level: 10 },
            // 紫色装备（+10）
            { id: 'w4', name: '紫电剑', type: 'weapon', quality: 'purple', attack: 55, level: 10 },
            { id: 'a4', name: '紫铠', type: 'armor', quality: 'purple', defense: 48, level: 10 },
            { id: 'h4', name: '紫盔', type: 'helmet', quality: 'purple', hp: 110, level: 10 },
            { id: 'b4', name: '紫云靴', type: 'boots', quality: 'purple', speed: 28, level: 10 },
            // 蓝色装备（+10）
            { id: 'w3', name: '钢剑', type: 'weapon', quality: 'blue', attack: 35, level: 10 },
            { id: 'a3', name: '铁甲', type: 'armor', quality: 'blue', defense: 30, level: 10 },
            { id: 'h3', name: '钢盔', type: 'helmet', quality: 'blue', hp: 70, level: 10 },
            { id: 'b3', name: '铁靴', type: 'boots', quality: 'blue', speed: 18, level: 10 },
            // 绿色装备（+10）
            { id: 'w2', name: '青铜剑', type: 'weapon', quality: 'green', attack: 20, level: 10 },
            { id: 'a2', name: '皮甲', type: 'armor', quality: 'green', defense: 18, level: 10 },
            { id: 'h2', name: '铁盔', type: 'helmet', quality: 'green', hp: 40, level: 10 },
            { id: 'b2', name: '皮靴', type: 'boots', quality: 'green', speed: 10, level: 10 },
            // 白色装备（+10）
            { id: 'w1', name: '铁剑', type: 'weapon', quality: 'white', attack: 10, level: 10 },
            { id: 'a1', name: '布甲', type: 'armor', quality: 'white', defense: 8, level: 10 },
            { id: 'h1', name: '布帽', type: 'helmet', quality: 'white', hp: 20, level: 10 },
            { id: 'b1', name: '布鞋', type: 'boots', quality: 'white', speed: 5, level: 10 }
        ];
        
        return {
            level: 100,  // 玩家满级
            exp: 999999999,
            gold: 999999999,  // 无限金币
            gem: 999999999,   // 无限元宝
            heroes: superHeroes,
            team: superHeroes.slice(0, 5).map(h => h.id),  // 前 5 个武将上阵
            passedLevels: LEVELS.map(l => l.id),  // 已通过所有关卡
            currentLevel: 21,  // 第 21 关
            dailyQuests: {
                1: 10, 2: 10, 3: 10, 4: 10, 5: 10, 6: 10, 7: 5,
                '1_claimed': true, '2_claimed': true, '3_claimed': true,
                '4_claimed': true, '5_claimed': true, '6_claimed': true, '7_claimed': true
            },
            stats: { 
                battleWin: 9999, 
                summonCount: 9999, 
                totalDamage: 999999999,
                afkBattles: 9999,
                afkRewards: 999999999,
                afkTime: 99999
            },
            inventory: allEquipment,
            tutorial: {
                step: 6,
                completed: true
            }
        };
    }
    
    logout() {
        localStorage.removeItem(this.CURRENT_ACCOUNT_KEY);
    }
    
    getCurrentAccount() {
        return localStorage.getItem(this.CURRENT_ACCOUNT_KEY);
    }
    
    isLoggedIn() {
        return this.getCurrentAccount() !== null;
    }
    
    getPlayerData(username) {
        const saved = localStorage.getItem(CONFIG.SAVE_PREFIX + username);
        return saved ? JSON.parse(saved) : this.getDefaultPlayerData();
    }
    
    savePlayerData(username, playerData) {
        try {
            localStorage.setItem(CONFIG.SAVE_PREFIX + username, JSON.stringify(playerData));
            return true;
        } catch (e) {
            console.error('❌ 保存失败', e);
            return false;
        }
    }
    
    getDefaultPlayerData() {
        return {
            level: 1,
            exp: 0,
            gold: 1000,
            gem: 200,
            heroes: [],
            team: [],
            passedLevels: [],
            currentLevel: 1,
            dailyQuests: {},
            stats: { 
                battleWin: 0, 
                summonCount: 0, 
                totalDamage: 0,
                afkBattles: 0,  // 挂机战斗次数
                afkRewards: 0,  // 挂机获得总奖励
                afkTime: 0      // 挂机总时长（分钟）
            },
            inventory: [],
            tutorial: {
                step: 0,  // 0=未开始，1=欢迎，2=招募教学，3=升级教学，4=升星教学，5=装备教学，6=完成
                completed: false
            }
        };
    }
}

const accountManager = new AccountManager();

// ==================== 游戏主类 ====================
class Game {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.ui = null;
        this.player = null;
        this.currentUser = null;
        this.state = {
            screen: 'login',
            battle: null,
            selectedHeroForEquip: null
        };
        this.battleTimer = null;
        this.battleRunning = false;
        this.autoBattle = false;  // 挂机开关
        this.clickCooldown = false;  // 点击冷却标志
        this.lastClickTime = {};  // 记录每个操作的最后点击时间
        this.battleSpeed = 1;  // 战斗速度（1=正常，2=2 倍速）
        
        // 音效系统
        this.audioEnabled = true;
        this.bgmAudio = null;
        this.sfxAudio = {};
        
        setTimeout(() => this.init(), 100);
    }
    
    init() {
        console.log('🎮 三国英雄传 v1.0.0 初始化中...');
        this.canvas = document.getElementById('game-canvas');
        this.ui = document.getElementById('ui-layer');
        
        if (!this.canvas || !this.ui) {
            console.error('❌ 初始化失败');
            return;
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        this.initAudio(); // 初始化音效
        this.checkLoginStatus();
        console.log('✅ 游戏初始化成功！');
    }
    
    resize() {
        const container = document.getElementById('game-container');
        if (container && this.canvas) {
            const rect = container.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
    }
    
    formatNumber(num) {
        if (num >= 10000) return (num / 10000).toFixed(1) + '万';
        return num.toString();
    }
    
    // ========== 音效系统 ==========
    initAudio() {
        try {
            // 创建 BGM 音频
            this.bgmAudio = new Audio();
            this.bgmAudio.loop = true;
            this.bgmAudio.volume = 0.3;
            
            // 预加载音效
            this.loadSFX();
            
            console.log('✅ 音效系统初始化成功');
        } catch (e) {
            console.log('⚠️ 音效系统初始化失败（可能浏览器不支持）', e);
            this.audioEnabled = false;
        }
    }
    
    loadSFX() {
        // 使用 Web Audio API 生成简单音效（无需外部文件）
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        // 按钮点击音效
        this.sfxAudio.click = () => {
            if (!this.audioEnabled) return;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        };
        
        // 升级音效
        this.sfxAudio.upgrade = () => {
            if (!this.audioEnabled) return;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(800, audioContext.currentTime + 0.3);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        };
        
        // 升星音效
        this.sfxAudio.starUpgrade = () => {
            if (!this.audioEnabled) return;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.type = 'triangle';
            oscillator.frequency.setValueAtTime(500, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        };
        
        // 战斗攻击音效
        this.sfxAudio.attack = () => {
            if (!this.audioEnabled) return;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        };
        
        // 技能音效
        this.sfxAudio.skill = () => {
            if (!this.audioEnabled) return;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1000, audioContext.currentTime + 0.4);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
        };
        
        // 胜利音效
        this.sfxAudio.victory = () => {
            if (!this.audioEnabled) return;
            const notes = [523.25, 659.25, 783.99, 1046.50];
            notes.forEach((freq, i) => {
                setTimeout(() => {
                    const oscillator = audioContext.createOscillator();
                    const gainNode = audioContext.createGain();
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContext.destination);
                    oscillator.frequency.value = freq;
                    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                    oscillator.start(audioContext.currentTime);
                    oscillator.stop(audioContext.currentTime + 0.3);
                }, i * 150);
            });
        };
        
        // 失败音效
        this.sfxAudio.defeat = () => {
            if (!this.audioEnabled) return;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.type = 'sawtooth';
            oscillator.frequency.setValueAtTime(300, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.5);
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        };
        
        // 获得物品音效
        this.sfxAudio.getItem = () => {
            if (!this.audioEnabled) return;
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(1200, audioContext.currentTime + 0.2);
            gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
        };
    }
    
    playSFX(sfxName) {
        if (this.audioEnabled && this.sfxAudio[sfxName]) {
            this.sfxAudio[sfxName]();
        }
    }
    
    toggleAudio() {
        this.audioEnabled = !this.audioEnabled;
        if (this.audioEnabled) {
            this.initAudio();
            alert('🔊 音效已开启');
        } else {
            if (this.bgmAudio) {
                this.bgmAudio.pause();
            }
            alert('🔇 音效已关闭');
        }
    }
    
    // 防抖检查：防止快速点击导致重复响应
    canPerformAction(actionName, cooldownMs = 500) {
        const now = Date.now();
        const lastTime = this.lastClickTime[actionName] || 0;
        
        if (now - lastTime < cooldownMs) {
            console.log(`⏱️ 操作冷却中：${actionName} (${now - lastTime}ms / ${cooldownMs}ms)`);
            return false;
        }
        
        this.lastClickTime[actionName] = now;
        return true;
    }
    
    checkLoginStatus() {
        const currentUser = accountManager.getCurrentAccount();
        if (currentUser) {
            this.currentUser = currentUser;
            this.player = accountManager.getPlayerData(currentUser);
            this.showScreen('home');
            this.setupHomeUI();
            this.updateResourceDisplay();
            this.renderDailyQuests();
            
            // 检查是否需要新手引导
            if (!this.player.tutorial || !this.player.tutorial.completed) {
                this.startTutorial();
            }
        } else {
            this.showScreen('login');
            this.renderLoginScreen();
        }
    }
    
    // ========== 登录/注册界面 ==========
    renderLoginScreen() {
        this.ui.innerHTML = `
            <div id="login-screen" class="screen active">
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <div style="background: white; color: #333; padding: 40px; border-radius: 20px; max-width: 400px; width: 90%; text-align: center;">
                        <h1 style="font-size: 32px; margin-bottom: 10px;">🎮 三国英雄传</h1>
                        <h2 style="margin-bottom: 30px; color: #667eea;">👤 账号登录</h2>
                        
                        <input type="text" id="login-username" placeholder="用户名" 
                            style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #ddd; border-radius: 8px; font-size: 16px;">
                        <input type="password" id="login-password" placeholder="密码" 
                            style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #ddd; border-radius: 8px; font-size: 16px;">
                        
                        <button class="btn btn-primary" onclick="game.login()" style="width: 100%; padding: 15px; font-size: 18px; background: #667eea; color: white; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer;">🚀 登录游戏</button>
                        <button class="btn btn-success" onclick="game.showRegister()" style="width: 100%; padding: 15px; font-size: 18px; background: #2ecc71; color: white; border: none; border-radius: 8px; margin-top: 10px; cursor: pointer;">📝 注册新账号</button>
                        
                        <div id="login-message" style="margin-top: 15px; font-weight: bold;"></div>
                        
                        <!-- 隐藏的超级账户入口：控制台输入 game.showSuperAccountCreator() -->
                    </div>
                </div>
            </div>
        `;
        
        // 添加隐藏的键盘快捷键（按 Ctrl+Shift+S 显示超级账户创建界面）
        setTimeout(() => {
            document.addEventListener('keydown', function(e) {
                if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                    e.preventDefault();
                    if (game) game.showSuperAccountCreator();
                }
            });
        }, 100);
    }
    
    showRegister() {
        this.ui.innerHTML = `
            <div id="register-screen" class="screen active">
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                    <div style="background: white; color: #333; padding: 40px; border-radius: 20px; max-width: 400px; width: 90%; text-align: center;">
                        <h2 style="margin-bottom: 30px;">📝 注册新账号</h2>
                        
                        <input type="text" id="reg-username" placeholder="用户名（3-12 位）" 
                            style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #ddd; border-radius: 8px; font-size: 16px;">
                        <input type="password" id="reg-password" placeholder="密码（6 位以上）" 
                            style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #ddd; border-radius: 8px; font-size: 16px;">
                        <input type="password" id="reg-confirm" placeholder="确认密码" 
                            style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #ddd; border-radius: 8px; font-size: 16px;">
                        
                        <button class="btn btn-success" onclick="game.register()" style="width: 100%; padding: 15px; font-size: 18px; background: #2ecc71; color: white; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer;">✅ 立即注册</button>
                        <button class="btn btn-secondary" onclick="game.showLogin()" style="width: 100%; padding: 15px; font-size: 18px; background: #95a5a6; color: white; border: none; border-radius: 8px; margin-top: 10px; cursor: pointer;">← 返回登录</button>
                        
                        <div id="register-message" style="margin-top: 15px; font-weight: bold;"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 显示超级账户创建界面
    showSuperAccountCreator() {
        this.ui.innerHTML = `
            <div id="super-account-screen" class="screen active">
                <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: linear-gradient(135deg, #f39c12, #d35400);">
                    <div style="background: white; color: #333; padding: 40px; border-radius: 20px; max-width: 500px; width: 90%; text-align: center;">
                        <h2 style="margin-bottom: 20px; color: #e74c3c;">👑 创建超级账户</h2>
                        <div style="background: #fff3cd; padding: 15px; border-radius: 10px; margin-bottom: 20px; text-align: left; font-size: 14px;">
                            <strong>⚡ 超级账户特权：</strong>
                            <ul style="margin: 10px 0; padding-left: 20px;">
                                <li>💰 无限金币和元宝（9.9 亿）</li>
                                <li>🎖️ 玩家等级 100 级</li>
                                <li>⚔️ 所有 UR/SSR 武将（满级满星）</li>
                                <li>🛡️ 全套红色装备（强化 +10）</li>
                                <li>🏆 已通过所有关卡</li>
                            </ul>
                        </div>
                        
                        <input type="text" id="super-username" placeholder="用户名（3-12 位）" 
                            style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #f39c12; border-radius: 8px; font-size: 16px;">
                        <input type="password" id="super-password" placeholder="密码（6 位以上）" 
                            style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #f39c12; border-radius: 8px; font-size: 16px;">
                        <input type="password" id="super-confirm" placeholder="确认密码" 
                            style="width: 100%; padding: 12px; margin: 10px 0; border: 2px solid #f39c12; border-radius: 8px; font-size: 16px;">
                        
                        <button class="btn btn-warning" onclick="game.createSuperAccount()" style="width: 100%; padding: 15px; font-size: 18px; background: linear-gradient(135deg, #f39c12, #d35400); color: white; border: none; border-radius: 8px; margin-top: 20px; cursor: pointer;">👑 立即创建超级账户</button>
                        <button class="btn btn-secondary" onclick="game.showLogin()" style="width: 100%; padding: 15px; font-size: 18px; background: #95a5a6; color: white; border: none; border-radius: 8px; margin-top: 10px; cursor: pointer;">← 返回登录</button>
                        
                        <div id="super-account-message" style="margin-top: 15px; font-weight: bold;"></div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // 创建超级账户
    createSuperAccount() {
        const username = document.getElementById('super-username').value.trim();
        const password = document.getElementById('super-password').value.trim();
        const confirmPassword = document.getElementById('super-confirm').value.trim();
        
        if (!username || !password) {
            document.getElementById('super-account-message').textContent = '❌ 用户名和密码不能为空';
            document.getElementById('super-account-message').style.color = '#e74c3c';
            return;
        }
        
        if (username.length < 3 || username.length > 12) {
            document.getElementById('super-account-message').textContent = '❌ 用户名长度应为 3-12 位';
            document.getElementById('super-account-message').style.color = '#e74c3c';
            return;
        }
        
        if (password.length < 6) {
            document.getElementById('super-account-message').textContent = '❌ 密码长度至少 6 位';
            document.getElementById('super-account-message').style.color = '#e74c3c';
            return;
        }
        
        if (password !== confirmPassword) {
            document.getElementById('super-account-message').textContent = '❌ 两次输入的密码不一致';
            document.getElementById('super-account-message').style.color = '#e74c3c';
            return;
        }
        
        const result = accountManager.createSuperAccount(username, password);
        
        document.getElementById('super-account-message').textContent = result.message;
        document.getElementById('super-account-message').style.color = result.success ? '#27ae60' : '#e74c3c';
        
        if (result.success) {
            // 自动登录
            setTimeout(() => {
                accountManager.login(username, password);
                this.checkLoginStatus();
            }, 1500);
        }
    }
    
    showLogin() {
        this.renderLoginScreen();
    }
    
    register() {
        const username = document.getElementById('reg-username').value.trim();
        const password = document.getElementById('reg-password').value.trim();
        const confirm = document.getElementById('reg-confirm').value.trim();
        
        if (!username || username.length < 3 || username.length > 12) {
            document.getElementById('register-message').textContent = '❌ 用户名长度 3-12 位';
            document.getElementById('register-message').style.color = '#e74c3c';
            return;
        }
        
        if (!password || password.length < 6) {
            document.getElementById('register-message').textContent = '❌ 密码长度至少 6 位';
            document.getElementById('register-message').style.color = '#e74c3c';
            return;
        }
        
        if (password !== confirm) {
            document.getElementById('register-message').textContent = '❌ 两次密码不一致';
            document.getElementById('register-message').style.color = '#e74c3c';
            return;
        }
        
        const result = accountManager.createAccount(username, password);
        
        if (result.success) {
            document.getElementById('register-message').textContent = result.message;
            document.getElementById('register-message').style.color = '#2ecc71';
            setTimeout(() => this.showLogin(), 1500);
        } else {
            document.getElementById('register-message').textContent = result.message;
            document.getElementById('register-message').style.color = '#e74c3c';
        }
    }
    
    login() {
        const username = document.getElementById('login-username').value.trim();
        const password = document.getElementById('login-password').value.trim();
        
        if (!username || !password) {
            document.getElementById('login-message').textContent = '❌ 请输入用户名和密码';
            document.getElementById('login-message').style.color = '#e74c3c';
            return;
        }
        
        const result = accountManager.login(username, password);
        
        if (result.success) {
            document.getElementById('login-message').textContent = result.message;
            document.getElementById('login-message').style.color = '#2ecc71';
            setTimeout(() => {
                this.currentUser = username;
                this.player = accountManager.getPlayerData(username);
                this.showScreen('home');
                this.setupHomeUI();
                this.updateResourceDisplay();
                this.renderDailyQuests();
            }, 1000);
        } else {
            document.getElementById('login-message').textContent = result.message;
            document.getElementById('login-message').style.color = '#e74c3c';
        }
    }
    
    logout() {
        if (confirm('确定要退出登录吗？')) {
            accountManager.logout();
            this.currentUser = null;
            this.player = null;
            this.showScreen('login');
            this.renderLoginScreen();
        }
    }
    
    showAccountMenu() {
        const heroCount = this.player.heroes.length;
        const totalGold = this.player.gold;
        alert(`👤 当前账号：${this.currentUser}\n\n🎮 v8.0 新功能：\n- 30 位武将收集（已有${heroCount}位）\n- 武将升级系统\n- 装备系统\n- 优化每日任务\n\n💰 金币：${totalGold}`);
        if (confirm('要退出登录吗？')) {
            this.logout();
        }
    }
    
    // ========== UI 控制 ==========
    showScreen(screenName) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`${screenName}-screen`);
        if (target) {
            target.classList.add('active');
            this.state.screen = screenName;
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
    
    setupHomeUI() {
        this.ui.innerHTML = this.getHomeUI();
        this.updateTeamDisplay();
    }
    
    getHomeUI() {
        return `
            <div id="home-screen" class="screen active">
                <div class="header">
                    <div class="player-info">
                        <span class="level">Lv.${this.player.level}</span>
                        <span class="gold">💰 ${this.formatNumber(this.player.gold)}</span>
                        <span class="gem">💎 ${this.formatNumber(this.player.gem)}</span>
                        <span class="chapter">📍 第${this.player.currentLevel}关</span>
                        <span class="user" style="background: rgba(255,255,255,0.2); padding: 5px 10px; border-radius: 5px;">👤 ${this.currentUser}</span>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <button class="btn btn-sm btn-secondary" onclick="game.showSettings()">⚙️ 设置</button>
                        <button class="btn btn-sm btn-secondary" onclick="game.showAccountMenu()">👤 账号</button>
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
                        <button class="btn btn-warning" onclick="game.showEquipment()">⚔️ 装备</button>
                        <button class="btn btn-secondary" onclick="game.showAFKStats()" style="background: linear-gradient(135deg, #9b59b6, #8e44ad);">📊 挂机统计</button>
                    </div>
                    <div class="daily-quests" style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-top: 20px;">
                        <h3>📋 每日任务（完成送元宝）</h3>
                        <div id="daily-quest-list"></div>
                    </div>
                </div>
            </div>
            
            <div id="level-screen" class="screen">
                <div class="header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>🗺️ 征战天下</h2>
                </div>
                <div class="main-content">
                    <div id="level-list"></div>
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
            
            <div id="equipment-screen" class="screen">
                <div class="header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>⚔️ 装备系统</h2>
                </div>
                <div class="main-content">
                    <div id="equipment-list"></div>
                </div>
            </div>
            
            <div id="summon-modal" class="modal">
                <div class="modal-content" style="max-width: 800px;">
                    <h2>🎴 招募武将（30 位英雄）</h2>
                    <div class="summon-rates" style="display: flex; justify-content: space-around; margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 10px;">
                        <div class="rate"><span>UR</span><span>2%</span></div>
                        <div class="rate"><span>SSR</span><span>8%</span></div>
                        <div class="rate"><span>SR</span><span>25%</span></div>
                        <div class="rate"><span>R</span><span>65%</span></div>
                    </div>
                    <div class="summon-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
                        <button class="btn btn-success" onclick="game.summon(1)" style="position: relative; overflow: hidden;">🎴 招募一次 (100💎)</button>
                        <button class="btn btn-primary" onclick="game.summon(10)" style="position: relative; overflow: hidden;">🎴 招募十次 (1000💎)</button>
                    </div>
                    
                    <div id="summon-pool" style="margin-top: 20px;"></div>
                    
                    <div id="summon-result"></div>
                    <button class="btn btn-secondary" onclick="game.closeModal('summon-modal')" style="margin-top: 15px;">关闭</button>
                </div>
            </div>
            
            <div id="team-editor-modal" class="modal">
                <div class="modal-content" style="max-width: 800px;">
                    <h2>🛡️ 编辑阵容</h2>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div class="current-team" id="current-team"></div>
                        <div class="available-heroes" id="available-heroes"></div>
                    </div>
                    <button class="btn btn-secondary" onclick="game.closeModal('team-editor-modal')">关闭</button>
                </div>
            </div>
        `;
    }
    
    updateTeamDisplay() {
        const slotsDiv = document.getElementById('team-slots');
        if (!slotsDiv) return;
        slotsDiv.innerHTML = `
            <div style="display: flex; gap: 10px; justify-content: center; flex-wrap: wrap;">
                ${Array(5).fill(null).map((_, i) => {
                    const heroId = this.player.team[i];
                    const hero = this.player.heroes.find(h => h.id === heroId);
                    const template = hero ? HERO_DATABASE.find(h => h.id === heroId) : null;
                    return `<div style="width: 60px; height: 60px; background: ${hero ? '#3498db' : '#ecf0f1'}; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 24px;" title="${hero ? hero.name : '空位'}">${hero ? (template?.icon || '⭐') : '➕'}</div>`;
                }).join('')}
            </div>
        `;
    }
    
    updateResourceDisplay() {
        const goldEl = document.querySelector('.gold');
        const gemEl = document.querySelector('.gem');
        if (goldEl) goldEl.textContent = `💰 ${this.formatNumber(this.player.gold)}`;
        if (gemEl) gemEl.textContent = `💎 ${this.formatNumber(this.player.gem)}`;
    }
    
    saveGame() {
        if (this.currentUser) {
            accountManager.savePlayerData(this.currentUser, this.player);
        }
    }
    
    // ========== 武将升级系统（完整实现）====================
    upgradeHero(heroIndex, autoUpgrade = false) {
        // 防抖检查：防止快速点击
        if (!this.canPerformAction('upgradeHero', 500)) {
            if (!autoUpgrade) {
                console.log('⚠️ 升级操作过于频繁，请稍后再试');
            }
            return;
        }
        
        const hero = this.player.heroes[heroIndex];
        if (!hero) return;
        
        const maxLevel = 100;
        if (hero.level >= maxLevel) {
            this.showModalBox('等级已满', '⚠️ 武将已达满级 100 级');
            return;
        }
        
        const cost = hero.level * 100;
        if (this.player.gold < cost) {
            this.showModalBox('金币不足', `❌ 金币不足！\n需要 ${cost} 金币\n当前 ${this.player.gold} 金币`);
            return;
        }
        
        this.playSFX('click'); // 播放点击音效
        
        const oldStats = {
            hp: hero.hp,
            attack: hero.attack,
            defense: hero.defense,
            speed: hero.speed
        };
        
        this.player.gold -= cost;
        const oldLevel = hero.level || 1;
        hero.level = oldLevel + 1;
        
        const growth = this.getHeroGrowth(hero.rarity);
        hero.hp += growth.hp;
        hero.attack += growth.attack;
        hero.defense += growth.defense;
        hero.speed += growth.speed;
        
        this.updateDailyQuest('hero_upgrade');
        
        if (autoUpgrade) {
            // 一键升级模式：继续检查是否能升级
            if (hero.level < maxLevel) {
                const nextCost = hero.level * 100;
                if (this.player.gold >= nextCost) {
                    this.upgradeHero(heroIndex, true);
                    return;
                }
            }
            // 金币不足或已满级，显示总结
            this.updateResourceDisplay();
            this.showHeroList();
            this.showModalBox('升级完成', `✅ 一键升级完成！\n${hero.name} 从 Lv.${oldLevel} → Lv.${hero.level}\n消耗金币：${cost}`, true, 2000);
        } else {
            // 单级升级模式：只显示升级结果，不询问是否继续
            this.updateResourceDisplay();
            this.showHeroList();
            alert(
                `✅ 升级成功！\n\n` +
                `${hero.name} 从 Lv.${oldLevel} → Lv.${hero.level}\n\n` +
                `属性提升：\n` +
                `❤️ HP: ${oldStats.hp} → ${hero.hp} (+${growth.hp})\n` +
                `⚔️ 攻击：${oldStats.attack} → ${hero.attack} (+${growth.attack})\n` +
                `🛡️ 防御：${oldStats.defense} → ${hero.defense} (+${growth.defense})\n` +
                `💨 速度：${oldStats.speed} → ${hero.speed} (+${growth.speed})\n\n` +
                `消耗：💰 ${cost} 金币`
            );
        }
    }
    
    // 一键升级到满级或金币不足
    upgradeHeroMax(heroIndex) {
        const hero = this.player.heroes[heroIndex];
        if (!hero) return;
        
        const maxLevel = 100;
        if (hero.level >= maxLevel) {
            this.showToast('⚠️ 武将已达满级 100 级');
            return;
        }
        
        const startLevel = hero.level;
        let totalCost = 0;
        let upgradedLevels = 0;
        
        // 计算能升到多少级
        while (hero.level < maxLevel) {
            const cost = hero.level * 100;
            if (this.player.gold < cost) {
                break;
            }
            totalCost += cost;
            hero.level++;
            upgradedLevels++;
        }
        
        if (upgradedLevels === 0) {
            this.showToast('❌ 金币不足！');
            return;
        }
        
        // 重新计算属性
        const baseHero = HERO_DATABASE.find(h => h.id === hero.id);
        if (baseHero) {
            const growth = this.getHeroGrowth(hero.rarity);
            hero.hp = baseHero.hp + (hero.level - 1) * growth.hp;
            hero.attack = baseHero.attack + (hero.level - 1) * growth.attack;
            hero.defense = baseHero.defense + (hero.level - 1) * growth.defense;
            hero.speed = baseHero.speed + (hero.level - 1) * growth.speed;
            
            // 加上装备加成
            if (hero.equipment) {
                Object.values(hero.equipment).forEach(equip => {
                    if (equip) {
                        if (equip.hp) hero.hp += equip.hp;
                        if (equip.attack) hero.attack += equip.attack;
                        if (equip.defense) hero.defense += equip.defense;
                        if (equip.speed) hero.speed += equip.speed;
                    }
                });
            }
        }
        
        this.player.gold -= totalCost;
        this.updateDailyQuest('hero_upgrade');
        
        alert(
            `✅ 一键升级完成！\n\n` +
            `${hero.name} 从 Lv.${startLevel} → Lv.${hero.level}\n` +
            `共提升 ${upgradedLevels} 级\n\n` +
            `消耗：💰 ${totalCost} 金币`
        );
        
        this.updateResourceDisplay();
        this.showHeroList();
    }
    
    getHeroGrowth(rarity) {
        const growths = {
            UR: { hp: 15, attack: 8, defense: 5, speed: 3 },
            SSR: { hp: 12, attack: 6, defense: 4, speed: 2 },
            SR: { hp: 10, attack: 5, defense: 3, speed: 2 },
            R: { hp: 8, attack: 4, defense: 2, speed: 1 },
            N: { hp: 5, attack: 3, defense: 1, speed: 1 }
        };
        return growths[rarity] || growths.R;
    }
    
    // ========== 武将升星系统（新增）====================
    upgradeHeroStar(heroIndex) {
        // 防抖检查：防止快速点击
        if (!this.canPerformAction('upgradeHeroStar', 1000)) {
            console.log('⚠️ 升星操作过于频繁，请稍后再试');
            return;
        }
        
        const hero = this.player.heroes[heroIndex];
        if (!hero) return;
        
        // 检查武将是否在阵容中
        if (this.player.team.includes(hero.id)) {
            this.showToast('⚠️ 该武将正在阵容中，请先下阵后再升星！');
            return;
        }
        
        // 严格验证星级
        const maxStar = 5;
        if (typeof hero.star !== 'number' || hero.star < 0) {
            hero.star = 0; // 修复异常星级
        }
        if (hero.star >= maxStar) {
            alert('⭐ 武将已达满星 5 星，无法继续升星');
            return;
        }
        
        // 计算需要的重复武将数量（0 星→1 星需要 1 个，1 星→2 星需要 2 个，依此类推）
        const requiredCopies = hero.star + 1;
        
        // 严格验证需求数量
        if (requiredCopies <= 0 || requiredCopies > 5) {
            this.showToast('❌ 升星条件错误，请重新尝试');
            return;
        }
        
        // 统计重复武将数量（使用索引比较，更可靠）
        const sameHeroIndices = [];
        this.player.heroes.forEach((h, index) => {
            if (h.id === hero.id) {
                sameHeroIndices.push(index);
            }
        });
        
        const availableCopies = sameHeroIndices.length - 1; // 减去当前武将
        
        // 严格验证是否有足够的重复武将
        if (availableCopies < requiredCopies) {
            this.showModalBox('升星失败', `❌ 重复武将不足！\n需要 ${requiredCopies} 个重复武将\n当前 ${availableCopies} 个`);
            return;
        }
        
        // 确认升星
        const confirmUpgrade = confirm(
            `⭐ 确认升星吗？\n\n` +
            `${hero.name} ${hero.star}星 → ${hero.star + 1}星\n` +
            `消耗：${requiredCopies} 个重复武将\n\n` +
            `升星后所有属性提升 20%！`
        );
        
        if (!confirmUpgrade) return;
        
        // 保存旧属性
        const oldStats = {
            hp: hero.hp,
            attack: hero.attack,
            defense: hero.defense,
            speed: hero.speed
        };
        
        // 移除重复武将（从后往前删除，避免索引问题）
        // 保留第一个（当前武将），删除后面的 requiredCopies 个
        let removedCount = 0;
        for (let i = sameHeroIndices.length - 1; i >= 1 && removedCount < requiredCopies; i--) {
            this.player.heroes.splice(sameHeroIndices[i], 1);
            removedCount++;
        }
        
        // 验证是否成功移除了正确数量的武将
        if (removedCount !== requiredCopies) {
            this.showToast('❌ 升星失败：无法移除重复武将');
            return;
        }
        
        // 升星并提升属性
        hero.star++;
        
        // 再次验证星级是否超过最大值
        if (hero.star > maxStar) {
            this.showToast('❌ 升星失败：星级超过最大值');
            hero.star = maxStar;
            return;
        }
        
        this.playSFX('starUpgrade'); // 播放升星音效
        
        const starBonus = 1 + (hero.star * 0.2); // 1 星 1.2 倍，2 星 1.4 倍，依此类推
        
        // 重新计算属性（基于基础属性 + 等级成长）
        const baseHero = HERO_DATABASE.find(h => h.id === hero.id);
        if (baseHero) {
            const growth = this.getHeroGrowth(hero.rarity);
            const baseHp = baseHero.hp + (hero.level - 1) * growth.hp;
            const baseAttack = baseHero.attack + (hero.level - 1) * growth.attack;
            const baseDefense = baseHero.defense + (hero.level - 1) * growth.defense;
            const baseSpeed = baseHero.speed + (hero.level - 1) * growth.speed;
            
            hero.hp = Math.floor(baseHp * starBonus);
            hero.attack = Math.floor(baseAttack * starBonus);
            hero.defense = Math.floor(baseDefense * starBonus);
            hero.speed = Math.floor(baseSpeed * starBonus);
            
            // 加上装备加成
            if (hero.equipment) {
                Object.values(hero.equipment).forEach(equip => {
                    if (equip) {
                        if (equip.hp) hero.hp += equip.hp;
                        if (equip.attack) hero.attack += equip.attack;
                        if (equip.defense) hero.defense += equip.defense;
                        if (equip.speed) hero.speed += equip.speed;
                    }
                });
            }
        }
        
        this.updateResourceDisplay();
        this.saveGame(); // 保存游戏
        
        // 刷新当前界面（如果在武将列表界面）
        const currentScreen = document.querySelector('.screen.active');
        if (currentScreen && currentScreen.id === 'hero-list-screen') {
            this.showHeroList(); // 刷新武将列表
        }
        
        alert(
            `⭐ 升星成功！\n\n` +
            `${hero.name} ${hero.star - 1}星 → ${hero.star}星\n\n` +
            `属性提升：\n` +
            `❤️ HP: ${oldStats.hp} → ${hero.hp} (+${hero.hp - oldStats.hp})\n` +
            `⚔️ 攻击：${oldStats.attack} → ${hero.attack} (+${hero.attack - oldStats.attack})\n` +
            `🛡️ 防御：${oldStats.defense} → ${hero.defense} (+${hero.defense - oldStats.defense})\n` +
            `💨 速度：${oldStats.speed} → ${hero.speed} (+${hero.speed - oldStats.speed})`
        );
    }
    
    // ========== 装备系统（完整实现）====================
    showEquipment() {
        this.showScreen('equipment');
        // 如果没有选中武将，默认选中第一个
        if (!this.state.selectedHeroForEquip) {
            this.state.selectedHeroForEquip = this.player.heroes.length > 0 ? 0 : null;
        }
        this.renderEquipmentList();
    }
    
    // 渲染装备界面（添加强化按钮）
    renderEquipmentList() {
        const listDiv = document.getElementById('equipment-list');
        if (!listDiv) return;
        
        // 添加强化功能入口
        let html = `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px; display: flex; justify-content: space-between; align-items: center;">
                <h3>⚔️ 装备管理</h3>
                <div style="display: flex; gap: 10px;">
                    <button class="btn btn-primary" onclick="game.showEnhanceUI()" style="padding: 10px 20px; background: linear-gradient(135deg, #e74c3c, #c0392b);">✨ 装备强化</button>
                    <button class="btn btn-warning" onclick="game.showBatchSellUI()" style="padding: 10px 20px; background: linear-gradient(135deg, #f39c12, #d35400);">💰 批量出售</button>
                </div>
            </div>
        `;
        
        // 如果没有武将
        if (this.player.heroes.length === 0) {
            listDiv.innerHTML = html + '<div style="text-align: center; padding: 50px; color: #999;">暂无武将，请先招募武将</div>';
            return;
        }
        
        // 显示武将选择器
        html += `
            <div style="background: rgba(255,255,255,0.1); padding: 15px; border-radius: 15px; margin-bottom: 20px;">
                <h3>👤 选择武将</h3>
                <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-top: 10px;">
                    ${this.player.heroes.map((hero, index) => {
                        const template = HERO_DATABASE.find(h => h.id === hero.id) || hero;
                        const isSelected = index === this.state.selectedHeroForEquip;
                        return `
                            <button class="btn" onclick="game.selectHeroForEquip(${index})" style="background: ${isSelected ? '#f39c12' : '#34495e'}; color: white; border: 2px solid ${isSelected ? '#fff' : 'transparent'};">
                                ${template.icon || '⭐'} ${template.name}
                            </button>
                        `;
                    }).join('')}
                </div>
            </div>
        `;
        
        const selectedHero = this.player.heroes[this.state.selectedHeroForEquip];
        if (!selectedHero) {
            listDiv.innerHTML = html;
            return;
        }
        
        const equipmentTypes = [
            { key: 'weapon', name: '武器', icon: '⚔️' },
            { key: 'armor', name: '铠甲', icon: '🛡️' },
            { key: 'helmet', name: '头盔', icon: '🪖' },
            { key: 'boots', name: '战靴', icon: '👢' }
        ];
        
        equipmentTypes.forEach(slot => {
            const equipped = selectedHero.equipment[slot.key];
            html += `
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                    <h3>${slot.icon} ${slot.name}</h3>
                    ${equipped ? `
                        <div style="background: linear-gradient(135deg, ${QUALITY_COLORS[equipped.quality]} 0%, #333 100%); padding: 15px; border-radius: 10px; margin: 10px 0; color: white;">
                            <div style="font-size: 18px; font-weight: bold;">${equipped.name}</div>
                            <div style="font-size: 14px; margin-top: 5px;">品质：${QUALITY_NAMES[equipped.quality]}</div>
                            <div style="font-size: 14px; margin-top: 5px;">属性：+${this.getEquipAttrValue(equipped)}</div>
                            <button class="btn btn-sm" onclick="game.unequipItem('${slot.key}')" style="margin-top: 10px; background: #e74c3c;">卸下</button>
                        </div>
                    ` : `
                        <div style="background: #ecf0f1; padding: 15px; border-radius: 10px; margin: 10px 0; color: #999;">
                            未装备
                        </div>
                    `}
                </div>
            `;
        });
        
        const bagEquipment = this.player.inventory.filter(item => 
            equipmentTypes.some(t => t.key === item.type)
        );
        
        if (bagEquipment.length > 0) {
            html += `
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px;">
                    <h3>🎒 背包（${bagEquipment.length}件）</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; margin-top: 15px;">
                        ${bagEquipment.map((item, index) => {
                            const realIndex = this.player.inventory.indexOf(item);
                            return `
                                <div style="background: linear-gradient(135deg, ${QUALITY_COLORS[item.quality]} 0%, #333 100%); padding: 10px; border-radius: 8px; color: white; cursor: pointer;" onclick="game.equipItemToHero(${realIndex})">
                                    <div style="font-weight: bold; font-size: 14px;">${item.name}</div>
                                    <div style="font-size: 11px;">${QUALITY_NAMES[item.quality]}</div>
                                    <div style="font-size: 12px; margin-top: 5px;">+${this.getEquipAttrValue(item)}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } else {
            html += `
                <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-top: 20px;">
                    <h3>🎒 背包</h3>
                    <div style="color: #999; text-align: center; padding: 20px;">没有装备</div>
                </div>
            `;
        }
        
        listDiv.innerHTML = html;
    }
    
    selectHeroForEquip(index) {
        this.state.selectedHeroForEquip = index;
        this.renderEquipmentList();
    }
    
    getEquipAttrValue(item) {
        if (item.attack) return `${item.attack} 攻击`;
        if (item.defense) return `${item.defense} 防御`;
        if (item.hp) return `${item.hp} 血量`;
        if (item.speed) return `${item.speed} 速度`;
        return '';
    }
    
    equipItemToHero(index) {
        // 防抖检查：防止快速点击
        if (!this.canPerformAction('equipItem', 500)) {
            console.log('⚠️ 装备操作过于频繁，请稍后再试');
            return;
        }
        
        const item = this.player.inventory[index];
        if (!item) return;
        
        const selectedHero = this.player.heroes[this.state.selectedHeroForEquip];
        if (!selectedHero) {
            alert('请先选择武将');
            return;
        }
        
        const type = item.type;
        const equipped = selectedHero.equipment[type];
        
        if (equipped) {
            this.player.inventory.push(equipped);
        }
        
        selectedHero.equipment[type] = item;
        this.player.inventory.splice(index, 1);
        
        this.updateTeamStats();
        this.renderEquipmentList();
        this.saveGame();
        
        this.updateDailyQuest('equip_upgrade');
    }
    
    unequipItem(type) {
        // 防抖检查：防止快速点击
        if (!this.canPerformAction('unequipItem', 500)) {
            console.log('⚠️ 卸下装备操作过于频繁，请稍后再试');
            return;
        }
        
        const selectedHero = this.player.heroes[this.state.selectedHeroForEquip];
        const equipped = selectedHero?.equipment[type];
        if (!equipped) return;
        
        this.player.inventory.push(equipped);
        selectedHero.equipment[type] = null;
        
        this.updateTeamStats();
        this.renderEquipmentList();
        this.saveGame();
    }
    
    // 批量出售装备
    sellEquipmentBatch(quality, confirmSell = true) {
        // 防抖检查
        if (!this.canPerformAction('sellBatch', 1000)) {
            console.log('⚠️ 批量操作过于频繁，请稍后再试');
            return;
        }
        
        // 筛选指定品质的装备（不包括已穿戴的）
        const wornEquipment = new Set();
        this.player.heroes.forEach(hero => {
            Object.values(hero.equipment).forEach(equip => {
                if (equip) wornEquipment.add(equip.id + (equip.level || ''));
            });
        });
        
        const sellableItems = [];
        this.player.inventory.forEach((item, index) => {
            const itemKey = item.id + (item.level || '');
            if (item.quality === quality && !wornEquipment.has(itemKey)) {
                sellableItems.push(index);
            }
        });
        
        if (sellableItems.length === 0) {
            alert(`⚠️ 没有可出售的 ${QUALITY_NAMES[quality]} 品质装备`);
            return;
        }
        
        // 计算出售价格
        const basePrice = {
            white: 10,
            green: 25,
            blue: 50,
            purple: 100,
            orange: 200,
            red: 500
        };
        
        const totalPrice = sellableItems.length * (basePrice[quality] || 10);
        
        if (confirmSell) {
            const confirm = confirm(
                `💰 批量出售装备\n\n` +
                `出售品质：${QUALITY_NAMES[quality]}\n` +
                `出售数量：${sellableItems.length} 件\n` +
                `获得金币：${totalPrice}\n\n` +
                `⚠️ 注意：已穿戴的装备不会被出售\n\n` +
                `是否确认出售？`
            );
            
            if (!confirm) return;
        }
        
        // 移除装备（从后往前删除）
        sellableItems.sort((a, b) => b - a);
        sellableItems.forEach(index => {
            this.player.inventory.splice(index, 1);
        });
        
        // 添加金币
        this.player.gold += totalPrice;
        
        this.updateResourceDisplay();
        this.renderEquipmentList();
        this.saveGame();
        
        if (confirmSell) {
            alert(`✅ 出售成功！\n获得 ${totalPrice} 金币`);
        }
        
        return {
            count: sellableItems.length,
            gold: totalPrice
        };
    }
    
    // 显示批量出售界面
    showBatchSellUI() {
        this.showScreen('equipment');
        
        setTimeout(() => {
            const content = document.getElementById('equipment-content');
            if (!content) return;
            
            let html = `
                <div style="padding: 20px;">
                    <h3 style="text-align: center; margin-bottom: 20px;">💰 批量出售装备</h3>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <h4>📋 出售说明</h4>
                        <ul style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.8;">
                            <li>选择要出售的装备品质（可多选）</li>
                            <li>该品质的所有未穿戴装备将被出售</li>
                            <li>已穿戴的装备不会被出售</li>
                            <li>获得金币返还</li>
                        </ul>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <h4>🎯 选择出售品质</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 15px; margin-top: 15px;">
                            ${Object.keys(QUALITY_NAMES).map(quality => `
                                <label style="background: linear-gradient(135deg, ${QUALITY_COLORS[quality]}, #333); padding: 15px; border-radius: 10px; color: white; cursor: pointer; display: flex; align-items: center; justify-content: space-between; transition: all 0.3s;">
                                    <div style="display: flex; align-items: center;">
                                        <input type="checkbox" id="sell-${quality}" value="${quality}" style="margin-right: 10px; transform: scale(1.3);" onchange="game.previewSell()">
                                        <span style="font-size: 16px;">${QUALITY_NAMES[quality]}</span>
                                    </div>
                                    <span id="count-${quality}" style="background: rgba(255,255,255,0.3); padding: 5px 10px; border-radius: 20px; font-size: 14px;">0 件</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div id="sell-preview" style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px; display: none;">
                        <h4>📊 出售预览</h4>
                        <div style="margin-top: 15px; color: white;">
                            <div style="font-size: 16px; margin-bottom: 10px;">总数量：<span id="total-count" style="color: #f39c12; font-weight: bold; font-size: 20px;">0</span> 件</div>
                            <div style="font-size: 16px;">总价格：<span id="total-price" style="color: #f39c12; font-weight: bold; font-size: 20px;">0</span> 金币</div>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; text-align: center;">
                        <button class="btn btn-warning" onclick="game.sellSelectedBatch()" style="padding: 15px 40px; font-size: 18px;">💰 确认出售</button>
                        <button class="btn btn-secondary" onclick="game.showScreen('home')" style="padding: 15px 40px; font-size: 18px; margin-left: 10px;">返回</button>
                    </div>
                </div>
            `;
            
            content.innerHTML = html;
            
            // 初始化显示各品质的数量
            this.updateSellCounts();
        }, 100);
    }
    
    // 更新各品质装备的数量显示
    updateSellCounts() {
        const wornEquipment = new Set();
        this.player.heroes.forEach(hero => {
            Object.values(hero.equipment).forEach(equip => {
                if (equip) wornEquipment.add(equip.id + (equip.level || ''));
            });
        });
        
        const counts = {};
        Object.keys(QUALITY_NAMES).forEach(quality => {
            counts[quality] = 0;
        });
        
        this.player.inventory.forEach(item => {
            const itemKey = item.id + (item.level || '');
            if (!wornEquipment.has(itemKey)) {
                counts[item.quality] = (counts[item.quality] || 0) + 1;
            }
        });
        
        Object.keys(counts).forEach(quality => {
            const countEl = document.getElementById(`count-${quality}`);
            if (countEl) {
                countEl.textContent = `${counts[quality]} 件`;
            }
        });
    }
    
    // 预览出售
    previewSell() {
        const selectedQualities = [];
        Object.keys(QUALITY_NAMES).forEach(quality => {
            const checkbox = document.getElementById(`sell-${quality}`);
            if (checkbox && checkbox.checked) {
                selectedQualities.push(quality);
            }
        });
        
        if (selectedQualities.length === 0) {
            const previewDiv = document.getElementById('sell-preview');
            if (previewDiv) previewDiv.style.display = 'none';
            return;
        }
        
        const wornEquipment = new Set();
        this.player.heroes.forEach(hero => {
            Object.values(hero.equipment).forEach(equip => {
                if (equip) wornEquipment.add(equip.id + (equip.level || ''));
            });
        });
        
        let totalCount = 0;
        let totalPrice = 0;
        
        const basePrice = {
            white: 10,
            green: 25,
            blue: 50,
            purple: 100,
            orange: 200,
            red: 500
        };
        
        this.player.inventory.forEach(item => {
            const itemKey = item.id + (item.level || '');
            if (!wornEquipment.has(itemKey) && selectedQualities.includes(item.quality)) {
                totalCount++;
                totalPrice += basePrice[item.quality] || 10;
            }
        });
        
        const previewDiv = document.getElementById('sell-preview');
        const totalCountEl = document.getElementById('total-count');
        const totalPriceEl = document.getElementById('total-price');
        
        if (previewDiv) previewDiv.style.display = 'block';
        if (totalCountEl) totalCountEl.textContent = totalCount;
        if (totalPriceEl) totalPriceEl.textContent = totalPrice;
    }
    
    // 出售选中的装备
    sellSelectedBatch() {
        const selectedQualities = [];
        Object.keys(QUALITY_NAMES).forEach(quality => {
            const checkbox = document.getElementById(`sell-${quality}`);
            if (checkbox && checkbox.checked) {
                selectedQualities.push(quality);
            }
        });
        
        if (selectedQualities.length === 0) {
            this.showToast('⚠️ 请至少选择一个品质');
            return;
        }
        
        const wornEquipment = new Set();
        this.player.heroes.forEach(hero => {
            Object.values(hero.equipment).forEach(equip => {
                if (equip) wornEquipment.add(equip.id + (equip.level || ''));
            });
        });
        
        const sellableIndices = [];
        const basePrice = {
            white: 10,
            green: 25,
            blue: 50,
            purple: 100,
            orange: 200,
            red: 500
        };
        
        let totalCount = 0;
        let totalPrice = 0;
        
        this.player.inventory.forEach((item, index) => {
            const itemKey = item.id + (item.level || '');
            if (!wornEquipment.has(itemKey) && selectedQualities.includes(item.quality)) {
                sellableIndices.push(index);
                totalCount++;
                totalPrice += basePrice[item.quality] || 10;
            }
        });
        
        if (totalCount === 0) {
            this.showToast('⚠️ 没有可出售的装备');
            return;
        }
        
        const confirm = confirm(
            `💰 批量出售装备\n\n` +
            `出售品质：${selectedQualities.map(q => QUALITY_NAMES[q]).join('、')}\n` +
            `出售数量：${totalCount} 件\n` +
            `获得金币：${totalPrice}\n\n` +
            `⚠️ 注意：已穿戴的装备不会被出售\n\n` +
            `是否确认出售？`
        );
        
        if (!confirm) return;
        
        // 移除装备（从后往前删除）
        sellableIndices.sort((a, b) => b - a);
        sellableIndices.forEach(index => {
            this.player.inventory.splice(index, 1);
        });
        
        // 添加金币
        this.player.gold += totalPrice;
        
        this.updateResourceDisplay();
        this.renderEquipmentList();
        this.saveGame();
        
        this.showModalBox('出售成功', `✅ 出售成功！\n获得 ${totalPrice} 金币`, true, 2000);
        
        // 刷新界面
        this.showBatchSellUI();
    }
    
    // 装备强化系统
    enhanceEquipment(index, materialIndices, autoEnhanceMax = false) {
        // 防抖检查
        if (!this.canPerformAction('enhanceEquip', 1000)) {
            console.log('⚠️ 强化操作过于频繁，请稍后再试');
            return;
        }
        
        const targetEquip = this.player.inventory[index];
        if (!targetEquip) {
            this.showToast('❌ 请选择要强化的装备');
            return;
        }
        
        const maxLevel = 10;
        const currentLevel = targetEquip.level || 1;
        
        if (currentLevel >= maxLevel) {
            this.showToast('⚠️ 装备已达满级，无法继续强化');
            return;
        }
        
        // 一键强化到满级逻辑
        if (autoEnhanceMax) {
            this.enhanceToMaxLevel(index);
            return;
        }
        
        // 检查是否有强化材料
        if (!materialIndices || materialIndices.length === 0) {
            this.showToast('❌ 请选择强化材料（至少 1 件装备）');
            return;
        }
        
        // 检查材料装备是否足够
        if (materialIndices.length > this.player.inventory.length - 1) {
            this.showToast('❌ 强化材料数量不足');
            return;
        }
        
        // 计算强化经验（根据材料装备的品质）
        let enhanceExp = 0;
        const qualityExp = {
            white: 10,
            green: 25,
            blue: 50,
            purple: 100,
            orange: 200,
            red: 400
        };
        
        materialIndices.forEach(matIndex => {
            const matEquip = this.player.inventory[matIndex];
            if (matEquip) {
                enhanceExp += qualityExp[matEquip.quality] || 10;
            }
        });
        
        // 显示强化预览
        const expNeeded = currentLevel * 100;
        const confirmEnhance = confirm(
            `⚔️ 装备强化预览\n\n` +
            `目标装备：${targetEquip.name} (+${currentLevel})\n` +
            `强化经验：+${enhanceExp}\n` +
            `需要经验：${expNeeded}\n` +
            `消耗材料：${materialIndices.length} 件装备\n\n` +
            `是否确认强化？`
        );
        
        if (!confirmEnhance) return;
        
        // 保存旧属性
        const oldAttr = this.getEquipAttrValue(targetEquip);
        
        // 移除材料装备（从后往前删除，避免索引问题）
        materialIndices.sort((a, b) => b - a);
        materialIndices.forEach(matIndex => {
            this.player.inventory.splice(matIndex, 1);
        });
        
        // 增加强化经验
        targetEquip.enhanceExp = (targetEquip.enhanceExp || 0) + enhanceExp;
        targetEquip.level = targetEquip.level || 1;
        
        // 检查是否升级
        while (targetEquip.enhanceExp >= targetEquip.level * 100 && targetEquip.level < maxLevel) {
            targetEquip.enhanceExp -= targetEquip.level * 100;
            targetEquip.level++;
            
            // 提升属性（每件装备类型提升不同属性）
            if (targetEquip.attack) targetEquip.attack += Math.floor(targetEquip.attack * 0.1);
            if (targetEquip.defense) targetEquip.defense += Math.floor(targetEquip.defense * 0.1);
            if (targetEquip.hp) targetEquip.hp += Math.floor(targetEquip.hp * 0.1);
            if (targetEquip.speed) targetEquip.speed += Math.floor(targetEquip.speed * 0.1);
        }
        
        const newAttr = this.getEquipAttrValue(targetEquip);
        
        this.updateTeamStats();
        this.renderEquipmentList();
        this.saveGame();
        this.updateDailyQuest('equip_upgrade');
        
        alert(
            `✅ 强化成功！\n\n` +
            `${targetEquip.name} +${currentLevel} → +${targetEquip.level}\n` +
            `属性：${oldAttr} → ${newAttr}`
        );
    }
    
    // 一键强化到满级
    enhanceToMaxLevel(index) {
        const targetEquip = this.player.inventory[index];
        if (!targetEquip) {
            this.showToast('❌ 请选择要强化的装备');
            return;
        }
        
        const currentLevel = targetEquip.level || 1;
        const maxLevel = 10;
        
        if (currentLevel >= maxLevel) {
            this.showToast('⚠️ 装备已达满级，无法继续强化');
            return;
        }
        
        // 计算强化到满级需要的经验
        let totalExpNeeded = 0;
        for (let lvl = currentLevel; lvl < maxLevel; lvl++) {
            totalExpNeeded += lvl * 100;
        }
        
        // 计算需要的材料
        const qualityExp = {
            white: 10,
            green: 25,
            blue: 50,
            purple: 100,
            orange: 200,
            red: 400
        };
        
        // 筛选可用的材料装备（排除已穿戴的和目标装备本身）
        const wornEquipment = new Set();
        this.player.heroes.forEach(hero => {
            Object.values(hero.equipment).forEach(equip => {
                if (equip) wornEquipment.add(equip.id + (equip.level || ''));
            });
        });
        
        const availableMaterials = [];
        this.player.inventory.forEach((item, idx) => {
            if (idx !== index) {
                const itemKey = item.id + (item.level || '');
                if (!wornEquipment.has(itemKey)) {
                    availableMaterials.push({
                        index: idx,
                        exp: qualityExp[item.quality] || 10,
                        item: item
                    });
                }
            }
        });
        
        // 按经验值排序，优先使用低品质材料
        availableMaterials.sort((a, b) => a.exp - b.exp);
        
        // 累计经验直到满足需求
        let totalExp = 0;
        const materialsToUse = [];
        for (const mat of availableMaterials) {
            materialsToUse.push(mat.index);
            totalExp += mat.exp;
            if (totalExp >= totalExpNeeded) break;
        }
        
        if (totalExp < totalExpNeeded) {
            const confirm = confirm(
                `⚠️ 材料不足提示\n\n` +
                `强化到满级需要经验：${totalExpNeeded}\n` +
                `当前可用材料总经验：${totalExp}\n\n` +
                `是否使用所有可用材料进行强化？`
            );
            if (!confirm) return;
        } else {
            const confirm = confirm(
                `⚔️ 一键强化到满级\n\n` +
                `目标装备：${targetEquip.name} (+${currentLevel})\n` +
                `需要经验：${totalExpNeeded}\n` +
                `消耗材料：${materialsToUse.length} 件装备\n\n` +
                `是否确认强化到 +10？`
            );
            if (!confirm) return;
        }
        
        // 保存旧属性
        const oldAttr = this.getEquipAttrValue(targetEquip);
        
        // 移除材料装备（从后往前删除）
        materialsToUse.sort((a, b) => b - a);
        materialsToUse.forEach(matIndex => {
            this.player.inventory.splice(matIndex, 1);
        });
        
        // 增加强化经验并升级
        targetEquip.enhanceExp = (targetEquip.enhanceExp || 0) + totalExp;
        targetEquip.level = targetEquip.level || 1;
        
        while (targetEquip.enhanceExp >= targetEquip.level * 100 && targetEquip.level < maxLevel) {
            targetEquip.enhanceExp -= targetEquip.level * 100;
            targetEquip.level++;
            
            // 提升属性
            if (targetEquip.attack) targetEquip.attack += Math.floor(targetEquip.attack * 0.1);
            if (targetEquip.defense) targetEquip.defense += Math.floor(targetEquip.defense * 0.1);
            if (targetEquip.hp) targetEquip.hp += Math.floor(targetEquip.hp * 0.1);
            if (targetEquip.speed) targetEquip.speed += Math.floor(targetEquip.speed * 0.1);
        }
        
        const newAttr = this.getEquipAttrValue(targetEquip);
        
        this.updateTeamStats();
        this.renderEquipmentList();
        this.saveGame();
        this.updateDailyQuest('equip_upgrade');
        
        alert(
            `✅ 强化成功！\n\n` +
            `${targetEquip.name} +${currentLevel} → +${targetEquip.level}\n` +
            `属性：${oldAttr} → ${newAttr}`
        );
    }
    
    // 显示装备强化界面
    showEnhanceUI() {
        if (this.player.inventory.length < 2) {
            this.showToast('⚠️ 背包中至少需要 2 件装备才能强化');
            return;
        }
        
        this.showScreen('equipment');
        
        setTimeout(() => {
            const content = document.getElementById('equipment-content');
            if (!content) return;
            
            let html = `
                <div style="padding: 20px;">
                    <h3 style="text-align: center; margin-bottom: 20px;">⚔️ 装备强化系统</h3>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px; margin-bottom: 20px;">
                        <h4>📋 强化说明</h4>
                        <ul style="color: rgba(255,255,255,0.8); font-size: 14px; line-height: 1.8;">
                            <li>选择 1 件目标装备进行强化</li>
                            <li>选择其他装备作为强化材料</li>
                            <li>材料装备会被消耗，转化为强化经验</li>
                            <li>装备品质越高，提供的经验越多</li>
                            <li>强化等级上限：+10</li>
                        </ul>
                    </div>
                    
                    <div style="background: rgba(255,255,255,0.1); padding: 20px; border-radius: 15px;">
                        <h4>🎒 选择装备（点击选择）</h4>
                        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; margin-top: 15px;">
                            ${this.player.inventory.map((item, index) => `
                                <div id="enhance-item-${index}" onclick="game.toggleEnhanceSelection(${index})" 
                                    style="background: linear-gradient(135deg, ${QUALITY_COLORS[item.quality]} 0%, #333 100%); padding: 10px; border-radius: 8px; color: white; cursor: pointer; border: 3px solid transparent; transition: all 0.3s;">
                                    <div style="font-weight: bold; font-size: 14px;">${item.name}</div>
                                    <div style="font-size: 11px;">${QUALITY_NAMES[item.quality]}</div>
                                    <div style="font-size: 12px; margin-top: 5px;">+${this.getEquipAttrValue(item)}</div>
                                    ${item.level ? `<div style="font-size: 10px; color: #f39c12;">+${item.level}</div>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; text-align: center;">
                        <button class="btn btn-primary" onclick="game.confirmEnhance()" style="padding: 15px 40px; font-size: 18px;">✨ 开始强化</button>
                        <button class="btn btn-warning" onclick="game.enhanceMaxQuick()" style="padding: 15px 40px; font-size: 18px; margin-left: 10px;">🚀 一键满级</button>
                        <button class="btn btn-secondary" onclick="game.showScreen('home')" style="padding: 15px 40px; font-size: 18px; margin-left: 10px;">返回</button>
                    </div>
                    
                    <div id="enhance-selection-info" style="margin-top: 20px; text-align: center; color: #f39c12; font-weight: bold;"></div>
                </div>
            `;
            
            content.innerHTML = html;
            
            // 初始化选择状态
            this.state.enhanceSelection = {
                targetIndex: null,
                materialIndices: []
            };
        }, 100);
    }
    
    // 切换强化装备选择
    toggleEnhanceSelection(index) {
        const selection = this.state.enhanceSelection;
        
        // 如果还没选择目标装备
        if (selection.targetIndex === null) {
            selection.targetIndex = index;
            this.renderEnhanceSelection();
        } else if (selection.targetIndex === index) {
            // 取消选择目标装备
            selection.targetIndex = null;
            this.renderEnhanceSelection();
        } else if (selection.materialIndices.includes(index)) {
            // 取消选择材料装备
            selection.materialIndices = selection.materialIndices.filter(i => i !== index);
            this.renderEnhanceSelection();
        } else {
            // 添加为材料装备
            selection.materialIndices.push(index);
            this.renderEnhanceSelection();
        }
    }
    
    // 渲染强化选择状态
    renderEnhanceSelection() {
        const selection = this.state.enhanceSelection;
        const infoDiv = document.getElementById('enhance-selection-info');
        
        // 清除所有选中状态
        document.querySelectorAll('[id^="enhance-item-"]').forEach(el => {
            el.style.borderColor = 'transparent';
            el.style.boxShadow = 'none';
        });
        
        // 高亮目标装备
        if (selection.targetIndex !== null) {
            const targetEl = document.getElementById(`enhance-item-${selection.targetIndex}`);
            if (targetEl) {
                targetEl.style.borderColor = '#f39c12';
                targetEl.style.boxShadow = '0 0 20px rgba(243, 156, 18, 0.6)';
            }
        }
        
        // 高亮材料装备
        selection.materialIndices.forEach(index => {
            const el = document.getElementById(`enhance-item-${index}`);
            if (el) {
                el.style.borderColor = '#e74c3c';
                el.style.boxShadow = '0 0 10px rgba(231, 76, 60, 0.4)';
            }
        });
        
        // 更新提示信息
        if (selection.targetIndex !== null) {
            infoDiv.textContent = `已选择：目标装备 x1 + 材料装备 x${selection.materialIndices.length}`;
        } else {
            infoDiv.textContent = '请点击选择要强化的目标装备（第一个点击的装备）';
        }
    }
    
    // 确认强化
    confirmEnhance() {
        const selection = this.state.enhanceSelection;
        
        if (selection.targetIndex === null) {
            this.showToast('❌ 请先选择要强化的目标装备');
            return;
        }
        
        if (selection.materialIndices.length === 0) {
            this.showToast('❌ 请至少选择 1 件强化材料');
            return;
        }
        
        this.enhanceEquipment(selection.targetIndex, selection.materialIndices);
        
        // 重置选择
        this.state.enhanceSelection = {
            targetIndex: null,
            materialIndices: []
        };
    }
    
    // 快速一键满级：弹出选择框选择目标装备
    enhanceMaxQuick() {
        if (this.player.inventory.length < 1) {
            this.showToast('⚠️ 背包中没有可强化的装备');
            return;
        }
        
        // 筛选出未达满级的装备
        const upgradeableEquips = this.player.inventory.filter((item, idx) => {
            const level = item.level || 1;
            return level < 10;
        });
        
        if (upgradeableEquips.length === 0) {
            alert('✅ 所有装备都已强化到满级！');
            return;
        }
        
        // 显示装备选择列表
        const html = `
            <div style="padding: 20px; max-height: 400px; overflow-y: auto;">
                <h3 style="text-align: center; margin-bottom: 20px;">🚀 选择要强化的装备</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px;">
                    ${upgradeableEquips.map((item, idx) => {
                        const originalIndex = this.player.inventory.indexOf(item);
                        return `
                            <div onclick="game.enhanceEquipment(${originalIndex}, null, true)" 
                                style="background: linear-gradient(135deg, ${QUALITY_COLORS[item.quality]} 0%, #333 100%); padding: 15px; border-radius: 10px; color: white; cursor: pointer; border: 3px solid transparent; transition: all 0.3s;">
                                <div style="font-weight: bold; font-size: 14px;">${item.name}</div>
                                <div style="font-size: 11px;">${QUALITY_NAMES[item.quality]}</div>
                                <div style="font-size: 12px; margin-top: 5px;">+${this.getEquipAttrValue(item)}</div>
                                ${item.level ? `<div style="font-size: 10px; color: #f39c12;">+${item.level}</div>` : '<div style="font-size: 10px; color: #999;">+0</div>'}
                            </div>
                        `;
                    }).join('')}
                </div>
                <div style="margin-top: 20px; text-align: center;">
                    <button class="btn btn-secondary" onclick="game.showScreen('home')" style="padding: 15px 40px; font-size: 18px;">返回</button>
                </div>
            </div>
        `;
        
        this.showScreen('equipment');
        setTimeout(() => {
            const content = document.getElementById('equipment-content');
            if (content) {
                content.innerHTML = html;
            }
        }, 100);
    }
    
    equipToHero(heroIndex) {
        const hero = this.player.heroes[heroIndex];
        if (!hero) return;
        
        // 设置选中武将
        this.state.selectedHeroForEquip = heroIndex;
        
        // 显示装备界面
        this.showEquipment();
    }
    
    updateTeamStats() {
        this.player.team.forEach(heroId => {
            const hero = this.player.heroes.find(h => h.id === heroId);
            if (hero) {
                const baseHero = HERO_DATABASE.find(h => h.id === heroId);
                if (baseHero) {
                    const level = hero.level || 1;
                    const growth = this.getHeroGrowth(hero.rarity);
                    
                    // 基础属性 + 等级成长
                    hero.hp = baseHero.hp + (level - 1) * growth.hp;
                    hero.attack = baseHero.attack + (level - 1) * growth.attack;
                    hero.defense = baseHero.defense + (level - 1) * growth.defense;
                    hero.speed = baseHero.speed + (level - 1) * growth.speed;
                    
                    // 装备加成（每个武将独立的装备）
                    if (hero.equipment) {
                        Object.values(hero.equipment).forEach(equip => {
                            if (equip) {
                                if (equip.hp) hero.hp += equip.hp;
                                if (equip.attack) hero.attack += equip.attack;
                                if (equip.defense) hero.defense += equip.defense;
                                if (equip.speed) hero.speed += equip.speed;
                            }
                        });
                    }
                }
            }
        });
    }
    
    // ========== 其他系统方法 ==========
    // （由于篇幅限制，其他方法保持原有逻辑）
    // 包括：关卡系统、战斗系统、抽卡系统、阵容系统、每日任务等
    
    showLevelSelect() {
        this.showScreen('level');
        const listDiv = document.getElementById('level-list');
        if (!listDiv) return;
        
        listDiv.innerHTML = LEVELS.map(level => {
            const isUnlocked = level.id === 1 || this.player.passedLevels.includes(level.id - 1);
            const isPassed = this.player.passedLevels.includes(level.id);
            
            return `
                <div style="background: ${isUnlocked ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#555'}; padding: 20px; border-radius: 15px; margin-bottom: 15px; opacity: ${isUnlocked ? 1 : 0.6};">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div style="flex: 1;">
                            <h3 style="font-size: 20px; margin-bottom: 5px;">
                                ${isPassed ? '✅' : isUnlocked ? '📍' : '🔒'} 
                                第${level.id}关：${level.name}
                            </h3>
                            <p style="font-size: 14px; opacity: 0.8; margin-bottom: 5px;">难度：${level.difficulty}</p>
                            <p style="font-size: 13px; opacity: 0.7; margin-bottom: 10px;">${level.story}</p>
                            <div style="font-size: 14px;">🎁 奖励：💰${level.reward.gold} ✨${level.reward.exp} ${level.reward.gem > 0 ? '💎' + level.reward.gem : ''} ${level.reward.equipment ? '⚔️' : ''}</div>
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
        // 检查是否正在战斗中
        if (this.battleRunning || this.state.battle) {
            this.showModalBox('提示', '⚠️ 战斗正在进行中！');
            return;
        }
        
        const level = LEVELS.find(l => l.id === levelId);
        if (!level) return;
        
        if (this.player.team.length === 0) {
            this.showModalBox('提示', '⚠️ 阵容为空！请先编辑阵容');
            this.showTeamEditor();
            return;
        }
        
        // 清理之前的战斗状态
        if (this.battleTimer) {
            clearInterval(this.battleTimer);
            this.battleTimer = null;
        }
        this.battleRunning = false;
        this.state.battle = null;
        
        const enemyTeam = level.enemies.map(e => ({ ...e, maxHp: e.hp, currentHp: e.hp }));
        
        // 初始化计谋冷却（所有计谋初始可用）
        const tacticsCooldown = {};
        TACTICS_DATABASE.forEach(tactic => {
            tacticsCooldown[tactic.id] = 0;
        });
        
        // 初始化武将 MP（用于施展计谋）
        const playerTeamWithMP = this.player.team.map(id => {
            const hero = this.player.heroes.find(h => h.id === id);
            if (hero) {
                // 根据智力决定 MP 上限
                const baseHero = HERO_DATABASE.find(h => h.id === id);
                const maxMP = baseHero ? Math.floor(baseHero.hp * 0.3) : 100;
                return { ...hero, currentHp: hero.hp, mp: maxMP, maxMP: maxMP };
            }
            return null;
        }).filter(h => h);
        
        this.state.battle = {
            turn: 1,
            level: level,
            playerTeam: playerTeamWithMP,
            enemyTeam: enemyTeam,
            log: [`📜 ${level.story}`, `战斗开始！`],
            tacticsCooldown: tacticsCooldown,  // 计谋冷却状态
            activeBuffs: [],  // 玩家方的增益效果
            activeDebuffs: []  // 敌方的减益效果
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
        
        const aliveEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (aliveEnemies.length === 0) {
            this.winBattle();
            return;
        }
        
        const alivePlayers = battle.playerTeam.filter(p => p.currentHp > 0);
        if (alivePlayers.length === 0) {
            this.loseBattle();
            return;
        }
        
        // 玩家攻击回合
        const playerAttacker = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
        const enemyTarget = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        const playerDamage = Math.max(1, playerAttacker.attack - enemyTarget.defense / 2);
        
        // 显示技能动画
        const attackerIndex = battle.playerTeam.indexOf(playerAttacker);
        this.showSkillAnim(`player-${attackerIndex}`, true, 'attack');
        
        enemyTarget.currentHp = Math.max(0, enemyTarget.currentHp - playerDamage);
        battle.log.push(`⚔️ ${playerAttacker.name}攻击${enemyTarget.name}造成${Math.floor(playerDamage)}伤害`);
        
        // 显示受伤动画（带暴击检测）
        const targetIndex = battle.enemyTeam.indexOf(enemyTarget);
        const isCritical = Math.random() < 0.2; // 20% 暴击率
        if (isCritical) {
            battle.log.push(`💥 暴击！${playerAttacker.name}造成了巨额伤害！`);
        }
        this.showAttackAnim(`enemy-${targetIndex}`, false, Math.floor(playerDamage), isCritical);
        
        // 屏幕震动效果（暴击时）
        if (isCritical) {
            this.shakeScreen();
        }
        
        if (enemyTarget.currentHp <= 0) {
            battle.log.push(`💀 ${enemyTarget.name}被击败！`);
        }
        
        // 更新战斗界面（不重新渲染整个界面，只更新血条）
        this.updateBattleUI();
        
        const remainingEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (remainingEnemies.length === 0) {
            setTimeout(() => this.winBattle(), 800);
            return;
        }
        
        // 敌人反击回合（延迟执行）
        setTimeout(() => {
            if (!this.battleRunning || !this.state.battle) return;
            
            // 敌人 AI 使用计谋（有一定概率）
            const enemyUseTacticChance = 0.3; // 30% 概率使用计谋
            if (Math.random() < enemyUseTacticChance) {
                this.enemyUseTacticAI();
            }
            
            const alivePlayersAfterAttack = this.state.battle.playerTeam.filter(p => p.currentHp > 0);
            for (const enemy of this.state.battle.enemyTeam) {
                if (enemy.currentHp <= 0) continue;
                
                const playerTarget = alivePlayersAfterAttack[Math.floor(Math.random() * alivePlayersAfterAttack.length)];
                if (!playerTarget) continue;
                
                const enemyDamage = Math.max(1, enemy.attack - playerTarget.defense / 2);
                
                // 显示敌人攻击动画
                const enemyIdx = this.state.battle.enemyTeam.indexOf(enemy);
                this.showSkillAnim(`enemy-${enemyIdx}`, false);
                
                playerTarget.currentHp = Math.max(0, playerTarget.currentHp - enemyDamage);
                battle.log.push(`🔥 ${enemy.name}攻击${playerTarget.name}造成${Math.floor(enemyDamage)}伤害`);
                
                // 显示玩家受伤动画
                const playerIdx = this.state.battle.playerTeam.indexOf(playerTarget);
                this.showAttackAnim(`player-${playerIdx}`, true, Math.floor(enemyDamage));
                
                if (playerTarget.currentHp <= 0) {
                    battle.log.push(`💔 ${playerTarget.name}被击败！`);
                }
                
                // 更新战斗界面
                this.updateBattleUI();
            }
            
            setTimeout(() => {
                if (!this.battleRunning || !this.state.battle) return;
                
                const remainingPlayers = this.state.battle.playerTeam.filter(p => p.currentHp > 0);
                if (remainingPlayers.length === 0) {
                    this.loseBattle();
                    return;
                }
                
                // 新回合开始
                this.state.battle.turn++;
                
                // 减少计谋冷却
                Object.keys(this.state.battle.tacticsCooldown).forEach(tacticId => {
                    if (this.state.battle.tacticsCooldown[tacticId] > 0) {
                        this.state.battle.tacticsCooldown[tacticId]--;
                    }
                });
                
                // 处理 buff 持续时间
                this.state.battle.activeBuffs = this.state.battle.activeBuffs.filter(buff => {
                    buff.duration--;
                    return buff.duration > 0;
                });
                
                // 处理 debuff 效果（中毒）
                this.state.battle.activeDebuffs.forEach(debuff => {
                    if (debuff.type === 'poison' && debuff.duration > 0) {
                        const enemy = this.state.battle.enemyTeam.find(e => e.name === debuff.target);
                        if (enemy && enemy.currentHp > 0) {
                            const poisonDamage = Math.floor(enemy.maxHp * debuff.value);
                            enemy.currentHp = Math.max(0, enemy.currentHp - poisonDamage);
                            this.state.battle.log.push(`☠️ ${enemy.name} 中毒损失 ${poisonDamage} 点生命值！`);
                        }
                    }
                    debuff.duration--;
                });
                this.state.battle.activeDebuffs = this.state.battle.activeDebuffs.filter(d => d.duration > 0);
                
                this.renderBattle();
            }, 800);
        }, 600);
    }
    
    // 更新战斗界面（只更新血条，不重新渲染整个界面）
    updateBattleUI() {
        if (!this.state.battle) return;
        
        // 更新敌人血条
        this.state.battle.enemyTeam.forEach((e, index) => {
            const hpBar = document.querySelector(`#enemy-${index} .hp-bar`);
            if (hpBar) {
                const hpPercent = (e.currentHp / e.maxHp) * 100;
                hpBar.style.width = `${hpPercent}%`;
            }
            const hpText = document.querySelector(`#enemy-${index} .hp-text`);
            if (hpText) {
                hpText.textContent = `${Math.ceil(e.currentHp)}/${e.maxHp}`;
            }
        });
        
        // 更新玩家血条
        this.state.battle.playerTeam.forEach((h, index) => {
            const hpBar = document.querySelector(`#player-${index} .hp-bar`);
            if (hpBar) {
                const hpPercent = (h.currentHp / h.hp) * 100;
                hpBar.style.width = `${hpPercent}%`;
            }
            const hpText = document.querySelector(`#player-${index} .hp-text`);
            if (hpText) {
                hpText.textContent = `${Math.ceil(h.currentHp)}/${h.hp}`;
            }
        });
        
        // 更新战斗记录
        const logDiv = document.querySelector('#battle-log');
        if (logDiv) {
            logDiv.innerHTML = this.state.battle.log.slice(-10).map(log => 
                `<div style="padding: 5px; border-bottom: 1px solid rgba(255,255,255,0.1); animation: slideDown 0.3s ease-out;">${log}</div>`
            ).join('') || '<div style="color: #999;">战斗开始...</div>';
        }
    }
    
    winBattle() {
        if (this.battleTimer) {
            clearInterval(this.battleTimer);
            this.battleTimer = null;
        }
        this.battleRunning = false;
        
        this.playSFX('victory'); // 播放胜利音效
        
        const level = this.state.battle.level;
        const reward = level.reward;
        
        this.player.gold += reward.gold;
        this.player.exp += reward.exp;
        if (reward.gem > 0) this.player.gem += reward.gem;
        
        if (reward.equipment) {
            const allEquipment = [
                ...EQUIPMENT_DATABASE.weapon,
                ...EQUIPMENT_DATABASE.armor,
                ...EQUIPMENT_DATABASE.helmet,
                ...EQUIPMENT_DATABASE.boots
            ];
            const equip = allEquipment.find(e => e.id === reward.equipment);
            if (equip) {
                const equipmentData = { ...equip };
                const beforeCount = this.player.inventory.length;
                this.player.inventory.push(equipmentData);
                const afterCount = this.player.inventory.length;
                
                console.log(`✅ 装备掉落验证:`);
                console.log(`  - 装备名称：${equipmentData.name}`);
                console.log(`  - 装备类型：${equipmentData.type}`);
                console.log(`  - 装备品质：${equipmentData.quality}`);
                console.log(`  - 掉落前背包数量：${beforeCount}`);
                console.log(`  - 掉落后背包数量：${afterCount}`);
                console.log(`  - 添加成功：${afterCount === beforeCount + 1}`);
                
                if (afterCount !== beforeCount + 1) {
                    console.error('❌ 装备添加失败！');
                }
            } else {
                console.error(`❌ 未找到装备 ID: ${reward.equipment}`);
            }
        }
        
        // 挂机模式下不更新 currentLevel，只在非挂机模式下更新
        if (!this.autoBattle) {
            if (!this.player.passedLevels.includes(level.id)) {
                this.player.passedLevels.push(level.id);
                this.player.currentLevel = level.id + 1;
            }
        } else {
            // 挂机模式：只标记已通过，但不改变 currentLevel
            if (!this.player.passedLevels.includes(level.id)) {
                this.player.passedLevels.push(level.id);
            }
        }
        
        this.updateDailyQuest('battle_win');
        this.player.stats.battleWin = (this.player.stats.battleWin || 0) + 1;
        
        // 挂机统计
        if (this.autoBattle) {
            this.player.stats.afkBattles = (this.player.stats.afkBattles || 0) + 1;
            this.player.stats.afkRewards = (this.player.stats.afkRewards || 0) + reward.gold + reward.exp;
        }
        
        this.saveGame();
        
        // 先清理战斗状态并返回主页
        this.state.battle = null;
        this.battleRunning = false;
        this.showScreen('home');
        this.updateResourceDisplay();
        this.renderDailyQuests();
        
        // 如果获得了装备，刷新背包界面
        if (reward.equipment) {
            this.renderEquipmentList();
        }
        
        // 延迟显示奖励信息，避免在战斗界面弹窗
        setTimeout(() => {
            let rewardText = `🎉 战斗胜利！\n📜 关卡：${level.name}\n💰 金币 +${reward.gold}\n✨ 经验 +${reward.exp}`;
            if (reward.gem > 0) rewardText += `\n💎 元宝 +${reward.gem}`;
            if (reward.equipment) {
                const allEquipment = [
                    ...EQUIPMENT_DATABASE.weapon,
                    ...EQUIPMENT_DATABASE.armor,
                    ...EQUIPMENT_DATABASE.helmet,
                    ...EQUIPMENT_DATABASE.boots
                ];
                const equip = allEquipment.find(e => e.id === reward.equipment);
                if (equip) {
                    rewardText += `\n⚔️ 装备：${equip.name}（${QUALITY_NAMES[equip.quality]}）x1`;
                }
            }
            
            // 显示自定义胜利弹窗（1 秒后自动关闭）
            this.showVictoryModal(rewardText);
            
            // 如果挂机模式开启，自动在当前关卡重复战斗
            if (this.autoBattle) {
                // 给玩家一个提示，然后重新开始当前关卡
                setTimeout(() => {
                    // 检查是否还在主页，如果不在主页则不自动开始战斗
                    const currentScreen = document.querySelector('.screen.active');
                    if (!currentScreen || currentScreen.id !== 'home-screen') {
                        console.log('⏸️ 玩家已离开主页，暂停自动战斗');
                        return;
                    }
                    
                    // 使用当前关卡 ID 重复挑战（而不是 this.player.currentLevel）
                    console.log(`🤖 挂机模式：重复挑战 ${level.name} (关卡 ID: ${level.id})`);
                    this.startLevel(level.id);
                }, 300);
            }
        }, 100);
    }
    
    // 显示胜利结算弹窗
    showVictoryModal(message) {
        // 创建模态框
        const modal = document.createElement('div');
        modal.id = 'victory-modal';
        modal.className = 'modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: modalFadeIn 0.3s ease;
        `;
        
        modal.innerHTML = `
            <div style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                padding: 40px;
                border-radius: 20px;
                text-align: center;
                color: white;
                max-width: 400px;
                box-shadow: 0 10px 40px rgba(102, 126, 234, 0.5);
                animation: modalSlideIn 0.4s ease;
            ">
                <div style="font-size: 60px; margin-bottom: 20px; animation: victory-bounce 0.6s ease;">🎉</div>
                <h2 style="font-size: 28px; margin-bottom: 20px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">战斗胜利</h2>
                <div style="
                    background: rgba(255, 255, 255, 0.15);
                    padding: 20px;
                    border-radius: 15px;
                    margin-bottom: 20px;
                    text-align: left;
                    white-space: pre-wrap;
                    line-height: 1.8;
                    font-size: 16px;
                    max-height: 300px;
                    overflow-y: auto;
                ">${message}</div>
                <div style="font-size: 14px; opacity: 0.8;">
                    <span id="countdown">3</span> 秒后自动关闭...
                </div>
            </div>
        `;
        
        // 添加 CSS 动画
        if (!document.getElementById('victory-modal-style')) {
            const style = document.createElement('style');
            style.id = 'victory-modal-style';
            style.innerHTML = `
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalSlideIn {
                    from {
                        transform: translateY(-50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
                @keyframes victory-bounce {
                    0% { transform: scale(0); }
                    50% { transform: scale(1.2); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(modal);
        
        // 倒计时关闭
        let countdown = 3;
        const countdownEl = document.getElementById('countdown');
        const countdownInterval = setInterval(() => {
            countdown--;
            if (countdownEl) {
                countdownEl.textContent = countdown;
            }
            if (countdown <= 0) {
                clearInterval(countdownInterval);
                modal.style.animation = 'modalFadeIn 0.3s ease reverse';
                setTimeout(() => modal.remove(), 300);
            }
        }, 1000);
        
        // 点击模态框也可以立即关闭
        modal.addEventListener('click', () => {
            clearInterval(countdownInterval);
            modal.style.animation = 'modalFadeIn 0.3s ease reverse';
            setTimeout(() => modal.remove(), 300);
        });
    }
    
    // 通用自定义模态框（替代 alert）
    showModalBox(title, message, autoClose = false, closeDelay = 3000) {
        // 快速调用：如果只有一个参数，当作 message 处理
        if (arguments.length === 1) {
            message = title;
            title = '';
        }
        
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            animation: modalFadeIn 0.3s ease;
            cursor: pointer;
        `;
        
        const isSuccess = !message.includes('❌') && !message.includes('失败') && !message.includes('不足') && !message.includes('⚠️');
        const gradient = isSuccess ? 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)' : 'linear-gradient(135deg, #f45c43 0%, #eb3349 100%)';
        
        modal.innerHTML = `
            <div style="
                background: ${gradient};
                padding: 30px;
                border-radius: 20px;
                text-align: center;
                color: white;
                max-width: 450px;
                box-shadow: 0 10px 40px rgba(0,0,0,0.5);
                animation: modalSlideIn 0.4s ease;
                position: relative;
            ">
                <div style="font-size: 50px; margin-bottom: 15px;">${isSuccess ? '✅' : '⚠️'}</div>
                ${title ? `<h3 style="font-size: 24px; margin-bottom: 15px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">${title}</h3>` : ''}
                <div style="
                    background: rgba(255, 255, 255, 0.15);
                    padding: 15px;
                    border-radius: 10px;
                    white-space: pre-wrap;
                    line-height: 1.6;
                    font-size: 15px;
                    max-height: 350px;
                    overflow-y: auto;
                    text-align: left;
                ">${message}</div>
                ${autoClose ? `<div style="font-size: 13px; opacity: 0.9; margin-top: 15px;">
                    <span class="modal-countdown">${closeDelay / 1000}</span> 秒后自动关闭...
                </div>` : '<div style="font-size: 13px; opacity: 0.9; margin-top: 15px;">点击任意位置关闭</div>'}
            </div>
        `;
        
        // 添加 CSS 动画（如果不存在）
        if (!document.getElementById('modal-box-style')) {
            const style = document.createElement('style');
            style.id = 'modal-box-style';
            style.innerHTML = `
                @keyframes modalFadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes modalSlideIn {
                    from {
                        transform: translateY(-50px);
                        opacity: 0;
                    }
                    to {
                        transform: translateY(0);
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(modal);
        
        const closeModal = () => {
            modal.style.animation = 'modalFadeIn 0.3s ease reverse';
            setTimeout(() => modal.remove(), 300);
        };
        
        modal.addEventListener('click', closeModal);
        
        // 如果需要自动关闭
        if (autoClose) {
            let countdown = closeDelay / 1000;
            const countdownEl = modal.querySelector('.modal-countdown');
            const countdownInterval = setInterval(() => {
                countdown--;
                if (countdownEl) {
                    countdownEl.textContent = countdown;
                }
                if (countdown <= 0) {
                    clearInterval(countdownInterval);
                    closeModal();
                }
            }, 1000);
        }
    }
    
    // 快速提示（替代简单 alert）
    showToast(message, duration = 2000) {
        this.showModalBox('', message, true, duration);
    }
    
    loseBattle() {
        if (this.battleTimer) {
            clearInterval(this.battleTimer);
            this.battleTimer = null;
        }
        this.battleRunning = false;
        
        // 战斗失败，重置挂机状态
        if (this.autoBattle) {
            this.autoBattle = false;
            const btn = document.getElementById('auto-battle-btn');
            if (btn) {
                btn.textContent = '🤖 挂机：关';
                btn.style.background = '#2ecc71';
            }
        }
        
        // 先清理战斗状态并返回主页
        this.state.battle = null;
        this.showScreen('home');
        
        // 延迟显示失败信息
        setTimeout(() => {
            this.showModalBox('战斗失败', '❌ 战斗失败！请强化武将后再来挑战！');
        }, 100);
    }
    
    endBattle(isRun) {
        if (this.battleTimer) {
            clearInterval(this.battleTimer);
            this.battleTimer = null;
        }
        this.battleRunning = false;
        
        // 逃跑或失败时完全退出挂机模式
        if (this.autoBattle) {
            this.autoBattle = false;
            const btn = document.getElementById('auto-battle-btn');
            if (btn) {
                btn.textContent = '🤖 挂机：关';
                btn.style.background = '#2ecc71';
            }
            console.log('⏸️ 退出战斗，已关闭挂机模式');
        }
        
        if (isRun) {
            this.showModalBox('逃跑', '🏃 逃跑成功！', true, 2000);
        }
        this.state.battle = null;
        this.showScreen('home');
    }
    
    renderBattle() {
        const content = document.getElementById('battle-content');
        if (!content || !this.state.battle) return;
        
        const battle = this.state.battle;
        content.innerHTML = `
            <div style="padding: 20px; position: relative;" id="battle-container">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h3 style="display: inline-block; padding: 10px 30px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 20px; box-shadow: 0 5px 15px rgba(0,0,0,0.3); animation: skill-glow 2s ease-in-out infinite;">🎮 第 ${battle.turn} 回合</h3>
                </div>
                <div style="display: flex; justify-content: space-around; margin-bottom: 40px;">
                    ${battle.enemyTeam.map((e, index) => `
                        <div id="enemy-${index}" style="background: #e74c3c; padding: 15px; border-radius: 10px; min-width: 150px; text-align: center; position: relative; transition: all 0.3s; box-shadow: 0 5px 15px rgba(231,76,60,0.3);">
                            <div style="font-size: 20px; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">👹 ${e.name}</div>
                            <div style="background: #333; height: 15px; border-radius: 8px; overflow: hidden; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5); position: relative;">
                                <div class="hp-bar" style="background: linear-gradient(90deg, #2ecc71, #27ae60); height: 100%; width: ${(e.currentHp / e.maxHp) * 100}%; transition: width 0.5s ease-out; position: absolute;"></div>
                            </div>
                            <div class="hp-text" style="margin-top: 5px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${Math.ceil(e.currentHp)}/${e.maxHp}</div>
                        </div>
                    `).join('')}
                </div>
                <div style="display: flex; justify-content: space-around;">
                    ${battle.playerTeam.map((h, index) => `
                        <div id="player-${index}" style="background: linear-gradient(135deg, #3498db, #2980b9); padding: 15px; border-radius: 10px; min-width: 150px; text-align: center; position: relative; transition: all 0.3s; box-shadow: 0 5px 15px rgba(52,152,219,0.4);">
                            <div style="font-size: 20px; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">⚔️ ${h.name} Lv.${h.level || 1}</div>
                            <div style="background: #333; height: 15px; border-radius: 8px; overflow: hidden; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5); position: relative; margin-bottom: 5px;">
                                <div class="hp-bar" style="background: linear-gradient(90deg, #2ecc71, #27ae60); height: 100%; width: ${(h.currentHp / h.hp) * 100}%; transition: width 0.5s ease-out; position: absolute;"></div>
                            </div>
                            <div class="hp-text" style="margin-top: 5px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${Math.ceil(h.currentHp)}/${h.hp}</div>
                            <div style="background: #333; height: 10px; border-radius: 5px; overflow: hidden; box-shadow: inset 0 2px 3px rgba(0,0,0,0.5); position: relative; margin-top: 8px;">
                                <div class="mp-bar" style="background: linear-gradient(90deg, #3498db, #2980b9); height: 100%; width: ${(h.mp / h.maxMP) * 100}%; transition: width 0.5s ease-out; position: absolute;"></div>
                            </div>
                            <div style="margin-top: 3px; font-size: 12px; color: #3498db; font-weight: bold;">MP: ${h.mp}/${h.maxMP}</div>
                        </div>
                    `).join('')}
                </div>
                <div style="margin-top: 40px; text-align: center;">
                    <div style="background: rgba(0,0,0,0.8); padding: 20px; border-radius: 15px; max-height: 200px; overflow-y: auto; box-shadow: 0 5px 15px rgba(0,0,0,0.5); border: 2px solid rgba(255,255,255,0.1);">
                        <h4 style="color: #f39c12; text-shadow: 0 0 10px rgba(243, 156, 18, 0.5);">📝 战斗记录</h4>
                        <div id="battle-log" style="text-align: left; margin-top: 10px; font-size: 14px;">
                            ${battle.log.slice(-10).map(log => `<div style="padding: 5px; border-bottom: 1px solid rgba(255,255,255,0.1); animation: slideDown 0.3s ease-out;">${log}</div>`).join('') || '<div style="color: #999;">战斗开始...</div>'}
                        </div>
                    </div>
                </div>
                
                <!-- 计谋策略系统 -->
                <div style="margin-top: 25px; padding: 20px; background: linear-gradient(135deg, rgba(102,126,234,0.2), rgba(118,75,162,0.2)); border-radius: 15px; border: 2px solid rgba(102,126,234,0.5);">
                    <h3 style="text-align: center; margin-bottom: 15px; color: #667eea; text-shadow: 0 0 10px rgba(102,126,234,0.8);">🎯 计谋策略</h3>
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); gap: 10px; max-height: 250px; overflow-y: auto; padding: 10px;">
                        ${TACTICS_DATABASE.map(tactic => {
                            const cooldown = battle.tacticsCooldown[tactic.id] || 0;
                            const isReady = cooldown <= 0;
                            return `
                                <div onclick="game.useTactic('${tactic.id}')" 
                                    style="background: linear-gradient(135deg, ${isReady ? 'rgba(46,204,113,0.3)' : 'rgba(149,165,166,0.3)'} 0%, rgba(0,0,0,0.5) 100%); 
                                    padding: 12px; border-radius: 10px; text-align: center; color: white; 
                                    cursor: ${isReady ? 'pointer' : 'not-allowed'}; 
                                    border: 2px solid ${isReady ? '#2ecc71' : '#95a5a6'};
                                    transition: all 0.3s;
                                    position: relative;
                                    ${!isReady ? 'filter: grayscale(0.8);' : ''}"
                                    title="${tactic.effect}">
                                    <div style="font-size: 28px; margin-bottom: 5px;">${tactic.icon}</div>
                                    <div style="font-weight: bold; font-size: 13px; margin-bottom: 3px;">${tactic.name}</div>
                                    <div style="font-size: 11px; opacity: 0.8;">CD: ${tactic.cooldown}</div>
                                    ${!isReady ? `<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 24px; font-weight: bold; color: #e74c3c; text-shadow: 0 0 5px black;">${cooldown}</div>` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <div style="margin-top: 30px; text-align: center;">
                    <button class="btn btn-danger" onclick="game.endBattle(true)" style="box-shadow: 0 5px 15px rgba(231,76,60,0.4); transition: all 0.3s; transform: scale(1);">🏃 逃跑</button>
                    <button class="btn btn-success" onclick="game.toggleAutoBattle()" id="auto-battle-btn" style="box-shadow: 0 5px 15px rgba(46,204,113,0.4); transition: all 0.3s; margin-left: 10px; transform: scale(1);">🤖 挂机：${this.autoBattle ? '开' : '关'}</button>
                    <button class="btn btn-info" onclick="game.toggleBattleSpeed()" id="battle-speed-btn" style="box-shadow: 0 5px 15px rgba(52,152,219,0.4); transition: all 0.3s; margin-left: 10px; transform: scale(1);">⚡ ${this.battleSpeed}x 速</button>
                </div>
            </div>
        `;
    }
    
    // 显示攻击动画（优化版）
    showAttackAnim(targetId, isPlayer, damage, isCritical = false) {
        const element = document.getElementById(targetId);
        if (!element) return;
        
        // 添加受伤动画
        element.classList.add('damage-anim');
        setTimeout(() => element.classList.remove('damage-anim'), 300);
        
        // 显示伤害数字
        const floatText = document.createElement('div');
        floatText.className = isCritical ? 'float-critical' : 'float-damage';
        floatText.textContent = isCritical ? `暴击！-${damage}` : `-${damage}`;
        floatText.style.left = '50%';
        floatText.style.top = '20%';
        floatText.style.transform = 'translateX(-50%)';
        element.appendChild(floatText);
        
        setTimeout(() => floatText.remove(), 1200);
        
        // 添加刀光特效
        const slash = document.createElement('div');
        slash.className = 'slash';
        slash.style.left = '50%';
        slash.style.top = '50%';
        slash.style.transform = 'translate(-50%, -50%) rotate(45deg)';
        element.appendChild(slash);
        
        setTimeout(() => slash.remove(), 500);
    }
    
    // 显示治疗动画（优化版）
    showHealAnim(targetId, isPlayer, heal) {
        const element = document.getElementById(targetId);
        if (!element) return;
        
        const floatText = document.createElement('div');
        floatText.className = 'float-heal';
        floatText.textContent = `+${heal}`;
        floatText.style.left = '50%';
        floatText.style.top = '20%';
        floatText.style.transform = 'translateX(-50%)';
        element.appendChild(floatText);
        
        setTimeout(() => floatText.remove(), 1000);
    }
    
    // 显示技能动画（优化版）
    showSkillAnim(targetId, isPlayer, skillName) {
        const element = document.getElementById(targetId);
        if (!element) return;
        
        element.classList.add('skill-anim');
        setTimeout(() => element.classList.remove('skill-anim'), 600);
        
        // 添加爆炸特效
        const explosion = document.createElement('div');
        explosion.className = 'explosion';
        explosion.style.left = '50%';
        explosion.style.top = '50%';
        explosion.style.transform = 'translate(-50%, -50%)';
        element.appendChild(explosion);
        
        setTimeout(() => explosion.remove(), 600);
    }
    
    // 屏幕震动效果
    shakeScreen() {
        const container = document.getElementById('battle-container');
        if (!container) return;
        
        container.classList.add('shake-anim');
        setTimeout(() => container.classList.remove('shake-anim'), 500);
    }
    
    // 切换挂机模式
    toggleAutoBattle() {
        this.autoBattle = !this.autoBattle;
        const btn = document.getElementById('auto-battle-btn');
        if (btn) {
            btn.textContent = this.autoBattle ? '🤖 挂机：开' : '🤖 挂机：关';
            btn.style.background = this.autoBattle ? '#27ae60' : '#2ecc71';
        }
        
        // 显示挂机状态提示
        if (this.autoBattle) {
            this.showNotification('🤖 挂机模式已开启', 'success', 2000);
            // 加快战斗速度
            if (this.battleTimer) {
                clearInterval(this.battleTimer);
                this.battleTimer = setInterval(() => this.battleLoop(), 800);  // 从 1500ms 加快到 800ms
            }
        } else {
            this.showNotification('⏸️ 挂机模式已关闭', 'info', 2000);
            // 恢复正常速度
            if (this.battleTimer) {
                clearInterval(this.battleTimer);
                this.battleTimer = setInterval(() => this.battleLoop(), 1500);
            }
        }
    }
    
    // 切换战斗速度
    toggleBattleSpeed() {
        this.battleSpeed = this.battleSpeed === 1 ? 2 : 1;
        this.playSFX('click');
        
        const btn = document.getElementById('battle-speed-btn');
        if (btn) {
            btn.textContent = `⚡ ${this.battleSpeed}x 速`;
        }
        
        // 调整战斗速度
        if (this.battleTimer) {
            clearInterval(this.battleTimer);
            const interval = this.battleSpeed === 2 ? 800 : 1500;  // 2 倍速 800ms，正常 1500ms
            this.battleTimer = setInterval(() => this.battleLoop(), interval);
        }
        
        this.showNotification(`⚡ 战斗速度：${this.battleSpeed}x`, 'info', 2000);
    }
    
    // 使用计谋
    useTactic(tacticId) {
        if (!this.state.battle || !this.battleRunning) {
            this.showToast('⚠️ 不在战斗中');
            return;
        }
        
        const tactic = TACTICS_DATABASE.find(t => t.id === tacticId);
        if (!tactic) {
            this.showToast('❌ 无效的计谋');
            return;
        }
        
        // 检查冷却
        const cooldown = this.state.battle.tacticsCooldown[tacticId] || 0;
        if (cooldown > 0) {
            this.showToast(`⚠️ 计谋正在冷却中（${cooldown}回合）`);
            return;
        }
        
        // 检查 MP（选择 MP 最多的武将施放）
        const battle = this.state.battle;
        const alivePlayers = battle.playerTeam.filter(p => p.currentHp > 0);
        if (alivePlayers.length === 0) {
            this.showToast('❌ 没有可施放计谋的武将');
            return;
        }
        
        // 找到 MP 最多的武将
        const caster = alivePlayers.reduce((max, p) => p.mp > max.mp ? p : max, alivePlayers[0]);
        if (caster.mp < tactic.mpCost) {
            this.showToast(`⚠️ MP 不足！需要 ${tactic.mpCost}，当前 ${caster.mp}`);
            return;
        }
        
        let used = false;
        
        // 根据计谋类型执行不同效果
        switch (tactic.type) {
            case 'damage':
                used = this.executeDamageTactic(tactic, battle);
                break;
            case 'heal':
                used = this.executeHealTactic(tactic, battle);
                break;
            case 'confuse':
                used = this.executeConfuseTactic(tactic, battle);
                break;
            case 'assassinate':
                used = this.executeAssassinateTactic(tactic, battle);
                break;
            case 'revive':
                used = this.executeReviveTactic(tactic, battle);
                break;
            case 'escape':
                used = this.executeEscapeTactic(tactic, battle);
                break;
            case '叛离':
                used = this.executeConfuseTactic(tactic, battle);
                break;
        }
        
        if (used) {
            // 扣除 MP
            caster.mp -= tactic.mpCost;
            
            // 设置冷却时间
            this.state.battle.tacticsCooldown[tacticId] = tactic.cooldown;
            
            // 播放计谋动画
            this.showTacticAnim(tactic);
            
            // 立即更新战斗界面
            this.renderBattle();
        }
    }
    
    // 执行伤害类计谋（火、水、石系）
    executeDamageTactic(tactic, battle) {
        const caster = this.findHighestMPAlly(battle);
        
        if (tactic.target === 'single_enemy') {
            const aliveEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
            if (aliveEnemies.length === 0) return false;
            
            // 选择目标（随机）
            const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
            
            // 计算伤害（基础伤害 + 智力加成）
            const intelligence = caster.intelligence || 100;
            const damage = Math.floor(tactic.damageBase * (1 + intelligence / 200));
            
            target.currentHp = Math.max(0, target.currentHp - damage);
            battle.log.push(`🔥 使用【${tactic.name}】！对 ${target.name} 造成 ${damage} 点伤害！`);
            
            // 检查是否击败敌人
            if (target.currentHp <= 0) {
                battle.log.push(`💀 ${target.name} 被击败了！`);
            }
        }
        
        return true;
    }
    
    // 执行治疗类计谋
    executeHealTactic(tactic, battle) {
        const caster = this.findHighestMPAlly(battle);
        
        if (tactic.target === 'single_ally') {
            const alivePlayers = battle.playerTeam.filter(p => p.currentHp > 0);
            if (alivePlayers.length === 0) return false;
            
            // 选择血量最低的武将
            const target = alivePlayers.reduce((min, p) => 
                (p.currentHp / p.hp) < (min.currentHp / min.hp) ? p : min, alivePlayers[0]);
            
            const heal = tactic.healBase;
            target.currentHp = Math.min(target.hp, target.currentHp + heal);
            battle.log.push(`💚 使用【${tactic.name}】！为 ${target.name} 恢复 ${heal} 点兵力！`);
        }
        
        return true;
    }
    
    // 执行离间类计谋
    executeConfuseTactic(tactic, battle) {
        const caster = this.findHighestMPAlly(battle);
        
        const aliveEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (aliveEnemies.length === 0) return false;
        
        const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        
        // 检查是否免疫（BOSS 级敌人有一定几率免疫）
        const immuneChance = target.isBoss ? 0.5 : 0.1;
        if (Math.random() < immuneChance) {
            battle.log.push(`❌ ${target.name} 免疫了【${tactic.name}】！`);
            return false;
        }
        
        battle.activeDebuffs.push({
            type: tactic.debuffType,
            duration: tactic.debuffDuration,
            target: target.name
        });
        
        battle.log.push(`✨ 使用【${tactic.name}】！${target.name} 中计了！`);
        return true;
    }
    
    // 执行暗杀计
    executeAssassinateTactic(tactic, battle) {
        const caster = this.findHighestMPAlly(battle);
        
        const aliveEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (aliveEnemies.length === 0) return false;
        
        const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        
        // 暗杀成功率（对 BOSS 极低）
        const successRate = target.isBoss ? 0.1 : 0.6;
        
        if (Math.random() < successRate) {
            target.currentHp = 0;
            battle.log.push(`🗡️ 使用【${tactic.name}】！${target.name} 被秒杀了！`);
        } else {
            battle.log.push(`❌ 使用【${tactic.name}】！对 ${target.name} 失败了！`);
        }
        
        return true;
    }
    
    // 执行复活类计谋
    executeReviveTactic(tactic, battle) {
        const caster = this.findHighestMPAlly(battle);
        
        const deadPlayers = battle.playerTeam.filter(p => p.currentHp <= 0);
        if (deadPlayers.length === 0) {
            battle.log.push(`⚠️ 没有可复活的武将！`);
            return false;
        }
        
        const target = deadPlayers[0];
        const reviveHp = Math.floor(target.hp * tactic.revivePercent);
        target.currentHp = reviveHp;
        
        battle.log.push(`✨ 使用【${tactic.name}】！复活了 ${target.name}，恢复 ${reviveHp} 点兵力！`);
        return true;
    }
    
    // 执行逃跑类计谋
    executeEscapeTactic(tactic, battle) {
        const caster = this.findHighestMPAlly(battle);
        
        if (tactic.id === 'yan_dun') {
            // 烟遁计必定成功
            battle.log.push(`💨 使用【${tactic.name}】！成功逃脱！`);
            setTimeout(() => {
                this.endBattle(true);
            }, 1000);
            return true;
        } else if (tactic.id === 'xue_lu') {
            // 血路计有成功率
            const successRate = 0.7;
            if (Math.random() < successRate) {
                battle.log.push(`🏃 使用【${tactic.name}】！杀出重围，成功逃脱！`);
                setTimeout(() => {
                    this.endBattle(true);
                }, 1000);
                return true;
            } else {
                battle.log.push(`❌ 使用【${tactic.name}】！逃脱失败！`);
                return false;
            }
        }
        
        return false;
    }
    
    // 找到 MP 最高的盟友
    findHighestMPAlly(battle) {
        const alivePlayers = battle.playerTeam.filter(p => p.currentHp > 0);
        if (alivePlayers.length === 0) return null;
        return alivePlayers.reduce((max, p) => p.mp > max.mp ? p : max, alivePlayers[0]);
    }
    
    // 敌人 AI 使用计谋
    enemyUseTacticAI() {
        const battle = this.state.battle;
        if (!battle) return;
        
        // 找到智力最高的敌人作为施法者
        const aliveEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (aliveEnemies.length === 0) return;
        
        const caster = aliveEnemies.reduce((max, e) => {
            const int = e.intelligence || 0;
            const maxInt = max.intelligence || 0;
            return int > maxInt ? e : max;
        }, aliveEnemies[0]);
        
        // 根据敌人智力决定可用的计谋等级
        const intelligence = caster.intelligence || 50;
        const availableTactics = TACTICS_DATABASE.filter(t => t.levelReq <= Math.floor(intelligence / 10));
        
        if (availableTactics.length === 0) return;
        
        // 随机选择一个计谋
        const tactic = availableTactics[Math.floor(Math.random() * availableTactics.length)];
        
        const alivePlayers = battle.playerTeam.filter(p => p.currentHp > 0);
        if (alivePlayers.length === 0) return;
        
        // 根据计谋类型执行
        let used = false;
        
        if (tactic.type === 'damage') {
            // 伤害类计谋
            const target = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
            const damage = Math.floor(tactic.damageBase * (1 + intelligence / 200));
            target.currentHp = Math.max(0, target.currentHp - damage);
            battle.log.push(`🔥 敌方 ${caster.name} 使用【${tactic.name}】！对 ${target.name} 造成 ${damage} 点伤害！`);
            used = true;
        } else if (tactic.type === 'heal') {
            // 治疗类计谋（对敌方使用）
            const lowHpEnemy = aliveEnemies.reduce((min, e) => 
                (e.currentHp / e.maxHp) < (min.currentHp / min.maxHp) ? e : min, aliveEnemies[0]);
            
            const heal = tactic.healBase;
            lowHpEnemy.currentHp = Math.min(lowHpEnemy.maxHp, lowHpEnemy.currentHp + heal);
            battle.log.push(`💚 敌方 ${caster.name} 使用【${tactic.name}】！为 ${lowHpEnemy.name} 恢复 ${heal} 点兵力！`);
            used = true;
        } else if (tactic.type === 'confuse' || tactic.type === '叛离') {
            // 离间类计谋（对玩家方使用）
            const target = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
            const immuneChance = target.isBoss ? 0.5 : 0.1;
            
            if (Math.random() >= immuneChance) {
                battle.activeDebuffs.push({
                    type: tactic.debuffType,
                    duration: tactic.debuffDuration,
                    target: target.name,
                    isEnemy: true
                });
                battle.log.push(`✨ 敌方 ${caster.name} 使用【${tactic.name}】！${target.name} 中计了！`);
                used = true;
            } else {
                battle.log.push(`❌ 敌方 ${caster.name} 使用【${tactic.name}】！被 ${target.name} 免疫了！`);
                used = false;
            }
        }
        
        if (used) {
            // 播放计谋动画
            this.showTacticAnim(tactic, true);
            // 更新战斗界面
            this.renderBattle();
        }
    }
    
    // 执行增益类计谋
    executeBuffTactic(tactic) {
        const battle = this.state.battle;
        const alivePlayers = battle.playerTeam.filter(p => p.currentHp > 0);
        if (alivePlayers.length === 0) return false;
        
        // 添加增益效果
        battle.activeBuffs.push({
            type: tactic.buffType,
            value: tactic.buffValue,
            duration: tactic.buffDuration,
            targets: alivePlayers.map(p => p.id)
        });
        
        // 立即应用增益
        alivePlayers.forEach(player => {
            if (tactic.buffType === 'attack') {
                player.attack = Math.floor(player.attack * (1 + tactic.buffValue));
            } else if (tactic.buffType === 'defense') {
                player.defense = Math.floor(player.defense * (1 + tactic.buffValue));
            } else if (tactic.buffType === 'speed') {
                player.speed = Math.floor(player.speed * (1 + tactic.buffValue));
            }
        });
        
        battle.log.push(`💪 使用【${tactic.name}】！全体武将${tactic.buffType === 'attack' ? '攻击力' : tactic.buffType === 'defense' ? '防御力' : '速度'}提升 ${Math.floor(tactic.buffValue * 100)}%，持续 ${tactic.buffDuration} 回合！`);
        return true;
    }
    
    // 执行减益类计谋
    executeDebuffTactic(tactic) {
        const battle = this.state.battle;
        const aliveEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (aliveEnemies.length === 0) return false;
        
        if (tactic.target === 'single_enemy') {
            const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
            
            battle.activeDebuffs.push({
                type: tactic.debuffType,
                value: tactic.debuffValue,
                duration: tactic.debuffDuration,
                target: target.name
            });
            
            if (tactic.debuffType === 'poison') {
                // 中毒效果会在每回合自动扣血
                battle.log.push(`☠️ 使用【${tactic.name}】！${target.name} 中毒，每回合损失 ${Math.floor(tactic.debuffValue * 100)}% 生命值，持续 ${tactic.debuffDuration} 回合！`);
            } else if (tactic.debuffType === 'attack_down') {
                target.attack = Math.floor(target.attack * (1 - tactic.debuffValue));
                battle.log.push(`📉 使用【${tactic.name}】！${target.name} 攻击力降低 ${Math.floor(tactic.debuffValue * 100)}%，持续 ${tactic.debuffDuration} 回合！`);
            }
        }
        
        return true;
    }
    
    // 执行复活类计谋
    executeReviveTactic(tactic) {
        const battle = this.state.battle;
        const deadPlayers = battle.playerTeam.filter(p => p.currentHp <= 0);
        if (deadPlayers.length === 0) {
            this.showToast('⚠️ 没有可复活的武将');
            return false;
        }
        
        const target = deadPlayers[0];
        const reviveHp = Math.floor(target.hp * tactic.revivePercent);
        target.currentHp = reviveHp;
        
        battle.log.push(`✨ 使用【${tactic.name}】！复活了 ${target.name}，恢复 ${reviveHp} 点生命值！`);
        return true;
    }
    
    // 执行终极计谋
    executeUltimateTactic(tactic, battle) {
        let totalDamage = 0;
        battle.enemyTeam.forEach(enemy => {
            if (enemy.currentHp > 0) {
                enemy.currentHp = Math.max(0, enemy.currentHp - tactic.damageBase);
                totalDamage += tactic.damageBase;
            }
        });
        
        battle.log.push(`🌟 使用【${tactic.name}】！对全体敌人造成 ${totalDamage} 点巨额伤害！`);
        return true;
    }
    
    // 执行士气降低计谋
    executeMoraleDownTactic(tactic, battle) {
        const aliveEnemies = battle.enemyTeam.filter(e => e.currentHp > 0);
        if (aliveEnemies.length === 0) return false;
        
        const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        // 简化处理：士气降低相当于降低攻击力
        if (!target.moraleDown) target.moraleDown = 0;
        target.moraleDown += tactic.moraleDamage;
        target.attack = Math.max(1, target.attack - Math.floor(tactic.moraleDamage * 0.5));
        
        battle.log.push(`💢 使用【${tactic.name}】！${target.name} 士气降低 ${tactic.moraleDamage} 点！`);
        return true;
    }
    
    // 执行士气提升计谋
    executeMoraleUpTactic(tactic, battle) {
        if (tactic.target === 'all_allies') {
            battle.playerTeam.forEach(player => {
                if (player.currentHp > 0) {
                    if (!player.moraleUp) player.moraleUp = 0;
                    player.moraleUp += tactic.moraleBoost;
                    player.attack = Math.floor(player.attack * 1.1);
                }
            });
            battle.log.push(`🎵 使用【${tactic.name}】！全体武将士气提升 ${tactic.moraleBoost} 点！`);
        } else if (tactic.target === 'single_ally') {
            const alivePlayers = battle.playerTeam.filter(p => p.currentHp > 0);
            if (alivePlayers.length === 0) return false;
            const target = alivePlayers[Math.floor(Math.random() * alivePlayers.length)];
            if (!target.moraleUp) target.moraleUp = 0;
            target.moraleUp += tactic.moraleBoost;
            target.attack = Math.floor(target.attack * 1.15);
            battle.log.push(`💪 使用【${tactic.name}】！${target.name} 士气提升 ${tactic.moraleBoost} 点！`);
        }
        
        return true;
    }
    
    // 显示计谋动画
    showTacticAnim(tactic, isEnemy = false) {
        const container = document.getElementById('battle-container');
        if (!container) return;
        
        // 创建动画元素
        const anim = document.createElement('div');
        anim.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 100px;
            z-index: 1000;
            animation: tactic-anim 1s ease-out;
            pointer-events: none;
        `;
        anim.textContent = tactic.icon;
        
        // 添加 CSS 动画
        if (!document.getElementById('tactic-anim-style')) {
            const style = document.createElement('style');
            style.id = 'tactic-anim-style';
            style.innerHTML = `
                @keyframes tactic-anim {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
                    50% { transform: translate(-50%, -50%) scale(1.5); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(1); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        container.appendChild(anim);
        setTimeout(() => anim.remove(), 1000);
    }
    
    showNotification(message, type = 'info', duration = 3000) {
        // 移除旧的通知
        const oldNotification = document.getElementById('game-notification');
        if (oldNotification) oldNotification.remove();
        
        const notification = document.createElement('div');
        notification.id = 'game-notification';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 15px 30px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 10000;
            font-weight: bold;
            animation: slideDown 0.3s ease;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
    
    showSummon() {
        this.showModal('summon-modal');
        this.renderSummonPool();
    }
    
    // 渲染武将池
    renderSummonPool() {
        const poolDiv = document.getElementById('summon-pool');
        if (!poolDiv) return;
        
        // 按稀有度分组统计
        const poolStats = {
            UR: HERO_DATABASE.filter(h => h.rarity === 'UR').length,
            SSR: HERO_DATABASE.filter(h => h.rarity === 'SSR').length,
            SR: HERO_DATABASE.filter(h => h.rarity === 'SR').length,
            R: HERO_DATABASE.filter(h => h.rarity === 'R').length
        };
        
        let html = `
            <div style="margin-bottom: 20px;">
                <h4 style="margin-bottom: 10px;">📊 武将池统计</h4>
                <div style="display: flex; gap: 15px; justify-content: center; flex-wrap: wrap;">
                    <div style="background: linear-gradient(135deg, #E91E63, #333); padding: 10px 20px; border-radius: 10px; color: white; text-align: center;">
                        <div style="font-size: 20px; font-weight: bold;">UR</div>
                        <div style="font-size: 14px;">${poolStats.UR} 人</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #FF9800, #333); padding: 10px 20px; border-radius: 10px; color: white; text-align: center;">
                        <div style="font-size: 20px; font-weight: bold;">SSR</div>
                        <div style="font-size: 14px;">${poolStats.SSR} 人</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #2196F3, #333); padding: 10px 20px; border-radius: 10px; color: white; text-align: center;">
                        <div style="font-size: 20px; font-weight: bold;">SR</div>
                        <div style="font-size: 14px;">${poolStats.SR} 人</div>
                    </div>
                    <div style="background: linear-gradient(135deg, #4CAF50, #333); padding: 10px 20px; border-radius: 10px; color: white; text-align: center;">
                        <div style="font-size: 20px; font-weight: bold;">R</div>
                        <div style="font-size: 14px;">${poolStats.R} 人</div>
                    </div>
                </div>
            </div>
            
            <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <h4 style="margin: 0;">🎴 武将池详情（${HERO_DATABASE.length}人）</h4>
                    <button id="toggle-pool-btn" onclick="game.toggleSummonPool()" class="btn btn-sm" style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 8px 20px; font-size: 14px;">
                        👁️ 查看详情
                    </button>
                </div>
                <div id="summon-pool-detail" style="display: none;">
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px; max-height: 400px; overflow-y: auto; padding: 10px; background: rgba(0,0,0,0.2); border-radius: 10px;">
                        ${HERO_DATABASE.map(hero => {
                            const rarity = RARITY[hero.rarity];
                            return `
                                <div style="background: linear-gradient(135deg, ${rarity.color}, #333); padding: 10px; border-radius: 8px; text-align: center; color: white; border: 2px solid ${rarity.color};">
                                    <div style="font-size: 24px;">${hero.icon}</div>
                                    <div style="font-weight: bold; font-size: 14px; margin: 5px 0;">${hero.name}</div>
                                    <div style="font-size: 11px; opacity: 0.8;">${hero.title}</div>
                                    <div style="font-size: 10px; margin-top: 3px; background: rgba(255,255,255,0.2); padding: 2px 5px; border-radius: 10px; display: inline-block;">${hero.rarity}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        
        poolDiv.innerHTML = html;
    }
    
    // 切换武将池详情显示/隐藏
    toggleSummonPool() {
        const detailDiv = document.getElementById('summon-pool-detail');
        const toggleBtn = document.getElementById('toggle-pool-btn');
        
        if (!detailDiv || !toggleBtn) return;
        
        if (detailDiv.style.display === 'none') {
            detailDiv.style.display = 'block';
            toggleBtn.innerHTML = '🔼 收起详情';
            toggleBtn.style.background = 'linear-gradient(135deg, #e74c3c, #c0392b)';
        } else {
            detailDiv.style.display = 'none';
            toggleBtn.innerHTML = '👁️ 查看详情';
            toggleBtn.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        }
    }
    
    async summon(count) {
        // 防抖检查：防止快速点击
        if (!this.canPerformAction('summon', 1000)) {
            console.log('⚠️ 招募操作过于频繁，请稍后再试');
            return;
        }
        
        const cost = count * 100;
        if (this.player.gem < cost) {
            this.showModalBox('元宝不足', `❌ 元宝不足！需要 ${cost} 元宝`);
            return;
        }
        
        // 检查武将数量，如果过多则提示
        const maxHeroes = 50;
        if (this.player.heroes.length + count > maxHeroes) {
            const confirmSummon = confirm(
                `⚠️ 武将数量过多！\n\n` +
                `当前武将数量：${this.player.heroes.length}\n` +
                `本次招募数量：${count}\n` +
                `招募后总数：${this.player.heroes.length + count}\n` +
                `建议最大数量：${maxHeroes}\n\n` +
                `💡 提示：可以通过升星消耗重复武将\n\n` +
                `是否继续招募？`
            );
            if (!confirmSummon) return;
        }
        
        this.player.gem -= cost;
        this.updateResourceDisplay();
        
        console.log(`🎴 开始招募 ${count} 名武将`);
        console.log(`  - 消耗元宝：${cost}`);
        console.log(`  - 招募前武将数量：${this.player.heroes.length}`);
        
        // 显示抽卡动画
        await this.showSummonAnimation(count);
        
        const results = [];
        
        for (let i = 0; i < count; i++) {
            const rand = Math.random() * 100;
            let rarity = 'R';
            if (rand < 2) rarity = 'UR';
            else if (rand < 10) rarity = 'SSR';
            else if (rand < 35) rarity = 'SR';
            
            const pool = HERO_DATABASE.filter(h => h.rarity === rarity);
            const hero = pool[Math.floor(Math.random() * pool.length)];
            
            if (hero) {
                const existing = this.player.heroes.find(h => h.id === hero.id);
                if (existing) {
                    const dupeHero = { 
                        ...hero, 
                        level: 1,
                        star: 0,
                        currentHp: hero.hp,
                        equipment: {
                            weapon: null,
                            armor: null,
                            helmet: null,
                            boots: null
                        },
                        isDupe: true
                    };
                    this.player.heroes.push(dupeHero);
                    this.player.gold += 50;
                    results.push(dupeHero);
                } else {
                    const newHero = { 
                        ...hero, 
                        level: 1,
                        star: 0,
                        currentHp: hero.hp,
                        equipment: {
                            weapon: null,
                            armor: null,
                            helmet: null,
                            boots: null
                        }
                    };
                    this.player.heroes.push(newHero);
                    results.push(newHero);
                }
            }
        }
        
        this.updateResourceDisplay();
        this.renderSummonResult(results);
        this.updateDailyQuest('summon');
        this.saveGame();
    }
    
    // 显示抽卡动画
    showSummonAnimation(count) {
        return new Promise((resolve) => {
            const resultDiv = document.getElementById('summon-result');
            if (!resultDiv) {
                resolve();
                return;
            }
            
            // 显示动画容器
            resultDiv.innerHTML = `
                <div style="text-align: center; padding: 50px;">
                    <div style="font-size: 60px; animation: summon-glow 1s ease-in-out infinite;">✨</div>
                    <div style="font-size: 24px; margin-top: 20px; color: #f39c12;">正在招募武将...</div>
                    <div style="font-size: 16px; margin-top: 10px; color: #999;">第 ${count} 次召唤</div>
                </div>
            `;
            
            // 添加 CSS 动画
            if (!document.getElementById('summon-animation-style')) {
                const style = document.createElement('style');
                style.id = 'summon-animation-style';
                style.innerHTML = `
                    @keyframes summon-glow {
                        0%, 100% { transform: scale(1); opacity: 1; filter: brightness(1); }
                        50% { transform: scale(1.2); opacity: 0.8; filter: brightness(1.5); }
                    }
                    @keyframes card-flip {
                        0% { transform: rotateY(0deg); opacity: 0; }
                        50% { transform: rotateY(90deg); opacity: 0.5; }
                        100% { transform: rotateY(0deg); opacity: 1; }
                    }
                    @keyframes rarity-glow {
                        0%, 100% { box-shadow: 0 0 20px rgba(255,255,255,0.5); }
                        50% { box-shadow: 0 0 40px rgba(255,255,255,0.8), 0 0 60px rgba(255,215,0,0.6); }
                    }
                `;
                document.head.appendChild(style);
            }
            
            // 延迟显示结果
            setTimeout(() => {
                resolve();
            }, 1500);
        });
    }
    
    renderSummonResult(results) {
        const resultDiv = document.getElementById('summon-result');
        if (!resultDiv) return;
        
        // 统计稀有度
        const rarityCount = { UR: 0, SSR: 0, SR: 0, R: 0 };
        results.forEach(r => {
            if (rarityCount[r.rarity] !== undefined) rarityCount[r.rarity]++;
        });
        
        // 检查是否有高稀有度武将
        const hasUR = rarityCount.UR > 0;
        const hasSSR = rarityCount.SSR > 0;
        
        resultDiv.innerHTML = `
            <div style="margin-bottom: 20px; padding: 15px; background: linear-gradient(135deg, ${hasUR ? '#E91E63' : hasSSR ? '#FF9800' : '#4CAF50'}, #333); border-radius: 15px; color: white; text-align: center; animation: rarity-glow 2s ease-in-out infinite;">
                <div style="font-size: 20px; font-weight: bold;">🎉 招募完成！</div>
                <div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px; font-size: 14px;">
                    ${rarityCount.UR > 0 ? `<span style="background: rgba(233,30,99,0.5); padding: 5px 15px; border-radius: 20px;">UR: ${rarityCount.UR}</span>` : ''}
                    ${rarityCount.SSR > 0 ? `<span style="background: rgba(255,152,0,0.5); padding: 5px 15px; border-radius: 20px;">SSR: ${rarityCount.SSR}</span>` : ''}
                    ${rarityCount.SR > 0 ? `<span style="background: rgba(33,150,243,0.5); padding: 5px 15px; border-radius: 20px;">SR: ${rarityCount.SR}</span>` : ''}
                    ${rarityCount.R > 0 ? `<span style="background: rgba(76,175,80,0.5); padding: 5px 15px; border-radius: 20px;">R: ${rarityCount.R}</span>` : ''}
                </div>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(${results.length > 5 ? 5 : results.length}, 1fr); gap: 15px; margin-top: 20px;">
                ${results.map((r, index) => {
                    const rarity = RARITY[r.rarity];
                    const template = HERO_DATABASE.find(h => h.id === r.id) || r;
                    const isHighRarity = r.rarity === 'UR' || r.rarity === 'SSR';
                    return `
                        <div style="background: linear-gradient(135deg, ${rarity.color} 0%, #333 100%); padding: 20px; border-radius: 15px; text-align: center; color: white; animation: card-flip 0.6s ease-out ${index * 0.1}s both; ${isHighRarity ? 'border: 3px solid gold; box-shadow: 0 0 20px rgba(255,215,0,0.5);' : 'border: 2px solid rgba(255,255,255,0.3);'} position: relative; overflow: hidden;">
                            ${isHighRarity ? '<div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(255,215,0,0.3) 0%, transparent 70%); animation: rarity-glow 2s ease-in-out infinite;"></div>' : ''}
                            <div style="position: relative; z-index: 1;">
                                <div style="font-size: 48px; margin-bottom: 10px; filter: drop-shadow(2px 2px 4px rgba(0,0,0,0.5));">${template.icon || '⭐'}</div>
                                <div style="font-size: 12px; color: rgba(255,255,255,0.8); margin-bottom: 5px;">${template.title || ''}</div>
                                <div style="font-size: 18px; font-weight: bold; margin-bottom: 5px;">${r.name}</div>
                                <div style="font-size: 14px; background: rgba(255,255,255,0.2); padding: 3px 10px; border-radius: 10px; display: inline-block;">${r.rarity}</div>
                                ${r.isDupe ? '<div style="font-size: 12px; color: #f39c12; margin-top: 10px; font-weight: bold;">✨ 重复武将 +50 金币</div>' : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    showHeroList() {
        console.log('📋 打开武将列表，武将数量:', this.player.heroes.length);
        this.showScreen('heroes');
        const countDisplay = document.getElementById('hero-count');
        const content = document.getElementById('heroes-content');
        
        if (countDisplay) countDisplay.textContent = this.player.heroes.length;
        
        if (this.player.heroes.length === 0) {
            content.innerHTML = '<div style="text-align: center; padding: 50px; color: #999;">暂无武将，快去招募吧！</div>';
            return;
        }
        
        content.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; padding: 20px;">
                ${this.player.heroes.map((hero, index) => {
                    const template = HERO_DATABASE.find(h => h.id === hero.id);
                    // 确保有完整的数据
                    const name = hero.name || (template ? template.name : '未知武将');
                    const rarityKey = template ? template.rarity : 'R';
                    const rarity = RARITY[rarityKey] || RARITY.R;
                    const faction = template ? template.faction : '群';
                    const factionColor = FACTION_COLORS[faction] || '#999';
                    const icon = template ? template.icon : '⭐';
                    const title = template ? template.title : '';
                    const level = hero.level || 1;
                    const star = hero.star || 0;
                    
                    // 计算属性（考虑等级和星级加成）
                    const baseHp = template ? template.hp : 200;
                    const baseAttack = template ? template.attack : 50;
                    const baseDefense = template ? template.defense : 30;
                    const baseSpeed = template ? template.speed : 30;
                    
                    const hp = hero.hp || Math.floor(baseHp * (1 + (level - 1) * 0.1) * (1 + star * 0.2));
                    const attack = hero.attack || Math.floor(baseAttack * (1 + (level - 1) * 0.1) * (1 + star * 0.2));
                    const defense = hero.defense || Math.floor(baseDefense * (1 + (level - 1) * 0.1) * (1 + star * 0.2));
                    const speed = hero.speed || Math.floor(baseSpeed * (1 + (level - 1) * 0.1) * (1 + star * 0.2));
                    
                    return `
                        <div style="background: linear-gradient(135deg, ${rarity.color} 0%, #333 100%); padding: 20px; border-radius: 15px; position: relative;">
                            <div style="position: absolute; top: 10px; right: 10px; background: ${factionColor}; padding: 3px 8px; border-radius: 5px; font-size: 12px;">${faction}</div>
                            ${hero.isDupe ? '<div style="position: absolute; top: 10px; left: 10px; background: #f39c12; padding: 3px 8px; border-radius: 5px; font-size: 12px; color: white;">🔄 重复</div>' : ''}
                            <div style="text-align: center; margin-bottom: 10px;">
                                <div style="font-size: 48px;">${icon}</div>
                                <div style="font-size: 12px; color: rgba(255,255,255,0.7); font-style: italic;">${title}</div>
                            </div>
                            <div style="font-size: 24px; margin-bottom: 10px; color: white; text-align: center;">${name}</div>
                            <div style="font-size: 14px; margin-bottom: 10px; color: rgba(255,255,255,0.8); text-align: center;">Lv.${level} ${rarity.name} ${star > 0 ? '⭐'.repeat(star) : ''}</div>
                            ${hero.isDupe ? '<div style="text-align: center; margin-bottom: 10px; color: #f39c12; font-size: 12px;">⚠️ 此武将可用于升星</div>' : ''}
                            <div style="font-size: 14px; margin-bottom: 5px;">
                                <div>❤️ HP: ${hp}</div>
                                <div>⚔️ 攻击：${attack}</div>
                                <div>🛡️ 防御：${defense}</div>
                                <div>💨 速度：${speed}</div>
                            </div>
                            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 8px; margin-top: 15px;">
                                <button class="btn btn-sm" onclick="game.upgradeHero(${index})" style="background: #f39c12; color: white; font-size: 12px;">⬆️ 升级</button>
                                <button class="btn btn-sm" onclick="game.upgradeHeroStar(${index})" style="background: #9b59b6; color: white; font-size: 12px;">⭐ 升星</button>
                                <button class="btn btn-sm" onclick="game.equipToHero(${index})" style="background: #3498db; color: white; font-size: 12px;">⚔️ 装备</button>
                                <button class="btn btn-sm" onclick="game.removeHero(${index})" style="background: #e74c3c; color: white; font-size: 12px;">🗑️</button>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        console.log('✅ 武将列表渲染完成');
    }
    
    removeHero(index) {
        if (confirm('确定要解散这个武将吗？')) {
            const removedHero = this.player.heroes[index];
            if (removedHero && this.player.team.includes(removedHero.id)) {
                const teamIndex = this.player.team.indexOf(removedHero.id);
                this.player.team.splice(teamIndex, 1);
            }
            this.player.heroes.splice(index, 1);
            this.showHeroList();
            this.updateTeamDisplay();
            alert('✅ 武将已解散');
        }
    }
    
    showTeamEditor() {
        this.showModal('team-editor-modal');
        const currentDiv = document.getElementById('current-team');
        const availableDiv = document.getElementById('available-heroes');
        
        if (!currentDiv || !availableDiv) return;
        
        currentDiv.innerHTML = `
            <h4>当前阵容 (${this.player.team.length}/5) 
                <button class="btn btn-sm" onclick="game.autoSelectTeam()" style="background: #2ecc71; color: white; margin-left: 10px;">⚡ 一键上阵</button>
            </h4>
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-bottom: 20px;">
                ${Array(5).fill(null).map((_, i) => {
                    const heroId = this.player.team[i];
                    const hero = this.player.heroes.find(h => h.id === heroId);
                    const template = hero ? HERO_DATABASE.find(h => h.id === heroId) : null;
                    return `
                        <div style="background: ${hero ? '#3498db' : '#ecf0f1'}; padding: 15px; border-radius: 10px; text-align: center; min-height: 100px;">
                            ${hero ? `
                                <div style="font-size: 32px; margin-bottom: 5px;">${template?.icon || '⭐'}</div>
                                <div style="font-weight: bold; color: white;">${hero.name}</div>
                                <div style="font-size: 12px; color: rgba(255,255,255,0.8);">Lv.${hero.level || 1}</div>
                                <button class="btn btn-sm" onclick="game.removeFromTeam(${i})" style="margin-top: 5px; background: #e74c3c; padding: 5px 10px; color: white;">下阵</button>
                            ` : '<div style="color: #999; margin-top: 35px;">空位</div>'}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        const availableHeroes = this.player.heroes.filter(h => !this.player.team.includes(h.id));
        availableDiv.innerHTML = `
            <h4>可选武将</h4>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 10px;">
                ${availableHeroes.length > 0 ? availableHeroes.map(hero => {
                    const template = HERO_DATABASE.find(h => h.id === hero.id) || hero;
                    return `
                        <div style="background: #2ecc71; padding: 10px; border-radius: 8px; text-align: center; cursor: pointer; color: white;" onclick="game.addToTeam('${hero.id}')">
                            <div style="font-size: 24px; margin-bottom: 3px;">${template.icon || '⭐'}</div>
                            <div style="font-weight: bold;">${hero.name}</div>
                            <div style="font-size: 12px;">Lv.${hero.level || 1}</div>
                            <div style="font-size: 10px; margin-top: 5px;">点击上阵</div>
                        </div>
                    `;
                }).join('') : '<div style="color: #999; grid-column: 1/-1; text-align: center; padding: 20px;">没有可上阵的武将</div>'}
            </div>
        `;
    }
    
    addToTeam(heroId) {
        if (this.player.team.length >= 5) {
            this.showToast('⚠️ 阵容已满 (5 人)');
            return;
        }
        if (!this.player.team.includes(heroId)) {
            this.player.team.push(heroId);
            this.showTeamEditor();
            this.updateTeamDisplay();
        }
    }
    
    removeFromTeam(index) {
        this.player.team.splice(index, 1);
        this.showTeamEditor();
        this.updateTeamDisplay();
    }
    
    // 一键上阵：自动选择战力最强的 5 个武将
    autoSelectTeam() {
        if (this.player.heroes.length === 0) {
            this.showToast('⚠️ 没有可上阵的武将！');
            return;
        }
        
        // 计算每个武将的战力值（简单公式：HP/10 + 攻击 + 防御 + 速度）
        const heroPower = this.player.heroes.map(hero => {
            const power = Math.floor(hero.hp / 10) + hero.attack + hero.defense + hero.speed;
            return { id: hero.id, power: power };
        });
        
        // 按战力排序，取前 5 名
        heroPower.sort((a, b) => b.power - a.power);
        const top5 = heroPower.slice(0, 5);
        
        this.player.team = top5.map(h => h.id);
        
        this.showTeamEditor();
        this.updateTeamDisplay();
        this.updateTeamStats();
        this.saveGame();
        
        const heroNames = top5.map(h => {
            const hero = this.player.heroes.find(hero => hero.id === h.id);
            return hero ? hero.name : '';
        }).filter(name => name);
        
        this.showModalBox('一键上阵', `✅ 一键上阵完成！\n上阵武将：${heroNames.join('、')}`, true, 2000);
    }
    
    renderDailyQuests() {
        const listDiv = document.getElementById('daily-quest-list');
        if (!listDiv) return;
        
        // 添加一键领取按钮
        let html = `
            <div style="text-align: right; margin-bottom: 10px;">
                <button class="btn btn-warning btn-sm" onclick="game.claimAllQuestRewards()" style="background: linear-gradient(135deg, #f39c12, #d35400);">
                    🎁 一键领取所有奖励
                </button>
            </div>
        `;
        
        html += DAILY_QUESTS.map(quest => {
            const progress = (this.player.dailyQuests[quest.id] || 0);
            const completed = progress >= quest.target;
            const claimed = this.player.dailyQuests[quest.id + '_claimed'];
            
            return `
                <div style="background: ${completed && !claimed ? 'rgba(46, 204, 113, 0.2)' : 'rgba(0,0,0,0.2)'}; padding: 15px; border-radius: 10px; margin-bottom: 10px; display: flex; justify-content: space-between; align-items: center;">
                    <div style="flex: 1;">
                        <div style="font-weight: bold; margin-bottom: 5px;">${quest.name}</div>
                        <div style="font-size: 13px; opacity: 0.8;">${quest.desc}</div>
                        <div style="font-size: 12px; margin-top: 5px;">进度：${Math.min(progress, quest.target)}/${quest.target} ${completed ? '✅' : ''}</div>
                    </div>
                    ${completed && !claimed ? `
                        <button class="btn btn-success" onclick="game.claimQuestReward(${quest.id})" style="padding: 8px 15px;">领取奖励</button>
                    ` : claimed ? '<div style="color: #999; font-size: 12px;">已领取</div>' : ''}
                </div>
            `;
        }).join('');
        
        listDiv.innerHTML = html;
    }
    
    updateDailyQuest(type) {
        if (type === 'battle_win') {
            [1, 2].forEach(id => {
                this.player.dailyQuests[id] = (this.player.dailyQuests[id] || 0) + 1;
            });
        }
        if (type === 'summon') {
            this.player.dailyQuests[3] = (this.player.dailyQuests[3] || 0) + 1;
        }
        if (type === 'hero_upgrade') {
            this.player.dailyQuests[4] = (this.player.dailyQuests[4] || 0) + 1;
        }
        if (type === 'level_pass') {
            this.player.dailyQuests[5] = (this.player.dailyQuests[5] || 0) + 1;
        }
        if (type === 'equip_upgrade') {
            this.player.dailyQuests[6] = (this.player.dailyQuests[6] || 0) + 1;
        }
    }
    
    claimQuestReward(questId) {
        const quest = DAILY_QUESTS.find(q => q.id === questId);
        if (!quest) return;
        
        const progress = this.player.dailyQuests[questId] || 0;
        
        console.log(`📋 领取奖励验证:`);
        console.log(`  - 任务 ID: ${questId}`);
        console.log(`  - 任务名称：${quest.name}`);
        console.log(`  - 当前进度：${progress}`);
        console.log(`  - 目标进度：${quest.target}`);
        console.log(`  - 是否已完成：${progress >= quest.target}`);
        console.log(`  - 是否已领取：${this.player.dailyQuests[questId + '_claimed']}`);
        
        if (progress < quest.target) {
            this.showToast('❌ 任务未完成');
            return;
        }
        
        if (this.player.dailyQuests[questId + '_claimed']) {
            this.showToast('❌ 奖励已领取');
            return;
        }
        
        console.log(`✅ 领取每日任务奖励：${quest.name}`);
        console.log(`  - 金币 +${quest.reward.gold}`);
        console.log(`  - 元宝 +${quest.reward.gem}`);
        console.log(`  - 经验 +${quest.reward.exp}`);
        
        this.player.gold += quest.reward.gold;
        this.player.gem += quest.reward.gem;
        this.player.exp += quest.reward.exp;
        this.player.dailyQuests[questId + '_claimed'] = true;
        
        if (questId === 7) {
            const completedCount = DAILY_QUESTS.filter(q => 
                this.player.dailyQuests[q.id + '_claimed']
            ).length;
            if (completedCount >= 5) {
                this.player.dailyQuests[7] = 5;
            }
        }
        
        this.showModalBox('领取奖励', `✅ 领取奖励！\n💰 金币 +${quest.reward.gold}\n💎 元宝 +${quest.reward.gem}\n✨ 经验 +${quest.reward.exp}`, true, 2000);
        this.saveGame();
        this.updateResourceDisplay();
        this.renderDailyQuests();
        // 注意：领取奖励后不会自动开始战斗，需要玩家手动操作
    }
    
    // 一键领取所有任务奖励
    claimAllQuestRewards() {
        this.playSFX('getItem');
        
        let totalGold = 0;
        let totalGem = 0;
        let totalExp = 0;
        let claimedCount = 0;
        
        DAILY_QUESTS.forEach(quest => {
            const questId = quest.id;
            const progress = this.player.dailyQuests[questId] || 0;
            const claimed = this.player.dailyQuests[questId + '_claimed'];
            
            if (progress >= quest.target && !claimed) {
                this.player.gold += quest.reward.gold;
                this.player.gem += quest.reward.gem;
                this.player.exp += quest.reward.exp;
                this.player.dailyQuests[questId + '_claimed'] = true;
                
                totalGold += quest.reward.gold;
                totalGem += quest.reward.gem;
                totalExp += quest.reward.exp;
                claimedCount++;
            }
        });
        
        if (claimedCount === 0) {
            this.showToast('⚠️ 没有可领取的奖励');
            return;
        }
        
        alert(
            `✅ 一键领取成功！\n\n` +
            `领取数量：${claimedCount} 个\n` +
            `💰 金币 +${totalGold}\n` +
            `💎 元宝 +${totalGem}\n` +
            `✨ 经验 +${totalExp}`
        );
        
        this.saveGame();
        this.updateResourceDisplay();
        this.renderDailyQuests();
    }
    
    // ========== 新手引导系统 ==========
    startTutorial() {
        if (!this.player.tutorial) {
            this.player.tutorial = { step: 0, completed: false };
        }
        
        const step = this.player.tutorial.step;
        
        switch(step) {
            case 0:
                this.showTutorialWelcome();
                break;
            case 1:
                this.showTutorialSummon();
                break;
            case 2:
                this.showTutorialUpgrade();
                break;
            case 3:
                this.showTutorialStarUpgrade();
                break;
            case 4:
                this.showTutorialEquipment();
                break;
            default:
                this.completeTutorial();
        }
    }
    
    showTutorialWelcome() {
        setTimeout(() => {
            alert(
                `🎮 欢迎来到《三国英雄传》！\n\n` +
                `📖 游戏说明：\n` +
                `• 招募武将，组建你的最强阵容\n` +
                `• 升级武将，提升战斗力\n` +
                `• 收集重复武将进行升星\n` +
                `• 穿戴装备，强化属性\n` +
                `• 挑战关卡，赢取丰厚奖励\n\n` +
                `💡 接下来将为你介绍游戏基本玩法`
            );
            
            this.player.tutorial.step = 1;
            this.saveGame();
        }, 500);
    }
    
    showTutorialSummon() {
        setTimeout(() => {
            alert(
                `🎴 武将招募系统\n\n` +
                `点击主界面的"招募武将"按钮\n` +
                `• 单次招募：100 元宝\n` +
                `• 十连招募：1000 元宝（推荐）\n\n` +
                `💡 稀有度概率：\n` +
                `UR(2%) > SSR(8%) > SR(25%) > R(65%)\n\n` +
                `重复武将可用于升星！`
            );
            
            this.player.tutorial.step = 2;
            this.saveGame();
        }, 500);
    }
    
    showTutorialUpgrade() {
        setTimeout(() => {
            alert(
                `⬆️ 武将升级系统\n\n` +
                `在武将列表中选择武将，点击"升级"\n` +
                `• 消耗金币提升等级\n` +
                `• 等级上限 100 级\n` +
                `• 每级提升基础属性\n\n` +
                `💡 提示：可以使用"一键升级"快速升到满级`
            );
            
            this.player.tutorial.step = 3;
            this.saveGame();
        }, 500);
    }
    
    showTutorialStarUpgrade() {
        setTimeout(() => {
            alert(
                `⭐ 武将升星系统\n\n` +
                `收集重复武将后进行升星\n` +
                `• 0 星→1 星：需要 1 个重复武将\n` +
                `• 1 星→2 星：需要 2 个重复武将\n` +
                `• 2 星→3 星：需要 3 个重复武将\n` +
                `• 依此类推...\n\n` +
                `💡 升星后全属性提升 20%！\n⚠️ 注意：升星前需要先下阵武将`
            );
            
            this.player.tutorial.step = 4;
            this.saveGame();
        }, 500);
    }
    
    showTutorialEquipment() {
        setTimeout(() => {
            alert(
                `⚔️ 装备系统\n\n` +
                `通过关卡掉落获得装备\n` +
                `• 武器：增加攻击力\n` +
                `• 防具：增加防御力\n` +
                `• 头盔：增加血量\n` +
                `• 靴子：增加速度\n\n` +
                `品质：白色 < 绿色 < 蓝色 < 紫色 < 橙色 < 红色`
            );
            
            this.player.tutorial.step = 5;
            this.saveGame();
        }, 500);
    }
    
    completeTutorial() {
        setTimeout(() => {
            alert(
                `🎉 恭喜完成新手引导！\n\n` +
                `你已经了解了游戏的基本玩法\n` +
                `现在就开始你的三国征程吧！\n\n` +
                `💡 提示：\n` +
                `• 每日记得完成任务领取奖励\n` +
                `• 合理搭配阵容，提升战力\n` +
                `• 挂机模式可自动挑战关卡\n\n` +
                `祝你游戏愉快！`
            );
            
            this.player.tutorial.completed = true;
            this.player.tutorial.step = 6;
            this.saveGame();
            
            console.log('✅ 新手引导完成');
        }, 500);
    }
    
    // 显示挂机统计
    showAFKStats() {
        const stats = this.player.stats;
        const afkBattles = stats.afkBattles || 0;
        const afkRewards = stats.afkRewards || 0;
        const afkTime = stats.afkTime || 0;
        
        alert(
            `📊 挂机统计\n\n` +
            `🤖 挂机战斗次数：${afkBattles} 次\n` +
            `💰 挂机获得资源：${afkRewards} (金币 + 经验)\n` +
            `⏱️ 挂机总时长：${afkTime} 分钟\n\n` +
            `💡 提示：挂机模式可自动挑战关卡，解放双手！`
        );
    }
    
    // 切换夜间模式
    toggleNightMode() {
        document.body.classList.toggle('night-mode');
        const isNight = document.body.classList.contains('night-mode');
        console.log(`🌙 夜间模式已${isNight ? '开启' : '关闭'}`);
    }
    
    // 调节字体大小
    setFontSize(size) {
        document.body.classList.remove('font-large', 'font-small');
        if (size === 'large') {
            document.body.classList.add('font-large');
        } else if (size === 'small') {
            document.body.classList.add('font-small');
        }
        console.log(`📝 字体大小已设置为：${size}`);
    }
    
    // 显示设置菜单
    showSettings() {
        const confirm = confirm(
            `⚙️ 游戏设置\n\n` +
            `1. 夜间模式：切换深色背景\n` +
            `2. 字体大小：大/中/小\n` +
            `3. 音效开关：开启/关闭音效\n\n` +
            `选择操作：\n` +
            `点击"确定"切换夜间模式\n` +
            `点击"取消"调整其他设置`
        );
        
        if (confirm) {
            this.toggleNightMode();
            alert(`🌙 夜间模式已${document.body.classList.contains('night-mode') ? '开启' : '关闭'}`);
        } else {
            const choice = prompt(
                '请输入选项：\n' +
                '1. 调整字体大小（large/medium/small）\n' +
                '2. 切换音效（on/off）',
                '1'
            );
            
            if (choice === '1' || choice === 'large' || choice === 'medium' || choice === 'small') {
                const size = choice === '1' ? prompt('请输入字体大小 (large/medium/small):', 'medium') : choice;
                if (size) {
                    this.setFontSize(size);
                    alert(`📝 字体大小已调整`);
                }
            } else if (choice === '2' || choice === 'on' || choice === 'off') {
                if (choice === '2') {
                    this.toggleAudio();
                } else {
                    this.audioEnabled = (choice === 'on');
                    alert(`🔊 音效已${this.audioEnabled ? '开启' : '关闭'}`);
                }
            }
        }
    }
    
    // 手动重新触发新手引导（用于测试）
    resetTutorial() {
        if (this.player.tutorial) {
            this.player.tutorial.step = 0;
            this.player.tutorial.completed = false;
            this.saveGame();
            this.startTutorial();
            console.log('🔄 新手引导已重置');
        }
    }
}

// ========== 全局函数 ==========
let game = null;
window.onload = () => { game = new Game(); };
window.onresize = () => { if (game) game.resize(); };
