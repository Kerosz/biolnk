import isEmail from "validator/lib/isEmail";
import { create, test, enforce, only, optional } from "vest";
import { AccountGeneralDto, ChangePassowrdDto } from "~/types";

export const ACCOUNT_GENERAL_SCHEMA: any = create(
  ({ email, full_name, username }: AccountGeneralDto, currentField: string) => {
    only(currentField);
    optional({ full_name: () => !full_name });

    enforce.extend({ isEmail });

    // Username validation
    test("username", "Username must not be empty!", () => {
      enforce(username).isNotBlank();
    });
    test("username", "Username must be at least 3 characters long!", () => {
      enforce(username).longerThanOrEquals(3);
    });
    test("username", "Username must be at most 18 characters long!", () => {
      enforce(username).shorterThanOrEquals(18);
    });
    test(
      "username",
      "Username must be lowercase and no special characters!",
      () => {
        enforce(username).matches(/^[a-z0-9.\-_]+$/);
      }
    );

    // Email validation
    test("email", "Email address must not be empty!", () => {
      enforce(email).isNotBlank();
    });
    test("email", "Email must be a valid email address!", () => {
      enforce(email).isEmail();
    });

    // Url validation
    test("full_name", "Name must not be empty!", () => {
      enforce(full_name).isNotBlank();
    });
    test("full_name", "Name must be at least a character long!", () => {
      enforce(full_name).longerThanOrEquals(3);
    });
    test("full_name", "Name must be at most 50 characters long!", () => {
      enforce(full_name).shorterThanOrEquals(50);
    });
  }
);

export const CHANGE_PASSWORD_SCHEMA: any = create(
  (
    { old_password, new_password, confirm_password }: ChangePassowrdDto,
    currentField: string
  ) => {
    only(currentField);

    // Password validation
    test("new_password", "Password must not be empty!", () => {
      enforce(new_password).isNotBlank();
    });
    test("new_password", "Password must be at least 8 characters long!", () => {
      enforce(new_password).longerThanOrEquals(8);
    });
    test("new_password", "Password must be at most 40 characters long!", () => {
      enforce(new_password).shorterThanOrEquals(40);
    });
    test("new_password", "Password must contain one special character!", () => {
      enforce(new_password).matches(/[*@!#%&()^~{}]+/);
    });
    test(
      "new_password",
      "Password must contain at least one uppercase character!",
      () => {
        enforce(new_password).matches(/[A-Z]+/);
      }
    );
    test(
      "new_password",
      "Password must contain at least one lowercase character!",
      () => {
        enforce(new_password).matches(/[a-z]+/);
      }
    );
    test("new_password", "Password must contain at least one number!", () => {
      enforce(new_password).matches(/[0-9]+/);
    });
  }
);
