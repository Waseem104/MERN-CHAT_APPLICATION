import { useRef, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";

const Profile = () => {
  const { isUpdatingProfile, authUser, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);
  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="bg-base-100 shadow-lg rounded-lg overflow-hidden w-full md:w-2/5 p-8">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-3xl mb-4 font-bold text-primary">Profile</h1>
          <div className="relative">
            <img
              src={selectedImg || authUser?.profilePic || "/avatar.webp"}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-gray-100"
            />
            <button
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full"
              onClick={handleCameraClick}
            >
              <Camera className="w-5 h-5" />
            </button>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              ref={fileInputRef}
            />
          </div>
          <p className="text-sm text-gray-400 mt-4">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>
        </div>
        <div className="mb-2">
          <label className="label">
            <span className="label-text text-gray-400">Full Name</span>
          </label>
          <input
            type="text"
            value={authUser?.fullName}
            className="input input-bordered w-full bg-gray-700 text-white"
            readOnly
          />
        </div>
        <div className="mb-2">
          <label className="label">
            <span className="label-text text-gray-400">Email Address</span>
          </label>
          <input
            type="email"
            value={authUser?.email}
            className="input input-bordered w-full bg-gray-700 text-white"
            readOnly
          />
        </div>
        <h6 className="text-xl font-semibold text-primary mt-9 mb-4">
          Additional Information
        </h6>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-400">Member Since</p>
          <p className="text-white">{authUser.createdAt?.split("T")[0]}</p>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <p className="text-gray-400">Account Status</p>
          <p className="font-semibold text-green-500">Active</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
