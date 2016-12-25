/* jshint esversion: 6 */

import $ from 'jquery';

// borrow from React and Redux paradigm
// app.js is our container component
// contributorList and payWhatYouWant are our presentational components

import { populateContributorList } from './contributorList';
import { selectOption } from './payWhatYouWant';
import Contributor from './Contributor';

// $("#contributor-list").html("testing");

class PaymentPage {
  constructor(options) {
    this.topContributors = options.topContributors;
    this.minTopTen = 0;
    this.selection = null;
    this.amount = null;
    this.name = 'Anonymous';
  }


  submitPayment() {
    if (this.amount !== null && this.amount > this.minTopTen) {
      this.topContributors.push(new Contributor({
        name: this.name,
        amount: this.amount
      }));
    } else {
      console.log('shouldn\'t be doing anything yet');
    }
  }
}

let topContributors = [];
topContributors.push(new Contributor({
  name: 'Michael',
  amount: 50
}));

console.log(topContributors);

let paymentPage = new PaymentPage({
  topContributors: topContributors
});

$('#order-form').submit(function(event) {
  event.preventDefault();
  console.log('hello');
  paymentPage.submitPayment();
});

$('.amount-button').click(function(){
  $(this).toggleClass('selected');
  if (paymentPage.selection !== null) {
    paymentPage.selection.toggleClass('selected');
  }
  paymentPage.selection = $(this);
  // paymentPage.amount = $(this).html();
  paymentPage.amount = $(this).val();
  if ($(this).html() === 'Custom Amount') {
    $('input[name=custom-amount]').removeClass('hidden');
  } else {
    $('input[name=custom-amount]').addClass('hidden');
  }
  console.log(paymentPage.amount);
});

$('input[name=custom-amount]').change(function() {
  // console.log($(this));
  console.log($(this).val());
});
