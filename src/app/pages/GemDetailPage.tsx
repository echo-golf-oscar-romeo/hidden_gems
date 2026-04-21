import { useParams, useNavigate } from 'react-router';
import { useState, useEffect } from 'react';
import { hiddenGems, ValueDimension, gemstoneThemes, ValueScores, calculateMatchScore, getDominantValue } from '../data/gems';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Navigation, 
  Sparkles,
  Share2,
  Heart
} from 'lucide-react';

export function GemDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isFavorited, setIsFavorited] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const gem = hiddenGems.find((g) => g.id === id);

  useEffect(() => {
    if (gem) {
      const stored = localStorage.getItem('userPreferences');
      if (stored) {
        const preferences: ValueScores = JSON.parse(stored);
        setMatchScore(calculateMatchScore(preferences, gem));
      }
    }
  }, [gem]);

  if (!gem) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">❓</div>
          <h2 className="text-2xl font-bold mb-2">Gem Not Found</h2>
          <Button onClick={() => navigate('/home')}>Go Home</Button>
        </div>
      </div>
    );
  }

  const dominantValue = getDominantValue(gem.values);
  const theme = gemstoneThemes[dominantValue];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Button>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsFavorited(!isFavorited)}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {/* Hero Image */}
        <div className="relative h-96 rounded-2xl overflow-hidden mb-8 shadow-2xl">
          <img
            src={gem.image}
            alt={gem.name}
            className="w-full h-full object-cover"
          />
          <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-30`} />
          
          {/* Floating Info Cards */}
          {matchScore && (
            <div className="absolute top-6 right-6">
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full text-white backdrop-blur-md shadow-lg"
                style={{ backgroundColor: `${theme.color}dd` }}
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-bold text-lg">{matchScore}% Match</span>
              </div>
            </div>
          )}

          <div className="absolute bottom-6 left-6">
            <Badge className="text-base px-4 py-2 backdrop-blur-md bg-white/90 text-gray-900">
              {gem.category}
            </Badge>
          </div>
        </div>

        {/* Title and Quick Info */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-3">{gem.name}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5" />
                <span>{gem.location}</span>
                <Badge variant="outline">{gem.district}</Badge>
              </div>
            </div>
            <div className="text-6xl">{theme.icon}</div>
          </div>

          <p className="text-lg text-gray-700 leading-relaxed">
            {gem.description}
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {gem.openingHours && (
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Opening Hours</div>
                  <div className="font-semibold">{gem.openingHours}</div>
                </div>
              </div>
            </Card>
          )}
          
          {gem.bestTimeToVisit && (
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-sm text-gray-600">Best Time</div>
                  <div className="font-semibold">{gem.bestTimeToVisit}</div>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Navigation className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <div className="text-sm text-gray-600">Navigate</div>
                <div className="font-semibold text-green-600 cursor-pointer hover:underline">
                  Get Directions
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Value Breakdown */}
        <Card className="p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            Gemstone Value Profile
          </h2>
          <div className="space-y-4">
            {(Object.entries(gem.values) as [ValueDimension, number][])
              .sort((a, b) => b[1] - a[1])
              .map(([dimension, value]) => {
                const dimTheme = gemstoneThemes[dimension];
                return (
                  <div key={dimension}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xl"
                          style={{ backgroundColor: `${dimTheme.color}22` }}
                        >
                          {dimTheme.icon}
                        </div>
                        <div>
                          <div className="font-semibold">{dimTheme.name}</div>
                          <div className="text-sm text-gray-600">{dimTheme.description}</div>
                        </div>
                      </div>
                      <div 
                        className="text-2xl font-bold"
                        style={{ color: dimTheme.color }}
                      >
                        {value}
                      </div>
                    </div>
                    <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${dimTheme.gradient} transition-all`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </Card>

        {/* Tags */}
        <Card className="p-8">
          <h2 className="text-xl font-bold mb-4">Tags</h2>
          <div className="flex flex-wrap gap-2">
            {gem.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-sm px-3 py-1">
                {tag}
              </Badge>
            ))}
          </div>
        </Card>

        {/* Action Button */}
        <div className="mt-8 flex gap-4">
          <Button 
            size="lg" 
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          >
            <Navigation className="w-5 h-5 mr-2" />
            Get Directions
          </Button>
          <Button 
            size="lg" 
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/explore')}
          >
            Explore Similar Gems
          </Button>
        </div>
      </main>
    </div>
  );
}
