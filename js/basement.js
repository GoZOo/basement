(function ($, Drupal) {

  /** ********************************************************************
   * INIT
   ** ***************************************************************** */

  Drupal.basement = Drupal.basement || {}
  Drupal.settings.basement = Drupal.settings.basement || {}


  /** ********************************************************************
   * FUNCTIONS
   ** ***************************************************************** */

  Drupal.basement.imagePlaceholder = function(){
    $('.image-placeholder').once('image-placeholder').each(function(){
      $(this).replaceWith( $('<img/>')
        .attr('src', $(this).data('src'))
        .attr('alt', $(this).data('alt'))
        .attr('title', $(this).data('title'))
      );
    });
  } // Drupal.basement.imagePlaceholder

  // Enlarge Your Click Zone : allow link'parent element to be clickable too
  Drupal.basement.enlargeYourClick = function(selector){
    $(selector).once('enlargeYourClick').click(function(e){
      // don't handle if user click on a link, or if he click with mouse wheel
      if (e.target.tagName != "A" && e.button != 1) {
        var dest = $(this).find('a:first').attr('href');
        if (dest) {window.location = dest};
      }
    })
    .css({cursor: 'pointer'});
  } // Drupal.basement.enlargeYourClick


  /** ********************************************************************
   * BEHAVIORS
   ** ***************************************************************** */

  Drupal.behaviors.basement = {
    attach: function(context, settings) {
      //$.extend(true, Drupal.settings, settings);

      // <html> js class
      $('html').removeClass('no-js') // addClass('js') is already done in misc/drupal.js

      /* Load images in placeholders */
      Drupal.basement.imagePlaceholder();

      /* Enlarge click zone */
      Drupal.basement.enlargeYourClick($('.example-selector'));


      /* IE Specific script */
      if ($.browser.msie) {
        // IE9- scripts
        if(parseInt($.browser.version, 10) < 10) {
          $('input[placeholder], textarea[placeholder]').placeholder();
        }
      }

      // Trigger backspace to empty drupal date/hour field
      if (Drupal.settings.datePopup !== undefined) {
        for (var id in Drupal.settings.datePopup) {
         $('#'+id).bind('keyup', function(e){
           var code = (e.keyCode ? e.keyCode : e.which);
           if (code==46 || code==8) {
             $(this).val("");
           }
         })
        }
      }

    }
  } // Drupal.behaviors.basement

})(jQuery, Drupal);
