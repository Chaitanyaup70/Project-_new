sound="";

r_wrist_x=0;
l_wrist_x=0;
r_wrist_y=0;
l_wrist_y=0;
sc_rwrist=0;
sc_lwrist=0;
function preload(){
  sound=loadSound("song.mp3");
}
function setup(){
    canvas=createCanvas(600,475);
    canvas.position(400,171);
    camera=createCapture(VIDEO);
    camera.hide()
   poseNet=ml5.poseNet(camera,modeloaded)
   poseNet.on('pose',got_poses)
    
}
function draw(){
   image(camera,0,0,600,475);

   fill("white");
   stroke("black");

if(sc_rwrist>0){
    circle(r_wrist_x,r_wrist_y,20);
    if(r_wrist_y>0 && r_wrist_y<=100){
        document.getElementById("spe").innerHTML="The speed is 2.5x";
        sound.rate(2.5);
    }
    else if(r_wrist_y>100 && r_wrist_y<=200){
        document.getElementById("spe").innerHTML="The speed is 2x";
        sound.rate(2);
    }
    else if(r_wrist_y>200 && r_wrist_y<=300){
        document.getElementById("spe").innerHTML="The speed is 1.5x";
        sound.rate(1.5);
    }
    else if(r_wrist_y>300 && r_wrist_y<=400){
        document.getElementById("spe").innerHTML="The speed is 1x";
        sound.rate(1);
    }
    else if(r_wrist_y>400 ){
        document.getElementById("spe").innerHTML="The speed is 0.5x";
        sound.rate(0.5);
    }
}
if(sc_lwrist>0){
    circle(l_wrist_x,l_wrist_y,20);
    num=Number(l_wrist_y);
    r_deci=Math.floor(num);
    volu=r_deci/475;
    vol2=Math.floor(volu);
    document.getElementById("vol").innerHTML="The volume is "+vol2;
    sound.setVolume(volu);
}

}
function modeloaded(){
console.log("model loaded");



}

function got_poses(result){
    if(result.length>=0){
        r_wrist_x=result[0].pose.rightWrist.x;
        l_wrist_x=result[0].pose.leftWrist.x;
        r_wrist_y=result[0].pose.rightWrist.y;
        l_wrist_y=result[0].pose.leftWrist.y;

        sc_lwrist=result[0].pose.keypoints[9].score;
        sc_rwrist=result[0].pose.keypoints[10].score;
    }
    else{
        console.log("Error");
    }
}

function play(){
    sound.play();
    sound.setVolume(1);
    sound.rate(1);
}


