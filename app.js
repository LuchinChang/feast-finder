import React, { useState, useEffect } from 'react';
import { RotateCw } from 'lucide-react';


const FeastFinder = () => {
    const [restaurantData, setRestaurantData] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedRestaurant, setSelectedRestaurant] = useState('');
    const [isSpinning, setIsSpinning] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch restaurant data when component mounts
    useEffect(() => {
      const fetchRestaurants = async () => {
        try {
          const response = await fetch('/restaurants.json');
          if (!response.ok) {
            throw new Error('Failed to fetch restaurant data');
          }
          const data = await response.json();
          setRestaurantData(data);
          setCategories(Object.keys(data));
          setIsLoading(false);
        } catch (err) {
          setError(err.message);
          setIsLoading(false);
        }
      };
  
      fetchRestaurants();
    }, []);
  
    const selectRestaurant = (category) => {
      setSelectedCategory(category);
      setIsSpinning(true);
      
      setTimeout(() => {
        const restaurants = restaurantData[category];
        const randomRestaurant = restaurants[Math.floor(Math.random() * restaurants.length)];
        setSelectedRestaurant(randomRestaurant);
        setIsSpinning(false);
      }, 2000);
    };
  
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-white text-xl">Loading restaurants...</div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-500 text-xl">Error: {error}</div>
        </div>
      );
    }

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