export type CreateUserOutput = {
  id: string;
  email: string;
  session: string;
  tenant: {
    id: string;
    name: string;
  };
  role: {
    id: string;
    name: string;
  };
};
