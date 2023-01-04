import { filterContact } from 'redux/slice/sliceFilter';
import { useDispatch } from 'react-redux';

export default function Filter() {
  const dispatch = useDispatch();
  const onChangeInput = event => {
    dispatch(filterContact(event.currentTarget.value));
  };
  return (
    <>
      <input
        type="text"
        placeholder="Find contacts by name..."
        onChange={onChangeInput}
      />
    </>
  );
}
