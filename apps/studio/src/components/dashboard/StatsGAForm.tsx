import Form from "../common/Form";
import useUpdatePage from "~/utils/hooks/mutations/useUpdatePage";
import { Input, Flex, Button } from "@biolnk/gamut";
import { STATS_GA_SCHEMA } from "~/data/validations";
import type { FC } from "react";
import type { PageWithMetadata } from "@biolnk/core";
import type { StatsGADto } from "~/types";
import Skeleton from "react-loading-skeleton";

export interface StatsGAFormProps {
  page: PageWithMetadata;
}

const StatsGAForm: FC<StatsGAFormProps> = ({ page }) => {
  const DEFAULT_FORM_VALUES: StatsGADto = {
    google_analytics_id: page?.integrations.google_analytics_id ?? "",
  };

  const { mutate, isLoading } = useUpdatePage();

  const handleGAUpdate = ({ google_analytics_id }: StatsGADto) => {
    const data = {
      integrations: { google_analytics_id },
    };
    mutate({ data, userId: page?.user.id });
  };

  if (!page) {
    return (
      <Flex layout="vertical" align="end">
        <Flex layout="vertical" className="w-full mt-3">
          <Skeleton height={40} />
          <Skeleton containerClassName="mt-1.5" height={15} />
        </Flex>
        <Skeleton containerClassName="mt-3" width={76} height={38} />
      </Flex>
    );
  }

  return (
    <Form<StatsGADto>
      onSubmit={handleGAUpdate}
      defaultValues={DEFAULT_FORM_VALUES}
      validationSchema={STATS_GA_SCHEMA}
      resetOnSubmit
      resetOptions={{ keepValues: true }}
    >
      {({ register, formState: { errors, isValid, isDirty } }) => {
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
                loading={isLoading}
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
