// 1) Создание интерфейса клонируемого объекта в конструкторе класса;
// 2) Создание единственного метода воспроизводства, создающего копии объекта;
// 3) Создание экземпляра оригинала (прототипа) с конкретными характеристиками;
// 4) Создание через метод воспроизводства незвисимых клонов;
// 5) Каждый клон имеет свои личные свойства;

class Government {
  constructor(leader, side, freedom, rights) {
    this.leader = leader;
    this.side = side;
    this.freedom = freedom;
    this.rights = rights;
  }

  establish() {
    return new Government(this.leader, this.side, this.freedom, this.rights)
  }
}

const libertarian = new Government('person', 'center', true, true);

const ukraine = libertarian.establish();
const belarus = libertarian.establish();
const russia = libertarian.establish();

ukraine.leader = 'zelenskiy';
belarus.leader = 'tihanovskaya';

console.log(ukraine);
console.log(belarus);
console.log(russia);