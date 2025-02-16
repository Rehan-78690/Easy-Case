import React, { useState, useEffect } from 'react';
import { 
  Box, Heading, IconButton, Table, Thead, Tbody, Tr, Th, Td, Button, 
  Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, 
  PopoverBody, Input, useDisclosure, Flex 
} from "@chakra-ui/react";

import { AddIcon, EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { getProducts, createProduct, deleteProduct, updateProduct, addTagToProduct } from '../../services/productService';
import AddProductModal from './AddProductModal'; 
import { useNavigate } from 'react-router-dom';
import { ArrowBackIcon, SmallAddIcon } from '@chakra-ui/icons';


const ManageInventory = () => {
  const navigate = useNavigate();
  const [inventoryItems, setInventoryItems] = useState([]);
  const [collections, setCollections] = useState([]);
  const [newProduct, setNewProduct] = useState({
    title: '',
    description: '',
    slug: '',
    inventory: null,
    unit_price: null,
    collection: null,
    image: null,
  });
  const [nextPage, setNextPage] = useState(null);
  const [previousPage, setPreviousPage] = useState(null);
  const [editingProductId, setEditingProductId] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tagInputs, setTagInputs] = useState({});

  // Fetch data including pagination info
  const fetchData = async (url = null) => {
    try {
      const products = await getProducts(url);
      setInventoryItems(products.results);
      setNextPage(products.next);
      setPreviousPage(products.previous);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    async function fetchData(url = 'http://127.0.0.1:8000/store/products') { // Set the default URL
      try {
        const products = await getProducts(url); // Pass the URL to the function
        setInventoryItems(products.results);
        setNextPage(products.next); // Set the next page URL
        setPreviousPage(products.previous); // Set the previous page URL
        console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  
    fetchData();
  }, []);
  

  useEffect(() => {
    async function fetchCollections() {
      const response = await fetch('http://127.0.0.1:8000/store/collections');
      const data = await response.json();
      setCollections(data);
    }
    fetchCollections();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleAddProduct = async () => {
    if (editingProductId) {
      await updateProduct(editingProductId, newProduct);
    } else {
      const addedProduct = await createProduct(newProduct);
      setInventoryItems([...inventoryItems, addedProduct]);
    }

    setNewProduct({
      title: '',
      description: '',
      slug: '',
      inventory: null,
      unit_price: null,
      collection: null,
      image: null,
    });
    setEditingProductId(null);
    onClose();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setNewProduct({
      ...newProduct,
      image: file,
    });
  };

  const handleEditProduct = (product) => {
    setNewProduct({
      title: product.title,
      description: product.description,
      slug: product.slug,
      inventory: product.inventory,
      unit_price: product.unit_price,
      collection: product.collection,
      image: product.image,
    });
    setEditingProductId(product.id);
    onOpen();
  };

  const handleDeleteProduct = async (id) => {
    const isDeleted = await deleteProduct(id);
    if (isDeleted) {
      setInventoryItems(inventoryItems.filter(item => item.id !== id));
    }
  };
  const handleAddTagProduct = async (productId) => {
    try {
      const tag = tagInputs[productId]; // Get the input value for the tag
      if (!tag) {
        alert("Please enter a tag");
        return;
      }
  
      const response = await addTagToProduct(productId, tag); // Call the API service
      alert("Tag added successfully!");
  
      // Update the inventoryItems state to reflect the added tag
      setInventoryItems((prevItems) =>
        prevItems.map((item) =>
          item.id === productId ? { ...item, tags: [...(item.tags || []), tag] } : item
        )
      );
  
      // Clear the input field for the tag
      setTagInputs({ ...tagInputs, [productId]: '' });
    } catch (error) {
      console.error("Failed to add tag to product:", error);
      alert("Failed to add tag");
    }
  };
  

  const handleTagInputChange = (productId, value) => {
    setTagInputs({ ...tagInputs, [productId]: value });
  };
  

  const handleNextPage = () => {
    if (nextPage) {
      fetchData(nextPage); // Fetch data for the next page
    }
  };
  
  const handlePreviousPage = () => {
    if (previousPage) {
      fetchData(previousPage); // Fetch data for the previous page
    }
  };
  

  return (
    <Box 
      p={{ base: "15px", md: "30px" }} 
      bg="#0A0E23" 
      color="white" 
      borderRadius="xl"
      boxShadow="lg"
      maxW="1200px"
      mx="auto"
      mt="20px"
    >
      {/* Back Button & Heading */}
      <Flex align="center" mb="20px" justify="space-between">
        <IconButton
          aria-label="Back"
          icon={<ArrowBackIcon />}
          colorScheme="orange"
          onClick={() => navigate('/MainSellerPage')} 
        />
        <Heading color="#F47D31" textAlign="center" flex="1">Manage Inventory</Heading>
      </Flex>

      {/* Add Product Button */}
      <Flex justify="flex-end" mb="15px">
        <Button 
          leftIcon={<AddIcon />} 
          colorScheme="orange"
          size="md"
          onClick={onOpen}
        >
          Add Product
        </Button>
      </Flex>

      {/* Inventory Table */}
      <Box overflowX="auto" borderRadius="lg" boxShadow="md">
        <Table 
          variant="simple" 
          bg="white" 
          color="black" 
          borderRadius="lg" 
          size="md"
        >
          <Thead bg="#F47D31">
            <Tr>
              <Th color="white" px="10px" py="12px">Product Name</Th>
              <Th color="white" px="10px" py="12px">Status</Th>
              <Th color="white" px="10px" py="12px">Quantity</Th>
              <Th color="white" px="10px" py="12px" textAlign="center">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {inventoryItems.map(item => (
              <Tr key={item.id} _hover={{ bg: "#F9F9F9" }}>
                <Td px="10px" py="12px">{item?.title}</Td>
                <Td px="10px" py="12px" fontWeight="bold" color={item.inventory > 0 ? "green.500" : "red.500"}>
                  {item.inventory > 0 ? 'In Stock' : 'Out of Stock'}
                </Td>
                <Td px="10px" py="12px">{item.inventory}</Td>
                <Td px="10px" py="12px" textAlign="center">
                  <IconButton
                    icon={<EditIcon />}
                    backgroundColor="blue.500"
                    _hover={{ backgroundColor: "blue.600" }}
                    color="white"
                    mr="2"
                    onClick={() => handleEditProduct(item)}
                    aria-label="Edit Product"
                  />
                  <IconButton
                    icon={<DeleteIcon />}
                    backgroundColor="red.500"
                    _hover={{ backgroundColor: "red.600" }}
                    color="white"
                    mr="2"
                    onClick={() => handleDeleteProduct(item.id)}
                    aria-label="Delete Product"
                  />
                  {/* Add Tag Popover */}
                  <Popover>
                    <PopoverTrigger>
                      <IconButton
                        icon={<SmallAddIcon />}
                        aria-label="Add Tag"
                        colorScheme="orange"
                        size="sm"
                      />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverBody>
                        <Input
                          placeholder="Enter tag"
                          value={tagInputs[item.id] || ''}
                          onChange={(e) => handleTagInputChange(item.id, e.target.value)}
                          size="sm"
                          mb="2"
                        />
                        <Button
                          onClick={() => handleAddTagProduct(item.id)}
                          colorScheme="orange"
                          size="sm"
                        >
                          Add Tag
                        </Button>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      {/* Pagination Buttons */}
      <Flex justify="space-between" mt="20px">
        <Button
          onClick={handlePreviousPage}
          isDisabled={!previousPage}
          colorScheme="orange"
          size="md"
        >
          Previous
        </Button>
        <Button
          onClick={handleNextPage}
          isDisabled={!nextPage}
          colorScheme="orange"
          size="md"
        >
          Next
        </Button>
      </Flex>

      {/* Add or Update Product Modal */}
      <AddProductModal
        isOpen={isOpen}
        onClose={onClose}
        newProduct={newProduct}
        handleInputChange={handleInputChange}
        handleAddProduct={handleAddProduct}
        handleImageUpload={handleImageUpload}
        collections={collections}
        editingProductId={editingProductId}
      />
    </Box>
  );
};

export default ManageInventory;
