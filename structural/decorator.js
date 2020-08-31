// 1) Создание базового класса;
// 2) Создание оберток (функций/классов), расширяющих функционал базы;
// 3) Обертки принимают экземпляр базы и возвращают его после модификаций;


// Пример 1:
class Server {
  constructor(ip, port) {
    this.ip = ip
    this.port = port
  }

  get url() {
    return `https://${this.ip}:${this.port}`
  }
}

function aws(server) {
  server.isAWS = true
  server.awsInfo = function() {
    return server.url
  }
  return server
}

function azure(server) {
  server.isAzure = true
  server.port += 500
  return server
}

const s1 = aws(new Server('12.34.56.78', 8080))
console.log(s1.isAWS)
console.log(s1.awsInfo())

const s2 = azure(new Server('98.87.76.12', 1000))
console.log(s2.isAzure)
console.log(s2.url)


// Пример 2:
// Базовый класс
class Biomaterial {
  constructor(name) {
    this.name = name;

    this.voice();
  }

  voice() {
    console.log(`Hello, biomaterial ${this.name}`);
  }
}

class Human {
  // Первым аргументом передаем базовый экземпляр, далее оборачиваем в суть;
  constructor(nature, worldview) {
    this.nature = nature;
    this.name = nature.name;
    this.worldview = worldview;

    this.hello();
  }

  hello() {
    console.log(`Hello, human ${this.name}`);
    console.log(`Your worldview is ${this.worldview}`);
  }
}

const bio = new Biomaterial('Ruslan');
const human = new Human(bio, 'existentialism');