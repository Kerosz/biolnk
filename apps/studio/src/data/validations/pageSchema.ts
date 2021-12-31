import { create, test, enforce, only, optional } from "vest";
import { PageProfileDto, PageSeoDto } from "~/types";

export const PAGE_SEO_SCHEMA: any = create(
  (data: PageSeoDto, currentField: string) => {
    only(currentField);

    optional({
      seo_title: () => !data.seo_title,
      seo_description: () => !data.seo_description,
    });

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

    // Biography validation
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

export const PAGE_PROFILE_SCHEMA: any = create(
  (data: PageProfileDto, currentField: string) => {
    only(currentField);

    optional({
      title: () => !data.title,
      biography: () => !data.biography,
    });

    // age title validation
    test("title", "Page title must not be empty!", () => {
      enforce(data.title).isNotBlank();
    });
    test("title", "Page title must be at least 3 characters long!", () => {
      enforce(data.title).longerThanOrEquals(3);
    });
    test("title", "Page title must be at most 60 characters long!", () => {
      enforce(data.title).shorterThanOrEquals(60);
    });

    // Page description validation
    test("biography", "Biography must not be empty!", () => {
      enforce(data.biography).isNotBlank();
    });
    test("biography", "Biography must be at least 20 characters long!", () => {
      enforce(data.biography).longerThanOrEquals(20);
    });
    test("biography", "Biography must be at most 180 characters long!", () => {
      enforce(data.biography).shorterThanOrEquals(120);
    });
  }
);
