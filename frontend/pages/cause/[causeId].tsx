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
import { numberWithCommas } from "@utils/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useKlaytn } from "@components/KlaytnProvider";

function Cause() {
  const { address } = useKlaytn();
  const router = useRouter();
  const { causeId } = router.query;

  if (!causeId) return;

  if (Number(causeId as string) === 7) return <SampleCause />;

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

  function triggerToast() {
    toast(
      <Text className={styles.toastText}>
        Please connect your wallet in order to donate! 🧡
      </Text>,
      {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
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
                        {numberWithCommas(donation)} KLAY
                      </Text>
                      <Text className={styles.donationHeaderSubtitle}>
                        Total donation amount
                      </Text>
                    </VStack>
                    <VStack className={styles.donationHeader}>
                      <Text className={styles.donationHeaderTitle}>
                        {numberWithCommas(numDonations)}
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
                        {donations.map(
                          ({ image, donor, amount, timestamp }) => (
                            <Tr key={donor}>
                              <Td>
                                <HStack>
                                  <Image
                                    alt="profile"
                                    src={image}
                                    className={styles.donorImage}
                                  ></Image>
                                  <Text>@{donor}</Text>
                                </HStack>
                              </Td>
                              <Td>{numberWithCommas(amount)} KLAY</Td>
                              <Td isNumeric>
                                {getFormattedDateNum(timestamp)}
                              </Td>
                            </Tr>
                          )
                        )}
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
          {address ? (
            <Link href={`/donate/${causeId}`}>
              <Button className={styles.donateBtn}>Donate now</Button>
            </Link>
          ) : (
            <Button className={styles.donateBtn} onClick={triggerToast}>
              Donate now
            </Button>
          )}
          <Button className={styles.shareBtn}>Share cause</Button>
        </VStack>
      </HStack>
      <ToastContainer />
    </VStack>
  );
}

function SampleCause() {
  const descriptions =
    "In a world where our actions have led to the melting of the polar ice caps, it's more important than ever to do our part to save the polar bears. They are one of the most iconic and beloved animals on the planet, and they deserve our help.\nThis fundraising event will help support the efforts to save polar bears in Antarctica. All of the proceeds will go towards organizations that are working tirelessly to preserve these beautiful creatures. We hope that you'll join us in supporting this cause.".split(
      "\n"
    );

  return (
    <VStack minH="100vh" p="3rem">
      <VStack className={styles.titleContainer}>
        <Text className={styles.title}>Saving polar bears in Antarctica</Text>
        <Text className={styles.location}>Australia</Text>
      </VStack>
      <HStack gap={2}>
        <Image
          alt="image 1"
          src="/polar2.jpg"
          className={styles.imageOne}
        ></Image>
        <VStack gap={2}>
          <Image
            alt="image 2"
            src="/polar1.png"
            className={styles.imageTwo}
          ></Image>
          <Image
            alt="image 3"
            src="/polar3.jpg"
            className={styles.imageThree}
          ></Image>
        </VStack>
      </HStack>
      <HStack className={styles.descriptionContainer}>
        <VStack>
          <HStack className={styles.tagContainer}>
            <Text className={styles.causeTag}>Climate Change</Text>
          </HStack>
          <HStack className={styles.profileContainer}>
            <Image
              alt={`profile`}
              src="/mochi.png"
              className={styles.profileImage}
            ></Image>
            <VStack alignItems="flex-start" pl=".5rem">
              <Text className={styles.profileTitle}>
                Initiative listed by @mochi321
              </Text>
              <HStack>
                <Image
                  alt="clock"
                  src="/clock.png"
                  className={styles.clockIcon}
                ></Image>
                <Text className={styles.profileSubtitle}>
                  Created 0 mins ago
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
              <TabPanel></TabPanel>
              <TabPanel></TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
        <VStack className={styles.donateContainer}>
          <HStack>
            <Text className={styles.donationText}>0 KLAY</Text>
            <Text className={styles.goalText}>raised of 25,000 goal</Text>
          </HStack>
          <Box className={`${styles.progressBarContainer}`}>
            <Box
              style={{
                backgroundColor: "black",
                width: `${(1).toFixed(0)}%`,
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
            <Text className={styles.donationTime}>Listed 0 mins ago</Text>
          </HStack>
          <Link href={"/"}>
            <Button className={styles.donateBtn}>Donate now</Button>
          </Link>
          <Button className={styles.shareBtn}>Share cause</Button>
        </VStack>
      </HStack>
      <ToastContainer />
    </VStack>
  );
}

export default Cause;
