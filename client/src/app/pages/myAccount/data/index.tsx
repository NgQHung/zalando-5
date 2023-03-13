export interface Data_MyAccount {
  title: string;
  data: string[];
}

export const data_myAccount: Data_MyAccount[] = [
  {
    title: "Váš účet",
    data: [
      "Přehled",
      "Objednávky",
      "Vrátit zboží",
      "Vracené zboží",
      "Osobní udaje",
      "Adresy",
      "Dárkové karty",
      "Newslettery",
      "Vaše krabice na prodej",
    ],
  },
  { title: "Předměty, které vlastníte", data: ["Moda"] },
  { title: "Přizpůsobte si to", data: ["Vaše velikosti", "Vámi vybrané značky"] },
  { title: "Více", data: ["Nápověda a kontakt", "Vyžádat si nebo vymazat udaje"] },
];
