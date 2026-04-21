import { useState } from 'react';
import { useNavigate } from 'react-router';
import { hiddenGems, ValueDimension, gemstoneThemes, HiddenGem } from '../data/gems';
import { GemCard } from '../components/GemCard';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';

export function ExplorePage() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedValue, setSelectedValue] = useState<ValueDimension | null>(null);

  // Get unique districts and categories
  const districts = Array.from(new Set(hiddenGems.map((g) => g.district))).sort();
  const categories = Array.from(new Set(hiddenGems.map((g) => g.category))).sort();

  // Filter gems
  const filteredGems = hiddenGems.filter((gem) => {
    const matchesSearch = gem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      gem.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesDistrict = !selectedDistrict || gem.district === selectedDistrict;
    const matchesCategory = !selectedCategory || gem.category === selectedCategory;
    const matchesValue = !selectedValue || gem.values[selectedValue] >= 70;

    return matchesSearch && matchesDistrict && matchesCategory && matchesValue;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
                <h1 className="text-xl font-bold">Explore All Gems</h1>
                <p className="text-sm text-gray-600">
                  {filteredGems.length} of {hiddenGems.length} gems
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search gems by name, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Filter Tabs */}
          <Tabs defaultValue="values" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="values">
                <SlidersHorizontal className="w-4 h-4 mr-2" />
                Values
              </TabsTrigger>
              <TabsTrigger value="location">
                <Filter className="w-4 h-4 mr-2" />
                District
              </TabsTrigger>
              <TabsTrigger value="category">
                <Filter className="w-4 h-4 mr-2" />
                Category
              </TabsTrigger>
            </TabsList>

            {/* Values Filter */}
            <TabsContent value="values" className="mt-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedValue === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedValue(null)}
                >
                  All Values
                </Badge>
                {(Object.keys(gemstoneThemes) as ValueDimension[]).map((dimension) => {
                  const theme = gemstoneThemes[dimension];
                  const isSelected = selectedValue === dimension;
                  return (
                    <Badge
                      key={dimension}
                      variant={isSelected ? "default" : "outline"}
                      className="cursor-pointer"
                      style={isSelected ? {
                        backgroundColor: theme.color,
                        borderColor: theme.color
                      } : {}}
                      onClick={() => setSelectedValue(dimension)}
                    >
                      {theme.icon} {theme.name}
                    </Badge>
                  );
                })}
              </div>
            </TabsContent>

            {/* District Filter */}
            <TabsContent value="location" className="mt-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedDistrict === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedDistrict(null)}
                >
                  All Districts
                </Badge>
                {districts.map((district) => (
                  <Badge
                    key={district}
                    variant={selectedDistrict === district ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedDistrict(district)}
                  >
                    {district}
                  </Badge>
                ))}
              </div>
            </TabsContent>

            {/* Category Filter */}
            <TabsContent value="category" className="mt-4">
              <div className="flex flex-wrap gap-2">
                <Badge
                  variant={selectedCategory === null ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(null)}
                >
                  All Categories
                </Badge>
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Badge>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Active Filters */}
          {(selectedDistrict || selectedCategory || selectedValue) && (
            <div className="mt-4 pt-4 border-t">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Active filters:</span>
                {selectedDistrict && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedDistrict}
                    <button onClick={() => setSelectedDistrict(null)}>×</button>
                  </Badge>
                )}
                {selectedCategory && (
                  <Badge variant="secondary" className="gap-1">
                    {selectedCategory}
                    <button onClick={() => setSelectedCategory(null)}>×</button>
                  </Badge>
                )}
                {selectedValue && (
                  <Badge variant="secondary" className="gap-1">
                    {gemstoneThemes[selectedValue].name}
                    <button onClick={() => setSelectedValue(null)}>×</button>
                  </Badge>
                )}
                <button
                  onClick={() => {
                    setSelectedDistrict(null);
                    setSelectedCategory(null);
                    setSelectedValue(null);
                  }}
                  className="text-sm text-purple-600 hover:underline ml-2"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        {filteredGems.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No gems found</h3>
            <p className="text-gray-600">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGems.map((gem) => (
              <GemCard
                key={gem.id}
                gem={gem}
                onClick={() => navigate(`/gem/${gem.id}`)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
