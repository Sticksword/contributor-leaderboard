/* jshint esversion: 6 */

import $ from 'jquery';

const baseUrl = 'https://www.twitter.com/';

/**
  * @description: renders the contributor list to the dom, also handles the Twitter @mentions
  (Rather than pick and choose DOM elements to erase, I chose the simpler method of simply re-rendering.
  I don't think there is array.splice and array.pop for DOM elements.
  In theory, can mimic React in their maintainence of a virtual DOM tree and doing a diff comparison when re-rendering but that's for another day.)
  * @param list: array of Contributor objects
*/
export const renderContributorList = (list) => {
  $('#contributor-list').empty();
  for (let i = 0; i < list.length; i++) {
    let $contributorDT = $('<dt>', {id: 'foo'});
    $contributorDT.append($('<span>').html(i + 1 + '. '));
    buildName($contributorDT, list[i].name);
    $('#contributor-list').append($contributorDT);
    $('#contributor-list').append($('<dd>').html('$' + list[i].amount.toFixed(2))); // display down to the penny
  }
};

/**
  * @description: builds the display name for a top contributor along with @mentions
  * @param dtElement: DOM element to be appended to the definition list
  * @param name: contributor name string given by buyer
*/
const buildName = (dtElement, name) => {
  let index = 0;
  while (index < name.length) {
    let mentionIndex = name.indexOf('@', index); // logic: build up until first @
    if (mentionIndex === -1) { // we have reached the end, no @mentions
      dtElement.append($('<span>').html(name.slice(index)));
      index = name.length;
    } else {
      dtElement.append($('<span>').html(name.slice(index, mentionIndex))); // add all the prior non-@mention characters
      let spaceIndex = name.indexOf(' ', mentionIndex); // then build the first link from mentionIndex to the first space
      if (spaceIndex === -1) { // we have reached the end, the rest is part of the @mention
        dtElement.append($('<a>', {
          text: name.slice(mentionIndex),
          href: baseUrl + name.slice(mentionIndex)
        }));
        index = name.length;
      } else {
        dtElement.append($('<a>', {
          text: name.slice(mentionIndex, spaceIndex),
          href: baseUrl + name.slice(mentionIndex, spaceIndex)
        }));
        index = spaceIndex;
      }
    }
  } // repeat until end of string
};

/**
  * @description: resets "you're a top contributor" display
*/
export const resetTopTenContributorDisplay = () => {
  hideYouAreTopTenDisplay();
  $('input[name=top-ten-name]').val('');
};

/**
  * @description: show "you're a top contributor" display
*/
export const showYouAreTopTenDisplay = () => {
  $('#you-are-top-ten-contributor').removeClass('hidden');
};

/**
  * @description: hide "you're a top contributor" display
*/
export const hideYouAreTopTenDisplay = () => {
  $('#you-are-top-ten-contributor').addClass('hidden');
};

/**
  * @description: resets custom input amount to initial value of 25
*/
export const resetCustomAmountDisplay = () => {
  $('input[name=custom-amount]').addClass('hidden');
  $('input[name=custom-amount]').val(25);
};
