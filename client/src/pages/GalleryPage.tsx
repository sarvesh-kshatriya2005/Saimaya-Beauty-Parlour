import Header from "@/components/Header";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export default function GalleryPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Gallery />
      </main>
      <Footer />
    </div>
  );
}