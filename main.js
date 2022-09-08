/* MAIN
 * Handles html input and css responsive styling
 */

const date_picker_element = document.querySelector('.date-picker');
const selected_date_element = document.querySelector('.date-picker .selected-date');
const dates_element = document.querySelector('.date-picker .dates');
const mth_element = document.querySelector('.date-picker .dates .month .mth');
const next_mth_element = document.querySelector('.date-picker .dates .month .next-mth');
const prev_mth_element = document.querySelector('.date-picker .dates .month .prev-mth');
const days_element = document.querySelector('.date-picker .dates .days');

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// varables using the Date() format
let date = new Date();
let day = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

let selectedDate = date;

// array containing first and last day selected
let selectedDay = [
	{day: day, month: month, year: year},
	{day: 1, month: month, year: year}
];

let selectedMonth = month;
let selectedYear = year;

// array containing the items in between the day selection
let insideArray = [0];

mth_element.textContent = months[month] + ' ' + year;

selected_date_element.textContent = formatDate(date);
selected_date_element.dataset.value = selectedDate;

populateDates();

// EVENT LISTENERS
date_picker_element.addEventListener('click', toggleDatePicker);
next_mth_element.addEventListener('click', goToNextMonth);
prev_mth_element.addEventListener('click', goToPrevMonth);

// FUNCTIONS
// extends the "menu"
function toggleDatePicker (e) {
	if (!checkEventPathForClass(e.path, 'dates')) {
		dates_element.classList.toggle('active');
	}
}

// increases the month and redraws the dates within
function goToNextMonth (e) {
	month++;
	if (month > 11) {
		month = 0;
		year++;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

function goToPrevMonth (e) {
	month --;
	if (month < 0) {
		month = 11
		year--;
	}
	mth_element.textContent = months[month] + ' ' + year;
	populateDates();
}

// draws the dates and assigns their css state
function populateDates(e) {
	days_element.innerHTML = '';
	let amount_days = 31;

        if (month === 1) {
		amount_days = 28;
	}

        if (month === 3) {
		amount_days = 30;
	}

        if (month === 5) {
		amount_days = 30;
	}

        if (month === 8) {
		amount_days = 30;
	}

        if (month === 10) {
		amount_days = 30;
	}

	for (let i = 0; i < amount_days; i++) {
		const day_element = document.createElement('div');
		day_element.classList.add('day');
		day_element.textContent = i + 1;

		// selects the outer ranges of the interval
		if (selectedDay[1].day === (i + 1) && selectedDay[1].year === year && selectedDay[1].month === month) {
			day_element.classList.add('selected-first');
		}

		if (selectedDay[0].day === (i + 1) && selectedDay[0].year === year && selectedDay[0].month === month) {
			day_element.classList.add('selected-last');
		}

		day_element.addEventListener('click', function () {
			selectedDate = new Date(year + '-' + (month + 1) + '-' + (i + 1));
			let actDay = i + 1;
			selectedDay.unshift({day: actDay, month: month, year: year});
			insideArray = [];
			// the days inside the selected day interval
			for (let l = 1; l < (selectedDay[0].day - selectedDay[1].day); l++) {
				let rangeStart = selectedDay[1].day + l;
				insideArray.push({day: rangeStart, month: month, year: year});
			}
			selectedMonth = month;
			selectedYear = year;

			// shows the selected dates as text
			selected_date_element.textContent = selectedDay[1].day + ' / ' + selectedDay[1].month + ' / ' + selectedDay[1].year + ' - ' + selectedDay[0].day + ' / ' + selectedDay[0].month + ' / ' + selectedDay[0].year ;
			selected_date_element.dataset.value = selectedDate;

			populateDates();
		});
		let inArrayLength = insideArray.length;
		if (inArrayLength != 0){

			for (let k = 0; k < inArrayLength; k++) {
				if (insideArray[k].day === (i + 1) && selectedDay[0].month === selectedDay[0].month) {
					day_element.classList.add('selected-inside');
				}
			}
		}

		/* if the final date is in a different month,
		 * highlight all days up to that date
		 *
		if (selectedDay[1].month < selectedMonth && selectedDay[1].day < i) {
				day_element.classList.add('selected-inside');
			console.log(i);
			console.log('month ',selectedDay[1].month);
			console.log('day ',selectedDay[1].day);
		}
		*/

		days_element.appendChild(day_element);
//		console.log(insideArray);
	}

}

// HELPER FUNCTIONS
function checkEventPathForClass (path, selector) {
	for (let i = 0; i < path.length; i++) {
		if (path[i].classList && path[i].classList.contains(selector)) {
			return true;
		}
	}

	return false;
}	

// visibility for the days
function formatDate (d) {
	let day = d.getDate();
	if (day < 10) {
		dat = '0' + day;
	}

	let month= d.getMonth() + 1;
	if (month < 10) {
		month = '0' + month;
	}

	let year = d.getFullYear();

	return day + ' / ' + month + ' / ' + year;
}
