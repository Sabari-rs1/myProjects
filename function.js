
$(document).on("mousemove",function (e) { 
  basket.css("left",e.pageX);
}); 





function egg_down(egg){
  egg_current_position=parseInt(egg.css("top"));
  egg.css("top",egg_current_position+ speed);
}



 function check_if_egg_hits_ground(egg)
 {
   if(collision(egg,floor))
   {
    show_bullseye(egg);
    life--;
     return true;
   }
   return false;
 }


 function return_to_default(egg)
 {
   egg.css("top",egg_initial_position);
 }




 function show_bullseye(egg)
 {
    bullseye_num=egg.attr("data-bullseye");
    $("#bullseye"+bullseye_num).show();
    hide_bullseye(egg); 

 }    




 function hide_bullseye(egg)
 {
   setTimeout(function(){
    $("#bullseye"+bullseye_num).hide();
   },300);
 }




 function check_if_egg_hits_basket(egg)
 {
    if(collision(egg,basket))
    {
      if(egg_top<basket_top)
      {
      increment_score();
      return true;
      }
    }
    return false;
 }



 function increment_score()
 {
   score++;
   if (score % 10 === 0 && speed <= max_speed) {
    speed++;
   }
   $("#score").text(score);
 }





function stop_the_game()
{
  cancelAnimationFrame(anim_id);
  intro();
}








function intro()
{
  count=0;
  container.css("opacity",0); 
  difficulty_menu.css("display","block");
  difficulty_menu.css("opacity",1); 
}





function easy()
{
  if(count==0)
  {
    speed=1.3;
    reset();
    count++;
  }
  else
  {
    speed=1.5;
    reset();
  }
  
}



function medium()
{
  if(count==0)
  {
    speed=1.9;
    reset();
    count++;
  }
  else
  {
    speed=3.1;
    reset();
  }
  
}



function hard()
{
  if(count==0)
  {
    speed=2;
    reset();
    count++;
  }
  else
  {
    speed=4;
    reset();
  }
  
}





function reset()
{
  score=0;
  $("#score").text(score);
  life=1;
  difficulty_menu.hide();
  return_to_default(egg1);
  return_to_default(egg2);
  return_to_default(egg3);

  container.css("opacity",1);
  requestAnimationFrame(the_game);
}







function generate_egg()
{
  return(Math.floor((Math.random()*3)+1));
}