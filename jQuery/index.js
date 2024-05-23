// $("body").keypress(function(event){
//     changeWord(event.key);
// });
// function changeWord(key){
//     $("h1").text(key);
// }
$("h1").text("hh");
$("h1").css("color","red");
$("button").html("hh"); 
$(document).keypress(function(event){
    $("h1").text(event.key);
})