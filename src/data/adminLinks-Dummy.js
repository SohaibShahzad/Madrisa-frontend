import { BiSolidDashboard, BiSolidBookContent } from "react-icons/bi";
import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
import { PiStudentFill } from "react-icons/pi";
import { TbChecklist, TbSettingsFilled } from "react-icons/tb";
import {GoGraph} from "react-icons/go";
import {FaMoneyBills} from "react-icons/fa6";

export const adminLinks = [
  {
    icon: <BiSolidDashboard className="w-6 h-6" />,
    label: "Dashboard",
    href: "/admin/dashboard",
    subMenu: [
      { label: "Overview", href: "/admin/dashboard/overview" },
      { label: "Analytics", href: "/admin/dashboard/analytics" },
    ],
  },
  {
    icon: <FaChalkboardTeacher className="w-6 h-6" />,
    label: "Teacher Management",
    href: "/admin/dashboard/teacher-management",
    subMenu: [
      {
        label: "Add Teacher",
        href: "/admin/dashboard/teacher-management/add-teacher",
      },
      {
        label: "View Teachers",
        href: "/admin/dashboard/teacher-management/view-teachers",
      },
      {
        label: "Manage Teacher Details",
        href: "/admin/dashboard/teacher-management/manage-details",
      },
    ],
  },
  {
    icon: <PiStudentFill className="w-6 h-6" />,
    label: "Student Management",
    href: "/admin/dashboard/student-management",
    subMenu: [
      {
        label: "Add Student",
        href: "/admin/dashboard/student-management/add-student",
      },
      {
        label: "View Students",
        href: "/admin/dashboard/student-management/view-students",
      },
      {
        label: "Manage Student Details",
        href: "/admin/dashboard/student-management/manage-details",
      },
    ],
  },
  {
    icon: <BiSolidBookContent className="w-6 h-6" />,
    label: "Content Management",
    href: "/admin/dashboard/content-management",
    subMenu: [
      {
        label: "Upload Documents",
        href: "/admin/dashboard/content-management/upload-documents",
      },
      {
        label: "Manage Documents",
        href: "/admin/dashboard/content-management/manage-documents",
      },
    ],
  },
  {
    icon: <TbChecklist className="w-6 h-6" />,
    label: "Attendance",
    href: "/admin/dashboard/attendance",
    subMenu: [
      { label: "Track Attendance", href: "/admin/dashboard/attendance/track" },
      {
        label: "View Attendance Reports",
        href: "/admin/dashboard/attendance/reports",
      },
    ],
  },
  {
    icon: <GoGraph className="w-6 h-6" />,
    label: "Financial Management",
    href: "/admin/dashboard/financial-management",
    subMenu: [
      {
        label: "Cash Flow Management",
        href: "/admin/dashboard/financial-management/cash-flow",
      },
      {
        label: "Expense Tracking",
        href: "/admin/dashboard/financial-management/expense-tracking",
      },
      {
        label: "Income Tracking",
        href: "/admin/dashboard/financial-management/income-tracking",
      },
    ],
  },
  {
    icon: <FaMoneyBills className="w-6 h-6" />,
    label: "Salary Management",
    href: "/admin/dashboard/salary-management",
    subMenu: [
      {
        label: "Manage Salaries",
        href: "/admin/dashboard/salary-management/manage",
      },
      {
        label: "View Salary Reports",
        href: "/admin/dashboard/salary-management/reports",
      },
    ],
  },
  {
    icon: <FaUsers className="w-6 h-6" />,
    label: "Staff Details",
    href: "/admin/dashboard/staff-details",
    subMenu: [
      { label: "Add Staff", href: "/admin/dashboard/staff-details/add-staff" },
      {
        label: "View Staff",
        href: "/admin/dashboard/staff-details/view-staff",
      },
      {
        label: "Manage Staff Details",
        href: "/admin/dashboard/staff-details/manage-details",
      },
    ],
  },
  {
    icon: <TbSettingsFilled className="w-6 h-6" />,
    label: "Settings",
    href: "/admin/dashboard/settings",
    subMenu: [
      {
        label: "Language Settings",
        href: "/admin/dashboard/settings/language",
      },
      {
        label: "Software Settings",
        href: "/admin/dashboard/settings/software",
      },
    ],
  },
];
