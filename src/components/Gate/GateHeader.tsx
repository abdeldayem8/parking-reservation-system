import React from 'react'

type Props = {
  title: string;
  wsStatus: 'connecting' | 'open' | 'closed' | 'error';
  now: string;
}

const GateHeader: React.FC<Props> = ({ title, wsStatus, now }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-green-500';
      case 'connecting': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Connected';
      case 'connecting': return 'Connecting...';
      case 'error': return 'Error';
      default: return 'Disconnected';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
      {/* Mobile Layout */}
      <div className="block sm:hidden">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 text-sm">Parking Gate System</p>
        </div>
        
        <div className="flex items-center justify-between">
          {/* WebSocket Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(wsStatus)}`}></div>
            <span className="text-sm font-medium text-gray-700">
              {getStatusText(wsStatus)}
            </span>
          </div>
          
          {/* Current Time */}
          <div className="text-right">
            <div className="text-xs text-gray-600">Time</div>
            <div className="font-mono text-sm font-semibold text-gray-900">{now}</div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden sm:flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-1">Parking Gate System</p>
        </div>
        
        <div className="flex items-center gap-6">
          {/* WebSocket Status */}
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(wsStatus)}`}></div>
            <span className="text-sm font-medium text-gray-700">
              WS: {getStatusText(wsStatus)}
            </span>
          </div>
          
          {/* Current Time */}
          <div className="text-right">
            <div className="text-sm text-gray-600">Current Time</div>
            <div className="font-mono font-semibold text-gray-900">{now}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GateHeader
