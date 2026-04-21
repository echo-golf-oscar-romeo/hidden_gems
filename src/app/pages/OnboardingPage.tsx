import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ValueDimension, ValueScores, gemstoneThemes } from '../data/gems';
import { ValueSlider } from '../components/ValueSlider';
import { ValueExplanation } from '../components/ValueExplanation';
import { Button } from '../components/ui/button';
import { Sparkles, ArrowRight, Info } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../components/ui/collapsible';

export function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'welcome' | 'preferences'>('welcome');
  const [showExplanation, setShowExplanation] = useState(false);
  const [preferences, setPreferences] = useState<ValueScores>({
    culture: 50,
    adventure: 50,
    serenity: 50,
    social: 50,
    discovery: 50
  });

  const handlePreferenceChange = (dimension: ValueDimension, value: number) => {
    setPreferences((prev) => ({ ...prev, [dimension]: value }));
  };

  const handleComplete = () => {
    localStorage.setItem('userPreferences', JSON.stringify(preferences));
    localStorage.setItem('onboardingComplete', 'true');
    navigate('/home');
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 flex items-center justify-center p-6">
        <div className="max-w-2xl text-center text-white space-y-8">
          <div className="flex justify-center">
            <div className="relative">
              <div className="text-8xl animate-float">💎</div>
              <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-300 animate-pulse" />
            </div>
          </div>
          
          <h1 className="text-5xl font-bold">
            Discover Hong Kong's
            <br />
            Hidden Gems
          </h1>
          
          <p className="text-xl text-white/90 max-w-lg mx-auto">
            A personalized journey through Hong Kong's most unique and off-the-beaten-path treasures, 
            powered by our gemstone-inspired 5D recommendation system.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
            {(Object.entries(gemstoneThemes) as [ValueDimension, typeof gemstoneThemes[ValueDimension]][]).map(([key, theme]) => (
              <div 
                key={key}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              >
                <div className="text-3xl mb-2">{theme.icon}</div>
                <div className="text-sm font-semibold">{theme.name}</div>
              </div>
            ))}
          </div>

          <Button
            size="lg"
            onClick={() => setStep('preferences')}
            className="bg-white text-purple-600 hover:bg-white/90 text-lg px-8 py-6 mt-8"
          >
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-12 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold">Customize Your Experience</h1>
          </div>
          <p className="text-lg text-gray-600">
            Adjust the sliders to match your interests. Our 5D algorithm will find the perfect gems for you.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
          {(Object.keys(gemstoneThemes) as ValueDimension[]).map((dimension) => (
            <ValueSlider
              key={dimension}
              dimension={dimension}
              value={preferences[dimension]}
              onChange={(value) => handlePreferenceChange(dimension, value)}
            />
          ))}

          <div className="pt-6 flex gap-4">
            <Button
              variant="outline"
              onClick={() => setStep('welcome')}
              className="flex-1"
            >
              Back
            </Button>
            <Button
              onClick={handleComplete}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
              size="lg"
            >
              Discover Gems
              <Sparkles className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Preview of top value */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Your top value: {' '}
            <span className="font-semibold" style={{ color: gemstoneThemes[
              (Object.entries(preferences) as [ValueDimension, number][])
                .reduce((max, curr) => curr[1] > max[1] ? curr : max)[0]
            ].color }}>
              {gemstoneThemes[
                (Object.entries(preferences) as [ValueDimension, number][])
                  .reduce((max, curr) => curr[1] > max[1] ? curr : max)[0]
              ].name}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}