import Link from "~components/common/Link";
import Form from "~components/common/Form";
import withAuthCheck from "~/utils/HOC/withAuthCheck";
import { Button, Input, Text } from "@biolnk/gamut";
import { CenteredPageLayout } from "~/components/layouts";
import { useSupabase } from "~/lib/supabase";
import { SIGNUP_SCHEMA } from "~/data/validations";
import type { SignUpDto } from "~/types";

function SignUpPage() {
  const DEFAULT_FORM_VALUES: SignUpDto = {
    email: "",
    username: "",
    password: "",
  };
  const { signUpWithEmail } = useSupabase();

  const handleSignUp = async (formData: SignUpDto) => {
    await signUpWithEmail(formData);
  };

  return (
    <CenteredPageLayout
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
      seoOptions={{ title: "Sign Up", canonical: "https://biolnk.me/signup" }}
    >
      <Form<SignUpDto>
        onSubmit={handleSignUp}
        defaultValues={DEFAULT_FORM_VALUES}
        validationSchema={SIGNUP_SCHEMA}
        resetOnSubmit
      >
        {({
          register,
          formState: { errors, isSubmitting, touchedFields, isValid, isDirty },
        }) => (
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
              valid={!errors.email && touchedFields.email}
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
              valid={!errors.username && touchedFields.username}
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
              Sign Up With Email
            </Button>
            <Text
              as="span"
              size="xs"
              variant="lighter"
              spacing="wide"
              className="mt-3"
            >
              By creating an account you are agreeing to our Terms and
              Conditions and Privacy Policy
            </Text>
          </>
        )}
      </Form>
    </CenteredPageLayout>
  );
}

export default withAuthCheck(SignUpPage);
