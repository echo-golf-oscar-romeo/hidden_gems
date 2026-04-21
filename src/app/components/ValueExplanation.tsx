import { ValueDimension, gemstoneThemes } from '../data/gems';
import { Card } from './ui/card';

export function ValueExplanation() {
  const explanations: Record<ValueDimension, string> = {
    culture: 'Immerse yourself in Hong Kong\'s rich heritage, traditional arts, and historical landmarks. Perfect for those seeking authentic cultural experiences.',
    adventure: 'For thrill-seekers and explorers who crave excitement, outdoor activities, and adrenaline-pumping experiences off the beaten path.',
    serenity: 'Find your zen in peaceful gardens, quiet beaches, and tranquil spaces away from the city\'s hustle and bustle.',
    social: 'Connect with vibrant communities, bustling markets, and lively social scenes. Great for meeting locals and experiencing Hong Kong\'s energy.',
    discovery: 'Uncover hidden treasures, secret spots, and unique places that most tourists never find. For the curious and adventurous.'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {(Object.entries(gemstoneThemes) as [ValueDimension, typeof gemstoneThemes[ValueDimension]][]).map(([dimension, theme]) => (
        <Card 
          key={dimension}
          className="p-6 hover:shadow-xl transition-all cursor-pointer border-2 hover:border-current"
          style={{ borderColor: `${theme.color}40` }}
        >
          <div className="flex items-start gap-4">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center text-3xl flex-shrink-0 shadow-lg"
              style={{ backgroundColor: `${theme.color}22` }}
            >
              {theme.icon}
            </div>
            <div className="flex-1">
              <h3 
                className="font-bold text-lg mb-1"
                style={{ color: theme.color }}
              >
                {theme.name}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{theme.description}</p>
              <p className="text-xs text-gray-500">{explanations[dimension]}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
