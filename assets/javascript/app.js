var database = firebase.database();
 
 // 2. Button for adding Employees
 $("#add-train-btn").on("click", function(event) {
   event.preventDefault();
 
   // Grabs user input
   var trainName = $("#train-name").val().trim();
   var destination = $("#dest-input").val().trim();
   var tTime = moment($("#start-input").val().trim(), "HH:mm").format("HH:mm");
   var frequency = $("#rate-input").val().trim();
 
   // Creates local "temporary" object for holding employee data
   var newTrain = {
     name: trainName,
     role: destination,
     start: tTime,
     rate: frequency
   };
 
   // Uploads employee data to the database
   database.ref().push(newTrain);
 
   // Logs everything to console
   console.log(newTrain.name);
   console.log(newTrain.role);
   console.log(newTrain.start);
   console.log(newTrain.rate);

 
   // Clears all of the text-boxes
   $("#train-name").val("");
   $("#dest-input").val("");
   $("#start-input").val("");
   $("#rate-input").val("");
 
 });
 
 // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
 database.ref().on("child_added", function(childSnapshot, prevChildKey) {
 
   console.log(childSnapshot.val());
 
   // Store everything into a variable.
   var trainName = childSnapshot.val().name;
   var destination = childSnapshot.val().role;
   var tTime = childSnapshot.val().start;
   var frequency = childSnapshot.val().rate;
 
   // Employee Info
   console.log(trainName);
   console.log(destination);
   console.log(tTime);
   console.log(frequency);
 

   var trainStart = moment(tTime, "HH:mm").format("HH:mm");
 
   var nextTrain = moment().diff(moment(tTime, "HH:mm"), "minutes");
   nextTrain = nextTrain%frequency;
   
   var nextArrival = moment().add(nextTrain,"minutes").format("HH:mm");
   console.log(nextTrain);


 
   // Add each train's data into the table
   $("#employee-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
   frequency + "</td><td>" + nextArrival + "</td><td>" + nextTrain + "</td><td>");
 });