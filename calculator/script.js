var grades;
var grade;
var grade_credit = 0;
var tot_grade_credit = 0;
var sgpa;
var allcgpa = [];
var grade_points = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  I: 0,
  F: 0,
  Ab: 0,
  "*": 0,
};

function calc(event) {
  var credits = document.querySelectorAll(".credits");
  grades = document.querySelectorAll(".grades");
  var tot_credit = 0;
  tot_grade_credit = 0;

  for (var i = 0; i < credits.length; i++) {
    var credit = credits[i].value === "" ? 0 : Number(credits[i].value);
    tot_credit += credit;

    var grade = grade_points[grades[i].value];
    tot_grade_credit += grade * credit;
  }

  sgpa = tot_grade_credit / tot_credit;

  if (Number.isNaN(sgpa)) {
    window.alert("Please enter valid credit numbers.");
  } else {
    $("#gpa").removeClass("hidden");
    $("#gpa").html("You obtained a GRADE POINT AVERAGE of : " + sgpa.toFixed(3)+ " ! ") ;
    $("#reset").removeClass("hidden");
    allcgpa.push(sgpa.toFixed(2));
  }

  // Scroll to the top of the page
  window.scrollTo(0, 0);

  // Update GPA fill bar
  var maxGpa = 10; // Assuming the maximum GPA is 10
  var percentage = (sgpa / maxGpa) * 100;
  percentage = Math.min(percentage, 100); // Cap the percentage at 100
  updateGpaFill(percentage);
}

function updateGpaFill(percentage) {
  var gpaFill = document.querySelector('.gpa-bar .gpa-fill');
  gpaFill.style.width = percentage + '%';
}

$("#reset").on("click", () => {
  $("#gpa").addClass("hidden");
  $("#reset").addClass("hidden");
  $(".gpa-fill").css("width", "0");
});

$("#add").on("click", () => {
  var courses = $("table tbody tr").length + 1;

  var newRow =
    "<tr><th scope='row' class='text-neutral-400'>" +
    courses +
    "</th><td><input type='number' class='credits font-sans font-semibold m-5 block shadow rounded focus:outline-none focus:shadow-outline content-center text-center w-[70%] lg:w-[90%]' min='1'></input></td><td> <select class='grades font-sans font-semibold cursor-pointer drop-shadow-md shadow rounded focus:outline-none w-[70%]'><option>O</option><option>A+</option><option>A</option><option>B+</option><option>B</option><option>C</option><option>I</option><option>F</option><option>Ab</option><option>*</option></select></td></tr>";

  $("table tbody").append(newRow);
});

$("#reset").on("click", () => {
  $("#gpa").addClass("hidden");
  $("#reset").addClass("hidden");
});
