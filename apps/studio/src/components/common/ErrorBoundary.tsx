import Link from "./Link";
import { Component, ErrorInfo, ReactNode } from "react";
import { Button, Container, Heading, Text } from "@biolnk/ui";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(_: Error, errorInfo: ErrorInfo) {
    console.error(errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Container maxWidth="2xl" className="h-screen">
          <div className="flex flex-col h-full justify-center items-center py-20">
            <Heading as="h1" size="lg" className="font-bold text-center pb-8">
              OPS
            </Heading>

            <Text className="font-medium text-center pb-12" size="lg">
              Something really bad happened. Don&apos;t worry it&apos;s not your
              fault!
            </Text>
            {/* @ts-ignore */}
            <Button as={Link} url="/" variant="secondary" size="xl">
              Return Home
            </Button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
