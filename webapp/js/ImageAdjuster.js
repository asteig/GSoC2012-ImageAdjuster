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
        postInitFunction: 'editor.imageAdjuster.postInit',
        selectors: {
            container: '#flc-image-adjuster-container',
            canvas: '#flc-image-adjuster-canvas',
            brightnessTab: '#flc-image-adjuster-brightness',
            rotateTab: '#flc-image-adjuster-rotate',
            thresholdTab: '#flc-image-adjuster-threshold',
            menuWrap: '#flc-image-adjuster-controls',
            brightnessMenu: '#flc-image-adjuster-brightness-controls',
            rotateMenu: '#flc-image-adjuster-rotate-controls',
            thresholdMenu: '#flc-image-adjuster-threshold-controls',
            brightnessInput: '[name=flc-image-adjuster-brightness]',
            contrastInput: '[name=flc-image-adjuster-contrast]',
            rotationInput: '[name=flc-image-adjuster-rotation]',
            thresholdInput: '[name=flc-image-adjuster-threshold]',
            applyChangesBtn: '#flc-image-adjuster-apply-btn'
        },
        model: {
            brightness: 0,
            contrast: 0,
            rotation: 0,
            threshold: 0
        }
    });

    editor.imageAdjuster.setValues = function (that) {

        var bounds, maxVal, minVal, value;

        bounds = {
            'brightness': {
                'min': -150,
                'max': 150
            },
            'contrast': {
                'min': -150,
                'max': 150
            },
            'rotation': {
                'min': -360,
                'max': 360
            },
            'threshold': {
                'min': 1,
                'max': 180
            }
        };

        $.each(bounds, function (k, v) {

            //get value from appropriate input
            value = that.locate(k + 'Input').val();
            minVal = v.min;
            maxVal = v.max;

            if (value <= minVal) {
                value = minVal;
            }

            if (value >= maxVal) {
                value = maxVal;
            }

            if (value) {
               that.model[k]  = value;
            }

        });

        return that.model;

    };

    editor.imageAdjuster.applyBrightness = function (that) {

        var imageData, d;
       
        that.ctx.drawImage(that.image, 0, 0);
        that.imageData = that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height);
        
        that.d = that.imageData.data;
        
        for (var i=0; i < that.d.length; i += 4) {
            that.d[i] += that.model.brightness; 
            that.d[i+1] += that.model.brightness;
            that.d[i+2] += that.model.brightness;
        }
        
        return that;
         
    };

    editor.imageAdjuster.applyContrast = function (that) {
        
    };

    editor.imageAdjuster.applyRotation = function (that) {

        var centerX, centerY, degrees, radians;

        centerX = that.canvas.width / 2;
        centerY = that.canvas.height / 2;
        degrees = that.model.rotation;
        radians = degrees * Math.PI / 180;

        //rotate canvas
        that.ctx.save();
        that.ctx.translate(centerX, centerY);
        that.ctx.rotate(radians);
        that.ctx.translate(-(centerX), -(centerY));
        //that.ctx.drawImage(that.image, 0, 0);
        //that.ctx.restore();

        return true;

    }

    editor.imageAdjuster.applyThreshold = function (that) {
        return true;
    }

    editor.imageAdjuster.bindEvents = function (that) {

        var brightnessTab, brightnessMenu, rotateTab, rotateMenu, thresholdTab, thresholdMenu, applyChangesBtn, menuWrap;

        brightnessTab = that.locate('brightnessTab');
        brightnessMenu = that.locate('brightnessMenu');

        rotateTab = that.locate('rotateTab');
        rotateMenu = that.locate('rotateMenu');
        
        thresholdTab = that.locate('thresholdTab');
        thresholdMenu = that.locate('thresholdMenu');

        applyChangesBtn = that.locate('applyChangesBtn');

        menuWrap = that.locate('menuWrap');

        brightnessTab.click(function () {
            menuWrap.show();
            rotateMenu.hide();
            thresholdMenu.hide();
            brightnessMenu.show();
        });

        rotateTab.click(function () {
            menuWrap.show();
            brightnessMenu.hide();
            thresholdMenu.hide();
            rotateMenu.show();
        });
        
        thresholdTab.click(function () {
            menuWrap.show();
            brightnessMenu.hide();
            rotateMenu.hide();
            thresholdMenu.show();
        });
                
        applyChangesBtn.click(function () {
            editor.imageAdjuster.loadCanvas(that);
        });

    
        $('input').keydown(function (e) {
            
            var inputValue;
            
            inputValue = parseInt($(this).val());
            
            var charCode = e.which || e.keyCode;
           
            if(charCode == 38) {
                $(this).val(inputValue+1);
            }
            else if(charCode == 40) {
                $(this).val(inputValue-1);    
            }
        
        })
        
        return that;

    };

    editor.imageAdjuster.postInit = function (that) {

        editor.imageAdjuster.loadCanvas(that);
        editor.imageAdjuster.bindEvents(that);

        return that;

    };

    editor.imageAdjuster.loadCanvas = function (that) {

        that.canvas = that.locate('canvas');
        that.canvas = that.canvas[0];
        that.ctx = that.canvas.getContext('2d');
        that.image = new Image();
        that.image.src = '../webapp/demo.jpg';
        that.ctx.drawImage(that.image, 0, 0);

        editor.imageAdjuster.applyValues(that);

        that.ctx.putImageData(that.imageData, 0, 0);

        return that;

    };

    editor.imageAdjuster.applyValues = function (that) {

        editor.imageAdjuster.setValues(that);
//        editor.imageAdjuster.applyContrast(that); 
        editor.imageAdjuster.applyBrightness(that);
        editor.imageAdjuster.applyRotation(that);
//        editor.imageAdjuster.applyThreshold(that);
        

        return that;

    };

}(jQuery, fluid));
