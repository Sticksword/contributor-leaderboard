/* jshint esversion: 6 */

import * as helpers from './helper_functions';
import Contributor from './Contributor';

class PaymentPage {

  /**
    * @description: loads up the Payment Page, can add a library here to load data
    * @param options: takes in JS object that has 1 array field, topContributors
  */
  constructor(options) {
    this.topContributors = options.topContributors;
    this.minTopTen = 0;
    this.selection = null;
    this.amount = 0;
    this.name = 'Anonymous';
    this.noThanks = false;
    this.renderContributorList();
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
      helpers.showYouAreTopTenDisplay();
    } else {
      helpers.hideYouAreTopTenDisplay();
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
    return this.amount > 0;
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
    this.selection.toggleClass('selected');
    this.selection = null;
    this.name = 'Anonymous';
    this.amount = 0;
    this.noThanks = false;
    helpers.resetCustomAmountDisplay();
  }

  renderContributorList() {
    helpers.renderContributorList(this.topContributors);
    helpers.resetTopTenContributorDisplay();
  }

  /**
    * @description: submits payment for processing (put ajax calls here if there is backend)
  */
  submitPayment() {
    if (!this.hasValidAmount()) {
      alert('Oh no! Please check the amount and try again.');
      return;
    }
    if (this.isTopTen()) {
      this.topContributors.push(new Contributor({
        name: this.name,
        amount: this.amount
      }));
      this.topContributors.sort(Contributor.compare);
      if (this.topContributors.length > 10) {
        this.topContributors.pop();
      }
      console.log(this.topContributors);

      this.renderContributorList();
      this.updateMinTopTen();
      this.resetPayWhatYouWantValues();
    }
  }

  setAmount(amount) {
    this.amount = parseFloat(amount).toFixed(2);
  }

}

export default PaymentPage;
