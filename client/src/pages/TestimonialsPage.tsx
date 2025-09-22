import Header from "@/components/Header";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function TestimonialsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}