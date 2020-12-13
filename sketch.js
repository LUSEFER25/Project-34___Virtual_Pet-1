//Create variables here

var dogImg, happyDogImg;
var database;
var foodS =100, foodStock;

function preload()
{
  //load images here
  
  dogImg = loadImage('images/dogImg.png')
  happyDogImg = loadImage('images/dogImg1.png')
}

function setup() {
  createCanvas(500, 500);
  database = firebase.database();
  
  dog = createSprite(250,250,5,5);
  dog.addImage(dogImg);
  dog.scale = 0.11

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  


  background(46,139,87);

    if(keyWentDown(ENTER) && foodS >= 1)
    {
      writeStock(foodS);
      happyDog = createSprite(250,250,50,50);
      happyDog.addImage("happyDog",happyDogImg);
      happyDog.scale=0.11;


      dog.visible = false;
      
    }


    if(keyWentUp(ENTER))
    {
      dog.visible = true;
      happyDog.visible = false;
    }


    if(foodS == 0)
    {
      dog.visible = true;
      foodS = 100;
    }


  textSize(25);
  stroke("black");
  fill("black");
  text("Press Enter To Feed Drago Milk!", 75,25);
  text("Food Remaining:"+ foodS, 150,200);

  drawSprites();
  //add styles here


  

}


function readStock(data)
{
  foodS = data.val();
}


function writeStock(x)
{

  if(x <= 0)
  {
    x = 0;
  }
  else
  {
    x = x-1;
  }

  database.ref('/').update({
    Food:x
  })
}




