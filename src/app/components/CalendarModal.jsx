import { useState } from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { addHours } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import es from 'date-fns/locale/es';

registerLocale('es', es);

const initialValues = {
  title: 'Some title',
  notes: 'Some notes',
  start: new Date(),
  end: addHours(new Date(), 2),
};

const startDate = new Date();

export const CalendarModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formValues, setFormValues] = useState(initialValues);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };

  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };

  return (
    <>
      <Button onClick={onOpen} colorScheme="blue">
        Agregar evento
      </Button>

      <Modal
        closeOnOverlayClick={false}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        size={window.innerWidth <= 515 ? 'full' : 'lg'}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="mx-5 pt-5" fontSize={'30px'}>
            Nuevo Evento
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody className="mx-5 pb-5">
            <form className="container">
              <div className="form-group mb-2">
                <label>Fecha y hora de inicio</label> <br />
                <DatePicker
                  minDate={startDate}
                  className="form-control"
                  selected={formValues.start}
                  onChange={(event) => onDateChange(event, 'start')}
                  showTimeSelect
                  dateFormat="Pp"
                  locale="es"
                  timeCaption="Hora"
                ></DatePicker>
              </div>

              <div className="form-group mb-2">
                <label>Fecha y hora de fin</label> <br />
                <DatePicker
                  minDate={formValues.start}
                  className="form-control"
                  selected={formValues.end}
                  onChange={(event) => onDateChange(event, 'end')}
                  showTimeSelect
                  dateFormat="Pp"
                  locale="es"
                  timeCaption="Hora"
                ></DatePicker>
              </div>

              <hr />

              <div className="form-group mb-2">
                <label>Título y notas</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  value={formValues.title}
                  onChange={onInputChange}
                />
                <small id="emailHelp" className="form-text text-muted">
                  Una descripción corta
                </small>
              </div>

              <div className="form-group mb-2">
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={formValues.notes}
                  onChange={onInputChange}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">
                  Información adicional
                </small>
              </div>

              <Button type="submit" colorScheme="green">
                <i className="far fa-save"></i> &nbsp; Guardar
              </Button>
            </form>

            <div className="container mt-2 mb-4">
              <Button onClick={onClose} colorScheme="red">
                <i className="fa-solid fa-ban"></i> &nbsp;Cancelar
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
