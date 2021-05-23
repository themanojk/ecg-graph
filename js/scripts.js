$(function() {

	function getRndInteger(min, max) {
		return (Math.random() * (max - min) ) + min;
	}

	function getDataFromServer() {
		let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				generateGraph(this.responseText); // Response text should be an array
			}
		};
		xhttp.open("POST", "demo_post2.asp", true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send("fname=Henry&lname=Ford");
	}

	function getEcgData() {
		let myArray = []
		setInterval(() => {
			myArray.push(getRndInteger(0.0005037, 0.00019345));

			generateGraph(myArray)
		}, 500)
	}

	function generateGraph(dataArray) {
		ecg = [];

		for(i=0; i<dataArray.length; i++) {
			
			ecg.push({
				x: i,
				y: dataArray[i]
			});
			
		}

		options = {
			ticks: {
				x: 22,
				y: 8
			},
			width: 800,
			height: 250
		}

		$('.ecg_container').ecgChart(ecg, options);
	}

	getEcgData();

});