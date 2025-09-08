import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  useDisclosure,
  Box,
  Link,
} from "@chakra-ui/react";
import { useRef } from "react";
import { HiMenu } from "react-icons/hi";
import { FiHome, FiShoppingCart } from "react-icons/fi";
import SidebarLink from "./SidebarLink";
import { BiStore } from "react-icons/bi";
import { FaSignOutAlt } from "react-icons/fa";
import SearchBar from "../SearchBar/SearchBar";
import SocialLink from "../SocialLink/SocialLink";
import { useAuth, useLogout } from "../../../hooks/useAuth";

const Sidebar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const { data: user } = useAuth();
  const mutation = useLogout();

  return (
    <>
      <Button
        href="/"
        me={["7px", "5px", 0]}
        fontSize="20px"
        ms="2"
        bgColor="white"
        border="none"
        onClick={onOpen}
        minW="auto"
      >
        <HiMenu />
      </Button>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton
            py="4"
            px="3"
            m="3"
            border="1px"
            borderColor="gray.100"
            borderRadius="0"
          />
          <DrawerHeader my="2" display="flex" alignItems="center">
            <Avatar size="sm" me="2" />
            <Box>
              <Link href={user ? "/dashboard" : "/login"} fontSize="14px">
                {user ? "Welcome" : "Login"}
              </Link>
              <Text fontSize="12px">Personal balance: $0</Text>
            </Box>
          </DrawerHeader>
          <DrawerBody fontSize="14px">
            <SearchBar />

            <Box fontSize="15px" my="8" mx="1">
              <Box fontWeight="600" my="2">
                <SidebarLink navlocation={"home"}>
                  <FiHome />
                </SidebarLink>
              </Box>
              <Box fontWeight="600" my="2">
                <SidebarLink navlocation={"shop"}>
                  <BiStore />
                </SidebarLink>
              </Box>
              <Box fontWeight="600" my="2">
                <SidebarLink navlocation={"cart"}>
                  <FiHome />
                </SidebarLink>
              </Box>
              <Box fontWeight="600" my="2">
                <SidebarLink navlocation={"wishlist"}>
                  <FiShoppingCart />
                </SidebarLink>
              </Box>
              {!user ? (
                <>
                  <Box fontWeight="600" my="2">
                    <SidebarLink navlocation={"register"}>
                      <FiShoppingCart />
                    </SidebarLink>
                  </Box>
                  <Box fontWeight="600" my="2">
                    <SidebarLink navlocation={"login"}>
                      <FiShoppingCart />
                    </SidebarLink>
                  </Box>
                </>
              ) : (
                <Box fontWeight="600" my="2">
                  <Box
                    display="flex"
                    cursor={"pointer"}
                    onClick={() => mutation.mutate()}
                    py="2"
                    alignItems="center"
                    w="100%"
                    _hover={{ color: "brand.900" }}
                  >
                    <FaSignOutAlt />
                    <Text me="3" ml={"10px"}>
                      Logout
                    </Text>
                  </Box>
                </Box>
              )}
            </Box>

            <Box py="2" mt="4">
              <Text fontWeight="600">Info@example.com</Text>
              <SocialLink />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default Sidebar;
