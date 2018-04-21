// custom extension for jQuery (https://stackoverflow.com/a/920322)
jQuery.fn.exists = function () {
  return this.length !== 0;
};

(function(global, $) {
  "use strict";

  function dismissBalloon() {
    // dismiss hint (if any)
    $("*[data-balloon-visible]").removeAttr("data-balloon-visible data-balloon");
  }

  // handle modal dismissal
  $("#count-me-in").on("hidden.bs.modal", function() {
    dismissBalloon();
    // clear input form
    $(":input", this).val("");
  });

  // port of email validation regex from Ruby on Rails - /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
  // prepare validation settings
  var validationSettings = {
    // NOTE: This setup displays errors only on form submission
    onkeyup: false,
    onclick: false,
    // NOTE: Do not auto-focus on invalid elements, otherwise
    // validation brings-in a glitch where the invalid element
    // misses the next click.
    focusInvalid: false,
    // Dismiss hint balloon when element loses focus
    onfocusout: function() { dismissBalloon() },
    // Shows actual validation errors using balloon.css
    showErrors: function(errorMap, errorList) {
      // apply data-balloon-* attributes to the parent element
      for(var i in errorList) {
        // here is our error object
        var error = errorList[i];
        // obtain reference to the parent
        var parent = $(error.element).parent();
        // apply "data-balloon" attributes to display tooltip
        parent
          .attr("data-balloon", error.message)
          .attr("data-balloon-visible", ""); 
      }
    }
  };
  // NOTE: Unfortunately jQuery Validation does not support multiple form selectors
  // therefore we fallback to shared validation settings + per form setup.
  // https://jqueryvalidation.org/reference#link-validating-multiple-forms-on-one-page
  $("#hey-iam-in-form, #insiders-squad-form").each(function() {
    $(this).validate(validationSettings);
  })
})(this, jQuery);