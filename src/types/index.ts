export type LangType = "en" | "ar";

export type optionsType = {
  id: string;
  value: string;
  label: string;
};

export interface ErrorType {
  data: {
    message: string;
    status_code: number;
    errors: {
      [key: string]: string[];
    };
  };
}

export * from "./Package";
export * from "./Products";
