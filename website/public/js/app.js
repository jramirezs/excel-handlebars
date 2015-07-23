$('#document').ready(function() {
  $("#result").text($.trim($("#result").text()));
  $("#template").text($.trim($("#template").text()));
  $('[data-toggle="tooltip"]').tooltip();
});

$('#copy').click(function(e) {
  window.prompt("Copy to clipboard: Ctrl+C, Enter", $("#result").text());
  e.preventDefault();
});
