import React from 'react';
import  AiSummaryBot  from './AiSummaryBot';

export function Sidebar() {
  return (
    <div className="absolute top-20 right-6 w-80 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4">
      <div className="space-y-4">
        {/* Scene Information Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-900">Scene Information</h2>
        </div>

        {/* AI Summary Bot Component */}
        <AiSummaryBot />
      </div>
    </div>
  );
}


