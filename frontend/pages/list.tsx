import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
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
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { categories } from "@data/categories";
import { countries } from "@data/countries";
import { myTags, tags } from "@data/tags";
import styles from "@styles/List.module.css";
import { numberWithCommas } from "@utils/utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { ScaleFade } from "@chakra-ui/react";

function List() {
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [isTxnSuccessful, setTxnSuccessful] = useState<boolean>(false);

  const [currentStep, setCurrentStep] = useState(0);

  const router = useRouter();

  function handleAddressChange(e: any) {
    setAddress(e.target.value);
  }

  function handleAmountChange(e: any) {
    setAmount(e.target.value);
  }

  if (isTxnSuccessful)
    return (
      <VStack minH="100vh" pt="2rem" className={styles.successContainer}>
        <Text className={styles.title}>Congrats, your cause is listed!</Text>
        <ScaleFade initialScale={0.5} in={isTxnSuccessful}>
          <Image
            alt="success image"
            src="/success.png"
            className={styles.successImage}
          />
        </ScaleFade>
        <Text className={styles.successText}>
          <Text as="span" className={styles.successTextHeavy}>
            Saving polar bears in Antarctica
          </Text>{" "}
          has been successfully listed on Klaygoods. You can edit the cause
          anytime.
        </Text>
        <VStack className={styles.buttonContainer}>
          <Link href="/cause/7">
            <Button className={styles.viewCauseBtn}>View cause</Button>
          </Link>
          <Link href="/profile">
            <Button className={styles.viewTxnBtn}>Edit cause</Button>
          </Link>
        </VStack>
      </VStack>
    );

  if (currentStep === 4)
    return <ReviewCause setTxnSuccessful={setTxnSuccessful} />;

  function getComponent() {
    switch (currentStep) {
      case 0:
        return (
          <StepOne
            handleAddressChange={handleAddressChange}
            handleAmountChange={handleAmountChange}
            address={address}
            amount={amount}
            setCurrentStep={setCurrentStep}
          />
        );

      case 1:
        return (
          <StepTwo
            handleAmountChange={handleAmountChange}
            amount={amount}
            setCurrentStep={setCurrentStep}
          />
        );
      case 2:
        return <StepThree setCurrentStep={setCurrentStep} />;
      case 3:
        return <StepFour setCurrentStep={setCurrentStep} />;
    }
  }

  return (
    <VStack minH="100vh" p="2rem 4rem">
      <Text className={styles.title}>List a new cause</Text>

      <VStack className={styles.progressContainer}>
        <Box className={`${styles.progressBarContainer}`}>
          <Box
            style={{
              backgroundColor: "black",
              width: `${(((currentStep + 1) / 4) * 100).toFixed(0)}%`,
            }}
            className={`${styles.progressBar}`}
          ></Box>
          <HStack className={styles.progressBarDividers}>
            <Box pl="6px">
              <Box className={styles.progressBarDivider}></Box>
            </Box>
            <Box className={styles.progressBarDivider}></Box>
            <Box pr="7px">
              <Box className={styles.progressBarDivider}></Box>
            </Box>
          </HStack>
        </Box>
      </VStack>
      {getComponent()}
    </VStack>
  );
}

type StepOneProps = {
  handleAddressChange: (e: any) => void;
  handleAmountChange: (e: any) => void;
  amount: number;
  address: string;
  setCurrentStep: (step: any) => void;
};

function StepOne({
  handleAddressChange,
  handleAmountChange,
  amount,
  address,
  setCurrentStep,
}: StepOneProps) {
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
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Recipient Address</Text>
          <Input
            onChange={handleAddressChange}
            className={styles.input}
          ></Input>
        </VStack>
      </VStack>
      <Button
        disabled={!amount || !address}
        className={styles.donateBtn}
        onClick={() => setCurrentStep((prev) => prev + 1)}
      >
        Next
      </Button>
    </VStack>
  );
}

type StepTwoProps = {
  handleAmountChange: (e: any) => void;
  amount: number;
  setCurrentStep: (step: any) => void;
};

function StepTwo({ handleAmountChange, amount, setCurrentStep }: StepTwoProps) {
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
      <Button
        disabled={!isValidForm}
        className={styles.donateBtn}
        onClick={() => setCurrentStep((prev) => prev + 1)}
      >
        Next
      </Button>
    </VStack>
  );
}

type StepThreeProps = {
  setCurrentStep: (step: any) => void;
};

function StepThree({ setCurrentStep }: StepThreeProps) {
  const [text, setText] = useState();

  function handleTextChange(e) {
    setText(e.target.value);
  }

  return (
    <VStack>
      <VStack pb="2rem">
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Description</Text>
          <Textarea
            onChange={handleTextChange}
            className={styles.textarea}
          ></Textarea>
          <Text className={styles.inputDescription}>
            This text will show up in the “About” section of your cause detail
            page.
          </Text>
        </VStack>
      </VStack>
      <Button
        className={styles.donateBtn}
        disabled={!text}
        onClick={() => setCurrentStep((prev) => prev + 1)}
      >
        Next
      </Button>
    </VStack>
  );
}

type StepFourProps = {
  setCurrentStep: (step: any) => void;
};

function StepFour({ setCurrentStep }: StepFourProps) {
  const [files, setFiles] = useState<string[]>([]);

  function handleFileUpload(e) {
    setFiles((prev) => [...prev, URL.createObjectURL(e.target.files[0])]);
  }

  return (
    <VStack>
      <VStack pb="2rem">
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Add images (optional)</Text>
          <VStack className={styles.fileUploadContainer}>
            <input
              type="file"
              name="images"
              id="images"
              required
              multiple
              onChange={handleFileUpload}
              className={styles.fileUploader}
            />
            <HStack className={styles.fileUploaderText}>
              <Text>Browse from computer</Text>
              <Image
                alt="upload"
                src="/upload.png"
                className={styles.fileUploaderIcon}
              ></Image>
            </HStack>
          </VStack>
          <Text className={styles.inputDescription}>
            Select up to 3 images to showcase your cause.
          </Text>
          <SimpleGrid columns={3} gap={3}>
            {files.map((file) => (
              <VStack key={file} className={styles.previewImageContainer}>
                <VStack className={styles.closeBtn}>
                  <CloseIcon w={3} h={3} />
                </VStack>
                <Image
                  alt="uploaded file"
                  src={file ?? ""}
                  className={styles.previewImage}
                />
              </VStack>
            ))}
          </SimpleGrid>
        </VStack>
      </VStack>
      <Button
        disabled={false}
        className={styles.donateBtn}
        onClick={() => setCurrentStep((prev) => prev + 1)}
      >
        Next
      </Button>
    </VStack>
  );
}

type ReviewCauseProps = {
  setTxnSuccessful: (bool: boolean) => void;
};

function ReviewCause({ setTxnSuccessful }: ReviewCauseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  function handleListCause() {
    setIsLoading(true);
    setTimeout(() => {
      scrollToTop();
      setTxnSuccessful(true);
      setIsLoading(false);
    }, 3000);
  }

  return (
    <VStack minH="100vh" p="2rem 4rem 3rem 4rem">
      <VStack>
        <Text className={styles.title}>Review your cause</Text>
        <Text className={styles.reviewSubtitle}>
          You can make changes to your campaign at any time. The platform is
          free for organizers, but we take 1% fee of every donation to support
          the KlayGoods DAO treasury.
        </Text>
        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Your cause</Text>
          <Text className={styles.editBtn}>Edit</Text>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Default Network</Text>
          <HStack>
            <Image
              alt="klaytn logo"
              src="/klaytn.png"
              className={styles.klaytnLogo}
            ></Image>
            <Text fontWeight={500}>Klaytn</Text>
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Currency</Text>
          <HStack>
            <Image
              alt="klaytn logo"
              src="/klaytn.png"
              className={styles.klaytnLogo}
            ></Image>
            <Text fontWeight={500}>KLAY</Text>
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Fundraising goal</Text>
          <Text fontWeight={500}>{numberWithCommas(25000)} KLAY</Text>
          <Divider />
        </VStack>

        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Campaign Info</Text>
          <Text className={styles.editBtn}>Edit</Text>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Campaign title</Text>
          <HStack>
            <Text fontWeight={500}>Saving the polar bears in Antarctica</Text>
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Choose categories</Text>
          <HStack className={styles.tagContainer}>
            {myTags.map((tag, idx) => (
              <Text key={idx} className={styles.causeTag}>
                {tag.name}
              </Text>
            ))}
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Location</Text>
          <Text fontWeight={500}>Brazil</Text>
          <Divider />
        </VStack>

        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Description</Text>
          <Text className={styles.editBtn}>Edit</Text>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>About</Text>
          <VStack>
            <Text fontWeight={500} w="600px" pb={"1rem"}>
              In a world where our actions have led to the melting of the polar
              ice caps, its more important than ever to do our part to save the
              polar bears. They are one of the most iconic and beloved animals
              on the planet, and they deserve our help.
            </Text>
            <Text fontWeight={500} w="600px">
              This fundraising event will help support the efforts to save polar
              bears in Antarctica. All of the proceeds will go towards
              organizations that are working tirelessly to preserve these
              beautiful creatures. We hope that youll join us in supporting this
              cause.
            </Text>
          </VStack>
          <Divider />
        </VStack>

        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Cover image</Text>
          <Text className={styles.editBtn}>Edit</Text>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>3 images uploaded</Text>
          <SimpleGrid columns={3} gap={3}>
            {["/polar1.png", "/polar2.jpg", "/polar3.jpg"].map((file) => (
              <VStack key={file} className={styles.previewImageContainer}>
                <VStack className={styles.closeBtn}>
                  <CloseIcon w={3} h={3} />
                </VStack>
                <Image
                  alt="uploaded file"
                  src={file ?? ""}
                  className={styles.previewImage}
                />
              </VStack>
            ))}
          </SimpleGrid>
          <Divider />
        </VStack>

        <Button
          disabled={false}
          className={styles.donateBtn}
          onClick={handleListCause}
        >
          {isLoading ? <Spinner color="black" /> : "List cause"}
        </Button>
      </VStack>
    </VStack>
  );
}

export default List;
