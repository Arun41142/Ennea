import React, { useState } from 'react';
import { DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import '../styles/DatePickerComponent.css';

const DatePickerComponent = () => {
  const [startDate, setStartDate] = useState(dayjs().subtract(7, 'days'));
  const [endDate, setEndDate] = useState(dayjs());

  const handleStartDateChange = (date) => {
    setStartDate(date);
    onDatesChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    onDatesChange(startDate, date);
  };


  return (
    <div className="date-picker-container">
      <DatePicker value={startDate} onChange={handleStartDateChange} />
      <DatePicker value={endDate} onChange={handleEndDateChange} />
      <Button type="primary" onClick={() => onDatesChange(startDate, endDate)}>
        Apply Filter
      </Button>
    </div>
  );
};

export default DatePickerComponent;
