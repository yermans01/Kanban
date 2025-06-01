// Column.jsx
import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

function Column({ id, title, tasks, onDeleteTask, onUpdateDescription }) {
    const { setNodeRef } = useDroppable({ id, data: { columnId: id } });

    return (
        <div ref={setNodeRef} className="flex-1 min-w-[300px]">
            <div className="bg-white p-4 rounded-xl shadow mb-4 text-center font-bold text-lg">
                {title}
            </div>
            <div className="space-y-4">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        columnId={id}
                        onDelete={onDeleteTask}
                        onUpdateDescription={onUpdateDescription}
                    />
                ))}
            </div>
        </div>
    );
}

export default Column;
