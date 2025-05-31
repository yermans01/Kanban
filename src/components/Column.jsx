import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';

const Column = ({ id, title, tasks }) => {
    const { setNodeRef, isOver } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`bg-gray-200 rounded p-4 w-80 min-h-[300px] transition-colors ${
                isOver ? 'bg-blue-200' : 'bg-gray-200'
            }`}
        >
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            {tasks.map((task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    );
};

export default Column;
