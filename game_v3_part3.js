// ==================== 游戏核心方法实现 ====================

// 切换屏幕
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

// 更新资源显示
updateResourceDisplay() {
    const levelEl = document.querySelector('.level');
    const goldEl = document.querySelector('.gold');
    const gemEl = document.querySelector('.gem');
    if (levelEl) levelEl.textContent = `Lv.${this.player.level}`;
    if (goldEl) goldEl.textContent = `💰 ${this.formatNumber(this.player.gold)}`;
    if (gemEl) gemEl.textContent = `💎 ${this.formatNumber(this.player.gem)}`;
}

// 更新阵容显示
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

// 渲染武将列表
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

// 显示武将详情
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

// 获取升级花费
getUpgradeCost(hero) {
    const base = HERO_DATABASE.find(h => h.id === hero.id);
    if (!base) return 0;
    return Math.floor(50 * Math.pow(1.1, hero.level) * (base.rarity === 'UR' ? 5 : base.rarity === 'SSR' ? 3 : 1));
}

// 获取升星花费
getStarCost(hero) {
    return hero.star * 100;
}

// 武将升级
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
    this.showHeroDetail(heroId); // 刷新详情
}

// 武将升星
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
    this.showHeroDetail(heroId); // 刷新详情
}

// 显示招募界面
showSummon() {
    const modal = document.getElementById('summon-modal');
    if (modal) modal.style.display = 'flex';
    this.updatePityDisplay();
}

// 更新保底显示
updatePityDisplay() {
    const ssrPity = this.getPityCount('ssr');
    const urPity = this.getPityCount('ur');
    
    const ssrBar = document.querySelector('.pity-bar:nth-child(1) .progress');
    const urBar = document.querySelector('.pity-bar:nth-child(2) .progress');
    
    if (ssrBar) ssrBar.style.width = `${Math.min(100, ssrPity / 90 * 100)}%`;
    if (urBar) urBar.style.width = `${Math.min(100, urPity / 180 * 100)}%`;
}

// 招募武将
summon(times) {
    const cost = times * 100;
    if (this.player.gem < cost) {
        this.showNotification('元宝不足！');
        return;
    }
    
    this.player.gem -= cost;
    this.updateResourceDisplay();
    
    const results = [];
    for (let i = 0; i < times; i++) {
        this.player.stats.summonCount++;
        const rarity = this.rollRarity();
        const heroes = HERO_DATABASE.filter(h => h.rarity === rarity);
        const hero = heroes[Math.floor(Math.random() * heroes.length)] || heroes[0];
        
        const existing = this.player.heroes.find(h => h.id === hero.id);
        if (existing) {
            existing.exp += 50; // 重复获得转化为经验
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
}

// 招募概率滚动
rollRarity() {
    const rand = Math.random();
    const ssrPity = this.getPityCount('ssr');
    const urPity = this.getPityCount('ur');
    
    // UR 保底
    if (urPity >= 180 || rand < 0.005) {
        this.player.stats.lastUR = this.player.stats.summonCount;
        return 'UR';
    }
    
    // SSR 保底
    if (ssrPity >= 90 || rand < 0.05) {
        this.player.stats.lastSSR = this.player.stats.summonCount;
        return 'SSR';
    }
    
    if (rand < 0.20) return 'SR';
    if (rand < 0.50) return 'R';
    return 'N';
}

// 显示招募结果
showSummonResult(results) {
    const resultDiv = document.getElementById('summon-result');
    if (!resultDiv) return;
    
    resultDiv.innerHTML = '<h4>招募结果:</h4><div class="summon-results">';
    results.forEach(hero => {
        resultDiv.innerHTML += `
            <div class="summoned-hero ${hero.rarity.toLowerCase()}">
                ${hero.name}
            </div>
        `;
    });
    resultDiv.innerHTML += '</div>';
}

// 关闭弹窗
closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

// 显示商店
showShop() {
    const modal = document.getElementById('shop-modal');
    const content = document.getElementById('shop-items');
    if (!modal || !content) return;
    
    content.innerHTML = '';
    SHOP_ITEMS.forEach(item => {
        content.innerHTML += `
            <div class="shop-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.desc}</p>
                </div>
                <button class="btn btn-primary" onclick="game.buyItem('${item.id}')">
                    购买 - 💰${item.price}
                </button>
            </div>
        `;
    });
    
    modal.style.display = 'flex';
}

// 购买物品
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

// 显示每日任务
showDailyQuests() {
    const modal = document.getElementById('daily-quest-modal');
    const content = document.getElementById('daily-quests-list');
    if (!modal || !content) return;
    
    content.innerHTML = '';
    DAILY_QUESTS.forEach(quest => {
        const progress = this.player.dailyQuests[quest.id] || 0;
        const completed = progress >= quest.target;
        
        content.innerHTML += `
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
    
    modal.style.display = 'flex';
}

// 显示阵容编辑
showTeamEditor() {
    const modal = document.getElementById('team-editor-modal');
    const content = document.getElementById('team-editor-content');
    if (!modal || !content) return;
    
    content.innerHTML = '<h3>调整阵容 (最多 5 人)</h3>';
    
    // 当前阵容
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
    
    // 可选武将
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

// 添加到阵容
addToTeam(heroId) {
    if (this.player.team.length >= 5) {
        this.showNotification('阵容已满');
        return;
    }
    
    this.player.team.push(heroId);
    this.showTeamEditor(); // 刷新
    this.updateTeamDisplay();
}

// 从阵容移除
removeFromTeam(index) {
    this.player.team.splice(index, 1);
    this.showTeamEditor(); // 刷新
    this.updateTeamDisplay();
}

// 分享游戏
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

// 显示通知
showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    
    notification.textContent = message;
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

// 开始战斗
startBattle() {
    if (this.player.team.length === 0) {
        this.showNotification('请先组建阵容！');
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

// 生成敌人队伍
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

// 显示战斗界面
showBattleUI() {
    document.getElementById('battle-ui').style.display = 'block';
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    
    this.renderBattleField();
    this.updateBattleUI();
}

// 渲染战斗场地
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

// 更新战斗 UI
updateBattleUI() {
    if (!this.state.battle) return;
    
    const battleLog = document.getElementById('battle-log');
    if (battleLog) {
        battleLog.innerHTML = this.state.battle.log.slice(-5).join('<br>');
    }
}

// 切换自动战斗
toggleAutoBattle() {
    this.autoBattle = !this.autoBattle;
    const btn = document.getElementById('auto-battle-btn');
    if (btn) {
        btn.textContent = this.autoBattle ? '⏸️ 暂停' : '▶️ 自动';
    }
}

// 设置战斗速度
setBattleSpeed(speed) {
    this.battleSpeed = speed;
}

// 跳过战斗
skipBattle() {
    if (!this.state.battle) return;
    
    const playerPower = this.state.battle.playerTeam.reduce((sum, h) => sum + this.calculatePower(h), 0);
    const enemyPower = this.state.battle.enemyTeam.reduce((sum, e) => sum + e.hp + e.attack, 0);
    
    if (playerPower > enemyPower * 1.5) {
        this.endBattle(true, true);
    } else {
        this.showNotification('实力不足，无法跳过！');
    }
}

// 结束战斗
endBattle(win, skipped = false) {
    if (win) {
        this.player.stats.battleWin++;
        const expGain = 50;
        const goldGain = 100;
        
        this.player.exp += expGain;
        this.player.gold += goldGain;
        
        // 武将获得经验
        this.state.battle.playerTeam.forEach(hero => {
            if (hero) {
                hero.exp += 20;
                this.checkLevelUp(hero);
            }
        });
        
        this.showNotification(`胜利！获得 ${expGain}经验 ${goldGain}金币`);
        this.updateResourceDisplay();
    } else {
        this.player.stats.battleLose++;
        this.showNotification('战斗失败...');
    }
    
    document.getElementById('battle-ui').style.display = 'none';
    this.showScreen('home');
    this.state.battle = null;
}

// 检查升级
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

// 渲染征战地图
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

// 开始特定战斗
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

// 渲染成就
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

// 检查成就
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

// 游戏循环
gameLoop() {
    const loop = () => {
        this.update();
        this.render();
        requestAnimationFrame(loop);
    };
    loop();
}

// 更新逻辑
update() {
    if (this.state.battle && this.autoBattle) {
        this.processBattleTurn();
    }
}

// 渲染
render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    if (this.state.battle) {
        this.renderBattleScene();
    } else {
        this.renderHomeScene();
    }
}

// 渲染首页场景
renderHomeScene() {
    const { width, height } = this.canvas;
    
    // 背景
    this.ctx.fillStyle = '#1a1a2e';
    this.ctx.fillRect(0, 0, width, height);
    
    // 标题
    this.ctx.fillStyle = '#ffd700';
    this.ctx.font = 'bold 48px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('三国英雄传', width / 2, height / 2 - 50);
    
    this.ctx.font = '24px Arial';
    this.ctx.fillStyle = '#ffffff';
    this.ctx.fillText('v3.0', width / 2, height / 2);
}

// 渲染战斗场景
renderBattleScene() {
    const { width, height } = this.canvas;
    
    // 战场背景
    this.ctx.fillStyle = '#2d1b0e';
    this.ctx.fillRect(0, 0, width, height);
}

// 处理战斗回合
processBattleTurn() {
    if (!this.state.battle) return;
    
    this.state.battle.turn++;
    this.state.battle.log.push(`回合 ${this.state.battle.turn}`);
    
    // 玩家回合
    this.state.battle.playerTeam.forEach(hero => {
        if (hero && hero.currentHp > 0) {
            const target = this.state.battle.enemyTeam.find(e => e.currentHp > 0);
            if (target) {
                const damage = Math.max(1, hero.attack - target.defense / 2);
                target.currentHp -= damage;
                this.state.battle.log.push(`${hero.name}攻击${target.name}造成${Math.floor(damage)}伤害`);
            }
        }
    });
    
    // 敌人回合
    this.state.battle.enemyTeam.forEach(enemy => {
        if (enemy.currentHp > 0) {
            const target = this.state.battle.playerTeam.find(h => h && h.currentHp > 0);
            if (target) {
                const damage = Math.max(1, enemy.attack - target.defense / 2);
                if (!target.currentHp) target.currentHp = target.hp;
                target.currentHp -= damage;
                this.state.battle.log.push(`${enemy.name}攻击${target.name}造成${Math.floor(damage)}伤害`);
            }
        }
    });
    
    // 检查胜负
    const playerAlive = this.state.battle.playerTeam.some(h => h && h.currentHp > 0);
    const enemyAlive = this.state.battle.enemyTeam.some(e => e.currentHp > 0);
    
    if (!enemyAlive) {
        this.endBattle(true);
    } else if (!playerAlive) {
        this.endBattle(false);
    }
    
    this.renderBattleField();
    this.updateBattleUI();
}
