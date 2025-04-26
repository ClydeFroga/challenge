import { z } from "zod";

export const createUserSchema = z.object({
  full_name: z
    .string()
    .min(1)
    .max(255)
    .refine((val) => val.length > 0, {
      message: "Имя не может быть пустым",
    }),
  role: z
    .string()
    .min(1)
    .max(255)
    .refine((val) => val.length > 0, {
      message: "Роль не может быть пустой",
    }),
  efficiency: z
    .number()
    .min(1)
    .max(100)
    .refine((val) => val >= 1 && val <= 100, {
      message: "Эффективность должна быть в диапазоне от 1 до 100",
    }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  full_name: z
    .string()
    .min(1)
    .max(255)
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: "Имя не может быть пустым",
    }),
  role: z
    .string()
    .min(1)
    .max(255)
    .optional()
    .refine((val) => !val || val.length > 0, {
      message: "Роль не может быть пустой",
    }),
  efficiency: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .refine((val) => val === undefined || (val >= 1 && val <= 100), {
      message: "Эффективность должна быть в диапазоне от 1 до 100",
    }),
});

export type UpdateUserSchema = z.infer<typeof updateUserSchema>;

export const userIdParamSchema = z.object({
  id: z
    .string()
    .transform((val) => parseInt(val))
    .refine((val) => !isNaN(val) && val > 0, {
      message: "ID должен быть положительным числом",
    }),
});

export type UserIdParamSchema = z.infer<typeof userIdParamSchema>;

export const userFiltersSchema = z.object({
  full_name: z.string().optional(),
  role: z.string().optional(),
  efficiency: z
    .string()
    .optional()
    .transform((val) => {
      if (!val) return undefined;
      const num = parseFloat(val);
      return isNaN(num) ? undefined : num;
    })
    .refine((val) => val === undefined || (val >= 1 && val <= 100), {
      message: "Эффективность должна быть числом от 1 до 100",
    }),
});

export type UserFiltersSchema = z.infer<typeof userFiltersSchema>;
