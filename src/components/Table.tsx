import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { CityWeather, WeatherStatus } from '../redux/reducer';
import { selectCities } from '../redux/selectors';
import { ChangeRowModal } from './ChangeRowModal';
import { DeleteRowModal } from './DeleteRowModal';
import { TableRow } from './TableRow';

interface TableProps {
  show: 'ALL' | 'ACTIVE' | 'DELETED';
}

interface ModalStateProps {
  modal: 'CHANGE' | 'DELETE' | null;
  city: CityWeather;
  show: boolean;
}

const modalInitialState = {
  modal: null,
  show: false,
  city: {
    id: '',
    name: '',
    temp: 0,
    status: 'ACTIVE' as WeatherStatus,
  },
};

export const Table: React.FC<TableProps> = ({ show }) => {
  const [changeRow, setChangeRow] =
    React.useState<ModalStateProps>(modalInitialState);

  const openRenameRowModalShow = (city: CityWeather) => {
    setChangeRow({ modal: 'CHANGE', city, show: !changeRow.show });
  };

  const openDeleteRowModalShow = (city: CityWeather) => {
    setChangeRow({ modal: 'DELETE', city, show: !changeRow.show });
  };

  const hideChangeRowModalShow = () => {
    setChangeRow(modalInitialState);
  };

  const cities = useSelector(selectCities);

  let TableBody: (JSX.Element | null)[];

  switch (show) {
    case 'ACTIVE':
      TableBody = cities.map((city, index) => {
        return city.status === 'ACTIVE' ? (
          <TableRow
            key={city.id}
            index={index + 1}
            city={city}
            onChangeRow={openRenameRowModalShow}
            onDeleteRow={openDeleteRowModalShow}
          />
        ) : null;
      });
      break;
    case 'DELETED':
      TableBody = cities.map((city, index) => {
        return city.status === 'DELETED' ? (
          <TableRow
            key={city.id}
            index={index + 1}
            city={city}
            onChangeRow={openRenameRowModalShow}
            onDeleteRow={openDeleteRowModalShow}
          />
        ) : null;
      });
      break;
    default:
      TableBody = cities.map((city, index) => {
        return (
          <TableRow
            key={city.id}
            index={index + 1}
            city={city}
            onChangeRow={openRenameRowModalShow}
            onDeleteRow={openDeleteRowModalShow}
          />
        );
      });
  }

  return (
    <>
      <BootstrapTable striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Имя</th>
            <th>Температура</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>{TableBody}</tbody>
      </BootstrapTable>
      <ChangeRowModal
        show={changeRow.show && changeRow.modal === 'CHANGE'}
        city={changeRow.city}
        onHide={hideChangeRowModalShow}
      />
      <DeleteRowModal
        show={changeRow.show && changeRow.modal === 'DELETE'}
        city={changeRow.city}
        onHide={hideChangeRowModalShow}
      />
    </>
  );
};
