import React, { useState, useEffect } from "react";
import numberService from "./services/numbers";

const PhonebookEntry = (props) => {
  return (
    <div>
      {props.name} {props.number}
    </div>
  );
};

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
          <div key={person.id}>
            {person.name} {person.number}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div>
      {persons.map((person) => (
        <div key={person.id}>
          <PhonebookEntry name={person.name} number={person.number} />
        </div>
      ))}
    </div>
  );
};

const Input = (props) => {
  return (
    <div>
      {props.inputTitle} <input value={props.value} onChange={props.onChange} />
    </div>
  );
};

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

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    numberService.getAll().then((initialNumbers) => {
      setPersons(initialNumbers);
    });
  }, []);

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
    numberService.create(personObject).then((newPerson) => {
      setPersons(persons.concat(newPerson));
      setNewName("");
      setNewNumber("");
    });
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
          <Input
            inputTitle="filter names"
            value={newSearch}
            onChange={handleSearch}
          />
        </div>
      </form>
      <Form title="Add New" onSubmit={addName}>
        <Input inputTitle="Name" value={newName} onChange={handleNameChange} />
        <Input
          inputTitle="Number"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </Form>
      <h2>Numbers</h2>
      <NumbersList persons={persons} newSearch={newSearch} />
    </div>
  );
};

export default App;
