import Form from "~/components/common/Form";
import useUpdatePage from "~/utils/hooks/mutations/useUpdatePage";
import useUpdateUser from "~/utils/hooks/mutations/useUpdateUser";
import { FC, ChangeEvent, memo, useState } from "react";
import { Avatar, Button, Flex, Input, Textarea } from "@biolnk/ui";
import { PAGE_PROFILE_SCHEMA } from "~/data/validations";
import { PageProfileDto, PageWithMetadata } from "~/types";

export interface PageProfileFormProps {
  page: PageWithMetadata;
}

const PageProfileForm: FC<PageProfileFormProps> = ({ page }) => {
  const DEFAULT_FORM_VALUES: PageProfileDto = {
    title: page.title,
    biography: page.user.biography,
  };

  const { mutateAsync: pageMutate } = useUpdatePage();
  const { mutateAsync: userMutate } = useUpdateUser();

  const [previewImage, setPreviewImage] = useState(null);

  const handleSeoUpdate = async ({ title, biography }: PageProfileDto) => {
    // If any of the fields are different from the existing values -> send req
    if (title !== page.title) {
      await pageMutate({ data: { title }, userId: page.user.id });
    }
    if (biography !== page.user.biography) {
      await userMutate({ data: { biography }, userId: page.user.id });
    }
  };

  function handleImageUpload(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // setUploadedImage(file);

    reader.readAsDataURL(file);
    reader.onload = () => {
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readyState
      if (reader.readyState === 2) {
        setPreviewImage(reader.result);
      }
    };
  }

  const avatarAlt = `${page.user.username} profile`;

  return (
    <Form<PageProfileDto>
      onSubmit={handleSeoUpdate}
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
              {previewImage ? (
                <Avatar
                  src={previewImage}
                  alt={avatarAlt}
                  fallback={page.user.username}
                  size="xl"
                />
              ) : (
                <Avatar
                  alt={avatarAlt}
                  fallback={page.user.username}
                  size="xl"
                />
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

              {previewImage && (
                <span className="block sm:absolute text-sm mt-2 text-mauve-950">
                  Image upload is disabled
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
              disabled={!isDirty || !isValid}
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
