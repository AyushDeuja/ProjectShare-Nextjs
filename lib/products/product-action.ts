"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validation";
import { db } from "@/db";
import { products } from "@/db/schema";
import z from "zod";

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

  try {
    const { userId } = await auth();

    if (!userId) {
      return {
        success: false,
        errors: { auth: "User must be logged in to submit a product." },
      };
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

    //data
    const rawFormData = Object.fromEntries(formData.entries());

    //validate data
    const validatedData = productSchema.safeParse(rawFormData);

    if (!validatedData.success) {
      console.log(validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Validation failed.",
      };
    }
    const { name, slug, tagline, tags, websiteUrl, description } =
      validatedData.data;

    const tagsArray = tags ? tags.filter((tag) => typeof tag === "string") : [];

    await db.insert(products).values({
      name,
      slug,
      tagline,
      tags: tagsArray,
      websiteUrl,
      description,
      status: "pending",
      submittedBy: userEmail,
      userId,
    });
    return {
      success: true,
      message: "Product submitted successfully! It will be reviewed shortly.",
      errors: undefined,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed. Please check the form.",
      };
    }
    return {
      success: false,
      errors: error,
      message: "Failed to submit product.",
    };
  }
};
