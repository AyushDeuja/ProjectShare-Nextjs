"use client";
import {
  Loader2Icon,
  LoaderIcon,
  SparkleIcon,
  SparklesIcon,
} from "lucide-react";
import { FormField } from "../form/form-fields";
import { Button } from "../ui/button";
import { addProductAction } from "@/lib/products/product-action";
import { useActionState } from "react";
import { success } from "zod";

const ProductSubmitForm = () => {
  const initialState = {
    success: false,
    error: {},
    message: "",
  };

  const [state, formAction, isPending] = useActionState(
    addProductAction,
    initialState
  );

  return (
    <form className="space-y-6" action={formAction}>
      <FormField
        label="Product Name"
        name="name"
        id="name"
        placeholder="My Awesome Product"
        required
        onChange={() => {}}
      />
      <FormField
        label="Slug"
        name="slug"
        id="slug"
        placeholder="my-awesome-product"
        required
        onChange={() => {}}
        helperText="URL-friendly version of your product name"
      />

      <FormField
        label="Tagline"
        name="tagline"
        id="tagline"
        placeholder="A brief, catchy description"
        required
        onChange={() => {}}
      />

      <FormField
        label="Description"
        name="description"
        id="description"
        placeholder="Tell us more about your product..."
        required
        onChange={() => {}}
        textarea
      />

      <FormField
        label="Website URL"
        name="websiteUrl"
        id="websiteUrl"
        placeholder="https://yourproduct.com"
        required
        onChange={() => {}}
        helperText="Enter your product's website or landing page"
      />
      <FormField
        label="Tags"
        name="tags"
        id="tags"
        placeholder="AI, Productivity, SaaS"
        required
        onChange={() => {}}
        helperText="Comma-separated tags (e.g., AI, SaaS, Productivity)"
      />

      <Button type="submit" size="lg" className="w-full">
        {isPending ? (
          <Loader2Icon className="size-4 animate-spin" />
        ) : (
          <>
            <SparklesIcon className="size-4" />
            Submit Product
          </>
        )}
      </Button>
    </form>
  );
};

export default ProductSubmitForm;
