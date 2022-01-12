import isUrl from "validator/lib/isURL";
import { create, test, enforce, only, optional } from "vest";
import { OnboardingDto } from "~/types";

export const ONBOARDING_SCHEMA: any = create(
  (data: OnboardingDto, currentField: string) => {
    enforce.extend({ isUrl });
    only(currentField);

    optional({
      full_name: () => !data.full_name,
      username: () => !data.username,
      link_title: () => !data.link_title && data.link_url.length < 1,
      link_url: () => !data.link_url && data.link_title.length < 1,
    });

    // Full name validation
    test("full_name", "Name must not be empty!", () => {
      enforce(data.full_name).isNotBlank();
    });
    test("full_name", "Name must be at least a character long!", () => {
      enforce(data.full_name).longerThanOrEquals(3);
    });
    test("full_name", "Name must be at most 50 characters long!", () => {
      enforce(data.full_name).shorterThanOrEquals(50);
    });

    // Username validation
    test("username", "Username must not be empty!", () => {
      enforce(data.username).isNotBlank();
    });
    test("username", "Username must be at least 3 characters long!", () => {
      enforce(data.username).longerThanOrEquals(3);
    });
    test("username", "Username must be at most 18 characters long!", () => {
      enforce(data.username).shorterThanOrEquals(18);
    });
    test("username", "Username must have no special characters!", () => {
      enforce(data.username).matches(/^[a-zA-Z0-9.\-_]+$/);
    });

    // Title validation
    test("link_title", "Title must not be empty!", () => {
      enforce(data.link_title).isNotBlank();
    });
    test("link_title", "Title must be at least a character long!", () => {
      enforce(data.link_title).longerThanOrEquals(1);
    });
    test("link_title", "Title must be at most 50 characters long!", () => {
      enforce(data.link_title).shorterThanOrEquals(50);
    });

    // Url validation
    test("link_url", "Url must not be empty!", () => {
      enforce(data.link_url).isNotBlank();
    });
    test("link_url", "You must provide a valid URL!", () => {
      enforce(data.link_url).isUrl();
    });
  }
);
