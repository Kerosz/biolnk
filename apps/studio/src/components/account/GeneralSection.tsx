import Form from "../common/Form";
import { Button, Flex, Heading, Input, Text } from "@biolnk/ui";
import { ACCOUNT_GENERAL_SCHEMA } from "~/data/validations";
import { AccountGeneralDto, PageWithMetadata } from "~/types";
import { FC } from "react";

const GeneralSection: FC<PageWithMetadata["user"]> = ({
  email,
  full_name,
  username,
}) => {
  const DEFAULT_FORM_VALUES: AccountGeneralDto = {
    email: email,
    full_name: full_name,
    username: username,
  };

  const handleAccountUpdate = () => {
    return null;
  };

  return (
    <section
      id="general"
      className="bg-mauve-50 rounded pt-4 pb-5 px-6 shadow-sm"
    >
      {/* Title */}
      <Heading as="h2" size="sm" className="pb-1 font-medium">
        General
      </Heading>
      <Text size="sm" variant="light" className="mb-12">
        Your account information
      </Text>

      {/* Content */}
      <Form<AccountGeneralDto>
        onSubmit={handleAccountUpdate}
        defaultValues={DEFAULT_FORM_VALUES}
        validationSchema={ACCOUNT_GENERAL_SCHEMA}
        resetOnSubmit
        className="space-y-6 text-mauveDark-950"
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
              layout="vertical"
              leftAddon="biolnk.me/"
              tightAddonSpace
              autoComplete="username"
              placeholder="personal"
              borderless
              error={errors.username?.message}
              {...register("username")}
            />

            <Input
              id="email-address"
              type="email"
              title="Please enter a valid email address!"
              label="Email address"
              layout="vertical"
              autoComplete="email"
              placeholder="jondoe@biolnk.me"
              borderless
              error={errors.email?.message}
              {...register("email")}
            />

            <Input
              id="full-name"
              type="text"
              title="Please enter your legal name!"
              label="Full Name"
              layout="vertical"
              autoComplete="name"
              placeholder="Jon Doe"
              borderless
              error={errors.full_name?.message}
              {...register("full_name")}
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

export default GeneralSection;
