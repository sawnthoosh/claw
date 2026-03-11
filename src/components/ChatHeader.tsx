import { Menu, X, Info } from 'lucide-react';

interface ChatHeaderProps {
  onMenuClick?: () => void;
  isMobileSidebarOpen?: boolean;
  onCloseSidebar?: () => void;
}

export function ChatHeader({ onMenuClick, isMobileSidebarOpen, onCloseSidebar }: ChatHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {onMenuClick && (
              <button
                onClick={isMobileSidebarOpen ? onCloseSidebar : onMenuClick}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                {isMobileSidebarOpen ? (
                  <X className="w-6 h-6 text-gray-700" />
                ) : (
                  <Menu className="w-6 h-6 text-gray-700" />
                )}
              </button>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span className="text-3xl">⚖️</span>
                CLAW
              </h1>
              <p className="text-xs text-gray-500">Your AI Legal Assistant</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-600" title="Information">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
