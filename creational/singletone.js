// 1) Создание класса, который должен быть един;
// 2) В его конструкторе сначала сделать проверку на существование инстанса;
// 3) Далее в конструкторе положить в свойство класса ссылку на единый инстанс;
// 4) Все последующие экземпляры класса будут являться первым, единым инстансом;

class God {
  constructor(name) {
    if (God.instance) {
      return God.instance;
    }

    God.instance = this;
    this.name = name;
  }

  getBless() {
    return `${this.name} blessed you`
  }
}

const commonGod = new God('god');
const jesus = new God('Jesus Christ');
const allah = new God('Allah');
const gautama = new God('Gautama Budda');

console.log(commonGod.getBless());
console.log(jesus.getBless());
console.log(allah.getBless());
console.log(gautama.getBless());