var config = {
    apiKey: "AIzaSyCJdOPSlD08P6LKdEvhnxZnat_bPDktrKQ",
    authDomain: "hsproject-3e79d.firebaseapp.com",
    databaseURL: "https://hsproject-3e79d.firebaseio.com",
    projectId: "hsproject-3e79d",
    storageBucket: "hsproject-3e79d.appspot.com",
    messagingSenderId: "460115286541"
  };
  
  
  firebase.initializeApp(config);
  
  var database = firebase.database();
  
  $("#add-train-btn").on("click", function (event) {
    event.preventDefault();
  
    var TrainName = $("#train-name-input").val().trim();
    var Destination = $("#destination-input").val().trim();
    var FirstTrain = $("#first-train-input").val();
    var Frequency = $("#frequency-input").val().trim();
  
    var schedule = {
      trainName: TrainName,
      destination: Destination,
      firstTrain: FirstTrain,
      frequency: Frequency
    };
  
    database.ref().push(schedule);
  
    console.log(schedule.trainName);
    console.log(schedule.destination);
    console.log(schedule.firstTrain);
    console.log(schedule.frequency);
  
    alert("Sweet! You have added a new train schedule!");
  
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-train-input").val("");
    $("#frequency-input").val("");
  });
  
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
  
    var dbTrainName = childSnapshot.val().trainName;
    var dbDestination = childSnapshot.val().destination;
    var dbFirstTrain = childSnapshot.val().firstTrain;
    var dbFrequency = childSnapshot.val().frequency;
  
    console.log("Train Name: " + dbTrainName);
    console.log("Destination: " + dbDestination);
    console.log("First Train: " + dbFirstTrain);
    console.log("Frequency: " + dbFrequency);
  
    var firstTrainConverted = moment(dbFirstTrain, "HH:mm").subtract(1, "years");
    console.log(firstTrainConverted);
  
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  
    var diffTime = moment().diff(firstTrainConverted, "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
  
    var callRemainder = diffTime % dbFrequency;
    console.log(callRemainder);
  
    var callMinutesTillTrain = dbFrequency - callRemainder;
    console.log("MINUTES TILL Train: " + callMinutesTillTrain);
  
    var callNextTrain = moment().add(callMinutesTillTrain, "minutes");
    var callNextTrainConverted = moment(callNextTrain).format("hh:mm");
    console.log("ARRIVAL TIME: " + callNextTrainConverted);
  
    var newRow = $("<tr>").append(
      $("<td>").text(dbTrainName),
      $("<td>").text(dbDestination),
      $("<td>").text(dbFrequency),
      $("<td>").text(callNextTrainConverted),
      $("<td>").text(callMinutesTillTrain)
    );
  
    $("#train-table > tbody").append(newRow);
  });
  
  