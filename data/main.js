var sketchProc=function(processingInstance){ with (processingInstance){

setup = function() {
	var w = window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
    	var h = window.innerHeight ||
                 document.documentElement.clientHeight ||
                 document.body.clientHeight;
	size(w,h);
	frameRate(60);
};

draw = function() {
	background(255,255,255);
};

}};
