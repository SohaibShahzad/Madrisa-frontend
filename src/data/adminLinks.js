import { BiSolidDashboard, BiSolidBookContent } from "react-icons/bi";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { TbChecklist, TbSettingsFilled } from "react-icons/tb";
import { GoGraph } from "react-icons/go";
import { FaMoneyBills } from "react-icons/fa6";

export const adminLinks = [
  {
    title: "Dashboard",
    links: [
      {
        label: "Overview",
        href: "/admin/dashboard",
        icon: <BiSolidDashboard className="w-6 h-6" />,
      },
    ],
  },
  {
    title: "Personnel Management",
    links: [
      {
        label: "Manage Teachers",
        href: "/admin/dashboard/teachers",
        icon: <FaChalkboardTeacher className="w-6 h-6" />,
      },
      {
        label: "Manage Students",
        href: "/admin/dashboard/students",
        icon: <PiStudentFill className="w-6 h-6" />,
      },
    ],
  },
  {
    title: "Management",
    links: [
      {
        label: "Attendance Management",
        href: "/admin/dashboard/attendance-management",
        icon: <TbChecklist className="w-6 h-6" />,
      },
      {
        label: "Subject Management",
        href: "/admin/dashboard/subjects",
        icon: <FaUsers className="w-6 h-6" />,
      },
    ],
  },
  {
    title: "Financial Management",
    links: [
      // {
      //   label: "Manage Cash Flow",
      //   href: "/admin/dashboard/cash-flow",
      //   icon: <GoGraph className="w-6 h-6" />,
      // },
      {
        label: "Manage Salaries",
        href: "/admin/dashboard/salaries",
        icon: <FaMoneyBills className="w-6 h-6" />,
      },
    ],
  },
  {
    title: "Settings",
    links: [
      {
        label: "Manage Settings",
        href: "/admin/dashboard/settings",
        icon: <TbSettingsFilled className="w-6 h-6" />,
      },
    ],
  },
];
