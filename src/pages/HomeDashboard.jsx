import { useApp } from "../context/AppContext";
import { Plus, FileText, CheckSquare, Clock } from "lucide-react";
import { format } from "date-fns";

const HomeDashboard = () => {
    const { notes, tasks, setCurrentView, setCurrentNoteId, addNote } = useApp();

    const recentNotes = notes.slice(0, 4);
    const pendingTasks = tasks.filter((t) => t.status !== "done");
    const highPriorityTasks = tasks.filter((t) => t.priority === "high" && t.status !== "done");

    return (
        <div className="max-w-6xl mx-auto">
            {/* Greeting */}
            <div className="mb-10">
                <h1 className="text-5xl font-bold mb-2">Good morning, Yash 👋</h1>
                <p className="text-xl text-gray-500 dark:text-zinc-400">Here's what's happening in your workspace today</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-8">
                    <div className="flex items-center gap-4">
                        <FileText className="text-indigo-600" size={36} />
                        <div>
                            <p className="text-5xl font-semibold">{notes.length}</p>
                            <p className="text-gray-500 dark:text-zinc-400">Total Notes</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-8">
                    <div className="flex items-center gap-4">
                        <CheckSquare className="text-indigo-600" size={36} />
                        <div>
                            <p className="text-5xl font-semibold">{pendingTasks.length}</p>
                            <p className="text-gray-500 dark:text-zinc-400">Pending Tasks</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-8">
                    <div className="flex items-center gap-4">
                        <Clock className="text-amber-600" size={36} />
                        <div>
                            <p className="text-5xl font-semibold">{highPriorityTasks.length}</p>
                            <p className="text-gray-500 dark:text-zinc-400">High Priority</p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => addNote("Untitled Note")}
                    className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-8 flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-all active:scale-95"
                >
                    <Plus size={48} className="mb-4 opacity-90" />
                    <p className="text-xl font-semibold">New Note</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Notes */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <FileText size={24} /> Recent Notes
                        </h2>
                        <button
                            onClick={() => setCurrentView("notes")}
                            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-medium"
                        >
                            View All →
                        </button>
                    </div>

                    <div className="space-y-4">
                        {recentNotes.length > 0 ? (
                            recentNotes.map((note) => (
                                <div
                                    key={note.id}
                                    onClick={() => {
                                        setCurrentNoteId(note.id);
                                        setCurrentView("editor");
                                    }}
                                    className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-6 hover:border-indigo-500 cursor-pointer transition-all"
                                >
                                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{note.title || "Untitled Note"}</h3>
                                    <p className="text-gray-600 dark:text-zinc-400 line-clamp-2 text-sm">
                                        {note.content ? note.content.replace(/<[^>]+>/g, "").trim() : "No content yet..."}
                                    </p>
                                    <p className="text-xs text-gray-400 mt-3">{format(new Date(note.updatedAt), "MMM dd, yyyy • hh:mm a")}</p>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-12 text-center">
                                <p className="text-gray-500">No notes yet. Create your first one!</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Tasks */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-semibold flex items-center gap-2">
                            <CheckSquare size={24} /> Pending Tasks
                        </h2>
                        <button
                            onClick={() => setCurrentView("tasks")}
                            className="text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 text-sm font-medium"
                        >
                            View Board →
                        </button>
                    </div>

                    <div className="space-y-3">
                        {pendingTasks.length > 0 ? (
                            pendingTasks.slice(0, 5).map((task) => (
                                <div
                                    key={task.id}
                                    onClick={() => setCurrentView("tasks")}
                                    className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl p-5 hover:border-indigo-500 cursor-pointer transition-all flex items-center gap-4"
                                >
                                    <div
                                        className={`w-3 h-3 rounded-full flex-shrink-0 ${
                                            task.priority === "high" ? "bg-red-500" : task.priority === "medium" ? "bg-yellow-500" : "bg-green-500"
                                        }`}
                                    />
                                    <div className="flex-1">
                                        <p className="font-medium">{task.title}</p>
                                        {task.description && (
                                            <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-1">{task.description}</p>
                                        )}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-12 text-center">
                                <p className="text-gray-500">No pending tasks. Great job!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeDashboard;
