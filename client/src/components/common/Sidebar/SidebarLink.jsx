import { Box, Link, Text } from "@chakra-ui/react";
import { useLocation, Link as routerLink } from "react-router-dom";

const SidebarLink = ({ navlocation, children }) => {
  const location = useLocation().pathname;

  return (
    <Box display="flex">
      <Link
        as={routerLink}
        to={`/${navlocation}`}
        py="2"
        display="flex"
        alignItems="center"
        w="100%"
        color={location === `/${navlocation}` ? "brand.900" : ""}
        _hover={{ color: "brand.900" }}
      >
        <Text me="3" opacity="0.6">
          {children}
        </Text>
        {navlocation}
      </Link>
    </Box>
  );
};

export default SidebarLink;
