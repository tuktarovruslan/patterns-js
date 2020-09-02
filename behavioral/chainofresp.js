// 1) В целом паттерн про то, что каждый последующий обработчик получает;
// тело запроса и может обработать его, пропустить дальше или прервать;
// 2) Фишка с чейнингом запросов возможна благодаря контексту;

// Пример 1
class MySum {
  constructor(initialValue = 42) {
    this.sum = initialValue
  }

  add(value) {
    this.sum += value
    return this
  }
}

const sum1 = new MySum()
console.log(sum1.add(8).add(10).add(1).add(9).sum)

const sum2 = new MySum(0)
console.log(sum2.add(1).add(2).add(3).sum)


// Пример 2
class Account {
  pay(price) {
    if(this.canPay(price)) {
      console.log(`Paid ${price} using ${this.name}`);
    } else if (this.daddy) {
      console.log(`Cannot pay using ${this.name}`);
      this.daddy.pay(price)
    } else {
      console.log('Unfortunately, not enough money');
    }
  }

  canPay(price) {
    return this.balance >= price;
  }

  setDaddy(account) {
    // Связующее звено между обработчиками - ссылка на следующий счет (папик)
    this.daddy = account;
  }
}

class Master extends Account {
  constructor(balance) {
    super();
    this.name = 'Master Card';
    this.balance = balance
  }
}

class Paypal extends Account {
  constructor(balance) {
    super();
    this.name = 'Paypal';
    this.balance = balance
  }
}

class Qiwi extends Account {
  constructor(balance) {
    super();
    this.name = 'Qiwi';
    this.balance = balance
  }
}

const master = new Master(100);
const paypal = new Paypal(200);
const qiwi = new Qiwi(500);

master.setDaddy(paypal);
paypal.setDaddy(qiwi);

master.pay(438)