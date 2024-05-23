$("body").keypress(function(event){
    pressedKey(event.key);
});
function pressedKey(key){
    $("h1").text(key);
} 
$("button").click(function(){
    var tom1 = new Audio('/sounds/tom-1.mp3');
        tom1.play();
})
