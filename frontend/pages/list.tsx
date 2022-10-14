import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import {
  VStack,
  Text,
  HStack,
  Image,
  Input,
  Checkbox,
  Button,
  Divider,
  Highlight,
  Textarea,
  SimpleGrid,
  Spinner,
} from "@chakra-ui/react";
import { categoryOptions } from "@data/categories";
import { countries } from "@data/countries";
import styles from "@styles/List.module.css";
import { numberWithCommas } from "@utils/utils";
import { useCallback, useState } from "react";
import ProgressBar from "@components/ProgressBar";
import Success from "@components/Success";
import { doc, setDoc } from "firebase/firestore";
import db from "@firebase/firebase";
import { Web3Storage } from "web3.storage";
import { abridgeAddress } from "@components/Navbar";

const WEB3_STORAGE_TOKEN = process.env.NEXT_PUBLIC_WEB3_STORAGE_API_KEY;

const client = new Web3Storage({
  token: WEB3_STORAGE_TOKEN,
  endpoint: new URL("https://api.web3.storage"),
});

function List() {
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [title, setTitle] = useState("");
  const [goal, setGoal] = useState<number>(0);
  const [description, setDescription] = useState();
  const [files, setFiles] = useState<Blob[]>([]);
  const [CIDs, setCIDs] = useState<string[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<any>({});
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const [isTxnSuccessful, setTxnSuccessful] = useState<string>("");

  const [currentStep, setCurrentStep] = useState(0);

  function handleAddressChange(e: any) {
    setAddress(e.target.value);
  }

  function handleGoalChange(e: any) {
    setGoal(e.target.value);
  }

  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleFileUpload(e) {
    setFiles((prev) => [...prev, e.target.files[0]]);
  }

  async function uploadFiles() {
    if (files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const blob = new Blob([files[i]], { type: "image/png" });
      const imageToUpload = [new File([blob], "file.png")];
      const imageCID = await client.put(imageToUpload);
      const imageLink = `https://${imageCID}.ipfs.w3s.link/file.png`;
      setCIDs((prev) => [...prev, imageLink]);
    }

    return true;
  }

  const saveCause = useCallback(
    async (id: string) => {
      console.log("cids: ", CIDs);
      const docRef = doc(db, "causes", id);
      await setDoc(docRef, {
        id: id,
        recipient: address,
        owner: { name: abridgeAddress(address), image: "/newuser.png" },
        goal: goal,
        title: title,
        description: description,
        categories: selectedCategories,
        county: selectedCountry,
        createdAt: new Date(),
        images: CIDs,
        updates: [],
        donation: 0,
        numDonations: 0,
        donations: [],
      });
    },
    [
      CIDs,
      address,
      description,
      goal,
      selectedCategories,
      selectedCountry,
      title,
    ]
  );

  if (isTxnSuccessful)
    return (
      <Success
        id={isTxnSuccessful}
        inTrigger={!!isTxnSuccessful}
        title={title}
      />
    );

  function getComponent() {
    switch (currentStep) {
      case 0:
        return (
          <StepOne
            handleAddressChange={handleAddressChange}
            handleGoalChange={handleGoalChange}
            address={address}
            goal={goal}
            setCurrentStep={setCurrentStep}
          />
        );

      case 1:
        return (
          <StepTwo
            handleTitleChange={handleTitleChange}
            setSelectedCategories={setSelectedCategories}
            setSelectedCountry={setSelectedCountry}
            selectedCategories={selectedCategories}
            selectedCountry={selectedCountry}
            amount={amount}
            title={title}
            setCurrentStep={setCurrentStep}
          />
        );
      case 2:
        return (
          <StepThree
            setCurrentStep={setCurrentStep}
            description={description}
            handleDescriptionChange={handleDescriptionChange}
          />
        );
      case 3:
        return (
          <StepFour
            setCurrentStep={setCurrentStep}
            files={files}
            handleFileUpload={handleFileUpload}
            uploadFiles={uploadFiles}
          />
        );
      case 4:
        return (
          <ReviewCause
            setTxnSuccessful={setTxnSuccessful}
            categories={Object.keys(selectedCategories)}
            country={selectedCountry}
            address={address}
            title={title}
            goal={goal}
            description={description}
            files={files}
            saveCause={saveCause}
          />
        );
    }
  }

  return (
    <VStack minH="100vh" p="2rem 4rem">
      <Text className={styles.title}>List a new cause</Text>
      <ProgressBar currentStep={currentStep} totalSteps={4} />
      {getComponent()}
    </VStack>
  );
}

type StepOneProps = {
  handleAddressChange: (e: any) => void;
  handleGoalChange: (e: any) => void;
  goal: number;
  address: string;
  setCurrentStep: (step: any) => void;
};

function StepOne({
  handleAddressChange,
  handleGoalChange,
  goal,
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
            onChange={handleGoalChange}
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
        disabled={!goal || !address}
        className={styles.donateBtn}
        onClick={() => setCurrentStep((prev) => prev + 1)}
      >
        Next
      </Button>
    </VStack>
  );
}

type StepTwoProps = {
  handleTitleChange: (e: any) => void;
  amount: number;
  title: string;
  setCurrentStep: (step: any) => void;
  setSelectedCategories: (e: any) => void;
  setSelectedCountry: (s: string) => void;
  selectedCategories: any;
  selectedCountry: any;
};

function StepTwo({
  handleTitleChange,
  title,
  setCurrentStep,
  setSelectedCategories,
  setSelectedCountry,
  selectedCategories,
  selectedCountry,
}: StepTwoProps) {
  const [isCategoriesVisible, setCategoriesVisible] = useState<boolean>();
  const [isCountriesVisible, setCountriesVisible] = useState<boolean>();

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
              {categoryOptions.map((category, idx) => (
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
  handleDescriptionChange: (e: any) => void;
  description: string;
};

function StepThree({
  setCurrentStep,
  handleDescriptionChange,
  description,
}: StepThreeProps) {
  return (
    <VStack>
      <VStack pb="2rem">
        <VStack className={styles.inputContainer}>
          <Text className={styles.inputHeader}>Description</Text>
          <Textarea
            onChange={handleDescriptionChange}
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
        disabled={!description}
        onClick={() => setCurrentStep((prev) => prev + 1)}
      >
        Next
      </Button>
    </VStack>
  );
}

type StepFourProps = {
  setCurrentStep: (step: any) => void;
  files: Blob[];
  handleFileUpload: (e: any) => void;
  uploadFiles: () => void;
};

function StepFour({
  setCurrentStep,
  files,
  handleFileUpload,
  uploadFiles,
}: StepFourProps) {
  function handleStepFourNext() {
    uploadFiles();
    setCurrentStep((prev) => prev + 1);
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
            {files.map((file, idx) => (
              <VStack key={idx} className={styles.previewImageContainer}>
                <VStack className={styles.closeBtn}>
                  <CloseIcon w={3} h={3} />
                </VStack>
                <Image
                  alt="uploaded file"
                  src={URL.createObjectURL(file) ?? ""}
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
        onClick={handleStepFourNext}
      >
        Next
      </Button>
    </VStack>
  );
}

type ReviewCauseProps = {
  setTxnSuccessful: (id: string) => void;
  address: string;
  title: string;
  country: string;
  goal: any;
  categories: string[];
  description: string;
  files: Blob[];
  saveCause: (id: string) => void;
};

function ReviewCause({
  setTxnSuccessful,
  address,
  title,
  goal,
  categories,
  description,
  country,
  files,
  saveCause,
}: ReviewCauseProps) {
  const [isLoading, setIsLoading] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  function handleListCause() {
    const id = (
      Math.floor(Math.random() * (100000000 - 10000000 + 1)) + 10000000
    ).toString();

    setIsLoading(true);
    saveCause(id);
    setTimeout(() => {
      scrollToTop();
      setTxnSuccessful(id);
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
          <Text fontWeight={500}>{numberWithCommas(goal)} KLAY</Text>
          <Divider />
        </VStack>

        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Campaign Info</Text>
          <Text className={styles.editBtn}>Edit</Text>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Campaign title</Text>
          <HStack>
            <Text fontWeight={500}>{title}</Text>
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Choose categories</Text>
          <HStack className={styles.tagContainer}>
            {categories.map((category, idx) => (
              <Text key={idx} className={styles.causeTag}>
                {category}
              </Text>
            ))}
          </HStack>
          <Divider />
        </VStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>Location</Text>
          <Text fontWeight={500}>{country}</Text>
          <Divider />
        </VStack>

        <HStack className={styles.subtitleContainer}>
          <Text className={styles.subtitle}>Description</Text>
          <Text className={styles.editBtn}>Edit</Text>
        </HStack>
        <VStack className={styles.reviewContainer}>
          <Text className={styles.inputHeader}>About</Text>
          <VStack>
            <Text>{description}</Text>
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
            {files.map((file, idx) => (
              <VStack key={idx} className={styles.previewImageContainer}>
                <VStack className={styles.closeBtn}>
                  <CloseIcon w={3} h={3} />
                </VStack>
                <Image
                  alt="uploaded file"
                  src={URL.createObjectURL(file) ?? ""}
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
