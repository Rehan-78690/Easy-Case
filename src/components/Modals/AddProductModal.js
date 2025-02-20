import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

const AddProductModal = ({
  isOpen,
  onClose,
  newProduct,
  setNewProduct,
  handleInputChange,
  handleAddProduct,
  handleImageUpload,
  collections,
  editingProductId,
}) => {
  const [tags, setTags] = useState("");
  const toast = useToast();

  // Reset fields when modal closes
  useEffect(() => {
    if (!isOpen) {
      setNewProduct({});
      setTags("");
    }
  }, [isOpen, setNewProduct]);

  // Load tags when editing
  useEffect(() => {
    if (editingProductId) {
      setTags(newProduct.tags?.join(", ") || "");
    } else {
      setTags("");
    }
  }, [editingProductId, newProduct]);

  const handleTagChange = (event) => setTags(event.target.value);

  const handleSubmit = async () => {
    const tagList = tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== "");
    const productData = { ...newProduct, tags: tagList };

    try {
      await axios.post("products/", productData);
      toast({
        title: editingProductId ? "Product Updated" : "Product Added",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" motionPreset="slideInBottom">
      <ModalOverlay />
      <ModalContent bg="white" color="black" borderRadius="lg" boxShadow="xl" p={4}>
        <ModalHeader textAlign="center" fontSize="xl" fontWeight="bold">
          {editingProductId ? "Update Product" : "Add New Product"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
            <GridItem>
              <FormControl>
                <FormLabel fontWeight="bold">Product Name</FormLabel>
                <Input
                  name="title"
                  placeholder="Enter product name"
                  value={newProduct.title || ""}
                  onChange={handleInputChange}
                  bg="gray.100"
                  borderRadius="md"
                  _focus={{ borderColor: "#3182CE", boxShadow: "0 0 5px #3182CE" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel fontWeight="bold">Slug</FormLabel>
                <Input
                  name="slug"
                  placeholder="Enter product slug"
                  value={newProduct.slug || ""}
                  onChange={handleInputChange}
                  bg="gray.100"
                  borderRadius="md"
                  _focus={{ borderColor: "#3182CE", boxShadow: "0 0 5px #3182CE" }}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl>
                <FormLabel fontWeight="bold">Description</FormLabel>
                <Textarea
                  name="description"
                  placeholder="Enter product description"
                  value={newProduct.description || ""}
                  onChange={handleInputChange}
                  bg="gray.100"
                  borderRadius="md"
                  _focus={{ borderColor: "#3182CE", boxShadow: "0 0 5px #3182CE" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel fontWeight="bold">Price</FormLabel>
                <Input
                  name="unit_price"
                  type="number"
                  placeholder="Enter price"
                  value={newProduct.unit_price || ""}
                  onChange={handleInputChange}
                  bg="gray.100"
                  borderRadius="md"
                  _focus={{ borderColor: "#3182CE", boxShadow: "0 0 5px #3182CE" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel fontWeight="bold">Quantity</FormLabel>
                <Input
                  name="inventory"
                  type="number"
                  placeholder="Enter available quantity"
                  value={newProduct.inventory || ""}
                  onChange={handleInputChange}
                  bg="gray.100"
                  borderRadius="md"
                  _focus={{ borderColor: "#3182CE", boxShadow: "0 0 5px #3182CE" }}
                />
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel fontWeight="bold">Select Collection</FormLabel>
                <Select
                  name="collection"
                  value={newProduct.collection || ""}
                  onChange={handleInputChange}
                  bg="gray.100"
                  borderRadius="md"
                  _focus={{ borderColor: "#3182CE", boxShadow: "0 0 5px #3182CE" }}
                >
                  {collections.map((collection) => (
                    <option key={collection.id} value={collection.id} style={{ color: "black" }}>
                      {collection.title}
                    </option>
                  ))}
                </Select>
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl>
                <FormLabel fontWeight="bold">Upload Image</FormLabel>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  bg="gray.100"
                  borderRadius="md"
                  p={1}
                />
              </FormControl>
            </GridItem>

            <GridItem colSpan={{ base: 1, md: 2 }}>
              <FormControl>
                <FormLabel fontWeight="bold">Tags</FormLabel>
                <Input
                  name="tags"
                  placeholder="Enter tags (comma-separated)"
                  value={tags}
                  onChange={handleTagChange}
                  bg="gray.100"
                  borderRadius="md"
                  _focus={{ borderColor: "#3182CE", boxShadow: "0 0 5px #3182CE" }}
                />
              </FormControl>
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter justifyContent="center">
          <Button
            onClick={handleSubmit}
            bg="#3182CE"
            color="white"
            _hover={{ bg: "#2B6CB0", boxShadow: "0px 4px 10px rgba(50,120,255,0.4)" }}
            size="lg"
            borderRadius="md"
            px={6}
          >
            {editingProductId ? "Update Product" : "Add Product"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddProductModal;
