import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRouter } from "next/router";
import { isUndefined } from "@biolnk/utils";
import { sbClient } from "./client";
import { Routes } from "~/data/enums/routes";
import {
  createUserWithEmailAndPassword,
  getUserById,
  getUserByUsername,
} from "~/services/supabase";
import type { Session, User } from "@supabase/supabase-js";
import type { SignInDto, SignUpDto } from "~/types";

/**
 * @TODO
 * improve typing of supabase ctx
 */
export const SupabaseContext = createContext<any>({});

export const SupabaseProvider: React.FC = (props) => {
  const [currentSession, setCurrentSession] = useState<Session | null>(
    sbClient.auth.session()
  );
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const router = useRouter();

  const _getUser = async (id: string) => {
    const user = await getUserById(id);
    setCurrentUser(user ?? null);
  };

  const signOut = useCallback(async () => {
    const { error } = await sbClient.auth.signOut();

    if (!error) {
      router.replace(Routes.SIGNIN);
    }
  }, []);

  const signInWithEmail = useCallback(
    async ({ username, password }: SignInDto) => {
      const dbUser = await getUserByUsername(username);

      if (!dbUser) {
        /**
         * @TODO
         * implement a toast to show the error
         */
        return;
      } else {
        const { user, error } = await sbClient.auth.signIn({
          email: dbUser.email,
          password,
        });

        if (error) {
          /**
           * @TODO
           * implement a toast to show the error
           */
        }
        if (user && !error) {
          router.replace(Routes.DASHBOARD);
        }
      }
    },
    []
  );

  const signUpWithEmail = useCallback(async (signUpDto: SignUpDto) => {
    try {
      await createUserWithEmailAndPassword(signUpDto);

      router.replace(Routes.EMAIL_VERIFICATION);
    } catch (_error) {
      /**
       * @TODO
       * implement a toast to show the error
       */
    }
  }, []);

  const isAuthenticated = currentSession?.user.role === "authenticated";

  const providerValue = useMemo(
    () => ({
      user: currentUser,
      session: currentSession,
      isAuthenticated,
      signOut,
      signUpWithEmail,
      signInWithEmail,
    }),
    [currentSession, currentUser]
  );

  useEffect(() => {
    const currentUserId = currentSession?.user.id;
    if (currentUserId) {
      _getUser(currentUserId);
    }

    const { data } = sbClient.auth.onAuthStateChange((_event, session) => {
      setCurrentSession(session);

      const userId = session?.user.id;
      if (userId) {
        _getUser(userId);
      }
    });

    return () => data?.unsubscribe();
  }, []);

  return <SupabaseContext.Provider {...props} value={providerValue} />;
};

export const useSupabase = () => {
  const ctx = useContext(SupabaseContext);

  if (isUndefined(ctx)) {
    throw new Error("Supabase must be used within the 'SupabaseProvider'");
  }

  return ctx;
};
