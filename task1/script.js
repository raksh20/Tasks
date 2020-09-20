function shuffle(arr1)
{
  var len=arr1.length,index,temp;
  while(len>0)
  {
    index=Math.floor(Math.random()*len)+1;
    len--;
    temp=arr1[len];
    arr1[len]=arr1[index];
    arr1[index]=temp;
   }
   return(arr1);
}   
var arr=[];
for(i=1;i<=20;i++)
{
  arr.push(i);
}
var arr2=shuffle(arr);
var arr3=[];
for(j=21;j<=40;j++){
	arr3.push(j)
}



var currnum=1;
var midnum=20;
var lastnum=40;
var num=0;
function clicking(x){
	if(x==currnum){
		for(k=19;k>=num;k--){
			var cell;
			cell=arr3[k];	
		}
		document.getElementById(x).innerHTML=cell;
		document.getElementById(x).id=cell;
		num++;
		currnum++;
	}
	else if(document.getElementById(x+20).id==currnum){

		if(x+20==currnum){
			document.getElementById(x+20).innerHTML="";
			currnum++;
		}
		if(document.getElementById(x+20).id==40){
			stop();
			function stop(){
	        	status = 0;
	        	startBtn.disabled = true;
	    	}
	    	dispscore();
	    	function dispscore(){
				var finaltime=document.getElementById("timerLabel").innerHTML;
				document.getElementById("score").innerHTML= "Your time is "+finaltime;
				best=finaltime;
	
				for(var i=n; i<5; i++){
					score[i]=finaltime;
					n++;
					break;
		
				}
			localStorage.setItem('score', JSON.stringify(score));
			sortarr();
			document.getElementById("besttime").innerHTML= ''+best+'<br>';
	
	
			}
	    }
	}
	
}

var score=[];
var n=0;
var best=score[0];
function sortarr(){
	//var min=score[0];
	for(var i=0;i<score.length;i++){
		if(score[i]<best){
			best=score[i];
		}
	}
}

function makegrid(){
	for(var i=0; i<20; i++){
		var cellno;
		cellno = arr2[i];
		
		document.getElementById('grid').innerHTML+='<div class="griditem" id="'+cellno+'" onclick=clicking('+cellno+')>'+cellno+'</div>';

	}
}

function cleargrid(){
	
  	var element = document.getElementById("grid");
	while (element.firstChild) {
  	element.removeChild(element.firstChild);
	}

}

var status = 0; // 0:stop 1:running
var time = 0;
var startBtn = document.getElementById("startBtn");
var timerLabel = document.getElementById('timerLabel');

function start(){
    status = 1;
    startBtn.disabled = true;
    timer();
}


function reset(){
    status = 0;
    time = 0;
    timerLabel.innerHTML = '00.00';
    startBtn.disabled = false;
    currnum=1;
		num=0;
}

function timer(){
    if (status == 1) {
        setTimeout(function() {
            time++;
            var sec = Math.floor(time/100);
            var mSec = time % 100;

            
            if (sec < 10) sec = "0" + sec;

            if (mSec < 10) mSec = "0" + mSec;

            timerLabel.innerHTML = sec + "." + mSec;

            timer();

            
        }, 10);

    }

}

 
function goscore(){
  document.getElementById("score").innerHTML= "";
}
