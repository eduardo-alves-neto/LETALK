export interface CompanyActivity {
  code: number;
  description: string;
}

export interface CompanyTaxRegimeYear {
  year: number;
  taxation: string;
}

export interface CompanyPartner {
  name: string;
  role: string;
  ageRange: string | null;
  joinedAt: string;
  taxId: string | null;
  legalRepresentative: string | null;
}

export interface CompanyLocation {
  zipCode: string;
  streetType: string | null;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string | null;
}

export interface CompanyContact {
  phone: string | null;
  secondaryPhone: string | null;
  email: string | null;
}

export interface CompanyResponse {
  cnpj: string;
  company: {
    name: string;
    tradeName: string | null;
    statusCode: number;
    statusDescription: string;
    branchCode: number | null;
    branchLabel: string | null;
    foundedAt: string;
    sizeCode: number;
    sizeDescription: string;
    legalNature: string;
    shareCapital: number;
    isMei: boolean | null;
    isSimples: boolean | null;
    taxRegimeHistory: CompanyTaxRegimeYear[];
  };
  activity: {
    main: CompanyActivity;
    secondary: CompanyActivity[];
  };
  location: CompanyLocation;
  contact: CompanyContact;
  partners: CompanyPartner[];
}
