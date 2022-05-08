/* Variables to be used to generate a password */
const digits = '0123456789'
const symbols = '!@#$%^&*()-_+=`~[]{},.<>/?'

/* Functions */
/**
 * Chooses n number of words and returns them inside an array
 *
 * @param wordListData all the data residing in wordlist.txt
 * @param numberOfWords the number of words that will be returned
 * @returns {*[]} an array of the words selected at random from the list
 */
function getWords(wordListData, numberOfWords) {
    console.log("getWords() called")
    let selectedWordsArr = [] // Array of selected words
    let word = '' // String of each individual word
    let randomLine = 1 // int of a line to be read
    let selectedNumbers = [] // Array of numbers already selected
    let min = 1 // minimum number of words in txt file
    let max = 4651 // maximum number of words in txt file

    wordListData = wordListData.split("\n") // Split the word by line

    // Iterate the number of words
    for (let i = 0; i < numberOfWords; i++) {
        //TODO: Prevent the same line number from being generated subsequent times
        // issue where it will sometimes still generate a maxmimum of two duplicate
        // numbers... https://codepen.io/finnhvman/pen/oPwXRa
        randomLine = getSecureRandomNumber(min, max) // Generates a random line number

        while (selectedNumbers.includes(randomLine)) {
            randomLine = getSecureRandomNumber(min, max)
        }
        selectedNumbers.push(randomLine)

        word = wordListData[randomLine - 1]
        console.log(word + ' - ' + randomLine)
        selectedWordsArr.push(word) // Push the found word onto the array
    }
    console.log('selectedWordsArr: ' + selectedWordsArr)
    return selectedWordsArr
}

/**
 * Generates a secure random number using window.crypto
 * to be used to select a random line
 * called by: getWords()
 * @returns {number} used to select number line
 */
function getSecureRandomNumber(min, max) {
    min = Math.ceil(min) // first line of wordList.txt
    max = Math.floor(max) // max lines in wordList.txt
    let randomByteArray = new Uint32Array(1)

    window.crypto.getRandomValues(randomByteArray)
    let randomNumber = randomByteArray[0] / (0xffffffff + 1)

    return Math.floor(randomNumber * (max - min + 1)) + min
}

/**
 * capitalizes the first word of a password
 * @param password
 * @returns {string}
 */
function capitalizeWord(password) {
    console.log("capitalizeWord() called")
    let firstWord = password[0]
    password[0] = firstWord.charAt(0).toUpperCase() + firstWord.slice(1)

    return password
}

/**
 * MAIN: generate password utility
 */
export function generatePassword(wordList, numberOfWords, isCapital, isDigit, isSymbol) {
    //TODO: Create a minimum/maximum length feature (working theory: if the generated
    // password is above the given length, regenerate a new password until reaches
    // appropriate parameters)

    let password = null

    password = getWords(wordList, numberOfWords)

    if (isCapital) {
        password = capitalizeWord(password) // Capitalize first word of the password
    }

    if (isDigit) {
        // Add digits to the end of the password
    }

    if (isSymbol) {
        // Add symbols in between the words, if only 1 word add symbol(s) at end after digits
    }

    return password
}

