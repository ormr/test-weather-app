import React from 'react';
import { Input } from './Input';
import { Button } from './Button';
import { InputGroup } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { fetchCityWeather } from '../redux/actions/citiesActions';

export const SearchBox = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');

  const handleChange = ({ target }: React.ChangeEvent) => {
    setValue((target as HTMLInputElement).value);
  };

  const handleKeyPress = ({ code }: React.KeyboardEvent) => {
    if (code === 'Enter') {
      dispatch(fetchCityWeather({ cityName: value }));
      setValue('');
    }
  };

  const handleClick = () => {
    dispatch(fetchCityWeather({ cityName: value }));
    setValue('');
  };

  return (
    <InputGroup className="mb-3">
      <Input
        placeHolder="Введите название города"
        value={value}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <InputGroup.Append>
        <Button variant="outline-secondary" onClick={handleClick}>
          Найти
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};
