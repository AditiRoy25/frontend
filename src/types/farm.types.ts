export interface Farm {
  _id: string;
  name: string;
  cropName: string;
  area: number;
  areaUnit: "Acre" | "Hectare";
  location: string;
  progress: number;
  status: "Healthy" | "Growing" | "Needs Water" | "Harvested";
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface FarmsResponse {
  success: boolean;
  message: string;
  farms: Farm[];
}

export interface FarmResponse {
  success: boolean;
  message: string;
  farm: Farm;
}

export interface CreateFarmPayload {
  name: string;
  cropName: string;
  area: number;
  areaUnit: string;
  location: string;
  image?: File;
}

export interface UpdateFarmPayload {
  id: string;
  name: string;
  cropName: string;
  area: number;
  areaUnit: string;
  location: string;
  image?: File;
}

export interface DeleteFarmResponse {
  success: boolean;
  message: string;
}