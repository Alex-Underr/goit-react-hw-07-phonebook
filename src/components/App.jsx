import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './form.module.css';
import { useEffect, useState } from 'react';

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, setState, state]);
  return [state, setState];
};

export function App() {
  const [contacts, setContacts] = useLocalStorage('contact', []);
  const [filter, setFilter] = useState('');

  const filteredContacts = () => {
    const toLower = filter.toLowerCase();
    return contacts.filter(i => i.name.toLowerCase().includes(toLower));
  };

  const deleteItem = itemId => {
    setContacts(contacts.filter(item => item.id !== itemId));
  };

  const filterNow = event => {
    setFilter(event.currentTarget.value);
  };

  const addContact = contact => {
    contacts.some(e => e.name === contact.name)
      ? alert(`${contact.name} is already in contacts`)
      : setContacts(prevState => [...prevState, contact]);
  };

  return (
    <div className={styles.form}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={filterNow} />
      <ContactList contacts={filteredContacts()} onClick={deleteItem} />
    </div>
  );
}
