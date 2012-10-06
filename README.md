StarBurst
=========

![StarBurst]
(http://i.imgur.com/iPtIW.png "StarBurst")

The purpose for StarBurst is a javascript plugin for the static rendering of stars in a 3D view. I hope some people will find it useful to gain a greater understanding of our little section of the Universe.

Please note this is a prototype version. I hope to add more options and to expand it into other uses in the future.

Requirements
-----------

In order to run properly you need to include THREE.js and JQuery. 


Setup
-----

It would be a good idea to minimize the StarBurst.js file but of course not required at all.

Make sure include the star.png file in correct directory

The basic use is shown by the following...

$(document).ready(function(){
SB = new StarBurst(JSONArr);
SB.init();
SB.animate();
});

You can see an example in /example though because of cross-policy issues with most browsers the stars will not render properly.

How To Use
----------

It is based as a javascript plugin so it is fairly simple to use.

Currently you jsut need to include the style.css 


Options
-------

The following format will help you wil understanding what
	Property - (default) Other options


Milestones
----------
	
This is a incomplete and evolving list
	
	The current version is v0.2
	
v0.1
	* (Done)Better and smoother camera managment.

v0.2
	* (Done)Stop spinning feature
	* (Done)Pick a star 
	* (Done)Controls Panel

v0.3
	* (Done)Zoom features
	* Focus on star
	* Make stars glowy
	* Star select 'halo'(or keep it red)
	
v0.4
	* Star Info(Name, Star type, and distance to Sol)
	* Option's menu
		* Enable/Disable Grid
		* Enable/Disable Lines to stars
		* Enable/Disable Star Info
	* Point to Galatic Center

v0.5
	* Dynamically adding stars
	* Background

v0.6
	* Dynamically adding stars
	* Background
	* JSON file loading





