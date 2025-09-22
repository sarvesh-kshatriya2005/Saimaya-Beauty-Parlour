import Header from "@/components/Header";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Services />
      </main>
      <Footer />
    </div>
  );
}