import React, {useEffect, useState} from "react"
import "../src/style/app.css"
import Die from "../src/Components/Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App(){
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)
    const diceElements = dice.map(die =>
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            holdDice={() => holdDice(die.id)}
        />)

    useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allValues =  dice.every(die => die.value === firstValue)

        if(allHeld && allValues) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])

    function generateNewDie(){
        return{
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }

    function allNewDice() {
        const diceArray = []
        for(let i = 0; i < 10; i++){
            diceArray.push(generateNewDie())
        }
        return diceArray
    }

    function rollDice(){
        if(!tenzies){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? die : generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }

    }

    function holdDice(id){
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? {...die, isHeld: !die.isHeld} : die
        }))
    }

    return(
        <main>
            {tenzies && <Confetti />}
            <h1 className="app--title">Tenzies</h1>
            <p className="app--instructions">Roll until all dice are the same. Click each die to freeze it at its current values between rolls.</p>
            <div className="app--dices">
                {diceElements}
            </div>
            <button
                onClick={rollDice}
                className="app--button"
            >
                {tenzies ? "New Game" : "Roll"}
            </button>
        </main>
    )
}