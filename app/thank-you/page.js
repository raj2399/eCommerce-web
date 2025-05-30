'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function ThankYou() {
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
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Loading order details...
              </h1>
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
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-gray-600">
              We've sent a confirmation email to {order.customerEmail}
            </p>
          </div>

          <div className="border-t border-b py-8 my-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order ID</span>
                <span className="text-gray-900 font-medium">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="text-green-600 font-medium capitalize">
                  {order.status.toLowerCase()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Amount</span>
                <span className="text-gray-900 font-medium">
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
            <div className="space-y-2">
              <p className="text-gray-600">{order.customerName}</p>
              <p className="text-gray-600">{order.address}</p>
              <p className="text-gray-600">
                {order.city}, {order.postalCode}
              </p>
              <p className="text-gray-600">{order.country}</p>
            </div>
          </div>

          <div className="text-center">
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