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
        const res = await api.get(
          `notes/${id}`
        );
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
      await axios.put(`/notes/${id}`, {
        title,
        content,
      });

      toast.success("Note updated successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?"))
      return;

    try {
      await axios.delete(
        `/notes/${id}`
      );
      toast.success("Note deleted successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  if (pageLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-base-200">
      <div className="container mx-auto px-4 py-8 max-w-2xl">

        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <Link to="/" className="btn btn-ghost">
            <ArrowLeftIcon className="size-5" />
            Back
          </Link>

          <button
            onClick={handleDelete}
            className="btn btn-ghost text-error"
          >
            <TrashIcon className="size-5" />
          </button>
        </div>

        {/* Card */}
        <div className="card bg-base-100 shadow-lg">
          <div className="card-body">

            <form onSubmit={handleUpdate}>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="form-control mb-6">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <textarea
                  className="textarea textarea-bordered h-32"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Note"}
                </button>
              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;