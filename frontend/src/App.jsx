import React, { useState } from 'react';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const toggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle floating particles for life */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Centered glassmorphic todo card */}
      <div className="w-full max-w-lg">
        <div className="bg-white/45 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/40 p-8 md:p-10 transition-all duration-300 hover:shadow-3xl">
          <h1 className="text-4xl md:text-5xl font-light text-gray-800 text-center mb-10 tracking-wider">
            Serene Todos
          </h1>

          {/* Input form */}
          <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-4 mb-10">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Breathe... then add a gentle task"
              className="flex-1 px-6 py-4 rounded-full bg-white/60 backdrop-blur-md border border-white/50 focus:outline-none focus:ring-4 focus:ring-pink-300/40 text-gray-700 placeholder-gray-500 transition-shadow"
            />
            <button
              type="submit"
              className="px-8 py-4 rounded-full bg-gradient-to-r from-orange-300 to-pink-300 text-white font-medium hover:from-orange-400 hover:to-pink-400 transition-all shadow-lg hover:shadow-xl"
            >
              Add
            </button>
          </form>

          {/* Task list */}
          <ul className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-center text-gray-600 italic py-12 text-lg">
                Peaceful and clear ✨ The day is yours.
              </p>
            ) : (
              tasks.map(task => (
                <li
                  key={task.id}
                  className="flex items-center gap-4 p-5 rounded-2xl bg-white/50 backdrop-blur-md hover:bg-white/70 transition-all shadow-md hover:shadow-lg"
                >
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => toggleComplete(task.id)}
                    className="w-6 h-6 rounded-full accent-orange-400 cursor-pointer"
                  />
                  <span
                    className={`flex-1 text-lg transition-all ${
                      task.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {task.text}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-400 hover:text-red-600 text-2xl transition"
                  >
                    ×
                  </button>
                </li>
              ))
            )}
          </ul>

          {/* Remaining count */}
          {tasks.length > 0 && (
            <p className="text-center text-gray-700 mt-10 text-sm font-medium">
              {tasks.filter(t => !t.completed).length} gentle task{tasks.filter(t => !t.completed).length !== 1 ? 's' : ''} left
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;