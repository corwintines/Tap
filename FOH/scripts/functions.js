$(function () {
  modalNavOpen();
});

function modalNavOpen() {
  $('.mobile-nav-toggle').on('click', function() {
    if($('.mobile-nav-toggle').hasClass('is-open') === true) {
      $('.mobile-nav-toggle').removeClass('is-open');
      console.log("Class removed");
    }
    else {
      $('.mobile-nav-toggle').addClass('is-open');
      console.log("Class added");
    }
  });
}

// Look into jquery swiping
// Gesture interactions
