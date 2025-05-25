function giveWord() {
    fetch('/assets/dictionary/wordDict.txt')
        .then(response => response.text())
        .then(text => {
            const words = text.split('\n');
            const randomWord = words[Math.floor(Math.random() * words.length)].split(',');
            document.getElementById("emoji").innerHTML = randomWord[0];
            document.getElementById("word").innerHTML = randomWord[1];

            document.querySelectorAll('.fade').forEach(el => el.classList.add('show'));
        })
        .catch(error => console.error('Error fetching the word:', error));
}

function backgroundCorrect(ans) {
    if (ans == true) {
        document.body.classList.add("correct");
    } else {
        document.body.classList.add("false");
    }

    setTimeout(() => {
        document.body.classList.remove("correct", "false");
    }, 1000);
}

function checkWord() {
    fetch('/assets/dictionary/phonetics.txt')
        .then(response => response.text())
        .then(text => {
            const phonetics = text.split('\n');
            var inputWord = document.getElementById("answer").value.toLowerCase();
            const randomWord = document.getElementById("word").innerHTML.toLowerCase().split('');
            var correctCounter = 0;

            if (inputWord.split(' ').length == randomWord.length) {
                for (let o = 0; o < inputWord.split(' ').length; o++) {
                    for (let i = 0; i < phonetics.length; i++) {
                        if (inputWord.split(' ')[o] == phonetics[i].split(',')[1].toLowerCase() && randomWord[o] == phonetics[i].split(',')[0].toLowerCase()) {
                            correctCounter++;
                        }
                    }
                }
            }

            if (correctCounter == randomWord.length) {
                backgroundCorrect(true);
                giveWord();
                inputWord = document.getElementById("answer").value = '';
            } else {
                backgroundCorrect(false);
            }

        })
}

giveWord();