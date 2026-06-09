import { createContext, useContext, useState, useEffect } from "react";
import { loadFromStorage, saveToStorage } from "../utils/storage";

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const [notes, setNotes] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [theme, setTheme] = useState("light");
    const [currentView, setCurrentView] = useState("home");
    const [currentNoteId, setCurrentNoteId] = useState(null);

    // ==================== LOCAL STORAGE USE EFFECTS ====================

    // Load from localStorage on mount
    useEffect(() => {
        const savedData = loadFromStorage();
        if (savedData.notes?.length) setNotes(savedData.notes);
        if (savedData.tasks?.length) setTasks(savedData.tasks);
        if (savedData.theme) {
            setTheme(savedData.theme);
            if (savedData.theme === "dark") {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        }
    }, []);

    // Auto-save to localStorage whenever notes, tasks or theme changes
    useEffect(() => {
        saveToStorage({ notes, tasks, theme });
    }, [notes, tasks, theme]);

    // ==================== THEME FUNCTIONS ====================

    // Theme Toggle
    const toggleTheme = () => {
        console.log("Switching Theme");
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);

        if (newTheme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    };

    // ==================== NOTE FUNCTIONS ====================

    // Add Note
    const addNote = (title = "Untitled Note") => {
        const newNote = {
            id: "note_" + Date.now(),
            title,
            content: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };
        setNotes((prev) => [newNote, ...prev]);
        setCurrentNoteId(newNote.id);
        setCurrentView("editor");
    };

    const updateNote = (id, updates) => {
        setNotes((prev) =>
            prev.map((note) =>
                note.id === id
                    ? {
                          ...note,
                          ...updates,
                          updatedAt: new Date().toISOString(),
                      }
                    : note,
            ),
        );
    };

    const deleteNote = (id) => {
        setNotes((prev) => prev.filter((note) => note.id !== id));
        if (currentNoteId === id) {
            setCurrentNoteId(null);
            setCurrentView("notes");
        }
    };

    // ==================== TASK FUNCTIONS ====================

    // Add Task (now accepts full object)
    const addTask = (taskData) => {
        const newTask = {
            id: "task_" + Date.now(),
            title: taskData.title,
            description: taskData.description || "",
            priority: taskData.priority || "low",
            status: "todo",
            createdAt: new Date().toISOString(),
        };
        setTasks((prev) => [...prev, newTask]);
    };

    // Update Task (for edit + status change)
    const updateTask = (id, updates) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, ...updates } : task)));
    };

    const updateTaskStatus = (id, status) => {
        setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status } : task)));
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    // ==================== RESET DATA ====================

    // Reset all data
    const resetAllData = () => {
        setNotes([]);
        setTasks([]);
        setTheme("light");
        setCurrentView("home");
        setCurrentNoteId(null);

        // Clear localStorage
        localStorage.removeItem("notionflow_data");

        // Force light theme
        document.documentElement.classList.remove("dark");
    };

    // ==================== VALUE OBJECT ====================

    const value = {
        notes,
        tasks,
        theme,
        currentView,
        currentNoteId,
        setCurrentView,
        setCurrentNoteId,
        toggleTheme,
        addNote,
        updateNote,
        deleteNote,
        addTask,
        updateTask,
        updateTaskStatus,
        deleteTask,
        resetAllData,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
