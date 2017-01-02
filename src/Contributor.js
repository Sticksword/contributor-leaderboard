/* jshint esversion: 6 */

export default class Contributor {
  constructor(options) {
    if (typeof options.name !== 'undefined') {
      this.name = options.name;
    } else {
      this.name = 'Anonymous';
    }
    this.amount = options.amount;
  }

}
