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
            hasSkippedGuide: false
        };
        
        // 游戏状态
        this.state = {
            screen: 'home',
            battle: null,
            summon: null,
            idleReward: 0,
            lastSaveTime: Date.now(),
            battleSpeed: 1,
            showSkillButtons: false
        };
        
        this.autoBattle = false;
        this.battleSpeed = 1;
        
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
        this.setupUI();
        this.loadGame();
        this.checkDailyReset();
        this.updateTeamDisplay();
        this.updateResourceDisplay();
        this.calculateIdleReward();
        this.bindEvents();
        this.gameLoop();
        
        setInterval(() => this.autoSave(), CONFIG.SAVE_INTERVAL);
        setInterval(() => this.gainIdleReward(), CONFIG.IDLE_REWARD_INTERVAL);
        setInterval(() => this.checkAchievements(), 5000);
        
        this.showGuideIfNew();
        this.showScreen('home');
        
        console.log('🎮 三国英雄传 v2.0 初始化成功！');
    }
    
    resize() {
        const container = document.getElementById('game-container');
        if (container) {
            const rect = container.getBoundingClientRect();
            this.canvas.width = rect.width;
            this.canvas.height = rect.height;
        }
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
                <div class="heroes-content" id="heroes-content"></div>
            </div>
            
            <!-- 征战 -->
            <div id="battle-screen" class="screen">
                <div class="screen-header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>征战天下</h2>
                </div>
                <div class="chapter-list" id="chapter-list"></div>
            </div>
            
            <!-- 成就 -->
            <div id="achievements-screen" class="screen">
                <div class="screen-header">
                    <button class="back-btn" onclick="game.showScreen('home')">← 返回</button>
                    <h2>成就系统 (50+ 个)</h2>
                </div>
                <div class="achievements-content" id="achievements-content"></div>
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
                        <button class="btn btn-primary" onclick="game.summon(1)">
                            招募 x1<br>💎 100
                        </button>
                        <button class="btn btn-success" onclick="game.summon(10)">
                            招募 x10<br>💎 1000
                        </button>
                    </div>
                    <div id="summon-result" class="summon-result"></div>
                    <button class="btn btn-secondary" onclick="game.closeModal('summon-modal')">关闭</button>
                </div>
            </div>
            
            <!-- 武将详情弹窗 -->
            <div id="hero-detail-modal" class="modal">
                <div class="modal-content hero-detail">
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
