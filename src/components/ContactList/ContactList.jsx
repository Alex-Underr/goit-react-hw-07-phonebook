import PropTypes from 'prop-types';
import styles from './contactList.module.css';
import { deleteContact } from 'redux/operations/contactsOperations';
import { useDispatch } from 'react-redux';

export default function ContactList({ contacts }) {
  const dispatch = useDispatch();
  return (
    <ul>
      {contacts.map(({ id, name, phone, avatar }) => (
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
ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired
  ),
};
