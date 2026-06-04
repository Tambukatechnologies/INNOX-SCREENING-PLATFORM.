// Function to sound the alarm for a successful verification pass
function playSuccessAlarm() {
    var successAudio = document.getElementById("successSound");
    successAudio.volume = 0.5; // Sets volume to 50%
    successAudio.play().catch(function(error) {
        console.log("Audio playback blocked by browser settings until user interacts.");
    });
}

// Function to sound the alarm for an age mismatch or identity fraud block
function playDangerAlarm() {
    var dangerAudio = document.getElementById("failSound");
    dangerAudio.volume = 0.8; // Sets warning volume slightly louder
    dangerAudio.play().catch(function(error) {
        console.log("Audio playback blocked by browser settings until user interacts.");
    });
}
