import React from 'react';
import { Button } from './Button';
import { Input } from './Input';
import { Modal, Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { modifyRow } from '../redux/actions/citiesActions';
import { WeatherStatus } from '../redux/reducer';

interface ChangeRowModalProps {
  show: boolean;
  city: {
    id: string;
    name: string;
    temp: number;
    status: WeatherStatus;
  };
  onHide: () => void;
}

export const ChangeRowModal: React.FC<ChangeRowModalProps> = ({
  show,
  city,
  onHide,
}) => {
  const dispatch = useDispatch();

  const { id, name, temp } = city;
  const [rowValues, setRowValues] = React.useState({
    name: '',
    temp: '',
  });

  React.useEffect(() => {
    setRowValues({ name, temp: `${temp}` });
  }, [show, name, temp]);

  const handleChangeRowValues = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    setRowValues({
      ...rowValues,
      [target.name]: target.value,
    });
  };

  const handleConfirm = () => {
    dispatch(modifyRow(id, rowValues.name, +rowValues.temp));
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
        <Modal.Title id="contained-modal-title-vcenter">
          Изменение записи
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate>
          <Form.Group>
            <Form.Label>Город</Form.Label>
            <Input
              required={true}
              type="text"
              name="name"
              value={rowValues.name}
              onChange={handleChangeRowValues}
              placeHolder="Введите название города"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Температура, <span>&#176;</span>C
            </Form.Label>
            <Input
              required={true}
              type="number"
              name="temp"
              value={rowValues.temp}
              onChange={handleChangeRowValues}
              placeHolder="Введите температуру"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Отмена</Button>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!rowValues.name || !rowValues.temp}
        >
          Ок
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
