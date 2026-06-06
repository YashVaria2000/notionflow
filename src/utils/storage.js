/*
{
  notes: [
    {
      id: "note_1712345678901",
      title: "Meeting with Design Team",
      content: "<h2>Key Points</h2><p>...</p>",
      createdAt: "2025-06-05T10:00:00.000Z",
      updatedAt: "2025-06-05T14:30:00.000Z"
    }
  ],
  tasks: [
    {
      id: "task_1712345678902",
      title: "Finish resume project",
      status: "todo",        // todo | inprogress | done
      createdAt: "2025-06-05T09:00:00.000Z"
    }
  ],
  theme: "dark"             // or "light"
}
*/

export const STORAGE_KEY = "notionflow_data";

export const loadFromStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved
            ? JSON.parse(saved)
            : { notes: [], tasks: [], theme: "dark" };
    } catch (e) {
        console.error("Failed to load from localStorage:", e);
        return { notes: [], tasks: [], theme: "dark" };
    }
};

export const saveToStorage = (data) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
        console.error("Failed to save to localStorage:", e);
    }
};
