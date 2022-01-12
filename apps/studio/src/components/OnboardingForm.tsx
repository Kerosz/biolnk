import Skeleton from "react-loading-skeleton";
import Form from "~/components/common/Form";
import useUpdateUser from "~/utils/hooks/mutations/useUpdateUser";
import useCreateNewLink from "~/utils/hooks/mutations/useCreateNewLink";
import { FC, ChangeEvent, useState } from "react";
import { useRouter } from "next/router";
import {
  Avatar,
  BaseIcon,
  Button,
  Camera,
  Flex,
  Heading,
  Input,
  makeToast,
  X,
} from "@biolnk/gamut";
import { useSupabase } from "~/lib/supabase";
import { doesUsernameExist } from "~/services/supabase";
import { Routes } from "~/data/enums";
import { ONBOARDING_SCHEMA } from "~/data/validations";
import type { User } from "@biolnk/core";
import type { CreateLinkDto, OnboardingDto } from "~/types";

export interface OnboardingFormProps {
  user: User;
}

const OnboardingForm: FC<OnboardingFormProps> = ({ user }) => {
  const DEFAULT_FORM_VALUES: OnboardingDto = {
    full_name: "",
    link_title: "",
    link_url: "",
    username: user?.username,
  };
  const { user: authUser } = useSupabase();
  const { replace } = useRouter();
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const userUpdate = useUpdateUser();
  const createLink = useCreateNewLink();

  const avatarAlt = `${user?.username} profile`;
  /**
   * when the provider is 'google' or 'facebook' we generate a random username
   * so we want the user to be able to change it to a custom one in this screen
   * NOTE: identities is an array of multiple providers so we need to check each one
   * and return a boolean value
   */
  const allowUsernameChange = authUser.identities.some(
    (i) => i.provider === "google" || i.provider === "facebook"
  );

  async function handleOnboardingProcess(formData: OnboardingDto) {
    try {
      const updateUserDto = {
        username: formData.username,
      } as OnboardingDto;

      if (formData.full_name) {
        updateUserDto.full_name = formData.full_name;
      }

      if (formData.username !== user?.username) {
        const itExists = await doesUsernameExist(formData.username);

        if (itExists) {
          makeToast({
            duration: 2500,
            kind: "error",
            title: "Error",
            message: "Username already exists!",
          });

          return;
        }
      }

      if (updateUserDto || avatarFile) {
        await userUpdate.mutateAsync({
          data: updateUserDto,
          userId: user?.id,
          newAvatar: avatarFile ? avatarFile : null,
        });

        setPreviewAvatar(null);
        setAvatarFile(null);
      }

      if (formData.link_title && formData.link_url) {
        const createLinkDto = {
          title: formData.link_title,
          url: formData.link_url,
        } as CreateLinkDto;

        await createLink.mutateAsync({ data: createLinkDto });
      }

      replace(Routes.DASHBOARD);
    } catch (error) {
      makeToast({
        duration: 2500,
        kind: "error",
        title: "Error",
        message: error.message,
      });
    }
  }

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0];
    const reader = new FileReader();

    setAvatarFile(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readyState
      if (reader.readyState === 2) {
        setPreviewAvatar(reader.result as string);
      }
    };
  }

  async function handleAvatarRemove() {
    if (previewAvatar) {
      setPreviewAvatar(null);
      return;
    }

    return null;
  }

  const AvatarRemoveButton = () => (
    <button
      type="button"
      aria-label="Remove"
      title="Remove"
      className="w-5 h-5 rounded-full !bg-black border-2 border-mauve-50 absolute top-0 right-0 transform-gpu -translate-x-[20%] flex items-center justify-center"
      onClick={handleAvatarRemove}
    >
      <BaseIcon icon={X} size="xs" stroke="white" strokeWidth={3} />
    </button>
  );

  if (!user) {
    return (
      <Flex layout="vertical" align="end">
        <Flex className="flex-col sm:flex-row w-full sm:mt-3">
          <Skeleton circle width={129} height={129} />
          <Flex layout="vertical" className="w-full mt-3.5 sm:mt-0">
            <Skeleton containerClassName="sm:ml-5" height={40} />
            <Skeleton containerClassName="sm:ml-5 mt-3" height={74} />
          </Flex>
        </Flex>
        <Skeleton containerClassName="mt-3" width={76} height={38} />
      </Flex>
    );
  }

  return (
    <Form<OnboardingDto>
      onSubmit={handleOnboardingProcess}
      defaultValues={DEFAULT_FORM_VALUES}
      validationSchema={ONBOARDING_SCHEMA}
      resetOnSubmit
      resetOptions={{ keepValues: true }}
    >
      {({ register, formState: { errors, isValid } }) => (
        <>
          <Flex className="flex-col items-center">
            <label
              htmlFor="file_upload"
              className="relative cursor-pointer max-w-max mb-1"
            >
              {previewAvatar ? (
                <Avatar
                  src={previewAvatar}
                  title={avatarAlt}
                  alt={avatarAlt}
                  fallback={user?.username}
                  size="lg"
                >
                  <AvatarRemoveButton />
                </Avatar>
              ) : (
                <div
                  className="w-20 h-20 bg-gradient-avatar text-crimson-800 border border-dashed border-crimson-800 rounded-full flex items-center justify-center"
                  title={avatarAlt}
                >
                  <BaseIcon icon={Camera} size="xl" />
                </div>
              )}
            </label>

            <div className="flex-grow w-full">
              <Input
                id="file_upload"
                name="file_upload"
                accept="image/jpeg,image/png"
                type="file"
                className="sr-only"
                onChange={handleImageUpload}
              />

              <Input
                id="full_name"
                type="text"
                title="Please enter your legal name!"
                label="Your Name"
                srOnlyLabel
                autoComplete="name"
                placeholder="Your Name"
                borderless
                error={errors.full_name?.message}
                {...register("full_name")}
              />

              {allowUsernameChange && (
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
                  descriptionText={`We generated the following username for you ${user?.username} you can change it to a custom one.`}
                  borderless
                  error={errors.username?.message}
                  {...register("username")}
                />
              )}

              <Heading as="h2" className="font-semibold pb-4 mt-12">
                Add your first Biolnk
              </Heading>

              <Input
                id="link_title"
                type="text"
                title="Please enter your link title!"
                label="title"
                srOnlyLabel
                placeholder="My twitter"
                borderless
                error={errors.link_title?.message}
                {...register("link_title")}
              />
              <Input
                id="link_url"
                type="text"
                title="Please enter your link url!"
                label="URL"
                srOnlyLabel
                placeholder="https://twitter.com/yourname"
                autoComplete="url"
                borderless
                error={errors.link_url?.message}
                {...register("link_url")}
              />
            </div>
          </Flex>

          <Button
            type="submit"
            className="mt-6"
            variant="primary"
            size="md"
            uppercase
            block
            loading={userUpdate.isLoading || createLink.isLoading}
            disabled={!isValid && !avatarFile}
          >
            Continue
          </Button>
        </>
      )}
    </Form>
  );
};

export default OnboardingForm;
