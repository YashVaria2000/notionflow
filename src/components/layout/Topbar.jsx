import { useApp } from "../../context/AppContext";
import { Sun, Moon, Search } from "lucide-react";

const Topbar = () => {
    const { theme, toggleTheme } = useApp();

    return (
        <div className="h-14 border-b border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 px-6 flex items-center justify-between">
            <div className="flex items-center gap-4 flex-1">
                <h1 className="text-xl font-semibold">NotionFlow</h1>

                <div className="relative ml-8 flex-1 max-w-md">
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search notes and tasks..."
                        className="w-full bg-gray-100 dark:bg-zinc-800 pl-10 py-2 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
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
