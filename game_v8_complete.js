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

// ==================== 30 武将数据库 ====================
const HERO_DATABASE = [
    // 蜀国（12 人）
    { id: 'liubei', name: '刘备', rarity: 'UR', faction: '蜀', hp: 380, attack: 75, defense: 65, speed: 52, icon: '👑', title: '仁德之君' },
    { id: 'guanyu', name: '关羽', rarity: 'UR', faction: '蜀', hp: 450, attack: 110, defense: 70, speed: 50, icon: '🐉', title: '武圣' },
    { id: 'zhangfei', name: '张飞', rarity: 'UR', faction: '蜀', hp: 500, attack: 95, defense: 60, speed: 55, icon: '🐍', title: '万人敌' },
    { id: 'zhugeliang', name: '诸葛亮', rarity: 'UR', faction: '蜀', hp: 280, attack: 90, defense: 50, speed: 70, icon: '🦢', title: '卧龙' },
    { id: 'zhaoyun', name: '赵云', rarity: 'SSR', faction: '蜀', hp: 350, attack: 85, defense: 55, speed: 75, icon: '⚡', title: '常胜将军' },
    { id: 'machao', name: '马超', rarity: 'SSR', faction: '蜀', hp: 340, attack: 90, defense: 50, speed: 78, icon: '🐎', title: '神威天将军' },
    { id: 'huangzhong', name: '黄忠', rarity: 'SSR', faction: '蜀', hp: 320, attack: 95, defense: 45, speed: 60, icon: '🏹', title: '神射手' },
    { id: 'weyan', name: '魏延', rarity: 'SSR', faction: '蜀', hp: 360, attack: 88, defense: 52, speed: 58, icon: '⚔️', title: '征西大将军' },
    { id: 'jiangwei', name: '姜维', rarity: 'SSR', faction: '蜀', hp: 330, attack: 82, defense: 55, speed: 65, icon: '🎯', title: '麒麟儿' },
    { id: 'liao', name: '廖化', rarity: 'SR', faction: '蜀', hp: 220, attack: 50, defense: 40, speed: 35, icon: '🛡️', title: '先锋大将' },
    { id: 'zhaolei', name: '赵累', rarity: 'R', faction: '蜀', hp: 180, attack: 40, defense: 35, speed: 30, icon: '🔰', title: '忠诚副将' },
    { id: 'mangchang', name: '孟获', rarity: 'SR', faction: '蜀', hp: 380, attack: 70, defense: 50, speed: 40, icon: '👹', title: '南蛮王' },
    // 魏国（10 人）
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
    // 吴国（6 人）
    { id: 'sunquan', name: '孙权', rarity: 'UR', faction: '吴', hp: 370, attack: 75, defense: 60, speed: 58, icon: '👑', title: '吴大帝' },
    { id: 'zhouyu', name: '周瑜', rarity: 'UR', faction: '吴', hp: 300, attack: 92, defense: 50, speed: 68, icon: '🎵', title: '美周郎' },
    { id: 'luxun', name: '陆逊', rarity: 'SSR', faction: '吴', hp: 310, attack: 85, defense: 52, speed: 65, icon: '🔥', title: '书生大将' },
    { id: 'lumeng', name: '吕蒙', rarity: 'SSR', faction: '吴', hp: 340, attack: 78, defense: 58, speed: 60, icon: '📚', title: '白衣渡江' },
    { id: 'ganning', name: '甘宁', rarity: 'SSR', faction: '吴', hp: 350, attack: 88, defense: 50, speed: 70, icon: '🔔', title: '锦帆贼' },
    { id: 'taishici', name: '太史慈', rarity: 'SSR', faction: '吴', hp: 380, attack: 82, defense: 55, speed: 62, icon: '🎯', title: '神箭将军' },
    // 群雄（2 人）
    { id: 'lvbu', name: '吕布', rarity: 'UR', faction: '群', hp: 520, attack: 120, defense: 65, speed: 58, icon: '😈', title: '飞将' },
    { id: 'dongzhuo', name: '董卓', rarity: 'SSR', faction: '群', hp: 550, attack: 85, defense: 70, speed: 40, icon: '👿', title: '暴君' }
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

// ==================== 关卡数据库 ====================
const LEVELS = [
    {
        id: 1, name: '涿郡起兵', difficulty: '简单', enemyCount: 2,
        enemies: [
            { name: '黄巾小兵', hp: 80, attack: 15, defense: 8 },
            { name: '黄巾小兵', hp: 80, attack: 15, defense: 8 }
        ],
        reward: { gold: 50, exp: 30, gem: 0, equipment: null },
        unlockReq: '新游戏解锁',
        story: '黄巾起义爆发，你在涿郡起兵响应...'
    },
    {
        id: 2, name: '讨伐董卓', difficulty: '简单', enemyCount: 2,
        enemies: [
            { name: '董卓军', hp: 120, attack: 25, defense: 15 },
            { name: '董卓军', hp: 120, attack: 25, defense: 15 }
        ],
        reward: { gold: 80, exp: 50, gem: 1, equipment: 'w1' },
        unlockReq: '通过第 1 关',
        story: '董卓祸乱朝纲，十八路诸侯共讨之...'
    },
    {
        id: 3, name: '三英战吕布', difficulty: '中等', enemyCount: 3,
        enemies: [
            { name: '吕布', hp: 300, attack: 80, defense: 50 },
            { name: '并州狼骑', hp: 100, attack: 30, defense: 20 },
            { name: '并州狼骑', hp: 100, attack: 30, defense: 20 }
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
            stats: { battleWin: 0, summonCount: 0, totalDamage: 0 },
            inventory: []
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
    
    checkLoginStatus() {
        const currentUser = accountManager.getCurrentAccount();
        if (currentUser) {
            this.currentUser = currentUser;
            this.player = accountManager.getPlayerData(currentUser);
            this.showScreen('home');
            this.setupHomeUI();
            this.updateResourceDisplay();
            this.renderDailyQuests();
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
                    </div>
                </div>
            </div>
        `;
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
                    <button class="btn btn-sm btn-secondary" onclick="game.showAccountMenu()">👤 账号</button>
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
                <div class="modal-content" style="max-width: 600px;">
                    <h2>🎴 招募武将（30 位英雄）</h2>
                    <div class="summon-rates" style="display: flex; justify-content: space-around; margin: 20px 0; padding: 15px; background: #f5f5f5; border-radius: 10px;">
                        <div class="rate"><span>UR</span><span>2%</span></div>
                        <div class="rate"><span>SSR</span><span>8%</span></div>
                        <div class="rate"><span>SR</span><span>25%</span></div>
                        <div class="rate"><span>R</span><span>65%</span></div>
                    </div>
                    <div class="summon-options" style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin: 20px 0;">
                        <button class="btn btn-success" onclick="game.summon(1)">🎴 招募一次 (100💎)</button>
                        <button class="btn btn-primary" onclick="game.summon(10)">🎴 招募十次 (1000💎)</button>
                    </div>
                    <div id="summon-result"></div>
                    <button class="btn btn-secondary" onclick="game.closeModal('summon-modal')">关闭</button>
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
        const hero = this.player.heroes[heroIndex];
        if (!hero) return;
        
        const maxLevel = 100;
        if (hero.level >= maxLevel) {
            alert('⚠️ 武将已达满级 100 级');
            return;
        }
        
        const cost = hero.level * 100;
        if (this.player.gold < cost) {
            alert(`❌ 金币不足！\n需要 ${cost} 金币\n当前 ${this.player.gold} 金币`);
            return;
        }
        
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
            alert(`✅ 一键升级完成！\n${hero.name} 从 Lv.${oldLevel} → Lv.${hero.level}\n消耗金币：${cost}`);
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
            alert('⚠️ 武将已达满级 100 级');
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
            alert('❌ 金币不足！');
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
        const hero = this.player.heroes[heroIndex];
        if (!hero) return;
        
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
            alert('❌ 升星条件错误，请重新尝试');
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
            alert(`❌ 重复武将不足！\n需要 ${requiredCopies} 个重复武将\n当前 ${availableCopies} 个`);
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
            alert('❌ 升星失败：无法移除重复武将');
            return;
        }
        
        // 升星并提升属性
        hero.star++;
        
        // 再次验证星级是否超过最大值
        if (hero.star > maxStar) {
            alert('❌ 升星失败：星级超过最大值');
            hero.star = maxStar;
            return;
        }
        
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
        this.showHeroList();
        this.saveGame(); // 保存游戏
        
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
    
    renderEquipmentList() {
        const listDiv = document.getElementById('equipment-list');
        if (!listDiv) return;
        
        // 如果没有武将
        if (this.player.heroes.length === 0) {
            listDiv.innerHTML = '<div style="text-align: center; padding: 50px; color: #999;">暂无武将，请先招募武将</div>';
            return;
        }
        
        // 显示武将选择器
        let html = `
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
        const selectedHero = this.player.heroes[this.state.selectedHeroForEquip];
        const equipped = selectedHero?.equipment[type];
        if (!equipped) return;
        
        this.player.inventory.push(equipped);
        selectedHero.equipment[type] = null;
        
        this.updateTeamStats();
        this.renderEquipmentList();
        this.saveGame();
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
            alert('⚠️ 战斗正在进行中！');
            return;
        }
        
        const level = LEVELS.find(l => l.id === levelId);
        if (!level) return;
        
        if (this.player.team.length === 0) {
            alert('⚠️ 阵容为空！请先编辑阵容');
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
        
        this.state.battle = {
            turn: 1,
            level: level,
            playerTeam: this.player.team.map(id => {
                const hero = this.player.heroes.find(h => h.id === id);
                return hero ? { ...hero, currentHp: hero.hp } : null;
            }).filter(h => h),
            enemyTeam: enemyTeam,
            log: [`📜 ${level.story}`, `战斗开始！`]
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
                
                this.state.battle.turn++;
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
                this.player.inventory.push({ ...equip });
            }
        }
        
        if (!this.player.passedLevels.includes(level.id)) {
            this.player.passedLevels.push(level.id);
            this.player.currentLevel = level.id + 1;
        }
        
        this.updateDailyQuest('battle_win');
        this.player.stats.battleWin = (this.player.stats.battleWin || 0) + 1;
        this.saveGame();
        
        // 先清理战斗状态并返回主页
        this.state.battle = null;
        this.battleRunning = false;
        this.showScreen('home');
        this.updateResourceDisplay();
        this.renderDailyQuests();
        
        // 延迟显示奖励信息，避免在战斗界面弹窗
        setTimeout(() => {
            let rewardText = `🎉 战斗胜利！\n📜 关卡：${level.name}\n💰 金币 +${reward.gold}\n✨ 经验 +${reward.exp}`;
            if (reward.gem > 0) rewardText += `\n💎 元宝 +${reward.gem}`;
            if (reward.equipment) rewardText += `\n⚔️ 装备 +1`;
            alert(rewardText);
            
            // 如果挂机模式开启，自动挑战下一关
            // 注意：只在主页且没有其他弹窗时才开始自动战斗
            if (this.autoBattle && this.player.currentLevel <= LEVELS.length) {
                // 给玩家一个提示，然后开始下一关
                setTimeout(() => {
                    // 检查是否还在主页，如果不在主页则不自动开始战斗
                    const currentScreen = document.querySelector('.screen.active');
                    if (!currentScreen || currentScreen.id !== 'home-screen') {
                        console.log('⏸️ 玩家已离开主页，暂停自动战斗');
                        return;
                    }
                    
                    const nextLevel = LEVELS.find(l => l.id === this.player.currentLevel);
                    if (nextLevel) {
                        console.log(`🤖 挂机模式：开始挑战 ${nextLevel.name}`);
                        this.startLevel(this.player.currentLevel);
                    }
                }, 300);
            }
        }, 100);
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
            alert('❌ 战斗失败！请强化武将后再来挑战！');
        }, 100);
    }
    
    endBattle(isRun) {
        if (this.battleTimer) {
            clearInterval(this.battleTimer);
            this.battleTimer = null;
        }
        this.battleRunning = false;
        
        // 逃跑时重置挂机状态
        if (this.autoBattle) {
            this.autoBattle = false;
            const btn = document.getElementById('auto-battle-btn');
            if (btn) {
                btn.textContent = '🤖 挂机：关';
                btn.style.background = '#2ecc71';
            }
        }
        
        if (isRun) alert('🏃 逃跑成功！');
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
                            <div style="background: #333; height: 15px; border-radius: 8px; overflow: hidden; box-shadow: inset 0 2px 5px rgba(0,0,0,0.5); position: relative;">
                                <div class="hp-bar" style="background: linear-gradient(90deg, #2ecc71, #27ae60); height: 100%; width: ${(h.currentHp / h.hp) * 100}%; transition: width 0.5s ease-out; position: absolute;"></div>
                            </div>
                            <div class="hp-text" style="margin-top: 5px; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.5);">${Math.ceil(h.currentHp)}/${h.hp}</div>
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
                <div style="margin-top: 30px; text-align: center;">
                    <button class="btn btn-danger" onclick="game.endBattle(true)" style="box-shadow: 0 5px 15px rgba(231,76,60,0.4); transition: all 0.3s; transform: scale(1);">🏃 逃跑</button>
                    <button class="btn btn-success" onclick="game.toggleAutoBattle()" id="auto-battle-btn" style="box-shadow: 0 5px 15px rgba(46,204,113,0.4); transition: all 0.3s; margin-left: 10px; transform: scale(1);">🤖 挂机：关</button>
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
            if (rand < 2) rarity = 'UR';
            else if (rand < 10) rarity = 'SSR';
            else if (rand < 35) rarity = 'SR';
            
            const pool = HERO_DATABASE.filter(h => h.rarity === rarity);
            const hero = pool[Math.floor(Math.random() * pool.length)];
            
            if (hero) {
                const existing = this.player.heroes.find(h => h.id === hero.id);
                if (existing) {
                    // 重复武将：添加到武将列表（用于升星）
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
                        isDupe: true  // 标记为重复武将
                    };
                    this.player.heroes.push(dupeHero);
                    this.player.gold += 50;  // 额外奖励
                    results.push(dupeHero);
                } else {
                    const newHero = { 
                        ...hero, 
                        level: 1,
                        star: 0,  // 初始为 0 星
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
    }
    
    renderSummonResult(results) {
        const resultDiv = document.getElementById('summon-result');
        if (!resultDiv) return;
        
        resultDiv.innerHTML = `
            <div style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; margin-top: 20px;">
                ${results.map(r => {
                    const rarity = RARITY[r.rarity];
                    const template = HERO_DATABASE.find(h => h.id === r.id) || r;
                    return `
                        <div style="background: linear-gradient(135deg, ${rarity ? rarity.color : '#999'} 0%, #333 100%); padding: 15px; border-radius: 10px; text-align: center; color: white;">
                            <div style="font-size: 36px; margin-bottom: 5px;">${template.icon || '⭐'}</div>
                            <div style="font-size: 10px; color: rgba(255,255,255,0.7);">${template.title || ''}</div>
                            <div style="font-size: 16px; font-weight: bold;">${r.name}</div>
                            <div style="font-size: 12px; margin-top: 5px;">${r.rarity}</div>
                            ${r.isDupe ? '<div style="font-size: 10px; color: #f39c12; margin-top: 5px;">+50 金币</div>' : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }
    
    showHeroList() {
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
                    const template = HERO_DATABASE.find(h => h.id === hero.id) || hero;
                    const rarity = RARITY[template.rarity];
                    const factionColor = FACTION_COLORS[template.faction] || '#999';
                    const level = hero.level || 1;
                    
                    return `
                        <div style="background: linear-gradient(135deg, ${rarity ? rarity.color : '#999'} 0%, #333 100%); padding: 20px; border-radius: 15px; position: relative;">
                            <div style="position: absolute; top: 10px; right: 10px; background: ${factionColor}; padding: 3px 8px; border-radius: 5px; font-size: 12px;">${template.faction}</div>
                            ${hero.isDupe ? '<div style="position: absolute; top: 10px; left: 10px; background: #f39c12; padding: 3px 8px; border-radius: 5px; font-size: 12px; color: white;">🔄 重复</div>' : ''}
                            <div style="text-align: center; margin-bottom: 10px;">
                                <div style="font-size: 48px;">${template.icon || '⭐'}</div>
                                <div style="font-size: 12px; color: rgba(255,255,255,0.7); font-style: italic;">${template.title || ''}</div>
                            </div>
                            <div style="font-size: 24px; margin-bottom: 10px; color: white; text-align: center;">${template.name}</div>
                            <div style="font-size: 14px; margin-bottom: 10px; color: rgba(255,255,255,0.8); text-align: center;">Lv.${level} ${rarity.name} ${hero.star ? '⭐'.repeat(hero.star) : ''}</div>
                            ${hero.isDupe ? '<div style="text-align: center; margin-bottom: 10px; color: #f39c12; font-size: 12px;">⚠️ 此武将可用于升星</div>' : ''}
                            <div style="font-size: 14px; margin-bottom: 5px;">
                                <div>❤️ HP: ${hero.hp}</div>
                                <div>⚔️ 攻击：${hero.attack}</div>
                                <div>🛡️ 防御：${hero.defense}</div>
                                <div>💨 速度：${hero.speed}</div>
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
            alert('⚠️ 阵容已满 (5 人)');
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
            alert('⚠️ 没有可上阵的武将！');
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
        
        alert(`✅ 一键上阵完成！\n上阵武将：${heroNames.join('、')}`);
    }
    
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
                        <div style="font-size: 12px; margin-top: 5px;">进度：${Math.min(progress, quest.target)}/${quest.target} ${completed ? '✅' : ''}</div>
                    </div>
                    ${completed && !claimed ? `
                        <button class="btn btn-success" onclick="game.claimQuestReward(${quest.id})" style="padding: 8px 15px;">领取奖励</button>
                    ` : claimed ? '<div style="color: #999; font-size: 12px;">已领取</div>' : ''}
                </div>
            `;
        }).join('');
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
        
        alert(`✅ 领取奖励！\n💰 金币 +${quest.reward.gold}\n💎 元宝 +${quest.reward.gem}\n✨ 经验 +${quest.reward.exp}`);
        this.saveGame();
        this.updateResourceDisplay();
        this.renderDailyQuests();
        // 注意：领取奖励后不会自动开始战斗，需要玩家手动操作
    }
}

// ========== 全局函数 ==========
let game = null;
window.onload = () => { game = new Game(); };
window.onresize = () => { if (game) game.resize(); };
