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
	isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	
	keys = [];
	page = 0;
	chapter1 = [];
	
	m = false;
	md = false;
	flevel = 255;
	bw = width/6;
	bh = width/12;
	prim = color(15,15,15);
	sec = color(100,30,30);
	tert = color(150,150,150);
	backg = color(55,55,55);
	
	fade = function() {
		flevel -= 10;
		fill(55,55,55,flevel);
		noStroke();
		rectMode(CORNER);
		rect(-1,-1,width+1,height+1);
	};
	
	loadpanels = function(name,number,target) {
		for (i = 0; i < number;) {
			target[i] = loadImage("data/images/panels/"+name+i+".png");
			i ++;
		}
	};
	
	buttons = {
		start:{x:width*(3/4),y:height/2,w:bw,h:bh,text:"Enter"},
		next:{x:width*(8/9),y:height*(1/2),w:bw,h:bh,text:"Next"},
		prev:{x:width*(1/9),y:height*(1/2),w:bw,h:bh,text:"Previous"},
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
		
		rectMode(CENTER);
		
		if (mouseX>bux-buw/2&&mouseX<bux+buw/2 && mouseY>buy-buh/2&&mouseY<buy+buh/2) {
			fill(prim);
		} else {
			fill(sec);			
		}
		stroke(prim);
		strokeWeight(buh/10);
		rect(bux,buy,buw,buh,buh/3);
		
		if (mouseX>bux-buw/2&&mouseX<bux+buw/2 && mouseY>buy-buh/2&&mouseY<buy+buh/2) {
			fill(sec);
		} else {
			fill(prim);
		}
		textFont(mainfont,buh/2);
		textAlign(CENTER,CENTER);
		text(butext,bux,buy);
		
		
		if (isMobile && (mouseX>bux-buw/2&&mouseX<bux+buw/2 && mouseY>buy-buh/2&&mouseY<buy+buh/2)) {		  
			con.pressed = true;
			return con.pressed;
		}
		
		if (mouseX>bux-buw/2&&mouseX<bux+buw/2 && mouseY>buy-buh/2&&mouseY<buy+buh/2 && m) {
			con.pressed = true;
			return con.pressed;
		}
		return con.pressed;
	};
	
	loadpanels("chap1/",1,chapter1);
	standardbuttons = function() {
		button(buttons.next);
		if (buttons.next.pressed) {
			page += 1;
			flevel = 255;
		};
		
		button(buttons.prev);
		if (buttons.prev.pressed) {
			page -= 1;
			flevel = 255;
		};
	};
	
	pages = [
		function() {
			background(backg)

			displaypanel(logo,width/4,height/2)

			button(buttons.start)
			if (buttons.start.pressed==true) {
				page += 1
			}
		},
		function() {
			background(backg)
			
			displaypanel(chapter1[0],width/2,height/2);
			
			standardbuttons();
			
			fade();
		},
		
	];
	
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
mouseReleased = function() {
	m = false;
};

draw = function() {
	pages[page]();
	fill(0,0,0);
	text(mouseX+", "+mouseY,width/2,height/2);
};

}};
