// 1) Есть старый(неизменяемый) интерфейс;
// 2) Создается новый интерфейс, несовместимый со старым;
// 3) Создается класс-посредник, конструктор которого содержит новый интерфейс;
// 4) В классе посреднике создаются методы, отражающие старый интерфес, но
// вызывающие методы нового интерфейса;

// Первый пример
// Старый интерфейс
class OldCalc {
  operations(t1, t2, operation) {
    switch (operation) {
      case 'add': return t1 + t2
      case 'sub': return t1 - t2
      default: return NaN
    }
  }
}
// Новый интерфейс
class NewCalc {
  add(t1, t2) {
    return t1 + t2
  }

  sub(t1, t2) {
    return t1 - t2
  }
}

class CalcAdapter {
  // Подключает новый интерфейс
  constructor() {
    this.calc = new NewCalc()
  }
  // Адаптирует старый интерфейс к новому
  operations(t1, t2, operation) {
    switch (operation) {
      case 'add': return this.calc.add(t1, t2)
      case 'sub': return this.calc.sub(t1, t2)
      default: return NaN
    }
  }
}
// Проверка, что все работает хорошо
const oldCalc = new OldCalc()
console.log(oldCalc.operations(10, 5, 'add'))

const newCalc = new NewCalc()
console.log(newCalc.add(10, 5))

const adapter = new CalcAdapter()
console.log(adapter.operations(25, 10, 'sub'))


// Второй пример
// Клиенты одного типа
class CableOne {
  connect() {
    console.log('Cable');
  }
};

class CableTwo {
  connect() {
    console.log('Cable');
  }
};
// Интерфейс
class Connection {
  port(cable) {
    cable.connect();
  }
};
// Новый тип клиента с новым интерфейсом
class AnotherCable {
  anotherConnect() {
    console.log('Another Cable');
  }
};

class AnotherCableAdapter {
  // Подключает новый тип клиента
  constructor(cable) {
    this.cable = cable
  }
  // Адаптирует старый интерфейс к новому
  connect() {
    this.cable.anotherConnect();
  }
};

const anotherCable = new AnotherCable();
const adapterCable = new AnotherCableAdapter(anotherCable);

const connection = new Connection();
connection.port(adapterCable);