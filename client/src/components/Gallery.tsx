import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, ZoomIn } from "lucide-react";
import bridalImage from "@assets/generated_images/bridal_makeup_transformation_f77e8d1a.png";
import nailImage from "@assets/generated_images/elegant_nail_art_showcase_a17e36cd.png";
import skincareImage from "@assets/generated_images/luxury_skincare_treatment_108301b2.png";
import hairstyleImage from "@assets/generated_images/elegant_hairstyling_showcase_7e766517.png";

const galleryImages = [
  {
    id: 1,
    src: bridalImage,
    category: "Bridal Makeup",
    title: "Traditional Bridal Look",
    description: "Classic bridal makeup with contemporary elements"
  },
  {
    id: 2,
    src: hairstyleImage,
    category: "Hair Styling",
    title: "Elegant Bridal Updo",
    description: "Sophisticated hairstyle with floral accessories"
  },
  {
    id: 3,
    src: nailImage,
    category: "Nail Art",
    title: "French Manicure with Gold",
    description: "Delicate nail art with golden accents"
  },
  {
    id: 4,
    src: skincareImage,
    category: "Skincare",
    title: "Relaxing Facial Treatment",
    description: "Rejuvenating skincare session"
  },
  {
    id: 5,
    src: bridalImage,
    category: "Bridal Makeup",
    title: "Contemporary Bridal Style",
    description: "Modern bridal makeup with bold eyes"
  },
  {
    id: 6,
    src: hairstyleImage,
    category: "Hair Styling",
    title: "Party Hairstyle",
    description: "Glamorous styling for special occasions"
  },
  {
    id: 7,
    src: nailImage,
    category: "Nail Art",
    title: "Artistic Nail Design",
    description: "Creative patterns and color combinations"
  },
  {
    id: 8,
    src: bridalImage,
    category: "Bridal Makeup",
    title: "Destination Wedding Look",
    description: "Perfect makeup for outdoor ceremonies"
  },
  {
    id: 9,
    src: skincareImage,
    category: "Skincare",
    title: "Anti-Aging Treatment",
    description: "Professional skincare for youthful glow"
  }
];

const categories = ["All", "Bridal Makeup", "Hair Styling", "Nail Art", "Skincare"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<typeof galleryImages[0] | null>(null);

  const filteredImages = selectedCategory === "All" 
    ? galleryImages 
    : galleryImages.filter(image => image.category === selectedCategory);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleImageClick = (image: typeof galleryImages[0]) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4" data-testid="badge-gallery">
            Gallery
          </Badge>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Our Beautiful Work
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Explore our portfolio showcasing the artistry and expertise of our talented team. 
            Each image represents our commitment to enhancing natural beauty.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              data-testid={`button-category-${category.toLowerCase().replace(/\s+/g, '-')}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredImages.map((image) => (
            <Card
              key={image.id}
              className="group overflow-hidden hover-elevate cursor-pointer"
              onClick={() => handleImageClick(image)}
              data-testid={`card-gallery-${image.id}`}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={image.src}
                  alt={image.title}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <Badge className="absolute top-3 left-3 text-xs">
                  {image.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground mb-1">{image.title}</h3>
                <p className="text-sm text-muted-foreground">{image.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Modal */}
        {selectedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
            <div className="relative max-w-4xl max-h-[90vh] overflow-hidden rounded-lg bg-background">
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background"
                onClick={closeModal}
                data-testid="button-close-modal"
              >
                <X className="h-6 w-6" />
              </Button>
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-w-full max-h-[80vh] object-contain"
              />
              <div className="p-6">
                <Badge className="mb-2">{selectedImage.category}</Badge>
                <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
                  {selectedImage.title}
                </h3>
                <p className="text-muted-foreground">{selectedImage.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}