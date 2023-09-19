import { RotatingSquare } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <RotatingSquare color="grey" visible={true} strokeWidth="10"/>
    </div>
  );
}
