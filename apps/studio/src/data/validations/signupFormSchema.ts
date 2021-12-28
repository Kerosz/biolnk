import isEmail from "validator/lib/isEmail";
import { create, test, enforce, only } from "vest";
import { SignUpDto } from "~/types";

export const SIGNUP_SCHEMA: any = create(
  (data: SignUpDto, currentField: string) => {
    only(currentField);

    enforce.extend({ isEmail });

    // Email validation
    test("email", "Email address must not be empty!", () => {
      enforce(data.email).isNotBlank();
    });
    test("email", "Email must be a valid email address!", () => {
      enforce(data.email).isEmail();
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
    test(
      "username",
      "Username must be lowercase and no special characters!",
      () => {
        enforce(data.username).matches(/^[a-z0-9.\-_]+$/);
      }
    );
    /**
     * Optimizes a network call, making it only after all other tests
     * are passing, and memorizing it's return state
     * @see https://vestjs.dev/docs/writing_tests/advanced_test_features/test.memo */
    // skipWhen(
    //   (res) => res.hasErrors("username"),
    //   () => {
    //     test.memo(
    //       "username",
    //       "Username is already taken!",
    //       async () => {
    //         return await getUserByUsername(data.username) as any;
    //       },
    //       [data.username]
    //     );
    //   }
    // );

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
