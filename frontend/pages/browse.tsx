import { SimpleGrid, VStack, HStack, Text, Image, Box } from "@chakra-ui/react";
import Navbar from "@components/Navbar";
import styles from "@styles/Browse.module.css";

const tags = [
  {
    name: "Disaster relief",
    count: 134,
  },
  {
    name: "Climate change",
    count: 192,
  },
  {
    name: "Economic inequality",
    count: 92,
  },
];

const profiles = [
  {
    image: "/landing/pocky.png",
    name: "0xpocky",
  },
  {
    image: "/landing/carhartt.jpg",
    name: "0xcarhartt",
  },
  {
    image: "/landing/pocky.png",
    name: "ethereumfoundation",
  },
  {
    image: "/landing/pocky.png",
    name: "tosie",
  },
  {
    image: "/landing/pocky.png",
    name: "water.org",
  },
  {
    image: "/landing/pocky.png",
    name: "doodleapee124",
  },
];

const causes = [
  {
    image: "/landing/featured_1.png",
    title: "Support WeatherDAO on decreasing carbon emissions",
    last: 11,
    donation: 145000,
    goal: 300000,
    profile: {
      image: "/landing/pocky.png",
      name: "0xpocky",
    },
  },
  {
    image: "/landing/featured_1.png",
    title: "Legislative reform for New York’s air pollution",
    last: 4,
    donation: 7000,
    goal: 120000,
    profile: {
      image: "/landing/carhartt.jpg",
      name: "0xcarhartt",
    },
  },
  {
    image: "/landing/featured_1.png",
    title: "Build better documentation for Ethereum foundation",
    last: 1,
    donation: 6000,
    goal: 100000,
    profile: {
      image: "/landing/pocky.png",
      name: "ethereumfoundation",
    },
  },
  {
    image: "/landing/featured_1.png",
    title: "Free Solidity development courses in Southeast Asia",
    last: 4,
    donation: 12000,
    goal: 50000,
    profile: {
      image: "/landing/pocky.png",
      name: "tosie",
    },
  },
  {
    image: "/landing/featured_1.png",
    title: "Support building water filters in Costa Rica",
    last: 1,
    donation: 6000,
    goal: 10000,
    profile: {
      image: "/landing/pocky.png",
      name: "water.org",
    },
  },
  {
    image: "/landing/featured_1.png",
    title: "Push for economic and gender equality laws",
    last: 4,
    donation: 30000,
    goal: 50000,
    profile: {
      image: "/landing/pocky.png",
      name: "doodleapee124",
    },
  },
];

function Browse() {
  return (
    <div className={styles.container}>
      <VStack>
        <VStack className={styles.causeSectionTitleContainer}>
          <Text className={styles.causeSectionTitle}>Causes</Text>
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
        </VStack>
        <SimpleGrid columns={3} gap={10}>
          {causes.map(
            ({ image, title, last, donation, goal, profile }, idx) => (
              <VStack key={idx} className={styles.causeContainer}>
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
            )
          )}
        </SimpleGrid>
      </VStack>
    </div>
  );
}

export default Browse;
