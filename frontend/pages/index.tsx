import { HStack, VStack, Text, Button, Image, Box } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "@components/Navbar";
import styles from "@styles/Home.module.css";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main className={styles.main}>
        <LandingContainer />
        <FeaturedCauses />
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
        <Button className={styles.landingBtn}>Browse Causes</Button>
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

function FeaturedCauses() {
  return (
    <HStack>
      <VStack gap="2rem">
        <HStack w="100%">
          <HStack>
            <Text className={styles.featuredTitle}>Featured causes</Text>
            <VStack className={styles.featuredBtn}>
              <ArrowForwardIcon w={6} h={6} />
            </VStack>
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
              <Image
                alt="money icon"
                src="/landing/money.png"
                width="20px"
              ></Image>
              <Text fontWeight={500} color="#5A5A5A">
                $145,000 KLAY raised of $300,000 KLAY goal
              </Text>
            </HStack>

            <Button className={styles.donateBtn}>Donate now</Button>
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
              <Image
                alt="money icon"
                src="/landing/money.png"
                width="20px"
              ></Image>
              <Text fontWeight={500} color="#5A5A5A">
                $145,000 KLAY raised of $300,000 KLAY goal
              </Text>
            </HStack>

            <Button className={styles.donateBtn}>Donate now</Button>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}

export default Home;
