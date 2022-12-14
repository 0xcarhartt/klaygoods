import {
  HStack,
  VStack,
  Image,
  Text,
  Box,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useKlaytn } from "@components/KlaytnProvider";
import { abridgeAddress } from "@components/Navbar";
import { myCauses, supportedCauses } from "@data/causes";
import { tags } from "@data/tags";
import styles from "@styles/Profile.module.css";
import { numberWithCommas } from "@utils/utils";
import Link from "next/link";

function Profile() {
  const donation = 1492.38;
  const numDonations = 129;
  const { provider, address } = useKlaytn();

  return (
    <VStack minH="100vh" p="2rem 4rem">
      {!address ? (
        <VStack pt="200px">
          <Text className={styles.bioTitle}>
            Please connect wallet to view profile.
          </Text>
        </VStack>
      ) : (
        <VStack>
          <HStack className={styles.profileBioSection}>
            <VStack className={styles.profileContainer}>
              <Image alt="profile" src="/mochi.png"></Image>
              <Text className={styles.profileUsername}>
                {abridgeAddress(address)}
              </Text>
              {/* <Text className={styles.profileLocation}>New York, NY</Text> */}
              <Divider />
              <VStack className={styles.subtitleContainer}>
                <HStack>
                  <Image alt="badge" src="/badge.png" w="20px" />
                  <Text className={styles.profileSubtitle}>Newbie Giver</Text>
                </HStack>
                <HStack>
                  <Image alt="user" src="/user.png" w="20px" />
                  <Text className={styles.profileSubtitle}>
                    Joined in October 2022
                  </Text>
                </HStack>
              </VStack>
            </VStack>
            <VStack className={styles.bioContainer}>
              <HStack className={styles.titleContainer}>
                <Text className={styles.bioTitle}>
                  User {abridgeAddress(address)}
                </Text>
              </HStack>
              <Text className={styles.bioHeader}>About</Text>
              <Text className={styles.bioText}></Text>
              <Text className={styles.bioHeader}>
                Areas I am passionate about:
              </Text>
              <HStack className={styles.tagContainer}>
                {tags.map((tag, idx) => (
                  <Text key={idx} className={styles.causeTag}>
                    {tag.name}
                  </Text>
                ))}
              </HStack>
              <HStack w="100%" gap={2}>
                <VStack className={styles.donationHeader}>
                  <Text className={styles.donationHeaderTitle}>0 KLAY</Text>
                  <Text className={styles.donationHeaderSubtitle}>
                    Total donation amount
                  </Text>
                </VStack>

                <VStack className={styles.donationHeader}>
                  <Text className={styles.donationHeaderTitle}>0</Text>
                  <Text className={styles.donationHeaderSubtitle}>
                    Donations
                  </Text>
                </VStack>
              </HStack>
            </VStack>
          </HStack>

          <VStack>
            <HStack className={styles.sectionTitleContainer}>
              <HStack className={styles.sectionTitleRightContainer}>
                <Text className={styles.sectionTitle}>
                  {"Causes I've listed"}
                </Text>
                <VStack className={styles.sectionCount}>
                  <Text className={styles.sectionCountText}>0</Text>
                </VStack>
              </HStack>
              <Link href={`/list`}>
                <Button className={styles.editBtn}>List cause</Button>
              </Link>
            </HStack>
            <HStack className={styles.causeCarousel}>
              {/* {myCauses.map(
              ({ image, title, last, donation, goal, profile, id }) => (
                <Link href={`/cause/${id}`} key={id}>
                  <VStack className={styles.causeContainer} cursor="pointer">
                    <Image
                      alt="featured 1"
                      src={image}
                      className={styles.causeImage}
                    ></Image>
                    <VStack className={styles.causeTextContainer}>
                      <Text className={styles.causeTitle}>{title}</Text>
                      <Text
                        className={styles.causeSubtitle}
                      >{`Last donation ${last} mins ago`}</Text>
                      <HStack className={styles.scoreContainer}>
                        <Box className={`${styles.progressBarContainer}`}>
                          <Box
                            style={{
                              backgroundColor: "black",
                              width: `${(0.5 * 100).toFixed(0)}%`,
                            }}
                            className={`${styles.progressBar}`}
                          ></Box>
                        </Box>
                      </HStack>
                      <HStack>
                        <Image
                          alt="money icon"
                          src="/money.png"
                          width="20px"
                        ></Image>
                        <Text fontSize="16px" fontWeight={500} color="#5A5A5A">
                          {`${numberWithCommas(
                            donation
                          )} KLAY raised of ${numberWithCommas(goal)} KLAY`}
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </Link>
              )
            )} */}
            </HStack>
          </VStack>

          <VStack pt="1rem">
            <HStack className={styles.sectionTitleContainer}>
              <HStack className={styles.sectionTitleRightContainer}>
                <Text className={styles.sectionTitle}>
                  {"Causes I've supported"}
                </Text>
                <VStack className={styles.sectionCount}>
                  <Text className={styles.sectionCountText}>0</Text>
                </VStack>
              </HStack>
            </HStack>

            <HStack className={styles.causeCarousel}>
              {/* {supportedCauses.map(
              ({ image, title, last, donation, goal, profile, id }) => (
                <Link href={`/cause/${id}`} key={id}>
                  <VStack className={styles.causeContainer} cursor="pointer">
                    <HStack className={styles.profileCell}>
                      <Image
                        alt="0xcarhartt"
                        src={profile.image}
                        className={styles.profileImage}
                      ></Image>
                      <Text className={styles.profileName}>
                        @{profile.name}
                      </Text>
                    </HStack>
                    <Image
                      alt="featured 1"
                      src={image}
                      className={styles.causeImage}
                    ></Image>
                    <VStack className={styles.causeTextContainer}>
                      <Text className={styles.causeTitle}>{title}</Text>
                      <Text
                        className={styles.causeSubtitle}
                      >{`Last donation ${last} mins ago`}</Text>
                      <HStack className={styles.scoreContainer}>
                        <Box className={`${styles.progressBarContainer}`}>
                          <Box
                            style={{
                              backgroundColor: "black",
                              width: `${(0.5 * 100).toFixed(0)}%`,
                            }}
                            className={`${styles.progressBar}`}
                          ></Box>
                        </Box>
                      </HStack>
                      <HStack>
                        <Image
                          alt="money icon"
                          src="/money.png"
                          width="20px"
                        ></Image>
                        <Text fontSize="16px" fontWeight={500} color="#5A5A5A">
                          {`${numberWithCommas(
                            donation
                          )} KLAY raised of ${numberWithCommas(goal)} KLAY`}
                        </Text>
                      </HStack>
                    </VStack>
                  </VStack>
                </Link>
              )
            )} */}
            </HStack>
          </VStack>
        </VStack>
      )}
    </VStack>
  );
}
export default Profile;
