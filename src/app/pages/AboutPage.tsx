import { useNavigate } from 'react-router';
import { Button } from '../components/ui/button';
import { ValueExplanation } from '../components/ValueExplanation';
import { ArrowLeft, Sparkles, Brain, Gem, MapPin } from 'lucide-react';
import { Card } from '../components/ui/card';

export function AboutPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/home')}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold">About Hidden Gems HK</h1>
              <p className="text-sm text-gray-600">Discover how it works</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="text-6xl mb-4 animate-float">💎</div>
          <h1 className="text-4xl font-bold mb-4">
            Discover Hong Kong Like Never Before
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our gemstone-inspired 5D recommendation system helps you find the perfect hidden gems 
            tailored to your unique preferences and interests.
          </p>
        </div>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full flex items-center justify-center">
                <Brain className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">1. Set Your Preferences</h3>
              <p className="text-gray-600">
                Customize your 5D value profile by adjusting sliders for Culture, Adventure, Serenity, Social, and Discovery.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-pink-100 rounded-full flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">2. Get Matched</h3>
              <p className="text-gray-600">
                Our algorithm analyzes each location's unique value profile and calculates personalized match scores just for you.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-orange-100 rounded-full flex items-center justify-center">
                <MapPin className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-3">3. Explore & Discover</h3>
              <p className="text-gray-600">
                Browse curated recommendations, explore all gems with filters, and dive deep into each location's details.
              </p>
            </Card>
          </div>
        </section>

        {/* The 5D System */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">The 5D Gemstone Value System</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Each hidden gem is evaluated across five key dimensions, represented by precious gemstones. 
              Together, they create a comprehensive profile of what makes each location special.
            </p>
          </div>
          <ValueExplanation />
        </section>

        {/* The Algorithm */}
        <section className="mb-16">
          <Card className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Gem className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Recommendation Algorithm</h2>
                <p className="text-gray-700 mb-4">
                  The matching system uses a weighted scoring algorithm that compares your preference profile 
                  with each location's value scores. Here's how it works:
                </p>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">1.</span>
                    <span>Your preferences are normalized to create a weighted profile (totaling 100%)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">2.</span>
                    <span>Each location's value scores (0-100) are multiplied by your corresponding weights</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">3.</span>
                    <span>The weighted scores are summed to calculate a final match percentage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">4.</span>
                    <span>Locations are ranked by match score to show you the best matches first</span>
                  </li>
                </ul>
                <p className="text-gray-700 mt-4">
                  This ensures that gems matching your highest-valued dimensions are prioritized, 
                  while still considering the full spectrum of your interests.
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Why Hidden Gems */}
        <section>
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Why "Hidden Gems"?</h2>
            <p className="text-gray-700 mb-4">
              Hong Kong is full of incredible places that go beyond the typical tourist spots. Our curated collection 
              focuses on authentic, unique, and lesser-known locations that offer genuine local experiences.
            </p>
            <p className="text-gray-700">
              From peaceful traditional gardens to vibrant night markets, from scenic hiking trails to creative 
              design hubs - each gem has been carefully selected to showcase the diverse and fascinating sides 
              of Hong Kong that many visitors never discover.
            </p>
          </Card>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            size="lg"
            onClick={() => navigate('/home')}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700"
          >
            <Sparkles className="w-5 h-5 mr-2" />
            Start Exploring
          </Button>
        </div>
      </main>
    </div>
  );
}
