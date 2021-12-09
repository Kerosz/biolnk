import Image from "next/image";
import { useState } from "react";
import Icon from "~/components/ui/Icon";
import Link from "~/components/common/Link";
import Form from "~/components/common/Form";
import Logo from "../../public/biolnk.png";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Facebook, Twitter } from "react-feather";
import { SIGNUP_SCHEMA } from "~/data/validations";

/** @TODO Move typings into separate folder */
type SignUpDto = {
  email: string;
  username: string;
  password: string;
};

/**
 * @TODO Hook up supabase auth to the signup page
 */
export default function SignUpPage() {
  const DEFAULT_FORM_VALUES: SignUpDto = {
    email: "",
    username: "",
    password: "",
  };

  const handleSignUp = (formData: SignUpDto) => console.log(formData);

  return (
    <div className="min-h-full flex flex-col items-center justify-center sm:py-12 py-8 px-3 sm:px-6 lg:px-8">
      <Image
        src={Logo}
        height={85}
        width={52}
        placeholder="blur"
        alt="Biolnk.me branding"
      />
      <div className="bg-white rounded-lg max-w-[410px] w-full sm:px-8 px-4 py-6 mt-8">
        {/* Header */}
        <h1 className="text-normalTextHover text-xl font-semibold pb-2">
          Sign Up
        </h1>
        <p className="text-sm font-normal text-mauveDark-600 pb-6">
          Free forever. No payment needed.
        </p>

        {/* Email Sign Up Form */}
        <Form<SignUpDto>
          onSubmit={handleSignUp}
          defaultValues={DEFAULT_FORM_VALUES}
          validationSchema={SIGNUP_SCHEMA}
          resetOnSubmit
        >
          {({
            register,
            formState: {
              errors,
              isSubmitting,
              touchedFields,
              isValid,
              isDirty,
            },
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
              <span className="mt-3 block text-xs text-mauve-900 tracking-wide">
                By creating an account you are agreeing to our Terms and
                Conditions and Privacy Policy
              </span>
            </>
          )}
        </Form>

        {/* Devider */}
        <div className="border-b border-mauve-400 w-full flex justify-center mt-6 mb-11">
          <p className="transform translate-y-2.5 uppercase bg-white max-w-max px-4 text-sm text-mauve-800 font-normal select-none">
            or
          </p>
        </div>

        {/* Social Sign Up */}
        <div className="space-y-3.5">
          <Button size="md" block icon={<Icon icon={Twitter} fill="#1DA1F2" />}>
            Sign Up With Twitter
          </Button>

          <Button
            size="md"
            block
            icon={<Icon icon={Facebook} fill="#4267B2" />}
          >
            Sign Up With Facebook
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white rounded-lg max-w-[410px] w-full sm:px-8 px-4 py-5 mt-7 text-center">
        <span className="text-normalText tracking-wide">
          Have an account?{" "}
          <Link url="/signin" className="font-medium text-normalTextHover">
            Sign in
          </Link>
        </span>
      </div>
    </div>
  );
}
