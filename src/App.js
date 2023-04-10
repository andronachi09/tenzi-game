import React, {useState} from "react"
import "../src/style/app.css"
import Die from "../src/Components/Die"

export default function App(){
    const [dice, setDice] = useState(allNewDice())
    const diceElements = dice.map(die => <Die value={die}/>)

    function allNewDice() {
        const diceArray = []
        for(let i = 0; i < 10; i++){
            diceArray.push(Math.ceil(Math.random() * 6))
        }
        return diceArray
    }

    function rollDice(){
        setDice(allNewDice())
    }

    return(
        <main>
            <div className="app--dices">
                {diceElements}
            </div>
            <button onClick={rollDice} className="app--button">
                Roll
            </button>
        </main>
    )
}