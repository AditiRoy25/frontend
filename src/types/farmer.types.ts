import type { IUser } from "./user.types";

export type IFarmer = IUser;

export interface FarmerQuery {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  status?: "active" | "blocked";
  verified?: boolean;
}

export interface FarmerStatistics {
  totalFarmers: number;
  verifiedFarmers: number;
  blockedFarmers: number;
  activeFarmers: number;
}