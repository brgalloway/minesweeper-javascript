var mines = [[]];
var savedClicks = [];
var mine = new Image();
var box = new Image();
var one = new Image();
var two = new Image();
var revealed = new Image();
var gridX, gridY, minefieldSquared, expose;
box.src = "blank-square.png";
mine.src = "bomb.png";
revealed.src = "revealed.png";
one.src = "neighbor-1.png";
two.src = "neighbor-2.png";

var c = document.querySelector("canvas");
var c2d = c.getContext("2d");

//Prompte user for minefield size
minefieldSquared = prompt("Enter the minefield size.");
while (minefieldSquared != "quit") {
    if (minefieldSquared >= 5){
         break;
     }
     //Ask for a number 5 or greater or option to quit
     minefieldSquared = prompt("Minefield must be 5 or greater. Type quit to end.");
};

//draw size based on users input
c.height = minefieldSquared * 40;
c.width = minefieldSquared * 40;

//draw minefield after getting dimensions
window.addEventListener("load", function drawGrid(){
    console.log(minefieldSquared);
    for(var i = 0; i <= minefieldSquared; i++){
        for(var j = 0; j <= minefieldSquared; j++){
            var y = (i * 40);
            var x = (j * 40);
            c2d.drawImage(box, x, y);
        }
    }
    for(var i = 0; i < minefieldSquared; i++){
        mines[i] = [
            Math.floor(Math.random() * 5),
            Math.floor(Math.random() * 5)
        ];
    }
});

//check for mines and check adjacent squares for mines
c.addEventListener("click", function getClick(eventObj){
    var clickedX = eventObj.pageX - 8;
    var clickedY = eventObj.pageY - 91;
    gridX = Math.floor(clickedX/40);
    gridY = Math.floor(clickedY/40);
    
    var clickedMine = false;
    var boxesToCheck1 = [
        [0,-1],
        [0,1],
        [-1,-1],
        [-1,0],
        [-1,1],
        [1,0],
        [1,-1],
        [1,1]
    ];
 
    //Determine if square clicked on is a mine or not
    //if mine clicked then call gameover function
    for(var i = 0; i < mines.length; i++){
        if(mines[i][0] == gridX && mines[i][1] == gridY){
            clickedMine = true;
            for(var i = 0; i < minefieldSquared; i++){
                gridX = mines[i][0] * 40;
                gridY = mines[i][1] * 40;
                c2d.drawImage(mine, gridX, gridY);
            }
        }
        if(clickedMine == true){
            gameOver();
        }
    }
    //if clicked mine is false then no mine clicked
    //check adjacent squares for mines and mark distance if a 
    //mine is adjacent to click
    if(clickedMine == false){
        for(var j = 0; j < boxesToCheck1.length; j++){
            var bx = (gridX + boxesToCheck1[j][0]);
            var by = (gridY + boxesToCheck1[j][1]);
            for(var i = 0; i < mines.length; i++){ 
                if(mines[i][0] == bx && mines[i][1] == by){
                    gridX *= 40;
                    gridY *= 40;
                    c2d.drawImage(one, gridX, gridY);
                } 
            }
            expose = "one";   
        }
        if(expose == "one"){
            gridX *= 40;
            gridY *= 40;
            c2d.drawImage(revealed, gridX, gridY);
        } 
    } 
});

function gameOver(){
    alert("Game Over");
    location.reload();
};
