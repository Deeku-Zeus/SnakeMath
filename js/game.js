const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

// create the unit
const box = 32;

// load images

const ground = new Image();
ground.src = "img/r1.png";


// load audio files

let dead = new Audio();
let eat = new Audio();
let up = new Audio();
let right = new Audio();
let left = new Audio();
let down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
right.src = "audio/right.mp3";
left.src = "audio/left.mp3";
down.src = "audio/down.mp3";

// create the snake

let snake = [];
var shead,sbody;

snake[0] = {
    x : 9 * box,
    y : 10 * box
};

// create the food

let food = {
    x : Math.floor(Math.random()*17+1) * box,
    y : Math.floor(Math.random()*15+4) * box,
    cont :Math.floor(Math.random()*13)
}

var numoptImg;
let numopt=[];

var values=[0,1,2,3,4,5,6,7,8,9,'+','-','*','/'];

for(j=0;j<=13;j++)
{
    numopt[j]={
        val:j,
        source:"img/"+j+"i.png",
    }
}


// create the score var

let score = 0;
var speed=100;

var eaten=[];
var stacklen;

//control the snake

let d;
//DEFAULT value;
d="still";
document.addEventListener("keydown",direction);

function direction(event){
    let key = event.keyCode;
    if( key == 97 && d != "RIGHT" || key == 65 || key== 37){
        left.play();
        d = "LEFT";
    }else if(key == 119 && d != "DOWN" || key == 87 || key == 38){
        d = "UP";
        up.play();
    }else if(key == 100 && d != "LEFT" || key == 68 || key == 39){
        d = "RIGHT";
        right.play();
    }else if(key == 115 && d != "UP" || key == 83 || key == 40){
        d = "DOWN";
        down.play();
    }

    if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1) {
        event.preventDefault();
    }
}

// cheack collision function
function collision(head,array){
    for(let i = 0; i < array.length; i++){
        if(head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}

// draw everything to the canvas

function draw(){

   ctx.drawImage(ground, 0,0);

     ctx.lineWidth=1;
    ctx.strokeStyle = "white";
        ctx.strokeRect(3*box,box,box*13,box);

            ctx.lineWidth=5;
         ctx.strokeStyle = "green";
        ctx.strokeRect(0,3*box,19*box,16*box);

        if(score>3){
            speed=1;
        }

    for( let i = 0; i < snake.length ; i++){

        if(i==0)
        {
            if(d!="still"){

            shead=new Image();
            shead.src="img/"+d+".png";
            ctx.drawImage(shead, snake[i].x, snake[i].y,1.3*box,1.3*box);

         }
         else
         {
            shead=new Image();
            shead.src="img/RIGHT.png";
            ctx.drawImage(shead, snake[i].x, snake[i].y,1.3*box,1.3*box);
         }
        }
        else
        {
            sbody=new Image();
            sbody.src="img/snbody.png";
            ctx.drawImage(sbody, snake[i].x, snake[i].y,1.3*box,1.3*box);
            ctx.strokeStyle = "green";
            //ctx.lineWidth=3.5;
            //ctx.strokeRect(snake[i].x,snake[i].y,box,box);
        }
    }
    
    numoptImg = new Image();
    numoptImg.src=numopt[food.cont].source;
    ctx.fillStyle="yellow";
    ctx.drawImage(numoptImg, food.x, food.y,box,box);

    // old head position
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    
    // which direction
    if( d == "LEFT") snakeX -= box;
    if( d == "UP") snakeY -= box;
    if( d == "RIGHT") snakeX += box;
    if( d == "DOWN") snakeY += box;
    
    //snake.pop();
    // if the snake eats the food
    if(snakeX == food.x && snakeY == food.y){
        score++;
        eat.play();
        eaten.push(values[food.cont]);
        console.log(values[food.cont]);
        food = {
            x : Math.floor(Math.random()*17+1) * box,
            y : Math.floor(Math.random()*15+3) * box,
            cont : Math.floor(Math.random()*13)
        }

        
        // we don't remove the tail
    }else{
        // remove the tail
        snake.pop();
    }
    
    // add new Head
    
    let newHead = {
        x : snakeX,
        y : snakeY
    }
    
    // game over
    
    if(eaten.length>=13 || snakeX < 0 || snakeX > 18 * box || snakeY < 3*box || snakeY > 18*box || collision(newHead,snake)){
        clearInterval(game);
        dead.play();
         ctx.fillStyle = "orange";
    ctx.font = "80px trex";
    ctx.fillText("GAME OVER",(5*box),10*box);
    ctx.font = "50px trex";
    ctx.fillText("SCORE : "+score,(7.5*box),12*box);
        //window.alert("Game Over!");
    }
    
    snake.unshift(newHead);
    
    ctx.fillStyle = "white";
    ctx.font = "30px sparkles";
    ctx.fillText("STATUS",(7.5*box),0.8*box);

    // makes the logic condense the stack

    evaluate();

    for(var k=0;k<eaten.length && k<13;k++)
    {

    ctx.fillStyle = "white";
    ctx.font = "30px Comic Relief";
    ctx.fillText(eaten[k],(3.3*box)+(box*k),1.8*box);
    ctx.strokeStyle = "white";
     ctx.lineWidth=2;
    ctx.strokeRect((3*box)+(box*k),box,box,box);
  //  console.log(eaten[k]);
    }
}

// call draw function every 100 ms

let game = setInterval(draw,speed);

function evaluate(){

    stacklen = eaten.length;

    var ch = Number(eaten[stacklen-1]);

    var x=(isNaN(ch))? "0": "1" ;
    console.log(stacklen);
    switch(x)
    {
        case "1":
            //window.alert("number");
            console.log("number");
            break;
        case "0":

            switch(ch)
            {
                case '+':
                    var digit;
                    
                    break;
                case '-':
                    break;
                case '*':
                    break;
                case '/':
                    break;
            }
    }

}


















