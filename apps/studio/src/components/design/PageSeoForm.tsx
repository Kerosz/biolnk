import Form from "~/components/common/Form";
import { FC } from "react";
import { Button, Input } from "@biolnk/ui";
import { PAGE_SEO_SCHEMA } from "~/data/validations";
import { SeoDto } from "~/types";

const PageSeoForm: FC = () => {
  const DEFAULT_FORM_VALUES: SeoDto = {
    seo_title: "",
    seo_description: "",
  };

  const handleSeoUpdate = (formData: SeoDto) => {
    console.log(formData);
  };

  return (
    <Form<SeoDto>
      onSubmit={handleSeoUpdate}
      defaultValues={DEFAULT_FORM_VALUES}
      validationSchema={PAGE_SEO_SCHEMA}
      resetOnSubmit
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
          <Button
            type="submit"
            className="mt-9"
            variant="primary"
            size="md"
            uppercase
            loading={isSubmitting}
            disabled={isDirty && !isValid}
          >
            Save
          </Button>
        </>
      )}
    </Form>
  );
};

export default PageSeoForm;
