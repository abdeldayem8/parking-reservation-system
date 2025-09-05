const EmptyState = () => (
  <div className="text-center py-12">
    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Gates Available</h3>
    <p className="text-gray-600">There are currently no gates configured in the system.</p>
  </div>
);

export default EmptyState;
