export interface PublicRoutes {
  path: string;
  redirect?: string;
  component: (props?: any) => JSX.Element;
  layout?: (props: any) => JSX.Element;
  // redirect?: (props: any) => void;
}

export interface PrivateRoutes {
  path: string;
  redirect?: string;
  component: (props?: any) => JSX.Element;
  layout?: (props: any) => JSX.Element;
}
