/**
 * Chooses n number of words and returns them inside an array
 *
 * @param wordListData all the data residing in wordlist.txt
 * @param numberOfWords the number of words that will be returned
 * @returns {*[]} an array of the words selected at random from the list
 */
function getWords(wordListData, numberOfWords) {
    let selectedWordsArr = [] // Array of selected words
    let word = '' // String of each individual word
    let randomLine = 1 // int of a line to be read
    let selectedNumbers = [] // Array of numbers already selected
    let min = 1 // minimum number of words in txt file
    let max = 4658 // maximum number of words in txt file

    wordListData = wordListData.split("\n") // Split the word by line

    // Iterate the number of words
    for (let i = 0; i < numberOfWords; i++) {
        // TODO: Prevent the same line number from being generated subsequent times
        // issue where it will sometimes still generate a maximum of two duplicate
        // numbers... https://codepen.io/finnhvman/pen/oPwXRa
        randomLine = getSecureRandomNumber(min, max) // Generates a random line number

        while (selectedNumbers.includes(randomLine)) {
            randomLine = getSecureRandomNumber(min, max)
        }
        selectedNumbers.push(randomLine)

        word = wordListData[randomLine - 1] // select word from array of words
        selectedWordsArr.push(word) // Push the found word onto the array
    }

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
 * Capitalizes the first letter of each word within the password
 * @param password
 * @returns {string}
 */
function capitalizeWord(password) {
    console.log("capitalizeWord() called")

    let word = null
    for (let i = 0; i < password.length; i++) {
        word = password[i]
        password[i] = word.charAt(0).toUpperCase() + word.slice(1)
    }

    return password
}

/**
 * Adds digits to the end of the password and returns
 *
 * called by generatePassword()
 *
 * @param password
 * @returns {string}
 */
function addDigits(password) {
    console.log("addDigits() called")
    let digits = ''
    let numberOfDigits = getSecureRandomNumber(1, 3)

    // Generate random numbers and append them to a string
    for (let i = 0; i < numberOfDigits; i++) {
        digits += getSecureRandomNumber(0, 9)
    }

    return password + digits
}

/**
 * Returns password with a random symbol appended
 * at the end of it
 *
 * called by generatePassword()
 *
 * @param password
 * @returns {string}
 */
function addSymbol(password) {
    console.log("addSymbol() called")
    const symbols = '!@#$%^&*.?+=_-'
    const symbolsLength = symbols.length

    let symbol = symbols.charAt(getSecureRandomNumber(0, symbolsLength - 1))

    return password + symbol
}

/**
 * Ensures the words within the password are all lowercase as
 * some of the words contained capitals inside wordlist.txt
 *
 * @param password the password object
 * @returns {*}
 */
function makeLowerCase(password) {
    for (let i = 0; i < password.length; i++) {
        password[i] = password[i].toString().toLowerCase()
    }
    return password
}

/**
 * MAIN: generate password utility
 */
export function generatePassword(wordList, numberOfWords, boolCapital, boolDigit, boolSymbol) {
    console.log("generatePassword() called")

    //TODO: add a jumble checkbox/function to create a more randomized password if user wants it (ZANY)
    //TODO: add word # select box

    let password = getWords(wordList, numberOfWords) // Fetches random words for the password

    password = makeLowerCase(password) // Ensures password is lowercase (some words were capitalized inside wordlist.txt)

    if (boolCapital) {
        password = capitalizeWord(password) // Capitalize first word of the password
    }

    if (boolDigit) {
        password = addDigits(password) // Add digits to the end of the password
    }

    if (boolSymbol) {
        password = addSymbol(password) // Add symbols in between the words, if only 1 word add symbol(s) at end after digits
    }

    /* Final processing for password */
    password = password
        .toString()
        .replaceAll('\r', '')
        .replaceAll(',', '')

    return password
}

