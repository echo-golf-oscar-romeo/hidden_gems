import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ValueScores, getTopRecommendations, calculateMatchScore, gemstoneThemes, ValueDimension } from '../data/gems';
import { GemCard } from '../components/GemCard';
import { Button } from '../components/ui/button';
import { Sparkles, Settings, Compass, TrendingUp, Info } from 'lucide-react';

export function HomePage() {
  const navigate = useNavigate();
  const [preferences, setPreferences] = useState<ValueScores>({
    culture: 50,
    adventure: 50,
    serenity: 50,
    social: 50,
    discovery: 50
  });
  const [recommendations, setRecommendations] = useState(getTopRecommendations(preferences));

  useEffect(() => {
    const stored = localStorage.getItem('userPreferences');
    if (stored) {
      const parsed = JSON.parse(stored);
      setPreferences(parsed);
      setRecommendations(getTopRecommendations(parsed));
    }
  }, []);

  const topValue = (Object.entries(preferences) as [ValueDimension, number][])
    .reduce((max, curr) => curr[1] > max[1] ? curr : max)[0];
  const topTheme = gemstoneThemes[topValue];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-3xl">💎</div>
              <div>
                <h1 className="text-xl font-bold">Hidden Gems HK</h1>
                <p className="text-sm text-gray-600">Your Personalized Guide</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => navigate('/explore')}
              >
                <Compass className="w-4 h-4 mr-2" />
                Explore All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/about')}
              >
                <Info className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/preferences')}
              >
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <div 
            className="rounded-2xl p-8 text-white relative overflow-hidden"
            style={{ 
              background: `linear-gradient(135deg, ${topTheme.color}dd, ${topTheme.color}88)` 
            }}
          >
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <Sparkles className="w-8 h-8" />
                <h2 className="text-3xl font-bold">Welcome Back!</h2>
              </div>
              <p className="text-lg text-white/90 mb-6">
                Based on your preferences, we've curated these {topTheme.name}-inspired gems just for you.
                Your top value is <span className="font-semibold">{topTheme.name}</span> - {topTheme.description.toLowerCase()}.
              </p>
              <div className="flex gap-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{recommendations.length}</div>
                  <div className="text-sm">Top Matches</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-2xl font-bold">{topTheme.icon}</div>
                  <div className="text-sm">{topTheme.name}</div>
                </div>
              </div>
            </div>
            <div className="absolute right-0 top-0 text-[200px] opacity-10">
              {topTheme.icon}
            </div>
          </div>
        </div>

        {/* Top Recommendations */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-purple-600" />
                Top Matches For You
              </h2>
              <p className="text-gray-600 mt-1">
                Personalized based on your 5D value profile
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendations.map((gem) => (
              <GemCard
                key={gem.id}
                gem={gem}
                matchScore={calculateMatchScore(preferences, gem)}
                onClick={() => navigate(`/gem/${gem.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Your Values Overview */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-6">Your Value Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {(Object.entries(preferences) as [ValueDimension, number][]).map(([dimension, value]) => {
              const theme = gemstoneThemes[dimension];
              return (
                <div key={dimension} className="text-center">
                  <div 
                    className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl shadow-lg"
                    style={{ backgroundColor: `${theme.color}22` }}
                  >
                    {theme.icon}
                  </div>
                  <h3 className="font-semibold mb-1">{theme.name}</h3>
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: theme.color }}
                  >
                    {value}
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${theme.gradient}`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="text-center mt-6">
            <Button
              variant="outline"
              onClick={() => navigate('/preferences')}
            >
              <Settings className="w-4 h-4 mr-2" />
              Adjust Preferences
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}