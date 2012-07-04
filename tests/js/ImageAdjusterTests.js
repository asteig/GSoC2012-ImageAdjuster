/*
Copyright 2012 OCAD University

Licensed under the Educational Community License (ECL), Version 2.0 or the New
BSD license. You may not use this file except in compliance with one these
Licenses.

You may obtain a copy of the ECL 2.0 License and BSD License at
https://github.com/fluid-project/infusion/raw/master/Infusion-LICENSE.txt
*/

// Declare dependencies
/*global fluid, jqUnit, jQuery*/
/*jslint browser:true */

jQuery(document).ready(function () {

	"use strict";

	var imageAdjustmentTests;
	
	imageAdjustmentTests = new jqUnit.testCase("Image Editor Tests");	
	module("Initilization");

	imageAdjustmentTests.test('Setup Tests', function () {
		jqUnit.assertTrue('Fluid imageAdjuster object exists', editor.imageAdjuster);
		jqUnit.assertNotUndefined("imageAdjuster has adjustments object", editor.imageAdjuster.adjustments);	
		jqUnit.assertNotUndefined('Default selectors defined', fluid.defaults.selectors);
		//throws an error when fluid.defaults.selectors is not defined :(
		jQuery.each(fluid.defaults.selectors, function(k, v) {
			jqUnit.assertTrue('Default selector '+v+' appears on page', $(v));
		});

	});

	module("Brightness");
	
	imageAdjustmentTests.test('Brightness Tests',	function () {	
		jqUnit.assertNotUndefined("Brightness value is set in adjustments object", editor.imageAdjuster.adjustments.brightness);
		jqUnit.assertTrue("Adjustments has setBrightness method", editor.imageAdjuster.hasOwnProperty('setBrightness'));
		jqUnit.assertTrue("setBrightness accepts values", editor.imageAdjuster.hasOwnProperty('setBrightness') && editor.imageAdjuster.setBrightness(50) === 50);
		jqUnit.assertTrue("setBrightness adjusts for values below lower bound", editor.imageAdjuster.hasOwnProperty('setBrightness') && editor.imageAdjuster.setBrightness(-151) === -150);
		jqUnit.assertTrue("setBrightness adjusts for values above lower bound", editor.imageAdjuster.hasOwnProperty('setBrightness') && editor.imageAdjuster.setBrightness(151) === 150);
	});

	module("Contrast");

	imageAdjustmentTests.test('Contrast Tests', function () {
		jqUnit.assertNotUndefined("Contrast value is set in adjustments object", editor.imageAdjuster.adjustments.contrast);
		jqUnit.assertTrue("Adjustments has setContrast method", editor.imageAdjuster.hasOwnProperty('setContrast'));
		jqUnit.assertTrue("setContrast accepts values", editor.imageAdjuster.hasOwnProperty('setContrast') && editor.imageAdjuster.setContrast(50) === 50);
		jqUnit.assertTrue("setContrast adjusts for values below lower bound", editor.imageAdjuster.hasOwnProperty('setContrast') && editor.imageAdjuster.setContrast(-151) === -150);
		jqUnit.assertTrue("setContrast adjusts for values above lower bound", editor.imageAdjuster.hasOwnProperty('setContrast') && editor.imageAdjuster.setContrast(151) === 150);
	});
		

	module("Rotation");

	imageAdjustmentTests.test('Rotation Tests', function () {
		jqUnit.assertNotUndefined("Rotation value is set in adjustments object", editor.imageAdjuster.adjustments.rotation);
		jqUnit.assertTrue("ImageAdjuster has setRotation function", editor.imageAdjuster.hasOwnProperty('setRotate'));
		jqUnit.assertTrue("setRotate accepts values", editor.imageAdjuster.hasOwnProperty('setRotate') && editor.imageAdjuster.setRotate(60) === 60);
		jqUnit.assertTrue("setRotate adjusts for values below lower bound", editor.imageAdjuster.hasOwnProperty('setRotate') && parseInt(editor.imageAdjuster.setRotate(-361)) === parseInt(-360));
		jqUnit.assertTrue("setRotate adjusts for value above upper bound", editor.imageAdjuster.hasOwnProperty('setRotate') && editor.imageAdjuster.setRotate(361) === (360));
	});

	module("Threshold");

	imageAdjustmentTests.test('Threshold Tests', function () {
		jqUnit.assertNotUndefined("Threshold value is set in adjustments object", editor.imageAdjuster.adjustments.threshold);
		jqUnit.assertTrue("Adjustments has setThreshold function", editor.imageAdjuster.hasOwnProperty('setThreshold'));
		jqUnit.assertTrue("setThreshold accepts values", editor.imageAdjuster.hasOwnProperty('setThreshold') && editor.imageAdjuster.setThreshold(128));
		jqUnit.assertTrue("setThreshold adjusts for values below lower  bound", editor.imageAdjuster.hasOwnProperty('setThreshold') && editor.imageAdjuster.setThreshold(-1) === 0);
		jqUnit.assertTrue("setThreshold adjusts for values above higher bound", editor.imageAdjuster.hasOwnProperty('setThreshold') && editor.imageAdjuster.setThreshold(129) === 128);	
	});
});
