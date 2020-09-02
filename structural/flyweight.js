// 1) Перед созданием нового экземпляра чекается не создан ли он часом;
// 2) Если уже создан - возвращается созданный экземпляр;
// 3) Фишка легковеса в "кешировании" данных;

class Portfolio {
  constructor(tiker, manager) {
    this.tiker = tiker
    this.manager = manager
  }
}

class PortfolioFactory {
  constructor() {
    this.portfolios = []
  }

  create(tiker, manager) {
    const candidate = this.getPortfolio(tiker)
    if (candidate) return candidate

    const newPortfolio = new Portfolio(tiker, manager)
    this.portfolios.push(newPortfolio)
    return newPortfolio
  }

  getPortfolio(tiker) {
    return this.portfolios.find(p => p.tiker === tiker)
  }
}

const factory = new PortfolioFactory()

const cor = factory.create('COR', 'Ruslan Tuktarov')
const arb = factory.create('ARB', 'Sergey Stryukov')
const arbuz = factory.create('ARB', 'Vasiliy Pupkin')

console.log(cor)
console.log(arb)
console.log(arbuz)
console.log(arb === arbuz)