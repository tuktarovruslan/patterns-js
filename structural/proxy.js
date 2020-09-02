// 1) Оборачивает классы или функции в дополнительный функционал;
// 2) Устанавливает ловушки на вызываемые методы, чтобы их перехватить;
// 3) Прокси экономит трафик, перехватывая и обрабатывая вызовы предварительно;

// Пример 1
class Door {
  open() {
    console.log('Openning the door');
  }

  close() {
    console.log('Closing the door');
  }
}

class Security {
  constructor(door) {
    this.door = door
  }

  open(password) {
    if(this.authenticate(password)) {
      this.door.open()
    } else {
      console.log('No access');
    }
  }

  authenticate(password) {
    return password === 'okpass'
  }

  close() {
    this.door.close()
  }
};

const door = new Security(new Door());

door.open('invalid');
door.open('okpass');
door.close();


// Пример 2
function networkFetch(url) {
  return `${url} - Ответ с сервера`
}

const cache = new Set()
const proxiedFetch = new Proxy(networkFetch, {
  apply(target, thisArg, args) {
    const url = args[0]
    if (cache.has(url)) {
      return `${url} - Ответ из кэша`
    } else {
      cache.add(url)
      // Reflect - обертка над apply, чтобы не было рекурсии;
      return Reflect.apply(target, thisArg, args)
    }
  }
})

console.log(proxiedFetch('angular.io'))
console.log(proxiedFetch('react.io'))
console.log(proxiedFetch('angular.io'))