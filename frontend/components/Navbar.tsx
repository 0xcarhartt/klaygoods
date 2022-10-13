import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import { HStack, Image, Text } from "@chakra-ui/react";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ConnectKitButton } from "connectkit";

const Navbar = () => {
  return (
    <HStack className={styles.navbar}>
      <Link href="/">
        <Image
          src="/logo.png"
          alt="klaygoods Logo"
          cursor="pointer"
          className={styles.logo}
        ></Image>
      </Link>
      <HStack className={styles.navTabs}>
        <Text>Governance</Text>
        <Text>List Cause</Text>
        <ConnectKitButton />
      </HStack>
    </HStack>
  );
};

export default Navbar;
