class ScorePanel{
  score = 0;
  level = 1;
  scoreEle: HTMLElement;
  levelEle: HTMLElement;
  //为了程序的可扩展性，尽量不要出现具体的数字,都以参数的形式进行指定
  maxLevel: number;
  upScore: number;

  constructor(maxLevel:number = 10,upScore:number = 10) {
    this.scoreEle = document.getElementById('score')!;
    this.levelEle = document.getElementById('level')!;
    this.maxLevel = maxLevel;
    this.upScore = upScore;
  }

  addScore() {
    this.score++;
    this.scoreEle.innerHTML = this.score + '';//拼串(需要的是一个字符串)
    if (this.score % this.upScore === 0) {
      this.levelUp();
    }
  }

  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = ++this.level + '';
    }
    
  }
}
export default ScorePanel