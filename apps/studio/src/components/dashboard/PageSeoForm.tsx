import Skeleton from "react-loading-skeleton";
import Form from "~/components/common/Form";
import useUpdatePage from "~/utils/hooks/mutations/useUpdatePage";
import { FC, memo } from "react";
import { Button, Flex, Input, Textarea } from "@biolnk/gamut";
import { PAGE_SEO_SCHEMA } from "~/data/validations";
import type { PageWithMetadata } from "@biolnk/core";
import type { PageSeoDto } from "~/types";

export interface PageSeoFormProps {
  page: PageWithMetadata;
}

const PageSeoForm: FC<PageSeoFormProps> = ({ page }) => {
  const DEFAULT_FORM_VALUES: PageSeoDto = {
    seo_title: page?.seo_title,
    seo_description: page?.seo_description,
  };

  const { mutateAsync } = useUpdatePage();

  const handleSeoUpdate = async (formData: PageSeoDto) => {
    // If any of the fields are different from the existing values -> send req
    if (
      page?.seo_title !== formData.seo_title ||
      page?.seo_description !== formData.seo_description
    ) {
      await mutateAsync({ data: formData, userId: page?.user.id });
    }
  };

  if (!page) {
    return (
      <Flex layout="vertical" align="end">
        <Flex layout="vertical" className="w-full mt-3">
          <Skeleton height={40} />
          <Skeleton containerClassName="mt-3" height={74} />
        </Flex>
        <Skeleton containerClassName="mt-3" width={76} height={38} />
      </Flex>
    );
  }

  return (
    <Form<PageSeoDto>
      onSubmit={handleSeoUpdate}
      defaultValues={DEFAULT_FORM_VALUES}
      validationSchema={PAGE_SEO_SCHEMA}
      resetOnSubmit
      resetOptions={{ keepValues: true }}
    >
      {({
        register,
        formState: { errors, isSubmitting, isValid, isDirty },
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
            {...register("seo_title")}
          />
          <Textarea
            id="seo_description"
            title="Please enter your page SEO description!"
            label="SEO Description"
            srOnlyLabel
            autoComplete="off"
            placeholder="SEO Description"
            rows={2}
            borderless
            error={errors.seo_description?.message}
            {...register("seo_description")}
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

export default memo(PageSeoForm);
