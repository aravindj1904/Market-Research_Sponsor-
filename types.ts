export interface FinancialData {
  companyName: string;
  websiteUrl: string;
  sponsorInvolved: string; // "Yes" or "No"
  sponsorName: string;
  dealBackground: string;
  dateTiming: string;
  stake: string;
  valuation: string;
  investmentAmount: string;
  platformVsTuckIn: string;
  ownershipStructure: string;
  previousDeals: string;
  sourcesList?: string[];
}

export interface AnalysisResult {
  data: FinancialData;
  grounding: any; // Using any for the complex grounding structure from Gemini
}

export interface SearchState {
  query: string;
  isSearching: boolean;
}