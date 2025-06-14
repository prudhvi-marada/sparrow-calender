import React, { useState, useEffect } from 'react';
import Calendar from './components/calendar';
import Header from './components/Header';
import TodayEvent from './components/Today';
import dayjs from 'dayjs';
import './index.css';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(dayjs());

  useEffect(() => {
    const loadEvents = async () => {
         const response = await fetch('/events.json');
      const events = await response.json();
      setEvents(events);
    };
    loadEvents();
  }, []);

  useEffect(() => {
      document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);



  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen text-black dark:text-white">
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}       
      />
      <TodayEvent currentDate={currentDate} events={events}  />
      <Calendar
        events={events}
         currentDate={currentDate}
         setCurrentDate={setCurrentDate}
      />
    </div>
  );
}

export default App;
