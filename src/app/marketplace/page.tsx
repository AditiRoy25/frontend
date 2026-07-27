import Navbar from "@/src/components/common/Navbar";
import Footer from "@/src/components/common/Footer";

import CategoriesSection from "@/src/components/marketplace/CategoriesSection";
import TopProducts from "@/src/components/marketplace/TopProducts";
import MarketplaceHero from "@/src/components/marketplace/MarketPlaceHero";

export default function MarketplacePage() {
  return (
    <>
      <Navbar />

      <MarketplaceHero />

      <CategoriesSection />

      <TopProducts />

      <Footer />
    </>
  );
}