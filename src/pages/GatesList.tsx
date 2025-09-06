import GateListUi from "../components/Gate/GateListUi";
import { useGates } from "../components/Hooks";

const GatesList = () => {
  const { data, isLoading, isError, error } = useGates();

  // Handle error state with proper error message
  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Failed to Load Gates</h2>
          <p className="text-gray-600 mb-4">
            {error?.message || "Unable to connect to the server. Please check your connection and try again."}
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <GateListUi 
      gates={data || []} 
      isLoading={isLoading} 
    />
  );
};

export default GatesList;
