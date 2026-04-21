// ==================== 数据持久化和辅助方法 ====================

// 加载游戏
loadGame() {
    const saved = localStorage.getItem('sanguo_idle_save');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            Object.assign(this.player, data);
            console.log('✓ 存档加载成功');
        } catch (e) {
            console.error('存档损坏，使用新游戏', e);
        }
    } else {
        // 新游戏赠送初始武将
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
        console.log('✓ 新游戏初始化');
    }
}

// 自动保存
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

// 手动保存
saveGame() {
    this.autoSave();
    this.showNotification('游戏已保存');
}

// 检查每日重置
checkDailyReset() {
    const now = Date.now();
    const lastReset = this.player.lastDailyReset;
    const daysPassed = Math.floor((now - lastReset) / 86400000);
    
    if (daysPassed >= 1) {
        // 重置每日任务
        this.player.dailyQuests = {};
        this.player.lastDailyReset = now;
        
        // 增加登录天数
        this.player.stats.loginDays += daysPassed;
        
        this.showNotification(`欢迎回来！已登录${this.player.stats.loginDays}天`);
    }
}

// 计算离线收益
calculateIdleReward() {
    const now = Date.now();
    const lastSave = this.state.lastSaveTime || now;
    const minutesOffline = Math.floor((now - lastSave) / 60000);
    const cappedMinutes = Math.min(minutesOffline, CONFIG.MAX_IDLE_REWARD_TIME);
    
    const goldPerMinute = 10 + this.player.level * 2;
    const totalGold = cappedMinutes * goldPerMinute;
    
    this.state.idleReward = totalGold;
    
    const idleEl = document.getElementById('idle-gold');
    if (idleEl) {
        idleEl.textContent = this.formatNumber(totalGold);
    }
}

// 领取离线收益
gainIdleReward() {
    if (this.state.idleReward > 0) {
        this.player.gold += this.state.idleReward;
        this.showNotification(`领取离线收益：💰${this.formatNumber(this.state.idleReward)}`);
        this.state.idleReward = 0;
        this.updateResourceDisplay();
    }
}

// 绑定事件
bindEvents() {
    // 窗口大小调整
    window.addEventListener('resize', () => this.resize());
    
    // 自动战斗按钮
    document.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'auto-battle-btn') {
            this.autoBattle = !this.autoBattle;
            e.target.textContent = this.autoBattle ? '⏸️ 暂停' : '▶️ 自动';
        }
    });
    
    // 防止弹窗点击关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    console.log('✓ 事件绑定完成');
}

// 显示新手引导
showGuideIfNew() {
    if (this.player.hasSkippedGuide) return;
    if (this.player.heroes.length > 1) return; // 不是新玩家
    
    setTimeout(() => {
        this.showNotification('🎮 欢迎来到三国英雄传！');
        setTimeout(() => {
            this.showNotification('📖 点击"快速战斗"开始游戏');
        }, 1500);
    }, 500);
}

// 更新每日任务进度
updateDailyQuest(questId, increment = 1) {
    if (!this.player.dailyQuests[questId]) {
        this.player.dailyQuests[questId] = 0;
    }
    this.player.dailyQuests[questId] += increment;
    
    // 检查是否完成
    const quest = DAILY_QUESTS.find(q => q.id === questId);
    if (quest && this.player.dailyQuests[questId] >= quest.target) {
        this.player.gold += quest.reward.gold;
        this.player.gem += quest.reward.gem;
        this.showNotification(`每日任务完成：${quest.name}`);
        this.updateResourceDisplay();
    }
}

// 渲染每日任务摘要
renderDailyQuestSummary() {
    const summary = document.getElementById('daily-quest-summary');
    if (!summary) return;
    
    let completed = 0;
    let total = DAILY_QUESTS.length;
    
    DAILY_QUESTS.forEach(quest => {
        const progress = this.player.dailyQuests[quest.id] || 0;
        if (progress >= quest.target) completed++;
    });
    
    summary.innerHTML = `
        <div class="quest-progress-bar">
            <div class="progress" style="width: ${completed / total * 100}%"></div>
        </div>
        <div>${completed}/${total} 已完成</div>
    `;
}

// 开始征战
startCampaign(chapter) {
    if (this.player.team.length === 0) {
        this.showNotification('请先组建阵容！');
        return;
    }
    
    // 根据章节生成不同难度的敌人
    const enemyTemplate = ENEMIES[Math.min(chapter, ENEMIES.length - 1)];
    const enemy = {
        ...enemyTemplate,
        hp: Math.floor(enemyTemplate.hp * (1 + chapter * 0.2)),
        attack: Math.floor(enemyTemplate.attack * (1 + chapter * 0.2)),
        defense: Math.floor(enemyTemplate.defense * (1 + chapter * 0.2)),
        exp: Math.floor(enemyTemplate.exp * (1 + chapter * 0.5))
    };
    
    this.state.battle = {
        playerTeam: this.player.team.map(heroId => this.getHeroById(heroId)).filter(h => h),
        enemyTeam: [{
            ...enemy,
            currentHp: enemy.hp,
            currentMp: 50
        }],
        turn: 0,
        log: [`第${chapter + 1}关：遭遇${enemy.name}！`],
        chapter: chapter
    };
    
    this.showBattleUI();
}

// 使用物品
useItem(itemId, heroId) {
    const item = SHOP_ITEMS.find(i => i.id === itemId);
    if (!item || !this.player.items[itemId] || this.player.items[itemId] <= 0) {
        this.showNotification('没有该物品');
        return;
    }
    
    const hero = this.getHeroById(heroId);
    if (!hero) {
        this.showNotification('武将不存在');
        return;
    }
    
    this.player.items[itemId]--;
    
    switch (item.effect) {
        case 'hp':
            hero.hp = Math.min(hero.hp + item.value, hero.hp * 1.5);
            break;
        case 'mp':
            // MP 系统预留
            break;
        case 'exp':
            hero.exp += item.value;
            this.checkLevelUp(hero);
            break;
        case 'star':
            // 升星石预留
            break;
    }
    
    this.showNotification(`使用了${item.name}`);
    this.updateTeamDisplay();
}

// 重置游戏
resetGame() {
    if (confirm('确定要删除存档重新开始吗？此操作不可恢复！')) {
        localStorage.removeItem('sanguo_idle_save');
        location.reload();
    }
}

// 导出存档
exportSave() {
    const save = localStorage.getItem('sanguo_idle_save');
    if (!save) {
        this.showNotification('没有存档可导出');
        return;
    }
    
    const blob = new Blob([save], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sanguo_save_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    this.showNotification('存档已导出');
}

// 导入存档
importSave(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
        try {
            const data = JSON.parse(e.target.result);
            localStorage.setItem('sanguo_idle_save', JSON.stringify(data));
            this.showNotification('存档导入成功，刷新页面生效');
            setTimeout(() => location.reload(), 1500);
        } catch (err) {
            this.showNotification('存档格式错误');
        }
    };
    reader.readAsText(file);
}

// 格式化时间
formatTime(ms) {
    const minutes = Math.floor(ms / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days}天`;
    if (hours > 0) return `${hours}小时`;
    if (minutes > 0) return `${minutes}分钟`;
    return '刚刚';
}

// 获取武将头像颜色
getHeroColor(rarity) {
    return RARITY[rarity]?.color || '#999999';
}

// 计算升级所需经验
getExpNeeded(hero) {
    return hero.level * 100;
}

// 检查是否可以升级
canUpgrade(hero) {
    const base = HERO_DATABASE.find(h => h.id === hero.id);
    return hero.level < RARITY[base.rarity].maxLevel;
}

// 检查是否可以升星
canUpgradeStar(hero) {
    const base = HERO_DATABASE.find(h => h.id === hero.id);
    return hero.star < RARITY[base.rarity].maxStar;
}

// 获取武将最大等级
getMaxLevel(hero) {
    const base = HERO_DATABASE.find(h => h.id === hero.id);
    return RARITY[base.rarity]?.maxLevel || 10;
}

// 获取武将最大星级
getMaxStar(hero) {
    const base = HERO_DATABASE.find(h => h.id === hero.id);
    return RARITY[base.rarity]?.maxStar || 5;
}

// 计算阵容总战力
calculateTeamPower() {
    return this.player.team
        .map(heroId => this.getHeroById(heroId))
        .filter(h => h)
        .reduce((sum, hero) => sum + this.calculatePower(hero), 0);
}

// 一键布阵（按战力排序）
autoArrangeTeam() {
    this.player.team = this.player.heroes
        .sort((a, b) => this.calculatePower(b) - this.calculatePower(a))
        .slice(0, 5)
        .map(h => h.id);
    
    this.updateTeamDisplay();
    this.showNotification('已按战力自动布阵');
}

// 清空阵容
clearTeam() {
    this.player.team = [];
    this.updateTeamDisplay();
    this.showNotification('阵容已清空');
}

// 设置主力阵容
setMainTeam() {
    if (this.player.heroes.length === 0) {
        this.showNotification('没有可用的武将');
        return;
    }
    
    // 选择战力最高的 5 个武将
    this.autoArrangeTeam();
}

// 快速升级武将
quickUpgrade(heroId, times = 1) {
    const hero = this.getHeroById(heroId);
    if (!hero) return;
    
    for (let i = 0; i < times; i++) {
        if (!this.canUpgrade(hero)) break;
        
        const cost = this.getUpgradeCost(hero);
        if (this.player.gold < cost) break;
        
        this.upgradeHero(heroId);
    }
}

// 快速升星武将
quickUpgradeStar(heroId) {
    const hero = this.getHeroById(heroId);
    if (!hero) return;
    
    while (this.canUpgradeStar(hero)) {
        const cost = this.getStarCost(hero);
        if (this.player.gem < cost) break;
        
        this.upgradeStar(heroId);
    }
}

// 批量招募
batchSummon(times) {
    if (times <= 0 || times > 20) {
        this.showNotification('招募次数必须在 1-20 之间');
        return;
    }
    
    const cost = times * 100;
    if (this.player.gem < cost) {
        this.showNotification('元宝不足');
        return;
    }
    
    this.summon(times);
}

// 查看武将详情（从列表）
viewHeroDetail(heroId) {
    this.showHeroDetail(heroId);
}

// 锁定武将
lockHero(heroId) {
    const hero = this.player.heroes.find(h => h.id === heroId);
    if (hero) {
        hero.locked = true;
        this.showNotification('已锁定该武将');
    }
}

// 解锁武将
unlockHero(heroId) {
    const hero = this.player.heroes.find(h => h.id === heroId);
    if (hero) {
        hero.locked = false;
        this.showNotification('已解锁该武将');
    }
}

// 分解武将
disassembleHero(heroId) {
    const hero = this.player.heroes.find(h => h.id === heroId);
    if (!hero) {
        this.showNotification('武将不存在');
        return;
    }
    
    if (this.player.team.includes(heroId)) {
        this.showNotification('上阵中的武将不能分解');
        return;
    }
    
    if (hero.locked) {
        this.showNotification('已锁定的武将不能分解');
        return;
    }
    
    const refund = Math.floor(this.getUpgradeCost(hero) * 0.5);
    this.player.gold += refund;
    
    this.player.heroes = this.player.heroes.filter(h => h.id !== heroId);
    
    this.showNotification(`已分解${hero.name}，返还${refund}金币`);
    this.updateTeamDisplay();
}

// 获取所有武将
getAllHeroes() {
    return this.player.heroes.map(heroId => this.getHeroById(heroId)).filter(h => h);
}

// 获取上阵武将
getTeamHeroes() {
    return this.player.team.map(heroId => this.getHeroById(heroId)).filter(h => h);
}

// 获取未上阵武将
getBenchHeroes() {
    return this.player.heroes
        .filter(h => !this.player.team.includes(h.id))
        .map(h => this.getHeroById(h.id))
        .filter(h => h);
}

// 搜索武将
searchHeroes(query) {
    const lowerQuery = query.toLowerCase();
    return this.player.heroes
        .map(h => this.getHeroById(h.id))
        .filter(h => h && h.name.toLowerCase().includes(lowerQuery));
}

// 按稀有度筛选武将
filterHeroesByRarity(rarity) {
    return this.player.heroes
        .map(h => this.getHeroById(h.id))
        .filter(h => h && HERO_DATABASE.find(db => db.id === h.id)?.rarity === rarity);
}

// 按等级筛选武将
filterHeroesByLevel(minLevel, maxLevel) {
    return this.player.heroes
        .map(h => this.getHeroById(h.id))
        .filter(h => h && h.level >= minLevel && h.level <= maxLevel);
}

// 获取最强阵容
getStrongestTeam() {
    const sorted = [...this.player.heroes]
        .map(h => this.getHeroById(h.id))
        .filter(h => h)
        .sort((a, b) => this.calculatePower(b) - this.calculatePower(a));
    
    return sorted.slice(0, 5).map(h => h.id);
}

// 推荐阵容
recommendTeam() {
    // 简单的职业搭配推荐
    const team = [];
    
    // 1 个坦克
    const tanks = this.player.heroes
        .map(h => this.getHeroById(h.id))
        .filter(h => h && h.hp > h.attack * 2)
        .sort((a, b) => b.hp - a.hp);
    
    if (tanks[0]) team.push(tanks[0].id);
    
    // 2 个输出
    const dps = this.player.heroes
        .map(h => this.getHeroById(h.id))
        .filter(h => h && !team.includes(h.id))
        .sort((a, b) => b.attack - a.attack);
    
    if (dps[0]) team.push(dps[0].id);
    if (dps[1]) team.push(dps[1].id);
    
    // 1 个辅助
    const supports = this.player.heroes
        .map(h => this.getHeroById(h.id))
        .filter(h => h && !team.includes(h.id) && h.speed > h.attack)
        .sort((a, b) => b.speed - a.speed);
    
    if (supports[0]) team.push(supports[0].id);
    
    // 1 个自由位
    const remaining = this.player.heroes
        .map(h => this.getHeroById(h.id))
        .filter(h => h && !team.includes(h.id))
        .sort((a, b) => this.calculatePower(b) - this.calculatePower(a));
    
    if (remaining[0]) team.push(remaining[0].id);
    
    return team;
}

// 应用推荐阵容
applyRecommendedTeam() {
    this.player.team = this.recommendTeam();
    this.updateTeamDisplay();
    this.showNotification('已应用推荐阵容');
}

// 检查新手引导完成
checkGuideComplete() {
    if (this.player.team.length >= 3 && this.player.level >= 5) {
        this.player.hasSkippedGuide = true;
        this.showNotification('新手引导完成！');
    }
}

// 获取玩家等级
getPlayerLevel() {
    return this.player.level;
}

// 玩家升级
playerLevelUp() {
    const expNeeded = this.player.level * 1000;
    
    if (this.player.exp >= expNeeded) {
        this.player.exp -= expNeeded;
        this.player.level++;
        this.player.gold += 500;
        this.player.gem += 50;
        
        this.showNotification(`玩家升级到 Lv.${this.player.level}！`);
        this.updateResourceDisplay();
        
        // 检查成就
        this.checkAchievements();
    }
}

// 获得经验
gainExp(amount) {
    this.player.exp += amount;
    this.playerLevelUp();
}

// 获得金币
gainGold(amount) {
    this.player.gold += amount;
    this.updateResourceDisplay();
}

// 获得元宝
gainGem(amount) {
    this.player.gem += amount;
    this.updateResourceDisplay();
}

// 消费金币
spendGold(amount) {
    if (this.player.gold >= amount) {
        this.player.gold -= amount;
        this.updateResourceDisplay();
        return true;
    }
    return false;
}

// 消费元宝
spendGem(amount) {
    if (this.player.gem >= amount) {
        this.player.gem -= amount;
        this.updateResourceDisplay();
        return true;
    }
    return false;
}

// 获取金币
getGold() {
    return this.player.gold;
}

// 获取元宝
getGem() {
    return this.player.gem;
}

// 获取玩家统计数据
getStats() {
    return this.player.stats;
}

// 更新统计数据
updateStats(key, value) {
    if (this.player.stats.hasOwnProperty(key)) {
        this.player.stats[key] = value;
    }
}

// 增加统计数据
incrementStats(key, amount = 1) {
    if (this.player.stats.hasOwnProperty(key)) {
        this.player.stats[key] += amount;
    }
}

// 获取成就列表
getAchievements() {
    return this.player.achievements;
}

// 获取已完成成就数量
getCompletedAchievementsCount() {
    return this.player.achievements.length;
}

// 获取总成就数量
getTotalAchievementsCount() {
    return ACHIEVEMENTS.length;
}

// 获取成就完成度
getAchievementProgress() {
    return `${this.getCompletedAchievementsCount()}/${this.getTotalAchievementsCount()}`;
}

// 检查签到
checkSignIn() {
    const today = new Date().toDateString();
    const lastSignIn = new Date(this.player.lastLogin).toDateString();
    
    if (today !== lastSignIn) {
        this.player.signInDay = (this.player.signInDay % 7) + 1;
        const reward = SIGN_IN_REWARDS[this.player.signInDay - 1];
        
        this.player.gem += reward.gem;
        this.player.gold += reward.gold;
        
        this.showNotification(`签到成功！获得💎${reward.gem} 💰${reward.gold}`);
        this.updateResourceDisplay();
        
        this.player.lastLogin = Date.now();
        return true;
    }
    
    return false;
}

// 获取签到奖励
claimSignInReward() {
    if (this.checkSignIn()) {
        const reward = SIGN_IN_REWARDS[this.player.signInDay - 1];
        return reward;
    }
    return null;
}

// 获取连续签到天数
getSignInStreak() {
    return this.player.signInDay;
}

// 重置签到（测试用）
resetSignIn() {
    this.player.signInDay = 0;
    this.player.lastLogin = 0;
}
