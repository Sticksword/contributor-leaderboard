/* jshint esversion: 6 */

export default class Contributor {
  constructor(options) {
    if (options.name === 'undefined') {
      this.name = 'Anonymous';
    } else {
      this.name = options.name;
    }
    this.amount = options.amount;
  }

}
