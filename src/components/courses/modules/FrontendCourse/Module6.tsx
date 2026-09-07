import React, { useState } from 'react';
import styles from '../../FrontendCoursePage.module.css';
import CodeSnippet from '../../../common/CodeSnippet';
import ModuleQuiz from '../../shared/ModuleQuiz';
import ModuleAssignment from '../../shared/ModuleAssignment';
import { frontendAssignments } from './assignments';
import { QuizQuestion } from '../../../../types';

interface Props { page: number; }

const Module6: React.FC<Props> = ({ page }) => {

  // Interactive states for lessons
  const [varAns, setVarAns] = useState<Record<string, string>>({});
  const [typeQuizAns, setTypeQuizAns] = useState<string | null>(null);
  const [condQuizAns, setCondQuizAns] = useState<string | null>(null);
  const [loopCount, setLoopCount] = useState<number>(0);
  const [funcResult, setFuncResult] = useState<string>('');
  const [numInput1, setNumInput1] = useState<string>('');
  const [numInput2, setNumInput2] = useState<string>('');
  const [arrayState, setArrayState] = useState<string[]>(['Apple', 'Banana', 'Orange']);

  // Exercise states
  const [ex1Ans, setEx1Ans] = useState('');
  const [ex1Correct, setEx1Correct] = useState<boolean | null>(null);

  const quizQuestions: QuizQuestion[] = [
    { id: 1, question: 'Q1: Which keyword allows re-declaring variables in the same scope?', options: ['A. const', 'B. let', 'C. var', 'D. None of the above'], correctAnswer: 'C. var' },
    { id: 2, question: 'Q2: What is the output of console.log(typeof null)?', options: ['A. "null"', 'B. "undefined"', 'C. "object"', 'D. "string"'], correctAnswer: 'C. "object"' },
    { id: 3, question: 'Q3: Which operator checks both value and type equality?', options: ['A. ==', 'B. ===', 'C. =', 'D. !='], correctAnswer: 'B. ===' },
    { id: 4, question: 'Q4: How do you add an element to the end of an array?', options: ['A. push()', 'B. pop()', 'C. shift()', 'D. unshift()'], correctAnswer: 'A. push()' },
    { id: 5, question: 'Q5: What is a key characteristic of let variables?', options: ['A. Hoisted with value', 'B. Block scoped', 'C. Cannot be reassigned', 'D. Global only'], correctAnswer: 'B. Block scoped' },
  ];

  const checkExercise1 = () => {
    const cleaned = ex1Ans.replace(/\s+/g, '').toLowerCase();
    if (cleaned.includes('returna+b') || cleaned.includes('returnb+a')) {
      setEx1Correct(true);
    } else {
      setEx1Correct(false);
    }
  };

  switch (page) {
    case 1:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.1: Introduction to JavaScript</h2>
          <p className={styles.paragraph}><strong>JavaScript (JS)</strong> is a lightweight, interpreted, object-oriented programming language. It is best known as the scripting language for web pages, allowing you to add dynamic behavior and interactivity.</p>
          <p className={styles.paragraph}>While HTML defines the structure and CSS defines the appearance, JavaScript defines the logic. It runs right in the browser (client-side) or on servers (Node.js).</p>

          <h3 className={styles.subtitle}>What JavaScript Can Do:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li>Change HTML content and attributes dynamically.</li>
            <li>Modify CSS styles on user clicks, scrolls, or inputs.</li>
            <li>Handle forms validation before sending data to servers.</li>
            <li>Fetch data from database APIs in the background without reloading the page.</li>
          </ul>

          <div className={styles.codeLabel}>JavaScript Example</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`// Print a greeting to the developer console
console.log("Hello, World!");

// Display a popup alert to the user
alert("Welcome to JavaScript Programming!");`} />
        </div>
      );

    case 2:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.2: Variables</h2>
          <p className={styles.paragraph}>A <strong>variable</strong> is a container for storing data values. In modern JavaScript, we declare variables using three keywords: <code>var</code>, <code>let</code>, and <code>const</code>.</p>
          
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Keyword</th>
                <th>Scope</th>
                <th>Reassignable</th>
                <th>Redeclarable</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><code>var</code></td>
                <td>Function scoped</td>
                <td>Yes</td>
                <td>Yes</td>
              </tr>
              <tr>
                <td><code>let</code></td>
                <td>Block scoped</td>
                <td>Yes</td>
                <td>No</td>
              </tr>
              <tr>
                <td><code>const</code></td>
                <td>Block scoped</td>
                <td>No</td>
                <td>No</td>
              </tr>
            </tbody>
          </table>

          <div className={styles.codeLabel}>Variable Declarations</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`let age = 25;
age = 26; // Allowed

const pi = 3.14159;
// pi = 3.14; // Error: Assignment to constant variable

var legacy = "old way"; // Avoid using var in modern JS`} />

          <h3 className={styles.subtitle}>Test Your Understanding</h3>
          <p className={styles.paragraph}>Match the behavior to the correct keyword (let or const):</p>
          <div className={styles.activityGrid}>
            <div className={styles.activityRow}>
              <span className={styles.activityName}>"Storing a user's date of birth"</span>
              <div className={styles.buttonGroup}>
                {['let', 'const'].map(kw => (
                  <button key={kw} className={varAns['dob'] === kw ? styles.choiceBtnCorrect : styles.choiceBtn} onClick={() => setVarAns(p => ({...p, dob: kw}))}>{kw}</button>
                ))}
              </div>
            </div>
            <div className={styles.activityRow}>
              <span className={styles.activityName}>"Storing current score in a game"</span>
              <div className={styles.buttonGroup}>
                {['let', 'const'].map(kw => (
                  <button key={kw} className={varAns['score'] === kw ? styles.choiceBtnCorrect : styles.choiceBtn} onClick={() => setVarAns(p => ({...p, score: kw}))}>{kw}</button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.3: Data Types</h2>
          <p className={styles.paragraph}>JavaScript variables are <strong>dynamically typed</strong>, meaning the same variable can hold different data types over time. JavaScript has 8 basic data types divided into Primitives and Reference types.</p>
          
          <h3 className={styles.subtitle}>Primitive Types:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>String</strong>: Text enclosed in quotes. e.g., <code>"Alice"</code></li>
            <li><strong>Number</strong>: Integer or floating-point. e.g., <code>42</code>, <code>3.14</code></li>
            <li><strong>Boolean</strong>: Logical values. <code>true</code> or <code>false</code></li>
            <li><strong>Null</strong>: Explicit representation of empty/nothing.</li>
            <li><strong>Undefined</strong>: Variable declared but not assigned.</li>
            <li><strong>Symbol & BigInt</strong>: Advanced types for unique keys and large integers.</li>
          </ul>

          <h3 className={styles.subtitle}>Reference Types:</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>Object</strong>: Collection of key-value pairs. e.g., <code>{`{ name: "Alice", age: 25 }`}</code></li>
            <li><strong>Array</strong>: List-like object. e.g., <code>[1, 2, 3]</code></li>
            <li><strong>Function</strong>: Executable block of code.</li>
          </ul>

          <div className={styles.inlineQuiz}>
            <h4 className={styles.quizQuestion}>⚡ Quick Quiz: What is returned by typeof undefined?</h4>
            <div className={styles.quizOptions}>
              {['A. "null"', 'B. "undefined"', 'C. "object"', 'D. "string"'].map(opt => (
                <button key={opt} className={typeQuizAns === opt ? (opt.startsWith('B') ? styles.optionBtnCorrect : styles.optionBtnIncorrect) : styles.optionBtn} onClick={() => setTypeQuizAns(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    case 4:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.4: Operators</h2>
          <p className={styles.paragraph}>Operators perform calculations or evaluations on variables and values.</p>
          
          <h3 className={styles.subtitle}>1. Arithmetic Operators</h3>
          <p className={styles.paragraph}><code>+</code> (Addition), <code>-</code> (Subtraction), <code>*</code> (Multiplication), <code>/</code> (Division), <code>%</code> (Modulus/Remainder)</p>

          <h3 className={styles.subtitle}>2. Comparison Operators</h3>
          <p className={styles.paragraph}><code>==</code> (Equal value), <code>===</code> (Strict equal: checks value AND type), <code>!=</code> (Not equal), <code>!==</code> (Strict not equal), <code>&gt;</code>, <code>&lt;</code></p>

          <h3 className={styles.subtitle}>3. Logical Operators</h3>
          <p className={styles.paragraph}><code>&amp;&amp;</code> (AND: both must be true), <code>||</code> (OR: at least one must be true), <code>!</code> (NOT: reverses boolean state)</p>

          <div className={styles.codeLabel}>Operator Comparison</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`console.log(5 == "5");  // true (type coercion)
console.log(5 === "5"); // false (strict check)

console.log(true && false); // false
console.log(true || false); // true`} />
        </div>
      );

    case 5:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.5: Conditional Statements</h2>
          <p className={styles.paragraph}>Conditionals control decision-making logic. They execute different blocks of code based on conditions evaluating to true/false.</p>
          
          <div className={styles.codeLabel}>If-Else Syntax</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`let score = 85;

if (score >= 90) {
  console.log("Grade: A");
} else if (score >= 80) {
  console.log("Grade: B");
} else {
  console.log("Grade: C");
}`} />

          <h3 className={styles.subtitle}>Ternary Operator (Shorthand)</h3>
          <p className={styles.paragraph}>The ternary operator takes a condition followed by a <code>?</code>, an expression to run if truthy, a <code>:</code>, and the expression to run if falsy.</p>
          <CodeSnippet isRunnable={true} language="CSS" code={`let age = 18;
let status = age >= 18 ? "Adult" : "Minor";`} />

          <div className={styles.inlineQuiz}>
            <h4 className={styles.quizQuestion}>⚡ Quick Check: Which keyword ends a switch case branch?</h4>
            <div className={styles.quizOptions}>
              {['A. stop', 'B. return', 'C. break', 'D. exit'].map(opt => (
                <button key={opt} className={condQuizAns === opt ? (opt.startsWith('C') ? styles.optionBtnCorrect : styles.optionBtnIncorrect) : styles.optionBtn} onClick={() => setCondQuizAns(opt)}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      );

    case 6:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.6: Loops</h2>
          <p className={styles.paragraph}>Loops automate repetitive actions. The most common loops are <code>for</code> and <code>while</code>.</p>
          
          <div className={styles.codeLabel}>1. For Loop</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`for (let i = 0; i < 5; i++) {
  console.log("Iteration number: " + i);
}`} />

          <div className={styles.codeLabel}>2. While Loop</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`let count = 0;
while (count < 5) {
  console.log(count);
  count++;
}`} />

          <h3 className={styles.subtitle}>Try it out:</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--bg-surface-2)', padding: '16px', borderRadius: '8px' }}>
            <button className={styles.saveBtn} onClick={() => setLoopCount(p => p < 5 ? p + 1 : 0)}>Increment Loop Counter ({loopCount}/5)</button>
            <span style={{ fontSize: '13.5px', color: 'var(--text-primary)' }}>
              {loopCount === 0 && 'Click to start loop execution.'}
              {loopCount > 0 && `Loop executed ${loopCount} times. Output value: ${loopCount * 2}`}
            </span>
          </div>
        </div>
      );

    case 7:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.7: Functions</h2>
          <p className={styles.paragraph}>A <strong>function</strong> is a reusable block of code designed to perform a specific task. Functions prevent duplication and structure your codebase.</p>
          
          <div className={styles.codeLabel}>Function Definition and Call</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`// Declaring a function
function calculateSum(a, b) {
  return a + b;
}

// Invoking (calling) the function
let result = calculateSum(5, 7); // result is 12`} />

          <h3 className={styles.subtitle}>Test Function Calculator</h3>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
            <input className={styles.inputField} type="number" placeholder="Num 1" value={numInput1} onChange={e => setNumInput1(e.target.value)} />
            <input className={styles.inputField} type="number" placeholder="Num 2" value={numInput2} onChange={e => setNumInput2(e.target.value)} />
            <button className={styles.saveBtn} onClick={() => {
              const res = (Number(numInput1) || 0) + (Number(numInput2) || 0);
              setFuncResult(`calculateSum(${numInput1 || 0}, ${numInput2 || 0}) returned ${res}`);
            }}>Call Function</button>
          </div>
          {funcResult && <p className={styles.successMessage} style={{ margin: 0 }}>{funcResult}</p>}
        </div>
      );

    case 8:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.8: Arrays</h2>
          <p className={styles.paragraph}>An <strong>array</strong> is an ordered list of values. Arrays are zero-indexed, meaning the first element is at index <code>0</code>.</p>
          
          <div className={styles.codeLabel}>Array Operations</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`let fruits = ["Apple", "Banana", "Orange"];

console.log(fruits[0]); // Apple
console.log(fruits.length); // 3

fruits.push("Grape"); // Adds to the end
fruits.pop();         // Removes the last item`} />

          <h3 className={styles.subtitle}>Interactive Array Playground</h3>
          <p className={styles.paragraph}>Current Array: <code>{JSON.stringify(arrayState)}</code></p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button className={styles.backBtn} onClick={() => setArrayState(p => [...p, 'Kiwi'])}>Push "Kiwi"</button>
            <button className={styles.backBtn} onClick={() => setArrayState(p => p.slice(0, -1))}>Pop Item</button>
            <button className={styles.backBtn} onClick={() => setArrayState(['Apple', 'Banana', 'Orange'])}>Reset Array</button>
          </div>
        </div>
      );

    case 9:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.9: Objects</h2>
          <p className={styles.paragraph}>An <strong>object</strong> is a collection of related data and/or functionality. It consists of variables and functions, which are called properties and methods when they are inside an object.</p>
          
          <div className={styles.codeLabel}>Object Structure</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`const student = {
  firstName: "John",
  lastName: "Doe",
  age: 21,
  isEnrolled: true,
  greet: function() {
    return "Hello, I am " + this.firstName;
  }
};

// Accessing properties
console.log(student.firstName); // "John" (Dot notation)
console.log(student["age"]);     // 21 (Bracket notation)
console.log(student.greet());   // "Hello, I am John"`} />

          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>💡 Bracket vs Dot Notation</p>
            <p className={styles.tipBoxText}>Dot notation is cleaner and preferred. However, bracket notation is required if your property name contains spaces, special characters, or is stored dynamically in a variable.</p>
          </div>
        </div>
      );

    case 10:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.10: Scope</h2>
          <p className={styles.paragraph}><strong>Scope</strong> determines the accessibility (visibility) of variables in your code. JavaScript has three types of scope:</p>
          
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '20px', fontSize: '13.5px', color: 'var(--text-secondary)' }}>
            <li><strong>Global Scope</strong>: Variables declared outside any function or block are globally accessible.</li>
            <li><strong>Function Scope</strong>: Variables declared inside a function are local to that function.</li>
            <li><strong>Block Scope</strong>: Variables declared with <code>let</code> or <code>const</code> inside a block <code>{`{}`}</code> cannot be accessed outside it.</li>
          </ul>

          <div className={styles.codeLabel}>Scope Sandbox</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`let globalVar = "I am global";

function scopeCheck() {
  let localVar = "I am inside function";
  if (true) {
    let blockVar = "I am inside block";
    console.log(blockVar); // Accessible
  }
  // console.log(blockVar); // Error: blockVar is not defined
}
`} />
        </div>
      );

    case 11:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>Lesson 6.11: Hoisting</h2>
          <p className={styles.paragraph}><strong>Hoisting</strong> is JavaScript's default behavior of moving declarations to the top of the current scope before code execution.</p>
          
          <div className={styles.codeLabel}>Hoisting with var vs let</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`console.log(x); // undefined (var is hoisted but initialized to undefined)
var x = 5;

// console.log(y); // ReferenceError: Cannot access 'y' before initialization
let y = 10;`} />

          <div className={styles.tipBox}>
            <p className={styles.tipBoxTitle}>⚠️ Temporal Dead Zone (TDZ)</p>
            <p className={styles.tipBoxText}>Variables declared with <code>let</code> and <code>const</code> are also hoisted, but they are not initialized. They exist in the Temporal Dead Zone (TDZ) from the start of the block until the declaration is processed. Accessing them in TDZ throws an error.</p>
          </div>
        </div>
      );

    case 12:
      return (
        <div className={styles.tabContent}>
          <h2 className={styles.cardTitle}>JavaScript Exercises</h2>
          <p className={styles.paragraph}>Complete the basic function syntax below to create a function that takes two arguments <code>a</code> and <code>b</code>, and returns their sum.</p>
          
          <div className={styles.codeLabel}>Fill in the blanks:</div>
          <CodeSnippet isRunnable={true} language="CSS" code={`function addNumbers(a, b) {`} />
          <input className={styles.inputField} style={{ fontFamily: 'monospace', width: '100%', maxWidth: '300px', marginBottom: '8px' }} type="text" placeholder="e.g. return a + b;" value={ex1Ans} onChange={e => setEx1Ans(e.target.value)} />
          <CodeSnippet isRunnable={true} language="CSS" code={`}`} />

          <button className={styles.saveBtn} onClick={checkExercise1}>Check Code</button>
          {ex1Correct === true && <p className={styles.successMessage} style={{ marginTop: '12px' }}>🎉 Correct! That's a valid return statement.</p>}
          {ex1Correct === false && <p className={styles.errorMessage} style={{ marginTop: '12px' }}>❌ Keep trying! Write the return statement.</p>}
        </div>
      );

    case 13:
      return <ModuleQuiz moduleId="frontend-m6" title="Module 6 Quiz" questions={quizQuestions} />;

    case 14:
      return (
        <ModuleAssignment
          moduleId="frontend-m6"
          title="Module 6 Assignment"
          questions={frontendAssignments.m6}
        />
      );

    default:
      return null;
  }
};

export default Module6;
