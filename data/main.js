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
	ismobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
	
	keys = [];
	pages = [];
	page = 0;
	
	chapter1 = [];
	chapter1pages = [];
	chapter1length = 8;
	//Make this 1 more than total number of images.
	
	chapter2 = [];
	chapter2pages = [];
	
	m = false;
	md = false;
	flevel = 255;
	bw = width/6;
	bh = width/12;
	prim = color(15,15,15);
	sec = color(130,60,60);
	tert = color(150,150,150);
	backg = color(75,75,75);
	
	// Standard fade in.
	fade = function() {
		flevel -= 10;
		fill(55,55,55,flevel);
		noStroke();
		rectMode(CORNER);
		rect(-1,-1,width+1,height+1);
	};
	
	// Loads all panels in the named folder into the target array.
	loadpanels = function(name,number,target) {
		for (i = 0; i < number;) {
			target[i] = loadImage("data/images/panels/"+name+i+".png");
			i ++;
		}
	};
	loadpanels("chap1/",chapter1length,chapter1);
	
	// The array of data for buttons used.
	buttons = {
		start:{x:width*(3/4),y:height/2,w:bw,h:bh,text:"Enter"},
		next:{x:width*(8/9),y:height*(1/2),w:bw,h:bh,text:"Next"},
		prev:{x:width*(1/9),y:height*(1/2),w:bw,h:bh,text:"Previous"},
		construction:{x:width/2,y:height*3/4,w:bw,h:bh,text:"Back"},
	};
	
	// The hefty button function.  Works on all platforms tested.  Needs an exterior click call.
	button = function(con) {
		bux = con.x
		buy = con.y
		buw = con.w
		buh = con.h
		butext = con.text
		con.pressed = false;
		mouseover = false;
		
		rectMode(CENTER);
		
		if (mouseX>bux-buw/2&&mouseX<bux+buw/2 && mouseY>buy-buh/2&&mouseY<buy+buh/2) {
			mouseover = true;
		}
		
		if (mouseover) {
			fill(prim);
		} else {
			fill(sec);			
		}
		stroke(prim);
		strokeWeight(buh/10);
		rect(bux,buy,buw,buh,buh/2.5);
		
		if (mouseover) {
			fill(sec);
		} else {
			fill(prim);
		}
		textFont(mainfont,buh/2);
		if (ismobile) {
			textSize(buh/3);
		}
		textAlign(CENTER,CENTER);
		text(butext,bux,buy);
		
		if (ismobile && mouseover) {		  
			con.pressed = true;
			return con.pressed;
		}
		
		if (mouseover && m) {
			con.pressed = true;
			return con.pressed;
		}
		return con.pressed;
	};
	
	// Standard button layout
	standardbuttons = function() {
		textSize(bh/2);
		fill(prim);
		text("Page "+page+"/"+chapter1length-1,buttons.next.x,buttons.next.y/2);
		button(buttons.next);
		if (buttons.next.pressed) {
			if (ismobile) {
				if (flevel < 0) {
					page += 1;
					flevel = 255;
				}
			} else if (flevel < 180) {
				page += 1;
				flevel = 255;
			}
		};
		
		button(buttons.prev);
		if (buttons.prev.pressed) {			
			if (ismobile) {
				if (flevel < 0) {
					page -= 1;
					flevel = 255;
				}
			} else if (flevel < 180) {
				page -= 1;
				flevel = 255;
			}
				
				
		};
	};

	// Displays an image properly.
	displaypanel = function(img,x,y) {
		imageMode(CENTER);
		pushMatrix();
		translate(x,y);
		scale(0.001*height,0.001*height);
			image(img,0,0);
		popMatrix();
	};
	
	// Creates a full page
	displaypage = function(chap,number) {
		background(backg);		
		displaypanel(chap[number],width/2,height/2);
		standardbuttons();
		fade();
	};
	// Loads an array with full pages
	loadpages = function(cha,targ) {
		for (i = 0; i < cha.length; i ++) {
			targ.push(function() {displaypage(chapter1,page-1)});
		};
		targ[cha.length] = function() {
			background(backg);
			textSize(height/5);
			fill(prim);
			text("Under Construction",width/2,height/2);
			button(buttons.construction);
			if (buttons.construction.pressed) {
				page -= 1;
			}
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
		
		
	];
	loadpages(chapter1,pages);
};
	
draw = function() {
	pages[page]();
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
}};
