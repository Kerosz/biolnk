import Link from "~components/common/Link";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { useForm } from "react-hook-form";
import { vestResolver } from "@hookform/resolvers/vest";
import { useRouter } from "next/router";
import { Button, Input, Text } from "@biolnk/gamut";
import { SigningLayout } from "~/components/layouts";
import { useSupabase } from "~/lib/supabase";
import { SIGNUP_SCHEMA } from "~/data/validations";
import type { SignUpDto } from "~/types";
import { useSafeLayoutEffect } from "@biolnk/core";

function SignUpPage() {
  const DEFAULT_FORM_VALUES: SignUpDto = {
    email: "",
    username: "",
    password: "",
  };

  const { query } = useRouter();
  const { signUpWithEmail } = useSupabase();
  const {
    register,
    formState: { errors, isValid, isDirty, isSubmitting },
    handleSubmit,
    reset,
    setValue,
  } = useForm<SignUpDto>({
    defaultValues: DEFAULT_FORM_VALUES,
    resolver: vestResolver(SIGNUP_SCHEMA),
    mode: "all",
  });

  const handleSignUp = async (formData: SignUpDto) => {
    await signUpWithEmail(formData);
    reset(DEFAULT_FORM_VALUES);
  };

  useSafeLayoutEffect(() => {
    if (query.username) {
      setValue("username", query.username as string, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      });
    }
  }, [query]);

  return (
    <SigningLayout
      title="Sign Up"
      subTitle="Free forever. No payment needed."
      socialBtnText="Sign Up"
      footer={
        <>
          Have an account?{" "}
          <Link url="/signin" className="font-medium text-normalTextHover">
            Sign in
          </Link>
        </>
      }
      seoOptions={{
        title: "Sign Up",
        canonical: "https://app.biolnk.me/signup",
      }}
    >
      <form onSubmit={handleSubmit(handleSignUp)}>
        <>
          <Input
            id="email-address"
            type="email"
            title="Please enter a valid email address!"
            label="Email address"
            srOnlyLabel
            autoComplete="email"
            placeholder="Email address"
            borderless
            error={errors.email?.message}
            {...register("email")}
          />
          <Input
            id="username"
            type="text"
            title="Please enter a username!"
            label="Username"
            srOnlyLabel
            leftAddon="biolnk.me/"
            tightAddonSpace
            autoComplete="username"
            placeholder="username"
            borderless
            error={errors.username?.message}
            {...register("username")}
          />
          <Input
            id="password"
            type="password"
            title="Please enter a password!"
            label="Password"
            srOnlyLabel
            autoComplete="new-password"
            placeholder="Password"
            borderless
            error={errors.password?.message}
            {...register("password")}
          />
          <Button
            type="submit"
            className="mt-9"
            size="md"
            variant="primary"
            block
            uppercase
            loading={isSubmitting}
            disabled={isDirty && !isValid}
          >
            Sign Up With Email
          </Button>
          <Text
            as="span"
            size="xs"
            variant="lighter"
            spacing="wide"
            className="mt-3"
          >
            By creating an account you are agreeing to our Terms and Conditions
            and Privacy Policy
          </Text>
        </>
      </form>
    </SigningLayout>
  );
}

export default withAuthCheck(SignUpPage);
