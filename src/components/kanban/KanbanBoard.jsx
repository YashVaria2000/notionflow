import { useApp } from "../../context/AppContext";
import { Plus } from "lucide-react";
import { useState } from "react";

const KanbanBoard = () => {
    const { tasks, addTask, updateTaskStatus } = useApp();
    const [newTaskTitle, setNewTaskTitle] = useState("");

    const columns = [
        { id: "todo", title: "To Do", color: "bg-gray-100 dark:bg-zinc-800" },
        {
            id: "inprogress",
            title: "In Progress",
            color: "bg-blue-50 dark:bg-blue-950/30",
        },
        {
            id: "done",
            title: "Done",
            color: "bg-green-50 dark:bg-green-950/30",
        },
    ];

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
                        className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 px-4 py-2.5 rounded-2xl focus:outline-none w-80"
                    />
                    <button
                        onClick={handleAddTask}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-2xl flex items-center gap-2"
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
                            className={`rounded-3xl p-6 ${column.color}`}
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
                                        className="bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700"
                                    >
                                        <p className="font-medium">
                                            {task.title}
                                        </p>
                                        <div className="flex gap-2 mt-4">
                                            {columns.map((col) => (
                                                <button
                                                    key={col.id}
                                                    onClick={() =>
                                                        updateTaskStatus(
                                                            task.id,
                                                            col.id,
                                                        )
                                                    }
                                                    className={`text-xs px-3 py-1 rounded-full transition-colors ${
                                                        task.status === col.id
                                                            ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300"
                                                            : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                                                    }`}
                                                >
                                                    {col.title}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default KanbanBoard;
