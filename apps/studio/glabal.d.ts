declare namespace NodeJS {
  export interface ProcessEnv {
    [key: string]: string | undefined;
    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_AVATAR_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;
    SUPABASE_SERVICE_ROLE_KEY: string;
    NODE_ENV: "development" | "production" | "test";
  }
}
