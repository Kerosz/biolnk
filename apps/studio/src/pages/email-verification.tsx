import { useState } from "react";
import { useRouter } from "next/router";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Text, Button, Flex } from "@biolnk/gamut";
import { SimplePageLayout } from "~/components/layouts";
import { useSupabase } from "~/lib/supabase";
import { Routes } from "~/data/enums";

export default function EmailVerificationPage() {
  const { session } = useSupabase();
  const { query, replace, isReady } = useRouter();

  const [disableResend, setDisableResend] = useState<boolean>(true);
  const [counterKey, setCounterKey] = useState<number>(0);

  const seoOptions = {
    title: "Email Verification",
    noindex: true,
  };
  const isVerified =
    session?.user.confirmed_at && session?.user.email_confirmed_at;

  /**
   * @TODO implement the actual resend function
   */
  const handleResendConfirmation = () => {
    setCounterKey((prevKey) => prevKey + 1);
    setDisableResend(true);
  };

  if (isVerified) {
    return (
      <SimplePageLayout title="Email verified" seoOptions={seoOptions}>
        <Text size="sm" center>
          Your email address has been already verified.
        </Text>
      </SimplePageLayout>
    );
  }

  return (
    <SimplePageLayout title="Verify your email" seoOptions={seoOptions}>
      <Flex layout="vertical" align="center">
        <Text size="sm" center className="pb-1">
          To use Biolnk, you need to verify your email address in order to keep
          your account secure.
        </Text>
        <Text size="sm" center className="mb-6">
          We've sent a verification email to <strong>{query.to}</strong>
        </Text>

        <CountdownCircleTimer
          key={counterKey}
          aria-live="assertive"
          isPlaying
          duration={120}
          colors="#de4ba7"
          strokeWidth={5}
          size={100}
          onComplete={() => setDisableResend(false)}
        >
          {({ remainingTime }) => {
            const minutes = Math.floor((remainingTime % 3600) / 60);
            const seconds = remainingTime % 60;

            return remainingTime > 0 ? (
              `${minutes}:${seconds >= 10 ? seconds : `0${seconds}`}`
            ) : (
              <Text size="sm">Try again</Text>
            );
          }}
        </CountdownCircleTimer>

        <Button
          type="submit"
          className="mt-9"
          size="md"
          variant="primary"
          block
          uppercase
          disabled={disableResend}
          onClick={handleResendConfirmation}
        >
          Resend
        </Button>
      </Flex>
    </SimplePageLayout>
  );
}
