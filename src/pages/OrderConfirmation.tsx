
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Truck, Clock } from "lucide-react";

const OrderConfirmation = () => {
  // Mock order data
  const orderData = {
    orderId: "ORD-12345678",
    date: "April 26, 2025",
    total: 477.97,
    items: [
      { name: "Pro Run Ultra Shoes", quantity: 1, price: 129.99 },
      { name: "Adjustable Dumbbells", quantity: 2, price: 149.99 }
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA"
    },
    estimatedDelivery: "May 3, 2025"
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-6 sm:p-10">
              <div className="text-center mb-10">
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900">Order Confirmed!</h1>
                <p className="text-lg text-gray-600 mt-2">
                  Thank you for your purchase. Your order has been received.
                </p>
              </div>
              
              <div className="border-t border-b border-gray-200 py-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Order Number</h2>
                    <p className="mt-1 text-lg font-medium text-gray-900">{orderData.orderId}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Date Placed</h2>
                    <p className="mt-1 text-lg font-medium text-gray-900">{orderData.date}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Total Amount</h2>
                    <p className="mt-1 text-lg font-medium text-gray-900">${orderData.total.toFixed(2)}</p>
                  </div>
                  <div>
                    <h2 className="text-sm font-medium text-gray-500">Estimated Delivery</h2>
                    <p className="mt-1 text-lg font-medium text-gray-900">{orderData.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                <div className="text-gray-800">
                  <p>{orderData.shippingAddress.name}</p>
                  <p>{orderData.shippingAddress.street}</p>
                  <p>
                    {orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zip}
                  </p>
                  <p>{orderData.shippingAddress.country}</p>
                </div>
              </div>
              
              <h2 className="text-lg font-semibold mb-4">Order Items</h2>
              <div className="border rounded-md overflow-hidden mb-8">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orderData.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {item.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {item.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          ${item.price.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-md mb-8">
                <h3 className="font-medium mb-3">Order Status</h3>
                <div className="relative">
                  <div className="flex items-center relative z-10">
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-green-500 h-8 w-8 flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs mt-1">Confirmed</span>
                    </div>
                    <div className="flex-1 h-1 bg-green-500 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
                        <Package className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs mt-1">Processing</span>
                    </div>
                    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
                        <Truck className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs mt-1">Shipped</span>
                    </div>
                    <div className="flex-1 h-1 bg-gray-300 mx-2"></div>
                    <div className="flex flex-col items-center">
                      <div className="rounded-full bg-gray-300 h-8 w-8 flex items-center justify-center">
                        <Clock className="h-5 w-5 text-white" />
                      </div>
                      <span className="text-xs mt-1">Delivered</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                <Link to="/order-tracking">
                  <Button variant="outline">
                    Track Order
                  </Button>
                </Link>
                <Link to="/">
                  <Button className="bg-sport-blue hover:bg-sport-blue/90">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderConfirmation;
