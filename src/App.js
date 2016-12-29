/* jshint esversion: 6 */

import $ from 'jquery';

// borrow from React and Redux paradigm or separating state/logic from presentation
// App.js sets up the page logic/events
// PaymentPage.js sets up and manages the state
// helper_functions.js helps render and present things

import PaymentPage from './PaymentPage';

let paymentPage = new PaymentPage({
  topContributors: []
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

  if ($(this).html() === 'Custom Amount') { // clean this abomination
    $('input[name=custom-amount]').removeClass('hidden');
    paymentPage.amount = $('input[name=custom-amount]').val();
  } else {
    $('input[name=custom-amount]').addClass('hidden');
    paymentPage.amount = $(this).val();
  }
  paymentPage.checkTopTenContributorDisplay();


});

$('.no-thanks').click(function(){
  console.log('no thanks!');
});

$('input[name=custom-amount]').change(function() {
  // regex reference: http://stackoverflow.com/questions/1862130/strip-non-numeric-characters-from-string
  paymentPage.amount = $(this).val().replace(/[^\d.]/g, ''); // replace globally via `/g` anything that is not a digit or .
  $('input[name=custom-amount]').val(paymentPage.amount);

  paymentPage.checkTopTenContributorDisplay();
  console.log(paymentPage.amount);
});

$('input[name=top-ten-name]').change(function() {
  paymentPage.name = $(this).val();
});
