import React from 'react';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: string;
  adminId: string;
}

interface AuditLogProps {
  entries: AuditLogEntry[];
}

const AuditLog: React.FC<AuditLogProps> = ({ entries }) => {
  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Admin Activity Log</h3>
      
      {entries.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent activity</p>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {entries.map((entry) => (
            <div key={entry.id} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-md">
              <div className="flex-shrink-0">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">Admin {entry.adminId}</span> {entry.action}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {formatTimestamp(entry.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuditLog;
