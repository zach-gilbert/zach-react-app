import * as React from 'react';
import {generatePassword} from "../Utils/PasswordGenUtil.js";
import wordList from "../Utils/wordlist.txt";

class Password extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wordList: null,
            totalWordList: null,
            password: null,
        }
        this.handleClick = this.handleClick.bind(this)
    }

    /** Initialize components for app  **/
    componentDidMount() {
        this.loadTotalWordList()
    }

    /**
     * Fetches the data from wordlist.txt and loads it into
     * the totalWordList of state.
     *
     * called by: componentDidMount()
     */
    loadTotalWordList() {
        if (this.state.totalWordList === null) {
            fetch(wordList).then((r) => r.text())
                .then((wordListData) => {
                    this.setState({
                        totalWordList: wordListData
                    })
                })
        }
    }

    /** Onclick btn **/
    handleClick() {
        this.selectWords()
    }

    /**
     * Retrieves n number of words from totalWordList and
     * stores them inside an array that is sent to wordList of
     * state
     *
     * called by handeClick()
     */
    selectWords() {
        //let selectedWordsArr = getWords(this.state.totalWordList, 3)
        let selectedWordsArr = generatePassword(this.state.totalWordList, 3, true, false, false)
        this.setState({
            wordList: selectedWordsArr
        })
    }

    render() {
        return (
            <div>
                <h1>Password</h1>
                <h2>wordList = {this.state.wordList}</h2>
                {/* Set click handler */}
                <button onClick={this.handleClick}>
                    Load word array
                </button>
            </div>
        );
    }
}

export default Password;
