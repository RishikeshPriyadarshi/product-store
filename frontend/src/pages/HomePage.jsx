import { Container, Text, SimpleGrid, VStack } from '@chakra-ui/react'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useProductStore } from '../Store/product';
import ProductCard from '../components/ProductCard';

const HomePage = () => {

  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();  // call the hook to fetch products on component mount.
    // This is a good place to call your API or fetch data.
  }, [fetchProducts]);
  console.log("products", products)

  return (
    <Container maxw='container.x1' py={12}>
      <VStack spacing={8}>
        <Text
          fontSize={"30"}
          fontWeight={"bold"}
          bgGradient={"linear(to-r, pink.400, blue.500)"}
          bgClip={"text"}
          textAlign={"center"}
        >
          Current Products 🛍️
        </Text>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
            lg: 3,
          }}
          spacing={10}
          w={"full"}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}

        </SimpleGrid>

        {products.length === 0 && (

          <Text fontSize='xl' textAlign={"center"} fontWeight="bold" color='gray.500'>

            No products found 😔 {""}
            <Link to={"/create"}>

              <Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
                Create a product
              </Text>

            </Link>
          </Text>
        )}

      </VStack>


    </Container>)

};

export default HomePage
