import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
} from "react-icons/hi";
import { LuSchool } from "react-icons/lu";
import { RiMoneyDollarCircleLine } from "react-icons/ri";

export default function TeacherProfile({ teacherData, onClose }) {
  return (
    <div className="mb-[10px]">
      <div className="glassmorphism rounded-lg p-5 mt-20">
        <img
          src={teacherData.imageUrl || "/profile-avatar.png"}
          alt={`${teacherData.firstName} ${teacherData.lastName}`}
          className="w-32 rounded-full -my-20"
        />
        <div className="mt-[100px]">
          <h2 className="text-[22px] font-bold">
            {teacherData.firstName} {teacherData.lastName}
          </h2>
          {teacherData.subjects.length === 0 ? (
            <span className="inline-block my-[2px] px-2 text-[#333333] mr-2 bg-blue-300 rounded-full">
              No Subjects
            </span>
          ) : (
            teacherData.subjects.map((sub) => (
              <span
                key={sub.id}
                className="inline-block my-[2px] px-2 text-[#333333] mr-2 bg-blue-300 rounded-full"
              >
                {sub.name}
              </span>
            ))
          )}
          <div className="grid md:grid-cols-2 gap-2 mt-5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-300 py-1 px-2">
                <HiOutlineMail className="w-6 h-8 text-[#333333]" />
              </span>
              <span>{teacherData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-300 py-1 px-2">
                <HiOutlineCalendar className="w-6 h-8 text-[#333333]" />
              </span>
              <span>{teacherData.dob}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-300 py-1 px-2">
                <HiOutlinePhone className="w-6 h-8 text-[#333333]" />
              </span>
              <span>{teacherData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-300 py-1 px-2">
                <HiOutlineLocationMarker className="w-6 h-8 text-[#333333]" />
              </span>
              <span className="break-words max-w-[200px]">
                {teacherData.address}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="h-8" />

      <div className="glassmorphism rounded-lg p-5">
        <h2 className="text-[18px] font-bold tracking-[1px]">Details: </h2>
        <div className="grid md:grid-cols-2 gap-2 mt-5">
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-300 py-1 px-2">
              <LuSchool className="w-6 h-8 text-[#333333]" />
            </span>
            <span>
              {teacherData.education.university} -{" "}
              {teacherData.education.degree} - {teacherData.education.year}
            </span>
          </div>
          {/* <div className="flex items-center gap-2">
            <span className="rounded-full bg-blue-300 py-1 px-2">
              <RiMoneyDollarCircleLine className="w-6 h-8 text-[#333333]" />
            </span>
            <span>
              Rs. {teacherData.education.university} -{" "}
              {teacherData.education.degree} - {teacherData.education.year}
            </span>
          </div> */}
        </div>
      </div>
      <div className="flex justify-end gap-2 my-2">
        <button
          onClick={onClose}
          className="text-white text-[12px] py-2 px-3 rounded transition duration-300 bg-red-500 hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
