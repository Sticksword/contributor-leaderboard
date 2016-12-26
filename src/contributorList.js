/* jshint esversion: 6 */

import $ from 'jquery';

export const renderContributorList = (list) => {
  $('#contributor-list').empty();
  for (let i = 0; i < list.length; i++) {
    let $contributorDT = $('<dt>', {id: 'foo'});
    $contributorDT.append($('<span>').html(i + 1 + '. '));
    $contributorDT.append($('<span>').html(list[i].name));
    $('#contributor-list').append($contributorDT);
    $('#contributor-list').append($('<dd>').html('$' + list[i].amount));
  }
};

// <dt>
//   <span>1.</span>
//   <span>Example</span>
// </dt>
// <dd>$50.00</dd>
