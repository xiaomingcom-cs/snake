import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

//游戏控制类，控制其他所有类
class GameControl{
  snake: Snake;
  food: Food;
  scorePanel: ScorePanel;
  diretion: string = '';
  isLive = true;
  
  constructor() {
    this.snake = new Snake();
    this.food = new Food();
    this.scorePanel = new ScorePanel();
    this.init();

  }

  //游戏的初始化方法，调用后游戏即开始
  init() {
    document.addEventListener('keydown', this.keydownHandler.bind(this));
    this.run();
  }

  keydownHandler(event: KeyboardEvent) {
    //此处的this不是gamecontrol，而是document，因为是给document绑定的事件
    this.diretion = event.key;
  }

  run() {
    let x = this.snake.X;
    let y = this.snake.Y;
    
    switch (this.diretion) {
      case "ArrowUp":
      case "Up":
        y -= 10;
        break;
      case "ArrowDown":
      case "Down":
        y += 10;
        break;
      case "ArrowLeft":
      case "Left":
        x -= 10;
        break;
      case "ArrowRight":
      case "Right":
        x += 10;
        break;
    }
    if (this.checkEat(x, y)) {
      this.food.change();
      this.scorePanel.addScore();
      this.snake.addBody();
    }
  
    try
      {this.snake.X = x;
        this.snake.Y = y;
      }
    catch (e) {
      alert("蛇撞墙了，游戏结束!")
      this.isLive = false;
      }
      this.isLive && setTimeout(this.run.bind(this), 300-(this.scorePanel.level-1)*30);//蛇每隔300ms移动一次
  }

  checkEat(x: number, y: number) {
    return x === this.food.X && y === this.food.Y
  }
}
export default GameControl