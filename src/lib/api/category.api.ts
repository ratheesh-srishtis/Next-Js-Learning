import api from "./axios";

// CREATE
export const createCategory = async (
  data: FormData | { name: string; image?: string }
) => {
  const res = await api.post("/admin/category", data, {
    headers:
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
  });
  return res.data;
};

// GET ALL
export const getCategories = async () => {
  const res = await api.get("/admin/category");
  return res.data;
};

// UPDATE
export const updateCategory = async (id: string, data: FormData | any) => {
  const res = await api.put(`/admin/category/${id}`, data, {
    headers:
      data instanceof FormData ? { "Content-Type": "multipart/form-data" } : {},
  });
  return res.data;
};

// DELETE
export const deleteCategory = async (id: string) => {
  const res = await api.delete(`/admin/category/${id}`);
  return res.data;
};
