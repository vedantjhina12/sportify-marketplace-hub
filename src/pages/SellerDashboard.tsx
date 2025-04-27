import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BarChart3,
  Package,
  Users,
  Settings,
  Plus,
  Search,
  Edit,
  Trash2,
  ShoppingBag
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock product data
const mockProducts = [
  {
    id: 1,
    name: "Pro Run Ultra Shoes",
    price: 129.99,
    inventory: 45,
    category: "Running",
    status: "Active"
  },
  {
    id: 2,
    name: "Competition Basketball",
    price: 49.99,
    inventory: 32,
    category: "Basketball",
    status: "Active"
  },
  {
    id: 3,
    name: "Elite Tennis Racket",
    price: 199.99,
    inventory: 18,
    category: "Tennis",
    status: "Active"
  },
  {
    id: 4,
    name: "Training Soccer Ball",
    price: 39.99,
    inventory: 0,
    category: "Football",
    status: "Out of Stock"
  }
];

// Mock sales data
const mockSalesData = {
  revenue: 12345.67,
  orders: 98,
  customers: 76,
  averageOrder: 125.98
};

const SellerDashboard = () => {
  const { toast } = useToast();
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const deleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    toast({
      title: "Product deleted",
      description: "The product has been deleted successfully."
    });
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="bg-sport-blue text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold">Seller Dashboard</h1>
          <p className="text-blue-100">Manage your products and orders</p>
        </div>
      </div>
      
      <main className="flex-grow py-10">
        <div className="container mx-auto px-4">
          {/* Dashboard Stats with Background Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="relative bg-white rounded-lg shadow p-6 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
                  alt="Revenue background"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative flex items-center">
                <div className="bg-blue-100 p-3 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-sport-blue" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
                  <p className="text-2xl font-bold">${mockSalesData.revenue.toFixed(2)}</p>
                </div>
              </div>
            </div>
            
            <div className="relative bg-white rounded-lg shadow p-6 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55"
                  alt="Orders background"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative flex items-center">
                <div className="bg-green-100 p-3 rounded-full">
                  <Package className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Orders</h3>
                  <p className="text-2xl font-bold">{mockSalesData.orders}</p>
                </div>
              </div>
            </div>
            
            <div className="relative bg-white rounded-lg shadow p-6 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://images.unsplash.com/photo-1617083934551-ea81e8c49ab4"
                  alt="Customers background"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative flex items-center">
                <div className="bg-purple-100 p-3 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Customers</h3>
                  <p className="text-2xl font-bold">{mockSalesData.customers}</p>
                </div>
              </div>
            </div>
            
            <div className="relative bg-white rounded-lg shadow p-6 overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <img
                  src="https://images.unsplash.com/photo-1542291026-7eec264c27ff"
                  alt="Average Order background"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative flex items-center">
                <div className="bg-yellow-100 p-3 rounded-full">
                  <BarChart3 className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-sm font-medium text-gray-500">Avg. Order</h3>
                  <p className="text-2xl font-bold">${mockSalesData.averageOrder.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="products" className="space-y-6">
            <div className="flex justify-between items-center mb-6">
              <TabsList>
                <TabsTrigger value="products">Products</TabsTrigger>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="customers">Customers</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
              
              <Link to="/seller/add-product">
                <Button className="bg-sport-blue hover:bg-sport-blue/90">
                  <Plus className="h-4 w-4 mr-2" /> Add Product
                </Button>
              </Link>
            </div>
            
            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search products..."
                      className="pl-10"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Category
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Inventory
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                          <tr key={product.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">ID: {product.id}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.category}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${product.price.toFixed(2)}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">{product.inventory}</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                product.status === 'Active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {product.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Link to={`/seller/edit-product/${product.id}`}>
                                  <Button size="sm" variant="ghost">
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                </Link>
                                <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deleteProduct(product.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                            No products found
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
            
            {/* Other tabs would be implemented here */}
            <TabsContent value="orders">
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-500">Order management functionality will be implemented soon.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="customers">
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-500">Customer management functionality will be implemented soon.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="settings">
              <div className="bg-white shadow rounded-lg p-6">
                <p className="text-gray-500">Settings functionality will be implemented soon.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SellerDashboard;
