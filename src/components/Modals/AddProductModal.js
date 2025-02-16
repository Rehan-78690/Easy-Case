import React, { useState, useEffect } from 'react';
import { 
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, 
  Input, Select, Button, Grid, GridItem, FormControl, FormLabel, Textarea 
} from '@chakra-ui/react';
import axios from 'axios';

const AddProductModal = ({
  isOpen,
  onClose,
  newProduct,
  setNewProduct,
  handleInputChange,
  handleAddProduct,
  handleImageUpload,
  collections,
  editingProductId
}) => {
  const [tags, setTags] = useState('');

  useEffect(() => {
    if (editingProductId) {
      setTags(newProduct.tags?.join(', ') || '');
    } else {
      setTags('');
    }
  }, [editingProductId, newProduct]);

  const handleTagChange = (event) => setTags(event.target.value);

  const handleSubmit = async () => {
    const tagList = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    const productData = { ...newProduct, tags: tagList };

    try {
      await axios.post('products/', productData);
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent bg="#0A0E23" color="white" borderRadius="lg" boxShadow="lg" p={4}>
        <ModalHeader textAlign="center" fontSize="xl">
          {editingProductId ? 'Update Product' : 'Add New Product'}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel>Product Name</FormLabel>
                <Input
                  name="title"
                  placeholder="Enter product name"
                  value={newProduct.title || ''}
                  onChange={handleInputChange}
                  bg="gray.700"
                  color="white"
                  _focus={{ borderColor: '#F47D31', boxShadow: '0 0 0 2px #F47D31' }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Slug</FormLabel>
                <Input
                  name="slug"
                  placeholder="Enter product slug"
                  value={newProduct.slug || ''}
                  onChange={handleInputChange}
                  bg="gray.700"
                  color="white"
                  _focus={{ borderColor: '#F47D31', boxShadow: '0 0 0 2px #F47D31' }}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Enter product description"
                  value={newProduct.description || ''}
                  onChange={handleInputChange}
                  bg="gray.700"
                  color="white"
                  _focus={{ borderColor: '#F47D31', boxShadow: '0 0 0 2px #F47D31' }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="unit_price"
                  type="number"
                  placeholder="Enter price"
                  value={newProduct.unit_price || ''}
                  onChange={handleInputChange}
                  bg="gray.700"
                  color="white"
                  _focus={{ borderColor: '#F47D31', boxShadow: '0 0 0 2px #F47D31' }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Quantity</FormLabel>
                <Input
                  name="inventory"
                  type="number"
                  placeholder="Enter available quantity"
                  value={newProduct.inventory || ''}
                  onChange={handleInputChange}
                  bg="gray.700"
                  color="white"
                  _focus={{ borderColor: '#F47D31', boxShadow: '0 0 0 2px #F47D31' }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Select Collection</FormLabel>
                <Select
                  name="collection"
                  value={newProduct.collection || ''}
                  onChange={handleInputChange}
                  bg="gray.700"
                  color="white"
                  _focus={{ borderColor: '#F47D31', boxShadow: '0 0 0 2px #F47D31' }}
                >
                  {collections.map(collection => (
                    <option key={collection.id} value={collection.id} style={{ color: 'black' }}>
                      {collection.title}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel>Upload Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  bg="gray.700"
                  color="white"
                  p={1}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl>
                <FormLabel>Tags</FormLabel>
                <Input
                  name="tags"
                  placeholder="Enter tags (comma-separated)"
                  value={tags}
                  onChange={handleTagChange}
                  bg="gray.700"
                  color="white"
                  _focus={{ borderColor: '#F47D31', boxShadow: '0 0 0 2px #F47D31' }}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            onClick={handleSubmit}
            bg="#F47D31"
            color="white"
            _hover={{ bg: '#FF8C42', boxShadow: '0px 4px 10px rgba(255,140,66,0.4)' }}
            size="lg"
            borderRadius="md"
            px={6}
          >
            {editingProductId ? 'Update Product' : 'Add Product'}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
