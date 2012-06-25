var imageAdjuster = imageAdjuster || {};

(function ($, fluid) {
	
	fluid.imageAdjuster = function(container, options) {

		var that = fluid.initView("fluid-imageAdjuster", container, options);
		
		var adjustments = { 
			//set defaults
			brightness: 0,
			contrast: 0,
			threshold: 0,
			rotation: 0
		}
	
		//load canvas		
		var canvas = $('#flc-image-adjuster-container canvas')[0];		
		var canvasContext = canvas.getContext('2d');

		var image = new Image();
		image.src = '../webapp/demo.jpg';
		canvasContext.drawImage(image, 0, 0);

		//show / hide for controls
		$('#flc-image-adjuster-container ul li').click(function (ev, el) {
			var targetId = ev.target.getAttribute('id');
			$('.flc-image-adjuster-controls').hide();
			$('#'+targetId+'-controls').show();
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
				//canvasContext.clearRect(0, 0, canvas.width, canvas.height);
				canvasContext.drawImage(image, 0, 0);
			}
		});		

	}
	
})(jQuery, fluid);

$(document).ready(function () {
	var myImageAdjuster = fluid.imageAdjuster('#flc-image-adjuster-container', {
		//any options
	});
});
