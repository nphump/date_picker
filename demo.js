
$(function()
{
	date_picker($('#date_picker_div'), {"20201108": 1}, function(date1, date2)
	{
		results_div = $('#results_div');
		results_div.empty();
		results_div.append("User selected " + date1 + " (" + date2 + ")");
	});
});

