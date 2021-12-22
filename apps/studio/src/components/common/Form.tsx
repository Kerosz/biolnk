import React from "react";
import {
  SubmitHandler,
  useForm,
  UseFormProps,
  UseFormReturn,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export interface FormProps<Values>
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    "ref" | "onSubmit" | "children"
  > {
  onSubmit: SubmitHandler<Values>;
  defaultValues: UseFormProps<Values>["defaultValues"];
  validationSchema: any;
  resetOnSubmit?: boolean;
  mode?: UseFormProps<Values>["mode"];
  formProps?: UseFormProps<Values>;
  children?: (methods: UseFormReturn<Values>) => React.ReactNode;
  ref?: React.Ref<HTMLFormElement> | null;
}

const Form = <
  Values extends Record<string, unknown> = Record<string, unknown>
>({
  onSubmit,
  defaultValues,
  validationSchema,
  resetOnSubmit = false,
  mode = "all",
  formProps,
  children,
  ref,
  ...otherProps
}: FormProps<Values>) => {
  const methods = useForm<Values>(
    formProps ?? {
      defaultValues,
      resolver: zodResolver(validationSchema),
      mode,
    }
  );
  const { handleSubmit, reset } = methods;

  const customHandleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault && event.preventDefault();
    event.persist && event.persist();

    handleSubmit(onSubmit)(event);

    if (resetOnSubmit) {
      reset(defaultValues);
    }
  };

  return (
    <form ref={ref} onSubmit={customHandleSubmit} {...otherProps}>
      {children(methods)}
    </form>
  );
};

export default Form;
