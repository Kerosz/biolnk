import Skeleton from "react-loading-skeleton";
import Form from "~/components/common/Form";
import useUpdatePage from "~/utils/hooks/mutations/useUpdatePage";
import useUpdateUser from "~/utils/hooks/mutations/useUpdateUser";
import { FC, ChangeEvent, memo, useState } from "react";
import {
  Avatar,
  BaseIcon,
  Button,
  Camera,
  Flex,
  Input,
  makeToast,
  Textarea,
  X,
} from "@biolnk/gamut";
import { removeAvatar } from "~/services/supabase";
import { PAGE_PROFILE_SCHEMA } from "~/data/validations";
import type { PageWithMetadata } from "@biolnk/core";
import type { PageProfileDto } from "~/types";

export interface PageProfileFormProps {
  page: PageWithMetadata | undefined;
}

const PageProfileForm: FC<PageProfileFormProps> = ({ page }) => {
  const DEFAULT_FORM_VALUES: PageProfileDto = {
    title: page?.title,
    biography: page?.user.biography,
  };

  const { mutateAsync: userMutate } = useUpdateUser();

  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const avatarAlt = `${page?.user.username} profile`;

  async function handleProfileUpdate({ title, biography }: PageProfileDto) {
    // If any of the fields are different from the existing values -> send req
    const updateDto = {} as PageProfileDto;

    if (title !== page?.title) {
      updateDto.title = title;
    }
    if (biography !== page?.user.biography) {
      updateDto.biography = biography;
    }

    await userMutate({
      data: updateDto,
      userId: page?.user.id,
      newAvatar: avatarFile ? avatarFile : null,
    });
    setPreviewAvatar(null);
    setAvatarFile(null);
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

    if (page.user.avatar_url) {
      try {
        /**
         * Removing the url to get only the storage path
         * https://biolnk-storage-url/avatars/[userId]/[avatarName].png ->
         * -> [userId]/[avatarName].png
         *
         */
        const storageAvatarName = page.user.avatar_url.replace(
          `${process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL}/avatars/`,
          ""
        );

        await removeAvatar(storageAvatarName);
        await userMutate({
          data: { avatar_url: null },
          userId: page?.user.id,
        });
      } catch (error) {
        makeToast({
          duration: 2500,
          kind: "error",
          title: "Error",
          message: error.message,
        });
      }
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

  if (!page) {
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
    <Form<PageProfileDto>
      onSubmit={handleProfileUpdate}
      defaultValues={DEFAULT_FORM_VALUES}
      validationSchema={PAGE_PROFILE_SCHEMA}
      resetOnSubmit
      resetOptions={{ keepValues: true }}
    >
      {({
        register,
        formState: { errors, isSubmitting, touchedFields, isValid, isDirty },
      }) => (
        <>
          <Flex className="flex-col sm:flex-row">
            <label
              htmlFor="file_upload"
              className="relative cursor-pointer max-w-max sm:mr-6 mb-3 sm:mb-0 sm:mt-3"
            >
              {previewAvatar ? (
                <Avatar
                  src={previewAvatar}
                  title={avatarAlt}
                  alt={avatarAlt}
                  fallback={page.user.username}
                  size="xl"
                >
                  <AvatarRemoveButton />
                </Avatar>
              ) : page.user.avatar_url ? (
                <Avatar
                  src={page.user.avatar_url}
                  title={avatarAlt}
                  alt={avatarAlt}
                  fallback={page.user.username}
                  size="xl"
                >
                  {page.user.avatar_url && <AvatarRemoveButton />}
                </Avatar>
              ) : (
                <Flex
                  align="center"
                  justify="center"
                  className="w-32 h-32 bg-gradient-avatar text-crimson-800 border border-dashed border-crimson-800 rounded-full"
                >
                  <BaseIcon icon={Camera} size="2xl" />
                </Flex>
              )}
            </label>

            <div className="flex-grow">
              <Input
                id="file_upload"
                name="file_upload"
                accept="image/jpeg,image/png"
                type="file"
                className="sr-only"
                onChange={handleImageUpload}
              />

              <Input
                id="page_title"
                type="text"
                title="Please enter your page title!"
                label="Page title"
                srOnlyLabel
                autoComplete="on"
                placeholder="Page title"
                borderless
                error={errors.title?.message}
                valid={!errors.title && touchedFields.title}
                {...register("title")}
              />
              <Textarea
                id="page_biography"
                title="Please enter your biography!"
                label="Biography"
                srOnlyLabel
                autoComplete="off"
                placeholder="Enter a bio description"
                rows={2}
                borderless
                error={errors.biography?.message}
                valid={!errors.biography && touchedFields.biography}
                {...register("biography")}
              />

              {previewAvatar && (
                <span className="block sm:absolute text-sm mt-2 text-mauve-950">
                  Preview mode, save now!
                </span>
              )}
            </div>
          </Flex>

          <Flex justify="end" className="w-full">
            <Button
              type="submit"
              className="mt-4"
              variant="primary"
              size="md"
              uppercase
              loading={isSubmitting}
              disabled={!isValid || !avatarFile}
            >
              Save
            </Button>
          </Flex>
        </>
      )}
    </Form>
  );
};

export default memo(PageProfileForm);
