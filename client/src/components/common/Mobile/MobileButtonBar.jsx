import {
  Badge,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { BiStore } from "react-icons/bi";
import { FiHeart, FiHome, FiSearch, FiShoppingCart } from "react-icons/fi";
import { useLocation } from "react-router-dom";
import MobileButtonLink from "./MobileButtonLink";
import SearchBar from "../SearchBar/SearchBar";

const MobileButtonBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const location = useLocation().pathname;
  const wishlist = 0;
  // useSelector((state) => state.data.wishlist);
  const cart = [1, 2];
  // useSelector((state) => state.data.cart);

  const active = "brand.900";

  return (
    <Flex
      justify="space-between"
      align="center"
      p="5px 12px"
      bgColor="white"
      borderColor="gray.100"
      w="100%"
      display={["flex", "flex", "none"]}
      position="fixed"
      left="0"
      bottom="0"
      boxShadow="0 5px 10px black"
    >
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent borderRadius="0" m="20px" pb="20px">
          <ModalHeader fontSize="14px">
            Search products, orders and offers here
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SearchBar />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Text
        onClick={onOpen}
        p="15px"
        fontSize="20px"
        _hover={{ color: active }}
        color={location === "#" ? active : ""}
        title="search"
      >
        <FiSearch />
      </Text>

      <MobileButtonLink
        link="Shop"
        activeLocations={["/Shop", "/SingleProduct"]}
      >
        <BiStore />
      </MobileButtonLink>

      <MobileButtonLink
        link=""
        activeLocations={["/", "/Login", "/Register", "/Account"]}
      >
        <FiHome />
      </MobileButtonLink>

      <MobileButtonLink
        link="Cart"
        activeLocations={["/Cart", "/Checkout", "/Order"]}
      >
        <FiShoppingCart />
        <Badge
          color="white"
          bgColor="brand.900"
          px="5px"
          position="absolute"
          top="5px"
          right="5px"
          borderRadius="10px"
          border="2px solid white"
        >
          {cart.length}
        </Badge>
      </MobileButtonLink>

      <MobileButtonLink link="Wishlist" activeLocations={["/Wishlist"]}>
        <FiHeart />
        {wishlist.length > 0 ? (
          <Badge
            position="absolute"
            top="12px"
            right="15px"
            bgColor="red"
            p="3px"
            border="2px solid white"
            borderRadius="50%"
          ></Badge>
        ) : (
          ""
        )}
      </MobileButtonLink>
    </Flex>
  );
};

export default MobileButtonBar;
