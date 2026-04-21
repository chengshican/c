// 游戏主文件 - 吞食天地 RPG

// ==================== 游戏配置 ====================
const CONFIG = {
    TILE_SIZE: 32,
    MAP_WIDTH: 15,
    MAP_HEIGHT: 13,
    SCREEN_WIDTH: 512,
    SCREEN_HEIGHT: 480,
    FPS: 60
};

// ==================== 游戏状态枚举 ====================
const GameState = {
    MAP: 'map',
    BATTLE: 'battle',
    DIALOG: 'dialog',
    MENU: 'menu'
};

// ==================== 角色数据 ====================
const HEROES = {
    liubei: {
        name: '刘备',
        hp: 100,
        mp: 50,
        attack: 45,
        defense: 40,
        speed: 35,
        level: 5,
        exp: 0,
        sprite: 'hero'
    },
    guanyu: {
        name: '关羽',
        hp: 120,
        mp: 40,
        attack: 60,
        defense: 45,
        speed: 30,
        level: 5,
        exp: 0,
        sprite: 'hero'
    },
    zhangfei: {
        name: '张飞',
        hp: 130,
        mp: 30,
        attack: 65,
        defense: 35,
        speed: 40,
        level: 5,
        exp: 0,
        sprite: 'hero'
    },
    zhugeliang: {
        name: '诸葛亮',
        hp: 70,
        mp: 80,
        attack: 35,
        defense: 30,
        speed: 45,
        level: 5,
        exp: 0,
        sprite: 'hero'
    }
};

// ==================== 敌人数据 ====================
const ENEMIES = {
    soldier: {
        name: '士兵',
        hp: 50,
        attack: 25,
        defense: 20,
        exp: 10,
        sprite: 'enemy'
    },
    general: {
        name: '武将',
        hp: 100,
        attack: 40,
        defense: 35,
        exp: 30,
        sprite: 'enemy'
    },
    boss: {
        name: '吕布',
        hp: 300,
        attack: 70,
        defense: 60,
        exp: 100,
        sprite: 'boss'
    }
};

// ==================== 地图数据 ====================
const MAPS = {
    village: {
        name: '涿郡',
        tiles: [],
        events: [],
        npcs: [
            { x: 5, y: 5, name: '村民', dialog: '听说黄巾军正在作乱，大家要小心啊！' },
            { x: 10, y: 8, name: '商人', dialog: '欢迎来到涿郡，需要买些什么吗？' }
        ]
    },
    palace: {
        name: '宫殿',
        tiles: [],
        events: [],
        npcs: [
            { x: 7, y: 3, name: '使者', dialog: '陛下有旨：平定黄巾之乱者，重重有赏！' }
        ]
    }
};

// ==================== 游戏类 ====================
class Game {
    constructor() {
        this.canvas = document.getElementById('game-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.messageBox = document.getElementById('message-box');
        
        this.state = GameState.MAP;
        this.currentMap = 'village';
        this.heroes = JSON.parse(JSON.stringify(HEROES));
        this.party = ['liubei', 'guanyu', 'zhangfei'];
        this.player = { x: 7, y: 8, direction: 'down' };
        this.saveSlots = 3;
        
        this.init();
        this.loadSaveData();
        this.bindEvents();
        this.gameLoop();
    }
    
    init() {
        this.generateMap();
        this.showMessage('欢迎来到吞食天地！使用方向键移动，空格键互动');
    }
    
    generateMap() {
        const map = MAPS[this.currentMap];
        map.tiles = [];
        
        for (let y = 0; y < CONFIG.MAP_HEIGHT; y++) {
            map.tiles[y] = [];
            for (let x = 0; x < CONFIG.MAP_WIDTH; x++) {
                if (y === 0 || y === CONFIG.MAP_HEIGHT - 1 || x === 0 || x === CONFIG.MAP_WIDTH - 1) {
                    map.tiles[y][x] = 'wall';
                } else if (y === 6 && (x < 3 || x > 11)) {
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
            case 's':
                if (e.ctrlKey) {
                    this.saveGame();
                }
                return;
            case 'l':
                if (e.ctrlKey) {
                    this.loadGame();
                }
                return;
            default:
                return;
        }
        
        if (this.canMove(newX, newY)) {
            this.player.x = newX;
            this.player.y = newY;
            this.checkMapEvents();
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
    
    checkMapEvents() {
        const map = MAPS[this.currentMap];
        const event = map.events.find(e => e.x === this.player.x && e.y === this.player.y);
        
        if (event) {
            this.triggerEvent(event);
        }
    }
    
    triggerEvent(event) {
        switch(event.type) {
            case 'battle':
                this.startBattle(event.enemies);
                break;
            case 'dialog':
                this.showMessage(event.text);
                break;
            case 'map_change':
                this.changeMap(event.map);
                break;
        }
    }
    
    changeMap(mapName) {
        this.currentMap = mapName;
        this.generateMap();
        this.player.x = 7;
        this.player.y = 8;
        this.showMessage(`进入${MAPS[mapName].name}`);
    }
    
    startBattle(enemies) {
        this.state = GameState.BATTLE;
        this.battle = {
            enemies: JSON.parse(JSON.stringify(enemies)),
            turn: 0,
            currentHero: 0,
            log: []
        };
        this.showMessage('进入战斗！按 1-攻击 2-防御 3-逃跑');
    }
    
    handleBattleInput(e) {
        if (e.key === '1') {
            this.battleAttack();
        } else if (e.key === '2') {
            this.battleDefend();
        } else if (e.key === '3') {
            this.battleEscape();
        }
    }
    
    battleAttack() {
        const hero = this.heroes[this.party[this.battle.currentHero]];
        const enemy = this.battle.enemies[0];
        
        const damage = Math.max(1, hero.attack - enemy.defense + Math.floor(Math.random() * 10));
        enemy.hp -= damage;
        
        this.battle.log.push(`${hero.name}攻击${enemy.name}，造成${damage}点伤害`);
        
        if (enemy.hp <= 0) {
            this.battle.log.push(`${enemy.name}被击败！获得${enemy.exp}经验`);
            this.gainExp(enemy.exp);
            this.battle.enemies.shift();
        }
        
        if (this.battle.enemies.length === 0) {
            this.endBattle(true);
        } else {
            this.enemyTurn();
        }
    }
    
    battleDefend() {
        this.battle.log.push(`${this.heroes[this.party[this.battle.currentHero]].name}采取防御姿态`);
        this.enemyTurn();
    }
    
    battleEscape() {
        if (Math.random() > 0.5) {
            this.battle.log.push('逃跑成功！');
            setTimeout(() => this.endBattle(false), 1000);
        } else {
            this.battle.log.push('逃跑失败！');
            this.enemyTurn();
        }
    }
    
    enemyTurn() {
        const enemy = this.battle.enemies[0];
        const hero = this.heroes[this.party[this.battle.currentHero]];
        
        const damage = Math.max(1, enemy.attack - hero.defense + Math.floor(Math.random() * 5));
        hero.hp -= damage;
        
        this.battle.log.push(`${enemy.name}攻击${hero.name}，造成${damage}点伤害`);
        
        if (hero.hp <= 0) {
            hero.hp = 0;
            this.battle.log.push(`${hero.name}倒下了！`);
        }
        
        this.battle.currentHero = (this.battle.currentHero + 1) % this.party.length;
    }
    
    gainExp(exp) {
        this.party.forEach(heroId => {
            const hero = this.heroes[heroId];
            hero.exp += exp;
            if (hero.exp >= hero.level * 100) {
                hero.level++;
                hero.exp = 0;
                hero.hp += 20;
                hero.attack += 5;
                hero.defense += 5;
                this.battle.log.push(`${hero.name}升级到${hero.level}级！`);
            }
        });
    }
    
    endBattle(victory) {
        this.state = GameState.MAP;
        if (victory) {
            this.showMessage('战斗胜利！');
        } else {
            this.showMessage('战斗结束');
        }
    }
    
    saveGame(slot = 1) {
        const saveData = {
            heroes: this.heroes,
            party: this.party,
            player: this.player,
            currentMap: this.currentMap,
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
            this.generateMap();
            this.showMessage(`游戏已从槽位${slot}加载`);
        } else {
            this.showMessage('没有保存的数据');
        }
    }
    
    saveSaveData() {
        const allSaves = [];
        for (let i = 1; i <= this.saveSlots; i++) {
            const save = localStorage.getItem(`rpg_save_${i}`);
            if (save) {
                allSaves.push(JSON.parse(save));
            }
        }
        localStorage.setItem('rpg_all_saves', JSON.stringify(allSaves));
    }
    
    loadSaveData() {
        const allSaves = localStorage.getItem('rpg_all_saves');
        if (allSaves) {
            this.showMessage('发现存档数据，按 L 键加载');
        }
    }
    
    showMessage(text, duration = 3000) {
        this.messageBox.textContent = text;
        this.messageBox.style.display = 'block';
        
        if (duration > 0) {
            setTimeout(() => {
                this.messageBox.style.display = 'none';
            }, duration);
        }
    }
    
    update() {
        // 游戏更新逻辑
    }
    
    render() {
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, CONFIG.SCREEN_WIDTH, CONFIG.SCREEN_HEIGHT);
        
        if (this.state === GameState.MAP) {
            this.renderMap();
        } else if (this.state === GameState.BATTLE) {
            this.renderBattle();
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
        
        const enemy = this.battle.enemies[0];
        if (enemy) {
            this.ctx.fillStyle = '#FF0000';
            this.ctx.fillRect(300, 100, 80, 80);
            
            this.ctx.fillStyle = '#fff';
            this.ctx.font = '16px Arial';
            this.ctx.fillText(`${enemy.name} HP: ${enemy.hp}/${enemy.hp}`, 280, 200);
        }
        
        this.ctx.fillStyle = '#00FF00';
        this.ctx.fillRect(50, 300, 80, 80);
        
        const hero = this.heroes[this.party[this.battle.currentHero]];
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(`${hero.name} HP: ${hero.hp}/${hero.hp}`, 30, 400);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '14px Arial';
        this.ctx.fillText('1-攻击 2-防御 3-逃跑', 180, 450);
        
        if (this.battle.log.length > 0) {
            this.ctx.fillStyle = '#FFFF00';
            this.ctx.font = '12px Arial';
            const lastLog = this.battle.log[this.battle.log.length - 1];
            this.ctx.fillText(lastLog, 150, 250);
        }
    }
    
    renderUI() {
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(10, 10, 200, 80);
        
        this.ctx.fillStyle = '#fff';
        this.ctx.font = '12px Arial';
        
        let y = 25;
        this.party.forEach((heroId, index) => {
            const hero = this.heroes[heroId];
            this.ctx.fillText(`${hero.name} HP:${hero.hp}/${hero.hp + hero.level * 20}`, 20, y);
            y += 18;
        });
        
        this.ctx.fillStyle = '#FFFF00';
        this.ctx.font = '10px Arial';
        this.ctx.fillText('Ctrl+S 保存 Ctrl+L 加载', 10, CONFIG.SCREEN_HEIGHT - 10);
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
