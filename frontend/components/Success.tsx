import { ScaleFade, VStack, Text, Image, Button } from "@chakra-ui/react";
import Link from "next/link";
import styles from "@styles/List.module.css";

type SuccessProps = {
  id: string;
  title: string;
  inTrigger: boolean;
};

function Success({ id, title, inTrigger }: SuccessProps) {
  return (
    <VStack minH="100vh" pt="2rem" className={styles.successContainer}>
      <Text className={styles.title}>Congrats, your cause is listed!</Text>
      <ScaleFade initialScale={0.5} in={inTrigger}>
        <Image
          alt="success image"
          src="/success.png"
          className={styles.successImage}
        />
      </ScaleFade>
      <Text className={styles.successText}>
        <Text as="span" className={styles.successTextHeavy}>
          {title}
        </Text>{" "}
        has been successfully listed on Klaygoods.
      </Text>
      <VStack className={styles.buttonContainer}>
        <Link href={`/cause/${id}`}>
          <Button className={styles.viewCauseBtn}>View cause</Button>
        </Link>
      </VStack>
    </VStack>
  );
}

export default Success;
