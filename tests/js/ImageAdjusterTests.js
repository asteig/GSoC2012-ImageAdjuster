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

jQuery(document).ready(function () {

	var imageAdjustmentTests = new jqUnit.testCase("Image Editor Tests");
	var cssPrefix = '.flc-image-adjustments-';
	var Adjustments = {}; //empty object for test

	module("Initilization");

	imageAdjustmentTests.test('Setup Tests', function() {
		jqUnit.isVisible("Main container is visible", cssPrefix+'container');
		jqUnit.isVisible("Canvas element is visible", cssPrefix+'canvas');
	});

	module("Brightness");

	imageAdjustmentTests.test('Brightness Tests', function(){
		jqUnit.isVisible("Brightness Button is Initially Visible", cssPrefix+"button-brightnesscontrast");
		jqUnit.assertNotUndefined("Brightness value is set in adjustments object", Adjustments.brightness);
		jqUnit.assertTrue("Adjustments has setBrightness function", Adjustments.hasOwnProperty('setBrightness'));
		jqUnit.assertTrue("setBrightness accepts values", Adjustments.hasOwnProperty('setBrightness')&&Adjustments.setBrightness(150));
		jqUnit.assertTrue("Brightness value is within bounds", 
			Adjustments.hasOwnProperty('brightness')&&Adjustments.brightness>=-150&&Adjustments.brightness<=150);
	});

	module("Contrast");

	imageAdjustmentTests.test('Contrast Tests', function() {
		jqUnit.isVisible("Contrast Button is Initially Visible", cssPrefix+"button-brightnesscontrast");
		jqUnit.assertNotUndefined("Contrast value is set in adjustments object", Adjustments.contrast);
		jqUnit.assertTrue("Adjustments has setContrast function", Adjustments.hasOwnProperty('setContrast'));
		jqUnit.assertTrue("setContrast accepts values", Adjustments.hasOwnProperty('setContrast')&&Adjustments.setContrast(151));
		jqUnit.assertTrue("Contrast value stays within bounds", 
			Adjustments.hasOwnProperty('contrast')&&Adjustments.contrast>=-50&&Adjustments.contrast<=100);
	});

	module("Rotation");

	imageAdjustmentTests.test('Rotation Tests', function() {
		jqUnit.isVisible("Rotation Button is Initially Visible", cssPrefix+"button-rotate");
		jqUnit.assertNotUndefined("Rotation value is set in adjustments object", Adjustments.rotation);
		jqUnit.assertTrue("Adjustments has setRotation function", Adjustments.hasOwnProperty('setRotation'));
		jqUnit.assertTrue("setRotation accepts values", Adjustments.hasOwnProperty('setRotation')&&Adjustments.setRotation(151));
		jqUnit.assertTrue("Rotation value stays within bounds", 
			Adjustments.hasOwnProperty('rotation')&&Adjustments.rotation>=-360&&Adjustments.contrast<=360);
	});

	module("Threshold");

	imageAdjustmentTests.test('Threshold Tests', function () {
		jqUnit.isVisible("Threshold Button is Initially Visible", cssPrefix+("button-threshold"));
		jqUnit.assertNotUndefined("Threshold value is set in adjustments object", Adjustments.threshold);
		jqUnit.assertTrue("Adjustments has setThreshold function", Adjustments.hasOwnProperty('setThreshold'));
		jqUnit.assertTrue("setThreshold accepts values", Adjustments.hasOwnProperty('setThreshold')&&Adjustments.setThreshold(151));
		jqUnit.assertTrue("Threshold value stays within bounds", 
			Adjustments.hasOwnProperty('rotation')&&Adjustments.threshold>=0&&Adjustments.threshold<=128);
	});

});