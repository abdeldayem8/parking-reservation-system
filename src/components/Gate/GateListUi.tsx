import GateCard from "./GateCard";
import SkeletonCard from "../UI/SkeletonCard";
import EmptyState from "../UI/EmptyState";
import PageHeader from "../UI/PageHeader";

interface Gate {
  id: string;
  name: string;
  zoneIds: string[];
  location: string;
}

interface GatesListUIProps {
  gates: Gate[];
  isLoading?: boolean;
}

const GatesListUI = ({ gates, isLoading = false }: GatesListUIProps) => {
  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <PageHeader />
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {gates.map((gate) => (
          <GateCard key={gate.id} gate={gate} />
        ))}
      </div>

      {gates.length === 0 && !isLoading && <EmptyState />}
    </div>
  );
};

export default GatesListUI;
