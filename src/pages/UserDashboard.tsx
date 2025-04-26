
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  User, Package, Heart, ShoppingBag, CreditCard, MapPin, LogOut
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock user data
const mockUserData = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+1 (555) 123-4567",
  address: {
    street: "123 Main Street",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA"
  }
};

// Mock order history
const mockOrders = [
  {
    id: "ORD-12345678",
    date: "April 26, 2025",
    status: "Delivered",
    total: 129.99,
    items: 1
  },
  {
    id: "ORD-87654321",
    date: "April 15, 2025",
    status: "Shipped",
    total: 299.98,
    items: 2
  },
  {
    id: "ORD-23456789",
    date: "March 30, 2025",
    status: "Delivered",
    total: 89.99,
    items: 1
  }
];

const UserDashboard = () => {
  const { toast } = useToast();
  const [userData, setUserData] = useState(mockUserData);
  const [isEditing, setIsEditing] = useState(false);
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated.",
    });
  };
  
  const handleLogout = () => {
    // Remove login state from localStorage
    localStorage.removeItem("isLoggedIn");
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    // In a real app, this would redirect to home page
    window.location.href = "/";
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name.includes(".")) {
      // Handle nested fields (address)
      const [parent, child] = name.split(".");
      setUserData({
        ...userData,
        [parent]: {
          ...userData[parent as keyof typeof userData] as Record<string, string>,
          [child]: value
        }
      });
    } else {
      // Handle top-level fields
      setUserData({
        ...userData,
        [name]: value
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-6 border-b">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-full bg-sport-blue flex items-center justify-center text-white mr-4">
                      <User className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{userData.name}</p>
                      <p className="text-sm text-gray-500">{userData.email}</p>
                    </div>
                  </div>
                </div>
                
                <nav className="p-4">
                  <ul className="space-y-2">
                    <li>
                      <Link to="#profile" className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
                        <User className="h-5 w-5 mr-3 text-gray-500" />
                        <span>My Profile</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="#orders" className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
                        <Package className="h-5 w-5 mr-3 text-gray-500" />
                        <span>Order History</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/wishlist" className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
                        <Heart className="h-5 w-5 mr-3 text-gray-500" />
                        <span>Wishlist</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/cart" className="flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100">
                        <ShoppingBag className="h-5 w-5 mr-3 text-gray-500" />
                        <span>Shopping Cart</span>
                      </Link>
                    </li>
                    <li>
                      <button 
                        className="w-full flex items-center px-3 py-2 text-gray-700 rounded-md hover:bg-gray-100"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-5 w-5 mr-3 text-gray-500" />
                        <span>Logout</span>
                      </button>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile" className="space-y-6">
                <TabsList className="bg-white">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="addresses">Addresses</TabsTrigger>
                  <TabsTrigger value="payment">Payment Methods</TabsTrigger>
                </TabsList>
                
                {/* Profile Tab */}
                <TabsContent value="profile" className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Profile Information</h2>
                    <Button 
                      variant={isEditing ? "outline" : "default"}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? "Cancel" : "Edit"}
                    </Button>
                  </div>
                  
                  <form onSubmit={handleProfileUpdate}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={userData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={userData.phone}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className="mt-1"
                        />
                      </div>
                      
                      <div className="border-t pt-6 mt-6">
                        <h3 className="font-medium mb-4">Default Address</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="md:col-span-2">
                            <Label htmlFor="address.street">Street Address</Label>
                            <Input
                              id="address.street"
                              name="address.street"
                              value={userData.address.street}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="address.city">City</Label>
                            <Input
                              id="address.city"
                              name="address.city"
                              value={userData.address.city}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="address.state">State</Label>
                            <Input
                              id="address.state"
                              name="address.state"
                              value={userData.address.state}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="address.zipCode">ZIP Code</Label>
                            <Input
                              id="address.zipCode"
                              name="address.zipCode"
                              value={userData.address.zipCode}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                          
                          <div>
                            <Label htmlFor="address.country">Country</Label>
                            <Input
                              id="address.country"
                              name="address.country"
                              value={userData.address.country}
                              onChange={handleInputChange}
                              disabled={!isEditing}
                              className="mt-1"
                            />
                          </div>
                        </div>
                      </div>
                      
                      {isEditing && (
                        <div className="flex justify-end">
                          <Button type="submit" className="bg-sport-blue hover:bg-sport-blue/90">
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </div>
                  </form>
                </TabsContent>
                
                {/* Orders Tab */}
                <TabsContent value="orders" className="bg-white shadow rounded-lg overflow-hidden">
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-semibold">Order History</h2>
                    <p className="text-gray-500 text-sm mt-1">View and track your orders</p>
                  </div>
                  
                  <div className="divide-y">
                    {mockOrders.map((order) => (
                      <div key={order.id} className="p-6 hover:bg-gray-50">
                        <div className="flex flex-col md:flex-row justify-between">
                          <div>
                            <p className="font-medium">{order.id}</p>
                            <p className="text-sm text-gray-500">{order.date}</p>
                          </div>
                          
                          <div className="mt-4 md:mt-0 md:text-right">
                            <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              order.status === 'Delivered' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                            }`}>
                              {order.status}
                            </div>
                            <p className="text-sm mt-1">
                              {order.items} {order.items === 1 ? 'item' : 'items'} • ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="mt-4 flex flex-wrap gap-2">
                          <Link to={`/order-tracking?order=${order.id}`}>
                            <Button variant="outline" size="sm">
                              Track Order
                            </Button>
                          </Link>
                          <Link to={`/order-details?order=${order.id}`}>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                
                {/* Addresses Tab */}
                <TabsContent value="addresses" className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Saved Addresses</h2>
                    <Button>Add New Address</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Default
                        </span>
                      </div>
                      
                      <div className="flex items-start pt-6">
                        <MapPin className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">{userData.name}</p>
                          <p className="text-sm text-gray-500 mt-1">{userData.address.street}</p>
                          <p className="text-sm text-gray-500">
                            {userData.address.city}, {userData.address.state} {userData.address.zipCode}
                          </p>
                          <p className="text-sm text-gray-500">{userData.address.country}</p>
                          <p className="text-sm text-gray-500 mt-1">{userData.phone}</p>
                          
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                {/* Payment Methods Tab */}
                <TabsContent value="payment" className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Payment Methods</h2>
                    <Button>Add Payment Method</Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Default
                        </span>
                      </div>
                      
                      <div className="flex items-start pt-6">
                        <CreditCard className="h-5 w-5 text-gray-400 mr-3 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Visa ending in 4242</p>
                          <p className="text-sm text-gray-500 mt-1">Expires 04/26</p>
                          <p className="text-sm text-gray-500 mt-1">{userData.name}</p>
                          
                          <div className="mt-4 flex gap-2">
                            <Button variant="outline" size="sm">Edit</Button>
                            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default UserDashboard;
