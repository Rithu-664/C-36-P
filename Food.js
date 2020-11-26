class Food{
        constructor(){
            
        }
        
        getFoodStock(){
            var getStock = database.ref('food');
            getStock.on("value",function(data){food = data.val()})
            return food;
        }

        updateFoodStock(y){
            database.ref('/').update({
                food: y
            })
        }

        detuctFood(x){
            if(x<=0&&feedPet.mousePressed()){
                x=0;
                gameState=0;
              }else{
                x=x-1;
              }
              database.ref('/').update({
                food:x
              })
        }

        display(){
            imageMode(CENTER);
            image(milkImg,660,240,70,70);

            var x =0;
            var y=200;

            if(foodS!==0){
                for(var i=0; i<foodS; i++){
                    if(i%10===0){
                        x=80;
                        y=y+50;
                    }
                    image(milkImg,x,y,50,50);
                    x=x+30;
                }

            
            }
        }
}