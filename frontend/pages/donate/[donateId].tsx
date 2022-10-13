import {
  VStack,
  Text,
  HStack,
  Image,
  Box,
  Button,
  Input,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { causes } from "@data/causes";
import styles from "@styles/Donate.module.css";
import Link from "next/link";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";

function Donate() {
  const router = useRouter();
  const { donateId } = router.query;
  const [amount, setAmount] = useState<number>();
  const [isTxnSuccessful, setTxnSuccessful] = useState<boolean>(true);

  function handleAmountChange(e: any) {
    setAmount(e.target.value);
  }

  const { title, profile, images, createdAt, donation, goal } = causes.find(
    (cause) => (donateId as string) == String(cause.id)
  );

  if (isTxnSuccessful) {
    return (
      <VStack minH="100vh" pt="2rem" className={styles.successContainer}>
        <Text className={styles.title}>Thank you!</Text>
        <Image
          alt="success image"
          src="/success.png"
          className={styles.successImage}
        />
        <Text className={styles.successText}>
          Your donation of{" "}
          <Text as="span" className={styles.successTextHeavy}>
            2,500 KLAY
          </Text>{" "}
          has been successfully processed. Feel free to check out the reciept on
          Etherscan.
        </Text>
        <VStack className={styles.buttonContainer}>
          <Link href="/browse">
            <Button className={styles.viewCauseBtn}>View my causes</Button>
          </Link>
          <Link href="/browse">
            <Button className={styles.viewTxnBtn}>View transaction</Button>
          </Link>
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack minH="100vh" p="2rem 3rem">
      <VStack className={styles.titleContainer}>
        <Text className={styles.title}>Donate</Text>
      </VStack>
      <HStack className={styles.container}>
        <VStack>
          <VStack className={styles.inputContainer}>
            <Text className={styles.inputHeader}>Default Network</Text>
            <HStack className={styles.inputBox}>
              <Image
                alt="klaytn logo"
                src="/klaytn.png"
                className={styles.klaytnLogo}
              ></Image>
              <Text fontWeight={500}>Klaytn</Text>
            </HStack>
          </VStack>
          <VStack className={styles.inputContainer}>
            <Text className={styles.inputHeader}>Currency</Text>
            <HStack className={styles.inputBox}>
              <Image
                alt="klaytn logo"
                src="/klaytn.png"
                className={styles.klaytnLogo}
              ></Image>
              <Text fontWeight={500}>KLAY</Text>
            </HStack>
          </VStack>
          <VStack className={styles.inputContainer}>
            <Text className={styles.inputHeader}>Amount</Text>
            <Input
              type="number"
              onChange={handleAmountChange}
              className={styles.input}
            ></Input>
            <Text className={styles.inputUnit}>KLAY</Text>
          </VStack>
          <HStack className={styles.checkboxContainer}>
            <Checkbox colorScheme="white" size="lg" />
            <VStack className={styles.checkboxTextContainer}>
              <Text className={styles.checkboxTitle}>
                I want to donate anonymously
              </Text>
              <Text className={styles.checkboxSubtitle}>
                By selecting this we won’t display your username on the donation
                activity section
              </Text>
            </VStack>
          </HStack>
          <Button disabled={!amount} className={styles.donateBtn}>
            Donate now
          </Button>
        </VStack>
        <VStack className={styles.donateContainer}>
          <HStack gap={2}>
            <Image
              alt="image 1"
              src={images[0]}
              className={styles.donateImage}
            ></Image>
          </HStack>
          <Text className={styles.causeTitle}>{title}</Text>
          <HStack className={styles.profileContainer}>
            <Image
              alt={`profile ${profile.name}`}
              src={profile.image}
              className={styles.profileImage}
            ></Image>
            <VStack alignItems="flex-start" pl=".5rem">
              <Text className={styles.profileTitle}>
                Initiative listed by @{profile.name}
              </Text>
              <HStack>
                <Image
                  alt="clock"
                  src="/clock.png"
                  className={styles.clockIcon}
                ></Image>
                <Text className={styles.profileSubtitle}>
                  Created 1 month ago
                </Text>
              </HStack>
            </VStack>
          </HStack>
          <HStack>
            <Text className={styles.donationText}>{donation} KLAY</Text>
            <Text className={styles.goalText}>raised of {goal} goal</Text>
          </HStack>
          <Box className={`${styles.progressBarContainer}`}>
            <Box
              style={{
                backgroundColor: "black",
                width: `${(0.5 * 100).toFixed(0)}%`,
              }}
              className={`${styles.progressBar}`}
            ></Box>
          </Box>
          <HStack>
            <Image
              alt="donation"
              src="/donation.png"
              className={styles.donationIcon}
            ></Image>
            <Text className={styles.donationTime}>
              Last donation 11 mins ago
            </Text>
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default Donate;
