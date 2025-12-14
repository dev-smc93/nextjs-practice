"use client";

import { useState } from "react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [count, setCount] = useState(0);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");

  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
      setInput("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-4xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-zinc-900 dark:text-zinc-50">Counter & Todo App</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Counter Section */}
          <div className="flex flex-col items-center gap-4 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">카운터</h2>
            <div className="text-5xl font-bold text-zinc-900 dark:text-zinc-50">{count}</div>
            <div className="flex gap-3">
              <button onClick={() => setCount(count - 1)} className="px-6 py-2 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">
                감소
              </button>
              <button onClick={() => setCount(0)} className="px-6 py-2 rounded-lg bg-gray-500 text-white font-medium hover:bg-gray-600 transition-colors">
                리셋
              </button>
              <button onClick={() => setCount(count + 1)} className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition-colors">
                증가
              </button>
            </div>
          </div>

          {/* Todo Section */}
          <div className="flex flex-col gap-4 p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">할 일 목록</h2>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addTodo()}
                placeholder="할 일을 입력하세요..."
                className="flex-1 px-4 py-2 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button onClick={addTodo} className="px-6 py-2 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 transition-colors">
                추가
              </button>
            </div>

            <ul className="flex flex-col gap-2">
              {todos.length === 0 ? (
                <li className="text-zinc-500 dark:text-zinc-400 text-center py-4">할 일이 없습니다.</li>
              ) : (
                todos.map((todo) => (
                  <li
                    key={todo.id}
                    className={`flex items-center gap-3 p-3 rounded-lg border ${
                      todo.completed ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700" : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo.id)} className="w-5 h-5 cursor-pointer" />
                    <span className={`flex-1 ${todo.completed ? "line-through text-zinc-500 dark:text-zinc-400" : "text-zinc-900 dark:text-zinc-50"}`}>{todo.text}</span>
                    <button onClick={() => deleteTodo(todo.id)} className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition-colors">
                      삭제
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
