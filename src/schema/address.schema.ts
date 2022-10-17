import z, { number } from "zod";

export const registAddressSchema = z.object({
  userEmail: z.string(),
  nameKanji: z.string(),
  nameKana: z.string(),
  phone: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string(),
  isDefault: z.boolean(),
});

export const getAddressSchema = z.object({
  userEmail: z.string(),
});

export const getSingleAddressSchema = z.object({
  id: z.string(),
});

export const outSingleAddressSchema = z.nullable(
  z.object({
    userEmail: z.string(),
    nameKanji: z.string(),
    nameKana: z.string(),
    phone: z.string(),
    zipcode: z.string(),
    address1: z.string(),
    address2: z.string(),
    isDefault: z.boolean(),
  })
);

export const deleteAddressSchema = z.object({
  id: z.string(),
});

export const editAddressSchema = z.object({
  id: z.string(),
  nameKanji: z.string(),
  nameKana: z.string(),
  phone: z.string(),
  zipcode: z.string(),
  address1: z.string(),
  address2: z.string(),
  isDefault: z.boolean(),
});
