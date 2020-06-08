import React, { useState } from "react";

const NumbersList = ({ persons, newSearch }) => {
  const list = [];
  if (newSearch) {
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase().includes(newSearch.toLowerCase())) {
        list.push(persons[i]);
      }
    }

    return (
      <div>
        {list.map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      {" "}
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Harry Potter", number: "123-456-7890" },
    { name: "Hermione Granger", number: "123-456-7530" },
    { name: "Ron Weasley", number: "123-456-1345" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  const addName = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === personObject.name) {
        return alert(`${newName} is already added to phonebook`);
      }
    }
    setPersons(persons.concat(personObject));
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setNewSearch(event.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          filter names:
          <input value={newSearch} onChange={handleSearch} />
        </div>
      </form>
      <h2>Add new</h2>
      <form onSubmit={addName}>
        <div>
          Name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          {" "}
          Number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <NumbersList persons={persons} newSearch={newSearch} />
    </div>
  );
};

export default App;
