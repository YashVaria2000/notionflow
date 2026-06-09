import { useApp } from "../../context/AppContext";
import ResetModal from "../common/ResetModal";
import { Trash2 } from "lucide-react";
import { Home, FileText, CheckSquare, Plus, Menu } from "lucide-react";
import { useState } from "react";

const Sidebar = () => {
    const { setCurrentView, currentView, addNote, resetAllData } = useApp();
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [showResetModal, setShowResetModal] = useState(false);

    const menuItems = [
        { label: "Home", icon: Home, view: "home" },
        { label: "All Notes", icon: FileText, view: "notes" },
        { label: "Tasks", icon: CheckSquare, view: "tasks" },
    ];

    return (
        <div
            className={`border-r border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex flex-col transition-all duration-300 ${isCollapsed ? "w-20" : "w-72"}`}
        >
            {/* Header */}
            <div className="p-4 flex items-center justify-between border-b border-gray-200 dark:border-zinc-800">
                {!isCollapsed && (
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                            N
                        </div>
                        <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-2xl tracking-tight">NotionFlow</span>
                    </div>
                )}
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-lg transition-colors"
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* New Note Button */}
            <div className="p-4">
                <button
                    onClick={() => addNote("Untitled Note")}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition-all active:scale-95"
                >
                    <Plus size={20} />
                    {!isCollapsed && <span>New Note</span>}
                </button>
            </div>

            {/* Navigation */}
            <nav className="p-4 flex-1 space-y-1">
                {menuItems.map((item) => (
                    <button
                        key={item.view}
                        onClick={() => setCurrentView(item.view)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-zinc-900 dark:text-zinc-100 text-sm rounded-2xl transition-all ${
                            currentView === item.view
                                ? "bg-indigo-100 dark:bg-indigo-900/40  text-indigo-700 dark:text-indigo-300 font-medium"
                                : "hover:bg-gray-100 dark:hover:bg-zinc-800"
                        } ${isCollapsed ? "justify-center" : ""}`}
                    >
                        <item.icon size={22} />
                        {!isCollapsed && <span>{item.label}</span>}
                    </button>
                ))}
            </nav>

            {/* Footer */}
            <div className="p-4 text-xs text-gray-500 dark:text-zinc-500 border-t border-gray-200 dark:border-zinc-800 mt-auto">
                {/* <div className="p-4 border-t border-gray-200 dark:border-zinc-800 mt-auto"></div> */}
                <button
                    onClick={() => setShowResetModal(true)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-2xl transition-colors"
                >
                    <Trash2 size={20} />
                    {!isCollapsed && "Reset All Data"}
                </button>
                {/* {!isCollapsed && "Portfolio Project"} */}
            </div>

            <ResetModal isOpen={showResetModal} onClose={() => setShowResetModal(false)} onConfirm={resetAllData} />
        </div>
    );
};

export default Sidebar;
