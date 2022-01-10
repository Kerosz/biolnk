import Form from "../common/Form";
import { Input, Flex, Button } from "@biolnk/gamut";
import { STATS_GA_SCHEMA } from "~/data/validations";
import type { FC } from "react";
import type { StatsGADto } from "~/types";

export interface StatsGAFormProps {
  currentGATrackingId: string | null;
}

const StatsGAForm: FC<StatsGAFormProps> = ({ currentGATrackingId }) => {
  const DEFAULT_FORM_VALUES: StatsGADto = {
    google_analytics_id: currentGATrackingId ?? "",
  };

  const handleGAUpdate = (formData: StatsGADto) => {
    console.log(formData);
  };

  return (
    <Form<StatsGADto>
      onSubmit={handleGAUpdate}
      defaultValues={DEFAULT_FORM_VALUES}
      validationSchema={STATS_GA_SCHEMA}
      resetOnSubmit
      resetOptions={{ keepValues: true }}
    >
      {({
        register,
        formState: { errors, isSubmitting, isValid, isDirty },
        control,
      }) => {
        return (
          <>
            <Input
              id="google_analytics_id"
              type="text"
              title="Please enter your GA Tracking ID!"
              label="Tracking ID"
              srOnlyLabel
              autoComplete="off"
              placeholder="G-XXXXXXXXXX"
              descriptionText="Automatically measure interactions and content and get the data directly in your Google Analytics Reports"
              borderless
              error={errors.google_analytics_id?.message}
              {...register("google_analytics_id")}
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
        );
      }}
    </Form>
  );
};

export default StatsGAForm;
