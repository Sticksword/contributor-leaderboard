/* jshint esversion: 6 */

import * as displays from './display_functions';
import * as helpers from './helper_functions';
import Contributor from './Contributor';

class PaymentPage {
  // Note: for this project, I opted not to make variables private because there is no need for it in such a small project
  // If chosen to do so, I would have probably used closures and underscore prefixes

  /**
    * @description: loads up the Payment Page, can add a library here to load data
    * @param options: takes in JS object that has 1 array field, topContributors
  */
  constructor(options) {
    this.topContributors = options.topContributors;
    this.minTopTen = 0;
    this.resetPayWhatYouWantValues();
    this.renderContributorList(); // technically not needed b/c list is empty, only useful if we initialize with users from external data source
  }

  /**
    * @description: returns true if there is space to add another high roller
    * @return: bool
  */
  topTenHasRoom() {
    return this.topContributors.length < 10;
  }

  /**
    * @description: returns true if exceeding top ten capacity of 10
    * @return: bool
  */
  topTenOverflowing() {
    return this.topContributors.length > 10;
  }

  /**
    * @description: returns true if current payment amount makes the top ten high rollers list
    * @return: bool
  */
  amountMakesTopTen() {
    return this.amount > this.minTopTen;
  }

  /**
    * @description: logic for toggling the "you are a top ten contributor!" display
  */
  checkTopTenContributorDisplay() {
    if (this.isTopTen() && !this.noThanks) {
      displays.showYouAreTopTenDisplay();
    } else {
      displays.hideYouAreTopTenDisplay();
    }
  }

  /**
    * @description: returns true if current payment can be considered a top ten payment
    * @return: bool
  */
  isTopTen() {
    return (this.topTenHasRoom() || this.amountMakesTopTen());
  }

  /**
    * @description: returns true if current payment amount doesn't make the buyer a cheapskate
    * @return: bool
  */
  hasValidAmount() {
    return this.amount > 0.01;
  }

  /**
    * @description: updates the minimum value needed to make the top ten contributor list
  */
  updateMinTopTen() {
    this.minTopTen = this.topContributors.slice(-1)[0].amount;
  }

  /**
    * @description: submits payment for processing (put ajax calls here if there is backend)
  */
  resetPayWhatYouWantValues() {
    if (typeof this.selection !== 'undefined') {
      this.selection.toggleClass('selected');
    }
    this.selection = null;
    this.name = 'Anonymous';
    this.amount = 0;
    this.noThanks = false;
  }

  /**
    * @description: renders the top contributors to DOM and resets the "you-are-top-ten-contributor" display
  */
  renderContributorList() {
    displays.renderContributorList(this.topContributors);
    displays.resetTopTenContributorDisplay();
  }

  /**
    * @description: submits payment for processing, put ajax calls here if there is backend
    (I feel this function can belong here or in App.js, I chose here because it semantically makes sense)
  */
  submitPayment() {
    if (!this.hasValidAmount()) {
      alert('Oh no! Please check the amount and try again.');
      return;
    }
    if (this.isTopTen()) {
      helpers.addOneInsertionSort(this.topContributors, new Contributor({
        name: this.name,
        amount: this.amount
      }));
      if (this.topTenOverflowing()) {
        this.topContributors.pop();
      }

      this.renderContributorList();
      this.updateMinTopTen();
      this.resetPayWhatYouWantValues();
      displays.resetCustomAmountDisplay();
    }
  }

  /**
    * @description: the only setter we are implementing that isn't trivial (when everything is public) because we need to have parsing logic
  */
  setAmount(amount) {
    this.amount = parseFloat(amount);
  }

}

export default PaymentPage;
