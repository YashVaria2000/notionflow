import { useApp } from "../../context/AppContext";
import { Plus, Trash2, Edit3 } from "lucide-react";
import { useState } from "react";
import TaskModal from "./TaskModal";

const KanbanBoard = () => {
    const { tasks, addTask, updateTask, updateTaskStatus, deleteTask } = useApp();

    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const columns = [
        { id: "todo", title: "To Do", bg: "bg-gray-100 dark:bg-zinc-800" },
        { id: "inprogress", title: "In Progress", bg: "bg-blue-50 dark:bg-blue-950/30" },
        { id: "done", title: "Done", bg: "bg-green-50 dark:bg-green-950/30" },
    ];

    const openNewTask = () => {
        setEditingTask(null);
        setShowModal(true);
    };

    const openEditTask = (task) => {
        setEditingTask(task);
        setShowModal(true);
    };

    const handleSaveTask = (taskData) => {
        if (editingTask) {
            updateTask(editingTask.id, taskData);
        } else {
            addTask(taskData);
        }
    };

    const handleDragStart = (e, taskId) => {
        e.dataTransfer.setData("taskId", taskId);
    };

    const handleDrop = (e, newStatus) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData("taskId");
        if (taskId) updateTaskStatus(taskId, newStatus);
    };

    const handleDragOver = (e) => e.preventDefault();

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl text-zinc-900 dark:text-zinc-100 font-semibold">Tasks</h2>
                <button
                    onClick={openNewTask}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium"
                >
                    <Plus size={20} />
                    New Task
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {columns.map((column) => {
                    const columnTasks = tasks.filter((task) => task.status === column.id);

                    return (
                        <div
                            key={column.id}
                            className={`rounded-3xl p-6 min-h-[500px] ${column.bg}`}
                            onDrop={(e) => handleDrop(e, column.id)}
                            onDragOver={handleDragOver}
                        >
                            <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-2">
                                {column.title}
                                <span className="text-sm font-normal text-gray-500">({columnTasks.length})</span>
                            </h3>

                            <div className="space-y-3">
                                {columnTasks.map((task) => (
                                    <div
                                        key={task.id}
                                        draggable
                                        onDragStart={(e) => handleDragStart(e, task.id)}
                                        className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-zinc-700 cursor-grab active:cursor-grabbing group hover:shadow-md transition-all"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <p className="font-medium text-zinc-900 dark:text-zinc-100">{task.title}</p>
                                                {task.description && (
                                                    <p className="text-sm text-gray-500 dark:text-zinc-400 mt-1 line-clamp-2">{task.description}</p>
                                                )}
                                                <div
                                                    className={`inline-block mt-3 text-xs px-3 py-1 rounded-full ${
                                                        task.priority === "high"
                                                            ? "bg-red-100 text-red-700 dark:bg-red-900/40"
                                                            : task.priority === "medium"
                                                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40"
                                                              : "bg-green-100 text-green-700 dark:bg-green-900/40"
                                                    }`}
                                                >
                                                    {task.priority}
                                                </div>
                                            </div>

                                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-all">
                                                <button onClick={() => openEditTask(task)} className="p-1.5 text-gray-400 hover:text-indigo-600">
                                                    <Edit3 size={18} />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        if (window.confirm("Delete this task?")) deleteTask(task.id);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-red-600"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
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
            {setShowModal && (
                <TaskModal
                    isOpen={showModal}
                    onClose={() => {
                        setShowModal(false);
                        setEditingTask(null);
                    }}
                    onSave={handleSaveTask}
                    initialTask={editingTask}
                />
            )}
        </div>
    );
};

export default KanbanBoard;
