// App.jsx
import { useState, useEffect } from 'react';
import { DndContext } from '@dnd-kit/core';
import Column from './components/Column';
import { v4 as uuidv4 } from 'uuid';

function App() {
    // Cargar columnas desde localStorage o usar el estado inicial
    const [columns, setColumns] = useState(() => {
        const saved = localStorage.getItem('kanban-columns');
        return saved
            ? JSON.parse(saved)
            : {
                  todo: [],
                  inProgress: [],
                  done: [],
              };
    });

    // Guardar columnas en localStorage cada vez que cambian
    useEffect(() => {
        localStorage.setItem('kanban-columns', JSON.stringify(columns));
    }, [columns]);

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over) return;

        const fromColumn = active.data.current.columnId;
        const toColumn = over.data.current.columnId;

        if (fromColumn === toColumn) return;

        const movingTask = columns[fromColumn].find((t) => t.id === active.id);
        if (!movingTask) return;

        setColumns((prev) => {
            const updated = { ...prev };
            updated[fromColumn] = updated[fromColumn].filter(
                (t) => t.id !== active.id
            );
            updated[toColumn] = [...updated[toColumn], movingTask];
            return updated;
        });
    };

    const handleAddTask = () => {
        const title = prompt('Título de la tarea');
        const description = prompt('Descripción de la tarea');
        if (!title) return;
        const newTask = {
            id: uuidv4(),
            title,
            description: description || '',
        };
        setColumns((prev) => ({
            ...prev,
            todo: [...prev.todo, newTask],
        }));
    };

    const handleDeleteTask = (columnId, taskId) => {
        setColumns((prev) => ({
            ...prev,
            [columnId]: prev[columnId].filter((t) => t.id !== taskId),
        }));
    };

    const handleUpdateDescription = (columnId, taskId, newDesc) => {
        setColumns((prev) => ({
            ...prev,
            [columnId]: prev[columnId].map((t) =>
                t.id === taskId ? { ...t, description: newDesc } : t
            ),
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="text-center mb-6">
                <h1 className="text-3xl font-bold mb-2">Tablero Kanban</h1>
                <button
                    onClick={handleAddTask}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                    + Agregar tarea
                </button>
            </div>

            <DndContext onDragEnd={handleDragEnd}>
                <div className="flex gap-6 justify-center">
                    <Column
                        id="todo"
                        title="Por Hacer"
                        tasks={columns.todo}
                        onDeleteTask={handleDeleteTask}
                        onUpdateDescription={handleUpdateDescription}
                    />
                    <Column
                        id="inProgress"
                        title="En Progreso"
                        tasks={columns.inProgress}
                        onDeleteTask={handleDeleteTask}
                        onUpdateDescription={handleUpdateDescription}
                    />
                    <Column
                        id="done"
                        title="Completado"
                        tasks={columns.done}
                        onDeleteTask={handleDeleteTask}
                        onUpdateDescription={handleUpdateDescription}
                    />
                </div>
            </DndContext>
        </div>
    );
}

export default App;
