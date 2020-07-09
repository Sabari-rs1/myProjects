

var $details = $("#right-options"),
    detailsPos = $details.position().top;

$(window).on("scroll", function() {
    if ($(window).scrollTop() > detailsPos)
        $details.css("position", "fixed").css("top",50);
    else if ($(window).scrollTop() < detailsPos)
        $details.css("position", "static").css("top",0);
        

});



var $details1 = $(".nav"),
    detailsPos1 = $details1.position().top;

$(window).on("scroll", function() {
    
    if ($(window).scrollTop() > detailsPos1)
        $details1.css("position", "fixed").css("top",0).css("box-shadow","0px 2px 2px -2px rgba(0,0,0,0.50");
    else if ($(window).scrollTop() < detailsPos1)
        $details1.css("position", "absolute").css("box-shadow","none").css("top",50);
        

});

