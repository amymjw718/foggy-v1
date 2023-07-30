import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'

export default function Calender() {
    const [value, onChange] = useState(new Date());
    // console.log(value)
    // Sat Jul 15 2023 00:00:00 GMT+1200 (New Zealand
  return (
    <div className='mt-3 ml-3 p-5'>
        <Calendar
            onChange={onChange}
            value={value}
        />
    </div>
  )
}
