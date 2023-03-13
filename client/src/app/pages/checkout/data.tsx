export interface PaymentMethods {
  title: string;
  type: string;
  imgUrl?: string[];
}

export const paymentMethods: PaymentMethods[] = [
  {
    title: "Okamžitý online převod",
    type: "InstantTransfer",
    imgUrl: [
      "https://uploads-ssl.webflow.com/5dbc8667d2d626c074c901b5/60a2d28f00d43f432bb4f1d1_GoPay-Logo-Czechia.png",
    ],
  },
  {
    title: "Kreditní/debetní karta",
    type: "CreditCard",
    imgUrl: [
      "https://usa.visa.com/dam/VCOM/regional/ve/romania/blogs/hero-image/visa-logo-800x450.jpg",
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1158px-Mastercard-logo.svg.png",
      "https://www.americanexpress.com/content/dam/amex/us/merchant/supplies-uplift/product/images/img-WEBLOGO1-01.jpg",
    ],
  },
  {
    title: "PayPal",
    type: "PayPal",
    imgUrl: ["https://cdn.pixabay.com/photo/2015/05/26/09/37/paypal-784404_1280.png"],
  },
  {
    title: "Klasický bankovní převod",
    type: "BankTransfer",
    // imgUrl: ["https://htmlcolorcodes.com/assets/images/colors/white-color-solid-background-1920x1080.png"],
  },
  {
    title: "Platba na dobírku",
    type: "OnDelivery",
    imgUrl: ["https://www.topautokosmetika.cz/fotky20791/delivery_images/dobirka.png"],
  },
];
