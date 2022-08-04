class Snake{
  //蛇头元素
  head: HTMLElement;
  //蛇的身体(包括蛇头)
  bodies: HTMLCollection;
  //蛇的容器
  element: HTMLElement;
  constructor() {
    this.head = document.querySelector('#snake > div') as HTMLElement;
    this.bodies = document.getElementById('snake')!.getElementsByTagName('div');
    this.element = document.getElementById('snake')!;
  }

  get X() {
    return this.head.offsetLeft;
  }

  get Y() {
    return this.head.offsetTop;
  }

  set X(value: number) {
    if (value === this.X) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了")
    }

    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetLeft === value) {
      //蛇掉头，则让蛇向反方向继续移动
      if (value > this.X){//向右走{
        value = this.X - 10;
      } else {
        value = this.X + 10;
      }
    }

    this.moveBody();
    this.head.style.left = value + 'px';
    this.checkHeadBody();
  }

  set Y(value: number) {
    if (value === this.Y) {
      return;
    }
    if (value < 0 || value > 290) {
      throw new Error("蛇撞墙了")
    }
    if (this.bodies[1] && (this.bodies[1] as HTMLElement).offsetTop === value) {
      //蛇掉头，则让蛇向反方向继续移动
      if (value > this.Y){//向右走{
        value = this.Y - 10;
      } else {
        value = this.Y + 10;
      }
    }
    this.moveBody();
    this.head.style.top = value + 'px';
    this.checkHeadBody();
  }
  //蛇增加身体
  addBody() {
    this.element.insertAdjacentHTML("beforeend", "<div></div>");
  }
  //蛇移动身体 每一节要到的位置是上一节所在的位置(从后往前改)
  moveBody() {
    //bodies是htmlcolletion，其中的每个元素是element，是接口，断言转化
    for (let i = this.bodies.length - 1; i > 0; i--){
      let x = (this.bodies[i - 1] as HTMLElement).offsetLeft;
      let y = (this.bodies[i - 1] as HTMLElement).offsetTop;
      (this.bodies[i] as HTMLElement).style.left = x + 'px';
      (this.bodies[i] as HTMLElement).style.top = y + 'px';
    }
    
  }
  //检查头和身体是否相撞
  checkHeadBody() {
    for (let i = 1; i < this.bodies.length; i++){
      let x = (this.bodies[i] as HTMLElement).offsetLeft;
      let y = (this.bodies[i] as HTMLElement).offsetTop;
      if (x === this.X && y === this.Y) {
        throw new Error("撞到自己了~~");
      }
    }
    
  }


}
export default Snake