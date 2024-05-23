var x = (Math.floor(Math.random()*6)) + 1;
var randomImage1 = "images/Dice" + x + ".png";
var image1 = document.querySelector(".img1");
image1.setAttribute("src", randomImage1);
var y = (Math.floor(Math.random()*6)) + 1;
var randomImage2 = "images/Dice" + y + ".png";
var image2 = document.querySelector(".img2");
image2.setAttribute("src", randomImage2);
if(x>y){
    document.querySelector("#who_won").innerHTML = "🎈Player 1 won";
}
else if(x===y){
    document.querySelector("#who_won").innerHTML = "Draw";
}
else{
    document.querySelector("#who_won").innerHTML = "Player 2 won🎈";

}