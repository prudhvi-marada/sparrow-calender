import { Moon, Sun, PlusCircle, CalendarDays } from "lucide-react";

function Header({ darkMode, setDarkMode }) {
  

  return (
    <header className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-800 sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <CalendarDays className="w-6 h-6 text-blue-500" />
        <h1 className="text-xl font-bold">My Calendar</h1>
      </div>

      <div className="flex gap-4 items-center">
        <button
         
          className="flex items-center gap-1 text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          <PlusCircle size={16} />
          Add Event
            </button>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
            >
          {darkMode ? <Moon size={20} /> : <Sun size={20} />}
        </button>
      </div>
    </header>
  );
}

export default Header;
