/* jshint esversion: 6 */

import $ from 'jquery';
import * as helpers from './helper_functions';
import Contributor from './Contributor';

class PaymentPage {
  constructor(options) {
    this.topContributors = options.topContributors;
    this.minTopTen = 0;
    this.selection = null;
    this.amount = 0;
    this.name = 'Anonymous';
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

  checkTopTenContributorDisplay() {
    if (this.isTopTen()) {
      $('#you-are-top-ten-contributor').removeClass('hidden');
    } else {
      $('#you-are-top-ten-contributor').addClass('hidden');
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
    * @description: submits payment for processing (put ajax calls here if there is backend)
  */
  resetPayWhatYouWantValues() {
    this.selection.toggleClass('selected');
    this.selection = null;
    this.name = 'Anonymous';
    this.amount = 0;
    helpers.resetCustomAmountDisplay();
  }

  renderContributorList() {
    helpers.renderContributorList(this.topContributors);
    helpers.resetTopTenContributorDisplay();
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
  submitPayment() {
    if (!this.hasValidAmount()) {
      alert('Oh no! Something went wrong. Maybe you entered an invalid amount.');
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

}

export default PaymentPage;
