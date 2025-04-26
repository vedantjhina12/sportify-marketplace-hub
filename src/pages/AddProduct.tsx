
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Upload,
  Plus,
  X,
  ArrowLeft
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const AddProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [productData, setProductData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    inventory: "",
    features: [""],
    deliveryInfo: ""
  });
  
  const [images, setImages] = useState<{ preview: string; file?: File }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value
    });
  };
  
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...productData.features];
    newFeatures[index] = value;
    setProductData({
      ...productData,
      features: newFeatures
    });
  };
  
  const addFeatureField = () => {
    setProductData({
      ...productData,
      features: [...productData.features, ""]
    });
  };
  
  const removeFeatureField = (index: number) => {
    if (productData.features.length > 1) {
      const newFeatures = [...productData.features];
      newFeatures.splice(index, 1);
      setProductData({
        ...productData,
        features: newFeatures
      });
    }
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages = Array.from(e.target.files).map(file => ({
        preview: URL.createObjectURL(file),
        file
      }));
      
      setImages([...images, ...newImages].slice(0, 5)); // Limit to 5 images
    }
  };
  
  const removeImage = (index: number) => {
    const newImages = [...images];
    URL.revokeObjectURL(newImages[index].preview); // Clean up the object URL
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!productData.name || !productData.price || !productData.category || !productData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill all required fields.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call to add product
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Product Added",
        description: "Your product has been added successfully."
      });
      navigate("/seller-dashboard");
    }, 1500);
  };

  // Available categories
  const categories = ["Running", "Football", "Basketball", "Tennis", "Fitness", "Outdoor"];

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex items-center">
            <Button variant="ghost" onClick={() => navigate("/seller-dashboard")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back
            </Button>
            <h1 className="text-3xl font-bold">Add New Product</h1>
          </div>
          
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Product Information */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold border-b pb-2">Product Information</h2>
                  
                  <div>
                    <Label htmlFor="name">Product Name <span className="text-red-500">*</span></Label>
                    <Input
                      id="name"
                      name="name"
                      value={productData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($) <span className="text-red-500">*</span></Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={productData.price}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="inventory">Inventory Quantity</Label>
                      <Input
                        id="inventory"
                        name="inventory"
                        type="number"
                        min="0"
                        value={productData.inventory}
                        onChange={handleInputChange}
                        className="mt-1"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                    <select
                      id="category"
                      name="category"
                      value={productData.category}
                      onChange={handleInputChange}
                      required
                      className="w-full mt-1 px-3 py-2 rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Select a category</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Product Description <span className="text-red-500">*</span></Label>
                    <Textarea
                      id="description"
                      name="description"
                      value={productData.description}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                      rows={6}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="deliveryInfo">Delivery Information</Label>
                    <Textarea
                      id="deliveryInfo"
                      name="deliveryInfo"
                      value={productData.deliveryInfo}
                      onChange={handleInputChange}
                      className="mt-1"
                      rows={3}
                      placeholder="E.g., Free shipping, Delivery time, etc."
                    />
                  </div>
                </div>
                
                {/* Product Images and Features */}
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold border-b pb-2">Product Images & Features</h2>
                  
                  <div>
                    <Label>Product Images (up to 5)</Label>
                    <div className="mt-2 grid grid-cols-3 gap-4">
                      {images.map((image, index) => (
                        <div key={index} className="relative aspect-square border rounded-md overflow-hidden">
                          <img
                            src={image.preview}
                            alt={`Product image ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-white/80 rounded-full p-1 hover:bg-white"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                      
                      {images.length < 5 && (
                        <label className="aspect-square border border-dashed rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50">
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="sr-only"
                          />
                          <div className="flex flex-col items-center text-gray-500">
                            <Upload className="h-6 w-6 mb-1" />
                            <span className="text-xs">Upload</span>
                          </div>
                        </label>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Upload high-quality images in JPG, PNG or GIF format (max 5MB each)
                    </p>
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Label>Key Features</Label>
                      <Button
                        type="button"
                        onClick={addFeatureField}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-1" /> Add Feature
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      {productData.features.map((feature, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            value={feature}
                            onChange={(e) => handleFeatureChange(index, e.target.value)}
                            placeholder={`Feature ${index + 1}`}
                            className="flex-grow"
                          />
                          {productData.features.length > 1 && (
                            <Button
                              type="button"
                              onClick={() => removeFeatureField(index)}
                              variant="ghost"
                              size="icon"
                              className="text-red-500"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-6 mt-6">
                    <Button
                      type="submit"
                      className="w-full bg-sport-blue hover:bg-sport-blue/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding Product..." : "Add Product"}
                    </Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddProduct;
