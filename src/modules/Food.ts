//定义类
class Food{
  //定义属性表示食物对应的元素
  element: HTMLElement;

  constructor() {
    this.element = document.getElementById("food")!//!表示其不会为空防止null赋值给element而报错;
  }

  //获取食物x轴坐标
  get X() {
    return this.element.offsetLeft;
  }

  get Y() {
    return this.element.offsetTop;
  }
  change() {
    //top和left应该是0-290之间的以10为倍数的数字
    let top = Math.round(Math.random() * 29) * 10;
    let left = Math.round(Math.random() * 29) * 10;
    this.element.style.left = left + 'px';
    this.element.style.top = top + 'px';
  }

}

export default Food