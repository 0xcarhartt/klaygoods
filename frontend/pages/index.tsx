import { HStack, VStack, Text, Button, Image, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import styles from "@styles/Home.module.css";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <LandingContainer />
        <FeaturedContainer />
        <HowContainer />
      </main>
    </div>
  );
};

function LandingContainer() {
  return (
    <HStack className={styles.landingContainer}>
      <HStack gap={5}>
        <Image
          alt="5"
          src="/landing/5.png"
          className={styles.landingImage}
        ></Image>
        <VStack gap={5}>
          <Image
            alt="1"
            src="/landing/1.png"
            className={styles.landingImage}
          ></Image>
          <Image
            alt="2"
            src="/landing/2.png"
            className={styles.landingImage}
          ></Image>
        </VStack>
      </HStack>
      <VStack gap={5}>
        <Text className={styles.landingTitle}>Find a cause you love</Text>
        <Text className={styles.landingSubtitle}>
          Help others in need with crypto or fundraise for your own cause
        </Text>
        <Link href="/browse">
          <Button className={styles.landingBtn}>Browse Causes</Button>
        </Link>
      </VStack>
      <HStack gap={5}>
        <VStack gap={5}>
          <Image
            alt="3"
            src="/landing/3.png"
            className={styles.landingImage}
          ></Image>
          <Image
            alt="4"
            src="/landing/4.png"
            className={styles.landingImage}
          ></Image>
        </VStack>
        <Image
          alt="6"
          src="/landing/6.png"
          className={styles.landingImage}
        ></Image>
      </HStack>
    </HStack>
  );
}

function FeaturedContainer() {
  return (
    <HStack>
      <VStack gap="2rem">
        <HStack w="100%">
          <HStack>
            <Text className={styles.featuredTitle}>Featured causes</Text>
            <Link href="/browse">
              <VStack className={styles.featuredBtn} cursor="pointer">
                <ArrowForwardIcon w={6} h={6} />
              </VStack>
            </Link>
          </HStack>
        </HStack>

        <HStack className={styles.featuredCause}>
          <Image
            alt="featured 1"
            src="/landing/featured_1.png"
            className={styles.featuredImage}
          ></Image>

          <VStack className={styles.featuredRightSection}>
            <HStack className={styles.profileCell}>
              <Image
                alt="0xpocky"
                src="/landing/pocky.png"
                className={styles.profileImage}
              ></Image>
              <Text className={styles.profileName}>@0xpocky</Text>
            </HStack>

            <Text className={styles.featuredCauseTitle}>
              Support WeatherDAO on decreasing carbon emissions
            </Text>

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
              <Image alt="money icon" src="/money.png" width="20px"></Image>
              <Text fontWeight={500} color="#5A5A5A">
                $145,000 KLAY raised of $300,000 KLAY goal
              </Text>
            </HStack>

            <Link href="/cause/0">
              <Button className={styles.donateBtn}>Donate now</Button>
            </Link>
          </VStack>
        </HStack>

        <HStack className={styles.featuredCause}>
          <Image
            alt="featured 2"
            src="/landing/featured_2.png"
            className={styles.featuredImage}
          ></Image>

          <VStack className={styles.featuredRightSection}>
            <HStack className={styles.profileCell}>
              <Image
                alt="0xcarhartt"
                src="/landing/carhartt.jpg"
                className={styles.profileImage}
              ></Image>
              <Text className={styles.profileName}>@0xcarhartt</Text>
            </HStack>

            <Text className={styles.featuredCauseTitle}>
              Legislative reform for New York’s air pollution
            </Text>

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
              <Image alt="money icon" src="/money.png" width="20px"></Image>
              <Text fontWeight={500} color="#5A5A5A">
                $145,000 KLAY raised of $300,000 KLAY goal
              </Text>
            </HStack>

            <Link href="/cause/1">
              <Button className={styles.donateBtn}>Donate now</Button>
            </Link>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}

function HowContainer() {
  return (
    <VStack className={styles.howContainer}>
      <Text className={styles.howTitle}>How does it work?</Text>
      <HStack className={styles.howCell}>
        <Image
          alt="how 1"
          src="/landing/how_1.png"
          className={styles.howImage}
        ></Image>
        <VStack className={styles.howTextContainer}>
          <Text className={styles.howCellTitle}>Fundraise</Text>
          <Text className={styles.howCellDescription}>
            Klaygoods is a platform where you can share your story and seek for
            help
          </Text>
        </VStack>
      </HStack>
      <HStack className={styles.howCell}>
        <Image
          alt="how 2"
          src="/landing/how_2.png"
          className={styles.howImage}
        ></Image>
        <VStack className={styles.howTextContainer}>
          <Text className={styles.howCellTitle}>Donate</Text>
          <Text className={styles.howCellDescription}>
            Our powerful tool will help you find the causes you care about the
            most
          </Text>
        </VStack>
      </HStack>
      <HStack className={styles.howCell}>
        <Image
          alt="how 3"
          src="/landing/how_3.png"
          className={styles.howImage}
        ></Image>
        <VStack className={styles.howTextContainer}>
          <Text className={styles.howCellTitle}>Governance</Text>
          <Text className={styles.howCellDescription}>
            KLAY token holders can select delegates to govern on their behalf,
            voting on causes they care about
          </Text>
        </VStack>
      </HStack>
    </VStack>
  );
}

export default Home;
