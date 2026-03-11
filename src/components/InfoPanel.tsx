import { X, BookOpen, MessageSquare, Zap } from 'lucide-react';

interface InfoPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InfoPanel({ isOpen, onClose }: InfoPanelProps) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose}></div>
      <div className="fixed right-0 top-0 bottom-0 w-full sm:w-96 bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">About CLAW</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-gray-600 leading-relaxed">
                CLAW is your AI-powered legal assistant designed to help everyday citizens understand their legal rights, government laws, and procedures.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <Zap className="w-5 h-5 text-blue-600" />
                What I Can Help With
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Consumer rights and complaint procedures</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Cyber laws and online safety</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Traffic rules and driving regulations</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Fundamental and constitutional rights</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Employment and labor laws</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Property and family laws</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-blue-600" />
                How to Use
              </h3>
              <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
                <li>Ask any legal question in simple language</li>
                <li>I'll explain concepts in easy-to-understand terms</li>
                <li>Follow up with related questions</li>
                <li>Save important information for reference</li>
              </ol>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-900">
                <strong>Disclaimer:</strong> This information is for educational purposes only and should not be considered as legal advice. For specific legal matters, please consult with a qualified legal professional.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-600" />
                Topics Covered
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Consumer Rights',
                  'Cyber Laws',
                  'Traffic Rules',
                  'Fundamental Rights',
                  'Employment',
                  'Property',
                  'Family',
                  'Police Rights',
                ].map((topic) => (
                  <span key={topic} className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
