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

Currently you need to include the star.png in the same directory as the StarBurst.js or specify where to get it


Options
-------

The following format will help you wil understanding what
	Property - (default) Other options


Milestones
----------
	
This is a incomplete list
	
	The current version is v0.1 and is just a prototype.
	
v0.1
	- (Done)Better and smoother camera managment.
v0.2
	- JSON file loading
	- Maybe create a node.js basic website(Just for easy of use)
v0.3
	- Zoom features.
	- Pick a star and focus on star
	- (Done)Controls
v0.4
	- Star Info
	- Dynamically adding stars





