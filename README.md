Synopsis:
HTML widget to enable user to select a date

Usage/dependencies:
Add jquery, date_picker.css and date_picker.js to HTML page

Then call this:

function date_picker(div, dates, callback)

.. and the element 'div' is replaced with a date_picker widget, with key dates highlighted. The dates parameter should be an object like this: {"20201231": 1, "20201125", 1}
If callback function is supplied, it is called whenever the user selects a date, with 2 arguments like: "20201231", "31 December 2020".
Initially the current date is automatically selected (and the callback function is called).
