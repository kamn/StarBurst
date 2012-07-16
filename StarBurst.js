/**
*
*
*
*/

/*===INIT===*/

//var camera, scene, renderer, geometry, material, mesh;
var mouse = {x:0,y:0};

/*===Functions===*/

/**
* The basic setup function for creating a new StarBurst object
*
*/
var StarBurst = function(JSONArr){
	this.camera = null;
	this.scene = null;
	this.renderer = null;
	this.geometry = null;
	this.material = null;
	this.mesh = null;
	this.mouse = {x:0,y:0};
	this.cameraMovement = {x:0,y:0,z:(Math.PI/2)};
	this.cameraPosDirection = {x:true,y:true,z:true};
	this.planeOn = true;
	this.planeWidth = 500;
	this.planeHeight = 500;
	this.numOfGrids = 10;
	this.planeColor = 0x555555;
	this.linesToStars = true;
	this.lineColor = 0x555555;
	this.lineWidth = 0.01;
	this.mouseDown = false;
	this.JSONArr = JSONArr;
	this.starFile = "star.png"
	this.offsetX = 0;
	this.offsetY = 0;
	this.offsetSpeedX = 0;
	this.offsetSpeedY = 0;
	this.mouse.x = 0;
	this.mouse.y = 0;
}

/**
* A function that when given the type of a star wil give back the color information for that star
* @param type A String with a letter for one of the starTypes
* @retrun
*/
StarBurst.prototype.getStarTypeColorData = function(type){
	//TODO: Implment

}


/**
* Will calculate the drag
* @param - 
* @return 
*
*/
StarBurst.prototype.onMouseDown = function(e){
	e.preventDefault();
	
	this.mouseDown = true;
	
	this.mouse.x = e.clientX;
	this.mouse.y = e.clientY;
	
}

/**
*
*
*/
StarBurst.prototype.onMouseMove = function(e){
	
	//
	if(this.mouseDown){
		
		//TODO: Figure out how to get the x and y of 
		var currMouseX = e.clientX;
		var currMouseY = e.clientY;
	
		//TODO: Figure out the center
		var centerX = currMouseX - (window.innerWidth/2);
		var centerY = currMouseY - (window.innerHeight/2);
	
		/*var offsetX = 0;
		var offsetY = 0;
		
		if(this.firstOnDown){
		
		}else{}*/
		//TODO: Figure out how to keep it in the same spot
		var offsetX = (currMouseX - this.mouse.x)/1000;
		var offsetY = (currMouseY - this.mouse.y)/1000;
		
		//DEV: See the offset by the mouse
		//console.log(offsetX+":"+offsetY);
		
		//Relocate the camera
		/*this.cameraMovement.x = offsetX;//((this.cameraMovement.x*200) - offsetX)/200;
		this.cameraMovement.y = offsetY;
		this.cameraMovement.z = (offsetX);//((this.cameraMovement.z*200) - offsetX)/200;*/
		
		this.cameraMovement.x += offsetX/20;
		this.cameraMovement.y += offsetY/20;
		this.cameraMovement.z += offsetX/20;
		
		
		/*if(this.cameraMovement.x > 0 && offsetX < 0){
			this.cameraMovement.x -= offsetX;
		}
		if(this.cameraMovement.y > 0 && offsetY < 0){
			this.cameraMovement.y -= offsetY;
		}
		if(this.cameraMovement.z > 0 && offsetX < 0){
			this.cameraMovement.z -= offsetX;
		}*/
		
		//
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}
}

/**
* This will be mainly to update the x and y mouse coordiates and not much else
* @param e - Event
*
*/
StarBurst.prototype.onMouseUp = function(e){
	e.preventDefault();
	
	//DEV: Just to check that the mouse is working
	//console.log("MOUSEUP");
	
	this.mouseDown = false;
	
	//TODO: 
	//Update this.mouse
	this.mouse.x = e.clientX;
	this.mouse.y = e.clientY;
	
}

//TODO: Have it take a parameter object
/**
* The basic initilization function for StarBrst
*
*/
StarBurst.prototype.init = function(){
	
	//Start the Three.Scene
	this.scene = new THREE.Scene();
	
	//TODO: Look at the documentation for the camera more
	//TODO: Have more options for this
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	
	//
	this.camera.position.z = 400;
	
	//Add camera
	this.scene.add(this.camera);
	
	//TODO: Have option for using a plane at all
	
	this.geometry = new THREE.PlaneGeometry(this.planeWidth, this.planeHeight, this.numOfGrids, this.numOfGrids);
	
	//TODO: Have more options
	var planeMaterial = new THREE.MeshBasicMaterial( { color: this.planeColor, wireframe: true } );
	
	var planeMesh = new THREE.Mesh(this.geometry,planeMaterial);
	
	planeMesh.doubleSided = true;
	//Add the plane to the scene
	this.scene.add(planeMesh);
    
    //Maybe use the example file 
    //TODO: Load from JSON file
    
    
    //TODO: Maybe there is a better name
    var starMaterial = null;
    
    //TODO: Rename star2.png
    //TODO: Have the location be an option
    var sprite = THREE.ImageUtils.loadTexture(this.starFile);
        
    var JSONArr = this.JSONArr;
    
    //TODO:
	for(i = 0;i < JSONArr.length;i++){
		
		var starData = JSONArr[i];
	
		//TODO: rename 'vertex' to 'starVertex'
		var vertex = new THREE.Vector3();
		this.geometry = new THREE.Geometry();
		
		vertex.x = starData.x;
		vertex.y = starData.y;
		vertex.z = starData.z;
		
		if(this.linesToStars){

    		var lineGeometry = new THREE.Geometry();
    		
    		//Due to the nature of the diffference between how we standardly think of...
    		//3D cooridinates and how WebGL uses it this is needed
    		//TODO: Add the correct points
    		lineGeometry.vertices.push(new THREE.Vector3(vertex.x,vertex.y,vertex.z));
    		lineGeometry.vertices.push(new THREE.Vector3(vertex.x,0,vertex.z));
    		
    		//TODO: Make some into variables
    		var lineMaterial = new THREE.LineBasicMaterial({color:0x555555, linewidth: 0.01});
    		var line = new THREE.Line(lineGeometry,lineMaterial);
    		this.scene.add(line);
    	
    	}
    	//The location the star will appear at
    	this.geometry.vertices.push(vertex);
    	
    	//TODO:
    	var size  = 10;
    	
    	//DEV: Figure out what the options are for ParticleBasciMaterial
    	//TODO: There should be a lot of Options here
    	starMaterial = new THREE.ParticleBasicMaterial({ size: size, 
			map: sprite,
			blending: THREE.AdditiveBlending,
			depthTest: false,
			//transparent: true,
			//vertexColors: true
		});
  	
    	//TODO: Put into a sort of ENUM or Object
    	var classM = 0.05;
    	var classK = 0.07;
    	var classG = 0.11;
    	var classF = 0.15;
    	var classA = 0.58;
    	var classB = 0.58;
    	var classO = 0.58;
    	
    	//Get the starType
    	var starType = starData.type;
    	
    	//TODO: I don't like this way of doing things...
    	if(starType == "M"){
			starMaterial.color.setHSV(classM, 1.0, 1.0);
		}else if(starType == "K"){
			starMaterial.color.setHSV(classK, 1.0, 1.0);
		}else if(starType == "G"){
			starMaterial.color.setHSV(classG, 1.0, 1.0);
		}else if(starType == "F"){
			starMaterial.color.setHSV(classF, 1.0, 1.0);
		}else if(starType == "A"){
			starMaterial.color.setHSV(classA, 1.0, 1.0);
		}else if(starType == "B"){
			starMaterial.color.setHSV(classB, 1.0, 1.0);
		}else if(starType == "O"){
			starMaterial.color.setHSV(classO, 1.0, 1.0);
		}
		
		//DEV: I am not sure how I feel about a particle system for everthing
		//DEV: It could slow things down a lot
		
		//TODO: Is there a better name for this?
		var particleStarSystem = new THREE.ParticleSystem(this.geometry,starMaterial);
		
		//Add to sceen
		this.scene.add(particleStarSystem);
		
    }
    
    //TODO: This needs to be an option Use WebGL or Canvas with options for each
    this.renderer = new THREE.WebGLRenderer({alpha:0});
    
    //TODO: These need to be options
    this.renderer.setSize(window.innerWidth,window.innerHeight);
    
    //TODO: option of speficiying a element to attach to...?
    //Attach to the body of the document
    document.body.appendChild(this.renderer.domElement);
    
    //TODO: Add as option
    //Attach listener(s)
	//document.attachListner();
	document.addEventListener('mousedown',this.onMouseDown.bind(this),false);
	document.addEventListener('mousemove',this.onMouseMove.bind(this),false);
	document.addEventListener('mouseup',this.onMouseUp.bind(this),false)

}	

/**
* Main render function for StarBurst.
*
*/
StarBurst.prototype.render = function(){

	//TODO: Also have these be options
	
	//
	/*var nextCameraX = this.camera.position.x + Math.sin(this.cameraMovement.x) * 400;
	var nextCameraY = this.camera.position.y + Math.sin(this.cameraMovement.y) * 400;
	var nextCameraZ = this.camera.position.z + Math.cos(this.cameraMovement.z) * 400;
	*/
	this.camera.position.x = Math.sin(this.cameraMovement.x) * 400;
	this.camera.position.y = Math.sin(this.cameraMovement.y) * 400;
	this.camera.position.z = Math.cos(this.cameraMovement.x) * 400;
	
	//console.log(this.cameraMovement.x+"-"+this.cameraMovement.y+"-"+this.cameraMovement.z);
	
	/*
	//The following are to help the camera move
	if(!this.cameraPosDirection.x){
		nextCameraX = this.camera.position.x + Math.sin(-this.cameraMovement.x) * 400;
	}
	if(!this.cameraPosDirection.y){
		nextCameraY = this.camera.position.y + Math.sin(-this.cameraMovement.y) * 400;
	}
	if(!this.cameraPosDirection.z){
		nextCameraZ = this.camera.position.z + (-Math.cos(this.cameraMovement.z)) * 400;
	}	
	
	//
	if(this.camera.position.y > 400 || this.camera.position.y < -400){
		if(this.cameraPosDirection.y){
			this.cameraPosDirection.y = false;
			nextCameraY = this.camera.position.y + Math.sin(-this.cameraMovement.y) * 400;
		}else{
			this.cameraPosDirection.y = true;
			nextCameraY = this.camera.position.y + Math.sin(this.cameraMovement.y) * 400;

		}
	
	}
	if(this.camera.position.x > 400 || this.camera.position.x < -400){
		console.log(this.cameraPosDirection.x);
		if(this.cameraPosDirection.x){
			this.cameraPosDirection.x = false;
			nextCameraX = this.camera.position.x + Math.sin(-this.cameraMovement.x) * 400;

		}else{
			this.cameraPosDirection.x = true;
			nextCameraX = this.camera.position.x + Math.sin(this.cameraMovement.x) * 400;
		}
	}
	
	if(this.camera.position.z > 400 || this.camera.position.z < -400){
		if(this.cameraPosDirection.z){
			this.cameraPosDirection.z = false;
			nextCameraZ = this.camera.position.z + (-Math.cos(this.cameraMovement.z)) * 400;

		}else{
			this.cameraPosDirection.z = true;
			nextCameraZ = this.camera.position.z + Math.cos(this.cameraMovement.z) * 400;
		}
	}*/
	this.cameraMovement.x += this.offsetX/20;
	this.cameraMovement.y +=  this.offsetY/20;
	this.cameraMovement.z +=  this.offsetX/20;
	
	/*//Next position of camera
	this.camera.position.x = nextCameraX;
	this.camera.position.y = nextCameraY;
	this.camera.position.z = nextCameraZ;*/
	
	//Adjust camera
	this.camera.lookAt(this.scene.position);

	//Render
	this.renderer.render(this.scene,this.camera);
}



/**
* The main animate function
*
*/
StarBurst.prototype.animate = function(){
	
	
	//The bind is needed to make sure that the animate function uses 'this'
	requestAnimationFrame(this.animate.bind(this));
	
	//Render scene
	this.render();
}