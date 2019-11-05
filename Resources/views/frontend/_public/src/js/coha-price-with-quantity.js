
var cohaPwQ = {
  'name': 'CohaPriceWithQuantity'
};

// The Main / Trigger-Function
cohaPwQ.triggerPriceWithQuantityChange = function (txt) {
    var $ = jQuery;

    // Only if we are on Details Page
    if ( $('.product--details').length > 0 ) 
    {
        // Init Price Wrapper
        var eWrapper = cohaPwQ.initQuantityPriceWrapper();
        var iQuantity = parseInt($('#sQuantity').val());


        // If Quantity Bigger than 1
        if ( iQuantity != 1 && iQuantity > 0) 
        {
            // Calculate Prices
            console.log('XYZ1 cohaPwQ: '+txt);

            var fSinglePrice = parseFloat($('meta[itemprop="price"]').attr('content'));
            var fTotalPrice  = fSinglePrice * iQuantity;
            var sTotalPrice  = cohaPwQ.formatPriceByLocale(fTotalPrice, 'de');

            eWrapper
              .html(sTotalPrice)
              .show();
        } 
        // Quantity is smaller than 1
        else {
          eWrapper.hide();
        }

    }
};

cohaPwQ.initQuantityPriceWrapper = function() {
  var sWrapperClasses = '.product--price.price-with-qty';

  // If not initialized
  if(jQuery(sWrapperClasses).length <= 0) {
    // Insert after Product's Default-Price
    jQuery('.product--price.price--default').after('<div class="product--price price-with-qty"></div>');
  }

  return jQuery(sWrapperClasses).eq(0);
};

cohaPwQ.formatPriceByLocale = function(value, locale) {
  var currencyFormat;
  var fPrice = value;
  var sPrice = '';

  switch (locale) {
    case 'en-GB':
    case 'en-EN':
    case 'en':
      currencyFormat = '$ 0.00 *';
      sPrice = 'Price with Quantity: '+currencyFormat.replace('0.00', fPrice);
      break;
    case 'de':
      sPrice = fPrice.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
        currencyDisplay: 'symbol',
        useGrouping: true
      });
      sPrice = 'Gesamtpreis: '+sPrice+ ' *';
      break;
    default:
      sPrice = fPrice.toString();
      break;
  }
  
  return sPrice;
};



// function fInitcohaPwQ_first() {

// }


// On Change Quantity
jQuery(document).on('change', '#sQuantity, .quantity--select', function(e) {
  cohaPwQ.triggerPriceWithQuantityChange('frontend qty change');
});

// On Document Ready
jQuery(document).ready(function ($) {
  cohaPwQ.triggerPriceWithQuantityChange('async ready - document ready');
  
  // On Ajax-Complete
  $(document).ajaxComplete(function() {
    cohaPwQ.triggerPriceWithQuantityChange('async ready - document ready - on ajax complete');
  });
});

// On Ready State Change
document.onreadystatechange = function() {
  // On Ready State
  if (document.readyState === 'complete') {
    // Ready State Complete
    cohaPwQ.triggerPriceWithQuantityChange('async ready - on ready state change');
  }
};

