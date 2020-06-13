import React from "react";

const Form = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <form onSubmit={props.onSubmit}>
        {props.children}
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default Form;
