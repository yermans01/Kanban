// TaskCard.jsx
import { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { GripVertical, Trash2 } from 'lucide-react';

function TaskCard({ task, columnId, onDelete, onUpdateDescription }) {
    const { attributes, listeners, setNodeRef, transform, isDragging } =
        useDraggable({ id: task.id, data: { columnId } });

    const [isEditing, setIsEditing] = useState(false);
    const [desc, setDesc] = useState(task.description);

    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        opacity: isDragging ? 0.5 : 1,
    };

    const handleDescKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            setIsEditing(false);
            onUpdateDescription(columnId, task.id, desc);
        }
        e.stopPropagation();
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`rounded-xl p-4 mb-3 shadow bg-white border-l-4 cursor-default ${
                columnId === 'todo'
                    ? 'border-red-400'
                    : columnId === 'inProgress'
                    ? 'border-yellow-400'
                    : 'border-green-400'
            }`}
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{task.title}</h3>
                <div className="flex items-center gap-2">
                    {columnId === 'done' && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(columnId, task.id);
                            }}
                            className="text-red-500 hover:text-red-700"
                        >
                            <Trash2 size={18} />
                        </button>
                    )}
                    <span
                        {...listeners}
                        {...attributes}
                        className="cursor-grab text-gray-400 hover:text-gray-600"
                    >
                        <GripVertical size={18} />
                    </span>
                </div>
            </div>

            {isEditing ? (
                <textarea
                    className="w-full p-2 rounded border border-gray-300"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                    onKeyDown={handleDescKeyDown}
                    onBlur={() => {
                        setIsEditing(false);
                        onUpdateDescription(columnId, task.id, desc);
                    }}
                    autoFocus
                    rows={3}
                />
            ) : (
                <p
                    className="text-gray-700 whitespace-pre-wrap cursor-pointer"
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsEditing(true);
                    }}
                >
                    {desc || '(sin descripción)'}
                </p>
            )}
        </div>
    );
}

export default TaskCard;
