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


  submitPayment() {
    if (this.amount !== null && this.amount > this.minTopTen) {
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
  console.log(paymentPage.amount);
});

$('input[name=custom-amount]').change(function() {
  // console.log($(this));
  paymentPage.amount = $(this).val().replace(/[^\d.-]/g, '');
  console.log(paymentPage.amount);
});
