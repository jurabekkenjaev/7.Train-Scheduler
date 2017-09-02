 // Initialize Firebase
 var config = {
     apiKey: "AIzaSyD9mKAZ_kb_ZYnziMCpa56DUAN-kLmBVHw",
     authDomain: "train-scheduler-ea5b6.firebaseapp.com",
     databaseURL: "https://train-scheduler-ea5b6.firebaseio.com",
     projectId: "train-scheduler-ea5b6",
     storageBucket: "train-scheduler-ea5b6.appspot.com",
     messagingSenderId: "577623599723"
 };
 firebase.initializeApp(config);

 // referencing data base into object
 var dataRef = firebase.database();

 //Creating train variable
 var trainName = "";
 var destination = "";
 var firstTrain = "";
 var frequency = "";

 // Capture Button Click
 $("#submit").on("click", function(event) {
     event.preventDefault();

     trainName = $("#trainName").val().trim();
     destination = $("#destination").val().trim();
     firstTrain = $("#firstTrain").val().trim();
     frequency = $("#frequency").val().trim();

     // Code for the push
     dataRef.ref().push({

         trainName: trainName,
         destination: destination,
         firstTrain: firstTrain,
         frequency: frequency,
     });

     //clear the form fields
     clearForm();
 });

 // Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
 dataRef.ref().on("child_added", function(childSnapshot, prevChildKey) {

        // Log everything that's coming out of snapshot
        console.log(childSnapshot.val().trainName);
        console.log(childSnapshot.val().destination);
        console.log(childSnapshot.val().frequency);
        console.log(childSnapshot.val().firstTrain);

        var name = childSnapshot.val().trainName;
        var destination = childSnapshot.val().destination;
        var first = childSnapshot.val().firstTrain;
        var frequency = childSnapshot.val().frequency;
        var Convertion = moment(first, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(Convertion), "minutes");
        var timeRemainder = diffTime % frequency;
        var minAway = frequency - timeRemainder;
        var nextTrain = moment().add(minAway, "minutes");
        var timeArrival = moment(nextTrain).format("hh:mm a");

      // adding row into the table
        $("#empTable tbody").append("<tr>" 
            + "<td>" + name + "</td>" 
            + "<td>" + destination + "</td>" 
            + "<td>" + frequency + "</td>" 
            + "<td>" + timeArrival + "</td>" 
            + "<td>" + minAway + "</td>" + "</tr>");
     // Handle the errors
 }, function(errorObject) {
     console.log("Errors handled: " + errorObject.code);
 });

 function clearForm() {

     $("#trainName").val("");
     $("#destination").val("");
     $("#firstTrain").val("");
     $("#frequency").val("");
 }

 