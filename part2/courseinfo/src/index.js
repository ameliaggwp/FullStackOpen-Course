import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1 key={course.id}>{course.name}</h1>;
};

const Part = (props) => {
  return (
    <p key={props.id}>
      {props.part} {props.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map((part) => (
        <Part part={part.name} exercises={part.exercises} key={part.id} />
      ))}
    </div>
  );
};

const Total = (props) => {
  let totalCourse = 0;
  {
    props.course.parts.map((part) => (totalCourse += part.exercises));
  }
  return (
    <div>
      <strong>total of {totalCourse} exercises</strong>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return (
    <div>
      <Course course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
