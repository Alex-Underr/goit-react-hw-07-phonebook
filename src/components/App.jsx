import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';
import styles from './form.module.css';
import { ScaleLoader } from 'react-spinners';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, fetchContacts } from 'redux/operations/contactsOperations';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {
  selectIsLoading,
  selectFetchContacts,
  selectError,
  selectFilter,
} from 'redux/selectors/selectors';

const override = {
  position: 'fixed',
  top: '45%',
  left: '50%',
  transform: 'translateX(-50%) translateY(-50%)',
};
export function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);
  const contacts = useSelector(selectFetchContacts);
  const filtered = useSelector(selectFilter);
  const spinner = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  const filteredContacts = () => {
    if (filtered) {
      const toLower = filtered.trim().toLowerCase();
      return contacts.filter(i => i.name.toLowerCase().includes(toLower));
    } else return contacts;
  };

  const addingContact = contact => {
    contacts.some(e => e.name === contact.name)
      ? NotificationManager.info(`${contact.name} is already in contacts`)
      : dispatch(addContact(contact));
  };

  return (
    <div className={styles.formBack}>
      <div className={styles.form}>
        <h1 className={styles.header}>Phonebook</h1>
        <ContactForm onSubmit={addingContact} />
        {spinner && (
          <ScaleLoader
            color="hsla(175, 100%, 37%, 1)"
            height={27}
            margin={4}
            width={4}
            cssOverride={override}
          />
        )}
        {error && (
          <b style={{ color: '#ab0009', textAlign: 'center' }}>{error}</b>
        )}

        <h3>Contacts :</h3>
        <>
          {contacts.length === 0 ? (
            <p>The contact list is empty</p>
          ) : (
            <Filter />
          )}
        </>
        <ContactList contacts={filteredContacts()} />
      </div>
      <NotificationContainer />
    </div>
  );
}
