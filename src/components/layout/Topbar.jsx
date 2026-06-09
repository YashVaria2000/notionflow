import { useApp } from "../../context/AppContext";
import { Sun, Moon, Search } from "lucide-react";
import { useState, useEffect } from "react";

const Topbar = () => {
    const { theme, toggleTheme, setCurrentView, setCurrentNoteId, notes, tasks } = useApp();

    const [searchTerm, setSearchTerm] = useState("");
    const [showResults, setShowResults] = useState(false);

    // Combined search results
    const searchResults = [
        ...notes
            .filter(
                (note) =>
                    note.title?.toLowerCase().includes(searchTerm.toLowerCase()) || note.content?.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .slice(0, 4)
            .map((note) => ({ type: "note", ...note })),

        ...tasks
            .filter(
                (task) =>
                    task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    task.description?.toLowerCase().includes(searchTerm.toLowerCase()),
            )
            .slice(0, 3)
            .map((task) => ({ type: "task", ...task })),
    ].slice(0, 6);

    useEffect(() => {
        const handleClickOutside = () => setShowResults(false);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, []);

    const handleSelect = (item) => {
        if (item.type === "note") {
            setCurrentNoteId(item.id);
            setCurrentView("editor");
        } else {
            setCurrentView("tasks");
        }
        setSearchTerm("");
        setShowResults(false);
    };

    return (
        <div className="h-14 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-6 flex items-center justify-between relative z-40">
            <div className="flex items-center gap-4 flex-1">
                {/* <h1 className="text-xl font-semibold">NotionFlow</h1> */}

                <div className="relative  flex-1 max-w-md">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notes and tasks..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setShowResults(true);
                        }}
                        onFocus={() => setShowResults(true)}
                        className="w-full bg-gray-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 pl-10 py-2.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    {/* Search Dropdown */}
                    {showResults && searchTerm && (
                        <div className="absolute mt-2 w-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-xl max-h-80 overflow-auto z-50">
                            {searchResults.length > 0 ? (
                                searchResults.map((item, index) => (
                                    <div
                                        key={index}
                                        onClick={() => handleSelect(item)}
                                        className="px-4 py-3 hover:bg-gray-100 dark:hover:bg-zinc-800 cursor-pointer border-b border-gray-100 dark:border-zinc-800 last:border-none flex items-center gap-3"
                                    >
                                        {item.type === "note" ? <div className="text-blue-600">📝</div> : <div className="text-amber-600">✓</div>}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-zinc-900 dark:text-zinc-100 truncate">{item.title}</p>
                                            {item.description && (
                                                <p className="text-xs text-gray-500 dark:text-zinc-400 truncate">{item.description}</p>
                                            )}
                                        </div>
                                        <span className="text-xs uppercase tracking-widest text-gray-400">{item.type}</span>
                                    </div>
                                ))
                            ) : (
                                <div className="px-6 py-8 text-center text-gray-500">No results found</div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={toggleTheme}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg transition-colors"
                >
                    {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full"></div>
            </div>
        </div>
    );
};

export default Topbar;
