import React, {
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { makeToast } from "@biolnk/gamut";
import { sbClient } from "./client";
import { Routes } from "~/data/enums/routes";
import {
  createUserWithEmailAndPassword,
  getUserByUsername,
} from "~/services/supabase";
import { makeContext } from "@biolnk/core";
import type { Session } from "@supabase/supabase-js";
import type { SignInDto, SignUpDto, AuthUser } from "~/types";

export type SupabaseContextState = {
  user: AuthUser;
  session: Session;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  signUpWithEmail: (signUpDto: SignUpDto) => Promise<void>;
  signInWithEmail: (signInDto: SignInDto) => Promise<void>;
  signInWithTwitter: () => Promise<void>;
  signInWithFacebook: () => Promise<void>;
  signInWithGoogle: () => Promise<void>;
};

export type SupabaseProviderProps = {
  children: ReactNode;
};

const [SupabaseContext, Provider, useSupabase] =
  makeContext<SupabaseContextState>("SupabaseContext");

const SupabaseProvider = (props: SupabaseProviderProps) => {
  const [currentSession, setCurrentSession] = useState<Session | null>(
    sbClient.auth.session()
  );
  const router = useRouter();

  const signOut = useCallback(async () => {
    const { error } = await sbClient.auth.signOut();

    if (!error) {
      router.replace(Routes.SIGNIN);

      makeToast({
        duration: 2500,
        kind: "success",
        title: "Logged Out",
        message: "You have successfully logged out of your account!",
      });
    }
  }, []);

  const signInWithEmail = useCallback(
    async ({ username, password }: SignInDto) => {
      try {
        const dbUser = await getUserByUsername(username);

        const { user, error } = await sbClient.auth.signIn({
          email: dbUser.email,
          password,
        });

        if (error) {
          makeToast({
            duration: 2500,
            kind: "error",
            title: "Failed",
            message: error.message,
          });

          return;
        }

        if (user && !error) {
          if (dbUser.onboarding_process) {
            router.replace(Routes.ONBOARDING);
          } else {
            router.replace(Routes.DASHBOARD);
          }

          makeToast({
            duration: 2500,
            kind: "success",
            title: "Logged In",
            message: "You have successfully logged in your account!",
          });
        }
      } catch (_error) {
        makeToast({
          duration: 2500,
          kind: "error",
          title: "Failed",
          message: "Username or password are invalid!",
        });
      }
    },
    []
  );

  const signInWithTwitter = useCallback(async () => {
    const { user, error } = await sbClient.auth.signIn({
      provider: "twitter",
    });

    if (error) {
      makeToast({
        duration: 2500,
        kind: "error",
        title: "Failed",
        message: error.message,
      });

      return;
    }

    if (user && !error) {
      await router.replace(Routes.DASHBOARD);

      makeToast({
        duration: 2500,
        kind: "success",
        title: "Logged In",
        message: "You have successfully logged in your account!",
      });
    }
  }, []);

  const signInWithFacebook = useCallback(async () => {
    const { user, error } = await sbClient.auth.signIn({
      provider: "facebook",
    });

    if (error) {
      makeToast({
        duration: 2500,
        kind: "error",
        title: "Failed",
        message: error.message,
      });

      return;
    }

    if (user && !error) {
      await router.replace(Routes.DASHBOARD);

      makeToast({
        duration: 2500,
        kind: "success",
        title: "Logged In",
        message: "You have successfully logged in your account!",
      });
    }
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const { user, error } = await sbClient.auth.signIn({
      provider: "google",
    });

    if (error) {
      makeToast({
        duration: 2500,
        kind: "error",
        title: "Failed",
        message: error.message,
      });

      return;
    }

    if (user && !error) {
      await router.replace(Routes.DASHBOARD);

      makeToast({
        duration: 2500,
        kind: "success",
        title: "Logged In",
        message: "You have successfully logged in your account!",
      });
    }
  }, []);

  const signUpWithEmail = useCallback(async (signUpDto: SignUpDto) => {
    try {
      await createUserWithEmailAndPassword(signUpDto);

      router
        .replace(Routes.EMAIL_VERIFICATION)
        .then(() => router.push({ query: { to: encodeURI(signUpDto.email) } }));
    } catch (error) {
      makeToast({
        duration: 2500,
        kind: "error",
        title: "Failed",
        message: error.message,
      });
    }
  }, []);

  const isAuthenticated = currentSession?.user.role === "authenticated";
  const authUser = sbClient.auth.user();

  const providerValue: SupabaseContextState = useMemo(
    () => ({
      user: authUser,
      session: currentSession,
      isAuthenticated,
      signOut,
      signUpWithEmail,
      signInWithEmail,
      signInWithTwitter,
      signInWithFacebook,
      signInWithGoogle,
    }),
    [currentSession]
  );

  useEffect(() => {
    const { data } = sbClient.auth.onAuthStateChange((_event, session) => {
      setCurrentSession(session);
    });

    return () => data?.unsubscribe();
  }, [router.pathname]);

  return <Provider {...props} value={providerValue} />;
};

export { SupabaseContext, SupabaseProvider, useSupabase };
