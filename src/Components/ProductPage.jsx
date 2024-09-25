import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "react-bootstrap/Spinner";
import ProductPlaceholder from "../Images/product-placeholder.jpeg";
import ProductModal from "./ProductModal";
import Button from "react-bootstrap/Button";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTermbyname, setSearchTermbyname] = useState("");
  const [searchTermbyCategory, setSearchTermbyCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Fetch products and categories
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://ecommerce-page-backend.onrender.com/product/allproducts`);
        setProducts(response.data.product);
        setFilteredProducts(response.data.product);

        // Extract unique categories from products
        const uniqueCategories = [...new Set(response.data.product.map(p => p.category))];
        setCategories(uniqueCategories);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
};

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Filter products by category
  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  // Filter products by search term with product name
  const filterBySearchTerm = (searchTermbyname) => {
    setSearchTermbyname(searchTermbyname);
    setFilteredProducts(products.filter(product =>
      product.name.toLowerCase().includes(searchTermbyname.toLowerCase())
    ));
  };

  // Filter products by search term
  const filterBySearchCategory = (searchTermbyCategory) => {
    setSearchTermbyCategory(searchTermbyCategory);
    setFilteredProducts(products.filter(product =>
      product.category.toLowerCase().includes(searchTermbyCategory.toLowerCase())
    ));
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h4>Please wait, it takes some time</h4>
        <Spinner animation="border" role="status">
          {/* <span className="visually-hidden">Loading...</span> */}
        </Spinner>
      </div>
    );
  }

  if (error) {
    let errorMessage;
    if (error.response) {
      errorMessage = `${error.response.data.message}`;
    } else if (error.request) {
      errorMessage = "Error: No response from server";
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    return <div>{errorMessage}</div>;
  }

  return (
    <div className="container mx-auto lg:mx-4 px-4 py-6">
      <div className="mb-4">
        <h2 className="text-xl font-sans">
          Products ({filteredProducts.length} Items Found)
        </h2>
      </div>

      {/* Filter Section */}
      <div className="flex flex-col items-center lg:flex-row lg:items-start gap-8">
        {/* Left Sidebar for Categories */}
        <div className="w-1/2 lg:w-1/4">
        <div className="mb-4">
            <input
              type="text"
              placeholder="Search Category"
              value={searchTermbyCategory}
              onChange={(e) => filterBySearchCategory(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 lg:px-4 py-2 lg:py-2 w-full"
            />
          </div>
          <h3 className="text-lg font-bold mb-2">Filter by Category</h3>
          <ul className="list-none space-y-2">
            <li>
              <button
                className={`text-sm ${selectedCategory === "" ? "font-bold" : ""}`}
                onClick={() => filterByCategory("")}
              >
                All Categories
              </button>
            </li>
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  className={`text-sm ${selectedCategory === category ? "font-bold" : ""}`}
                  onClick={() => filterByCategory(category)}
                >
                  {category}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="w-3/4">
          {/* Search Bar */}
          <div className="mb-4">
            <input
              type="text"
              placeholder="Search product name(eg:smartphone,television,etc)"
              value={searchTermbyname}
              onChange={(e) => filterBySearchTerm(e.target.value)}
              className="border border-gray-200 rounded-lg px-1 lg:px-4 py-2 w-full"
            />
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden card-contents transition-transform duration-200 hover:scale-105 hover:shadow-lg" style={{ width: "100%" }}
                >
                  <img
                    className="h-48 w-full object-contain"
                    src={
                      product.images?.[0]
                        ? `https://res.cloudinary.com/dlovthlr8/image/upload/${product.images[0]}`
                        : ProductPlaceholder
                    }
                    alt={product.name}
                    onClick={() => handleShowModal(product)} 
                  />
                  <div className="p-2">
                    <h3 className="font-bold text-lg mb-2">{product.brand}</h3>
                    <p className="text-gray-700">{product.title}</p>
                    <p className="text-gray-900 font-bold">Rs. {product.price}</p>
                    <Button variant="primary" onClick={() => handleShowModal(product)}>View Details</Button>
                  </div>
                </div>
              ))
            ) : (
              <div>No products found.</div>
            )}
          </div>
        </div>
      </div>

      {selectedProduct && (
        <ProductModal
          show={showModal}
          handleClose={handleCloseModal}
          product={selectedProduct}
        />
      )}
    </div>
  );
}

export default ProductPage;