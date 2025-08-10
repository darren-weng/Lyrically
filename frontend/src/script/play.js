// adds Youtube iframe api
const tag = document.createElement("script");
tag.id = "iframe-script";
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// loads api constructor
let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("audio-player", {
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
}

let timestampTracker;
function onPlayerReady(event) {
  timestampTracker = setInterval(selectLyricsLine, 10);
  // event.target.setPlaybackRate(0.4);
}

function onPlayerStateChange(event) {
  // console.log("time: " + event.target.getCurrentTime());
}

// ****************************** FUNCTIONS ******************************
// variable to skip to beginning of song
let skipToBeginning = false; 

function selectLyricsLine() {
  let currTime = player.getCurrentTime();
  let lyricsElements = document.getElementById("lyrics-container").children;
  let selectedLine;
  let selectedIndex = -1;

  const charInput = document.getElementById("charInput");


  // gets index of selected line
  for (let i = 0; i < lyricsElements.length; ++i) {
    if (lyricsElements[i].id == "selected") {
      selectedLine = lyricsElements[i];
      selectedIndex = i;
    }
  }

  // sets selected line if none
  //? come back to this and make it so it shows no lyrics and allows for users to skip
    function spaceHandler(event) {
      if (selectedIndex == -1 && skipToBeginning == false && event.key === " ") {
        event.preventDefault();
        skipToBeginning = true;
        player.seekTo(timestamps[0] - (timestamps[0] / 8), true);
        }
      else {
          charInput.removeEventListener("keydown", spaceHandler);
      }
    }
    charInput.addEventListener("keydown", spaceHandler);
  
  if (selectedIndex == -1) {
    selectedLine = lyricsElements[lyricsElements.length - 1];
    // console.log(lyricsElements[0]);
    selectedLine.classList.remove("hidden");
    // selectedLine.id = "selected";
    selectedIndex = -1;
  }

  // stops timestamp tracker if video completed
  if (
    currTime >= player.getDuration() ||
    selectedIndex >= timestamps.length - 1 ||
    selectedIndex >= lyricsElements.length - 1
  ) {
    clearInterval(timestampTracker);
    return;
  }

  // selects next line if timestamp met
  if (currTime >= timestamps[selectedIndex + 1]) {
    selectedLine.classList.add("hidden");
    selectedLine.id = "";

    lyricsElements[selectedIndex + 1].classList.remove("hidden");
    lyricsElements[selectedIndex + 1].id = "selected";
    ++selectedIndex;
  }
}