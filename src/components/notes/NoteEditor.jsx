import { useApp } from "../../context/AppContext";
import { useEffect, useState, useCallback } from "react";
import { ArrowLeft, Trash2 } from "lucide-react";

const NoteEditor = () => {
    const { currentNoteId, notes, updateNote, deleteNote, setCurrentView } = useApp();

    const currentNote = notes.find((note) => note.id === currentNoteId);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // Load note data when note changes
    useEffect(() => {
        if (currentNote) {
            setTitle(currentNote.title || "");
            setContent(currentNote.content || "");
        }
    }, [currentNoteId]); // Only depend on ID, not the whole object

    // Auto-save with debounce to prevent flickering
    const saveNote = useCallback(() => {
        if (currentNoteId) {
            updateNote(currentNoteId, { title, content });
        }
    });

    useEffect(() => {
        const timer = setTimeout(saveNote, 500); // Debounce save
        return () => clearTimeout(timer);
    }, [title, content]);

    if (!currentNote) {
        return <div className="text-center py-20 text-gray-500">Note not found</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button
                    onClick={() => setCurrentView("notes")}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-xl"
                >
                    <ArrowLeft size={24} />
                </button>

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="flex-1 bg-transparent text-4xl text-zinc-900 dark:text-zinc-100 font-semibold focus:outline-none placeholder:text-gray-400"
                    placeholder="Untitled Note"
                />

                <button
                    onClick={() => {
                        if (window.confirm("Delete this note?")) {
                            deleteNote(currentNoteId);
                        }
                    }}
                    className="p-3 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-xl transition-colors"
                >
                    <Trash2 size={22} />
                </button>
            </div>

            {/* Content Editor */}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-[70vh] bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-gray-200 dark:border-zinc-700 rounded-3xl p-8 text-lg focus:outline-none resize-none leading-relaxed"
                placeholder="Start writing here..."
            />

            <div className="text-xs text-gray-400 mt-4 text-center">Last updated: {new Date(currentNote.updatedAt).toLocaleString()}</div>
        </div>
    );
};

export default NoteEditor;
