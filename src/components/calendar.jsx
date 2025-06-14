import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import isToday from 'dayjs/plugin/isToday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import '../index.css';
dayjs.extend(weekday);
dayjs.extend(isToday);
dayjs.extend(advancedFormat);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

function Calendar({ events, currentDate, setCurrentDate }) {
  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.weekday();
  const daysInMonth = currentDate.daysInMonth();

  const days = [];

      for (let i = 0; i < startDay; i++) {
        days.push(null);
      }

        for (let d = 1; d <= daysInMonth; d++) {
          days.push(dayjs(currentDate).date(d));
        }

    const handlePrevMonth = () => {
      setCurrentDate(currentDate.subtract(1, 'month'));
    };

      const handleNextMonth = () => {
        setCurrentDate(currentDate.add(1, 'month'));
      };

  const renderEvents = (date) => {
    const dateStr = date.format('YYYY-MM-DD');
    const dailyEvents = events.filter(e =>
      dayjs(e.startTime).format('YYYY-MM-DD') === dateStr
    );

    if (dailyEvents.length === 0) return null;

       const visible = dailyEvents.slice(0, 2);
    const extra = dailyEvents.length > 2;

    return (
      <div className="mt-1 space-y-1 w-full">
            {visible.map((e, i) => (
              <div
                key={i}
                className={`text-xs px-2 py-1 text-white truncate rounded shadow-sm ${e.color || 'bg-blue-500'}`}
                title={e.title}
              >
                {e.title}
              </div>
            ))}
            {extra && (
              <span className="text-xs text-blue-600 dark:text-blue-300 cursor-pointer">
                + View more
              </span>
            )}
      </div>
    );
  };

  return (
      <div className="p-4 dark:bg-gray-900 bg-white text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrevMonth}
            className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
          >
          Prev
            </button>
            <h2 className="text-xl font-semibold">
              {currentDate.format('MMMM YYYY')}
            </h2>
            <button
          onClick={handleNextMonth}
          className="px-3 py-1 rounded bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 transition"
        >
          Next
        </button>
      </div>

              <div className="grid grid-cols-7 gap-2 text-center text-sm font-medium">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-gray-500 dark:text-gray-400">{day}</div>
                ))}
              </div>

      <div className="grid grid-cols-7 gap-2 mt-2">
           {days.map((day, idx) => {
             const isSelected = day?.isSame(currentDate, 'day');
          const isToday = day?.isToday();

          return (
            <div
              key={idx}
           onClick={() => day && setCurrentDate(day)}
            className={`h-28 border p-1 flex flex-col items-start text-xs overflow-hidden rounded-md cursor-pointer transition
              ${isToday ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-gray-700'}
              ${isSelected ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700'}
              `}
            >
              <span className="text-xs font-bold text-gray-700 dark:text-gray-300">
                {day ? day.date() : ''}
             </span>
              {day && renderEvents(day)}
         </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calendar;
