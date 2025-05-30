'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Shop() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProductAndVariants() {
      try {
        const savedProduct = localStorage.getItem('selectedProduct');
        if (!savedProduct) {
          router.push('/search');
          return;
        }
        
        const product = JSON.parse(savedProduct);
        setSelectedProduct(product);

        const response = await fetch(`/api/products/${product.id}/variants`);
        if (!response.ok) {
          throw new Error('Failed to fetch variants');
        }
        const data = await response.json();
        
        if (!data.variants || data.variants.length === 0) {
          throw new Error('No variants found for this product');
        }

        setVariants(data.variants);
        setSelectedVariant(data.variants[0]);
      } catch (error) {
        console.error('Error:', error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadProductAndVariants();
  }, [router]);

  const handleCheckout = () => {
    if (!selectedVariant) {
      setError('Please select a variant before proceeding');
      return;
    }

    const orderData = {
      variantId: selectedVariant.id,
      quantity,
      price: selectedVariant.price,
      productName: selectedProduct.name,
      productImage: selectedProduct.imageUrl,
    };
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));
    router.push('/checkout');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <p className="text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => router.push('/search')}
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Return to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!selectedProduct || !selectedVariant) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8 text-center">
            <p className="text-gray-600">No product selected</p>
            <button
              onClick={() => router.push('/search')}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Return to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl overflow-hidden lg:grid lg:grid-cols-2 lg:gap-8">
          <div className="relative h-64 sm:h-96 lg:h-full">
            <Image
              src={selectedProduct.imageUrl}
              alt={selectedProduct.name}
              fill
              className="object-contain bg-gray-50"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={true}
              unoptimized={selectedProduct.imageUrl.startsWith('http')}
            />
          </div>
          <div className="p-8">
            <h1 className="text-3xl font-bold text-gray-900">{selectedProduct.name}</h1>
            <p className="mt-4 text-gray-500">{selectedProduct.description}</p>
            
            <div className="mt-8">
              <label className="text-sm font-medium text-gray-700">Select Package</label>
              <div className="mt-2 grid grid-cols-1 gap-4">
                {variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariant(variant)}
                    className={`p-4 border rounded-lg ${
                      selectedVariant.id === variant.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{variant.name}</span>
                      <span className="text-gray-900">${variant.price.toFixed(2)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <label className="text-sm font-medium text-gray-700">Quantity</label>
              <select
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="mt-2 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                {[...Array(10)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-8">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  Total: ${(selectedVariant.price * quantity).toFixed(2)}
                </span>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 