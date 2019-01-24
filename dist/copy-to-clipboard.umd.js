/*!
 * @uiw/copy-to-clipboard v1.0.7
 * Copy to clipboard.
 * 
 * Copyright (c) 2019 Kenny Wang
 * https://github.com/uiw-react/copy-to-clipboard.git
 * 
 * Licensed under the MIT license.
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.copyTextToClipboard = factory());
}(this, (function () { 'use strict';

  function copyTextToClipboard(text, cb) {
    //
    // *** This styling is an extra step which is likely not required. ***
    // 
    // https://github.com/w3c/clipboard-apis/blob/master/explainer.adoc#writing-to-the-clipboard
    //
    // Why is it here? To ensure:
    // 1. the element is able to have focus and selection.
    // 2. if element was to flash render it has minimal visual impact.
    // 3. less flakyness with selection and copying which **might** occur if
    //    the textarea element is not visible.
    //
    // The likelihood is the element won't even render, not even a flash,
    // so some of these are just precautions. However in IE the element
    // is visible whilst the popup box asking the user for permission for
    // the web page to copy to the clipboard.
    //
    // Place in top-left corner of screen regardless of scroll position.
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style = {
      position: 'absolute',
      left: '-9999px',
    };
    document.body.appendChild(el);
    const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
    el.select();
    try {
      const successful = document.execCommand('copy');
      const isCopy = !!successful;
      cb && cb(isCopy);
    } catch (err) {
      cb && cb(false);
      // console.log('Oops, unable to copy');
    }
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
  }

  return copyTextToClipboard;

})));
