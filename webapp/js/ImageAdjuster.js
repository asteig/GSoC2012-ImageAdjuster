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
            rotationInput: '[name=flc-image-adjuster-rotation]',
            thresholdInput: '[name=flc-image-adjuster-threshold]',
            applyChangesBtn: '#flc-image-adjuster-apply-btn',
            cancelDialogBtn: '#flc-image-adjuster-cancel-btn',
            shortcutLink: '#flc-image-adjuster-shortcut-link',
            shortcutMenu: '#flc-image-adjuster-shortcut-menu',
            imgSaveBtn: '#flc-image-adjuster-save-btn',
            moreBtn: '#flc-image-adjuster-more-btn',
            moreMenu: '#flc-image-adjuster-more-menu',
            exportTextArea: '#flc-image-adjuster-json-textarea' 
        },
        model: {
            brightness: 0,
            rotation: 0,
            threshold: 0
        },
        imgSrc: '../webapp/demo.jpg'
    });

    editor.imageAdjuster.setValues = function (that) {

        var bounds, maxVal, minVal, value;

        bounds = {
            'brightness': {
                'min': -150,
                'max': 150
            },
            'rotation': {
                'min': -360,
                'max': 360
            },
            'threshold': {
                'min': 0,
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

        if(that.model.brightness == 0) {
            return that;    
        }

        for (var i=0; i < that.pixels.length; i += 4) {
            that.pixels[i] += that.model.brightness; 
            that.pixels[i+1] += that.model.brightness;
            that.pixels[i+2] += that.model.brightness;
        }
        
        return that;
         
    };

    editor.imageAdjuster.applyRotation = function (that) {

        var centerX, centerY, degrees, radians;
       
        if(that.prevDegrees && that.prevDegrees == that.model.rotation) {
            return that;
        }
        
        degrees = that.model.rotation;
        
        if(that.prevDegrees) { 
            degrees = degrees - that.prevDegrees;
        }
        
        centerX = that.canvas.width / 2;
        centerY = that.canvas.height / 2;
        radians = degrees * Math.PI / 180;
        
        //rotate canvas
        that.ctx.translate(centerX, centerY);
        that.ctx.rotate(radians);
        that.ctx.translate(-(centerX), -(centerY));

        that.prevDegrees = that.model.rotation;

        return that;

    }

    editor.imageAdjuster.applyThreshold = function (that) {

        if(that.model.threshold == "0") {
            return that;
        }
        
        for (var i=0; i<that.pixels.length; i+=4) {
            var r = that.pixels[i];
            var g = that.pixels[i+1];
            var b = that.pixels[i+2];
            var v = (0.2126*r + 0.7152*g + 0.0722*b >= that.model.threshold) ? 255 : 0;
            that.pixels[i] = that.pixels[i+1] = that.pixels[i+2] = v;
        }
        
        return that;
    }

    editor.imageAdjuster.bindEvents = function (that) {

        var container, brightnessTab, brightnessMenu, rotateTab, rotateMenu, thresholdTab, thresholdMenu, applyChangesBtn, menuWrap, shortcutLink, shortcutMenu, cancelDialogBtn, imgSaveBtn, moreBtn, exportTextArea, moreMenu;

        container = that.locate('container');

        brightnessTab = that.locate('brightnessTab');
        brightnessMenu = that.locate('brightnessMenu');

        rotateTab = that.locate('rotateTab');
        rotateMenu = that.locate('rotateMenu');
        rotateTab.fluid('tabbable');
         
        thresholdTab = that.locate('thresholdTab');
        thresholdMenu = that.locate('thresholdMenu');

        applyChangesBtn = that.locate('applyChangesBtn');
        cancelDialogBtn = that.locate('cancelDialogBtn');    

        menuWrap = that.locate('menuWrap');

        shortcutLink = that.locate('shortcutLink');
        shortcutMenu = that.locate('shortcutMenu');

        moreBtn = that.locate('moreBtn');
        moreMenu = that.locate('moreMenu');
        imgSaveBtn = that.locate('imgSaveBtn');
        exportTextArea = that.locate('exportTextArea');
        
        brightnessTab.click(function (e) {
            
            e.preventDefault();
            
            menuWrap.show();
            rotateMenu.hide();
            thresholdMenu.hide();
            brightnessMenu.show();
            moreMenu.hide();
            shortcutMenu.hide();

        });

        rotateTab.click(function (e) {

            e.preventDefault();

            menuWrap.show();
            brightnessMenu.hide();
            thresholdMenu.hide();
            rotateMenu.show();
            moreMenu.hide();
            shortcutMenu.hide();

        });
        
        thresholdTab.click(function (e) {

            e.preventDefault();

            menuWrap.show();
            brightnessMenu.hide();
            rotateMenu.hide();
            thresholdMenu.show();
            moreMenu.hide();
            shortcutMenu.hide();

        });

        applyChangesBtn.click(function () {
            editor.imageAdjuster.applyValues(that);
        });

        cancelDialogBtn.click(function (e) {
            
            e.preventDefault();

            menuWrap.hide();
            brightnessMenu.hide();
            rotateMenu.hide();
            thresholdMenu.hide();
            shortcutMenu.hide();
            moreMenu.hide();

        });
       
        
        shortcutLink.click(function (e) {
            
            e.preventDefault();

            menuWrap.hide();
            brightnessMenu.hide();
            rotateMenu.hide();
            thresholdMenu.hide();
            shortcutMenu.show();
            moreMenu.hide();
        
        });

        moreBtn.click(function (e) {
            
            var url;

            e.preventDefault();

            url = that.canvas.toDataURL();
            imgSaveBtn.attr('href', url);
            imgSaveBtn.attr('target', '_blank');

            menuWrap.hide();
            brightnessMenu.hide();
            rotateMenu.hide();
            thresholdMenu.hide();
            shortcutMenu.hide();
            moreMenu.show();

            exportTextArea.val(JSON.stringify(that.model));

        });

        $(document.body).keydown(function (e) { 
            
            if(e.ctrlKey) {
                if(e.keyCode == 49) {
                    brightnessTab.trigger('click');
                }

                if(e.keyCode == 50) {
                    rotateTab.trigger('click');
                }

                if(e.keyCode == 51) {
                    thresholdTab.trigger('click');
                }

                if(e.keyCode == 48) {
                    shortcutLink.trigger('click');
                }
            }

            if(e.keyCode == 27) {
                //close all dialogs
                menuWrap.hide();
                shortcutMenu.hide();
            }

        });
    
        $('input').keydown(function (e) {
            
            var inputValue, charCode;
            
            inputValue = parseInt($(this).val());
            
            charCode = e.which || e.keyCode;
           
            if(charCode == 38) {
                $(this).val(inputValue+1);
            }
            else if(charCode == 40) {
                $(this).val(inputValue-1);    
            }
        
        });
        
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
        that.image.src = that.options.imgSrc;
        that.ctx.drawImage(that.image, 0, 0);
      
        return that;

    };

    editor.imageAdjuster.applyValues = function (that) {

        editor.imageAdjuster.setValues(that);
        editor.imageAdjuster.applyRotation(that);
        that.ctx.drawImage(that.image, 0, 0);

        that.imageData = that.ctx.getImageData(0, 0, that.canvas.width, that.canvas.height);
        that.pixels = that.imageData.data;

        editor.imageAdjuster.setValues(that);
        editor.imageAdjuster.applyThreshold(that);
        editor.imageAdjuster.applyBrightness(that);

        that.ctx.putImageData(that.imageData, 0, 0);
        
        return that;

    };

}(jQuery, fluid));
