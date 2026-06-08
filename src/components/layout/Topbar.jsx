import { useApp } from "../../context/AppContext";
import { Sun, Moon, Search } from "lucide-react";
import { useState, useEffect } from "react";

const Topbar = () => {
    const { theme, toggleTheme, setCurrentView, setCurrentNoteId, notes } =
        useApp();
    const [searchTerm, setSearchTerm] = useState("");
    const [showResults, setShowResults] = useState(false);

    const filteredNotes = notes
        .filter(
            (note) =>
                note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                note.content?.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 5);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = () => setShowResults(false);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSelectNote = (note) => {
        setCurrentNoteId(note.id);
        setCurrentView("editor");
        setSearchTerm("");
        setShowResults(false);
    };

    return (
        <div className="h-14 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 flex items-center justify-between relative">
            <div className="flex justify-center items-center gap-4 flex-1">
                {/* <h1 className="text-xl font-semibold">NotionFlow</h1> */}

                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowResults(true);
                        }}
                        onFocus={() => setShowResults(true)}
                        className="w-full bg-gray-100 dark:bg-zinc-800 pl-10 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {/* Search Results Dropdown */}
                    {showResults && searchTerm && (
                        <div className="absolute mt-2 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-xl z-50 max-h-80 overflow-auto">
                            {filteredNotes.length > 0 ? (
                                filteredNotes.map((note) => (
                                    <div
                                        key={note.id}
                                        onClick={() => handleSelectNote(note)}
                                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer border-b border-gray-100 dark:border-zinc-800 last:border-none"
                                    >
                                        <p className="font-medium">
                                            {note.title || "Untitled Note"}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-zinc-400 line-clamp-1">
                                            {note.content
                                                ? note.content
                                                      .replace(/<[^>]+>/g, "")
                                                      .slice(0, 80)
                                                : ""}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-6 text-center text-gray-500">
                                    No matching notes found
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full"></div>
            </div>
        </div>
    );
};

export default Topbar;
