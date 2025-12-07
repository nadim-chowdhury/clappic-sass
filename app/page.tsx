import { HomeContent } from "@/components/home/HomeContent";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans">
      <Header />
      <HomeContent />
      <Footer />
      <Toaster position="bottom-right" theme="system" />
    </div>
  );
}
