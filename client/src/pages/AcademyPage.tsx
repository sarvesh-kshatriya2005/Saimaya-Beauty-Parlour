import Header from "@/components/Header";
import Academy from "@/components/Academy";
import Footer from "@/components/Footer";

export default function AcademyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Academy />
      </main>
      <Footer />
    </div>
  );
}