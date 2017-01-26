/*@pjs preload="data/images/logo1.png";*/

var sketchProc=function(processingInstance){ with (processingInstance){

var mainfont = createFont("monospace");
test = loadImage("data/images/logo1.png");

setup = function() {
	//Setup
	var wi = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
    	var he = window.innerHeight ||
                 document.documentElement.clientHeight ||
                 document.body.clientHeight;
	size(wi*0.9,he*0.9);
	frameRate(60);
	
	
	keys = [];
	
	bw = width/8;
	bh = width/16;
	prim = color(15,15,15);
	sec = color(100,30,30);
	tert = color(150,150,150);
	
	buttons = {
		start:{x:width*(3/4),y:height/2,w:bw,h:bh,text:"Start"},
	};
	
	displaypanel = function(img,x,y) {
		imageMode(CENTER);
		pushMatrix();
		translate(x,y);
		scale(0.001*height,0.001*height);
			image(img,0,0);
		popMatrix();
	};
	
	button = function(con) {
		x = con.x
		y = con.y
		w = con.w
		h = con.h
		text = con.text
		
		fill(sec);
		stroke(prim);
		strokeWeight(3);
		rect(x,y,w,h,15);
		
		fill(0,0,0);
		textFont(mainfont,10);
		textAlign(CENTER,CENTER);
		text(text,x,y);
		
		
		if (mouseX>x&&mouseX<x+w && mouseY>y&&mouseY<y+h) {
			
		}
	};
	
};

setup();

draw = function() {
mouseIsPressed = false;
	background(55,55,55);

	displaypanel(test,width/4,height/2);
	
	button(buttons.start);	
	
	fill(255,0,0);
	textFont(mainfont,30);
	textAlign(CENTER,CENTER);
	text("test",0,0);
};

keyPressed = function() {
	keys[keyCode] = true;
};
keyReleased = function() {
	keys[keyCode] = false;
};
mousePressed = function() {
	mouseIsPressed = true;
};
mouseReleased = function() {
	mouseIsPressed = false;
};

}};
