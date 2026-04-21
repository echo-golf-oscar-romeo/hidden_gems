import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ValueDimension, ValueScores, gemstoneThemes } from '../data/gems';
import { ValueSlider } from '../components/ValueSlider';
import { Button } from '../components/ui/button';
import { ArrowLeft, Save, RotateCcw } from 'lucide-react';

const defaultPreferences: ValueScores = {
  culture: 50,
  adventure: 50,
  serenity: 50,
  social: 50,
  discovery: 50
};

export function PreferencesPage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<ValueScores>(defaultPreferences);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      setPreferences(JSON.parse(stored));
    }
  }, []);

  const handlePreferenceChange = (dimension: ValueDimension, value: number) => {
    setPreferences((prev) => ({ ...prev, [dimension]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    setHasChanges(false);
    navigate('/home');
  };

  const handleReset = () => {
    setPreferences(defaultPreferences);
    setHasChanges(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/home')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-xl font-bold">Adjust Your Preferences</h1>
                <p className="text-sm text-gray-600">Customize your 5D value profile</p>
              </div>
            </div>
            {hasChanges && (
              <Badge className="bg-orange-100 text-orange-700 border-orange-300">
                Unsaved Changes
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Info Banner */}
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 rounded-xl p-6 mb-8">
          <h2 className="font-semibold text-lg mb-2">How it works</h2>
          <p className="text-gray-700">
            Adjust each value dimension to match your interests. Our 5D recommendation algorithm 
            will use these preferences to find the perfect hidden gems for you. Higher values mean 
            that dimension is more important to you.
          </p>
        </div>

        {/* Sliders */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8 mb-8">
          {(Object.keys(gemstoneThemes) as ValueDimension[]).map((dimension) => (
            <ValueSlider
              key={dimension}
              dimension={dimension}
              value={preferences[dimension]}
              onChange={(value) => handlePreferenceChange(dimension, value)}
            />
          ))}
        </div>

        {/* Value Summary */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-xl font-bold mb-6">Your Profile Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {(Object.entries(preferences) as [ValueDimension, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([dimension, value], index) => {
                const theme = gemstoneThemes[dimension];
                return (
                  <div key={dimension} className="text-center">
                    <div className="relative">
                      <div 
                        className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl shadow-lg"
                        style={{ backgroundColor: `${theme.color}22` }}
                      >
                        {theme.icon}
                      </div>
                      {index === 0 && (
                        <div className="absolute -top-2 -right-2 bg-yellow-400 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          #1
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold mb-1">{theme.name}</h3>
                    <div 
                      className="text-2xl font-bold"
                      style={{ color: theme.color }}
                    >
                      {value}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={handleReset}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset to Default
          </Button>
          <Button
            onClick={handleSave}
            disabled={!hasChanges}
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
            size="lg"
          >
            <Save className="w-4 h-4 mr-2" />
            Save & Update Recommendations
          </Button>
        </div>
      </main>
    </div>
  );
}

function Badge({ className, children }: { className?: string; children: React.ReactNode }) {
  return <span className={className}>{children}</span>;
}
