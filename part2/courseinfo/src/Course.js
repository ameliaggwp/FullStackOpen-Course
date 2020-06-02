import React from "react";

const Header = ({ course }) => {
  return (
    <div>
      <h2 key={course.id}>{course.name}</h2>
    </div>
  );
};

const Part = (props) => {
  return (
    <div key={props.id}>
      {props.part} {props.exercises}
    </div>
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
  const totalParts = props.course.parts.reduce(
    (acc, cur) => cur.exercises + acc,
    0
  );

  return (
    <div>
      <strong>total of {totalParts} exercises</strong>
    </div>
  );
};

const Course = ({ courses }) => {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course} />
          <Content course={course} />
          <Total course={course} />
        </div>
      ))}
    </div>
  );
};

export default Course;
