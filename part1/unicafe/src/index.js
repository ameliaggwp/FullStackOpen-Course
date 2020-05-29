import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistics = ({ good, neutral, bad, all }) => {
  return (
    <div>
      <p>
        good {good}
        <br />
        neutral {neutral}
        <br />
        bad {bad}
        <br />
        all {all}
        <br />
        average {(good + bad + neutral) / 3}
        <br />
        positive {good / all} %
      </p>
    </div>
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
