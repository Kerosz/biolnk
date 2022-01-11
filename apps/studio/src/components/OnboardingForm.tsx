import Skeleton from "react-loading-skeleton";
import Form from "~/components/common/Form";
import { FC, ChangeEvent, useState } from "react";
import {
  Avatar,
  BaseIcon,
  Button,
  Camera,
  Flex,
  Input,
  X,
} from "@biolnk/gamut";
import { PAGE_PROFILE_SCHEMA } from "~/data/validations";
import type { User } from "@biolnk/core";
import type { OnboardingDto } from "~/types";

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

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const avatarAlt = `${user?.username} profile`;

  function handleOnboardingProcess(formData: OnboardingDto) {
    console.log(formData);
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
      className="w-6 h-6 rounded-full !bg-black border-2 border-mauve-50 absolute top-0 right-0 transform-gpu -translate-x-[45%] flex items-center justify-center"
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
      validationSchema={PAGE_PROFILE_SCHEMA}
      resetOnSubmit
      resetOptions={{ keepValues: true }}
    >
      {({ register, formState: { errors, isValid, isSubmitting } }) => (
        <>
          <Flex className="flex-col items-center">
            <label
              htmlFor="file_upload"
              className="relative cursor-pointer max-w-max mb-1.5"
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
                <Flex
                  align="center"
                  justify="center"
                  className="w-20 h-20 bg-gradient-avatar text-crimson-800 border border-dashed border-crimson-800 rounded-full"
                >
                  <BaseIcon icon={Camera} size="xl" />
                </Flex>
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
                label="Full Name"
                srOnlyLabel
                autoComplete="name"
                placeholder="Full Name"
                borderless
                error={errors.full_name?.message}
                {...register("full_name")}
              />

              {previewAvatar && (
                <span className="block sm:absolute text-sm mt-2 text-mauve-950">
                  Preview mode, save now!
                </span>
              )}
            </div>
          </Flex>

          <Button
            type="submit"
            className="mt-6"
            variant="primary"
            size="md"
            uppercase
            block
            loading={isSubmitting}
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
