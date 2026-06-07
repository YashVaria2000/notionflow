import { useApp } from "../context/AppContext";
import { Plus, FileText, CheckSquare } from "lucide-react";

const HomeDashboard = () => {
    const { notes, tasks, setCurrentView, addNote } = useApp();

    const recentNotes = notes.slice(0, 4);
    const pendingTasks = tasks.filter((t) => t.status !== "done").length;

    return (
        <div className="max-w-5xl mx-auto">
            <div className="mb-10">
                <p className="text-xl text-gray-500 dark:text-zinc-400">
                    Here's what's happening with your workspace
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-8">
                    <div className="flex items-center gap-4">
                        <FileText className="text-indigo-600" size={32} />
                        <div>
                            <p className="text-4xl font-semibold">
                                {notes.length}
                            </p>
                            <p className="text-gray-500">Total Notes</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-8">
                    <div className="flex items-center gap-4">
                        <CheckSquare className="text-indigo-600" size={32} />
                        <div>
                            <p className="text-4xl font-semibold">
                                {pendingTasks}
                            </p>
                            <p className="text-gray-500">Pending Tasks</p>
                        </div>
                    </div>
                </div>

                <div
                    onClick={() => addNote("Untitled Note")}
                    className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-3xl p-8 flex flex-col justify-center items-center cursor-pointer hover:scale-105 transition-transform"
                >
                    <Plus size={40} className="mb-4" />
                    <p className="text-xl font-medium">Create New Note</p>
                </div>
            </div>

            {/* Recent Notes */}
            {recentNotes.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mb-6">
                        Recent Notes
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recentNotes.map((note) => (
                            <div
                                key={note.id}
                                onClick={() => {
                                    setCurrentNoteId(note.id);
                                    setCurrentView("editor");
                                }}
                                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-6 hover:border-indigo-500 cursor-pointer"
                            >
                                <h3 className="font-semibold text-lg mb-2">
                                    {note.title || "Untitled Note"}
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-zinc-400 line-clamp-3">
                                    {note.content
                                        ? note.content.replace(/<[^>]+>/g, "")
                                        : "No content yet"}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default HomeDashboard;
