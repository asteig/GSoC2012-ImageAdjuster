/*
Copyright 2012 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*jQuery, fluid*/

// JSLint options
/*jslint white: true, undef: true, newcap: true, nomen: true, regexp: true, bitwise: true, browser: true, forin: true, maxerr: 100, indent: 4 */

var editor = editor || {};

(function ($, fluid) {

    /**
	* ImageAdjuster Infusion Component
	*/

    "use strict";

	fluid.defaults("editor.imageAdjuster", {
		gradeNames: ["fluid.viewComponent", "autoInit"],
		preInitFunction: "editor.imageAdjuster.preInit",
		postInitFunction: "editor.imageAdjuster.postInit",
		selectors : {
				container : '#flc-image-adjuster-container',
				canvas : '#flc-image-adjuster-canvas',
				brightnessTab : '#flc-image-adjuster-brightness',
				rotateTab : '#flc-image-adjuster-rotate',
				thresholdTab : '#flc-image-adjuster-threshold',
				brightnessMenu : '#flc-image-adjuster-brightness-controls',
				rotateMenu : '#flc-image-adjuster-rotate-controls',
				thresholdMenu : '#flc-image-adjuster-threshold-controls'
		}
	});

	//creator function 
	editor.imageAdjuster = function(container, options) {
		var that, adjustments;

		that = fluid.initView("fluid.imageAdjuster", container, options);
		editor.imageAdjuster.preInit(that);
		return that;
	
	};

	editor.imageAdjuster.adjustments = { 
		brightness: 0,
		contrast: 0,
		threshold: 0,
		rotation: 0
	};
		

	editor.imageAdjuster.preInit = function (that) {
		
		var image;
		//load canvas
		//that.canvas = that.locate('canvas');
		that.canvas = $('#flc-image-adjuster-canvas')[0];
		that.ctx = that.canvas.getContext('2d');
		that.image = new Image();
		that.image.src = '../webapp/demo.jpg';
		that.ctx.drawImage(that.image, 0, 0);
		
		editor.imageAdjuster.bindEvents(that);
	};

	editor.imageAdjuster.postInit = function (that) {
		that.locate('rotateMenu');
	};

	editor.imageAdjuster.setRotate = function (degree) {

		var maxVal, minVal;

		//bounds check
		maxVal = 360;
		minVal = -360;
		
		if(degree <= minVal) {
			degree = minVal;
		}		
		else if(degree >= maxVal) {
			degree = maxVal;
		}

		editor.imageAdjuster.adjustments.rotation += degree;
		
		return degree;

	};
	
	editor.imageAdjuster.rotate = function(that) {
		
		var centerX, centerY, degrees, radians;
		
		centerX = that.canvas.width/2;
		centerY = that.canvas.height/2;
		degrees = editor.imageAdjuster.adjustments.rotation;
		radians = degrees*Math.PI/180;
		
		//rotate canvas
		that.ctx.save();
		that.ctx.translate(centerX, centerY);
		that.ctx.rotate(radians);
		that.ctx.translate(-(centerX), -(centerY));
		that.ctx.drawImage(that.image, 0, 0);
		that.ctx.restore();
		
		return true;

	};

	editor.imageAdjuster.bindEvents = function (that) {
		
		var rotateTab, rotateMenu, rotateInput, rotateApply, activeMenu;
		
		//rotateTab = that.locate('rotateTab');
		rotateTab = $('#flc-image-adjuster-rotate');
		rotateMenu = $('#flc-image-adjuster-rotate-controls');
		rotateInput = $('[name=flc-image-adjuster-rotate]');
		rotateApply = $('#flc-image-adjuster-rotate-apply');

		activeMenu = $('.flc-image-adjuster-controls');

		rotateTab.click(function () {
			activeMenu.hide();
			rotateMenu.show();
		});

		rotateApply.click(function () {
                var rotateValue;
				rotateValue = rotateInput.val();
				editor.imageAdjuster.setRotate(rotateValue);
				editor.imageAdjuster.rotate(that);
		});		

	};


}(jQuery, fluid));


