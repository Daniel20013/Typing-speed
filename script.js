const start = document.getElementById("start");
const countdownTimer = document.getElementById("countdownTimer");
const textOutput = document.getElementById("textOutput");
const timer = document.querySelector(".timer");
const endTheTest = document.getElementById("endTheTest");
const endOfTheTest = document.querySelector(".endOfTheTest");
const buttonRestart = document.getElementById("restart");
let inputText = document.getElementById("inputText");
let defaultTime = 60;
let time = defaultTime;
countdownTimer.textContent = defaultTime;
let restartTime;
let timerID;
let textForTesting;
let traversedLetters = -1;
let keysPressed = 0;
let correctKeys = 0;
let incorrectKeys = 0;
let writtenWords = 0;
let correctWords = 0;
let incorrectWords = 0;
let forCountingWords = true;
let spans = [];
let allCharacters = [];
const testTexts = [
    "On a clear morning, the sun rises in a picturesque landscape. Golden rays embrace nature in a luminous dance. Birds sing cheerfully in the trees, and flowers unfold their petals in a spectacle of colors. The fresh air carries the scent of grass and damp earth. In the distance, majestic mountains rise, embracing the blue sky. An artesian well sings in the gentle rhythm of the morning, offering a subtle melody to nature. People wake up to life in this harmonious tableau, feeling the simple joy of existence. Each day brings new opportunities, and this day begins with the promise of an adventure full of discoveries.",
    "Amidst the bustling cityscape, neon lights flicker in a kaleidoscope of colors. Skyscrapers reach for the sky, casting long shadows on the crowded streets below. Horns honk, and the rhythmic footsteps of hurried commuters echo through the urban canyon. Street vendors offer an array of tempting aromas, blending into a symphony of diverse cuisines. A lone musician sets up on a street corner, filling the air with soulful tunes. Amidst the chaos, a sense of vitality and energy permeates the atmosphere. The city, a melting pot of cultures and dreams, pulsates with life, embodying the relentless spirit of progress and diversity.",
    "In the serene tranquility of a moonlit night, silver beams cascade through the branches of ancient trees. Shadows dance on the soft forest floor, creating a mystical tableau. The nocturnal symphony of crickets and rustling leaves fills the air with a soothing melody. A gentle breeze carries the sweet scent of blooming flowers as the world sleeps under the watchful gaze of the stars. A distant owl hoots, breaking the silence, adding an enigmatic touch to the night. In this ethereal realm, nature and magic coalesce, inviting contemplation and reflection beneath the celestial canopy. Each rustle tells a story, and the night unfolds its secrets in whispers.",
    "Amidst the vibrant chaos of a bustling market, merchants flaunt their wares in a kaleidoscope of colors. Shouts of vendors haggling blend with the lively chatter of shoppers. Exotic spices waft through the air, creating an olfactory feast. The market's heartbeat quickens as people weave through the labyrinthine alleys, eager to explore hidden treasures. Stalls showcase handcrafted artifacts, textiles, and culinary delights from distant lands. Laughter and the clinking of coins echo, painting a vivacious scene of commerce and community. In this lively tapestry of culture, the market becomes a microcosm of life's rich diversity, a vibrant celebration of human interaction and exchange.",
    "Underneath a vast desert sky, dunes stretch like golden waves frozen in time. The sun paints the landscape in warm hues, casting long shadows across the undulating sand. Mirage-like illusions dance on the horizon, teasing the thirsty traveler. A solitary camel plods steadily, bearing the weight of a nomad navigating the endless sea of grains. The silence is interrupted only by the soft whisper of the wind, carrying with it the secrets of this desolate beauty. As the day wanes, the sky transforms into a canvas of fiery oranges and purples, creating a breathtaking spectacle. In the heart of this arid expanse, nature's raw simplicity commands awe and respect.",
    "In the heart of a dense, ancient forest, sunlight filters through a canopy of emerald leaves. The air is thick with the scent of damp earth and the chorus of unseen creatures. Moss-covered rocks and fallen logs create a natural labyrinth, inviting exploration. Vibrant fungi peek through the undergrowth, adding pops of color to the lush tapestry. A gentle stream meanders through the woodland, its babbling waters harmonizing with the rustle of leaves overhead. The forest, a sanctuary of biodiversity, exudes an enchanting aura, where every step unveils a new wonder. Here, time seems to stand still, and the natural symphony orchestrates a melody that resonates with the soul.",
    "In the heart of a bustling metropolis, skyscrapers pierce the skyline like towering sentinels of progress. Neon lights reflect off the glass facades, creating a vibrant, electric ambiance. The city streets pulse with the rhythm of life as people hurry along, each absorbed in their own narrative. Street vendors offer tantalizing treats, and the distant hum of traffic becomes the urban soundtrack. Amidst the urban jungle, parks provide an oasis of greenery, offering a momentary escape from the concrete embrace. The city, a living mosaic of cultures and aspirations, thrives with an energy that resonates through its streets, a testament to the constant evolution of human ingenuity.",
    "Beneath the sprawling branches of an ancient oak tree, a hidden meadow blooms with wildflowers. Butterflies flit from blossom to blossom, painting the air with delicate hues. The sunlight filters through the leaves, creating a dappled pattern on the soft grass. A babbling brook meanders along the edge of the meadow, offering a soothing soundtrack to the natural symphony. Bees hum in harmony, busily collecting nectar from the blossoms. The air is filled with the sweet fragrance of nature in full bloom. In this tranquil haven, time seems to slow, inviting contemplation and a profound connection with the simplicity and beauty of the natural world.",
    "In the heart of a coastal village, fishing boats bob gently in the harbor, tethered to weathered docks. Seagulls call overhead, their cries mingling with the distant crash of ocean waves. Salt-infused air carries the essence of the sea, as fishermen mend nets and prepare for the day's catch. Quaint cottages, adorned with colorful shutters, line narrow cobblestone streets that wind through the village. The scent of freshly baked bread emanates from a local bakery, enticing passersby. As the sun sets, the horizon becomes a canvas painted in hues of orange and pink, casting a warm glow over the quaint community. Life unfolds at a leisurely pace, embracing the timeless charm of seaside living.",
    "High in the mountainous terrain, a hidden alpine meadow unveils its breathtaking panorama. Towering peaks, adorned with snow-capped crowns, stand sentinel against the azure sky. Edelweiss flowers, delicate and rare, peek through the lush grass, adding a touch of purity to the landscape. The crisp mountain air carries the invigorating scent of pine and the distant melodies of alpine wildlife. A winding trail meanders through the meadow, inviting adventurers to explore the rugged beauty. As the sun bathes the scene in a warm glow, the mountains cast long shadows, creating a captivating interplay of light and shadow. Nature's grandeur unfolds in this secluded haven."
];

function creatingParagraphsEndTest(text, number) {
    let paragraphs = document.createElement("p");
    paragraphs.textContent = text + number;
    endOfTheTest.appendChild(paragraphs);
}

function stopTheTest() {
    if (allCharacters[allCharacters.length - 1] != " " && writtenWords >= 1) {
        countingWords();
        ++writtenWords;
    }
    textOutput.style.display = "none";
    inputText.style.display = "none";
    countdownTimer.style.display = "none";
    endTheTest.style.display = "none";
    endOfTheTest.style.display = "block";
    buttonRestart.style.display = "block";
    let wordsPercentage = (correctWords / writtenWords) * 100;
    let accuracyWords = wordsPercentage.toFixed(2);
    let keysPercentage = (correctKeys / keysPressed) * 100;
    let accuracyKeys = keysPercentage.toFixed(2);
    creatingParagraphsEndTest("Accuracy of pressed keys: ", accuracyKeys);
    creatingParagraphsEndTest("Accuracy of words in percentage: ", accuracyWords);
    creatingParagraphsEndTest("Keys pressed: ", keysPressed);
    creatingParagraphsEndTest("Correct keys: ", correctKeys);
    creatingParagraphsEndTest("Incorrect keys: ", incorrectKeys);
    creatingParagraphsEndTest("Written words: ", writtenWords);
    creatingParagraphsEndTest("Correct words: ", correctWords);
    creatingParagraphsEndTest("Incorrect words: ", incorrectWords);
}

function countingWords() {
    if (forCountingWords === true) {
        ++correctWords;
    } else {
        ++incorrectWords;
    }
}

function stopButton() {
    time = 0;
}

function compareCharacters() {
    if (spans[traversedLetters].textContent === allCharacters[allCharacters.length - 1]) {
        spans[traversedLetters].style.color = "green";
        ++correctKeys;
    } else {
        spans[traversedLetters].style.color = "red";
        ++incorrectKeys;
        forCountingWords = false;
    }
}


inputText.addEventListener("input", function() {
    let inputValue = inputText.value
    let forComparingChar = 2;
    allCharacters = inputValue;
    if ((!(/[a-zA-Z]/g.test(allCharacters[allCharacters.length - 1])) && !(/[a-zA-Z]/g.test(allCharacters[allCharacters.length - forComparingChar])))) {
        inputText.value = "";
        ++writtenWords;
        countingWords();
        forCountingWords = true;
    }
    ++traversedLetters;
    ++keysPressed;
    compareCharacters();
});

document.addEventListener("keydown", function(event) {
    let deleteALetter = 2;
    if (event.key === "Backspace") {
        traversedLetters -= deleteALetter;
    }
});

function textSelection() {
    let indexText;  
    indexText = Math.floor(Math.random() * testTexts.length);
    for (let i = 0; i < testTexts[indexText].length; ++i) {
        spans.push(document.createElement("span"));
        spans[i].textContent = testTexts[indexText][i];
        textOutput.appendChild(spans[i]);
    }
}

function pad(value) {
    const theNamberOfDigits = 2;
    return value.toString().padStart(theNamberOfDigits, "0");
}

function countdownTimerFun() {
    restartTime = time;
    countdownTimer.style.display = "block";
    let forASecond = 1000;
    timerID = setInterval(function() {
        if (time >= 1) {
            --time;
        } else {
            clearInterval(timerID);
            stopTheTest();
        }
        let timePad = pad(time);
        countdownTimer.textContent = timePad;
    }, forASecond);
}

function firstOption() {
    const oneMin = 60;
    countdownTimer.textContent = oneMin + "";
    time = oneMin;
}

function secoundOption() {
    const twoMin = 120;
    countdownTimer.textContent = twoMin + "";
    time = twoMin;
}

function thirdOption() {
    const threeMin = 180;
    countdownTimer.textContent = threeMin + "";
    time = threeMin;
}

function main() {
    timer.style.display = "none";
    start.style.display = "none";
    inputText.style.display = "block";
    inputText.focus();
    textOutput.style.display = "block";
    endTheTest.style.display = "block";
    countdownTimerFun();
    textSelection();
}

function restart() {
    buttonRestart.style.display = "none";
    endOfTheTest.style.display = "none";
    timer.style.display = "block";
    start.style.display = "block";
    time = restartTime;
    traversedLetters = -1;
    keysPressed = 0;
    correctKeys = 0;
    incorrectKeys = 0;
    writtenWords = 0;
    correctWords = 0;
    incorrectWords = 0;
    forCountingWords = true;
    spans = [];
    allCharacters = [];
    textOutput.innerHTML = "";
    endOfTheTest.innerHTML = "";
    inputText.value = "";
    countdownTimer.textContent = restartTime;
}
