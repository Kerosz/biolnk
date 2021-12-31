import Form from "~/components/common/Form";
import useUpdatePage from "~/utils/hooks/mutations/useUpdatePage";
import { FC, memo } from "react";
import { Button, Flex, Input } from "@biolnk/ui";
import { PAGE_SEO_SCHEMA } from "~/data/validations";
import { PageSeoDto, PageWithMetadata } from "~/types";

export interface PageSeoFormProps {
  page: PageWithMetadata;
}

const PageSeoForm: FC<PageSeoFormProps> = ({ page }) => {
  const DEFAULT_FORM_VALUES: PageSeoDto = {
    seo_title: page.seo_title,
    seo_description: page.seo_description,
  };

  const { mutateAsync } = useUpdatePage();

  const handleSeoUpdate = async (formData: PageSeoDto) => {
    // If any of the fields are different from the existing values -> send req
    if (
      page.seo_title !== formData.seo_title ||
      page.seo_description !== formData.seo_description
    ) {
      await mutateAsync({ data: formData, userId: page.user.id });
    }
  };

  return (
    <Form<PageSeoDto>
      onSubmit={handleSeoUpdate}
      defaultValues={DEFAULT_FORM_VALUES}
      validationSchema={PAGE_SEO_SCHEMA}
    >
      {({
        register,
        formState: { errors, isSubmitting, touchedFields, isValid, isDirty },
      }) => (
        <>
          <Input
            id="seo_title"
            type="text"
            title="Please enter your page SEO title!"
            label="SEO Title"
            srOnlyLabel
            autoComplete="on"
            placeholder="SEO Title"
            borderless
            error={errors.seo_title?.message}
            valid={!errors.seo_title && touchedFields.seo_title}
            {...register("seo_title")}
          />
          <Input
            id="seo_description"
            type="text"
            title="Please enter your page SEO description!"
            label="SEO Description"
            srOnlyLabel
            autoComplete="off"
            placeholder="SEO Description"
            borderless
            error={errors.seo_description?.message}
            valid={!errors.seo_description && touchedFields.seo_description}
            {...register("seo_description")}
          />
          <Flex justify="end" className="w-full">
            <Button
              type="submit"
              className="mt-9"
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

export default memo(PageSeoForm);
