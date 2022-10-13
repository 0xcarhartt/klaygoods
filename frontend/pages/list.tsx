import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  VStack,
  Text,
  Progress,
  HStack,
  Image,
  Input,
  Checkbox,
  Button,
  Box,
  Divider,
  Highlight,
  Textarea,
} from "@chakra-ui/react";
import { categories } from "@data/categories";
import { countries } from "@data/countries";
import styles from "@styles/List.module.css";
import { useState } from "react";

function List() {
  const [amount, setAmount] = useState<number>();
  const [isTxnSuccessful, setTxnSuccessful] = useState<boolean>(true);

  function handleAmountChange(e: any) {
    setAmount(e.target.value);
  }

  return (
    <VStack minH="100vh" p="2rem 4rem">
      <Text className={styles.title}>List a new cause</Text>

      <VStack className={styles.progressContainer}>
        <Box className={`${styles.progressBarContainer}`}>
          <Box
            style={{
              backgroundColor: "black",
              width: `${(0.5 * 100).toFixed(0)}%`,
            }}
            className={`${styles.progressBar}`}
          ></Box>
          <HStack className={styles.progressBarDividers}>
            <Box className={styles.progressBarDivider}></Box>
            <Box className={styles.progressBarDivider}></Box>
            <Box className={styles.progressBarDivider}></Box>
          </HStack>
        </Box>
      </VStack>

      {/* <StepOne handleAmountChange={handleAmountChange} amount={amount} /> */}
      {/* <StepTwo handleAmountChange={handleAmountChange} amount={amount} /> */}
      <StepThree />
    </VStack>
  );
}

type StepOneProps = {
  handleAmountChange: (e: any) => void;
  amount: number;
};

function StepOne({ handleAmountChange, amount }: StepOneProps) {
  return (
    <VStack>
      <VStack pb="2rem">
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
          <Text className={styles.inputHeader}>
            Enter your fundraising goal
          </Text>
          <Input
            type="number"
            onChange={handleAmountChange}
            className={styles.input}
          ></Input>
          <Text className={styles.inputUnit}>KLAY</Text>
        </VStack>
      </VStack>
      <Button disabled={!amount} className={styles.donateBtn}>
        Next
      </Button>
    </VStack>
  );
}

function StepThree() {
  return (
    <VStack>
      <VStack pb="2rem">
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Description</Text>
          <Textarea onChange={() => {}} className={styles.textarea}></Textarea>
          <Text className={styles.inputDescription}>
            This text will show up in the “About” section of your cause detail
            page.
          </Text>
        </VStack>
      </VStack>
      <Button disabled={false} className={styles.donateBtn}>
        Next
      </Button>
    </VStack>
  );
}

type StepTwoProps = {
  handleAmountChange: (e: any) => void;
  amount: number;
};

function StepTwo({ handleAmountChange, amount }: StepTwoProps) {
  const [isCategoriesVisible, setCategoriesVisible] = useState<boolean>();
  const [isCountriesVisible, setCountriesVisible] = useState<boolean>();
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedCountry, setSelectedCountry] = useState("");
  const [title, setTitle] = useState("");

  function handleSelectCategories(category: string) {
    const copiedCategories = { ...selectedCategories };
    if (selectedCategories[category]) {
      delete copiedCategories[category];
    } else {
      copiedCategories[category] = true;
    }
    setSelectedCategories(copiedCategories);
  }

  function handleCountryChange(country) {
    setSelectedCountry(country);
    setCountriesVisible(false);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  const isValidForm = title && Object.keys(selectedCategories).length > 0;

  return (
    <VStack>
      <VStack pb="2rem">
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Campaign title</Text>
          <Input onChange={handleTitleChange} className={styles.input}></Input>
        </VStack>
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Choose categories</Text>
          <HStack
            className={styles.selectBox}
            onClick={() => setCategoriesVisible(!isCategoriesVisible)}
          >
            {Object.keys(selectedCategories).length === 0 ? (
              <Text fontWeight={500}>Select categories</Text>
            ) : (
              <HStack className={styles.selectedContainer}>
                {Object.keys(selectedCategories).map((category) => (
                  <Highlight
                    key={category}
                    query={category}
                    styles={{
                      px: "1",
                      py: "1",
                      borderRadius: "5",
                      bg: "rgba(0,0,0,0.1)",
                      userSelect: "none",
                    }}
                  >
                    {category}
                  </Highlight>
                ))}
              </HStack>
            )}
            <ChevronDownIcon className={styles.chevronIcon} />
          </HStack>
          {isCategoriesVisible && (
            <VStack className={styles.selectionContainer}>
              {categories.map((category, idx) => (
                <VStack key={idx}>
                  <HStack className={styles.selectionBox}>
                    <Checkbox
                      colorScheme="white"
                      size="lg"
                      pr="1rem"
                      defaultChecked={selectedCategories[category]}
                      onChange={() => handleSelectCategories(category)}
                    />
                    <Text className={styles.checkboxTitle}>{category}</Text>
                  </HStack>
                  <Divider></Divider>
                </VStack>
              ))}
            </VStack>
          )}
        </VStack>
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>
            Where are you based? (optional)
          </Text>
          <HStack
            className={styles.selectBox}
            onClick={() => setCountriesVisible(!isCountriesVisible)}
          >
            {selectedCountry ? (
              <Text fontWeight={500}>{selectedCountry}</Text>
            ) : (
              <Text fontWeight={500}>Select country</Text>
            )}
            <ChevronDownIcon className={styles.chevronIcon} />
          </HStack>
          {isCountriesVisible && (
            <VStack className={styles.selectionContainer}>
              {countries.map((country, idx) => (
                <VStack key={idx} onClick={() => handleCountryChange(country)}>
                  <HStack className={styles.countriesBox}>
                    <Text className={styles.checkboxTitle}>{country}</Text>
                  </HStack>
                  <Divider></Divider>
                </VStack>
              ))}
            </VStack>
          )}
        </VStack>
      </VStack>
      <Button disabled={!isValidForm} className={styles.donateBtn}>
        Next
      </Button>
    </VStack>
  );
}

export default List;
