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
import { causes } from "@data/causes";
import { tags } from "@data/tags";

function Browse() {
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
        <SimpleGrid columns={3} gap={10} pb={5}>
          {causes.map(({ image, title, last, donation, goal, profile, id }) => (
            <Link href={`/cause/${id}`} key={id}>
              <VStack className={styles.causeContainer} cursor="pointer">
                <HStack className={styles.profileCell}>
                  <Image
                    alt="0xcarhartt"
                    src={profile.image}
                    className={styles.profileImage}
                  ></Image>
                  <Text className={styles.profileName}>@{profile.name}</Text>
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
                      {`${donation} KLAY raised of ${goal} KLAY`}
                    </Text>
                  </HStack>
                </VStack>
              </VStack>
            </Link>
          ))}
        </SimpleGrid>
        <Button className={styles.loadMoreBtn}>Load more</Button>
      </VStack>
    </div>
  );
}

export default Browse;
