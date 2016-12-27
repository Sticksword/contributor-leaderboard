/* jshint esversion: 6 */

import $ from 'jquery';

// borrow from React and Redux paradigm
// app.js is our container component
// contributorList and payWhatYouWant are our presentational components

import { renderContributorList } from './contributorList';
import { selectOption } from './payWhatYouWant';
import Contributor from './Contributor';

class PaymentPage {
  constructor(options) {
    this.topContributors = options.topContributors;
    this.minTopTen = 0;
    this.selection = null;
    this.amount = null;
    this.name = 'Anonymous';
    renderContributorList(this.topContributors);
  }

  resetValues() {
    this.selection.toggleClass('selected');
    this.selection = null;
    this.name = 'Anonymous';
    this.amount = null;
    $('input[name=custom-amount]').addClass('hidden');
    $('input[name=custom-amount]').val('');
  }


  submitPayment() {
    if (this.amount !== null && (paymentPage.topContributors.length < 10 || this.amount > this.minTopTen)) {
      this.topContributors.push(new Contributor({
        name: this.name,
        amount: this.amount
      }));
      this.topContributors.sort(Contributor.compare);
      if (this.topContributors.length > 10) {
        this.topContributors.pop();
      }
      console.log(this.topContributors);
      renderContributorList(this.topContributors);
      $('#top-ten-contributor').addClass('hidden');
      $('input[name=top-ten-name]').val('');
      this.minTopTen = this.topContributors.slice(-1)[0].amount;

      this.resetValues();
    } else {
      console.log('either amount is null or amount doesn\'t make the top ten cut');
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
  // paymentPage.amount = $(this).html();

  if ($(this).html() === 'Custom Amount') {
    $('input[name=custom-amount]').removeClass('hidden');
    paymentPage.amount = $('input[name=custom-amount]').val();
  } else {
    $('input[name=custom-amount]').addClass('hidden');
    paymentPage.amount = $(this).val();
  }

  if (paymentPage.topContributors.length < 10 || paymentPage.amount > paymentPage.minTopTen) {
    $('#top-ten-contributor').removeClass('hidden');
  } else {
    $('#top-ten-contributor').addClass('hidden');
  }

  console.log(paymentPage.amount);
});

$('.no-thanks').click(function(){
  console.log('no thanks!');
});

$('input[name=custom-amount]').change(function() {
  // console.log($(this));
  paymentPage.amount = $(this).val().replace(/[^\d.-]/g, '');
  console.log(paymentPage.amount);
});

$('input[name=top-ten-name]').change(function() {
  paymentPage.name = $(this).val();
  console.log(paymentPage.name);
});
