import React from 'react';
import { Button } from './Button';
import { Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { deleteRow } from '../redux/actions/citiesActions';
import { WeatherStatus } from '../redux/reducer';

interface DeleteModalProps {
  show: boolean;
  city: {
    id: string;
    name: string;
    temp: number;
    status: WeatherStatus;
  };
  onHide: () => void;
}

export const DeleteRowModal: React.FC<DeleteModalProps> = ({
  show,
  city,
  onHide,
}) => {
  const { id, name } = city;
  const dispatch = useDispatch();

  const handleConfirm = () => {
    dispatch(deleteRow(id));
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Удаление</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Вы действительно хотите удалить город {name} из списка?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Отмена</Button>
        <Button variant="primary" onClick={handleConfirm}>
          Ок
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
