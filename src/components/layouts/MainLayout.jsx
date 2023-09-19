import NavBar from "../navbar";

export default function MainLayout({ children }) {
  return (
    <div className="overflow-hidden min-h-screen">
      <NavBar />
      <main className="flex flex-col items-center justify-center flex-grow">
        {children}
      </main>
    </div>
  );
}
