import { Box, Flex, Link, Text } from "@chakra-ui/react";
import SocialLink from "../SocialLink/SocialLink";
import SidebarLink from "../Sidebar/SidebarLink";

const Footer = () => {
  return (
    <footer>
      <Flex
        justify="space-between"
        flexWrap="wrap"
        py="5%"
        px={["10px", "20px", "10%"]}
        fontSize="14px"
        bgColor="gray.100"
      >
        <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">
            PAGES
          </Text>

          <SidebarLink navlocation={"Home"} />
          <SidebarLink navlocation={"Shop"} />
          <SidebarLink navlocation={"Cart"} />
          <SidebarLink navlocation={"Wishlist"} />
        </Box>

        <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">
            SERVICES
          </Text>

          <SidebarLink navlocation={"History"} />
          <SidebarLink navlocation={"Rewards"} />
          <SidebarLink navlocation={"Profile"} />
          <SidebarLink navlocation={"Settings"} />
        </Box>

        <Box w={["100%", "50%", "30%", "23%"]} my="3">
          <Text fontWeight="700" p="3">
            SUPPORTS
          </Text>
          <SidebarLink navlocation={"Notifications"} />
          <SidebarLink navlocation={"Support"} />
          <SidebarLink navlocation={"Returns"} />
          <SidebarLink navlocation={"Forum"} />
        </Box>

        <Box w={["100%", "50%", "30%", "23%"]} my="3" px="3">
          <SocialLink />
          <Text>Biratnagar, Nepal</Text>
          <Link href="karkianish05@gmail.com">karkianish05@gmail.com</Link>
        </Box>
      </Flex>

      <Flex
        mb={["12%", "12%", 0]}
        justify="space-between"
        py="20px"
        px={["20px", "20px", "10%"]}
        bgColor="gray.600"
        color="white"
        fontSize="14px"
      >
        <Text>Designed by Anish</Text>
        <Text>Copyright &copy; {new Date().getFullYear()}</Text>
      </Flex>
    </footer>
  );
};

export default Footer;
