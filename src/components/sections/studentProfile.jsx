import {
  HiOutlineLocationMarker,
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineCalendar,
} from "react-icons/hi";
export default function StudentProfile({ studentData, onClose }) {
  return (
    <div className="mb-[10px]">
      <div className="glassmorphism rounded-lg p-5 mt-20">
        <img
          src={studentData.imageUrl || "/profile-avatar.png"}
          alt={`${studentData.firstName} ${studentData.lastName}`}
          className="w-32 rounded-full -my-20"
        />
        <div className="mt-[100px]">
          <h2 className="text-[22px] font-bold">
            {studentData.firstName} {studentData.lastName}
          </h2>
          <span className="inline-block my-[2px] px-2 text-[#333333] mr-2 bg-blue-300 rounded-full">
            {studentData.grade} - {studentData.section} - {studentData.rollNo}
          </span>
          <div className="grid md:grid-cols-2 gap-2 mt-5">
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-300 py-1 px-2">
                <HiOutlineMail className="w-6 h-8 text-[#333333]" />
              </span>
              <span>{studentData.email}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-300 py-1 px-2">
                <HiOutlineCalendar className="w-6 h-8 text-[#333333]" />
              </span>
              <span>{studentData.dob}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-300 py-1 px-2">
                <HiOutlinePhone className="w-6 h-8 text-[#333333]" />
              </span>
              <span>{studentData.phone}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-blue-300 py-1 px-2">
                <HiOutlineLocationMarker className="w-6 h-8 text-[#333333]" />
              </span>
              <span className="break-words max-w-[200px]">
                {studentData.address}
              </span>
            </div>
          </div>
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
