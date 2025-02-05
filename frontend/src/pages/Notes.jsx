import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage } from "@fortawesome/free-solid-svg-icons";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noteTitle, setNoteTitle] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchNotes();

    if ("webkitSpeechRecognition" in window) {
      const speechRecognition = new window.webkitSpeechRecognition();
      speechRecognition.continuous = false;
      speechRecognition.interimResults = false;
      speechRecognition.lang = "en-US";

      speechRecognition.onstart = () => setIsRecording(true);
      speechRecognition.onend = () => setIsRecording(false);
      speechRecognition.onerror = (event) =>
        console.error("Speech Error:", event.error);

      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNewNote(transcript);
      };

      setRecognition(speechRecognition);
    }
  }, []);

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/notes", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes(response.data);
    } catch (error) {
      console.error(
        "Error fetching notes:",
        error.response?.data?.message || "Server error"
      );
      if (error.response?.status === 401) navigate("/");
    }
  };

  const handleAddNote = () => {
    if (!newNote.trim() && !image) return;
    setIsModalOpen(true);
  };

  const handleSubmitNote = async () => {
    if (!noteTitle.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("title", noteTitle);
      formData.append("content", newNote);
      formData.append("type", newNote ? "text" : "image");
      if (image) formData.append("image", image);

      await axios.post("http://localhost:5000/api/notes", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setNewNote("");
      setNoteTitle("");
      setImage(null);
      setIsModalOpen(false);
      fetchNotes();
    } catch (error) {
      console.error(
        "Error adding note:",
        error.response?.data?.message || "Server error"
      );
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/notes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotes();
    } catch (error) {
      console.error(
        "Error deleting note:",
        error.response?.data?.message || "Server error"
      );
    }
  };

  const startRecording = () => {
    if (!recognition) return;
    setIsRecording(true);
    recognition.start();

    setTimeout(() => {
      stopRecording();
    }, 60000);
  };

  const stopRecording = () => {
    if (recognition) {
      recognition.stop();
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold">My Notes</h2>
          <ul className="mt-4">
            <li className="px-5 py-2 bg-purple-600 hover:bg-purple-300 rounded-2xl cursor-pointer">
              Home
            </li>
            <li className="px-5 py-2 mt-2 cursor-pointer rounded-2xl hover:bg-purple-300">
              Favourites
            </li>
          </ul>
        </div>
        <div className="cursor-pointer">Darshan ▾</div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 w-full rounded-full"
        />

        {/* Notes Display */}
        <div className="grid grid-cols-3 gap-4 mt-4">
          {filteredNotes.map((note) => (
            <div key={note._id} className="border p-4 rounded shadow">
              <p className="text-xs text-gray-500">
                {new Date(note.createdAt).toLocaleString()}
              </p>
              <strong>{note.title}</strong>
              <p>{note.content}</p>
              {note.type === "audio" && <p>🔊 {note.duration}s</p>}
              {note.image && (
                <img
                  src={`data:image/jpeg;base64,${note.image}`}
                  alt="Note"
                  className="mt-2 max-w-full h-auto"
                />
              )}
              <button
                onClick={() => handleDeleteNote(note._id)}
                className="mt-2 bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add New Note</h2>
            <input
              type="text"
              placeholder="Enter title..."
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitNote}
                className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Save Note
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full flex justify-center p-4 bg-white shadow-md">
        <label className="cursor-pointer mr-2">
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="hidden"
          />
          <FontAwesomeIcon
            icon={faImage}
            className="text-2xl text-gray-600 hover:text-blue-500"
          />
        </label>
        <input
          type="text"
          placeholder="Enter a note..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          className="border p-2 w-80"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-500 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 ml-2 rounded"
        >
          Add Note
        </button>
        <button
          onClick={isRecording ? stopRecording : startRecording}
          className="bg-red-500 hover:bg-red-700 cursor-pointer text-white px-4 py-2 ml-2 rounded"
        >
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>
    </div>
  );
};

export default Notes;