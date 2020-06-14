import React from "react";

const PhonebookEntry = (props) => {
  return (
    <div>
      {props.name} {props.number}{" "}
      <button onClick={() => props.handleClick(props)}>delete</button>
    </div>
  );
};

const NumbersList = ({ persons, newSearch, handleDelete }) => {
  const list = [];

  //For filtering numbers listed
  if (newSearch) {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase().includes(newSearch.toLowerCase())) {
        list.push(persons[i]);
      }
    }
    return (
      <div>
        {list.map((person) => (
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    );
  }

  // For listing all numbers in database
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <PhonebookEntry
            name={person.name}
            number={person.number}
            id={person.id}
            handleClick={handleDelete}
          />
        </div>
      ))}
    </div>
  );
};

export default NumbersList;
