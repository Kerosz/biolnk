import { create, test, enforce, only } from "vest";
import { SignInDto } from "~/types";

export const SIGNIN_SCHEMA: any = create(
  (data: SignInDto, currentField: string) => {
    only(currentField);

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

    // Password validation
    test("password", "Password must not be empty!", () => {
      enforce(data.password).isNotBlank();
    });
    test("password", "Password must be at least 8 characters long!", () => {
      enforce(data.password).longerThanOrEquals(8);
    });
    test("password", "Password must be at most 40 characters long!", () => {
      enforce(data.password).shorterThanOrEquals(40);
    });
    test("password", "Password must contain one special character!", () => {
      enforce(data.password).matches(/[*@!#%&()^~{}]+/);
    });
    test(
      "password",
      "Password must contain at least one uppercase character!",
      () => {
        enforce(data.password).matches(/[A-Z]+/);
      }
    );
    test(
      "password",
      "Password must contain at least one lowercase character!",
      () => {
        enforce(data.password).matches(/[a-z]+/);
      }
    );
    test("password", "Password must contain at least one number!", () => {
      enforce(data.password).matches(/[0-9]+/);
    });
  }
);
