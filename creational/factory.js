// 1) Создание уникальных классов;
// 2) Создание класса фабрики со статическим перечнем классов для производства;
// 3) Определение в классе фабрики метода create, принимающего
// конкретные значения;
// 4) В методе create определяется конечный класс на основе выбранного типа;
// 5) В методе create создается экземпляр выбранного конечного класса;
// 6) В методе create, в созданный экземпляр прописываются данные и методы;
// 7) В методе create по итогу возвращается созданный экземпляр;
// 8) Создается экземпляр фабрики, который готов работать и create'ить

class SimpleAccount {
  constructor(name) {
    this.name = name;
    this.cost = 100;
  }
}

class StandardAccount {
  constructor(name) {
    this.name = name;
    this.cost = 300;
  }
}

class PremiumAccount {
  constructor(name) {
    this.name = name;
    this.cost = 1000;
  }
}

class AccountFactory {
  // accs предназначен для работы внутри класса AccountFactory
  // accs - статическое свойство
  static accs = {
    simple: SimpleAccount,
    standard: StandardAccount,
    premium: PremiumAccount
  }

  create(name, type = 'simple') {
    // Константа Account вернет объект класса, подлежащий вызову
    const Account = AccountFactory.accs[type] || AccountFactory.accs.simple;
    // Вызов нужного конструктора
    const privateAccount = new Account(name);
    // Прописывает в экземпляре выбранный тип
    // Присвоение новых свойств экземпляру - нехорошая практика
    privateAccount.type = type;
    // Создание нового метода класса Account
    privateAccount.whoami = function() {
      console.log(`${this.name} has ${this.type} (${this.cost})`);
    }
    return privateAccount;
  }
}

const factory = new AccountFactory();

const accounts = [
  // Создаются экземпляры соответствующих классов
  factory.create('Vladilen', 'simple'),
  factory.create('Elena', 'premium'),
  factory.create('Vasilisa', 'standard'),
  factory.create('Ivan', 'premium'),
  factory.create('Ruslan')
]

// На каждом экземпляре есть метод define()
accounts.forEach(acc => acc.whoami())