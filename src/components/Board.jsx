import { DndContext } from '@dnd-kit/core';
import Column from './Column';
import { useState } from 'react';

const initialTasks = {
    todo: [
        { id: '1', title: 'Crear estructura Kanban' },
        { id: '2', title: 'Agregar estilos con Tailwind' },
    ],
    inProgress: [{ id: '3', title: 'Diseñar columnas' }],
    done: [{ id: '4', title: 'Instalar Vite y Tailwind' }],
};

const Board = () => {
    const [tasks, setTasks] = useState(initialTasks);

    const findColumn = (taskId) => {
        return Object.keys(tasks).find((columnId) =>
            tasks[columnId].some((task) => task.id === taskId)
        );
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;

        if (!over) return;

        const sourceCol = findColumn(active.id);
        const targetCol = over.id;

        if (sourceCol === targetCol) return;

        const task = tasks[sourceCol].find((t) => t.id === active.id);

        setTasks((prev) => ({
            ...prev,
            [sourceCol]: prev[sourceCol].filter((t) => t.id !== active.id),
            [targetCol]: [...prev[targetCol], task],
        }));
    };

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div className="flex gap-6 justify-center flex-wrap">
                <Column id="todo" title="Pendiente" tasks={tasks.todo} />
                <Column
                    id="inProgress"
                    title="En progreso"
                    tasks={tasks.inProgress}
                />
                <Column id="done" title="Completado" tasks={tasks.done} />
            </div>
        </DndContext>
    );
};

export default Board;
