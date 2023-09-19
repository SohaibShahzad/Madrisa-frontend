"use client";

// import Loading from "@/components/loading";
import { useAuth } from "@/helper/1useAuth";

export default function AdminDash() {
  useAuth("admin", "/admin");

  // if (loading) {
  //   return <Loading />;
  // }

  return (
      <div>
        <h1>Admin Dashboard</h1>
      </div>
  );
}
