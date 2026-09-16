export interface Category {
  id: string;
  name: string;
  color?: string | null;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCategoryDTO {
  name: string;
  color?: string | null;
  userId: string;
}

export interface UpdateCategoryDTO {
  id: string;
  name?: string;
  color?: string | null;
  userId: string;
}

export interface DeleteCategoryDTO {
  id: string;
  userId: string;
}

export interface GetCategoriesDTO {
  userId: string;
}
