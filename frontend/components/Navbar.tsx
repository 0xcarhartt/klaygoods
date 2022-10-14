import Link from "next/link";
import styles from "@styles/Navbar.module.css";
import {
  Button,
  HStack,
  Image,
  Text,
  VStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { ConnectKitButton } from "connectkit";
import { useKlaytn } from "./KlaytnProvider";

const Navbar = () => {
  const { address, provider, setAddress } = useKlaytn();

  async function handleConnect() {
    try {
      const accounts = await provider.enable();
      setAddress(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  }

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
        <ChakraLink href="https://snapshot.org/#/0xcarhartt.eth" isExternal>
          <Text>Governance</Text>
        </ChakraLink>
        <ChakraLink
          href="https://klaygoods.discourse.group/invites/wHp4UAeZXp"
          isExternal
        >
          <Text>Forum</Text>
        </ChakraLink>
        <Link href="/profile">
          <Text cursor="pointer">My Profile</Text>
        </Link>
        <Link href="/list">
          <Text cursor="pointer">List Cause</Text>
        </Link>
        {address ? (
          <VStack className={styles.addressPill}>
            <Text>{abridgeAddress(address)}</Text>
          </VStack>
        ) : (
          <Button onClick={handleConnect} className={styles.connectButton}>
            Connect Wallet
          </Button>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;

export function abridgeAddress(address?: string) {
  if (!address) return address;
  const l = address.length;
  if (l < 20) return address;
  return `${address.substring(0, 6)}...${address.substring(l - 4, l)}`;
}
