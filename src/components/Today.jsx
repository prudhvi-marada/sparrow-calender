import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Clock, CalendarDays } from 'lucide-react';

dayjs.extend(duration);

function TodayEvent({ currentDate, events }) {
  const [now, setNow] = useState(dayjs());

  useEffect(() => {
    const timer = setInterval(() => setNow(dayjs()), 1000);
    return () => clearInterval(timer);
  }, []);

  const todayStr = currentDate.format('YYYY-MM-DD');
  const todaysEvents = events.filter(e =>
    dayjs(e.startTime).format('YYYY-MM-DD') === todayStr
  );

  const calculateDuration = (start, end) => {
      const diff = dayjs(end).diff(dayjs(start), 'minute');
      const dur = dayjs.duration(diff, 'minutes');
      return `${dur.hours()}h ${dur.minutes()}m`;
    };

  return (
    <div className="p-6 border-b border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 shadow-sm">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
            <CalendarDays className="w-5 h-5" />
            Today - {now.format('dddd, MMMM D, YYYY')}
          </h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        <Clock className="inline-block w-4 h-4 mr-1" />
        Current Time: {now.format('HH:mm:ss')}
      </p>
      <p>Events Of The Selected Day</p>
          {todaysEvents.length > 0 ? (
            <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {todaysEvents.map((event, idx) => (
                <li
              key={idx}
              className={`rounded-lg shadow-md p-4 transition-all duration-300 hover:scale-[1.02] border dark:border-gray-600 text-white ${event.color || 'bg-blue-500'}`}
            >
                    <h3 className="font-semibold text-lg">{event.title}</h3>
                    <p className="text-sm">
                      {dayjs(event.startTime).format('HH:mm')} - {dayjs(event.endTime).format('HH:mm')}
                    </p>
              <p className="text-xs mt-1 opacity-80 italic">
                Duration: {calculateDuration(event.startTime, event.endTime)}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 italic mt-4">
          No events scheduled for the day.
        </p>
      )}
    </div>
  );
}

export default TodayEvent;
