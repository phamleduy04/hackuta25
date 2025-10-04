import React, { useState } from "react";
import { useUserProfile } from "../hooks/useUserProfile";
import { useUserProfileWithActions } from "../hooks/useUserProfileWithActions";

const UserWelcome: React.FC = () => {
  const userProfile = useUserProfile();
  const { updateProfile, loading, error } = useUserProfileWithActions();
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  if (!userProfile) {
    return <div className="text-white">Please log in</div>;
  }

  const handleEdit = () => {
    setFirstName(userProfile.firstName || "");
    setLastName(userProfile.lastName || "");
    setEditing(true);
  };

  const handleSave = async () => {
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
      });
      setEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setFirstName("");
    setLastName("");
  };

  return (
    <div className="text-white bg-black/30 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2">
        Welcome, {userProfile.fullName}!
      </h2>

      {error && (
        <div className="bg-red-500/20 text-red-200 p-2 rounded mb-2">
          Error: {error}
        </div>
      )}

      {editing ? (
        <div className="space-y-2">
          <div>
            <label className="block text-sm">First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full p-1 rounded text-black"
            />
          </div>
          <div>
            <label className="block text-sm">Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full p-1 rounded text-black"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 hover:bg-gray-600 px-3 py-1 rounded text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-1">
          <p>
            <span className="text-gray-300">Email:</span> {userProfile.email}
          </p>
          <p>
            <span className="text-gray-300">First Name:</span>{" "}
            {userProfile.firstName || "Not set"}
          </p>
          <p>
            <span className="text-gray-300">Last Name:</span>{" "}
            {userProfile.lastName || "Not set"}
          </p>
          <button
            onClick={handleEdit}
            className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-sm mt-2"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default UserWelcome;
