import Form from "../common/Form";
import useUpdateUser from "~/utils/hooks/mutations/useUpdateUser";
import {
  AlertCircle,
  BaseIcon,
  Button,
  Flex,
  Heading,
  Input,
  makeToast,
  Text,
} from "@biolnk/ui";
import { useSupabase } from "~/lib/supabase";
import { doesUsernameExist } from "~/services/supabase";
import { ACCOUNT_GENERAL_SCHEMA } from "~/data/validations";
import { FC } from "react";
import { AccountGeneralDto, PageWithMetadata } from "~/types";

export interface GeneralSectionProps {
  user: PageWithMetadata["user"] | null;
}

const GeneralSection: FC<GeneralSectionProps> = ({ user }) => {
  const DEFAULT_FORM_VALUES: AccountGeneralDto = {
    email: user?.email,
    full_name: user?.full_name,
    username: user?.username,
  };

  const { authUser } = useSupabase();
  const { mutate, isLoading } = useUpdateUser();

  const handleAccountUpdate = async (formData: AccountGeneralDto) => {
    const updateDto = {
      full_name: formData.full_name,
    } as AccountGeneralDto;
    const setEmail = formData.email !== user?.email;

    // if curr username is different from new username -> add
    if (formData.username !== user?.username) {
      // check db to see if the new username doesn't already exist
      const checkUsername = await doesUsernameExist(formData.username);

      if (checkUsername) {
        makeToast({
          duration: 2500,
          kind: "error",
          title: "Error",
          message: "Username already exists!",
        });

        return;
      }
      updateDto.username = formData.username;
    }

    mutate({
      data: updateDto,
      userId: user?.id,
      newEmail: setEmail ? formData.email : null,
    });
  };

  const emailNotConfirmed = !!authUser?.new_email;

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
      <div className={emailNotConfirmed ? "block" : "hidden"}>
        <Flex
          role="alert"
          align="center"
          className="bg-yellow-200 shadow rounded-md px-4 py-2.5 mb-5 text-yellow-950"
        >
          <BaseIcon icon={AlertCircle} className="mr-2" />
          <span>
            You must confirm the changes on both your old and new email address.
          </span>
        </Flex>
      </div>

      <Form<AccountGeneralDto>
        onSubmit={handleAccountUpdate}
        defaultValues={DEFAULT_FORM_VALUES}
        validationSchema={ACCOUNT_GENERAL_SCHEMA}
        resetOnSubmit
        resetOptions={{ keepValues: true }}
        className="space-y-6 text-mauveDark-950"
      >
        {({ register, formState: { errors, isValid, isDirty } }) => (
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

export default GeneralSection;
