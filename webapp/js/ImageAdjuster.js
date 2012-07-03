/*
Copyright 2011 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global FormData, jQuery, fluid*/

// JSLint options
/*jslint white: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */


var fluid = fluid || {};

(function ($, fluid) {	
  
	fluid.defaults("fluid.imageAdjuster", {
      selectors : {
          'container' : '#flc-image-adjuster-container',
          'canvas' : '#flc-image-adjuster-canvas',
          'brightnessTab' : '#flc-image-adjuster-brightness',
          'rotateTab' : '#flc-image-adjuster-rotate',
          'thresholdTab' : '#flc-image-adjuster-threshold',
          'brightnessMenu' : '#flc-image-adjuster-brightness-controls',
          'rotateMenu' : '#flc-image-adjuster-rotate-controls',
          'thresholdMenu' : '#flc-image-adjuster-threshold-controls'
      }
    }
  );
	
	//creator function
	fluid.imageAdjuster = function(container, options) {
		var that = fluid.initView("fluid.imageAdjuster", container, options);	
		fluid.imageAdjuster.loadCanvas();
	
		$('flc-image-adjuster-rotate').click(function (el, ev) {
   		console.log('clicked');
		});
}
	
	fluid.imageAdjuster.adjustments = { 
		brightness: 0,
		contrast: 0,
		threshold: 0,
		rotation: 0
	}
		

	fluid.imageAdjuster.setRotate = function (degree, ctx) {
		
		var maxVal, minVal;

		maxVal = 360;
		minVal = -360;
		fluid.imageAdjuster.adjustments.rotation = degree;
			
		//set rotate value and check bounds				
		if(degree <= minVal) {
			degree = minVal;
		}
		if(degree >= maxVal) {
			degree = maxVal;
		}

		fluid.imageAdjuster.adjustments.rotation = degree;

		if(this.ctx && this.canvas) {
			var ctx = this.ctx;
			ctx.translate((canvas.width/2), (canvas.height/2));
			ctx.rotate(degree*Math.PI/180);
			ctx.translate(-(canvas.width/2), -(canvas.height/2));
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.drawImage(image, 0, 0);
		}

		return degree;
	
	};

	//load canvas		
	fluid.imageAdjuster.loadCanvas = function () {
		var canvas, canvasContext, image;
		canvas = $('#flc-image-adjuster-container canvas')[0];		
		canvasContext = canvas.getContext('2d');
		image = new Image();
		image.src = '../webapp/demo.jpg';
		canvasContext.drawImage(image, 0, 0);
		this.ctx = canvasContext;
	}
	
	//show / hide for controls
	$('#flc-image-adjuster-rotate').click(function (ev, el) {
		$('.flc-image-adjuster-controls').hide();
		$('#flc-image-adjuster-rotate-controls').show();
		ev.preventDefault();
	});
	
	//plus / minus
	$('.flc-image-adjuster-minus').click(function(ev) {
		ev.preventDefault();
	});

	//apply button
	$('.flc-image-adjuster-controls .apply').click(function(ev) {
		ev.preventDefault();
		var targetId = ev.target.getAttribute('id');
		if(targetId === 'flc-image-adjuster-rotate-apply') {
			adjustments.rotation = $('[name=flc-image-adjuster-rotate]').val();
			canvasContext.translate((canvas.width/2), (canvas.height/2));
			canvasContext.rotate(adjustments.rotation*Math.PI/180);
			canvasContext.translate(-(canvas.width/2), -(canvas.height/2));
			canvasContext.clearRect(0, 0, canvas.width, canvas.height);
			canvasContext.drawImage(image, 0, 0);
		}
	});
})(jQuery, fluid);

$(document).ready(function () {
	var imageAdjuster = fluid.imageAdjuster('#flc-image-adjuster-container', {
		//any options
	});
})
;
