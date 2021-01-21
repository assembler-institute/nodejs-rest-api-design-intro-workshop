function getSeedUsers() {
  return [
    {
      _id: "135bc730-5f0b-5ead-88c1-bccd3dc89e9d",
      firstName: "Jordan",
      lastName: "Peterson",
      email: "woga@wi.lu",
      speaks: ["english", "javascript"],
    },
    {
      _id: "a133dc0e-8164-573c-9db0-5943e6f78f5e",
      firstName: "Margaret",
      lastName: "Watkins",
      email: "edde@kodbi.eh",
      speaks: ["catalan", "spanish"],
    },
    {
      _id: "ce32c467-34f2-5f6a-9b39-490050e9b706",
      firstName: "Mable",
      lastName: "Schneider",
      email: "ba@wuf.ws",
      speaks: ["german", "english"],
    },
    {
      _id: "8f1df2ce-2f0a-548c-8fac-30474c8d6464",
      firstName: "Alta",
      lastName: "Harris",
      email: "cuk@boeli.gn",
      speaks: ["english", "spanish"],
    },
    {
      _id: "8997ca9a-875a-514a-ab8e-ca471e750746",
      firstName: "Darrell",
      lastName: "Wilkerson",
      email: "ecdescu@riwluzhok.pf",
      speaks: ["english", "javascript"],
    },
    {
      _id: "4404b0e6-5bba-5cdd-9965-c675c263b103",
      firstName: "Ryan",
      lastName: "McGuire",
      email: "beta@houboem.py",
      speaks: ["english", "spanish"],
    },
  ];
}

function getSeedBooks() {
  return [
    {
      title: "Incubus Sky",
      genre: "Fantasy",
      year: 2010,
      pages: 220,
    },
    {
      title: "The Twilight Wanderer",
      genre: "Fantasy",
      year: 2012,
      pages: 300,
    },
    {
      title: "City of Monday",
      genre: "Crime",
      year: 2020,
      pages: 250,
    },
    {
      title: "The Saturday's Shaman",
      genre: "Romance",
      year: 2015,
      pages: 280,
    },
    {
      title: "The Underground of the Bane",
      genre: "Thriller",
      year: 2020,
      pages: 20,
    },
    {
      title: "God in the Roadtrip",
      genre: "Fantasy",
      year: 2018,
      pages: 320,
    },
    {
      title: "Sunken Haven",
      genre: "Comedy",
      year: 2017,
      pages: 240,
    },
    {
      title: "The Harrowing Temper",
      genre: "Crime",
      year: 2012,
      pages: 120,
    },
    {
      title: "Sleep of Hallows",
      genre: "Fantasy",
      year: 2012,
      pages: 220,
    },
    {
      title: "The Cavern's Fire",
      genre: "Crime",
      year: 2014,
      pages: 240,
    },
  ];
}

module.exports = {
  getSeedUsers: getSeedUsers,
  getSeedBooks: getSeedBooks,
};
