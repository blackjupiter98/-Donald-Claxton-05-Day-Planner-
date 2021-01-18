
$(document).ready(function(){

    // Set Date At Top of Screen
    var currentDate;
    
    function setDate() {
        var dateCheck = localStorage.getItem("currentDate");
        currentDate = moment().format("dddd, MMMM Do YYYY");
        if (dateCheck === "" || dateCheck === currentDate) {
            $("#currentDay").text(currentDate);
            localStorage.setItem("currentDate", currentDate);
        } else {
            localStorage.clear();
            $("#currentDay").text(currentDate);
            localStorage.setItem("currentDate", currentDate);
        };
    };
    
    setDate();
    
    // Set Local Storage when Save is Clicked
    $("button.saveBtn").on("click", function() {
        var timeText = $(this).siblings("textarea.description").val();
        var timeID = $(this).siblings("textarea.description").attr("id");
        localStorage.setItem(timeID, timeText);
        currentDate = moment().subtract(1, "days"); // HERE
    });
    
    
    // Set Schedule Text from Local Storage
    for (var i = 8; i < 23; i++) {
        var timeText = localStorage.getItem([i]);
        $("#" + [i]).val(timeText);
    }
    
    // Set Text Background Based on Current Time
    var time = moment().format('HH');
    // console.log(time);
    
    function setColors() {
        for (var j = 8; j < 23; j++) {
    
        var ID = ($("#"+[j]).attr("id"))
        ID = Number(ID);
        $("#" + [j]).removeClass("past present future")
        // console.log(ID);
    
        if (ID < time) {
            $("#" + [j]).addClass("past");
        } else if (ID > time) {
            $("#" + [j]).addClass("future");
        } else if (ID = time) {
            $("#" + [j]).addClass("present");
        } 
      }
    }
    
    setColors();
    
    // Update Info Every 30 Seconds
    setInterval(function() {
        time = moment().format('HH');
        setDate();
        setColors();
    }, 30 * 1000); 
    
    });