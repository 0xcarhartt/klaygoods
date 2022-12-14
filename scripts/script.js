import { doc, setDoc } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBdG5_pb5p1kKzWE27V70pfG-C6GhVHZEg",
  authDomain: "klaygoods-8da86.firebaseapp.com",
  projectId: "klaygoods-8da86",
  storageBucket: "klaygoods-8da86.appspot.com",
  messagingSenderId: "824001515785",
  appId: "1:824001515785:web:9f2d27de3caef7684fc3d8",
  measurementId: "G-V7X1GBBJFL",
};

const causes = [
  {
    id: 0,
    image: "/causes/1.png",
    title: "Support WeatherDAO on decreasing carbon emissions",
    last: 11,
    recipient: "0xa7253bDb6EafE066527053BEa517726cA6b8EeEa",
    donation: 145928,
    goal: 300000,
    profile: {
      image: "/landing/pocky.png",
      name: "0xpocky",
    },
    location: "Queenstown, Singapore",
    images: ["/causes/1.png", "/causes/2.png", "/causes/3.png"],
    tags: ["Climate change", "Environment", "DAO"],
    createdAt: 1665633102063,
    description:
      "The objective of this grant is to help WeatherDAO create sustainable solutions to the rising carbon emission rates in Singapore. WeatherDAO is an autonomous organization dedicated to make this world a cleaner place. \nWith crypto donations on the Klaytn network, we can grow the fund to support even more initiatives, pushing for clean energy reform.",
    updates: [
      {
        timestamp: 1664596800000,
        title: "Thank you for the incredible support! ✨",
        description:
          "Our team has never envisioned the tremendous feedback we’ve recieved from this platform. Beyond excited to see how this initiative can build a cleaner planet.",
      },
      {
        timestamp: 1663300800000,
        title: "Weather DAO’s committment",
        description:
          "We pledge to work with local environmental activists and the Singaporean government to push for sustainable energy in large manufacturing factories.",
      },
    ],
    numDonations: 1200,
    donations: [
      {
        image: "/profiles/donor_1.png",
        donor: "mochi1",
        amount: 4235,
        timestamp: 1665305800000,
      },
      {
        image: "/profiles/donor_2.png",
        donor: "0xyee",
        amount: 302,
        timestamp: 1664300800000,
      },
      {
        image: "/profiles/donor_3.png",
        donor: "ape38",
        amount: 1938,
        timestamp: 1663300800000,
      },
    ],
  },
  {
    id: 1,
    image: "/browse/10.png",
    title: "Legislative reform for New York’s air pollution",
    last: 4,
    donation: 78203,
    goal: 120000,
    profile: {
      image: "/landing/carhartt.jpg",
      name: "0xcarhartt",
    },
    location: "Queenstown, Singapore",
    images: ["/causes/1.png", "/causes/2.png", "/causes/3.png"],
    tags: ["Climate change", "Environment", "DAO"],
    createdAt: 1665633102063,
    description:
      "The objective of this grant is to help WeatherDAO create sustainable solutions to the rising carbon emission rates in Singapore. WeatherDAO is an autonomous organization dedicated to make this world a cleaner place. \nWith crypto donations on the Klaytn network, we can grow the fund to support even more initiatives, pushing for clean energy reform.",
    updates: [
      {
        timestamp: 1664596800000,
        title: "Thank you for the incredible support! ✨",
        description:
          "Our team has never envisioned the tremendous feedback we’ve recieved from this platform. Beyond excited to see how this initiative can build a cleaner planet.",
      },
      {
        timestamp: 1663300800000,
        title: "Weather DAO’s committment",
        description:
          "We pledge to work with local environmental activists and the Singaporean government to push for sustainable energy in large manufacturing factories.",
      },
    ],
    numDonations: 1200,
    donations: [
      {
        image: "/profiles/donor_1.png",
        donor: "mochi1",
        amount: 4235,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_2.png",
        donor: "0xyee",
        amount: 302,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_3.png",
        donor: "ape38",
        amount: 1938,
        timestamp: 1663300800000,
      },
    ],
  },
  {
    id: 2,
    image: "/browse/12.png",
    title: "Improve documentation for Klaytn foundation",
    last: 2,
    donation: 69381,
    goal: 100000,
    profile: {
      image: "/profiles/4.png",
      name: "klaytnfoundation",
    },
    location: "Queenstown, Singapore",
    images: ["/causes/1.png", "/causes/2.png", "/causes/3.png"],
    tags: ["Climate change", "Environment", "DAO"],
    createdAt: 1665633102063,
    description:
      "The objective of this grant is to help WeatherDAO create sustainable solutions to the rising carbon emission rates in Singapore. WeatherDAO is an autonomous organization dedicated to make this world a cleaner place. \nWith crypto donations on the Klaytn network, we can grow the fund to support even more initiatives, pushing for clean energy reform.",
    updates: [
      {
        timestamp: 1664596800000,
        title: "Thank you for the incredible support! ✨",
        description:
          "Our team has never envisioned the tremendous feedback we’ve recieved from this platform. Beyond excited to see how this initiative can build a cleaner planet.",
      },
      {
        timestamp: 1663300800000,
        title: "Weather DAO’s committment",
        description:
          "We pledge to work with local environmental activists and the Singaporean government to push for sustainable energy in large manufacturing factories.",
      },
    ],
    numDonations: 1200,
    donations: [
      {
        image: "/profiles/donor_1.png",
        donor: "mochi1",
        amount: 4235,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_2.png",
        donor: "0xyee",
        amount: 302,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_3.png",
        donor: "ape38",
        amount: 1938,
        timestamp: 1663300800000,
      },
    ],
  },
  {
    id: 3,
    image: "/browse/6.png",
    title: "Free Solidity development courses in Southeast Asia",
    last: 12,
    donation: 12948,
    goal: 50000,
    profile: {
      image: "/profiles/1.png",
      name: "tosie",
    },
    location: "Queenstown, Singapore",
    images: ["/causes/1.png", "/causes/2.png", "/causes/3.png"],
    tags: ["Climate change", "Environment", "DAO"],
    createdAt: 1665633102063,
    description:
      "The objective of this grant is to help WeatherDAO create sustainable solutions to the rising carbon emission rates in Singapore. WeatherDAO is an autonomous organization dedicated to make this world a cleaner place. \nWith crypto donations on the Klaytn network, we can grow the fund to support even more initiatives, pushing for clean energy reform.",
    updates: [
      {
        timestamp: 1664596800000,
        title: "Thank you for the incredible support! ✨",
        description:
          "Our team has never envisioned the tremendous feedback we’ve recieved from this platform. Beyond excited to see how this initiative can build a cleaner planet.",
      },
      {
        timestamp: 1663300800000,
        title: "Weather DAO’s committment",
        description:
          "We pledge to work with local environmental activists and the Singaporean government to push for sustainable energy in large manufacturing factories.",
      },
    ],
    numDonations: 1200,
    donations: [
      {
        image: "/profiles/donor_1.png",
        donor: "mochi1",
        amount: 4235,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_2.png",
        donor: "0xyee",
        amount: 302,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_3.png",
        donor: "ape38",
        amount: 1938,
        timestamp: 1663300800000,
      },
    ],
  },
  {
    id: 4,
    image: "/browse/4.png",
    title: "Support preserving exotic water falls in Costa Rica",
    last: 32,
    donation: 5039,
    goal: 10000,
    profile: {
      image: "/profiles/2.png",
      name: "water.org",
    },
    location: "Queenstown, Singapore",
    images: ["/causes/1.png", "/causes/2.png", "/causes/3.png"],
    tags: ["Climate change", "Environment", "DAO"],
    createdAt: 1665633102063,
    description:
      "The objective of this grant is to help WeatherDAO create sustainable solutions to the rising carbon emission rates in Singapore. WeatherDAO is an autonomous organization dedicated to make this world a cleaner place. \nWith crypto donations on the Klaytn network, we can grow the fund to support even more initiatives, pushing for clean energy reform.",
    updates: [
      {
        timestamp: 1664596800000,
        title: "Thank you for the incredible support! ✨",
        description:
          "Our team has never envisioned the tremendous feedback we’ve recieved from this platform. Beyond excited to see how this initiative can build a cleaner planet.",
      },
      {
        timestamp: 1663300800000,
        title: "Weather DAO’s committment",
        description:
          "We pledge to work with local environmental activists and the Singaporean government to push for sustainable energy in large manufacturing factories.",
      },
    ],
    numDonations: 1200,
    donations: [
      {
        image: "/profiles/donor_1.png",
        donor: "mochi1",
        amount: 4235,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_2.png",
        donor: "0xyee",
        amount: 302,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_3.png",
        donor: "ape38",
        amount: 1938,
        timestamp: 1663300800000,
      },
    ],
  },
  {
    id: 5,
    image: "/browse/5.png",
    title: "Push for economic and gender equality laws",
    last: 55,
    donation: 39281,
    goal: 50000,
    profile: {
      image: "/profiles/3.png",
      name: "doodleapee124",
    },
    location: "Queenstown, Singapore",
    images: ["/causes/1.png", "/causes/2.png", "/causes/3.png"],
    tags: ["Climate change", "Environment", "DAO"],
    createdAt: 1665633102063,
    description:
      "The objective of this grant is to help WeatherDAO create sustainable solutions to the rising carbon emission rates in Singapore. WeatherDAO is an autonomous organization dedicated to make this world a cleaner place. \nWith crypto donations on the Klaytn network, we can grow the fund to support even more initiatives, pushing for clean energy reform.",
    updates: [
      {
        timestamp: 1664596800000,
        title: "Thank you for the incredible support! ✨",
        description:
          "Our team has never envisioned the tremendous feedback we’ve recieved from this platform. Beyond excited to see how this initiative can build a cleaner planet.",
      },
      {
        timestamp: 1663300800000,
        title: "Weather DAO’s committment",
        description:
          "We pledge to work with local environmental activists and the Singaporean government to push for sustainable energy in large manufacturing factories.",
      },
    ],
    numDonations: 1200,
    donations: [
      {
        image: "/profiles/donor_1.png",
        donor: "mochi1",
        amount: 4235,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_2.png",
        donor: "0xyee",
        amount: 302,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_3.png",
        donor: "ape38",
        amount: 1938,
        timestamp: 1663300800000,
      },
    ],
  },
  {
    id: 6,
    image: "/browse/13.jpg",
    title: "Raise funds to help remove waste from the Pacific Ocean",
    last: 27,
    donation: 192039,
    goal: 500000,
    profile: {
      image: "/profiles/ocean.png",
      name: "oceanconservancy",
    },
    location: "Queenstown, Singapore",
    images: ["/causes/1.png", "/causes/2.png", "/causes/3.png"],
    tags: ["Climate change", "Environment", "DAO"],
    createdAt: 1665633102063,
    description:
      "The objective of this grant is to help WeatherDAO create sustainable solutions to the rising carbon emission rates in Singapore. WeatherDAO is an autonomous organization dedicated to make this world a cleaner place. \nWith crypto donations on the Klaytn network, we can grow the fund to support even more initiatives, pushing for clean energy reform.",
    updates: [
      {
        timestamp: 1664596800000,
        title: "Thank you for the incredible support! ✨",
        description:
          "Our team has never envisioned the tremendous feedback we’ve recieved from this platform. Beyond excited to see how this initiative can build a cleaner planet.",
      },
      {
        timestamp: 1663300800000,
        title: "Weather DAO’s committment",
        description:
          "We pledge to work with local environmental activists and the Singaporean government to push for sustainable energy in large manufacturing factories.",
      },
    ],
    numDonations: 1200,
    donations: [
      {
        image: "/profiles/donor_1.png",
        donor: "mochi1",
        amount: 4235,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_2.png",
        donor: "0xyee",
        amount: 302,
        timestamp: 1663300800000,
      },
      {
        image: "/profiles/donor_3.png",
        donor: "ape38",
        amount: 1938,
        timestamp: 1663300800000,
      },
    ],
  },
];

// Initialize Firebase
const app = initializeApp(firebaseConfig);

async function main() {
  for (let i = 0; i < causes.length; i++) {
    const {
      title,
      last,
      donation,
      goal,
      recipient,
      profile,
      location,
      images,
      tags,
      createdAt,
      description,
      updates,
      numDonations,
      donations,
    } = causes[i];

    const id = (
      Math.floor(Math.random() * (100000000 - 10000000 + 1)) + 10000000
    ).toString();

    const docRef = doc(getFirestore(), "causes", id);
    await setDoc(docRef, {
      id: id,
      recipient: "0xa7253bDb6EafE066527053BEa517726cA6b8EeEa",
      goal: goal,
      title: title,
      description: description,
      last: last,
      donation: donation,
      owner: profile,
      location: location,
      images: images,
      categories: tags,
      createdAt: createdAt,
      description: description,
      updates: updates,
      numDonations: numDonations,
      donations: donations,
    });
  }
}

main();
