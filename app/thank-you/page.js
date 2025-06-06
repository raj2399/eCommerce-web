'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

function ThankYouContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await fetch(`/api/orders/${orderId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch order details');
        }

        setOrder(data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-red-600 mb-4">Error</h1>
              <p className="text-gray-600 mb-8">{error}</p>
              <Link
                href="/shop"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
              >
                Return to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h1>
              <p className="text-gray-600">Fetching your order details</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-xl p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-green-600 mb-4">Thank You!</h1>
            <p className="text-gray-600 mb-8">Your order has been confirmed.</p>
            
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Order Details</h2>
              <div className="text-left space-y-2">
                <p><span className="font-medium">Order ID:</span> {order.id}</p>
                <p><span className="font-medium">Total:</span> ${order.total.toFixed(2)}</p>
                <p><span className="font-medium">Status:</span> {order.status}</p>
              </div>
            </div>

            <Link
              href="/shop"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ThankYou() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Loading...</h1>
              <p className="text-gray-600">Please wait...</p>
            </div>
          </div>
        </div>
      </div>
    }>
      <ThankYouContent />
    </Suspense>
  );
} 