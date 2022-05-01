/* Variables to be used to generate a password */
const digits = '0123456789'
const symbols = '!@#$%^&*()-_+=`~[]{},.<>/?'

/* Functions */
export function getWords(wordListData, numberOfWords) {
    console.log("getWords() called")
    let selectedWordsArr = [] // Array of selected words
    let word = '' // String of each individual word
    let randomLine = 1 // int of a line to be read

    //console.log('getWords(), wordListData = ' + wordListData)
    wordListData = wordListData.split("\n") // Split the word by line

    // Iterate the number of words
    for (let i = 0; i < numberOfWords; i++) {
        //TODO: Prevent the same line number from being generated subsequent times
        randomLine = getSecureRandomNumber() // Generates a random line number
        word = wordListData[randomLine - 1]
        console.log(word + ' ' + randomLine)
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
function getSecureRandomNumber() {
    let min = Math.ceil(1) // first line of wordList.txt
    let max = Math.floor(4651) // max lines in wordList.txt
    let randomByteArray = new Uint32Array(1)

    window.crypto.getRandomValues(randomByteArray)
    let randomNumber = randomByteArray[0] / (0xffffffff + 1)

    return Math.floor(randomNumber * (max - min + 1)) + min
}

/**
 * capitalizes the first word of a string
 * @param string
 * @returns {string}
 */
function capitalizeWord(string) {
    console.log("capitalizeWord() called")
    return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * MAIN: generate password utility
 */
export function generatePassword() {
    //TODO: Create a minimum/maximum length feature (working theory: if the generated
    // password is above the given length, regenerate a new password until reaches
    // appropriate parameters)
    // read and store the array of wordList here

}

