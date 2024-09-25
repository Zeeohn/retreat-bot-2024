const fs = require("fs");

// Initial list of names
const names = [
  "Temple Omolehin",
  "Omolara Omolehin",
  "Moyo Omolehin",
  "Oyinkansola Omolehin",
  "Ayanfeoluwa Aliu",
  "Micheal Jackson",
  "Elijah Olorunipa",
  "Omotayo Ojo",
  "Azeez Yiza",
  "Taiyelolu Ajayi",
  "Joy Iroaganachi",
  "Dorcas Adi",
  "Veronica Micheal Jackson",
  "Samson Owojaye",
  "Ayomikun Crown",
  "Oyindamola Crown",
  "Seun James",
  "Adeola Ajayi",
  "Rhoda Adebayo",
  "Victor Ajibaiye",
  "Ronke Ajibaiye",
  "Jemima Adi",
  "Ibukun Ajayi",
  "Kehinde Ajayi",
  "Samson Afolayan",
  "Olatise Wealth",
  "Oyindun Wealth",
  "Aikhenomian Oyindamola",
  "Adebayo Jeremiah",
  "Makanjuola Edwin",
  "Busayo Owolabi",
  "Olamide Bello",
  "Faromika Oreoluwa",
  "Kelvin Okoli",
  "Funmilayo Ayodele",
  "Victor Oresanya",
  "Iyanu Asaolu",
  "Bodunde Toyin",
  "Oluwatosin Adewunmi",
  "Temitope Adeyemo",
  "Ayombo Akinsade",
  "Folorunsho Samuel",
  "Toyin Alade",
  "Temitayo Ogunniyi",
  "Olumoroti Toyin",
  "Adebayo Grace",
  "Ajibade Pelumi",
  "Ojeranti Olubunmi",
  "Oforishe Peter",
  "Akanji Motunrayo",
  "Adeosun Seyi",
  "Ajare Ayomikun",
  "Banke Omidiji",
  "Yinka Ashaye",
  "Ademiluka Precious",
  "Ikape Deborah",
  "Afolabi Fasakin",
  "Emediong Udoh",
  "Ewaoluwa Ajani",
  "Godwin Alohutade",
  "Favour Napoleon",
  "Oyinola Ogunlaja",
  "Victoria Adio",
  "Shola Adio",
  "Tobi Afolabi",
  "Christianah Owojaye",
  "Shola Orunmole",
  "Esther Odutola",
  "Peter Ogundeji",
  "Bodunde Victor",
  "Owolabi Pelumi",
  "Babajide Kate",
  "Michael Joy",
  "Omotinugbon John",
  "Idowu Taiwo",
  "Oladimeji Benjamin",
  "Adeleke Ruth",
  "Kingston Victor",
  "Eniola Olagunju",
  "Omokhekpen Aigbogun",
  "Seyi Olatunde",
  "Abosede Ajayi",
  "Adebayo Pelumi",
  "Jumoke Dada",
  "Adu Adekunle",
  "Aina Peter",
  "Adewumi Boluwatife",
  "Kingston Frank",
  "Orooniyi Emmanuel",
  "David Olunaike",
  "Deborah Olaleye",
  "Promise Ibitoye",
  "Daniel Ajayi",
  "Joy Paul",
  "Ife Adegbite",
  "Tobi Gideon",
  "Bukola Ajayi",
  "Moji Ogbonlato",
  "Pelumi Oladipo",
  "Blessing Olushola",
  "Tosin Cornelius",
  "Clement Ebong",
  "Atunde Peter",
  "Adeleke Hannah",
  "Amuda Samuel",
  "Aikhenomian Peter",
  "Ashaye Olawale",
  "Adebayo John",
  "Olawale Samuel",
  "Janet Bola",
  "James Afolabi",
  "Ogunlade Segun",
  "Esan Blessing",
  "Olawale Tayo",
  "Olawale Blessing",
  "Adeleke Samuel",
  "Eseyin Dorcas",
  "Moji Ogbonlato",
  "Olawale Marvelous",
  "Emidun Mosope",
  "Jibowu Kajoteni",
  "Adeoti Dennis",
  "Nasiru Gbemisola",
  "Ojelade Tobiloba",
  "Adekunle Stephen",
  "Akinboye Triumph",
  "Pascalin Joseph",
  "Pascalia Joseph",
  "Timilehin Omidiji",
  "Julius Ayodele",
  "Babara Afolayan",
  "Ogunsola Tobi",
  "Theresa Ejuone",
  "Bamise Afolabi",
  "Timothy Famoroti",
  "Shina Oladipo",
  "Olofinjana Temiloluwa",
  "Oyindamola Tayo",
  "Aiyedun Victor",
  "Busayo Oyinloye",
  "Eseyin Korede",
  "Deborah Ojo",
  "Okonkwo Jeremiah",
  "Joy Joseph",
  "Adewara Ruth",
  "Meseru Happiness",
  "Ibukun Ayo-Ayinde",
  "Adekunle Boluwatife",
  "Tayo Oyindamola",
  "Dadewa Richie",
  "Rukena Glory",
  "Olanrewaju John",
  "Olaoye Testimony",
  "Zion Success",
  "Osobu Mayowa",
  "Ebiendele Emmanuel",
  "Gbenga Kolawole",
  "Ogbo Emmanuel",
  "Taiye Adegbite",
  "Ekundayo Isreal",
  "Kentonu Micheal",
  "Ruth Bayonle",
  "Pelumi Tayo",
  "Fiyin Afolayan",
  "Ogundairo Taiwo",
  "Omotinugbon Emmanuel",
  "Faith Oshi",
  "Adegbite Kehinde",
  "Olalundun Pelumi",
  "Kayode Omotola",
  "Obaniyi Peace",
  "Gabriel Gideon",
  "Boluwatife James",
  "Olatoye Mary",
  "Desmond Ogbolu",
  "Joy Ezu",
  "Omodunni Victory",
  "Alao Tosin",
  "Abigail Ajakaye",
  "Love Abiodun",
  "Patience Isa",
  "Okediji Damilola",
  "Ojurongbe Esther",
  "Osobu Mayowa",
  "Ebiendele Emmanuel",
  "Olaoba Olabomi",
  "Adebayo Grace",
  "Tinuoye Aderonke",
  "Odion Oyakhirome",
  "Maclean Omolola",
  "Oke Abolaji",
  "Nicole Akhaboa",
  "Oluwabukolami Balogun",
  "Oluwaferanmi Fatile",
  "Akinbani Omoronike",
  "Treasure Ajala",
  "Nesa Akhaboa",
  "Victor Momoh",
];

const generateCode = (index, name) => {
  const codePrefix = name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
  const codeNumber = String(index + 1).padStart(3, "0"); // Start from 001
  return codePrefix + codeNumber;
};

// Create the initial JSON database
const createJSONDatabase = () => {
  const jsonDatabase = names.map((name, index) => ({
    id: index + 1, // Unique ID starting from 1
    name: name,
    code: generateCode(index, name),
  }));

  // Store the database in a JSON file
  fs.writeFile(
    "nameDatabase.json",
    JSON.stringify(jsonDatabase, null, 2),
    (err) => {
      if (err) {
        console.error("Error writing to file", err);
      } else {
        console.log(
          "Database created and stored in nameDatabase.json:",
          jsonDatabase
        );
      }
    }
  );
};

createJSONDatabase();
