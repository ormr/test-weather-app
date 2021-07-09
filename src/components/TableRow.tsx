import React from 'react';
import { Button } from './Button';
import { useDispatch } from 'react-redux';
import { ReactComponent as ArrowIcon } from '../assets/arrow.svg';
import { ReactComponent as RepairIcon } from '../assets/repair.svg';
import { ReactComponent as TrashIcon } from '../assets/trash.svg';
import { recoverRow, changeRowIndex } from '../redux/actions/citiesActions';
import { CityWeather } from '../redux/reducer';

interface WeatherTableRowProps {
  index: number;
  city: CityWeather;
  onChangeRow: (city: CityWeather) => void;
  onDeleteRow: (city: CityWeather) => void;
}

export const TableRow: React.FC<WeatherTableRowProps> = ({
  index,
  city,
  onChangeRow,
  onDeleteRow,
}) => {
  const { id, name, temp, status } = city;
  const dispatch = useDispatch();

  const handleRowUp = () => {
    dispatch(changeRowIndex(id, -1));
  };

  const handleRowDown = () => {
    dispatch(changeRowIndex(id, 1));
  };

  const handleRowRepair = () => {
    dispatch(recoverRow(id));
  };

  const handleChangeRow = () => {
    onChangeRow(city);
  };

  const handleRowDelete = () => {
    onDeleteRow(city);
  };

  return (
    <tr>
      <td>{index}</td>
      <td role="button" onClick={handleChangeRow}>
        {name}
      </td>
      <td role="button" onClick={handleChangeRow}>
        {temp}
        <span>&#176;</span>C
      </td>
      <td className="d-flex justify-content-center">
        <Button onClick={handleRowUp} className="ml-2">
          <ArrowIcon fill="#FFF" />
        </Button>
        <Button onClick={handleRowDown} className="ml-2 mr-2">
          <ArrowIcon fill="#FFF" style={{ transform: `rotate(180deg)` }} />
        </Button>
        {status === 'DELETED' ? (
          <Button onClick={handleRowRepair}>
            <RepairIcon fill="#FFF" />
          </Button>
        ) : (
          <Button onClick={handleRowDelete}>
            <TrashIcon fill="#FFF" />
          </Button>
        )}
      </td>
    </tr>
  );
};
