function AttendanceCard({ title, onClick }) {
    return (
      <div className="border rounded-lg p-4 cursor-pointer" onClick={onClick}>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
    );
  }
  
  export default AttendanceCard;
  