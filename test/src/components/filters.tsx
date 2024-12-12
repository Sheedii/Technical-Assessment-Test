import React, { useState } from 'react';

interface FiltersProps {
  setFilterCategory: (category: string) => void;
  setFilterPriceRange: (priceRange: [number, number]) => void;
  setSortMethod: (sortMethod: string) => void; // New prop for sorting method
}

const Filters = ({ setFilterCategory, setFilterPriceRange, setSortMethod }: FiltersProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [selectedSort, setSelectedSort] = useState<string>(''); // New state for sorting

  const categories = ['beauty', 'fragrances', 'furniture', 'groceries'];
  const sortOptions = ['Price', 'Category'];

  // Handle category change
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    setFilterCategory(category); // Pass the selected category to parent
  };

  // Handle price range change (for a single range input)
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setPriceRange([0, value]);
    setFilterPriceRange([0, value]); // Pass the selected price range to parent
  };

  // Handle sorting method change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sortMethod = e.target.value;
    setSelectedSort(sortMethod);
    setSortMethod(sortMethod); // Pass the selected sort method to parent
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg mb-10 max-w-[90%] mx-auto flex flex-col sm:flex-row justify-center items-center gap-9">
      {/* Filters Container */}
      <div className="flex flex-col sm:flex-row w-full mb-6 gap-6 sm:gap-8">
        {/* Category Filter */}
        <div className="w-full sm:w-1/3">
          <label htmlFor="category" className="block text-lg font-semibold text-gray-700 mb-2">
            Category:
          </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition-all duration-200"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sorting Filter */}
        <div className="w-full sm:w-1/3">
          <label htmlFor="sort" className="block text-lg font-semibold text-gray-700 mb-2">
            Sort By:
          </label>
          <select
            id="sort"
            value={selectedSort}
            onChange={handleSortChange}
            className="p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full transition-all duration-200"
          >
            <option value="">Select Sorting Method</option>
            {sortOptions.map((sortOption) => (
              <option key={sortOption} value={sortOption}>
                {sortOption}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="w-full sm:w-1/3">
          <label htmlFor="priceRange" className="block text-lg font-semibold text-gray-700 mb-2">
            Price Range:
          </label>
          <div className="flex flex-col space-y-2">
            <input
              type="range"
              name="priceRange"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={handlePriceChange}
              className="w-full p-2 bg-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <div className="flex justify-between items-center text-sm text-gray-600">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Reset */}
      <div className="text-center w-full sm:w-auto">
        <button
          onClick={() => {
            setSelectedCategory('');
            setPriceRange([0, 1000]);
            setSelectedSort('');
            setFilterCategory('');
            setFilterPriceRange([0, 1000]);
            setSortMethod(''); // Reset sorting
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
