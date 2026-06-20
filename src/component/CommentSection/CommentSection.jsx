"use client";

import { useState } from "react";
import { Pencil, Trash2, Send } from "lucide-react";
import { toast } from "react-toastify";

export default function CommentSection({
  forumId,
  currentUser,
  comments: initialComments,
}) {

  const [comments, setComments] = useState(
    initialComments || []
  );

  const [text, setText] = useState("");

  const [editingIndex, setEditingIndex] =
    useState(null);

  const [editText, setEditText] = useState("");

  // Add Comment

  const handleComment = async () => {

    if (!text.trim()) {

      return toast.error("Write something first");

    }

    const comment = {

      name: currentUser?.name,

      email: currentUser?.email,

      text,

      createdAt: new Date(),

    };

    try {

      const res = await fetch(

        `http://localhost:5000/forums/comment/${forumId}`,

        {

          method: "PATCH",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify(comment),

        }

      );

      const data = await res.json();

      if (data.modifiedCount > 0) {

        setComments([...comments, comment]);

        setText("");

        toast.success("Comment Added");

      }

    } catch {

      toast.error("Failed to add comment");

    }

  };

  // Edit Comment

  const handleEdit = async (index) => {

    try {

      const res = await fetch(

        `http://localhost:5000/forums/comment/edit/${forumId}`,

        {

          method: "PATCH",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            index,

            text: editText,

          }),

        }

      );

      const data = await res.json();

      if (data.modifiedCount > 0) {

        const updated = [...comments];

        updated[index].text = editText;

        setComments(updated);

        setEditingIndex(null);

        setEditText("");

        toast.success("Comment Updated");

      }

    } catch {

      toast.error("Update Failed");

    }

  };

  // Delete Comment

  const handleDelete = async (index) => {

    const confirmDelete = window.confirm(

      "Delete this comment?"

    );

    if (!confirmDelete) return;

    try {

      const res = await fetch(

        `http://localhost:5000/forums/comment/delete/${forumId}`,

        {

          method: "PATCH",

          headers: {

            "Content-Type": "application/json",

          },

          body: JSON.stringify({

            index,

          }),

        }

      );

      const data = await res.json();

      if (data.modifiedCount > 0) {

        setComments(

          comments.filter(

            (_, i) => i !== index

          )

        );

        toast.success("Deleted");

      }

    } catch {

      toast.error("Delete Failed");

    }

  };

  return (

    <div className="space-y-8">

      {/* Add Comment */}

      <div className="bg-[#0A0A18] border border-white/10 rounded-[32px] p-7">

        <textarea

          rows={4}

          value={text}

          onChange={(e) =>

            setText(e.target.value)

          }

          placeholder="Share your thoughts..."

          className="w-full bg-[#111122] border border-white/10 rounded-2xl p-5 text-white outline-none resize-none"

        />

        <button

          onClick={handleComment}

          className="mt-5 px-8 py-3 rounded-2xl bg-[#D9FF3F] text-black font-bold flex items-center gap-3 hover:scale-105 transition"

        >

          <Send size={18} />

          Post Comment

        </button>

      </div>

      {/* Comments */}

      {comments.map((comment, index) => (

        <div

          key={index}

          className="bg-[#0A0A18] border border-white/10 rounded-[32px] p-7"

        >

          <div className="flex justify-between">

            <div className="flex gap-4">

              <div className="w-14 h-14 rounded-full bg-[#D9FF3F] text-black font-bold flex items-center justify-center text-xl">

                {comment.name?.charAt(0)}

              </div>

              <div>

                <h3 className="text-white font-bold">

                  {comment.name}

                </h3>

                <p className="text-gray-400 text-sm">

                  {comment.email}

                </p>

                <p className="text-gray-500 text-xs mt-1">

                  {new Date(

                    comment.createdAt

                  ).toLocaleDateString()}

                </p>

              </div>

            </div>

            {currentUser?.email ===

              comment.email && (

              <div className="flex gap-3">

                <button

                  onClick={() => {

                    setEditingIndex(index);

                    setEditText(

                      comment.text

                    );

                  }}

                  className="text-[#D9FF3F]"

                >

                  <Pencil size={18} />

                </button>

                <button

                  onClick={() =>

                    handleDelete(index)

                  }

                  className="text-red-400"

                >

                  <Trash2 size={18} />

                </button>

              </div>

            )}

          </div>

          {editingIndex === index ? (

            <div className="mt-6">

              <textarea

                rows={3}

                value={editText}

                onChange={(e) =>

                  setEditText(

                    e.target.value

                  )

                }

                className="w-full bg-[#111122] border border-white/10 rounded-2xl p-4 text-white"

              />

              <button

                onClick={() =>

                  handleEdit(index)

                }

                className="mt-4 px-6 py-2 rounded-xl bg-[#D9FF3F] text-black font-semibold"

              >

                Save Changes

              </button>

            </div>

          ) : (

            <p className="text-gray-300 leading-8 mt-6">

              {comment.text}

            </p>

          )}

        </div>

      ))}

    </div>

  );

}