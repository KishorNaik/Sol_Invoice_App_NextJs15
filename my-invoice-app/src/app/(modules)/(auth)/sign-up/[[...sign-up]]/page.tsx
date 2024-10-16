import { SignUp } from "@clerk/nextjs";
import Container from "@/components/Container";

export default function Page() {
  return (
    <Container className="flex justify-center items-center h-full">
      <SignUp />
    </Container>
  );
}
