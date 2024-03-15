import Swal from 'sweetalert2';
import { useCalendarStore } from '../../hooks';

export const FabDelete = () => {
  const { activeEvent, hasEventSelected, startDeletingEvent } =
    useCalendarStore();

  const handleDelete = () => {
    if (activeEvent !== null) {
      startDeletingEvent();
      Swal.fire('Evento eliminado', '', 'success');
    } else {
      Swal.fire('Seleccione un evento', '', 'error');
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
