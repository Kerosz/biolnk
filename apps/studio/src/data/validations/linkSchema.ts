import isUrl from "validator/lib/isUrl";
import { create, test, enforce, only, optional } from "vest";
import { FormLinkDto } from "~/types";

export const CREATE_LINK_SCHEMA: any = create(
  ({ title, url }: FormLinkDto, currentField: string) => {
    enforce.extend({ isUrl });

    only(currentField);

    // Title validation
    test("title", "Title must not be empty!", () => {
      enforce(title).isNotBlank();
    });
    test("title", "Title must be at least a character long!", () => {
      enforce(title).longerThanOrEquals(1);
    });
    test("title", "Title must be at most 50 characters long!", () => {
      enforce(title).shorterThanOrEquals(50);
    });

    // Url validation
    test("url", "Url must not be empty!", () => {
      enforce(url).isNotBlank();
    });
    test("url", "You must provide a valid URL!", () => {
      enforce(url).isUrl();
    });
  }
);

export const UPDATE_LINK_SCHEMA: any = create(
  ({ title, url }: FormLinkDto, currentField: string) => {
    enforce.extend({ isUrl });

    only(currentField);

    optional({ title: () => !title, url: () => !url });

    // Title validation
    test("title", "Title must be at least a character long!", () => {
      enforce(title).longerThanOrEquals(1);
    });
    test("title", "Title must be at most 50 characters long!", () => {
      enforce(title).shorterThanOrEquals(50);
    });

    // Url validation
    test("url", "You must provide a valid URL!", () => {
      enforce(url).isUrl();
    });
  }
);
