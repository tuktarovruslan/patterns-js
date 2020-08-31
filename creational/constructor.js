// function Server(name, ip) {
//   this.name = name
//   this.ip = ip
// }
//
// Server.prototype.getUrl = function() {
//   return `https://${this.ip}:80`
// }

class Server {
  constructor(name, ip) {
    this.name = name;
    this.ip = ip;
  }

  getUrl() {
    return `https://${this.ip}:8000`
  }
}

const aws = new Server('Amazon Web Server', '223.132.33.11');

console.log("aws", aws);
console.log(aws.getUrl());