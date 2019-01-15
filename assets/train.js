$(document).ready (function () {

// Initial Values
var trainName = "";
var destination = "";
var frequency = 0;
var nextArrival = 0;
var minsAway = 0;



// Initialize Firebase
var config = {
    apiKey: "AIzaSyC4E6whnBnD6QcP3S75Jhd8QJjI0B0Wimo",
    authDomain: "train-time-f046d.firebaseapp.com",
    databaseURL: "https://train-time-f046d.firebaseio.com",
    projectId: "train-time-f046d",
    storageBucket: "train-time-f046d.appspot.com",
    messagingSenderId: "949981272100"
  };
 

    firebase.initializeApp(config);

    // Convenience of setting firebase database
    var database = firebase.database();


database.ref().on("child_added", function(childSnapshot){
    childSnapshot.val();
    console.log(childSnapshot.val());
    trainName = childSnapshot.val().trainName;
    console.log(trainName);
    destination = childSnapshot.val().destination;
    console.log(destination);
    frequency = childSnapshot.val().frequency;
    console.log(frequency);
    minsAway = childSnapshot.val().minsAway;
    console.log(minsAway);


   
    var nextArrival = moment().add(frequencies, "minutes").format("hh:mm A");
    console.log(nextArrival);



    // Creates TRs to the table
    tableRow = $("<tr>");

    // Creates TDs to the TRs
    trainNameTD = $("<td>");
    destinationTD = $("<td>");
    frequencyTD = $("<td>");
    nextArrivalTD = $("<td>");
    minsAwayTD = $("<td>");
  

    $("tbody").append(tableRow);

    //This creates TDs to the tbody
    tableRow.append(trainNameTD);
    tableRow.append(destinationTD);
    tableRow.append(frequencyTD);
    tableRow.append(nextArrivalTD);
    tableRow.append(minsAwayTD);
   

    //This displays the data to the page
    trainNameTD.append(trainName);
    destinationTD.append(destination);
    frequencyTD.append(frequency);
    nextArrivalTD.append(nextArrival);
    minsAwayTD.append(minsAway);
    

}, function(errorObject){
    console.log("Errors handled: " + errorObject.code);
});



$("#submit").on("click", function(event) {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    $("#train-name").val("");
    console.log(trainName);
    destination = $("#destination").val().trim();
    $("#destination").val("");
    console.log(destination);
    frequency = $("#frequency").val().trim();
    $("#frequency").val("");
    console.log(frequency);
    minsAway = $("#minutes-away").val();
    $("#minutes away").val("");
    console.log(minsAway);

    database.ref().push({
        // Create the keys and values
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        minsAway: minsAway,
        
    });    

});
})
