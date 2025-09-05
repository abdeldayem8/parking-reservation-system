import { Link } from "react-router-dom";

interface Gate {
  id: string;
  name: string;
  zoneIds: string[];
  location: string;
}

interface GateCardProps {
  gate: Gate;
}

// Zone color mapping for consistent colors
const getZoneColor = (zoneId: string) => {
  const colors = [
    "bg-blue-100 text-blue-700 border-blue-200",
    "bg-emerald-100 text-emerald-700 border-emerald-200", 
    "bg-purple-100 text-purple-700 border-purple-200",
    "bg-amber-100 text-amber-700 border-amber-200",
    "bg-rose-100 text-rose-700 border-rose-200",
    "bg-indigo-100 text-indigo-700 border-indigo-200",
    "bg-teal-100 text-teal-700 border-teal-200",
    "bg-orange-100 text-orange-700 border-orange-200",
  ];
  const index = zoneId.charCodeAt(zoneId.length - 1) % colors.length;
  return colors[index];
};

const GateCard = ({ gate }: GateCardProps) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
      {/* Gate Header */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {gate.name}
        </h3>
        <div className="flex items-center text-gray-600">
          <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-sm font-medium">{gate.location}</span>
        </div>
      </div>

      {/* Zones Section */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">
          Available Zones
        </h4>
        <div className="flex flex-wrap gap-2">
          {gate.zoneIds.map((zone) => (
            <span
              key={zone}
              className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${getZoneColor(zone)}`}
            >
              {zone}
            </span>
          ))}
        </div>
      </div>

      {/* Action Button */}
      <Link
        to={`/gate/${gate.id}`}
        className="block w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 text-center group-hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-200"
      >
        <span className="flex items-center justify-center">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
          Access Gate
        </span>
      </Link>
    </div>
  );
};

export default GateCard;
