import Form from "~/components/common/Form";
import useUpdatePage from "~/utils/hooks/mutations/useUpdatePage";
import useUpdateUser from "~/utils/hooks/mutations/useUpdateUser";
import { FC, memo } from "react";
import { Button, Flex, Input, Textarea } from "@biolnk/ui";
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

  console.log(page);

  const handleSeoUpdate = async ({ title, biography }: PageProfileDto) => {
    // If any of the fields are different from the existing values -> send req
    if (title !== page.title) {
      await pageMutate({ data: { title }, userId: page.user.id });
    }
    if (biography !== page.user.biography) {
      await userMutate({ data: { biography }, userId: page.user.id });
    }
  };

  return (
    <Form<PageProfileDto>
      onSubmit={handleSeoUpdate}
      defaultValues={DEFAULT_FORM_VALUES}
      validationSchema={PAGE_PROFILE_SCHEMA}
    >
      {({
        register,
        formState: { errors, isSubmitting, touchedFields, isValid, isDirty },
      }) => (
        <>
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
            rows={3}
            borderless
            error={errors.biography?.message}
            valid={!errors.biography && touchedFields.biography}
            {...register("biography")}
          />
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
