import { toast } from "sonner";

export const showToast = (message: string) => {
  toast.custom((t) => (
    <div
      className="bg-white text-black px-4 py-3 rounded-md shadow-lg w-full max-w-sm"
      onClick={() => toast.dismiss(t)}
      role="alert"
    >
      {message}
    </div>
  ));
};

export const showErrorToast = (errorMessage: string) => {
  toast.custom((t) => (
    <div
      className="bg-white text-red-500 px-4 py-3 rounded-md shadow-lg w-full max-w-sm"
      onClick={() => toast.dismiss(t)}
      role="alert"
    >
      {errorMessage}
    </div>
  ));
};
