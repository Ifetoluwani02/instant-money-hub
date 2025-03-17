
interface LoadingStateProps {
  message?: string;
}

export const LoadingState = ({ message = "Loading your dashboard..." }: LoadingStateProps) => {
  return (
    <div className="flex min-h-screen bg-[#0A0A0B] text-white justify-center items-center">
      <div className="text-lg">{message}</div>
    </div>
  );
};

interface ErrorStateProps {
  title?: string;
  message?: string;
}

export const ErrorState = ({ 
  title = "Profile not found", 
  message = "There was an error loading your profile data." 
}: ErrorStateProps) => {
  return (
    <div className="flex min-h-screen bg-[#0A0A0B] text-white justify-center items-center p-4">
      <div className="text-center">
        <h1 className="text-xl font-bold mb-2">{title}</h1>
        <p className="text-gray-400">{message}</p>
      </div>
    </div>
  );
};
