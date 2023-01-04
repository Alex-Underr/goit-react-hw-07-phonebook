import { filterContact } from 'redux/slice/sliceFilter';
import { useDispatch } from 'react-redux';
import styles from './Filter.module.css';
export default function Filter() {
  const dispatch = useDispatch();
  const onChangeInput = event => {
    dispatch(filterContact(event.currentTarget.value));
  };
  return (
    <>
      <input
        className={styles.input}
        type="text"
        placeholder="Find contacts by name..."
        onChange={onChangeInput}
      />
    </>
  );
}
