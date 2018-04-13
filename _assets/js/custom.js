// custom extension for jQuery (https://stackoverflow.com/a/920322)
jQuery.fn.exists = function () {
  return this.length !== 0;
};

(function(global, $) {
  "use strict";

  // handle modal dismissal
  $("#count-me-in").on("hidden.bs.modal", function() {
    // dismiss hint (if any)
    $("*[data-balloon-visible]", this)
      .removeAttr("data-balloon-visible data-balloon");
    // clear input form
    $(":input", this).val("");
  });

  // port of email validation regex from Ruby on Rails - /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
  // setup validation for the only form
  $("#hey-iam-in-form").validate({
    // display errors only on form submission
    onkeyup: false,
    onfocusout: false,
    onclick: false,
    // customize error label container to display validation errors
    errorLabelContainer: "#omg-validation-errors",
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
  });
})(this, jQuery);