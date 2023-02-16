
import { CodeModel } from "../../../Models/code-model";
import { CodeActionType, codeStore } from "../../../Redux/CodeState";


import "./Lobby.css";
import { useState } from "react";




function Lobby(): JSX.Element {

    const [code, setCode] = useState("");
    const [codeBlock, setCodeBlock] = useState("");
    const [question, setQuestion] = useState("");
    const [isFirstUser] = useState(codeStore.getState().isFirst);



    const handleQuestionClick = (code: string, question: string) => {
        const questionCode = new CodeModel();
        questionCode.code = code;
        setCode(code);
        codeStore.dispatch({ type: CodeActionType.AddCode, payload: questionCode });
        codeStore.dispatch({ type: CodeActionType.AddQuestion, payload: question });
    };

    const questions = [
        {
            codeBlock: "async await",
            question: "Complete the getData() function such that it logs the data object to the console. If an error occurs, the error should be logged to the console.",
            code: ` 
async function getData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();
        // Your code goes here
    } catch (error) {
        console.log(error);
    }
    }
              
    getData();
`,
        },
        {
            codeBlock: "closure",
            question: `
            Complete the function that's returned by createCounter() such that it increments the count variable and returns its new value
`,
            code: `
function createCounter() {
    let count = 0;
    return function() {
        // Your code goes here
    };
    }
              
    const counter = createCounter();
    console.log(counter()); // Output: 1
    console.log(counter()); // Output: 2
    console.log(counter()); // Output: 3
`,
        },
        {
            codeBlock: "functions",
            question: "Complete the createMultiplier() function such that it returns a new function that takes in a number and multiplies it by the number passed to createMultiplier(). The new function should then return the result of the multiplication.",
            code: `
function createMultiplier(num) {
    // Your code goes here
    }
              
    const double = createMultiplier(2);
    const triple = createMultiplier(3);
              
    console.log(double(5)); // Output: 10
    console.log(triple(5)); // Output: 15
`,
        },
        {
            codeBlock: "return value",
            question: "Complete the calcAverage() function such that it takes in an array of numbers and returns the average of the numbers in the array. The average should be rounded to one decimal place.",
            code: ` 
function calcAverage(arr) {
    // Your code goes here
    }
              
    const temperatures = [68, 72, 65, 70, 74];
    const averageTemp = calcAverage(temperatures);
    console.log(averageTemp); // Output: 69.8
    `,
        },
    ];

    return (
        <div className="Lobby">
            <div className="question-buttons">

                {isFirstUser !== true && questions.map((q, i) => (
                    <button key={i} onClick={() => {
                        handleQuestionClick(q.code, q.question);
                        setQuestion(q.question);
                        setCodeBlock(q.codeBlock);
                    }}>
                        {q.codeBlock}
                    </button>
                ))}



            </div>
            {isFirstUser !== true && <div>your code block is: <br /> {codeBlock}</div>}
            <textarea disabled
                value={code}
                onChange={(event) => { setCode(event.target.value); setQuestion(question); }}
            />
            <br />
            <br />


            {isFirstUser ? (
                <ol>
                    Guide
                    <li>Schedule a meeting with your student</li>
                    <li>Go to the block page</li>
                    <li>Track your student developing</li>
                </ol>
            ) : (
                <ol>
                    Student
                    <li>Schedule a meeting with your guide</li>
                    <li>Select a code block</li>
                    <li>Go to the block page</li>
                    <li>Start developing</li>
                </ol>
            )}
        </div>
    );
}

export default Lobby;