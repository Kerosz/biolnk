import { Text, Button } from "@biolnk/ui";
import { CenteredPageLayout } from "~/components/layouts";
import { useSupabase } from "~/lib/supabase";

export default function EmailVerificationPage() {
  const { session } = useSupabase();

  if (session?.user.confirmed_at && session?.user.email_confirmed_at) {
    return (
      <CenteredPageLayout title="Email verified" social={false}>
        <Text size="sm" center>
          Your email address has been already verified.
        </Text>
      </CenteredPageLayout>
    );
  }

  return (
    <CenteredPageLayout title="Verify your email" social={false}>
      <Text size="sm" center className="pb-1">
        Almost there! We've sent a verification email.
      </Text>
      <Text size="sm" center>
        You need to verify your email address to log into your{" "}
        <strong>Biolnk</strong> account.
      </Text>
      <Button
        type="submit"
        className="mt-9"
        size="md"
        variant="primary"
        block
        uppercase
      >
        Resend
      </Button>
    </CenteredPageLayout>
  );
}
