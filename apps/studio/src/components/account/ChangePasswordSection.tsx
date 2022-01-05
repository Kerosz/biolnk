import Form from "../common/Form";
import useChangePassword from "~/utils/hooks/mutations/useChangePassword";
import { Button, Flex, Heading, Input, Text } from "@biolnk/ui";
import { ChangePasswordForm } from "~/types";
import { CHANGE_PASSWORD_SCHEMA } from "~/data/validations";
import { FC } from "react";

const ChangePasswordSection: FC = () => {
  const DEFAULT_FORM_VALUES: ChangePasswordForm = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const { mutate, isLoading } = useChangePassword();

  const handlePasswordChange = async ({
    old_password,
    new_password,
  }: ChangePasswordForm) => {
    mutate({ old_password, new_password });
  };

  return (
    <section
      id="change-password"
      className="bg-mauve-50 rounded pt-4 pb-5 px-4 sm:px-6 shadow-sm -translate-y-1"
    >
      {/* Divider */}
      <div className="w-full h-0.5 bg-mauve-300 mb-6" />

      {/* Title */}
      <Heading as="h2" size="sm" className="pb-1 font-medium">
        Change Password
      </Heading>
      <Text size="sm" variant="light" className="mb-12">
        Request a passowrd change for your account
      </Text>

      {/* Content */}
      <Form<ChangePasswordForm>
        onSubmit={handlePasswordChange}
        defaultValues={DEFAULT_FORM_VALUES}
        validationSchema={CHANGE_PASSWORD_SCHEMA}
        resetOnSubmit
        className="space-y-6 text-mauveDark-950"
      >
        {({ register, formState: { errors, isValid, isDirty } }) => (
          <>
            <Input
              id="old_password"
              type="password"
              title="Please enter your old password!"
              label="Old Password"
              layout="vertical"
              autoComplete="current-password"
              placeholder="************"
              borderless
              error={errors.old_password?.message}
              {...register("old_password")}
            />

            <Input
              id="new_password"
              type="password"
              title="Please enter your old password!"
              label="New Password"
              layout="vertical"
              autoComplete="current-password"
              placeholder="************"
              borderless
              error={errors.new_password?.message}
              {...register("new_password")}
            />

            <Input
              id="confirm_password"
              type="password"
              title="Please enter your old password!"
              label="Confirm Password"
              layout="vertical"
              autoComplete="current-password"
              placeholder="************"
              borderless
              error={errors.confirm_password?.message}
              {...register("confirm_password")}
            />

            {(isDirty && isValid) || isLoading ? (
              <Flex justify="end" className="w-full">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  uppercase
                  loading={isLoading}
                  disabled={!isDirty || !isValid}
                >
                  Save Changes
                </Button>
              </Flex>
            ) : null}
          </>
        )}
      </Form>
    </section>
  );
};

export default ChangePasswordSection;
