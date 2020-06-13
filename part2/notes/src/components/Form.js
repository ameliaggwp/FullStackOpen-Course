import React from "react";

const Form = ({ onSubmit, value, onChange, buttonText }) => {
  return (
    <form onSubmit={onSubmit}>
      <input value={value} onChange={onChange} />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default Form;
