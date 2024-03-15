import { useEffect, useState } from 'react';

import { addHours } from 'date-fns';
import { registerLocale } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import { useCalendarStore, useUiStore } from './';

import es from 'date-fns/locale/es';

registerLocale('es', es);

const initialValues = {
  title: '',
  notes: '',
  start: new Date(),
  end: addHours(new Date(), 2),
  bgColor: '#0073ff',
  user: {},
};

export const useCalendarModal = () => {
  const { isDateModalOpen, openDateModal, closeDateModal } = useUiStore();
  const { activeEvent, setActiceEvent } = useCalendarStore();

  const [formValues, setFormValues] = useState(initialValues);
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

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

  const handleNewEvent = () => {
    setActiceEvent(initialValues);

    openDateModal();
  };

  return {
    //* Propiedades
    isDateModalOpen,
    openDateModal,
    closeDateModal,
    formValues,
    formSubmitted,
    setFormSubmitted,

    //* Métodos
    onInputChange,
    onDateChange,
    handleNewEvent,
  };
};
