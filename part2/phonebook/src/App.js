import React, { useState, useEffect } from "react";
import numberService from "./services/numbers";
import NumbersList from "./components/NumbersList";
import Form from "./components/Form";
import Input from "./components/Input";
import SuccessNotification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newSearch, setNewSearch] = useState("");
  const [notification, setNotification] = useState(null);

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
        // If a repeat name is entered
        const selectedPerson = persons[i];
        const changedPerson = {
          ...selectedPerson,
          number: personObject.number,
        };
        if (
          window.confirm(
            `${selectedPerson.name} is already added to phonebook, replace the old number with a new one?`
          )
        ) {
          numberService
            .update(selectedPerson.id, changedPerson)
            .then((updatedPerson) => {
              setPersons(
                persons.map((person) =>
                  person.id !== selectedPerson.id ? person : updatedPerson
                )
              );
              setNotification(`Updated ${changedPerson.name}`);
              setTimeout(() => {
                setNotification(null);
              }, 3000);
              setNewName("");
              setNewNumber("");
            });
          break;
        }
      }
      //Add new name and number to phonebook
      numberService.create(personObject).then((newPerson) => {
        setPersons(persons.concat(newPerson));
        setNotification(`Added ${newPerson.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 3000);
        setNewName("");
        setNewNumber("");
      });
    }
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

  const handleDelete = ({ id, name }) => {
    if (window.confirm(`Delete ${name}`)) {
      numberService.removeEntry(id);
      setPersons(persons.filter((p) => p.id !== id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={notification} classStyle="success" />
      <div>
        <Input
          inputTitle="filter names"
          value={newSearch}
          onChange={handleSearch}
        />
      </div>

      <Form title="Add New" onSubmit={addName}>
        <Input inputTitle="Name" value={newName} onChange={handleNameChange} />
        <Input
          inputTitle="Number"
          value={newNumber}
          onChange={handleNumberChange}
        />
      </Form>
      <h2>Numbers</h2>
      <NumbersList
        persons={persons}
        newSearch={newSearch}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
