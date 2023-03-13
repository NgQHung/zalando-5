export interface Stepper {
  title: string;
  path: string;
  isStepped: boolean;
  step: number;
}

export const stepperData: Stepper[] = [
  {
    title: "Adresa",
    path: "/checkout/address",
    isStepped: false,
    step: 2,
  },
  {
    title: "Platba",
    path: "/checkout/payment",
    isStepped: false,
    step: 3,
  },
  {
    title: "Potvrdit",
    path: "/checkout/confirm",
    isStepped: false,
    step: 4,
  },
  {
    title: "Hotovo!",
    path: "/checkout/done",
    isStepped: false,
    step: 5,
  },
];
