import { useState, useEffect } from "react";
import { X } from "lucide-react";

const TaskModal = ({ isOpen, onClose, onSave, initialTask = null }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState("low");

    // Reset form when modal opens/closes or when initialTask changes
    useEffect(() => {
        if (isOpen) {
            if (initialTask) {
                setTitle(initialTask.title || "");
                setDescription(initialTask.description || "");
                setPriority(initialTask.priority || "low");
            } else {
                // Reset for new task
                setTitle("");
                setDescription("");
                setPriority("low");
            }
        }
    }, [isOpen, initialTask]);

    const handleSave = () => {
        if (!title.trim()) {
            alert("Title is required");
            return;
        }

        onSave({
            id: initialTask?.id,
            title: title.trim(),
            description: description.trim(),
            priority,
        });

        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 w-full max-w-md mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl text-zinc-900 dark:text-zinc-100 font-semibold">{initialTask ? "Edit Task" : "New Task"}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <X size={24} />
                    </button>
                </div>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Task title *"
                    className="w-full mb-4 px-4 py-3 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-indigo-500"
                />

                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full mb-4 px-4 py-3 rounded-2xl text-zinc-900 dark:text-zinc-100 border border-gray-300 dark:border-zinc-700 focus:outline-none"
                >
                    <option value="low">Low Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="high">High Priority</option>
                </select>

                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Description (optional)"
                    className="w-full h-32 px-4 py-3 text-zinc-900 dark:text-zinc-100 rounded-2xl border border-gray-300 dark:border-zinc-700 focus:outline-none resize-y"
                />

                <div className="flex gap-3 mt-8">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 rounded-2xl font-medium hover:bg-gray-50 dark:hover:bg-zinc-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-medium transition-colors"
                    >
                        {initialTask ? "Update Task" : "Create Task"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TaskModal;
