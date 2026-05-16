export type StatusColor = "green" | "yellow" | "red" | "gray";

export interface ICompanyStatus {
  code: string;
  label: string;
  color: StatusColor;
}

export interface ICompanySize {
  code: string;
  label: string;
}

export interface IMainActivity {
  code: string;
  description: string;
}

export interface IPartner {
  name: string;
  role: string;
  age_range: string | null;
  joined_at: string;
  tax_id: string | null;
  legal_representative: string | null;
}

export interface ICompanyResponse {
  raw_cnpj: string;

  company: {
    name: string;
    trade_name: string | null;
    status: ICompanyStatus;
    age_years: number;
    founded_at: string;
    size: ICompanySize;
    tax_regime: string;
    legal_nature: string;
    share_capital: number;
  };

  activity: {
    main: IMainActivity;
    secondary: IMainActivity[];
  };

  location: {
    full_address: string;
    zip_code: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };

  contact: {
    phone: string | null;
    email: string | null;
  };

  partners: IPartner[];
}
