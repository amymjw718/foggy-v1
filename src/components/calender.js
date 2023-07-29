import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

export default function Calender() {
    const [value, onChange] = useState(new Date());
  return (
    <div className='mt-3 ml-3 p-5'>
        <Calendar
            onChange={onChange}
            value={value}
        />
    </div>
  )
}
