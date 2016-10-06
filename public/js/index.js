$(document).ready(function() {
  // Allow using Handlebars templates as partials as well.
  Handlebars.partials = Handlebars.templates;

  // We will insert new activities after this selector.
  var insertSelector = '#hours-table tr:last';

  // On document load, fetch the activities and display them.
  $.get('/activities', function(resp) {
    var html = Handlebars.templates.activity_items(resp);
    $(insertSelector).after(html);
  });

  // On submit button click, create the activity and display it.
  $('#submit-button').click(function() {
    // Create activity with POST request.
    $.post('/activities', {
        type: $('#type-input').val(),
        duration: $('#minutes-input').val(),
        intensity: $('#intensity-input').val()
    }, function(resp) {
      if (resp.success) {
        // Display activity.
        var html = Handlebars.templates.activity_item(resp.activity);
        $(insertSelector).after(html);
      } else {
        alert(resp.message);
      }
    });
  });
});

