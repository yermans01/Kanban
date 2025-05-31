import { useDraggable } from '@dnd-kit/core';

const TaskCard = ({ task }) => {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });
    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
    };
    return (
        <div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            className="bg-white shadow rounded p-4 mb-3 cursor-move"
        >
            <p className="text-gray-800">{task.title}</p>
        </div>
    );
};

export default TaskCard;
