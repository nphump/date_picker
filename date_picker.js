
'use strict';

// Dependencies:
// jquery, date_picker.css

// Replaces the contents of DOM element 'div' with a date_picker widget
// 'dates' are marked specially on the calendar, and passed in this format: {"20201231": 1, "20201125", 1}
// 'callback' is an optional function that receives 2 arguments like: "20201231", "31 December 2020" whenever user clicks on a date.
// Initially the current date is automatically selected (and the callback function is called)
function date_picker(div, dates, callback)
{
	let dt = new Date();

	if (! dates) dates = {};

	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	var el = $('<div class="date_picker"><div class="date_picker_month"><div class="date_picker_prev"><span>&#10094</span></div><div class="date_picker_current-date"><h2 class="date_picker_month_h2"></h2><div></div></div><div class="date_picker_next"><span>&#10095</span></div></div><div class="date_picker_week-days"><div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div></div><div class="date_picker_days"></div></div>');
	$(div).empty();
	$(div).append(el);

	function pad_10(num)
	{
		let num2 = parseInt(num);
		return "" + (num2 < 10 ? ("0" + num2) : num2);
	}

	function render_date()
	{
		dt.setDate(1);
		let day = dt.getDay();

		let endDate = new Date(dt.getFullYear(), dt.getMonth() + 1, 0).getDate();

		let prevDate = new Date(dt.getFullYear(), dt.getMonth(), 0).getDate();

		let today = new Date();

		el.find('.date_picker_month_h2').html(months[dt.getMonth()] + " " + dt.getFullYear());

		let cells = "";
		let countDate = 0;

		for (let x = day; x > 0; x--) {
			cells += "<div class='date_picker_other-month'>" + (prevDate - x + 1) + "</div>";
		}

		for (let i = 1; i <= endDate; i++)
		{
			var classes = ['date_picker_this_month'];
			if (i === today.getDate() && dt.getMonth() === today.getMonth() && dt.getFullYear() === today.getFullYear())
				classes.push('date_picker_today');

			if (dates.hasOwnProperty(dt.getFullYear() + pad_10(dt.getMonth() + 1) + pad_10(i)))
				classes.push('date_picker_has_event');

			cells += "<div class='" + classes.join(' ') + "'>" + i + "</div>";

			countDate = i;
		}

		let reservedDateCells = countDate + day + 1;
		for (let j1 = reservedDateCells, j2 = 1; j1 <= 42; j1++, j2++) {
			cells += "<div class='date_picker_other-month'>" + j2 + "</div>";
		}

		el.find('.date_picker_days').html(cells);
	}
	
	el.find('.date_picker_prev').click(function()
	{
		dt.setMonth(dt.getMonth() - 1);
		render_date();
	});

	el.find('.date_picker_next').click(function()
	{
		dt.setMonth(dt.getMonth() + 1);
		render_date();
	});

	render_date();

	if (callback)
	{
		el.on('click', '.date_picker_this_month', function()
		{
			el.find('.date_picker_selected').removeClass('date_picker_selected');
			$(this).addClass('date_picker_selected');

			callback("" + dt.getFullYear() + pad_10(dt.getMonth() + 1) + pad_10($(this).text()),
				$(this).text() + " " + months[dt.getMonth()] + " " + dt.getFullYear());
		});
	}

	// Trigger a click on today's date
	el.find('.date_picker_today').trigger("click");
}

