// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed


// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyD2YtMObtfAdpyLhM61hTMKJWxXz8447uo",
    authDomain: "train-schedule-ad893.firebaseapp.com",
    databaseURL: "https://train-schedule-ad893.firebaseio.com",
    projectId: "train-schedule-ad893",
    storageBucket: "train-schedule-ad893.appspot.com",
    messagingSenderId: "795390121416",
    appId: "1:795390121416:web:822c43a355432562c11cfd",
    measurementId: "G-JYHR7FHFX1"
  };
  
  firebase.initializeApp(config);
  
  var database = firebase.database();

  // 2. Button for adding Employees
$("#record-btn").on("click", function(event) {
    event.preventDefault();
  
    // Grabs user input
    var train = $("#train-name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrainT = $("#ftt-input").val().trim();
    var frequency = $("#train-frequency-input").val().trim();

 // Creates local "temporary" object for holding employee data
 var trainSch = {
    name: train,
    dest: destination,
    firstTT: firstTrainT,
    frequency: frequency
  };
    // Uploads employee data to the database
    database.ref().push(trainSch);

    // Logs everything to console
    console.log(trainSch.name);
    console.log(trainSch.dest);
    console.log(trainSch.firstTT);
    console.log(trainSch.frequency);
  
    alert("You got a new train");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#ftt-input").val("");
    $("#train-frequency-input").val("");
  });

  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var train = childSnapshot.val().name;
    var destination = childSnapshot.val().dest;
    var firstTrainT = childSnapshot.val().firstTT;
    var frequency = childSnapshot.val().frequency;

    // Employee Info
  console.log(train);
  console.log(destination);
  console.log(firstTrainT);
  console.log(frequency);



   // Prettify the employee start
   var nextTrain = moment.unix(empStart).format("MM/DD/YYYY");

   // Calculate the months worked using hardcore math
   // To calculate the months worked
   var empMonths = moment().diff(moment(empStart, "X"), "months");
   console.log(empMonths);
 
   // Calculate the total billed rate
   var empBilled = empMonths * empRate;
   console.log(empBilled);
 
   // Create the new row
   var newRow = $("<tr>").append(
     $("<td>").text(empName),
     $("<td>").text(empRole),
     $("<td>").text(empStartPretty),
     $("<td>").text(empMonths),
     $("<td>").text(empRate),
     $("<td>").text(empBilled)
   );
 
   // Append the new row to the table
   $("#employee-table > tbody").append(newRow);
 });
    

  