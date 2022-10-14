import {
  VStack,
  Text,
  HStack,
  Image,
  Box,
  Button,
  Input,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { causes } from "@data/causes";
import styles from "@styles/Donate.module.css";
import Link from "next/link";
import { Checkbox } from "@chakra-ui/react";
import { useState } from "react";
import { useKlaytn } from "@components/KlaytnProvider";
import { numberWithCommas } from "@utils/utils";
import { ScaleFade } from "@chakra-ui/react";
import { ethers } from "ethers";

function Donate() {
  const router = useRouter();
  const { donateId } = router.query;
  const [amount, setAmount] = useState<number>();
  const [txnHash, setTxnHash] = useState<boolean>(false);
  const { provider, address } = useKlaytn();

  function handleAmountChange(e: any) {
    setAmount(Number(e.target.value));
  }

  if (!donateId) return;
  const { title, profile, images, createdAt, donation, goal } = causes.find(
    (cause) => (donateId as string) == String(cause.id)
  );

  async function donateTxn() {
    const transactionParameters = {
      gas: "0x5208",
      to: "0x224fc9662D0FE47cFC5bA947CDa724C6f317b66c",
      from: address,
      value: ethers.utils.parseEther(amount.toFixed(2)).toHexString(),
    };

    try {
      const result = await provider.sendAsync(
        {
          method: "klay_sendTransaction",
          params: [transactionParameters],
          from: address,
        },
        (err, { id, jsonrpc, result }) => {
          if (result) setTxnHash(result);
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  if (!!txnHash) {
    return (
      <VStack minH="100vh" pt="2rem" className={styles.successContainer}>
        <Text className={styles.title}>Thank you!</Text>
        <ScaleFade initialScale={0.5} in={!!txnHash}>
          <Image
            alt="success image"
            src="/success.png"
            className={styles.successImage}
          />
        </ScaleFade>
        <Text className={styles.successText}>
          Your donation of{" "}
          <Text as="span" className={styles.successTextHeavy}>
            {amount} KLAY
          </Text>{" "}
          has been successfully processed. Feel free to check out the receipt on
          KlaytnFinder.
        </Text>
        <VStack className={styles.buttonContainer}>
          <Link href="/profile">
            <Button className={styles.viewCauseBtn}>View my causes</Button>
          </Link>
          <ChakraLink
            href={`https://baobab.klaytnfinder.io/tx/${txnHash}`}
            target="_blank"
            isExternal
          >
            <Button className={styles.viewTxnBtn}>View transaction</Button>
          </ChakraLink>
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
          <Button
            disabled={!amount}
            className={styles.donateBtn}
            onClick={donateTxn}
          >
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
            <Text className={styles.donationText}>
              {numberWithCommas(donation)} KLAY
            </Text>
            <Text className={styles.goalText}>
              raised of {numberWithCommas(goal)} goal
            </Text>
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
