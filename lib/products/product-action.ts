"use server";

type FormState = {
  success: boolean;
  error: Record<string, string>;
  message: string;
};
export const addProductAction = async (
  prevState: FormState,
  formData: FormData
) => {
  console.log(formData);

  return {
    success: true,
    error: {},
    message: "Product added successfully!",
  };
};
