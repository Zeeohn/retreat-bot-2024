// const fs = require("fs");

// // Initial list of names
// const names = [
//   "Temple Omolehin",
//   "Omolara Omolehin",
//   "Moyo Omolehin",
//   "Oyinkansola Omolehin",
//   "Ayanfeoluwa Aliu",
//   "Micheal Jackson",
//   "Elijah Olorunipa",
//   "Omotayo Ojo",
//   "Azeez Yiza",
//   "Taiyelolu Ajayi",
//   "Joy Iroaganachi",
//   "Dorcas Adi",
//   "Veronica Micheal Jackson",
//   "Samson Owojaye",
//   "Ayomikun Crown",
//   "Oyindamola Crown",
//   "Seun James",
//   "Adeola Ajayi",
//   "Rhoda Adebayo",
//   "Victor Ajibaiye",
//   "Ronke Ajibaiye",
//   "Jemima Adi",
//   "Ibukun Ajayi",
//   "Kehinde Ajayi",
//   "Samson Afolayan",
//   "Olatise Wealth",
//   "Oyindun Wealth",
//   "Aikhenomian Oyindamola",
//   "Adebayo Jeremiah",
//   "Makanjuola Edwin",
//   "Busayo Owolabi",
//   "Olamide Bello",
//   "Faromika Oreoluwa",
//   "Kelvin Okoli",
//   "Funmilayo Ayodele",
//   "Victor Oresanya",
//   "Iyanu Asaolu",
//   "Bodunde Toyin",
//   "Oluwatosin Adewunmi",
//   "Temitope Adeyemo",
//   "Ayombo Akinsade",
//   "Folorunsho Samuel",
//   "Toyin Alade",
//   "Temitayo Ogunniyi",
//   "Olumoroti Toyin",
//   "Adebayo Grace",
//   "Ajibade Pelumi",
//   "Ojeranti Olubunmi",
//   "Oforishe Peter",
//   "Akanji Motunrayo",
//   "Adeosun Seyi",
//   "Ajare Ayomikun",
//   "Banke Omidiji",
//   "Yinka Ashaye",
//   "Ademiluka Precious",
//   "Ikape Deborah",
//   "Afolabi Fasakin",
//   "Emediong Udoh",
//   "Ewaoluwa Ajani",
//   "Godwin Alohutade",
//   "Favour Napoleon",
//   "Oyinola Ogunlaja",
//   "Victoria Adio",
//   "Shola Adio",
//   "Tobi Afolabi",
//   "Christianah Owojaye",
//   "Shola Orunmole",
//   "Esther Odutola",
//   "Peter Ogundeji",
//   "Bodunde Victor",
//   "Owolabi Pelumi",
//   "Babajide Kate",
//   "Michael Joy",
//   "Omotinugbon John",
//   "Idowu Taiwo",
//   "Oladimeji Benjamin",
//   "Adeleke Ruth",
//   "Kingston Victor",
//   "Eniola Olagunju",
//   "Omokhekpen Aigbogun",
//   "Seyi Olatunde",
//   "Abosede Ajayi",
//   "Adebayo Pelumi",
//   "Jumoke Dada",
//   "Adu Adekunle",
//   "Aina Peter",
//   "Adewumi Boluwatife",
//   "Kingston Frank",
//   "Orooniyi Emmanuel",
//   "David Olunaike",
//   "Deborah Olaleye",
//   "Promise Ibitoye",
//   "Daniel Ajayi",
//   "Joy Paul",
//   "Ife Adegbite",
//   "Tobi Gideon",
//   "Bukola Ajayi",
//   "Moji Ogbonlato",
//   "Pelumi Oladipo",
//   "Blessing Olushola",
//   "Tosin Cornelius",
//   "Clement Ebong",
//   "Atunde Peter",
//   "Adeleke Hannah",
//   "Amuda Samuel",
//   "Aikhenomian Peter",
//   "Ashaye Olawale",
//   "Adebayo John",
//   "Olawale Samuel",
//   "Janet Bola",
//   "James Afolabi",
//   "Ogunlade Segun",
//   "Esan Blessing",
//   "Olawale Tayo",
//   "Olawale Blessing",
//   "Adeleke Samuel",
//   "Eseyin Dorcas",
//   "Moji Ogbonlato",
//   "Olawale Marvelous",
//   "Emidun Mosope",
//   "Jibowu Kajoteni",
//   "Adeoti Dennis",
//   "Nasiru Gbemisola",
//   "Ojelade Tobiloba",
//   "Adekunle Stephen",
//   "Akinboye Triumph",
//   "Pascalin Joseph",
//   "Pascalia Joseph",
//   "Timilehin Omidiji",
//   "Julius Ayodele",
//   "Babara Afolayan",
//   "Ogunsola Tobi",
//   "Theresa Ejuone",
//   "Bamise Afolabi",
//   "Timothy Famoroti",
//   "Shina Oladipo",
//   "Olofinjana Temiloluwa",
//   "Oyindamola Tayo",
//   "Aiyedun Victor",
//   "Busayo Oyinloye",
//   "Eseyin Korede",
//   "Deborah Ojo",
//   "Okonkwo Jeremiah",
//   "Joy Joseph",
//   "Adewara Ruth",
//   "Meseru Happiness",
//   "Ibukun Ayo-Ayinde",
//   "Adekunle Boluwatife",
//   "Tayo Oyindamola",
//   "Dadewa Richie",
//   "Rukena Glory",
//   "Olanrewaju John",
//   "Olaoye Testimony",
//   "Zion Success",
//   "Osobu Mayowa",
//   "Ebiendele Emmanuel",
//   "Gbenga Kolawole",
//   "Ogbo Emmanuel",
//   "Taiye Adegbite",
//   "Ekundayo Isreal",
//   "Kentonu Micheal",
//   "Ruth Bayonle",
//   "Pelumi Tayo",
//   "Fiyin Afolayan",
//   "Ogundairo Taiwo",
//   "Omotinugbon Emmanuel",
//   "Faith Oshi",
//   "Adegbite Kehinde",
//   "Olalundun Pelumi",
//   "Kayode Omotola",
//   "Obaniyi Peace",
//   "Gabriel Gideon",
//   "Boluwatife James",
//   "Olatoye Mary",
//   "Desmond Ogbolu",
//   "Joy Ezu",
//   "Omodunni Victory",
//   "Alao Tosin",
//   "Abigail Ajakaye",
//   "Love Abiodun",
//   "Patience Isa",
//   "Okediji Damilola",
//   "Ojurongbe Esther",
//   "Osobu Mayowa",
//   "Ebiendele Emmanuel",
//   "Olaoba Olabomi",
//   "Adebayo Grace",
//   "Tinuoye Aderonke",
//   "Odion Oyakhirome",
//   "Maclean Omolola",
//   "Oke Abolaji",
//   "Nicole Akhaboa",
//   "Oluwabukolami Balogun",
//   "Oluwaferanmi Fatile",
//   "Akinbani Omoronike",
//   "Treasure Ajala",
//   "Nesa Akhaboa",
//   "Victor Momoh",
// ];

// const generateCode = (index, name) => {
//   const codePrefix = name
//     .split(" ")
//     .map((word) => word.charAt(0).toUpperCase())
//     .join("");
//   const codeNumber = String(index + 1).padStart(3, "0"); // Start from 001
//   return codePrefix + codeNumber;
// };

// // Create the initial JSON database
// const createJSONDatabase = () => {
//   const jsonDatabase = names.map((name, index) => ({
//     id: index + 1, // Unique ID starting from 1
//     name: name,
//     code: generateCode(index, name),
//   }));

//   // Store the database in a JSON file
//   fs.writeFile(
//     "nameDatabase.json",
//     JSON.stringify(jsonDatabase, null, 2),
//     (err) => {
//       if (err) {
//         console.error("Error writing to file", err);
//       } else {
//         console.log(
//           "Database created and stored in nameDatabase.json:",
//           jsonDatabase
//         );
//       }
//     }
//   );
// };

// createJSONDatabase();

/**
 * Converts raw personnel data to structured JSON format with hierarchical ordering
 * @param {string} rawInput - The raw text input containing personnel data
 * @returns {Array} - An array of personnel objects in JSON format
 */
function convertPersonnelToJSON(rawInput) {
  // Split input into lines and filter out empty lines
  const lines = rawInput.split("\n").filter((line) => line.trim() !== "");

  // Initialize variables to track current installation and personnel list
  let currentInstallation = "";
  const personnel = [];
  let idCounter = 1;

  // Process each line
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check if this line is an installation name (all caps)
    if (line.toUpperCase() === line && line.length > 0 && !line.includes(" ")) {
      currentInstallation = line;
      continue;
    }

    // Parse personnel data
    const parts = line.split(" ");

    // Need at least two parts (office and name)
    if (parts.length < 2) continue;

    // Extract office and name
    let office = parts[0];
    let name = "";

    // Special case for 'Asst HOD' which has two words
    if (office === "Asst" && parts[1] === "HOD") {
      office = "Asst HOD";
      name = parts.slice(2).join(" ");
    } else if (office === "Executive" && parts[1] === "Assistant") {
      office = "Executive Assistant";
      name = parts.slice(2).join(" ");
    } else {
      name = parts.slice(1).join(" ");
    }

    // Add to personnel list
    personnel.push({
      id: idCounter++,
      name: name,
      office: office,
      installation: currentInstallation,
      code: "", // Will be calculated later
    });
  }

  // Define the hierarchy of offices for sorting
  const officeHierarchy = {
    Pastor: 1,
    Minister: 2,
    HOD: 3,
    "Asst HOD": 4,
    "Executive Assistant": 5,
    Brother: 6,
    Lady: 6,
    // Default value for any other office
    default: 7,
  };

  // Sort personnel by hierarchy
  personnel.sort((a, b) => {
    const aRank = officeHierarchy[a.office] || officeHierarchy.default;
    const bRank = officeHierarchy[b.office] || officeHierarchy.default;

    if (aRank !== bRank) {
      return aRank - bRank;
    }

    // If same office, sort by installation
    return a.installation.localeCompare(b.installation);
  });

  // Generate codes for each person
  const installationCodes = {};

  personnel.forEach((person) => {
    // Create an abbreviation for the installation
    let installationCode;
    if (!installationCodes[person.installation]) {
      // Create installation abbreviation
      if (person.installation === "HEADQUARTERS") {
        installationCode = "HQ";
      } else if (person.installation === "KWASU") {
        installationCode = "KW";
      } else if (person.installation === "GLOBAL") {
        installationCode = "GL";
      } else if (person.installation === "UNILAG") {
        installationCode = "UL";
      } else if (person.installation === "FUTA") {
        installationCode = "FT";
      } else if (person.installation === "UNIABUJA") {
        installationCode = "UA";
      } else if (person.installation === "COHS") {
        installationCode = "CH";
      } else if (person.installation === "TANKE") {
        installationCode = "TK";
      } else if (person.installation === "ABUJA") {
        installationCode = "AB";
      } else if (person.installation === "GOSPEL EMPIRE") {
        installationCode = "GE";
      } else if (person.installation === "UNIJOS") {
        installationCode = "UJ";
      } else if (person.installation === "KWARAPOLY") {
        installationCode = "KP";
      } else if (person.installation === "ZARIA") {
        installationCode = "ZA";
      } else if (person.installation === "UNILORIN") {
        installationCode = "UL";
      } else if (person.installation === "IBADAN") {
        installationCode = "IB";
      } else if (person.installation === "ELIZADE") {
        installationCode = "EL";
      } else if (person.installation === "LAGOS") {
        installationCode = "LG";
      } else {
        // Default: take first two letters
        installationCode = person.installation.substring(0, 2).toUpperCase();
      }

      installationCodes[person.installation] = {
        code: installationCode,
        counter: 0,
      };
    }

    const nameParts = person.name.split(" ");
    const initials = nameParts.map((part) => part.charAt(0)).join("");

    installationCodes[person.installation].counter++;
    const counter = installationCodes[person.installation].counter;

    // Create the code in format: XX-YY-NNN
    const codeCounter = counter.toString().padStart(3, "0");
    person.code = `${
      installationCodes[person.installation].code
    }-${initials}-${codeCounter}`;
  });

  return personnel;
}

/**
 * Processes raw input text and returns formatted JSON
 * @param {string} input - Raw input text
 * @returns {string} - Formatted JSON string
 */
function processInput(input) {
  try {
    const result = convertPersonnelToJSON(input);
    return JSON.stringify(result, null, 2);
  } catch (error) {
    return `Error processing input: ${error.message}`;
  }
}

// Example of how to use the function
function main() {
  const rawInput = `KWASU 
Pastor Moyo  Omolehin
Pastor Oyinkansola Omolehin
Minister Dorcas Ogunlade
Minister Ewaoluwa Ajani
HOD Oyinlola Ogunlaja
HOD Favour Okworigho
HOD Victoria Adio
HOD Henry Adewunmi
HOD Fedrick Adewunmi
Asst HOD Sophie Eniola
Asst HOD Omolola Olayemi
Asst HOD Owolabi Oluwayimika
Asst HOD Sarah Jegede
Asst HOD Roseline Akanmu
Asst HOD Adebayo Dorcas
Asst HOD Dara Abioye
Asst HOD Daniel James
Asst HOD Victor Adegboyega
Asst HOD Ezu Joy
GLOBAL
Minister Kemi Akinwumi
Minister Omotayo Ojo
HOD Oreoluwa Faromika
HOD Olamide Bello
HOD Kelvin Okoli
HOD Ayombo Akinsade
HOD Funmilayo Ayodele
HOD Iyanuoluwa Asaolu
HOD Busayo Owolabi
HOD Femi Aliu
HOD Toyin Bodunde
HOD Tosin Adewumi
Lady Bukolami Balogun
Lady Nicole Akhabhoa
...`; // Truncated for brevity

  const jsonOutput = processInput(rawInput);
  console.log(jsonOutput);
}

// Uncomment to run:
// main();

// To use this code with the full input:
// 1. Replace the rawInput variable content with your complete data
// 2. Call processInput(yourRawInputData)
// 3. The output will be logged in JSON format
