import { useApp } from "../../context/AppContext";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import NotesList from "../notes/NotesList";
import NoteEditor from "../notes/NoteEditor";
import KanbanBoard from "../kanban/KanbanBoard";

const Layout = () => {
    const { currentView } = useApp();

    const renderContent = () => {
        switch (currentView) {
            case "notes":
                return <NotesList />;
            case "editor":
                return <NoteEditor />;
            case "tasks":
                return <KanbanBoard />;
            case "home":
            default:
                return (
                    <div className="text-center py-20">
                        <h1 className="text-5xl font-bold mb-4">
                            Welcome to NotionFlow
                        </h1>
                        <p className="text-xl text-gray-500">
                            Your personal productivity workspace
                        </p>
                    </div>
                );
        }
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-zinc-950 overflow-hidden">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar />
                <main className="flex-1 overflow-auto p-8">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default Layout;
