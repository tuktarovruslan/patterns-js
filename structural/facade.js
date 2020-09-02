// 1) Создание сложной и разнообразной логики приложения;
// 2) Создание богоподобного класса фасада, упрощающего работу со структурой;

// Первый пример
class Portfolio {
  constructor() {
    this.instruments = []
  }
  // Не будет вызван, т.к. переопределен в вызываемом дочернем классе
  reply(intrument) {
    console.log(`Instrument ${intrument} included`)
  }

  add(intrument) {
    // Запушит в инструменты дочерних классов (this сошлется на детей)
    this.instruments.push(intrument)
    // Сошлется на метод в вызываемом классе
    return this.reply(intrument)
  }
}

class Shares extends Portfolio {
  reply({id, customer, details}) {
    return `Share: ${id}: ${customer} (${details})`
  }
}

class Bonds extends Portfolio {
  reply({id, customer, details}) {
    return `Bond: ${id}: ${customer} (${details})`
  }
}

// Фасадный класс, имеющий логику работы с внутренностями приложения
class InstrumentRegistry {
  register(customer, type, details) {
    const id = Date.now()
    let instrument

    if (type === 'share') {
      instrument = new Shares()
    } else {
      instrument = new Bonds()
    }

    return instrument.add({id, customer, details})
  }
}

const portfolio = new InstrumentRegistry()

console.log(portfolio.register('Ruslan', 'share', 'Алроса'))
console.log(portfolio.register('Eva', 'bond', 'Тинькофф'))


// Второй пример:
// Объединяет этапы работы в цепочку;
class Planning {
  plan() {
    console.log('Every Man will be a King');
  }
};

class Meeting {
  meet() {
    console.log('Viva la Vida');
  }
};

class Strike {
  strike() {
    console.log('No taxes for dictator');
  }
};

class Liberty {
  done() {
    console.log('New life at the beginning');
  }
};


class EvolutionFacade {
  constructor(planning, meeting, strike, liberty) {
    this.planning = planning;
    this.meeting = meeting;
    this.strike = strike;
    this.liberty = liberty;
  }

  evolutionIsDone() {
    this.planning.plan();
    this.meeting.meet();
    this.strike.strike();
    this.liberty.done();
  }
};

const newEvolution = new EvolutionFacade(
  new Planning(),
  new Meeting(),
  new Strike(),
  new Liberty()
);

newEvolution.evolutionIsDone();