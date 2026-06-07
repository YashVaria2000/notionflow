import { useState } from "react";
import { X } from "lucide-react";

const ResetModal = ({ isOpen, onClose, onConfirm }) => {
    const [inputCode, setInputCode] = useState("");
    const [captcha] = useState(() =>
        Math.random().toString(36).substring(2, 8).toUpperCase(),
    );

    if (!isOpen) return null;

    const handleConfirm = () => {
        if (inputCode === captcha) {
            onConfirm();
            onClose();
        } else {
            alert("Incorrect code. Please try again.");
            setInputCode("");
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 max-w-md w-full mx-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-semibold text-red-600">
                        Reset All Data
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                    >
                        <X size={24} />
                    </button>
                </div>

                <p className="text-gray-600 dark:text-zinc-400 mb-6">
                    This action cannot be undone. All notes, tasks and settings
                    will be permanently deleted.
                </p>

                <div className="mb-6">
                    <p className="text-sm mb-2 font-medium">
                        Enter this code to confirm:
                    </p>
                    <div className="bg-gray-100 dark:bg-zinc-800 p-4 rounded-2xl text-center text-2xl font-mono tracking-widest mb-4">
                        {captcha}
                    </div>
                    <input
                        type="text"
                        value={inputCode}
                        onChange={(e) =>
                            setInputCode(e.target.value.toUpperCase())
                        }
                        placeholder="ENTER CODE HERE"
                        className="w-full text-center py-4 text-xl font-mono border border-gray-300 dark:border-zinc-700 rounded-2xl focus:outline-none focus:border-red-500"
                    />
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 border border-gray-300 dark:border-zinc-700 rounded-2xl font-medium"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleConfirm}
                        className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-medium transition-colors"
                    >
                        Yes, Reset Everything
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResetModal;
