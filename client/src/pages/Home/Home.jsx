import {
  Badge,
  Box,
  Flex,
  Grid,
  Image,
  Input,
  Link,
  Text,
} from "@chakra-ui/react";
import { Suspense } from "react";
import background from "../../assets/imgs/background.jpg";
import bg from "../../assets/imgs/cover.jpg";
import bg1 from "../../assets/imgs/bg1.webp";
import bg2 from "../../assets/imgs/bg2.webp";
import bg3 from "../../assets/imgs/bg3.webp";
import Loader from "../../components/common/Loading/Loader";
import HeroSection from "../../components/common/HeroSection/HeroSection";
import Heading from "../../components/common/Heading/Heading";
// import Loader from "../../components/loader/loader";

// const Product = React.lazy(() =>
//   import("../../components/product/product.jsx")
// );

const Home = () => {
  return (
    <Box>
      <Flex justify="flex-end" align="center" position="relative">
        <Box w={["100%", "100%", "70%"]}>
          <Suspense fallback={<Loader />}>
            <Box
              w="100%"
              h="600px"
              backgroundImage={`url(${background})`}
              backgroundSize="cover"
              bgPosition="50%, 75%"
              alt="bgImage"
            ></Box>
          </Suspense>
        </Box>
        <HeroSection
          mainText={"More than a store. It's a marketplace"}
          subText={
            "Your go-to for all things tech, trend, and more. Download our app and start exploring!"
          }
        />
      </Flex>

      <Box fontSize="14px" px={[null, "10px", "5%", "10%"]} m="10% 0 50px 0">
        <Heading
          mainText={"GET AWESOME DISCOUNTS ON ALL PURCHASE"}
          subText={"Offers, Incentives and discounts all for you."}
        />
        <Flex
          justify="space-between"
          flexWrap="wrap"
          px={["20px", "20px", null]}
        >
          <Link
            href="/Shop"
            w={["100%", "48%", "32%"]}
            textAlign="right"
            backgroundImage={`url(${bg1})`}
            bgSize="cover"
            my={["15px", null]}
          >
            <Box p="50px">
              <Text fontWeight="600">SOFA</Text>
              <Text fontWeight="600" color="red.900" mb="20px">
                <Badge colorScheme="green">SAVE 30%</Badge>
              </Text>
            </Box>
          </Link>
          <Link
            href="/Shop"
            w={["100%", "48%", "32%"]}
            textAlign="right"
            backgroundImage={`url(${bg2})`}
            bgSize="cover"
            my={["15px", null]}
          >
            <Box p="50px">
              <Text fontWeight="600">NEW ARRIVAL</Text>
              <Text fontWeight="600" color="brand.900" mb="20px">
                <Badge colorScheme="green">SAVE 50%</Badge>
              </Text>
            </Box>
          </Link>
          <Link
            href="/Shop"
            w={["100%", "48%", "32%"]}
            textAlign="right"
            backgroundImage={`url(${bg3})`}
            bgSize="cover"
            my={["15px", null]}
          >
            <Box p="50px">
              <Text fontWeight="600">CHAIR</Text>
              <Text fontWeight="600" color="brand.900" mb="20px">
                <Badge colorScheme="green">SAVE 20%</Badge>
              </Text>
            </Box>
          </Link>
        </Flex>
      </Box>

      <Box py="5%" px={[null, "20px", "5%", "10%"]}>
        <Heading
          mainText={"HOT DEALS FOR YOU"}
          subText={"Our customers most loved products you can also get."}
        />

        <Grid
          gap={4}
          w="100%"
          templateColumns={[
            "repeat(1, 1fr)",
            "repeat(2, 1fr)",
            "repeat(2, 1fr)",
            "repeat(4, 1fr)",
          ]}
        >
          {/* {data.products.map((product) => {
            return (
              <Suspense key={product.id} fallback={<div>Loading...</div>}>
                <Product key={product.id} product={product} />
              </Suspense>
            );
          })} */}
        </Grid>
      </Box>

      <Box py="5%" px={[null, "0", "5%", "10%"]} my="5%">
        <Flex justify="space-between" flexWrap="wrap">
          <Box w={[null, "100%", "40%"]} p="5%" ps={["5%", "5%", 0]}>
            <Text fontSize={["20px", "30px"]} fontWeight="700" pb="15px">
              Artistic Designs with unique shapes.
            </Text>
            <Text fontSize="14px" fontWeight="600" mb="35px">
              Your favorite products, delivered to your fingertips. Shop on the
              go, anytime, anywhere.
            </Text>
            <Link
              href="/Shop"
              fontSize="14px"
              p="10px 20px"
              bgColor="red.900"
              color="white"
              _hover={{ bgColor: "orange.500" }}
            >
              Shop now
            </Link>
          </Box>
          <Image
            src={bg}
            w={[null, "100%", "60%"]}
            alt="bg"
            border="5px"
            borderStyle="solid"
            borderColor="gray.300"
            loading="lazy"
          />
        </Flex>
      </Box>

      <Box bgColor="gray.100" p="5%" mb="30px" fontSize="14px">
        <Heading mainText={"Subscribe To Our Newsletter"} />

        <Flex
          justify="center"
          align="center"
          m="auto"
          w="fit-content"
          p="2px"
          bgColor="white"
          border="1px"
          borderColor="gray.300"
          borderRadius="0"
        >
          <Input
            placeholder="Enter your email..."
            fontSize="14px"
            borderRadius="0"
            border="none"
            w={["100%", "100%", "300px"]}
          />
          <Link
            href="/"
            bgColor="red.900"
            p="10px 25px"
            border="1px"
            borderColor="red.900"
            color="white"
          >
            Subscribe
          </Link>
        </Flex>
      </Box>
    </Box>
  );
};

export default Home;
