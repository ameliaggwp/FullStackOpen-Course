import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ text, onClick }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClickGood = () => {
    setGood(good + 1);
    console.log(good);
  };

  const handleClickNeutral = () => {
    setNeutral(neutral + 1);
    console.log(neutral);
  };

  const handleClickBad = () => {
    setBad(bad + 1);
    console.log(bad);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleClickGood} text="good" />
      <Button onClick={handleClickNeutral} text="neutral" />
      <Button onClick={handleClickBad} text="bad" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
