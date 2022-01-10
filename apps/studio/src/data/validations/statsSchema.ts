import { create, test, enforce, only } from "vest";
import { StatsGADto } from "~/types";

export const STATS_GA_SCHEMA: any = create(
  ({ google_analytics_id }: StatsGADto, currentField: string) => {
    only(currentField);

    test(
      "google_analytics_id",
      "Google Analytics ID must not be empty!",
      () => {
        enforce(google_analytics_id).isNotBlank();
      }
    );
    test("google_analytics_id", "Google Analytics ID is invalid!", () => {
      enforce(google_analytics_id).matches(
        /^[A-Z][A-Z0-9]?-[A-Z0-9]{4,10}(?:\-[1-9]\d{0,3})?$/
      );
    });
  }
);
