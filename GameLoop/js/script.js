var canvas = document.getElementById("game");

var context = canvas.getContext("2d");

var image = new Image();
image.src = "./img/bikeclock.jpg";

function GameObject(name, img, health) 
{
    this.name = name;
    this.img = img;
    this.health = health;
    this.x = 0;
    this.y = 0;
}

// The GamerInput is an Object that holds the Current
// GamerInput (Left, Right, Up, Down)
function GamerInput(input) 
{
    this.action = input;
}

// Default GamerInput is set to None
var gamerInput = new GamerInput("None"); //No Input

// Default Player
var player = new GameObject("Player", "test1.png", 100);

// Gameobjects is a collection of the Actors within the game
var gameobjects = [player, new GameObject("NPC", "test2.png", 100)];

// Process keyboard input event
function input(event) 
{
    // Take Input from the Player
    // console.log("Input");
    // console.log("Event type: " + event.type);

    if (event.type === "keydown") 
    {
        switch (event.keyCode) 
        {
            case 37:
                gamerInput = new GamerInput("Left");
                break; //Left key
            case 38:
                gamerInput = new GamerInput("Up");
                break; //Up key
            case 39:
                gamerInput = new GamerInput("Right");
                break; //Right key
            case 40:
                gamerInput = new GamerInput("Down");
                break; //Down key
            default:
                gamerInput = new GamerInput("None"); //No Input
        }
    } 
    else 
    {
        gamerInput = new GamerInput("None"); //No Input
    }
    //console.log("Gamer Input :" + gamerInput.action);
}

function update() 
{
    // Iterate through all GameObjects
    // Updating position and gamestate
    // console.log("Update");
    for (i = 0; i < gameobjects.length; i++) 
    {

        if (gamerInput.action === "Up") 
        {
            //gameobjects[i].x -= 1;
            gameobjects[i].y -= 5;
            //gameobjects[i].health = 100;
            console.log("Up");
            updatePosition();
        }

        //if (gameobjects[i].health >= 1) {

            //gameobjects[i].health = gameobjects[i].health - 1;
            // console.log("Health :" + gameobjects[i].health);

            if (gamerInput.action === "Down") 
            {
                //gameobjects[i].x += 1;
                gameobjects[i].y += 5;
                console.log("Down");
                updatePosition();
            }
            //if (gameobjects[i].health >= 1) {

                //gameobjects[i].health = gameobjects[i].health - 1;
                // console.log("Health :" + gameobjects[i].health);
    
                if (gamerInput.action === "Right") 
                {
                    gameobjects[i].x += 5;
                    //gameobjects[i].y += 1;
                    console.log("Right");
                    updatePosition();
                }

                if (gamerInput.action === "Left") 
                {
                    gameobjects[i].x -= 5;
                    //gameobjects[i].y -= 1;
                    console.log("Left");
                    updatePosition();
                }
                
    }
}


var x;
var y;
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () 
{
    if (this.readyState == 4 && this.status == 200) 
    {
        data = JSON.parse(this.responseText);
        console.log(data);
        x = data.x;
        y = data.y;
    } else {
        //Default value if we can't get JSON
        x = 500;
        y = 500;
    }
};
xmlhttp.open("GET", "level.json", true);
xmlhttp.send();
// Draw GameObjects to Console
// Modify to Draw to Screen
function draw() 
{
    // Clear Canvas
    // Iterate through all GameObjects
    // Draw each GameObject
    // console.log("Draw");
    //for (i = 0; i < gameobjects.length; i++) {
        //if (gameobjects[i].health > 0) {
            //console.log("Image :" + gameobjects[i].img);
        //}
    //}
    //console.log("Draw ...");

    //if (x < (200 + (image.width / 2)))
    //{
    // x += 20;

    //}
    animate();
    context.drawImage(image, x, y, 800, 800, 610, 610, 200, 200);
}
var frames = 6;

var currentFrame = 0;

var sprite = new Image();
sprite.src = "./img/stickman.png";

var sprite_x=0;

var inital = new Date().getTime();
var current;

function animate()
{
    context.clearRect(0, 0, canvas.width, canvas.height);
    current = new Date().getTime();
    if (current - inital >= 500)
    {
        currentFrame = (currentFrame + 1) % frames;
        inital = current;
    }

    context.drawImage(sprite, (sprite.width /6) * currentFrame, 0, 100,100, gameobjects[0].x, gameobjects[0].y, 250, 250);

    //context.font = "36pt Orbitron";
    //context.fillText(currentFrame,320,100);
}

function gameloop() 
{
    update();
    draw();
    window.requestAnimationFrame(gameloop);
}

// Handle Active Browser Tag Animation
window.requestAnimationFrame(gameloop);

// Handle Keypressed
window.addEventListener('keyup', input);
window.addEventListener('keydown', input);

function buttonUP()
{
    console.log("Up");
    gameobjects[0].y -= 15;
    updatePosition();
}
function buttonDOWN()
{
    console.log("Down");
    gameobjects[0].y += 15;
    updatePosition();
}
function buttonRIGHT()
{
    console.log("Right");
    gameobjects[0].x += 15;
    updatePosition();
}
function buttonLEFT()
{
    console.log("Left");
    gameobjects[0].x -= 15;
    updatePosition();
}

function movementSelection() 
{
    var selection = document.getElementById("equipment").value;
    var active = document.getElementById("active");
    if (active.checked == true) 
    {
      document.getElementById("HUD").innerHTML = selection + " Paused ";
      //console.log("Movement Paused");
      gameobjects[0].x = gameobjects[0].x;
      gameobjects[0].y = gameobjects[0].y;
      
    } else 
    {
      document.getElementById("HUD").innerHTML = selection + " Running ";
      //console.log("Movement Active");
    }
  }

//Array of Weapon Options
/*var options = [{
    "text": "Select a Weapon",
    "value": "No Weapon",
    "selected": true
  },
  {
    "text": "Spear",
    "value": "Javelin"
  },
  {
    "text": "Sword",
    "value": "Longsword"
  },
  {
    "text": "Crossbow",
    "value": "Pistol crossbow"
  }
];*/
function updatePosition() 
{
      localStorage.setItem('posX',gameobjects[0].x);
      document.getElementById("posXText").innerHTML = " [ " + localStorage.getItem('posX') + " ] ";
//-------------------------------------------------------------------------------------------------------------
      localStorage.setItem('posY',gameobjects[0].y);
      document.getElementById("posYText").innerHTML = " [ " + localStorage.getItem('posY') + " ] ";
}

function getPositionStorage() 
{
    var current_posX =parseInt(localStorage.getItem('posX'));
    
    
    if (isNaN(current_posX)) 
    {
        localStorage.setItem('posX',gameobjects[0].x);
        document.getElementById("posXText").innerHTML = " [ " + localStorage.getItem('posX') + " ] ";
      }
    
      gameobjects[0].x=parseInt(localStorage.getItem('posX')); 
      document.getElementById("posXText").innerHTML = " [ " + localStorage.getItem('posX') + " ] ";
    //---------------------------------------------------------------------------------------------------------
      var current_posY =parseInt(localStorage.getItem('posY'));
    
      if (isNaN(current_posY)) 
      {
          localStorage.setItem('posY',gameobjects[0].y);
          document.getElementById("posYText").innerHTML = " [ " + localStorage.getItem('posY') + " ] ";
        }
      
        gameobjects[0].y=parseInt(localStorage.getItem('posY')); 
        document.getElementById("posYText").innerHTML = " [ " + localStorage.getItem('posY') + " ] "

  
}

function onPageLoad()
{
    getPositionStorage();
}

function resetPosition()
{
    localStorage.setItem('posX',0); 
    gameobjects[0].x=0;
    localStorage.setItem('posY',0);
    gameobjects[0].y=0;
}
