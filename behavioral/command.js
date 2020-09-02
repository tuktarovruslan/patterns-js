// 1) Создается класс с набором команд, собственной логикой;
// 2) Создается обрабатывающий класс-пульт, на котором вызываются команды;

// Класс с логикой
class MyMath {
  constructor(initialValue = 0) {
    this.num = initialValue
  }

  square() {
    return this.num ** 2
  }

  cube() {
    return this.num ** 3
  }
}

// Обрабатывающий класс (класс-пульт)
class Command {
  constructor(subject) {
    this.subject = subject
    this.commandsExecuted = []
  }

  execute(command) {
    this.commandsExecuted.push(command)
    return this.subject[command]()
  }
}

const x = new Command(new MyMath(2))

console.log(x.execute('square'))
console.log(x.execute('cube'))

console.log(x.commandsExecuted)