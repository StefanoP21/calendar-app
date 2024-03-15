import { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

import { addHours, differenceInSeconds } from 'date-fns';
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

  const onSubmit = (event) => {
    event.preventDefault();

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference < 0) {
      return;
    }

    if (formValues.title.trim().length < 2) {
      return;
    }

    onClose();
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
            <form onSubmit={onSubmit} className="container">
              <FormControl className="form-group mb-2" isRequired>
                <FormLabel>Fecha y hora de inicio</FormLabel>
                <DatePicker
                  minDate={startDate}
                  className="form-control"
                  selected={formValues.start}
                  onChange={(event) => onDateChange(event, 'start')}
                  showTimeSelect
                  dateFormat="Pp"
                  locale="es"
                  timeCaption="Hora"
                  required
                ></DatePicker>
              </FormControl>

              <FormControl className="form-group mb-2" isRequired>
                <FormLabel>Fecha y hora de fin</FormLabel>
                <DatePicker
                  minDate={formValues.start}
                  className="form-control"
                  selected={formValues.end}
                  onChange={(event) => onDateChange(event, 'end')}
                  showTimeSelect
                  dateFormat="Pp"
                  locale="es"
                  timeCaption="Hora"
                  required
                ></DatePicker>
              </FormControl>

              <FormControl className="form-group mb-2" isRequired>
                <FormLabel>Título</FormLabel>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  required
                  value={formValues.title}
                  onChange={onInputChange}
                />
                <FormHelperText>Una descripción corta</FormHelperText>
              </FormControl>

              <FormControl className="form-group mb-2">
                <FormLabel>Notas</FormLabel>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  value={formValues.notes}
                  onChange={onInputChange}
                ></textarea>
                <FormHelperText>Información adicional</FormHelperText>
              </FormControl>

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
