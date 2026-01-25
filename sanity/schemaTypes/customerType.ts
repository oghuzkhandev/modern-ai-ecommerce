import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const customerType = defineType({
  name: "customer",
  title: "Customer",
  type: "document",
  icon: UserIcon,
  groups: [
    {
      name: "details",
      title: "Customer Details",
      default: true,
    },
    {
      name: "stripe",
      title: "Stripe",
    },
  ],
  fields: [
    defineField({
      name: "email",
      type: "string",
      group: "details",
      validation: (rule) => [rule.required().error("Email is required")],
    }),
    defineField({
      name: "name",
      type: "string",
      group: "details",
      description: "Name of the customer",
    }),
    defineField({
      name: "clerkUserId",
      type: "string",
      group: "details",
      description: "Clerk user ID for Authentication",
    }),
    defineField({
      name: "stripeCustomerId",
      type: "string",
      group: "stripe",
      description: "Stripe customer ID for Payments",
      validation: (rule) =>
        rule.required().error("Stripe customer ID is required"),
    }),
    defineField({
      name: "createdAt",
      type: "datetime",
      group: "details",
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      email: "email",
      name: "name",
      stripeCustomerId: "stripeCustomerId",
    },
    prepare({ email, name, stripeCustomerId }) {
      return {
        title: name ?? email ?? "Unknown Customer",
        subtitle: stripeCustomerId
          ? `Email: ${email ?? ""}  Stripe ID: ${stripeCustomerId}`
          : `Email: ${email ?? ""} No Stripe ID`,
      };
    },
  },
  orderings: [
    {
      title: "Newest First",
      name: "createdAtDesc",
      by: [
        {
          field: "createdAt",
          direction: "desc",
        },
      ],
    },
    {
      title: "Email A to Z",
      name: "emailAsc",
      by: [
        {
          field: "email",
          direction: "asc",
        },
      ],
    },
  ],
});
