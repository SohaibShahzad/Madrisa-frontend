// Dashboard.jsx
"use client";
import Loading from "@/components/loading";
import { useAuth } from "@/helper/1useAuth";

export default function Dashboard() {
  const { loading } = useAuth("student");

  if (loading) {
    return <Loading />;
  }

  return (
      <div>
        <h1>Dashboard</h1>
      </div>
  );
}
