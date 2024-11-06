import React, { useState } from 'react';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import '../styles/DatePickerComponent.css';

const DatePickerComponent = () => {
  const defaultStartDate = dayjs().subtract(7, 'days');
  const defaultEndDate = dayjs();

  const [startDate, setStartDate] = useState(defaultStartDate);
  const [endDate, setEndDate] = useState(defaultEndDate);

  const handleStartDateChange = (date) => {
    setStartDate(date);
    if (date && endDate && date.isAfter(endDate)) {
      setEndDate(date);
    }
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
  };

  const disabledStartDate = (current) => {
    return current && current.isAfter(endDate, 'day');
  };

  const disabledEndDate = (current) => {
    return current && current.isBefore(startDate, 'day');
  };

  return (
    <div className="date-picker-container">

      <DatePicker
        value={startDate}
        onChange={handleStartDateChange}
        disabledDate={disabledStartDate}
        defaultValue={defaultStartDate}
      />

      <DatePicker
        value={endDate}
        onChange={handleEndDateChange}
        disabledDate={disabledEndDate}
        defaultValue={defaultEndDate}
      />
    </div>
  );
};

export default DatePickerComponent;
