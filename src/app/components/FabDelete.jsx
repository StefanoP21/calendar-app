import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const {} = useCalendarStore();

  const handleClickEvent = () => {};

  return (
    <button onClick={handleClickEvent} className="btn btn-danger fab-danger ">
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
