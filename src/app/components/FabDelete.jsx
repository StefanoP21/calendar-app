import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { activeEvent, hasEventSelected, startDeletingEvent } =
    useCalendarStore();

  const handleDelete = () => {
    if (activeEvent !== null) {
      startDeletingEvent();
    }
  };

  return (
    <button
      onClick={handleDelete}
      className={`btn btn-danger fab-danger ${!hasEventSelected && 'd-none'}`}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
