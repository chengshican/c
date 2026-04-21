// 三国英雄传 v3.1 - 数值平衡优化版
// 优化升级曲线、抽卡概率、战斗收益

// ==================== 每日任务（提高元宝奖励）【优化 P2-25】 ====================
const DAILY_QUESTS_UPDATED = [
    { id: 'battle1', name: '初战告捷', desc: '完成 1 次战斗', target: 1, reward: { gold: 50, gem: 5 } },
    { id: 'battle5', name: '连战连捷', desc: '完成 5 次战斗', target: 5, reward: { gold: 200, gem: 15 } },
    { id: 'battle10', name: '战无不胜', desc: '完成 10 次战斗', target: 10, reward: { gold: 500, gem: 30 } },
    { id: 'summon1', name: '招募武将', desc: '进行 1 次招募', target: 1, reward: { gold: 100, gem: 10 } },
    { id: 'upgrade1', name: '武将升级', desc: '武将升级 1 次', target: 1, reward: { gold: 100, gem: 15 } }
];

// 导出到全局（如果需要替换原 DAILY_QUESTS）
// DAILY_QUESTS = DAILY_QUESTS_UPDATED;
