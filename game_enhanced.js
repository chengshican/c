// 吞食天地 RPG - 增强版
// 包含：策略战斗、武将系统、物品系统、任务系统

// ==================== 游戏配置 ====================
const CONFIG = {
    TILE_SIZE: 32,
    MAP_WIDTH: 15,
    MAP_HEIGHT: 13,
    SCREEN_WIDTH: 512,
    SCREEN_HEIGHT: 480,
    FPS: 60
};

// ==================== 游戏状态 ====================
const GameState = {
    MAP: 'map',
    BATTLE: 'battle',
    DIALOG: 'dialog',
    MENU: 'menu',
    SHOP: 'shop',
    STRATEGY: 'strategy'
};

// ==================== 武将数据 ====================
const HEROES = {
    liubei: {
        id: 'liubei',
        name: '刘备',
        hp: 120,
        maxHp: 120,
        mp: 60,
        maxMp: 60,
        attack: 50,
        defense: 45,
        speed: 40,
        strategy: 45,
        level: 5,
        exp: 0,
        sprite: 'hero',
        skills: ['鼓舞', '治疗']
    },
    guanyu: {
        id: 'guanyu',
        name: '关羽',
        hp: 140,
        maxHp: 140,
        mp: 50,
        maxMp: 50,
        attack: 70,
        defense: 50,
        speed: 35,
        strategy: 35,
        level: 5,
        exp: 0,
        sprite: 'hero',
        skills: ['斩击', '威压']
    },
    zhangfei: {
        id: 'zhangfei',
        name: '张飞',
        hp: 150,
        maxHp: 150,
        mp: 40,
        maxMp: 40,
        attack: 75,
        defense: 40,
        speed: 45,
        strategy: 25,
        level: 5,
        exp: 0,
        sprite: 'hero',
        skills: ['怒吼', '猛击']
    },
    zhugeliang: {
        id: 'zhugeliang',
        name: '诸葛亮',
        hp: 80,
        maxHp: 80,
        mp: 100,
        maxMp: 100,
        attack: 30,
        defense: 35,
        speed: 50,
        strategy: 90,
        level: 5,
        exp: 0,
        sprite: 'hero',
        skills: ['火计', '落雷', '治愈']
    },
    zhaoyun: {
        id: 'zhaoyun',
        name: '赵云',
        hp: 130,
        maxHp: 130,
        mp: 55,
        maxMp: 55,
        attack: 65,
        defense: 48,
        speed: 55,
        strategy: 40,
        level: 5,
        exp: 0,
        sprite: 'hero',
        skills: ['突袭', '龙胆']
    }
};

// ==================== 敌人数据 ====================
const ENEMIES = {
    soldier: {
        name: '黄巾兵',
        hp: 60,
        maxHp: 60,
        attack: 30,
        defense: 20,
        speed: 25,
        exp: 15,
        sprite: 'enemy'
    },
    archer: {
        name: '弓箭手',
        hp: 50,
        maxHp: 50,
        attack: 35,
        defense: 15,
        speed: 40,
        exp: 20,
        sprite: 'enemy'
    },
    general: {
        name: '黄巾武将',
        hp: 120,
        maxHp: 120,
        attack: 50,
        defense: 40,
        speed: 30,
        exp: 50,
        sprite: 'enemy'
    },
    zhangjiao: {
        name: '张角',
        hp: 350,
        maxHp: 350,
        attack: 65,
        defense: 50,
        speed: 35,
        exp: 200,
        sprite: 'boss',
        skills: ['妖术', '治疗']
    }
};

// ==================== 策略技能 ====================
const STRATEGIES = {
    fire: { name: '火计', mp: 15, power: 60, target: 'all_enemy' },
    thunder: { name: '落雷', mp: 20, power: 80, target: 'all_enemy' },
    heal: { name: '治愈', mp: 12, power: 50, target: 'ally' },
    encourage: { name: '鼓舞', mp: 10, power: 0, target: 'ally', effect: 'attack_up' },
    slash: { name: '斩击', mp: 8, power: 120, target: 'enemy' },
    roar: { name: '怒吼', mp: 10, power: 100, target: 'all_enemy' }
};

// ==================== 物品数据 ====================
const ITEMS = {
    hp_restore: { name: '伤药', effect: 'hp', value: 50, price: 20 },
    mp_restore: { name: '灵药', effect: 'mp', value: 30, price: 25 },
    revive: { name: '复活丹', effect: 'revive', value: 50, price: 100 },
    sword: { name: '青釭剑', effect: 'attack', value: 10, price: 200 },
    armor: { name: '铁甲', effect: 'defense', value: 10, price: 180 }
};

// ==================== 地图数据 ====================
const MAPS = {
    zhuo: {
        id: 'zhuo',
        name: '涿郡',
        tiles: [],
        npcs: [
            { x: 5, y: 5, name: '村民', dialog: '黄巾贼寇四处作乱，民不聊生啊！' },
            { x: 10, y: 8, name: '商人', dialog: '客官，要买些什么吗？按 S 键打开商店。' }
        ],
        warps: [
            { x: 14, y: 6, target: 'road', targetX: 0, targetY: 6 }
        ]
    },
    road: {
        id: 'road',
        name: '官道',
        tiles: [],
        npcs: [],
        warps: [
            { x: 0, y: 6, target: 'zhuo', targetX: 14, targetY: 6 },
            { x: 14, y: 6, target: 'battle_field', targetX: 7, targetY: 10 }
        ],
        randomBattles: true
    },
    battle_field: {
        id: 'battle_field',
        name: '战场',
        tiles: [],
        npcs: [
            { x: 7, y: 3, name: '斥候', dialog: '前方发现黄巾军主力！准备战斗！' }
        ],
        warps: [
            { x: 7, y: 12, target: 'road', targetX: 0, targetY: 6 }
        ]
    },
    palace: {
        id: 'palace',
        name: '洛阳宫殿',
        tiles: [],
        npcs: [
            { x: 7, y: 2, name: '汉灵帝', dialog: '若能平定黄巾之乱，朕定有重赏！' }
        ],
        warps: [
            { x: 7, y: 12, target: 'zhuo', targetX: 7, targetY: 2 }
        ]
    }
};

// ==================== 游戏主类 ====================
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.messageBox = document.getElementById('message-box');
        
        this.state = GameState.MAP;
        this.currentMap = 'zhuo';
        this.heroes = JSON.parse(JSON.stringify(HEROES));
        this.party = ['liubei', 'guanyu', 'zhangfei'];
        this.player = { x: 7, y: 8, direction: 'down' };
        this.gold = 500;
        this.items = {
            hp_restore: 5,
            mp_restore: 3
        };
        this.saveSlots = 3;
        this.battle = null;
        this.shopOpen = false;
        
        this.init();
        this.bindEvents();
        this.gameLoop();
    }
    
    init() {
        this.generateMap();
        this.showMessage('欢迎来到吞食天地！方向键移动，空格键互动');
        setTimeout(() => {
            this.showMessage('Ctrl+S 保存游戏 Ctrl+L 加载游戏');
        }, 4000);
    }
    
    generateMap() {
        const map = MAPS[this.currentMap];
        map.tiles = [];
        
        for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
            map.tiles[y] = [];
            for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
                if (y === 0 || y === CONFIG.MAP_HEIGHT - 1 || x === 0 || x === CONFIG.MAP_WIDTH - 1) {
                    map.tiles[y][x] = 'wall';
                } else if (this.currentMap === 'zhuo' && y === 6 && (x < 3 || x > 11)) {
                    map.tiles[y][x] = 'wall';
                } else {
                    map.tiles[y][x] = 'floor';
                }
            }
        }
    }
    
    bindEvents() {
        document.addEventListener('keydown', (e) => {
            if (this.state === GameState.MAP) {
                this.handleMapInput(e);
            } else if (this.state === GameState.BATTLE) {
                this.handleBattleInput(e);
            } else if (this.state === GameState.SHOP) {
                this.handleShopInput(e);
            }
        });
    }
    
    handleMapInput(e) {
        const map = MAPS[this.currentMap];
        let newX = this.player.x;
        let newY = this.player.y;
        
        switch(e.key) {
            case 'ArrowUp':
            case 'w':
                newY--;
                this.player.direction = 'up';
                break;
            case 'ArrowDown':
            case 's':
                if (e.ctrlKey) {
                    this.saveGame();
                    return;
                }
                newY++;
                this.player.direction = 'down';
                break;
            case 'ArrowLeft':
            case 'a':
                newX--;
                this.player.direction = 'left';
                break;
            case 'ArrowRight':
            case 'd':
                newX++;
                this.player.direction = 'right';
                break;
            case ' ':
                this.interact();
                return;
            case 'l':
                if (e.ctrlKey) {
                    this.loadGame();
                }
                return;
            case 'm':
                this.showMenu();
                return;
            default:
                return;
        }
        
        if (this.canMove(newX, newY)) {
            this.player.x = newX;
            this.player.y = newY;
            this.checkWarps();
            this.checkRandomBattle();
        }
    }
    
    canMove(x, y) {
        const map = MAPS[this.currentMap];
        if (x < 0 || x >= CONFIG.MAP_WIDTH || y < 0 || y >= CONFIG.MAP_HEIGHT) {
            return false;
        }
        if (map.tiles[y][x] === 'wall') {
            return false;
        }
        return true;
    }
    
    checkWarps() {
        const map = MAPS[this.currentMap];
        const warp = map.warps.find(w => w.x === this.player.x && w.y === this.player.y);
        
        if (warp) {
            this.changeMap(warp.target, warp.targetX, warp.targetY);
        }
    }
    
    checkRandomBattle() {
        const map = MAPS[this.currentMap];
        if (map.randomBattles && Math.random() < 0.15) {
            const enemies = ['soldier', 'soldier', 'archer'];
            this.startBattle(enemies);
        }
    }
    
    interact() {
        const map = MAPS[this.currentMap];
        
        const directions = {
            'up': { x: 0, y: -1 },
            'down': { x: 0, y: 1 },
            'left': { x: -1, y: 0 },
            'right': { x: 1, y: 0 }
        };
        
        const dir = directions[this.player.direction];
        const targetX = this.player.x + dir.x;
        const targetY = this.player.y + dir.y;
        
        const npc = map.npcs.find(n => n.x === targetX && n.y === targetY);
        if (npc) {
            this.showMessage(`${npc.name}：${npc.dialog}`);
        }
    }
    
    changeMap(mapName, x, y) {
        this.currentMap = mapName;
        this.generateMap();
        this.player.x = x;
        this.player.y = y;
        this.showMessage(`进入${MAPS[mapName].name}`);
    }
    
    startBattle(enemyTypes) {
        this.state = GameState.BATTLE;
        this.battle = {
            enemies: enemyTypes.map(type => JSON.parse(JSON.stringify(ENEMIES[type]))),
            turn: 0,
            currentHero: 0,
            log: ['战斗开始！'],
            phase: 'command'
        };
        this.showMessage('战斗开始！按 1-攻击 2-策略 3-物品 4-逃跑');
    }
    
    handleBattleInput(e) {
        if (this.battle.phase === 'command') {
            if (e.key === '1') {
                this.battle.phase = 'attack';
                this.showMessage('选择攻击目标（按数字键）');
            } else if (e.key === '2') {
                this.battle.phase = 'strategy';
                this.showMessage('选择策略（1-火计 2-落雷 3-治愈）');
            } else if (e.key === '3') {
                this.battle.phase = 'item';
                this.showMessage('选择物品（1-伤药 2-灵药）');
            } else if (e.key === '4') {
                this.battleEscape();
            }
        } else if (this.battle.phase === 'attack') {
            if (e.key >= '1' && e.key <= '9') {
                const targetIndex = parseInt(e.key) - 1;
                if (targetIndex < this.battle.enemies.length) {
                    this.battleAttack(targetIndex);
                }
            }
        } else if (this.battle.phase === 'strategy') {
            if (e.key === '1') {
                this.useStrategy('fire');
            } else if (e.key === '2') {
                this.useStrategy('thunder');
            } else if (e.key === '3') {
                this.useStrategy('heal');
            } else if (e.key === '0') {
                this.battle.phase = 'command';
            }
        } else if (this.battle.phase === 'item') {
            if (e.key === '1') {
                this.useItem('hp_restore');
            } else if (e.key === '2') {
                this.useItem('mp_restore');
            } else if (e.key === '0') {
                this.battle.phase = 'command';
            }
        }
    }
    
    battleAttack(targetIndex) {
        const hero = this.heroes[this.party[this.battle.currentHero]];
        const enemy = this.battle.enemies[targetIndex];
        
        const damage = Math.max(1, hero.attack - enemy.defense + Math.floor(Math.random() * 15));
        enemy.hp -= damage;
        
        this.battle.log.push(`${hero.name}攻击${enemy.name}，造成${damage}点伤害`);
        
        if (enemy.hp <= 0) {
            this.battle.log.push(`${enemy.name}被击败！获得${enemy.exp}经验`);
            this.gainExp(enemy.exp);
            this.battle.enemies.splice(targetIndex, 1);
        }
        
        if (this.battle.enemies.length === 0) {
            this.endBattle(true);
        } else {
            this.nextTurn();
        }
        this.battle.phase = 'command';
    }
    
    useStrategy(strategyKey) {
        const hero = this.heroes[this.party[this.battle.currentHero]];
        const strategy = STRATEGIES[strategyKey];
        
        if (hero.mp < strategy.mp) {
            this.showMessage('MP 不足！');
            this.battle.phase = 'command';
            return;
        }
        
        hero.mp -= strategy.mp;
        
        if (strategy.target === 'all_enemy') {
            this.battle.enemies.forEach(enemy => {
                const damage = Math.floor(strategy.power * (hero.strategy / 50));
                enemy.hp -= damage;
                this.battle.log.push(`${hero.name}使用${strategy.name}，对${enemy.name}造成${damage}点伤害`);
            });
            this.battle.enemies = this.battle.enemies.filter(e => e.hp > 0);
            if (this.battle.enemies.length === 0) {
                this.endBattle(true);
                return;
            }
        } else if (strategy.target === 'ally') {
            if (strategy.effect === 'heal') {
                hero.hp = Math.min(hero.maxHp, hero.hp + strategy.power);
                this.battle.log.push(`${hero.name}使用${strategy.name}，恢复了${strategy.power}点 HP`);
            }
        }
        
        this.nextTurn();
        this.battle.phase = 'command';
    }
    
    useItem(itemKey) {
        const item = ITEMS[itemKey];
        if (!this.items[itemKey] || this.items[itemKey] <= 0) {
            this.showMessage('物品不足！');
            this.battle.phase = 'command';
            return;
        }
        
        const hero = this.heroes[this.party[this.battle.currentHero]];
        this.items[itemKey]--;
        
        if (item.effect === 'hp') {
            hero.hp = Math.min(hero.maxHp, hero.hp + item.value);
            this.battle.log.push(`${hero.name}使用${item.name}，恢复了${item.value}点 HP`);
        } else if (item.effect === 'mp') {
            hero.mp = Math.min(hero.maxMp, hero.mp + item.value);
            this.battle.log.push(`${hero.name}使用${item.name}，恢复了${item.value}点 MP`);
        }
        
        this.nextTurn();
        this.battle.phase = 'command';
    }
    
    battleEscape() {
        if (Math.random() > 0.5) {
            this.battle.log.push('逃跑成功！');
            setTimeout(() => this.endBattle(false), 1000);
        } else {
            this.battle.log.push('逃跑失败！');
            this.nextTurn();
        }
    }
    
    nextTurn() {
        this.battle.currentHero = (this.battle.currentHero + 1) % this.party.length;
        
        if (this.battle.currentHero === 0) {
            this.enemyTurn();
        }
    }
    
    enemyTurn() {
        this.battle.enemies.forEach(enemy => {
            const targetIndex = Math.floor(Math.random() * this.party.length);
            const hero = this.heroes[this.party[targetIndex]];
            
            if (hero.hp <= 0) return;
            
            const damage = Math.max(1, enemy.attack - hero.defense + Math.floor(Math.random() * 8));
            hero.hp -= damage;
            
            this.battle.log.push(`${enemy.name}攻击${hero.name}，造成${damage}点伤害`);
            
            if (hero.hp <= 0) {
                hero.hp = 0;
                this.battle.log.push(`${hero.name}倒下了！`);
            }
        });
        
        const aliveHeroes = this.party.filter(id => this.heroes[id].hp > 0);
        if (aliveHeroes.length === 0) {
            this.endBattle(false, true);
        }
    }
    
    gainExp(exp) {
        this.party.forEach(heroId => {
            const hero = this.heroes[heroId];
            if (hero.hp <= 0) return;
            
            hero.exp += exp;
            if (hero.exp >= hero.level * 100) {
                hero.level++;
                hero.exp = 0;
                hero.maxHp += 20;
                hero.maxMp += 10;
                hero.hp = hero.maxHp;
                hero.mp = hero.maxMp;
                hero.attack += 5;
                hero.defense += 5;
                this.battle.log.push(`${hero.name}升级到${hero.level}级！`);
            }
        });
    }
    
    endBattle(victory, defeat = false) {
        this.state = GameState.MAP;
        if (victory) {
            this.showMessage('战斗胜利！');
        } else if (defeat) {
            this.showMessage('全军覆没...游戏结束');
            this.party.forEach(id => {
                this.heroes[id].hp = this.heroes[id].maxHp;
            });
            this.currentMap = 'zhuo';
            this.player.x = 7;
            this.player.y = 8;
            this.generateMap();
        } else {
            this.showMessage('战斗结束');
        }
        this.battle = null;
    }
    
    showMenu() {
        this.state = GameState.MENU;
        this.showMessage('菜单：1-状态 2-物品 3-存档 4-读档 0-关闭');
        
        const menuHandler = (e) => {
            if (e.key === '1') {
                this.showStatus();
            } else if (e.key === '2') {
                this.showItems();
            } else if (e.key === '3') {
                this.saveGame();
            } else if (e.key === '4') {
                this.loadGame();
            } else if (e.key === '0') {
                this.state = GameState.MAP;
            }
            document.removeEventListener('keydown', menuHandler);
        };
        
        document.addEventListener('keydown', menuHandler);
    }
    
    showStatus() {
        let msg = '【武将状态】\n';
        this.party.forEach((heroId, i) => {
            const hero = this.heroes[heroId];
            msg += `${i+1}.${hero.name} Lv${hero.level} HP:${hero.hp}/${hero.maxHp} MP:${hero.mp}/${hero.maxMp}\n`;
        });
        msg += `金钱：${this.gold}`;
        this.showMessage(msg, 0);
    }
    
    showItems() {
        let msg = '【物品】\n';
        for (const [key, count] of Object.entries(this.items)) {
            if (count > 0) {
                msg += `${ITEMS[key].name} x${count}\n`;
            }
        }
        this.showMessage(msg, 5000);
    }
    
    saveGame(slot = 1) {
        const saveData = {
            heroes: this.heroes,
            party: this.party,
            player: this.player,
            currentMap: this.currentMap,
            gold: this.gold,
            items: this.items,
            timestamp: Date.now()
        };
        
        localStorage.setItem(`rpg_save_${slot}`, JSON.stringify(saveData));
        this.showMessage(`游戏已保存到槽位${slot}`);
    }
    
    loadGame(slot = 1) {
        const saveData = localStorage.getItem(`rpg_save_${slot}`);
        if (saveData) {
            const data = JSON.parse(saveData);
            this.heroes = data.heroes;
            this.party = data.party;
            this.player = data.player;
            this.currentMap = data.currentMap;
            this.gold = data.gold;
            this.items = data.items;
            this.generateMap();
            this.showMessage(`游戏已从槽位${slot}加载`);
            this.state = GameState.MAP;
        } else {
            this.showMessage('没有保存的数据');
        }
    }
    
    showMessage(text, duration = 3000) {
        this.messageBox.textContent = text;
        this.messageBox.style.display = 'block';
        this.messageBox.style.whiteSpace = 'pre-line';
        
        if (duration > 0) {
            setTimeout(() => {
                this.messageBox.style.display = 'none';
            }, duration);
        }
    }
    
    update() {
    }
    
    render() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);
        
        if (this.state === GameState.MAP) {
            this.renderMap();
        } else if (this.state === GameState.BATTLE) {
            this.renderBattle();
        } else if (this.state === GameState.MENU) {
            this.renderMap();
            this.renderMenu();
        }
    }
    
    renderMap() {
        const map = MAPS[this.currentMap];
        const offsetX = (CONFIG.SCREEN_WIDTH - CONFIG.MAP_WIDTH * CONFIG.TILE_SIZE) / 2;
        const offsetY = (CONFIG.SCREEN_HEIGHT - CONFIG.MAP_HEIGHT * CONFIG.TILE_SIZE) / 2;
        
        for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
            for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
                const tile = map.tiles[y][x];
                const screenX = offsetX + x * CONFIG.TILE_SIZE;
                const screenY = offsetY + y * CONFIG.TILE_SIZE;
                
                if (tile === 'wall') {
                    this.ctx.fillStyle = '#8B4513';
                } else {
                    this.ctx.fillStyle = '#228B22';
                }
                this.ctx.fillRect(screenX, screenY, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
                this.ctx.strokeStyle = '#000';
                this.ctx.strokeRect(screenX, screenY, CONFIG.TILE_SIZE, CONFIG.TILE_SIZE);
            }
        }
        
        map.npcs.forEach(npc => {
            const screenX = offsetX + npc.x * CONFIG.TILE_SIZE;
            const screenY = offsetY + npc.y * CONFIG.TILE_SIZE;
            this.ctx.fillStyle = '#4169E1';
            this.ctx.beginPath();
            this.ctx.arc(screenX + CONFIG.TILE_SIZE/2, screenY + CONFIG.TILE_SIZE/2, 12, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        const screenX = offsetX + this.player.x * CONFIG.TILE_SIZE;
        const screenY = offsetY + this.player.y * CONFIG.TILE_SIZE;
        this.ctx.fillStyle = '#FF0000';
        this.ctx.fillRect(screenX + 4, screenY + 4, 24, 24);
        
        this.renderUI();
    }
    
    renderBattle() {
        this.ctx.fillStyle = '#1a1a2e';
        this.ctx.fillRect(0, 0, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);
        
        this.battle.enemies.forEach((enemy, i) => {
            const screenX = 280 + (i % 3) * 70;
            const screenY = 80 + Math.floor(i / 3) * 100;
            
            this.ctx.fillStyle = '#FF0000';
            this.ctx.fillRect(screenX, screenY, 60, 60);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`${enemy.name}`, screenX, screenY - 5);
            this.ctx.fillText(`HP:${enemy.hp}/${enemy.maxHp}`, screenX, screenY + 75);
        });
        
        this.party.forEach((heroId, i) => {
            const hero = this.heroes[heroId];
            const screenX = 30 + i * 150;
            const screenY = 320;
            
            this.ctx.fillStyle = hero.hp <= 0 ? '#888' : '#00FF00';
            this.ctx.fillRect(screenX, screenY, 60, 60);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '12px Arial';
            this.ctx.fillText(`${hero.name}`, screenX, screenY - 5);
            this.ctx.fillText(`HP:${hero.hp}/${hero.maxHp}`, screenX, screenY + 75);
            this.ctx.fillText(`MP:${hero.mp}/${hero.maxMp}`, screenX, screenY + 90);
        });
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('1-攻击 2-策略 3-物品 4-逃跑', 150, 450);
        
        if (this.battle.log.length > 0) {
            this.ctx.fillStyle = '#FFFF00';
            this.ctx.font = '11px Arial';
            const lastLog = this.battle.log[this.battle.log.length - 1];
            this.ctx.fillText(lastLog, 130, 250);
        }
    }
    
    renderUI() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(10, 10, 220, 90);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '11px Arial';
        
        let y = 25;
        this.party.forEach((heroId, index) => {
            const hero = this.heroes[heroId];
            const hpPercent = hero.hp / hero.maxHp;
            this.ctx.fillStyle = hpPercent > 0.5 ? '#00FF00' : hpPercent > 0.25 ? '#FFFF00' : '#FF0000';
            this.ctx.fillText(`${hero.name} HP:${hero.hp}/${hero.maxHp}`, 20, y);
            y += 16;
        });
        
        this.ctx.fillStyle = '#FFFF00';
        this.ctx.font = '10px Arial';
        this.ctx.fillText(`金钱:${this.gold}`, 20, y + 5);
        this.ctx.fillText('Ctrl+S 保存 Ctrl+L 加载 M-菜单', 10, CONFIG.SCREEN_HEIGHT - 10);
    }
    
    renderMenu() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
        this.ctx.fillRect(100, 100, 312, 280);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '16px Arial';
        this.ctx.fillText('【菜单】', 230, 130);
        this.ctx.font = '14px Arial';
        this.ctx.fillText('1.武将状态', 120, 170);
        this.ctx.fillText('2.查看物品', 120, 200);
        this.ctx.fillText('3.保存游戏', 120, 230);
        this.ctx.fillText('4.加载游戏', 120, 260);
        this.ctx.fillText('0.关闭菜单', 120, 290);
    }
    
    gameLoop() {
        this.update();
        this.render();
        requestAnimationFrame(() => this.gameLoop());
    }
}

// ==================== 启动游戏 ====================
window.onload = () => {
    const game = new Game();
};
