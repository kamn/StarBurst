/**
Copyright 2012 Samuel Miller

   Licensed under the Apache License, Version 2.0 (the "License");
   you may not use this file except in compliance with the License.
   You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/

/**
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

	if(JSONArr == null || JSONArr == undefined){
		this.JSONArr = null;
	}else{
		this.JSONArr = JSONArr;
	}

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
* Will process the keypress
* @param e - An event from the keypress
* @return Nothing
*/
StarBurst.prototype.keyPressed = function(e){

	//TODO: Check to see if 's' was pressed to stop the rotation
	if(e.keyCode == 115 || e.keyCode == 83){
		this.offsetX = 0;
		this.offsetY = 0;
	}
	//TODO: Check to see if '-' or '+' was pressed to zoom in or out

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

	var tempX = (e.clientX / window.innerWidth ) * 2 - 1;
	var tempY = -(e.clientY / window.innerHeight ) * 2 + 1;
		
	//Was to help make the picking very exact
	//tempX -= 0.015;
	//tempY += 0.03;
	

	var projector = new THREE.Projector();
	var vector = new THREE.Vector3( tempX,  tempY, -1 );
	
	projector.unprojectVector( vector, this.camera );

	var ray = new THREE.Ray( this.camera.position, vector.subSelf( this.camera.position ).normalize() );
	
	var intersects = ray.intersectObjects( this.scene.children );

	if ( intersects.length > 0 ) {
        console.log("you clicked particle named '" + intersects[0].object.name + "' with id: " + intersects[0].object.id);
        INTERSECTED = intersects[ 0 ].object;
        
        if(intersects[0].object.name === "Plane" && intersects.length > 1){
        	INTERSECTED = intersects[ 1 ].object;
        }
        if(INTERSECTED.name !== "Plane"){

		
        	//TODO: Update div info


			//INTERSECTED.currentHex = INTERSECTED.material.emissive.getHex();
			INTERSECTED.material.color.setHex( 0xff0000 );
		}
	}
	
}

/**
*
* @param e -
* @return Nothing
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

		//TODO: Figure out how to keep it in the same spot
		var offsetX = (currMouseX - this.mouse.x)/1000;
		var offsetY = (currMouseY - this.mouse.y)/1000;
		
		this.cameraMovement.x += offsetX/20;
		this.cameraMovement.y += offsetY/20;
		this.cameraMovement.z += offsetX/20;
		
		//
		this.offsetX = offsetX;
		this.offsetY = offsetY;
	}
}

/**
* This will be mainly to update the x and y mouse coordiates and not much else
* @param e - Event
* @return Nothing
*/
StarBurst.prototype.onMouseUp = function(e){
	e.preventDefault();
	
	//DEV: Just to check that the mouse is working
	
	this.mouseDown = false;
	
	//TODO: 
	//Update this.mouse
	this.mouse.x = e.clientX;
	this.mouse.y = e.clientY;
	
}

/**
* Will load a JSON file of star data 
* @param file - A file to load
* @return a JSON Array
*/
StarBurst.prototype.loadJSON = function(file){
	

	$.getJSON(file,function(data){


	});
}

//TODO: Have it take a parameter object
/**
* The basic initilization function for StarBrst
* @return Nothing
*/
StarBurst.prototype.init = function(){
	container = document.createElement( 'div' );
	document.body.appendChild( container );

	starInfoDiv = document.createElement( 'div' );
	starInfoDiv.style.position = "absolute";
	starInfoDiv.style.top = "10px";
	starInfoDiv.className = "info";
	starInfoDiv.innerHTML = "<strong>Controls</strong><p>Click and drag to rotate</p><p>Click a star to turn it red</p><p>Press 's' to stop the rotation</p>";

	container.appendChild(starInfoDiv);

	//Start the Three.Scene
	this.scene = new THREE.Scene();
	
	//TODO: Look at the documentation for the camera more
	//TODO: Have more options for this
	this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
	
	//TODO: This should be a position
	this.camera.position.z = 400;
	
	this.scene.add(this.camera);
	
	//TODO: Have option for using a plane at all
	
	this.geometry = new THREE.PlaneGeometry(this.planeWidth, this.planeHeight, this.numOfGrids, this.numOfGrids);
	
	//TODO: Have more options
	var planeMaterial = new THREE.MeshBasicMaterial( { color: this.planeColor, wireframe: true } );
	
	var planeMesh = new THREE.Mesh(this.geometry,planeMaterial);
	
	planeMesh.doubleSided = true;
	planeMesh.name = 'Plane';

	//Add the plane to the scene
	this.scene.add(planeMesh);
    

    //
    var light = new THREE.DirectionalLight( 0xffffff, 2 );
	light.position.set( 1, 1, 1 ).normalize();
	this.scene.add( light );
    //Maybe use the example file 
    //TODO: Load from JSON file
    var light = new THREE.DirectionalLight( 0xffffff );
	light.position.set( -1, -1, -1 ).normalize();
	this.scene.add( light );
    
    //TODO: Maybe there is a better name
    var starMaterial = null;
    
    //TODO: Rename star2.png
    //TODO: Have the location be an option
    var sprite = THREE.ImageUtils.loadTexture(this.starFile);
        
    var JSONArr = this.JSONArr;
    
    var tempGeo = new THREE.Geometry();
    //TODO: Separete into function
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
    		
    		var newVertexY = vertex.y;

    		if(newVertexY > 0){
    			newVertexY -= 3;
    		}else{
    			newVertexY += 3;
    		}

    		//Due to the nature of the diffference between how we standardly think of...
    		//3D cooridinates and how WebGL uses it this is needed
    		//TODO: Add the correct points
    		lineGeometry.vertices.push(new THREE.Vector3(vertex.x,newVertexY,vertex.z));
    		lineGeometry.vertices.push(new THREE.Vector3(vertex.x,0,vertex.z));
    		

    		//TODO: Make some into variables
    		var lineMaterial = new THREE.LineBasicMaterial({color:0x555555, linewidth: 0.01});
    		var line = new THREE.Line(lineGeometry,lineMaterial);
    		this.scene.add(line);
    	
    	}

    	//The location the star will appear at
    	this.geometry.vertices.push(vertex);
    	tempGeo.vertices.push(vertex);

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
    	var classM = 0xFF4719;
    	var classK = 0xFFCC00;
    	var classG = 0xE6E600;
    	var classF = 0xF1F1FF;
    	var classA = 0xBDCEFF;
    	var classB = 0xA6BBFF;
    	var classO = 0x9DB4FF;
    	
    	//Get the starType
    	var starType = starData.type;

    	//A default color
    	var starColor = 0xffffff;

    	
    	//TODO: I don't like this way of doing things...
    	if(starType == "M"){
			//starMaterial.color.setHSV(classM, 1.0, 1.0);
			starColor = classM;
		}else if(starType == "K"){
			//starMaterial.color.setHSV(classK, 1.0, 1.0);
			starColor = classK;
		}else if(starType == "G"){
			//starMaterial.color.setHSV(classG, 1.0, 1.0);
			starColor = classG;
		}else if(starType == "F"){
			//starMaterial.color.setHSV(classF, 1.0, 1.0);
			starColor = classF;
		}else if(starType == "A"){
			//starMaterial.color.setHSV(classA, 1.0, 1.0);
			starColor = classA;
		}else if(starType == "B"){
			//starMaterial.color.setHSV(classB, 1.0, 1.0);
			starColor = classB;
		}else if(starType == "O"){
			//starMaterial.color.setHSV(classO, 1.0, 1.0);
			starColor = classO;
		}
		
		//DEV: I am not sure how I feel about a particle system for everthing
		//DEV: It could slow things down a lot
		
		//TODO: Is there a better name for this?
		//var particleStarSystem = new THREE.ParticleSystem(this.geometry,starMaterial);
		var sphereGeo = new THREE.SphereGeometry( 3, 8, 8 );
		var sphere = new THREE.Mesh( sphereGeo, new THREE.MeshBasicMaterial( { color: starColor } ) );
		sphere.position.x = starData.x;
		sphere.position.y = starData.y;
		sphere.position.z = starData.z;
		//Add to sceen
		//this.scene.add(particleStarSystem);
		this.scene.add(sphere);
		
    }
    //var particleStarSystem = new THREE.ParticleSystem(tempGeo,starMaterial);
		
	//Add to sceen
	//this.scene.add(particleStarSystem);

    
    //TODO: This needs to be an option Use WebGL or Canvas with options for each
    this.renderer = new THREE.WebGLRenderer({alpha:0});
    
    //TODO: These need to be options
    this.renderer.setSize(window.innerWidth,window.innerHeight);
    
    //TODO: option of speficiying a element to attach to...?
    //Attach to the body of the document
    container.appendChild(this.renderer.domElement);
    
    //TODO: Add as option
    //Attach listener(s)
	document.addEventListener('mousedown',this.onMouseDown.bind(this),false);
	document.addEventListener('mousemove',this.onMouseMove.bind(this),false);
	document.addEventListener('mouseup',this.onMouseUp.bind(this),false);
	document.addEventListener('keypress',this.keyPressed.bind(this),false);


}	

/**
* Will make the stars from the Json Data once it is loaded
* @return Nothing
*/
StarBurst.prototype.constructFromJSONArr = function(){

	if(this.JSONLoaded === true){


	}else{

		//TODO: Call this after an interval
		//setTimeout();
	}

};

/**
* Main render function for StarBurst.
* @return Nothing
*/
StarBurst.prototype.render = function(){

	
	//Setting up of rpicking
	
	//TODO: Also have these be options
	
	//
	this.camera.position.x = Math.sin(this.cameraMovement.x) * 400;
	this.camera.position.y = Math.sin(this.cameraMovement.y) * 400;
	this.camera.position.z = Math.cos(this.cameraMovement.x) * 400;
	
	//console.log(this.cameraMovement.x+"-"+this.cameraMovement.y+"-"+this.cameraMovement.z);
	
	this.cameraMovement.x += this.offsetX/20;
	this.cameraMovement.y +=  this.offsetY/20;
	this.cameraMovement.z +=  this.offsetX/20;
	
	//Adjust camera
	this.camera.lookAt(this.scene.position);

	//Render
	this.renderer.render(this.scene,this.camera);
}



/**
* The main animate function
* @return
*/
StarBurst.prototype.animate = function(){
	
	
	//The bind is needed to make sure that the animate function uses 'this'
	requestAnimationFrame(this.animate.bind(this));
	
	//Render scene
	this.render();
}