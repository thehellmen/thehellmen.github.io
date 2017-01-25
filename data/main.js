var sketchProc=function(processingInstance){ with (processingInstance){



setup = function() {
	//Setup
	var w = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
    	var h = window.innerHeight ||
                 document.documentElement.clientHeight ||
                 document.body.clientHeight;
	size(w*0.9,h*0.9);
	frameRate(60);
	
	
	test = loadImage("data/images/Bootleg2.png");
	
	displaypanel = function(img,x,y) {
		imageMode(CENTER);
		pushMatrix();
	
			translate(x,y);
			scale(0.001*height);
			image(img,0,0);
	
		popMatrix();
	};
	
};

setup();

draw = function() {
	background(55,55,55);	
	displaypanel(test,width/2,height/2);		
};

}};
