import styles from './contactList.module.css';
import { deleteContact } from 'redux/operations/contactsOperations';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter, selectFetchContacts } from 'redux/selectors/selectors';
export default function ContactList() {
  const dispatch = useDispatch();
  const filtered = useSelector(selectFilter);
  const contacts = useSelector(selectFetchContacts);
  const filteredContacts = () => {
    if (filtered) {
      const toLower = filtered.trim().toLowerCase();
      return contacts.filter(i => i.name.toLowerCase().includes(toLower));
    } else return contacts;
  };

  return (
    <ul>
      {filteredContacts().map(({ id, name, phone, avatar }) => (
        <li key={id}>
          <div className={styles.list} id={id}>
            {avatar && (
              <img
                src={avatar}
                alt={name}
                width="50px"
                style={{ borderRadius: '30%' }}
              />
            )}
            <p
              style={{
                fontWeight: 600,
                fontFamily: 'sans-serif',
              }}
            >
              {name}:
            </p>
            <p style={{ fontStyle: 'italic' }}>{phone}</p>
            <button
              className={styles.btn}
              onClick={() => dispatch(deleteContact(id))}
            >
              Delete
            </button>
          </div>
          <hr style={{ padding: 0 }} />
        </li>
      ))}
    </ul>
  );
}
