/*@pjs preload="data/images/logo1.png";*/

var sketchProc=function(processingInstance){ with (processingInstance){

//Setup
var wi = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth;
var he = window.innerHeight ||
         document.documentElement.clientHeight ||
         document.body.clientHeight;
size(wi*0.9,he*0.9);
frameRate(60);

setup = function() {
	mainfont = createFont("Times New Roman");
	logo = loadImage("data/images/logo1.png");
	
	keys = [];
	page = 0;
	chapter1 = [];
	
	m = false;
	md = false;
	bw = width/8;
	bh = width/16;
	prim = color(15,15,15);
	sec = color(100,30,30);
	tert = color(150,150,150);
	
	loadpanels = function(name,number,target) {
		for (i = 0; i < number; i ++) {
			target[i] = loadImage("data/images/panels"+name+i+".png");
		}
	};
	
	buttons = {
		start:{x:width*(3/4),y:height/2,w:bw,h:bh,text:"Enter"},
		next:{x:width*(3/4),y:height*(4/5),w:bw,h:bh,text:"Next"},
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
		bux = con.x
		buy = con.y
		buw = con.w
		buh = con.h
		butext = con.text
		con.pressed = false;
		
		if (mouseX>bux&&mouseX<bux+buw && mouseY>buy&&mouseY<buy+buh) {
			fill(prim);
		} else {
			fill(sec);			
		}
		stroke(prim);
		strokeWeight(buh/10);
		rect(bux,buy,buw,buh,buh/3);
		
		if (mouseX>bux&&mouseX<bux+buw && mouseY>buy&&mouseY<buy+buh) {
			fill(sec);
		} else {
			fill(prim);
		}
		textFont(mainfont,buh/2);
		textAlign(CENTER,CENTER);
		text(butext,bux+buw/2,buy+buh/2);
		
		
		if (mouseX>bux&&mouseX<bux+buw && mouseY>buy&&mouseY<buy+buh && m || mouseX>bux&&mouseX<bux+buw && mouseY>buy&&mouseY<buy+buh && mouseDragged)) {
			con.pressed = true;
		}
		return con.pressed;
	};
	
	loadpanels("chap1",0,chapter1);
	
	pages = [
		function() {
			background(55,55,55)

			displaypanel(logo,width/4,height/2)

			button(buttons.start)
			if (buttons.start.pressed==true) {
				page += 1
			}			
		},
		function() {
			background(55,55,55)
			
			button(buttons.next)
			if (buttons.next.pressed) {
				page += 1
			}
		},
		
	];
	
};

draw = function() {
	pages[page]();
	fill(0,0,0);
	text(m+" "+md,width/2,height/3);
};

keyPressed = function() {
	keys[keyCode] = true;
};
keyReleased = function() {
	keys[keyCode] = false;
};
mousePressed = function() {
	m = true;
};
mouseDragged = function() {
	md = true;
};
mouseReleased = function() {
	m = false;
	md = false;
};


}};
