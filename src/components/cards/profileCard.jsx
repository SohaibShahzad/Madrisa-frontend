import { useState } from "react";
import {GoKebabHorizontal} from "react-icons/go";

function ProfileCard({ teacher, onEdit, onDelete, onViewProfile }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="glassmorphism shadow rounded p-4 m-2 relative">
      <div className="absolute top-2 right-2">
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="text-gray-500 hover:text-gray-700"
        >
          <GoKebabHorizontal/>
        </button>
        {isMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 py-2 bg-white border rounded shadow-xl">
            <button
              onClick={() => onEdit(teacher)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(teacher)}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50"
            >
              Delete
            </button>
          </div>
        )}
      </div>
      <img
        src={teacher.imageUrl || "/path/to/default/image.jpg"}
        alt={`${teacher.firstName} ${teacher.lastName}`}
        className="w-32 mx-auto rounded-full"
      />
      <h2 className="text-center mt-2 text-xl">{`${teacher.firstName} ${teacher.lastName}`}</h2>
      <p className="text-center mt-2 text-sm text-gray-500">
        Subjects: {teacher.subjects.join(", ")}
      </p>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => onViewProfile(teacher)}
          className="bg-blue-500 text-white py-1 px-3 rounded transition duration-300 hover:bg-blue-700"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}

export default ProfileCard;
