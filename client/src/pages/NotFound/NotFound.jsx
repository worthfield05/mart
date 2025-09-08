import { Box, Flex, Text } from "@chakra-ui/react";
import SearchBar from "../../components/common/SearchBar/SearchBar";
import Button from "../../components/common/Button/Button";

const NotFound = () => {
  return (
    <Flex
      flexDirection="column"
      gap="4"
      justify="center"
      align="center"
      px={[null, "10px", "5%", "10%"]}
      m="10% 0 50px 0"
    >
      <Text fontWeight="700" as="h1">
        Couldn't find the page
      </Text>
      <Text mb="5" color="brand.900" fontSize="70px" fontWeight="800">
        404 Error
      </Text>
      <Button mb="5" text={"Go back Home"} href="/" />
      <SearchBar />
    </Flex>
  );
};

export default NotFound;
