import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';

// Sample restaurant data (you can replace this with your own JSON)
const SAMPLE_DATA = {
  "Asian": ["Sushi Ko", "Panda Express", "Thai Basil", "Pho 99"],
  "Mexican": ["Taco Bell", "Chipotle", "El Pollo Loco", "Casa Verde"],
  "Italian": ["Olive Garden", "Pizza Hut", "Romano's", "Little Italy"],
  "American": ["McDonald's", "Five Guys", "In-N-Out", "Subway"]
};

const FeastFinder = () => {
  const [categories] = useState(Object.keys(SAMPLE_DATA));
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);

  const selectRestaurant = (category) => {
    setSelectedCategory(category);
    setIsSpinning(true);
    
    // Simulate spinning animation
    setTimeout(() => {
      const restaurants = SAMPLE_DATA[category];
      const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
      setSelectedRestaurant(randomRestaurant);
      setIsSpinning(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-indigo-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        {/* ASCII Art Banner */}
        <pre className="text-yellow-400 text-xs sm:text-sm font-mono mb-8 overflow-x-auto">
{`
███████╗███████╗ █████╗ ███████╗████████╗
██╔════╝██╔════╝██╔══██╗██╔════╝╚══██╔══╝
█████╗  █████╗  ███████║███████╗   ██║   
██╔══╝  ██╔══╝  ██╔══██║╚════██║   ██║   
██║     ███████╗██║  ██║███████║   ██║   
╚═╝     ╚══════╝╚═╝  ╚═╝╚══════╝   ╚═╝   
███████╗██╗███╗   ██╗██████╗ ███████╗██████╗ 
██╔════╝██║████╗  ██║██╔══██╗██╔════╝██╔══██╗
█████╗  ██║██╔██╗ ██║██║  ██║█████╗  ██████╔╝
██╔══╝  ██║██║╚██╗██║██║  ██║██╔══╝  ██╔══██╗
██║     ██║██║ ╚████║██████╔╝███████╗██║  ██║
╚═╝     ╚═╝╚═╝  ╚═══╝╚═════╝ ╚══════╝╚═╝  ╚═╝
`}
        </pre>

        <h1 className="text-4xl font-bold text-center mb-8">Your Personal Restaurant Adventure Generator! 🍽️</h1>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => selectRestaurant(category)}
              className="p-4 bg-white bg-opacity-10 rounded-lg hover:bg-opacity-20 transition-all transform hover:scale-105"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Results Section */}
        {selectedCategory && (
          <div className="text-center p-8 bg-white bg-opacity-5 rounded-lg">
            <h2 className="text-2xl mb-4">Selected Category: {selectedCategory}</h2>
            
            {isSpinning ? (
              <div className="flex justify-center items-center gap-4">
                <RotateCw className="animate-spin" size={32} />
                <span className="text-xl">Finding your next feast...</span>
              </div>
            ) : (
              selectedRestaurant && (
                <div className="animate-fadeIn">
                  <h3 className="text-3xl font-bold text-yellow-400 mb-2">
                    ✨ {selectedRestaurant} ✨
                  </h3>
                  <p className="text-gray-300">Bon Appétit! 🎉</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeastFinder;