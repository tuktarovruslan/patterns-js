// One-to-many связи;
// Похож на диспетчер Vuex;
// Собственная шина событий;
// Триггерит изменения на всех подписчиках;

class Superstar {
  constructor() {
    this.observers = []
  }

  subscribe(observer) {
    this.observers.push(observer)
  }

  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer)
  }

  trigger(action) {
    this.observers.forEach(observer => {
      observer.update(action)
    })
  }
}

class Observer {
  constructor(state = 1) {
    this.state = state
    this.initialState = state
  }

  update(action) {
    switch (action.type) {
      case 'INCREMENT':
        this.state = ++this.state
        break
      case 'DECREMENT':
        this.state = --this.state
        break
      case 'ADD':
        this.state += action.payload
        break
      default:
        this.state = this.initialState
    }
  }
}

const stream$ = new Superstar()

const obs1 = new Observer()
const obs2 = new Observer(42)

stream$.subscribe(obs1)
stream$.subscribe(obs2)

stream$.trigger({type: 'INCREMENT'})
stream$.trigger({type: 'INCREMENT'})
stream$.trigger({type: 'DECREMENT'})
stream$.trigger({})
stream$.trigger({type: 'ADD', payload: 10})

console.log(obs1.state)
console.log(obs2.state)