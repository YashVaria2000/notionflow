import { useApp } from "../../context/AppContext";
import { Plus, Calendar, Search } from "lucide-react";
import { format } from "date-fns";
import { useState, useEffect } from "react";

const NotesList = () => {
    const { notes, setCurrentView, setCurrentNoteId, addNote } = useApp();

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNotes, setFilteredNotes] = useState(notes);

    // Debounced Search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!searchTerm.trim()) {
                setFilteredNotes(notes);
            } else {
                const term = searchTerm.toLowerCase();
                const filtered = notes.filter(
                    (note) =>
                        note.title.toLowerCase().includes(term) ||
                        (note.content &&
                            note.content.toLowerCase().includes(term)),
                );
                setFilteredNotes(filtered);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, notes]);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-semibold">All Notes</h2>

                <div className="relative w-80">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 pl-11 py-3 rounded-2xl focus:outline-none focus:border-indigo-500"
                    />
                </div>

                <button
                    onClick={() => addNote("Untitled Note")}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2 font-medium transition-colors"
                >
                    <Plus size={20} />
                    New Note
                </button>
            </div>

            {filteredNotes.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-xl text-gray-500 dark:text-zinc-400">
                        {searchTerm
                            ? "No matching notes found"
                            : "No notes yet. Create your first one!"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            onClick={() => {
                                setCurrentNoteId(note.id);
                                setCurrentView("editor");
                            }}
                            className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-6 hover:border-indigo-500 hover:shadow-xl cursor-pointer transition-all group"
                        >
                            <h3 className="font-semibold text-xl mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                                {note.title || "Untitled Note"}
                            </h3>

                            <p className="text-gray-600 dark:text-zinc-400 line-clamp-4 text-[15px] mb-6">
                                {note.content
                                    ? note.content
                                          .replace(/<[^>]+>/g, " ")
                                          .trim()
                                    : "No content yet..."}
                            </p>

                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {format(
                                        new Date(note.updatedAt),
                                        "MMM dd, yyyy",
                                    )}
                                </div>
                                <span className="text-[10px] opacity-60">
                                    Click to open
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesList;
