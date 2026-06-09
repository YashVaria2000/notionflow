import { useApp } from "../../context/AppContext";
import { useState, useEffect } from "react";
import { Plus, Calendar, Trash2, Search } from "lucide-react";
import { format } from "date-fns";

const NotesList = () => {
    const { notes, setCurrentView, setCurrentNoteId, addNote, deleteNote } = useApp();

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredNotes, setFilteredNotes] = useState(notes);

    // Debounced Search
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!searchTerm.trim()) {
                setFilteredNotes(notes);
            } else {
                const term = searchTerm.toLowerCase();
                const filtered = notes.filter((note) => note.title?.toLowerCase().includes(term) || note.content?.toLowerCase().includes(term));
                setFilteredNotes(filtered);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [searchTerm, notes]);

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl text-zinc-900 dark:text-zinc-100 font-semibold">All Notes</h2>

                <div className="relative w-80">
                    <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-700 pl-11 py-3 rounded-2xl focus:outline-none focus:border-indigo-500"
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
                        {searchTerm ? "No matching notes found" : "No notes yet. Create your first one!"}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map((note) => (
                        <div
                            key={note.id}
                            className="group bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-3xl p-6 hover:border-indigo-500 hover:shadow-xl transition-all relative"
                        >
                            <div
                                onClick={() => {
                                    setCurrentNoteId(note.id);
                                    setCurrentView("editor");
                                }}
                                className="cursor-pointer"
                            >
                                <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 text-xl mb-3 line-clamp-2 pr-8">
                                    {note.title || "Untitled Note"}
                                </h3>

                                <p className="text-gray-600 dark:text-zinc-400 line-clamp-4 text-[15px] mb-6">
                                    {note.content ? note.content.replace(/<[^>]+>/g, " ").trim() : "No content yet..."}
                                </p>
                            </div>

                            <div className="flex items-center justify-between text-xs text-gray-400">
                                <div className="flex items-center gap-1">
                                    <Calendar size={14} />
                                    {format(new Date(note.updatedAt), "MMM dd, yyyy")}
                                </div>
                            </div>

                            {/* Delete Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm("Delete this note?")) {
                                        deleteNote(note.id);
                                    }
                                }}
                                className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-all"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotesList;
