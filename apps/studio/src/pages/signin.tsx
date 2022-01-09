import Link from "~components/common/Link";
import Form from "~components/common/Form";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { Button, Input } from "@biolnk/gamut";
import { CenteredPageLayout } from "~/components/layouts";
import { useSupabase } from "~/lib/supabase";
import { SIGNIN_SCHEMA } from "~/data/validations";
import type { SignInDto } from "~/types";

function SignInPage() {
  const DEFAULT_FORM_VALUES: SignInDto = {
    username: "",
    password: "",
  };

  const { signInWithEmail } = useSupabase();

  const handleSignIn = async (formData: SignInDto) => {
    await signInWithEmail(formData);
  };

  return (
    <CenteredPageLayout
      title="Sign In"
      subTitle="Free forever. No payment needed."
      socialBtnText="Continue"
      footer={
        <>
          Don't have an account?{" "}
          <Link url="/signup" className="font-medium text-normalTextHover">
            Sign Up
          </Link>
        </>
      }
      seoOptions={{
        title: "Sign In",
        canonical: "https://app.biolnk.me/signin",
      }}
    >
      <Form<SignInDto>
        onSubmit={handleSignIn}
        defaultValues={DEFAULT_FORM_VALUES}
        validationSchema={SIGNIN_SCHEMA}
        resetOnSubmit
      >
        {({
          register,
          formState: { errors, isSubmitting, isValid, isDirty },
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
    </CenteredPageLayout>
  );
}

export default withAuthCheck(SignInPage);
