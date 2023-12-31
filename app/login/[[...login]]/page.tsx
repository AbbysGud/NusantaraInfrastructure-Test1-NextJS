import { SignIn } from "@clerk/nextjs";

export default function Login() {
  return (
    <div className="flex items-center justify-center h-screen">
      <SignIn path="/login" routing="path" redirectUrl="/"/>
    </div>
  );
}