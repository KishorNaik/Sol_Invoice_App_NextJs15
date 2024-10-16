import {
  SignIn,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import { OrganizationSwitcher } from "@clerk/nextjs";
import Container from "@/components/Container";

const Header = () => {
  return (
    <>
      <header className="mt-6 mb-12">
        <Container>
          <div className="flex justify-between items-center gap-4 p-4">
            <div className="flex flex-row items-center gap-4">
              <p className="font-bold">
                <Link href="/dashboard">Invoicepedia</Link>
              </p>
              <span className="text-slate-300">/</span>
              <SignedIn>
                <span className="-ml-2">
                  <OrganizationSwitcher
                    afterCreateOrganizationUrl={"/dashboard"}
                  />
                </span>
              </SignedIn>
            </div>

            <div>
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </div>
        </Container>
      </header>
    </>
  );
};

export default Header;
