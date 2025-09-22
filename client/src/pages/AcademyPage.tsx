import Header from "@/components/Header";
import Academy from "@/components/Academy";
import Footer from "@/components/Footer";
import FloatingWhatsApp from "@/components/FloatingWhatsApp";
import BackToTop from "@/components/BackToTop";

export default function AcademyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Academy />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <BackToTop />
    </div>
  );
}