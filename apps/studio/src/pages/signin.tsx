import Link from "~components/common/Link";
import Form from "~components/common/Form";
import SigningPageLayout from "~layout/SigningPageLayout";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSupabase } from "~/lib/supabase";
import { Button, Input } from "@biolnk/ui";
import { SIGNIN_SCHEMA } from "~/data/validations";
import { Routes } from "~/data/enums/routes";
import type { SignInDto } from "~/types";

export default function SignInPage() {
  const DEFAULT_FORM_VALUES: SignInDto = {
    username: "",
    password: "",
  };
  const router = useRouter();
  const { signInWithEmail, isAuthenticated } = useSupabase();

  const handleSignIn = async (formData: SignInDto) => {
    await signInWithEmail(formData);
  };

  /**
   * @TODO
   * use middleware or next 'api' to enable route redirects on SSR
   */
  useEffect(() => {
    if (isAuthenticated) router.replace(Routes.DASHBOARD);
  }, []);

  return (
    <SigningPageLayout
      title="Sign In"
      subTitle="Free forever. No payment needed."
      footer={
        <>
          Don't have an account?{" "}
          <Link url="/signup" className="font-medium text-normalTextHover">
            Sign Up
          </Link>
        </>
      }
      socialBtnText="Continue"
    >
      <Form<SignInDto>
        onSubmit={handleSignIn}
        defaultValues={DEFAULT_FORM_VALUES}
        validationSchema={SIGNIN_SCHEMA}
        resetOnSubmit
      >
        {({
          register,
          formState: { errors, isSubmitting, touchedFields, isValid, isDirty },
        }) => (
          <>
            <Input
              id="username"
              type="text"
              title="Please enter your username!"
              label="Username"
              srOnlyLabel
              leftAddon="biolnk.me/"
              tightAddonSpace
              autoComplete="username"
              placeholder="username"
              borderless
              error={errors.username?.message}
              valid={!errors.username && touchedFields.username}
              {...register("username")}
            />
            <Input
              id="password"
              type="password"
              title="Please enter your password!"
              label="Password"
              srOnlyLabel
              autoComplete="current-password"
              placeholder="Password"
              borderless
              error={errors.password?.message}
              valid={!errors.password && touchedFields.password}
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
              Continue
            </Button>
          </>
        )}
      </Form>
    </SigningPageLayout>
  );
}