import { HiddenGem, ValueDimension, gemstoneThemes, getDominantValue } from '../data/gems';
import { Sparkles, MapPin } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

interface GemCardProps {
  gem: HiddenGem;
  matchScore?: number;
  onClick?: () => void;
}

export function GemCard({ gem, matchScore, onClick }: GemCardProps) {
  const dominantValue = getDominantValue(gem.values);
  const theme = gemstoneThemes[dominantValue];

  return (
    <Card
      className="overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:scale-[1.02] group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={gem.image}
          alt={gem.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className={`absolute inset-0 bg-gradient-to-t ${theme.gradient} opacity-20 group-hover:opacity-30 transition-opacity`} />
        
        {/* Match Score Badge */}
        {matchScore && (
          <div className="absolute top-3 right-3">
            <div 
              className="flex items-center gap-1 px-3 py-1.5 rounded-full text-white backdrop-blur-md shadow-lg"
              style={{ backgroundColor: `${theme.color}dd` }}
            >
              <Sparkles className="w-4 h-4" />
              <span className="font-semibold">{matchScore}%</span>
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="backdrop-blur-md bg-white/90">
            {gem.category}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold line-clamp-1">{gem.name}</h3>
          <span className="text-2xl ml-2">{theme.icon}</span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
          <MapPin className="w-4 h-4" />
          <span className="line-clamp-1">{gem.district}</span>
        </div>

        <p className="text-sm text-gray-700 line-clamp-2 mb-4">
          {gem.description}
        </p>

        {/* Value Bars */}
        <div className="space-y-2">
          {(Object.entries(gem.values) as [ValueDimension, number][])
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([dimension, value]) => {
              const dimTheme = gemstoneThemes[dimension];
              return (
                <div key={dimension} className="flex items-center gap-2">
                  <span className="text-xs w-20 capitalize text-gray-600">
                    {dimTheme.name}
                  </span>
                  <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${dimTheme.gradient} transition-all`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                  <span className="text-xs w-8 text-right text-gray-500">
                    {value}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {gem.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Card>
  );
}
