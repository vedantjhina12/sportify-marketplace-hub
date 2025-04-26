
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle, Package, Truck, Clock, MapPin } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock order data
const orderDetails = {
  orderId: "ORD-12345678",
  date: "April 26, 2025",
  status: "shipped",
  carrier: "FedEx",
  trackingNumber: "FX123456789",
  estimatedDelivery: "May 3, 2025",
  items: [
    { name: "Pro Run Ultra Shoes", quantity: 1 },
    { name: "Adjustable Dumbbells", quantity: 2 }
  ],
  history: [
    { status: "Order Placed", date: "April 26, 2025", time: "09:30 AM", location: "Online" },
    { status: "Payment Confirmed", date: "April 26, 2025", time: "10:15 AM", location: "Online" },
    { status: "Processing", date: "April 27, 2025", time: "08:45 AM", location: "Warehouse" },
    { status: "Shipped", date: "April 28, 2025", time: "02:30 PM", location: "Distribution Center" },
  ]
};

const OrderTracking = () => {
  const { toast } = useToast();
  const [searchOrderId, setSearchOrderId] = useState("");
  const [displayedOrder, setDisplayedOrder] = useState(orderDetails);
  const [showOrder, setShowOrder] = useState(false);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchOrderId.trim() === "") {
      toast({
        title: "Error",
        description: "Please enter an order ID",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would fetch the order from an API
    // For now, we're just showing the mock order
    setShowOrder(true);
    toast({
      title: "Order found",
      description: `Tracking information for ${searchOrderId}`,
    });
  };

  // Helper function to render the tracking status
  const getStatusStep = (currentStatus: string) => {
    const statuses = ["confirmed", "processing", "shipped", "delivered"];
    return statuses.indexOf(currentStatus) + 1;
  };

  const currentStep = getStatusStep(displayedOrder.status);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Track Your Order</h1>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white shadow-md rounded-lg overflow-hidden p-6 mb-8">
              <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
                <div className="flex-grow">
                  <Label htmlFor="orderId">Order ID</Label>
                  <Input
                    id="orderId"
                    placeholder="Enter your order number"
                    value={searchOrderId}
                    onChange={(e) => setSearchOrderId(e.target.value)}
                    className="mt-1"
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="w-full sm:w-auto bg-sport-blue hover:bg-sport-blue/90">
                    Track Order
                  </Button>
                </div>
              </form>
            </div>
            
            {showOrder && (
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex flex-col sm:flex-row justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{displayedOrder.orderId}</h2>
                      <p className="text-sm text-gray-500">Placed on {displayedOrder.date}</p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                      <p className="text-sm font-medium text-gray-900">
                        Estimated Delivery: <span className="font-bold">{displayedOrder.estimatedDelivery}</span>
                      </p>
                      <p className="text-sm text-gray-500">
                        {displayedOrder.carrier} - {displayedOrder.trackingNumber}
                      </p>
                    </div>
                  </div>
                  
                  {/* Order Status */}
                  <div className="mb-10">
                    <div className="relative">
                      <div className="flex items-center relative z-10">
                        <div className="flex flex-col items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 1 ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <CheckCircle className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-xs mt-1">Confirmed</span>
                        </div>
                        <div className={`flex-1 h-1 mx-2 ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className="flex flex-col items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 2 ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <Package className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-xs mt-1">Processing</span>
                        </div>
                        <div className={`flex-1 h-1 mx-2 ${currentStep >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className="flex flex-col items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 3 ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <Truck className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-xs mt-1">Shipped</span>
                        </div>
                        <div className={`flex-1 h-1 mx-2 ${currentStep >= 4 ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <div className="flex flex-col items-center">
                          <div className={`rounded-full h-8 w-8 flex items-center justify-center ${currentStep >= 4 ? 'bg-green-500' : 'bg-gray-300'}`}>
                            <Clock className="h-5 w-5 text-white" />
                          </div>
                          <span className="text-xs mt-1">Delivered</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Order Items */}
                  <div className="mb-8">
                    <h3 className="font-medium mb-3">Items in this order</h3>
                    <ul className="space-y-2">
                      {displayedOrder.items.map((item, index) => (
                        <li key={index} className="flex items-center">
                          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                            <Package className="h-6 w-6 text-gray-500" />
                          </div>
                          <span>
                            {item.name} × {item.quantity}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  {/* Tracking History */}
                  <div>
                    <h3 className="font-medium mb-4">Tracking History</h3>
                    <div className="space-y-6">
                      {displayedOrder.history.map((event, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 relative">
                            <div className="h-4 w-4 rounded-full bg-green-500"></div>
                            {index < displayedOrder.history.length - 1 && (
                              <div className="absolute top-4 bottom-0 left-2 -ml-px w-0.5 bg-gray-200"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-6">
                            <div className="flex flex-col sm:flex-row sm:justify-between">
                              <h4 className="font-medium text-gray-900">{event.status}</h4>
                              <p className="text-sm text-gray-500">
                                {event.date}, {event.time}
                              </p>
                            </div>
                            <div className="mt-1 flex items-center text-sm text-gray-500">
                              <MapPin className="h-4 w-4 mr-1" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t pt-6">
                    <p className="text-sm text-gray-500 mb-4">Need help with your order?</p>
                    <Link to="/contact">
                      <Button variant="outline">Contact Support</Button>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrderTracking;
