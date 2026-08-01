export interface GovernmentScheme {
  _id: string;
  title: string;
  description: string;
  amount: number;
  eligibility: string;
  lastDate: string;
  status: "Active" | "Closed";
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface SchemeApplication {
  _id: string;
  scheme: GovernmentScheme;
  status: "Pending" | "Approved" | "Rejected";
  appliedAt: string;
}

export interface GovernmentSchemesResponse {
  success: boolean;
  message: string;
  schemes: GovernmentScheme[];
}

export interface GovernmentSchemeResponse {
  success: boolean;
  message: string;
  scheme: GovernmentScheme;
}

export interface ApplySchemePayload {
  schemeId: string;
}

export interface SchemeApplicationResponse {
  success: boolean;
  message: string;
  application: SchemeApplication;
}

export interface MySchemesResponse {
  success: boolean;
  message: string;
  applications: SchemeApplication[];
}

/* ============================
   Admin Payloads
============================ */

export interface CreateSchemePayload {
  title: string;
  description: string;
  amount: number;
  eligibility: string;
  lastDate: string;
  status: "Active" | "Closed";
  image?: File | string;
}

export type UpdateSchemePayload =
  Partial<CreateSchemePayload>;
/* ============================
   Query Params
============================ */

export interface SchemeQuery {
  page?: number;
  limit?: number;
  search?: string;
  status?: "Active" | "Closed";
}