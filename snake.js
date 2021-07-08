function init(){
  const canvas = document.getElementById("mycanvas");
  H = W = canvas.height = canvas.width = 1000;
  pen = canvas.getContext('2d');
  cs = 67;
  game_over = false;
  score = 5;

  food = getRandomFood();
  //Create a Image Object
  food_img = new Image();
  food_img.src = "Assets/apple.png";

  trophy = new Image();
  trophy.src = "Assets/trophy.png"

  snake = {
    init_len : 5,
    color: "blue",
    cells: [],
    direction: "right",

    createSnake: function(){
        for(var i = this.init_len;i>0;i--){
          this.cells.push({x:i,y:0});
        }
    },
    drawSnake: function(){
      for(var i = 0;i<this.cells.length;i++){
        pen.fillStyle = snake.color;
        pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-2,cs-2);
      }
    },
    updateSnake: function(){
      const headX = this.cells[0].x;
      const headY = this.cells[0].y;

      if(headX === food.x && headY === food.y){
        console.log("Food Eaten");
        food = getRandomFood();
        score++;
      }else{
        this.cells.pop();
      }
      var nextX,nextY;

      if(this.direction === 'right'){
        nextX = headX+1;
        nextY = headY;
      }else if(this.direction === 'left'){
        nextX = headX-1;
        nextY = headY;
      }else if(this.direction === 'down'){
        nextX = headX;
        nextY = headY+1;
      }else{
        nextX = headX;
        nextY = headY-1;
      }

      this.cells.unshift({x:nextX,y:nextY});

      //Logic if snake goes out of the canvas
      const last_x = Math.round(W/cs);
      const last_y = Math.round(H/cs);

      if(this.cells[0].x>last_x || this.cells[0].x<0 || this.cells[0].y>last_y || this.cells[0].y<0){
        game_over = true;
      }
    }
  }

  snake.createSnake();
  //Add eventListener to the document
  function keyPressed(e){

    if(e.key === "ArrowRight"){
      snake.direction = "right";
    }else if(e.key === "ArrowLeft"){
      snake.direction = "left";
    }else if(e.key === "ArrowDown"){
      snake.direction = "down";
    }else{
        snake.direction = "up";
    }
    console.log("Key Pressed",snake.direction );
  }
  document.addEventListener('keydown',keyPressed);

}

function draw(){
  //erase the old frame
  pen.clearRect(0,0,W,H);
  snake.drawSnake();
  pen.fillStyle = food.color;
  pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

  pen.drawImage(trophy,23,20,cs,cs)
  pen.fillStyle = "blue";
  pen.font = "30px Roboto";
  pen.fillText(score,50,50);
}

function update(){
  snake.updateSnake();
}

function getRandomFood(){
  const foodX = Math.round(Math.random()*(W-cs)/cs);
  const foodY = Math.round(Math.random()*(H-cs)/cs);

  const food ={
    x: foodX,
    y: foodY,
    color: "red",
  }

  return food;
}

function gameLoop(){
  if(game_over ===  true){
    clearInterval(f);
    alert("Game Over");
  }
  draw();
  update();
}

init();
const f = setInterval(gameLoop,100);
