// scroll to top

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

Splitting();

// scroll start
const headline = document.getElementById("headline");
const scrollSpeed = 12; // Adjust this value to change the scroll speed

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const totalScrollableHeight = document.body.offsetHeight - window.innerHeight;
  const variationRange = 45; // The range of variation in the font settings
  const variationStart = 0; // The starting value of the font variation

  // Calculate the current font variation setting based on scroll position
  const variationValue =
    ((scrollPosition * scrollSpeed) / totalScrollableHeight) * variationRange +
    variationStart;

  headline.style["font-variation-settings"] = `'YYYY' ${variationValue.toFixed(
    2
  )}`;
});
// scroll end

// Slider strat
const outputSize = document.getElementById("slider-size__value");
const outputX = document.getElementById("slider-XXXX__value");
const outputY = document.getElementById("slider-YYYY__value");

const inputText = document.getElementById("input-text__id");
const inputContainer = document.getElementById("text-container");

let XXXX = 0;
let YYYY = 0;

// Function to update the font variation settings
function updateFontSettings() {
  const fontSettings = `'XXXX' ${XXXX.toFixed(0)}, 'YYYY' ${YYYY.toFixed(0)}`;
  inputText.style["font-variation-settings"] = fontSettings;
}

// X (XXXX) variation slider
const sliderX = document.getElementById("slider-XXXX");
sliderX.min = -45;
sliderX.max = 45;
sliderX.value = XXXX;
outputX.innerHTML = XXXX.toFixed(0);
sliderX.style.direction = "rtl"; // Set slider direction to right-to-left
sliderX.oninput = function () {
  XXXX = -parseFloat(this.value); // Negate the value to get the desired range (-45 to 45)
  outputX.innerHTML = XXXX.toFixed(0);
  updateFontSettings();
};

// Y (YYYY) variation slider
const sliderY = document.getElementById("slider-YYYY");
sliderY.min = -45;
sliderY.max = 45;
sliderY.value = YYYY;
outputY.innerHTML = YYYY.toFixed(0);
sliderY.style.direction = "rtl"; // Set slider direction to right-to-left
sliderY.oninput = function () {
  YYYY = -parseFloat(this.value); // Negate the value to get the desired range (-45 to 45)
  outputY.innerHTML = YYYY.toFixed(0);
  updateFontSettings();
};

// Update the text container height
function updateTextContainerHeight() {
  const inputTextHeight = inputText.offsetHeight;
  inputContainer.style.height = `${inputTextHeight}px`;
}

// Call the function initially and whenever the font variation settings change
updateTextContainerHeight();
sliderX.oninput = function () {
  XXXX = -parseFloat(this.value); // Negate the value to get the desired range (-45 to 45)
  outputX.innerHTML = XXXX.toFixed(0);
  updateFontSettings();
  updateTextContainerHeight();
};
sliderY.oninput = function () {
  YYYY = -parseFloat(this.value); // Negate the value to get the desired range (-45 to 45)
  outputY.innerHTML = YYYY.toFixed(0);
  updateFontSettings();
  updateTextContainerHeight();
};
// Slider end

// transform - hover start
const container = document.getElementById("transform__container");
const title = document.getElementById("title");
const containerWidth = container.offsetWidth;
const containerHeight = container.offsetHeight;

console.log("containerWidth", containerWidth);
console.log("containerHeight", containerHeight);

const xCurrentPositionLabel = document.getElementById("axis-x-position");
const yCurrentPositionLabel = document.getElementById("axis-y-position");

container.addEventListener("mousemove", (e) => {
  const containerRect = container.getBoundingClientRect();
  const x = ((e.clientX - containerRect.left) / containerWidth) * 90 - 45;

  const y = 45 - ((e.clientY - containerRect.top) / containerHeight) * 90;

  // console.log("x", x);
  // console.log("y", y);

  xCurrentPositionLabel.innerHTML = `X${x.toFixed(2)}`;
  yCurrentPositionLabel.innerHTML = `Y${y.toFixed(2)}`;

  title.style.fontVariationSettings = `'YYYY' ${y}, 'XXXX' ${x}`;
});

container.addEventListener("touchmove", (e) => {
  const containerRect = container.getBoundingClientRect();
  const x =
    ((e.touches[0].clientX - containerRect.left) / containerWidth) * 90 - 45;

  const y =
    45 - ((e.touches[0].clientY - containerRect.top) / containerHeight) * 90;

  // console.log("x", x);
  // console.log("y", y);

  xCurrentPositionLabel.innerHTML = `X${x.toFixed(2)}`;
  yCurrentPositionLabel.innerHTML = `Y${y.toFixed(2)}`;

  title.style.fontVariationSettings = `'YYYY' ${y}, 'XXXX' ${x}`;
});
// transform - hover end

// table hover start
const tdElements = document.querySelectorAll("td");
const contentContainer = document.getElementById("content");

// Add event listener to each td element
tdElements.forEach((td) => {
  td.addEventListener("mouseover", () => {
    const content = td.textContent; // Get the content of the hovered cell
    contentContainer.textContent = content; // Update the content of the container
  });

  td.addEventListener("mouseout", () => {
    contentContainer.textContent = ""; // Clear the content of the container when mouseout
  });
});
// table hover end

// hovering__container start
const mouseMove = (e) => {
  const chars = document.querySelectorAll("nav a .char");

  [...chars].forEach((char) => {
    const position = char.getBoundingClientRect();
    const x = position.left + position.width / 2;
    const y = position.top + position.height / 2;

    const distanceX = Math.abs(e.clientX - x);
    const distanceY = Math.abs(e.clientY - y);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const maxDistance = 120;
    const maxVariation = 45;
    const minVariation = 0;

    if (distance > maxDistance) {
      char.style[
        "font-variation-settings"
      ] = `'XXXX' ${minVariation}, 'YYYY' ${minVariation}`;
    } else {
      const variation =
        minVariation +
        ((maxDistance - distance) * (maxVariation - minVariation)) /
          maxDistance;
      char.style[
        "font-variation-settings"
      ] = `'XXXX' ${variation}, 'YYYY' ${variation}`;
    }
  });
};

document.onmousemove = mouseMove;

const touchMove = (e) => {
  const chars = document.querySelectorAll("nav a .char");

  [...chars].forEach((char) => {
    const position = char.getBoundingClientRect();
    const x = position.left + position.width / 2;
    const y = position.top + position.height / 2;

    const distanceX = Math.abs(e.touches[0].clientX - x);
    const distanceY = Math.abs(e.touches[0].clientY - y);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const maxDistance = 100;
    const maxVariation = 45;
    const minVariation = 0;

    if (distance > maxDistance) {
      char.style[
        "font-variation-settings"
      ] = `'XXXX' ${minVariation}, 'YYYY' ${minVariation}`;
    } else {
      const variation =
        minVariation +
        ((maxDistance - distance) * (maxVariation - minVariation)) /
          maxDistance;
      char.style[
        "font-variation-settings"
      ] = `'XXXX' ${variation}, 'YYYY' ${variation}`;
    }
  });
};

document.ontouchmove = touchMove;

// hovering__container end

// strip start
const updateVariationSettings = () => {
  const chars = document.querySelectorAll("section .group .row span");

  const maxVariation = 45;
  const minVariation = -45;
  const screenWidth = window.innerWidth;

  [...chars].forEach((char) => {
    const position = char.getBoundingClientRect();
    const distanceToScreenCenter =
      position.left + position.width / 2 - screenWidth / 2;

    let variation;
    if (distanceToScreenCenter < 0) {
      variation =
        (Math.abs(distanceToScreenCenter) / (screenWidth / 2)) * minVariation;
    } else {
      variation = (distanceToScreenCenter / (screenWidth / 2)) * maxVariation;
    }

    char.style.setProperty("font-variation-settings", `'XXXX' ${variation}`);
  });
};

const animateVariationSettings = () => {
  let animationFrame;

  const animate = () => {
    updateVariationSettings();

    // Schedule next frame
    animationFrame = requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationFrame);
    animate();
  });
};

animateVariationSettings();

// strip end

// toggle start
function toggleFont() {
  document.body.classList.toggle("switch-fonts");
}
// toggle end

// sound react start

// Audio code from Ruth's Demo!! - https://codepen.io/Rumyra/pen/jomXeG
console.clear();
// create audio context and make sure it gets activated
const audioCtx = new AudioContext();
let data = new Uint8Array(2);
let isAudioStarted = false;

// create analyser
const analyserNode = new AnalyserNode(audioCtx, {
  fftSize: 64,
  maxDecibels: -20,
  minDecibels: -60,
  smoothingTimeConstant: 0.8,
});

function getAnalyserData() {
  requestAnimationFrame(getAnalyserData);
  analyserNode.getByteFrequencyData(data);

  const minAxisValue = 7.5;
  const maxAxisValue = 30;
  const minEventValue = 0;
  const maxEventValue = 255;
  const smoothFactor = 0.4; // Adjust this value to control the smoothness of the transition

  // Get the current event values for XXXX and YYYY
  const element = document.querySelector(".custom-text");
  const currentEventValueX = data[0];
  const currentEventValueY = data[1];
  const currentAxisValueX = parseFloat(
    getComputedStyle(element).getPropertyValue("--XXXX")
  );
  const currentAxisValueY = parseFloat(
    getComputedStyle(element).getPropertyValue("--YYYY")
  );

  let newAxisValueX, newAxisValueY;
  if (currentEventValueX === 0) {
    newAxisValueX = 7.5;
  } else {
    const eventPercentX =
      (currentEventValueX - minEventValue) / (maxEventValue - minEventValue);
    const targetAxisValueX =
      eventPercentX * (maxAxisValue - minAxisValue) + minAxisValue;
    newAxisValueX =
      currentAxisValueX + (targetAxisValueX - currentAxisValueX) * smoothFactor;
  }

  if (currentEventValueY === 0) {
    newAxisValueY = 7.5;
  } else {
    const eventPercentY =
      (currentEventValueY - minEventValue) / (maxEventValue - minEventValue);
    const targetAxisValueY =
      eventPercentY * (maxAxisValue - minAxisValue) + minAxisValue;
    newAxisValueY =
      currentAxisValueY + (targetAxisValueY - currentAxisValueY) * smoothFactor;
  }

  element.style.setProperty("--XXXX", newAxisValueX);
  element.style.setProperty("--YYYY", newAxisValueY);
}

function getStreamData() {
  // pipe in analysing to getUserMedia
  return navigator.mediaDevices
    .getUserMedia({ audio: true, video: false })
    .then((stream) => audioCtx.createMediaStreamSource(stream))
    .then((source) => {
      source.connect(analyserNode);
    });
}

function handleFocusEvent() {
  if (!isAudioStarted) {
    audioCtx.resume();
    getStreamData().then(getAnalyserData);
    isAudioStarted = true;
  }
}

const textElement = document.querySelector(".custom-text");
textElement.addEventListener("focus", handleFocusEvent);

// sound react end

const textContainer = document.getElementById("tipaContainer");
const text = textContainer.innerHTML.trim();

let isFlipped = false; // Variable to track the flip state

let html = "";
for (let i = 0; i < text.length; i++) {
  const angleX = isFlipped
    ? -45 + i * (90 / (text.length - 1))
    : 45 - i * (90 / (text.length - 1));
  const angleY = isFlipped
    ? -45 + i * (90 / (text.length - 1))
    : 45 - i * (90 / (text.length - 1));
  html += `<span class="letter" style="font-variation-settings: 'XXXX' ${angleX.toFixed(
    3
  )}, 'YYYY' ${angleY.toFixed(3)};">${text[i]}</span>`;
}

textContainer.innerHTML = html;

textContainer.addEventListener("click", function () {
  isFlipped = !isFlipped; // Toggle the flip state

  const letters = textContainer.getElementsByClassName("letter");
  for (let i = 0; i < letters.length; i++) {
    const angleX = isFlipped
      ? -45 + i * (90 / (text.length - 1))
      : 45 - i * (90 / (text.length - 1));
    const angleY = isFlipped
      ? -45 + i * (90 / (text.length - 1))
      : 45 - i * (90 / (text.length - 1));
    letters[i].style.fontVariationSettings = `'XXXX' ${angleX.toFixed(
      3
    )}, 'YYYY' ${angleY.toFixed(3)}`;
  }
});

// Create an object to map keys to frequencies and variation settings
const noteMap = {
  keyC: { frequency: 261.63, variation: "C", audio: "sounds/keyC.m4a" },
  keyD: { frequency: 293.66, variation: "D", audio: "sounds/keyD.m4a" },
  keyE: { frequency: 329.63, variation: "E", audio: "sounds/keyE.m4a" },
  keyF: { frequency: 349.23, variation: "F", audio: "sounds/keyF.m4a" },
  keyG: { frequency: 392.0, variation: "G", audio: "sounds/keyG.m4a" },
  keyA: { frequency: 440.0, variation: "A", audio: "sounds/keyA.m4a" },
  keyB: { frequency: 493.88, variation: "B", audio: "sounds/keyB.m4a" },
};

// Initialize the Web Audio API context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Function to load and play a piano note
async function loadAndPlayPianoNote(freq, variation, audioPath) {
  try {
    const response = await fetch(audioPath);
    const arrayBuffer = await response.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    source.start();
  } catch (error) {
    console.error("Error loading audio:", error);
  }

  // Change the font variation setting after playing the note
  const pianoKey = document.getElementById("key" + variation);
  pianoKey.classList.add("variation-change");
  setTimeout(() => {
    pianoKey.classList.remove("variation-change");
  }, 250);
}

// Add click event listeners to each piano key
const pianoKeys = document.querySelectorAll(".piano-key");
pianoKeys.forEach((key) => {
  key.addEventListener("click", async () => {
    const { frequency, variation, audio } = noteMap[key.id];
    await loadAndPlayPianoNote(frequency, variation, audio);
  });
});
