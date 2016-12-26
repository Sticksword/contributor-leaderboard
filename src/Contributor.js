/* jshint esversion: 6 */

export default class Contributor {
  constructor(options) {
    if (options.name == 'undefined') {
      this.name = 'Anonymous';
    } else {
      this.name = options.name;
    }
    this.amount = options.amount;
  }

  static compare(a, b) {
    if (a.amount < b.amount) {
      return 1;
    }
    if (a.amount > b.amount) {
      return -1;
    }
    return 0;
  }
}
