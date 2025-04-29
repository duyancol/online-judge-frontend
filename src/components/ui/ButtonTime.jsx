export function ButtonTime({ title, value, best, isSelected, onClick }) {
    return (
      <button
        onClick={onClick}
        className={`flex flex-col items-center justify-center px-6 py-4 rounded-lg border 
          ${isSelected ? "bg-green-600 text-white" : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"}
          transition-all duration-200 shadow-sm`}
      >
        <div className="text-xs">{title}</div>
        <div className="text-base font-semibold">
          {value} | Best: {best}
        </div>
      </button>
    );
  }
  