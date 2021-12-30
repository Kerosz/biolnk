import { create, test, enforce, only } from "vest";
import { SeoDto } from "~/types";

export const PAGE_SEO_SCHEMA: any = create(
  (data: SeoDto, currentField: string) => {
    only(currentField);

    // age title validation
    test("seo_title", "Page title must not be empty!", () => {
      enforce(data.seo_title).isNotBlank();
    });
    test("seo_title", "Page title must be at least 10 characters long!", () => {
      enforce(data.seo_title).longerThanOrEquals(10);
    });
    test("seo_title", "Page title must be at most 55 characters long!", () => {
      enforce(data.seo_title).shorterThanOrEquals(55);
    });

    // Page description validation
    test("seo_description", "Page description must not be empty!", () => {
      enforce(data.seo_description).isNotBlank();
    });
    test(
      "seo_description",
      "Page description must be at least 40 characters long!",
      () => {
        enforce(data.seo_description).longerThanOrEquals(40);
      }
    );
    test(
      "seo_description",
      "Page description must be at most 180 characters long!",
      () => {
        enforce(data.seo_description).shorterThanOrEquals(180);
      }
    );
  }
);
