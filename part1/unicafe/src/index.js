import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = ({ feedback, text }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{feedback}</td>
    </tr>
  );
};

const Statistics = ({ good, bad, all, neutral }) => {
  return (
    <table>
      <tbody>
        <Statistic feedback={good} text="good" />
        <Statistic feedback={neutral} text="neutral" />
        <Statistic feedback={bad} text="bad" />
        <Statistic feedback={all} text="all" />
        <Statistic feedback={(good + neutral + bad) / 3} text="average" />
        <Statistic
          feedback={(good / (good + neutral + bad)) * 100 + "%"}
          text="positive"
        />
      </tbody>
    </table>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />

      <h1>statistics</h1>
      {all === 0 && <p>No feedback given</p>}
      {all >= 1 && (
        <Statistics good={good} bad={bad} neutral={neutral} all={all} />
      )}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
