import {
  SimpleGrid,
  VStack,
  HStack,
  Text,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import styles from "@styles/Browse.module.css";
import Link from "next/link";
import { tags } from "@data/tags";
import { useEffect, useState } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import db from "@firebase/firebase";

function Browse() {
  const [clicked, setClicked] = useState(false);
  const [causes, setCauses] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCauseinfo() {
      const query = collection(db, "causes");
      const querySnap = await getDocs(query);

      if (querySnap) {
        querySnap.forEach((doc) => {
          setCauses((prev) => [...prev, doc.data()]);
        });
      }
    }
    fetchCauseinfo();
  }, []);

  if (!causes) return null;

  return (
    <div className={styles.container}>
      <VStack>
        <VStack className={styles.causeSectionTitleContainer}>
          <Text className={styles.causeSectionTitle}>Causes</Text>
          <HStack w="100%" justifyContent="space-between">
            <HStack className={styles.causeTagContainer}>
              {tags.map(({ name, count }, idx) => {
                return (
                  <HStack key={idx} className={styles.causeTag}>
                    <Text className={styles.causeTagTitle}>{name}</Text>
                    <VStack className={styles.causeTagCountContainer}>
                      <Text className={styles.causeTagCount}>{count}</Text>
                    </VStack>
                  </HStack>
                );
              })}
            </HStack>
          </HStack>
        </VStack>
        {clicked ? (
          <SimpleGrid columns={3} gap={10} pb={5}>
            {causes.map(
              ({ images, title, last, donation, goal, owner, id }) => {
                return (
                  <Link href={`/cause/${id}`} key={id}>
                    <VStack className={styles.causeContainer} cursor="pointer">
                      <HStack className={styles.profileCell}>
                        <Image
                          alt="0xcarhartt"
                          src={owner.image}
                          className={styles.profileImage}
                        ></Image>
                        <Text className={styles.profileName}>
                          @{owner.name}
                        </Text>
                      </HStack>
                      <Image
                        alt="featured 1"
                        src={images[0]}
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
                                width: `${((donation / goal) * 100).toFixed(
                                  0
                                )}%`,
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
                          <Text
                            fontSize="16px"
                            fontWeight={500}
                            color="#5A5A5A"
                          >
                            {`${donation} KLAY raised of ${goal} KLAY`}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Link>
                );
              }
            )}
          </SimpleGrid>
        ) : (
          <SimpleGrid columns={3} gap={10} pb={5}>
            {causes
              .slice(0, 6)
              .map(({ images, title, last, donation, goal, owner, id }) => {
                return (
                  <Link href={`/cause/${id}`} key={id}>
                    <VStack className={styles.causeContainer} cursor="pointer">
                      <HStack className={styles.profileCell}>
                        <Image
                          alt="0xcarhartt"
                          src={owner.image}
                          className={styles.profileImage}
                        ></Image>
                        <Text className={styles.profileName}>
                          @{owner.name}
                        </Text>
                      </HStack>
                      <Image
                        alt="featured 1"
                        src={images[0]}
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
                                width: `${((donation / goal) * 100).toFixed(
                                  0
                                )}%`,
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
                          <Text
                            fontSize="16px"
                            fontWeight={500}
                            color="#5A5A5A"
                          >
                            {`${donation} KLAY raised of ${goal} KLAY`}
                          </Text>
                        </HStack>
                      </VStack>
                    </VStack>
                  </Link>
                );
              })}
          </SimpleGrid>
        )}
        <Button className={styles.loadMoreBtn} onClick={() => setClicked(true)}>
          Load more
        </Button>
      </VStack>
    </div>
  );
}

export default Browse;
