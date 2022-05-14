import * as React from 'react';
import {generatePassword} from "../utils/PasswordGenUtil.js";
import wordList from "../utils/wordlist.txt";
import {Button, Checkbox, FormControlLabel, FormGroup, FormLabel, IconButton, TextField} from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Tooltip from '@mui/material/Tooltip';

class PasswordGen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            totalWordList: null, // array of all words
            password: '', // password
            boolCapital: false, // boolean to add capitals
            boolDigit: false, // boolean to add digits
            boolSymbol: false, // boolean to add symbols
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
        if (this.state.totalWordList === null || this.state.totalWordList === undefined) {
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
        let selectedWordsArr = generatePassword(this.state.totalWordList, 3,
            this.state.boolCapital, this.state.boolDigit, this.state.boolSymbol)

        this.setState({
            password: selectedWordsArr
        })
    }

    /**
     * Render function for PasswordGen.js
     *
     * @returns {JSX.Element}
     */
    render() {
        return (
            <div>
                {/* Title */}
                <h1>Password</h1>

                {/* PasswordGen output */}
                {/* TODO: Increase minimum size of password, dynamically resize depending on length */}
                <h2>Password = {this.state.password}</h2>
                <TextField
                    value={this.state.password}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                {/* Copy to clipboard icon button */}
                <Tooltip title="Copy to clipboard">
                    <IconButton
                        size="large"
                        onClick={() => {navigator.clipboard.writeText(this.state.password)}}>
                        {<ContentCopyIcon />}
                    </IconButton>
                </Tooltip>

                {/* Checkboxes */}
                <FormLabel component="legend">Password parameters:</FormLabel>
                <FormGroup aria-label="position" row>
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Capital"
                        labelPlacement="end"
                        checked={this.state.boolCapital}
                        onClick={() => {
                            console.log("boolCapital: " + !this.state.boolCapital)
                            this.setState({boolCapital: !this.state.boolCapital})
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Digits"
                        labelPlacement="end"
                        checked={this.state.boolDigit}
                        onClick={() => {
                            console.log("boolDigits: " + !this.state.boolDigit)
                            this.setState({boolDigit: !this.state.boolDigit})
                        }}
                    />
                    <FormControlLabel
                        control={<Checkbox />}
                        label="Symbols"
                        labelPlacement="end"
                        checked={this.state.boolSymbol}
                        onClick={() => {
                            console.log("boolSymbol: " + !this.state.boolSymbol)
                            this.setState({boolSymbol: !this.state.boolSymbol})
                        }}
                    />
                </FormGroup>

                {/* Generate password button */}
                <Button
                    variant="contained"
                    color="success"
                    onClick={this.handleClick}>
                    Generate Password
                </Button>
            </div>
        );
    }
}

export default PasswordGen;
