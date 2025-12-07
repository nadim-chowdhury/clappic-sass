import { handleGoogleSignIn } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

export function SignIn() {
  return (
    <form action={handleGoogleSignIn}>
      <Button variant="outline" className="gap-2">
        <LogIn className="w-4 h-4" />
        Sign in with Google
      </Button>
    </form>
  );
}
