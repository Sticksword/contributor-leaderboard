/* jshint esversion: 6 */

import $ from 'jquery';

// borrow from React and Redux paradigm or separating state/logic from presentation
// since no React to help us, we separated state from logic as well
// App.js sets up the page logic/events, uses jquery
// PaymentPage.js sets up and manages the state, no jquery, all abstracted away
// helper_functions.js helps render and present things, uses jquery

import PaymentPage from './PaymentPage';

let paymentPage = new PaymentPage({
  topContributors: []
});

/**
  * @description: handles form submission logic (see submitPayment method for further details)
*/
$('#order-form').submit(function(event) {
  event.preventDefault();
  paymentPage.submitPayment();
});

/**
  * @description: Whenever an amount-button is clicked, we toggle the selection first to show that it's selected
  Then, we see if there was a former selection and if there was, we de-select it and set current selection to the button clicked
  Then, we check if the button was the Custom Amount button or not and set the amount accordingly
  Lastly, we check to see if the button clicked makes us a top ten contributor and we display accordingly
*/
$('.amount-button').click(function() {
  $(this).toggleClass('selected');
  if (paymentPage.selection !== null) {
    paymentPage.selection.toggleClass('selected');
  }
  paymentPage.selection = $(this);

  if ($(this).html() === 'Custom Amount') {
    $('input[name=custom-amount]').removeClass('hidden');
    paymentPage.setAmount($('input[name=custom-amount]').val());
  } else {
    $('input[name=custom-amount]').addClass('hidden');
    paymentPage.setAmount($(this).val());
  }
  paymentPage.checkTopTenContributorDisplay();
});

/**
  * @description: handles logic for when "no-thanks" label is clicked, ensuring the display doesn't show again for this submission
*/
$('.no-thanks').click(function() {
  paymentPage.noThanks = true;
  paymentPage.checkTopTenContributorDisplay();
});

/**
  * @description: parses the custom-amount input and checks to see if the value makes the buyer a top ten contributor
*/
$('input[name=custom-amount]').change(function() {
  // regex reference: http://stackoverflow.com/questions/1862130/strip-non-numeric-characters-from-string
  let amount = $(this).val().replace(/[^\d.]/g, ''); // replace globally via `/g` anything that is not a digit or .
  paymentPage.setAmount(amount);
  $('input[name=custom-amount]').val(amount); // set for later use when Custom Amount button is clicked

  if (amount === '') {
    alert('Please input a numeric amount!'); // don't need to do anything else, empty strings are handled via comparison in submitPayment method
  } else {
    paymentPage.checkTopTenContributorDisplay();
  }
});

/**
  * @description: stores the name given for the top ten list to be submitted upon "Buy Bundle!"
*/
$('input[name=top-ten-name]').change(function() {
  paymentPage.name = $(this).val();
});
