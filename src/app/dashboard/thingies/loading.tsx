import LoadingSpinner from "@/components/LoadingSpinner";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen bg-[#1e1e2f]">
      <LoadingSpinner size={40} />
    </div>
  );
}
