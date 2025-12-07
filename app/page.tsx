import { auth } from "@/auth";
import { HomeContent } from "@/components/home/HomeContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

export default async function Home() {
  const session = await auth();

  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      <HomeContent session={session} />
      <Footer />
      <Toaster position="bottom-right" theme="system" />
    </div>
  );
}
