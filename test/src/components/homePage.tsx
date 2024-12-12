import Cards from './Cards';
import { useEffect, useState } from 'react';
import Filters from './filters';

// Define the type for a product
interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    category: string; // Assuming each product has a category
}

const HomePage = (): JSX.Element => {
    const [products, setProducts] = useState<Product[]>([]); // All products
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]); // Filtered products
    const [loading, setLoading] = useState<boolean>(true); // Loading state

    // Filter states
    const [filterCategory, setFilterCategory] = useState<string>(''); // Category filter
    const [filterPriceRange, setFilterPriceRange] = useState<[number, number]>([0, 1000]); // Price range filter

    // Sorting state
    const [sortMethod, setSortMethod] = useState<string>(''); // Sorting method

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data = await response.json();
                setProducts(data.products);
                setFilteredProducts(data.products); // Initially set all products as filtered
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter products based on the selected filters
    useEffect(() => {
        let tempProducts = [...products];

        if (filterCategory) {
            tempProducts = tempProducts.filter((product) => product.category === filterCategory);
        }

        tempProducts = tempProducts.filter(
            (product) => product.price >= filterPriceRange[0] && product.price <= filterPriceRange[1]
        );

        // Apply sorting if selected
        if (sortMethod === 'Price') {
            tempProducts = tempProducts.sort((a, b) => a.price - b.price); // Sort by price (ascending)
        } else if (sortMethod === 'Category') {
            tempProducts = tempProducts.sort((a, b) => a.category.localeCompare(b.category)); // Sort by category (alphabetically)
        }

        setFilteredProducts(tempProducts);
    }, [filterCategory, filterPriceRange, products, sortMethod]);

    if (loading) {
        return <div className="h-full bg-[#D9DFEE] p-[10%]">Loading...</div>;
    }

    return (
        <div className="h-full w-full bg-[#D9DFEE]">
            <h1 className="text-3xl py-10">Technical Assessment Test</h1>
            <div className='w-full'>
                <Filters
                    setFilterCategory={setFilterCategory}
                    setFilterPriceRange={setFilterPriceRange}
                    setSortMethod={setSortMethod} // Pass setSortMethod to Filters component
                />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredProducts.map((product) => (
                    <div key={product.id} className="m-5">
                        <Cards
                            title={product.title}
                            description={product.description}
                            price={product.price}
                            thumbnail={product.thumbnail}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
