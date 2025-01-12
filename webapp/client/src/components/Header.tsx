import { AlertTriangle, Menu } from 'lucide-react';

export function Header() {
  return (
    <header className="absolute top-0 left-0 right-0 bg-darkgrey/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-7xl font-semibold text-white-900">Skycraft</h1>
           
          </div>
        </div>
      </div>
    </header>
  );
}