import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';

export const CalendarModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

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
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize={'30px'}>Nuevo Evento</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <form className="container">
              <div className="form-group mb-2">
                <label>Fecha y hora de inicio</label>
                <input className="form-control" placeholder="Fecha inicio" />
              </div>

              <div className="form-group mb-2">
                <label>Fecha y hora de fin</label>
                <input className="form-control" placeholder="Fecha inicio" />
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
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">
                  Información adicional
                </small>
              </div>

              <button type="submit" className="btn btn-success btn-block">
                <i className="far fa-save"></i>
                <span> Guardar</span>
              </button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose} colorScheme="red">
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
