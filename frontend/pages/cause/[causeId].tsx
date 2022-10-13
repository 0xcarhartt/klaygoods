import { VStack, Text, HStack, Image, Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { causes } from "@data/causes";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import styles from "@styles/Cause.module.css";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import Link from "next/link";

function Cause() {
  const router = useRouter();
  const { causeId } = router.query;

  if (!causeId) return;

  const {
    title,
    location,
    profile,
    images,
    tags,
    createdAt,
    description,
    donation,
    goal,
    updates,
    numDonations,
    donations,
  } = causes.find((cause) => (causeId as string) == String(cause.id));

  function getFormattedDate(timestamp: number) {
    const date = new Date(timestamp);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    return `${month} ${day}`;
  }

  function getFormattedDateNum(timestamp: number) {
    return new Date(timestamp).toLocaleDateString();
  }

  const descriptions = description.split("\n");

  return (
    <VStack minH="100vh" p="3rem">
      <VStack className={styles.titleContainer}>
        <Text className={styles.title}>{title}</Text>
        <Text className={styles.location}>{location}</Text>
      </VStack>
      <HStack gap={2}>
        <Image
          alt="image 1"
          src={images[0]}
          className={styles.imageOne}
        ></Image>
        <VStack gap={2}>
          <Image
            alt="image 2"
            src={images[1]}
            className={styles.imageTwo}
          ></Image>
          <Image
            alt="image 3"
            src={images[2]}
            className={styles.imageThree}
          ></Image>
        </VStack>
      </HStack>
      <HStack className={styles.descriptionContainer}>
        <VStack>
          <HStack className={styles.tagContainer}>
            {tags.map((tag, idx) => (
              <Text key={idx} className={styles.causeTag}>
                {tag}
              </Text>
            ))}
          </HStack>
          <HStack className={styles.profileContainer}>
            <Image
              alt={`profile ${profile.name}`}
              src={profile.image}
              className={styles.profileImage}
            ></Image>
            <VStack alignItems="flex-start" pl=".5rem">
              <Text className={styles.profileTitle}>
                Initiative listed by {profile.name}
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
          <Tabs colorScheme="#000000" size="lg" className={styles.tabContainer}>
            <TabList>
              <Tab w="100%">About</Tab>
              <Tab w="100%">Updates</Tab>
              <Tab w="100%">Donations</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {descriptions.map((desc, idx) => (
                  <Text key={idx} pb="1rem">
                    {desc}
                  </Text>
                ))}
              </TabPanel>
              <TabPanel>
                <VStack>
                  {updates.map((update, idx) => (
                    <HStack key={idx} className={styles.updateContainer}>
                      <VStack className={styles.updateDate}>
                        <Text className={styles.updateDateText}>
                          {getFormattedDate(update.timestamp)}
                        </Text>
                      </VStack>
                      <VStack className={styles.updateTextContainer}>
                        <Text className={styles.updateTitle}>
                          {update.title}
                        </Text>
                        <Text className={styles.updateSubtitle}>
                          {update.description}
                        </Text>
                      </VStack>
                    </HStack>
                  ))}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack>
                  <HStack gap={2}>
                    <VStack className={styles.donationHeader}>
                      <Text className={styles.donationHeaderTitle}>
                        {donation} KLAY
                      </Text>
                      <Text className={styles.donationHeaderSubtitle}>
                        Total donation amount
                      </Text>
                    </VStack>
                    <VStack className={styles.donationHeader}>
                      <Text className={styles.donationHeaderTitle}>
                        {numDonations}
                      </Text>
                      <Text className={styles.donationHeaderSubtitle}>
                        Donations
                      </Text>
                    </VStack>
                  </HStack>
                  <TableContainer w="800px">
                    <Table variant="simple">
                      <Thead>
                        <Tr>
                          <Th>Donor</Th>
                          <Th>Amount</Th>
                          <Th isNumeric>Date</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {donations.map(({ donor, amount, timestamp }) => (
                          <Tr key={donor}>
                            <Td>
                              <HStack>
                                <Image
                                  alt="profile"
                                  src="/landing/pocky.png"
                                  className={styles.donorImage}
                                ></Image>
                                <Text>@{donor}</Text>
                              </HStack>
                            </Td>
                            <Td>{amount} KLAY</Td>
                            <Td isNumeric>{getFormattedDateNum(timestamp)}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </TableContainer>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
        <VStack className={styles.donateContainer}>
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
          <Link href={`/donate/${causeId}`}>
            <Button className={styles.donateBtn}>Donate now</Button>
          </Link>
          <Button className={styles.shareBtn}>Share cause</Button>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default Cause;
