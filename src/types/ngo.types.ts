import type { IUser } from "./user.types";

// ===========================
// NGO
// ===========================

export interface INgo {
  _id: string;

  user: IUser | string;

  organizationName: string;

  registrationNumber: string;

  ministryApproval: boolean;

  logo?: string;

  address?: string;

  createdAt?: string;

  updatedAt?: string;
}

// ===========================
// NGO Query
// ===========================

export interface NgoQuery {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

// ===========================
// NGO Statistics
// ===========================

export interface NgoStatistics {
  totalNgos: number;
  activeNgos: number;
  blockedNgos: number;
  verifiedNgos: number;
}