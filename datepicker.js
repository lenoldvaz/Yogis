function calculateDefaultStartDate() {
    const currentDate = new Date();
    const twoDaysAhead = new Date(currentDate);
    
    // Calculate the date two days ahead
    twoDaysAhead.setDate(currentDate.getDate() + 2);

    // Check if the calculated date is Saturday (day of the week is 6) or Sunday (day of the week is 0)
    if (twoDaysAhead.getDay() === 6) { // Saturday
        twoDaysAhead.setDate(twoDaysAhead.getDate() + 2); // Skip to Monday
    } else if (twoDaysAhead.getDay() === 0) { // Sunday
        twoDaysAhead.setDate(twoDaysAhead.getDate() + 1); // Skip to Monday
    }

    // Format the date as "MM-DD-YYYY"
    const formattedDate = `${twoDaysAhead.getDate()}-${twoDaysAhead.getMonth() + 1}-${twoDaysAhead.getFullYear()}`;
    console.log('date',formattedDate)
    return formattedDate;
   
}

$(document).ready(function () {
    console.log('datepicker active')
    // Call the function to get the default_startDate
    const default_startDate = calculateDefaultStartDate();
    
    $('[data-toggle="datepicker"]').datepicker({
        format: 'dd-mm-yyyy',
        date: default_startDate,
        startDate: default_startDate
    });


     // Attach an event listener to update the input field on date change
$('[data-toggle="datepicker"]').on('pick.datepicker', function (e) {
   
    console.log('date changed');
    // Get the selected date and update the input field
    const selectedDate = e.date;
    $('[data-toggle="datepicker"]').datepicker('setDate', selectedDate);
    console.log('selectedDate', selectedDate);
    $('#selectedDateInput').val(selectedDate);

});

    // Available date placeholders:
    // Year: yyyy
    // Month: mm
    // Day: dd
    if (window.innerWidth < 768) {
        $('[data-toggle="datepicker"]').attr('readonly', 'readonly')
    }
});
