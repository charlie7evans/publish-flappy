jQuery('#scoresbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<P>'+'Scores'+'</p>'
  )
});
jQuery('#creditsbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<P>'+'Credits'+'</p>'
  )
});
jQuery('#helpbtn').on('click', function() {
  jQuery('#content').empty();
  jQuery('#content').append(
    '<P>'+'Help'+'</p>'
  )
});

function registerScore(score){
  var playerName = prompt("What's your name?");
  var scoreEntry = "<li>" + playerName + ":" + score.toString() + "</li>";
  jQuery('#content').empty();
  jQuery('#content').append(scoreEntry);
}
