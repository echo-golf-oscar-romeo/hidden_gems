import { ValueDimension, gemstoneThemes } from '../data/gems';
import { GemstoneSlider } from './GemstoneSlider';

interface ValueSliderProps {
  dimension: ValueDimension;
  value: number;
  onChange: (value: number) => void;
}

export function ValueSlider({ dimension, value, onChange }: ValueSliderProps) {
  const theme = gemstoneThemes[dimension];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div 
            className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shadow-lg"
            style={{ backgroundColor: `${theme.color}22` }}
          >
            {theme.icon}
          </div>
          <div>
            <h3 className="font-semibold text-lg capitalize">{theme.name}</h3>
            <p className="text-sm text-gray-600">{theme.description}</p>
          </div>
        </div>
        <div 
          className="text-2xl font-bold px-4 py-2 rounded-lg"
          style={{ 
            backgroundColor: `${theme.color}15`,
            color: theme.color
          }}
        >
          {value}
        </div>
      </div>
      
      <GemstoneSlider
        value={[value]}
        onValueChange={(values) => onChange(values[0])}
        max={100}
        step={5}
        color={theme.color}
        className="w-full"
      />
    </div>
  );
}