var dog,dogImg,happyDog,happyDogImg,database,foodS,foodStock;
var gameState = 1;
var fedTime,lastFed;
var food;
var feedPet,addFood;
var puppyName,submitName;
var foodObj;
var updateName,namy;
var puppy;

function preload()
{
  dogImg = loadImage("dogImg.png");
  happyDogImg = loadImage("dogImg1.png")
  milkImg = loadImage("Milk.png");
}

function setup() {
  createCanvas(900, 500);
  
  database = firebase.database();
  console.log(database);
  
  foodStock = database.ref('food');
 foodStock.on("value",readStock);

  dog = createSprite(750,250,10,10)
  dog.addImage(dogImg)
  dog.scale = 0.2;

  feedPet = createButton("Feed the dog")
  feedPet.position(550,100)
  feedPet.mousePressed(feedDog)

  addFood = createButton("Add Food")
  addFood.position(400,100);
  addFood.mousePressed(addFoods)

  puppyName = createInput("");
  puppyName.position(700,400);

  submitName = createButton("Set Name");
  submitName.position(750,450);
  submitName.mousePressed(function(){
    submitName.hide();
    puppyName.hide();

    puppy = puppyName.value();

    database.ref('/').update({
      name: puppy
    })
  })

  foodObj = new Food();

  fedTime = database.ref('LastFeed');
  fedTime.on("value",function(data){
    lastFed=data.val();
  })

  
  
  updateName = database.ref('name');
  
  updateName.on("value",function(data){
    namy=data.val();
  })

}




function draw() {  
background(46,139,87)
fill("white")
textSize(15)
text(namy,720,360);

  

  console.log(foodS)

  if(foodS>0){
    foodObj.display();
  }


 
  drawSprites();
  if(lastFed>=12){
    textSize(15)
    text("Last Feed : "+lastFed%12+"PM",230,60)
  }else if(lastFed===0){
    text("Last Feed : 12 AM",230,60)
  }else{
    text("Last Feed : "+lastFed+"AM",230,60)
  }

}

function feedDog(){
  dog.addImage(happyDogImg)
 database.ref('/').update({
   food:foodS-1
 })

 foodObj.updateFoodStock(foodObj.getFoodStock()-1)
 database.ref('/').update({
   food:foodObj.getFoodStock(),
   LastFeed:hour()
 })
  

 if(lastFed>=12){
  text("Last Feed : "+lastFed%12+"PM",350,50)
}else if(lastFed===0){
  text("Last Feed : 12 AM",350,50)
}else{
  text("Last Feed : "+lastFed+"AM",350,30)
}
}

function addFoods(){
  foodS++
  database.ref('/').update({
    food:foodS 
  })
}

function readStock(data){
  foodS = data.val();
}

