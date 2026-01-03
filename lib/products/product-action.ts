"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { productSchema } from "./product-validation";
import { db } from "@/db";
import { products } from "@/db/schema";
import z from "zod";
import { FormState } from "@/types";

export const addProductAction = async (
  prevState: FormState,
  formData: FormData
) => {
  console.log(formData);

  try {
    const { userId, orgId } = await auth();

    if (!userId) {
      return {
        success: false,
        message: "User must be logged in to submit a product.",
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "User must belong to an organization to submit a product.",
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
      organizationId: orgId,
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
    console.error("Failed to submit product:", error);
    return {
      success: false,
      message: "Failed to submit product.",
    };
  }
};
