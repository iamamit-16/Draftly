import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import api from "../axios"; 
import { ArrowLeftIcon, TrashIcon } from "lucide-react";
import toast from "react-hot-toast";

const NoteDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false); 
  const [pageLoading, setPageLoading] = useState(true); 

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setTitle(res.data.title);
        setContent(res.data.content);
      } catch (error) {
        toast.error("Failed to load note");
      } finally {
        setPageLoading(false);
      }
    };
    fetchNote();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await api.put(`/notes/${id}`, { title, content });
      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  return (
    // Removed 'bg-base-200' so the App.jsx radial gradient shows through
    <div className="min-h-screen text-white"> 
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        
        {/* Header: Always visible so user can go back even while loading */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/" className="btn btn-ghost text-white hover:bg-white/10">
            <ArrowLeftIcon className="size-5 mr-2" />
            Back
          </Link>
          
          {/* Only show delete if not loading to prevent errors */}
          {!pageLoading && (
            <button onClick={handleDelete} className="btn btn-ghost text-error hover:bg-error/10">
              <TrashIcon className="size-5 mr-2" />
              Delete
            </button>
          )}
        </div>

        {pageLoading ? (
          /* Homepage style loading state */
          <div className="flex flex-col items-center justify-center py-20">
            <span className="loading loading-spinner loading-lg text-primary"></span>
            <p className="mt-4 text-gray-400">Fetching your note...</p>
          </div>
        ) : (
          /* Content Card with slight glass effect to match the dark theme */
          <div className="card bg-base-100/50 backdrop-blur-sm border border-white/10 shadow-2xl">
            <div className="card-body">
              <form onSubmit={handleUpdate}>
                <div className="form-control mb-4">
                  <label className="label">
                    <span className="label-text text-gray-300 font-semibold">Title</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered bg-transparent border-white/20 text-white focus:border-primary"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="form-control mb-6">
                  <label className="label">
                    <span className="label-text text-gray-300 font-semibold">Content</span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered bg-transparent border-white/20 text-white focus:border-primary h-64"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="btn btn-primary px-8"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="loading loading-spinner"></span>
                        Updating...
                      </>
                    ) : "Update Note"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoteDetailPage;