var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
canvas.style.backgroundColor = "black";

var bx=250;
var by=350;
var gravity=1.5;
var score=0;
var angle = 0;

var bounce = new Audio();

bounce.src="sounds/bounce.mp3";

document.getElementById("btn").addEventListener("click",moveUp);

function moveUp(){
	by-=70;
	bounce.play();
}

var obstacles = [];
obstacles[0]={
	x: 250,
	y:0
}

var circle=[];
circle[0]={
	color: "blue"
}
var color = ['blue','yellow'];

function incrementAngle() {
                angle++;
                if(angle > 360) {
                    angle = 0;
                }
            } 

function convertToRadians(degree) {
                return degree*(Math.PI/180);
            }

function draw(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	 incrementAngle();
	
	//ctx.save();
	for(var i=0;i<obstacles.length;i++){
		for(var j=0;j<2;j++){
			var z=j*Math.PI;
		
		ctx.beginPath();
		ctx.save();
    	ctx.translate(obstacles[i].x, obstacles[i].y); 
    	// console.log(this.x)       
    	//ctx.rotate(2*Math.PI/180);
    	ctx.rotate(convertToRadians(angle));
    	ctx.translate(-obstacles[i].x, -obstacles[i].y);
    	ctx.strokeStyle=color[j];
    	obstacles[i].colour=color[j];
    	console.log(obstacles[i].colour);
    	//c.push(color[j]);
	    //ctx.fillStyle = color[j];
	    ctx.arc(obstacles[i].x, obstacles[i].y,50, z,z+Math.PI ,true);
	    ctx.lineWidth=10;
	    ctx.stroke();
	     //console.log(ctx.strokeStyle);
	    //ctx.closePath();  
	    ctx.restore();
	};
	var c=[];
	  
	//console.log(ctx.fillStyle);
	//console.log(ctx.strokeStyle);
	//console.log(obstacles[i]);
	    obstacles[i].y++;
	    if(obstacles[i].y==350){
	    	obstacles.push({
				x: 250,
				y:0
			});

	    }
	    if(by==obstacles[i].y+50){
	    	if(obstacles.colour!="blue"){



	    	location.reload();
	    	}
	    }

	    if(by+40>=canvas.height || by<=0 ){
	    	location.reload();
	    }
	    if(obstacles[i].y==350){
	    	score++;
	    }
	}
	ctx.beginPath();
	ctx.arc(bx,by,10,0,2*Math.PI,false);
	ctx.fillStyle = "blue";
	ctx.fill();

	ctx.closePath();
	by+=gravity;
	 ctx.textAlign = 'left';
	 ctx.font = "30px Arial";
    ctx.fillText(score,10,30);
    //localStorage.setItem('score', score);
    if(localStorage.getItem(score)<score){
    	localStorage.setItem('score', score);
    }
	
	requestAnimationFrame(draw);
}
draw();