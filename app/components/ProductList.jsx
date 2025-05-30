'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

export default function ProductList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const fetchResults = async () => {
      try {
        // For testing, let's use our seeded product data
        const response = await fetch('/api/products');
        const data = await response.json();
        console.log('Fetched products:', data);
        
        // Add default image URL if not present
        const productsWithImages = data.products.map(product => ({
          ...product,
          imageUrl: `https://placehold.co/400x300?text=${encodeURIComponent(product.name)}`
        }));
        
        setResults(productsWithImages || []);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, [searchParams, mounted]);

  const handleSelectProduct = (product) => {
    console.log('Selecting product:', product);
    // Store selected product in localStorage
    localStorage.setItem('selectedProduct', JSON.stringify(product));
    // Navigate to shop page
    router.push('/shop');
  };

  if (!mounted || !results) return null;
  
  if (results.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold text-gray-600">No results found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {results.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <div className="relative aspect-w-16 aspect-h-9 h-48">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-contain bg-gray-50"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={true}
            />
          </div>
          <div className="p-4">
            <div className="mb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <div className="text-2xl font-bold text-blue-600 mt-2">
                ${product.price.toFixed(2)}
              </div>
            </div>
            
            <div className="space-y-2 mt-4 text-sm text-gray-600">
              {product.brand && (
                <div className="flex justify-between">
                  <span>Brand:</span>
                  <span className="font-medium">{product.brand}</span>
                </div>
              )}
              
              {product.color && (
                <div className="flex justify-between">
                  <span>Color:</span>
                  <span className="font-medium">{product.color}</span>
                </div>
              )}
              
              {product.size && (
                <div className="flex justify-between">
                  <span>Size:</span>
                  <span className="font-medium">{product.size}</span>
                </div>
              )}
              
              {product.screenSize && (
                <div className="flex justify-between">
                  <span>Screen Size:</span>
                  <span className="font-medium">{product.screenSize}"</span>
                </div>
              )}
              
              {product.resolution && (
                <div className="flex justify-between">
                  <span>Resolution:</span>
                  <span className="font-medium">{product.resolution}</span>
                </div>
              )}
            </div>

            <div className="mt-4">
              <button
                onClick={() => handleSelectProduct(product)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Select Product
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 