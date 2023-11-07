$(function () {
  function generateTimeBlocks() {
    for (var hour = 12; hour <= 17; hour++) {
      var ampm = hour >= 12 ? "PM" : "AM";
      var displayHour = hour > 12 ? hour - 12 : hour;
      var timeBlock = $("<div>").addClass("row time-block").attr("id", "hour-" + hour);
      var hourColumn = $("<div>").addClass("col-2 col-md-1 hour text-center py-3").text(displayHour + ampm);
      var textarea = $("<textarea>").addClass("col-8 col-md-10 description").attr("rows", "3");
      var saveButton = $("<button>").addClass("btn saveBtn col-2 col-md-1").attr("aria-label", "save").html('<i class="fas fa-save" aria-hidden="true"></i>');
      timeBlock.append(hourColumn, textarea, saveButton);
      $("#time-block-container").append(timeBlock);
    }
  }

  generateTimeBlocks();

  $(".saveBtn").on("click", function() {
    var hourId = $(this).closest(".time-block").attr("id");
    var userInput = $(this).siblings(".description").val();
    localStorage.setItem(hourId, userInput);
  });

  function updateHourClasses() {
    var currentHour = dayjs().hour();
    $(".time-block").each(function() {
      var blockHour = parseInt($(this).attr("id").split("-")[1]);
      if (blockHour < currentHour) {
        $(this).removeClass("present future").addClass("past");
      } else if (blockHour === currentHour) {
        $(this).removeClass("past future").addClass("present");
      } else {
        $(this).removeClass("past present").addClass("future");
      }
    });
  }

  function loadUserInput() {
    $(".time-block").each(function() {
      var hourId = $(this).attr("id");
      var userInput = localStorage.getItem(hourId);
      $(this).find(".description").val(userInput);
    });
  }

  function displayCurrentDate() {
    $("#currentDay").text(dayjs().format("MMM D, YYYY  hh:mm"));
  }

  updateHourClasses();
  loadUserInput();
  displayCurrentDate();

  setInterval(updateHourClasses, 60000);
});
