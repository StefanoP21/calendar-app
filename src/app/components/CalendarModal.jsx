import { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
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
  title: 'Algún título',
  notes: 'Algunas notas',
  start: new Date(),
  end: addHours(new Date(), 2),
};

const startDate = new Date();

export const CalendarModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formValues, setFormValues] = useState(initialValues);
  const [formSubmitted, setFormSubmitted] = useState(false);

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

  const isFormValid = () => {
    const seconds = differenceInSeconds(formValues.end, formValues.start);

    if (seconds < 0) {
      return false;
    }

    return true;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);

    if (!isFormValid()) {
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
              <FormControl
                className="form-group mb-2"
                isRequired
                isInvalid={isFormValid() ? false : true}
              >
                <FormLabel htmlFor="startDate">
                  Fecha y hora de inicio
                </FormLabel>
                <DatePicker
                  minDate={startDate}
                  className={`form-control ${
                    isFormValid() ? '' : 'is-invalid'
                  }`}
                  selected={formValues.start}
                  onChange={(event) => onDateChange(event, 'start')}
                  showTimeSelect
                  dateFormat="Pp"
                  locale="es"
                  timeCaption="Hora"
                  required
                  id="startDate"
                ></DatePicker>
                {isFormValid() ? null : (
                  <FormErrorMessage>
                    La fecha de inicio no puede ser mayor a la fecha de fin
                  </FormErrorMessage>
                )}
              </FormControl>

              <FormControl className="form-group mb-2" isRequired>
                <FormLabel htmlFor="endDate">Fecha y hora de fin</FormLabel>
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
                  id="endDate"
                ></DatePicker>
              </FormControl>

              <FormControl className="form-group mb-2" isRequired>
                <FormLabel htmlFor="title">Título</FormLabel>
                <Input
                  type="text"
                  className={`form-control `}
                  placeholder="Título del evento"
                  name="title"
                  autoComplete="off"
                  id="title"
                  value={formValues.title}
                  onChange={onInputChange}
                />
                <FormHelperText>Descripción del evento</FormHelperText>
              </FormControl>

              <FormControl className="form-group mb-2">
                <FormLabel htmlFor="notes">Notas</FormLabel>
                <textarea
                  type="text"
                  className="form-control"
                  placeholder="Notas"
                  rows="5"
                  name="notes"
                  id="notes"
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
