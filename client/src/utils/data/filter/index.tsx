interface IFILTER_DATA {
  title: string;
  data: string[];
}

export const FILTER_DATA: IFILTER_DATA[] = [
  {
    title: "Seřadit podle",
    data: ["Nejoblíbenější", "Nejnovější", "Nejnižší cena", "Nejvyšší cena", "Výhodné nabídky"],
  },
  {
    title: "Velikost",
    data: [],
  },
  {
    title: "Značka",
    data: [],
  },
  {
    title: "Barva",
    data: [],
  },
  {
    title: "Udržitelnost",
    data: [
      "Lepší pracovní podmínky",
      "Ochrana zvířat",
      "Opětovné použití materálů",
      "Snížení emisí",
      "Udržitelnější kosmetika",
      "Úspora vody",
    ],
  },
  {
    title: "Cena",
    data: [],
  },

  {
    title: "Materiál",
    data: [
      "Bavlna",
      "Bavlna (100%)",
      "Bavlněný flanel",
      "Denim",
      "Filtry",
      "Fleece",
      "HardShell",
      "Hedvábí",
      "Hedvábí (100%)",
      "Háčkované",
      "Jiné",
    ],
  },
  {
    title: "Balení",
    data: [],
  },
  {
    title: "Licencované značky",
    data: [],
  },
  {
    title: "Vzor",
    data: [
      "Barevné",
      "Barevný přechod",
      "Foto potisk",
      "Jednoduché",
      "Kamufláž",
      "Květinové",
      "Marl",
      "Paisley",
      "Pruhované",
      "Puntíkované",
    ],
  },
  {
    title: "Střih",
    data: ["Skinny fit", "Slim fit", "Regular fit", "Relaxed fit/Volný", "Oversized"],
  },
];
