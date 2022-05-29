Date.prototype.toDateInputValue = (function() {
    let local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});

Date.prototype.addDays = function(days) {
    let date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function setDeliveryDate() {
	let date = document.getElementById('deliveryDate');

	let today = new Date().toDateInputValue();
	date.value = today;

	date.setAttribute('min', today)
	console.log(today)
	
	let maxDate = new Date().addDays(9);
	console.log(maxDate)
	maxDate = maxDate.toDateInputValue();

	date.setAttribute('max', maxDate)
}

setDeliveryDate();

let row = document.getElementById('row');
let cell = document.getElementById('cell');

function getWatermelonStatus(rowValue, cellValue) {
	const xhr = new XMLHttpRequest();
	xhr.open('GET', `http://watermelons/index.php/user/list?row=${rowValue}&cell=${cellValue}`, true);

	xhr.onload = function () {
        if (this.status === 200) {
            // Changing string data into JSON Object
            obj = JSON.parse(this.responseText);
            let condition = obj[0].condition;
  			let statusOfWatermelon;
  			if (condition == 'ready') {
  				statusOfWatermelon = "Спелый";
  			} else if (condition == 'unripe') {
  				statusOfWatermelon = "Еще не поспел";
  			} else {
  				statusOfWatermelon = "Уже сорван";
  			}

  			let statusOfWatermelonHTML = document.getElementById('statusOfWatermelon');
  			statusOfWatermelonHTML.innerText = statusOfWatermelon;

  			let weightOfWatermelon = obj[0].weight;
  			let weightOfWatermelonHTML = document.getElementById('weightOfWatermelon');
  			weightOfWatermelonHTML.innerText = weightOfWatermelon;

        }
        else {
            console.log('File not found');
        }
    }

    xhr.send()
}

function refreshWatermelonStatus() {
	let rowValue = parseInt(row.value);
	let cellValue = parseInt(cell.value);

	getWatermelonStatus(rowValue, cellValue);
}

row.onchange = function() {
	refreshWatermelonStatus()
}

cell.onchange = function() {
	refreshWatermelonStatus()
}