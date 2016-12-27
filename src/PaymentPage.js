/* jshint esversion: 6 */

import $ from 'jquery';

// borrow from React and Redux paradigm
// app.js is our container component
// contributorList and payWhatYouWant are our presentational components

import * as helpers from './helper_functions';
import Contributor from './Contributor';

class PaymentPage {
  constructor(options) {
    this.topContributors = options.topContributors;
    this.minTopTen = 0;
    this.selection = null;
    this.amount = 0;
    this.name = 'Anonymous';
    helpers.renderContributorList(this.topContributors);
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
    if (this.hasValidAmount() && (this.topTenHasRoom() || this.amountMakesTopTen())) {
      this.topContributors.push(new Contributor({
        name: this.name,
        amount: this.amount
      }));
      this.topContributors.sort(Contributor.compare);
      if (this.topContributors.length > 10) {
        this.topContributors.pop();
      }
      console.log(this.topContributors);
      helpers.renderContributorList(this.topContributors);
      helpers.resetTopTenContributorDisplay();

      this.updateMinTopTen();
      this.resetPayWhatYouWantValues();
    } else {
      console.log('either amount is 0 or amount doesn\'t make the top ten cut');
    }
  }
}

let topContributors = [];
topContributors.push(new Contributor({
  name: 'Michael',
  amount: 50
}));

let paymentPage = new PaymentPage({
  topContributors: topContributors
});

$('#order-form').submit(function(event) {
  event.preventDefault();
  paymentPage.submitPayment();
});

$('.amount-button').click(function(){
  $(this).toggleClass('selected');
  if (paymentPage.selection !== null) {
    paymentPage.selection.toggleClass('selected');
  }
  paymentPage.selection = $(this);

  if ($(this).html() === 'Custom Amount') {
    $('input[name=custom-amount]').removeClass('hidden');
    paymentPage.amount = $('input[name=custom-amount]').val();

    if (paymentPage.amount !== '' && (paymentPage.topContributors.length < 10 || paymentPage.amount > paymentPage.minTopTen)) {
      $('#top-ten-contributor').removeClass('hidden');
    } else {
      $('#top-ten-contributor').addClass('hidden');
    }
  } else {
    $('input[name=custom-amount]').addClass('hidden');
    paymentPage.amount = $(this).val();

    if (paymentPage.topContributors.length < 10 || paymentPage.amount > paymentPage.minTopTen) {
      $('#top-ten-contributor').removeClass('hidden');
    } else {
      $('#top-ten-contributor').addClass('hidden');
    }
  }



});

$('.no-thanks').click(function(){
  console.log('no thanks!');
});

$('input[name=custom-amount]').change(function() {
  // regex reference: http://stackoverflow.com/questions/1862130/strip-non-numeric-characters-from-string
  paymentPage.amount = $(this).val().replace(/[^\d.-]/g, '');

  if (paymentPage.topContributors.length < 10 || paymentPage.amount > paymentPage.minTopTen) {
    $('#top-ten-contributor').removeClass('hidden');
  } else {
    $('#top-ten-contributor').addClass('hidden');
  }
});

$('input[name=top-ten-name]').change(function() {
  paymentPage.name = $(this).val();
});
