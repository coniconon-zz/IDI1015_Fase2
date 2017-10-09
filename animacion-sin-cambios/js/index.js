$(document).ready(function(){
	var count = 0;

	function addone(){
		count++;
		$('#logo').jrumble({
			x: count,
			y: count,
			rotation: 0
		});
		$('#logo').trigger('startRumble');

		setTimeout(addone, 6000);
	}
	addone();
});


