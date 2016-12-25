/* jshint esversion: 6 */

class Contributor {
  constructor(options) {
    if (options.name == 'undefined') {
      this.name = 'Anonymous';
    } else {
      this.name = options.name;
    }
    this.amount = options.amount;
  }
}

export default Contributor;
