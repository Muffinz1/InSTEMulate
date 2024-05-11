// JavaScript code for music functionality
let backgroundMusic = document.getElementById('backgroundMusic');
let isPlaying = true; // Initially set to true

// Array of music filenames
let musicFiles = ['song1.mp3', 'song2.mp3', 'song3.mp3', 'song4.mp3'];

// Function to play random music
function playRandomMusic() {
    let randomIndex = Math.floor(Math.random() * musicFiles.length);
    let randomMusicFile = 'music/' + musicFiles[randomIndex];
    backgroundMusic.src = randomMusicFile;
    backgroundMusic.play();
}

// Function to toggle music playback
function toggleMusic() {
    if (isPlaying) { // If music is currently playing, pause it
        backgroundMusic.pause();
        isPlaying = false; // Update the status to false
    } else { // If music is not playing, play it
        backgroundMusic.play();
        isPlaying = true; // Update the status to true
    }
}

// Call playRandomMusic function when the page loads
window.addEventListener('load', function() {
    playRandomMusic();
});

// Function to toggle music playback when the button is clicked
document.getElementById('toggleButton').addEventListener('click', function() {
    toggleMusic();
});
