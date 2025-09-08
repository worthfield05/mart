import { Badge, Box, Flex, Image, Link } from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import { useLocation, Link as routerLink } from "react-router-dom";
import logo from "../../../assets/imgs/Elect.png";
import { FaUserCircle } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import Sidebar from "../Sidebar/Sidebar";
import { useAuth } from "../../../hooks/useAuth";

const Header = () => {
  const location = useLocation().pathname;
  const { data: user } = useAuth();
  console.log(location);
  //   const cart = useSelector((state) => state.data.cart);

  const active = {
    color: "brand.900",
  };

  return (
    <nav>
      <Flex
        justify="space-between"
        align="center"
        shadow="base"
        px={[null, "0px", "5%", "10%"]}
        py="2.5"
      >
        {/* Brand logo and name */}
        <Flex
          align="center"
          minW="15%"
          fontSize="18px"
          color="brand.900"
          ps={["20px", "20px", 0]}
        >
          <Image
            src={logo}
            width={30}
            height={30}
            rounded={"full"}
            alt="logo"
          />
          <Link
            as={routerLink}
            to={"/"}
            fontWeight={600}
            color={"red.500"}
            ms="2"
            title="logo"
          >
            Electro Verse
          </Link>
        </Flex>

        <Box flex="1" me="6" display={["none", "none", "flex"]}>
          <SearchBar />
        </Box>

        <Flex align="center" justify="flex-end">
          <Link
            href="/Cart"
            p="2"
            fontSize="18px"
            display={["none", "none", "flex"]}
            me={6}
            position="relative"
            style={location === "/Cart" ? active : { color: "" }}
            _hover={{ color: "brand.900" }}
            title="cart"
          >
            <FiShoppingCart />
            <Badge
              color="white"
              bgColor="brand.900"
              position="absolute"
              top="0"
              right="-5px"
            >
              {/* {cart.length} */}
            </Badge>
          </Link>

          {!user ? (
            // <Button text={"Login"} href={"/Login"} />
            <Link as={routerLink} to={"login"}>
              Login
            </Link>
          ) : (
            <Link
              as={routerLink}
              to={"/Dashboard"}
              fontSize={"20px"}
              opacity={"0.7"}
            >
              <FaUserCircle />
            </Link>
          )}
          <Sidebar />
        </Flex>
      </Flex>
    </nav>
  );
};

export default Header;
