import styles from "@styles/Footer.module.css";
import { HStack, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <HStack className={styles.footer}>
      <Text>@ 2022 KlayGoods</Text>
      <Text>Built with ♡ for Klaytn Hackathon</Text>
    </HStack>
  );
};

export default Footer;
