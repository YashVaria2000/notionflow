import { useApp } from "../../context/AppContext";
import { Plus, Trash2 } from "lucide-react";
import { useState } from "react";

const KanbanBoard = () => {
    const { tasks, addTask, updateTaskStatus, deleteTask } = useApp();
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const columns = [
        { id: "todo", title: "To Do", bg: "bg-gray-100 dark:bg-zinc-800" },
        {
            id: "inprogress",
            title: "In Progress",
            bg: "bg-blue-50 dark:bg-blue-950/30",
        },
        { id: "done", title: "Done", bg: "bg-green-50 dark:bg-green-950/30" },
    ];

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        if (taskId) {
            updateTaskStatus(taskId, newStatus);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault(); // Important for allowing drop
    };

    const handleAddTask = () => {
        if (newTaskTitle.trim()) {
            addTask(newTaskTitle.trim());
            setNewTaskTitle("");
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-semibold">Tasks</h2>

                <div className="flex gap-3">
                    <input
                        type="text"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
                        placeholder="New task title..."
                        className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 py-3 rounded-2xl focus:outline-none w-80"
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium"
                    >
                        <Plus size={20} />
                        Add Task
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((column) => {
                    const columnTasks = tasks.filter(
                        (task) => task.status === column.id,
                    );

                    return (
                        <div
                            key={column.id}
                            className={`rounded-3xl p-6 min-h-[500px] ${column.bg}`}
                            onDrop={(e) => handleDrop(e, column.id)}
                            onDragOver={handleDragOver}
                        >
                            <h3 className="font-semibold text-lg mb-6 flex items-center gap-2">
                                {column.title}
                                <span className="text-sm font-normal text-gray-500">
                                    ({columnTasks.length})
                                </span>
                            </h3>

                            <div className="space-y-3">
                                {columnTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        draggable
                                        onDragStart={(e) =>
                                            handleDragStart(e, task.id)
                                        }
                                        className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 hover:border-indigo-500 hover:shadow-m transition-all cursor-grab active:cursor-grabbing group"
                                    >
                                        <div className="flex justify-between items-start">
                                            <p className="font-medium pr-8">
                                                {task.title}
                                            </p>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        window.confirm(
                                                            "Delete this task?",
                                                        )
                                                    ) {
                                                        deleteTask(task.id);
                                                    }
                                                }}
                                                className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-600 transition-all"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {columnTasks.length === 0 && (
                                <div className="text-center py-12 text-gray-400 dark:text-zinc-500 border-2 border-dashed border-gray-300 dark:border-zinc-700 rounded-2xl">
                                    Drop tasks here
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default KanbanBoard;
