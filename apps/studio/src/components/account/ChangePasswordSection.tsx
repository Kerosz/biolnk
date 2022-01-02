import Form from "../common/Form";
import { Button, Flex, Heading, Input, Text } from "@biolnk/ui";
import { ChangePassowrdDto } from "~/types";
import { CHANGE_PASSWORD_SCHEMA } from "~/data/validations";
import { FC } from "react";

const ChangePasswordSection: FC = () => {
  const DEFAULT_FORM_VALUES: ChangePassowrdDto = {
    old_password: "",
    new_password: "",
    confirm_password: "",
  };

  const handlePasswordChange = () => {
    return null;
  };

  return (
    <section
      id="change-password"
      className="bg-mauve-50 rounded pt-4 pb-5 px-6 shadow-sm -translate-y-1"
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
      <Form<ChangePassowrdDto>
        onSubmit={handlePasswordChange}
        defaultValues={DEFAULT_FORM_VALUES}
        validationSchema={CHANGE_PASSWORD_SCHEMA}
        resetOnSubmit
        className="space-y-6 text-mauveDark-950"
      >
        {({
          register,
          formState: { errors, isSubmitting, touchedFields, isValid, isDirty },
        }) => (
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
              valid={!errors.old_password && touchedFields.old_password}
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
              valid={!errors.new_password && touchedFields.new_password}
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
              valid={!errors.confirm_password && touchedFields.confirm_password}
              {...register("confirm_password")}
            />

            {isDirty && isValid ? (
              <Flex justify="end" className="w-full">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  uppercase
                  loading={isSubmitting}
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
