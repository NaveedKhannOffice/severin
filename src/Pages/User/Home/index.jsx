import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import Slider from "react-slick";
import { images } from "../../../Assets";
import OurStorySection from "./OurStorySection";
import NewArrivalsSection from "./NewArrivalsSection";
import GiftSection from "./GiftSection";
import TestimonialSection from "./TestimonialSection";
import { slugify } from "../../../Utils/helper";

import {
   homeBannerData,
   giftData,
   testimonialResponse,
   productsData,
   newArrivalsData,
   ourStoryData,
} from "../../../Config/data";
// import { fetchHeroDataAPI } from "../../../Config/heroData";
import { useAuth } from "../../../Hooks/useAuth";
import { getAll } from "../../../Services/Api";
import "./style.css";
import ProductSection from "./ProductSection";

const Home = () => {
   // Centralized state management
   const [homeData, setHomeData] = useState({
      homeBanner: [],
      ourStory: null,
      services: [],
      testimonials: [],
      newArrivals: [],
      products: [], // Add this line
      gift: [],
      loading: true,
      error: null,
   });

   const location = useLocation();
   const { token } = useAuth();
   const isProviderPath = location.pathname.includes("provider");
   const [bookings, setBookingData] = useState([]);
   const [counterData2, setCounterData] = useState([]);
   const [loading, setLoading] = useState(true);
   const [topServiceProviders, setTopServiceProviders] = useState();

   const headerSliderSettings = {
      className: "center",
      centerMode: true,
      slidesToShow:
         topServiceProviders?.length < 3 ? topServiceProviders?.length : 3,
      slidesToScroll: 1,
      autoplay: false,
      autoplaySpeed: 2000,
      centerPadding: topServiceProviders?.length === 1 ? "35%" : "100px",
      arrows: false,
      infinite: topServiceProviders?.length > 1, // Don't loop if only one slide
      responsive: [
         {
            breakpoint: 1667,
            settings: {
               slidesToShow:
                  topServiceProviders?.length < 3 ? topServiceProviders?.length : 3,
               slidesToScroll: 1,
               centerPadding: topServiceProviders?.length === 1 ? "35%" : "100px",
            },
         },
         {
            breakpoint: 1200,
            settings: {
               slidesToShow:
                  topServiceProviders?.length < 2 ? topServiceProviders?.length : 2,
               slidesToScroll: 1,
               centerPadding: topServiceProviders?.length === 1 ? "30%" : "100px",
            },
         },
         {
            breakpoint: 992,
            settings: {
               slidesToShow:
                  topServiceProviders?.length < 2 ? topServiceProviders?.length : 2,
               slidesToScroll: 1,
               centerPadding: topServiceProviders?.length === 1 ? "25%" : "30px",
            },
         },
         {
            breakpoint: 640,
            settings: {
               slidesToShow: 1,
               slidesToScroll: 1,
               centerMode: topServiceProviders?.length > 1,
               centerPadding: topServiceProviders?.length === 1 ? "20%" : "0px",
            },
         },
      ],
   };

   // Centralized API call for all home data
   const fetchAllHomeData = async () => {
      try {
         setHomeData((prev) => ({ ...prev, loading: true, error: null }));

         // Fetch products from the API
         const productsResponse = await getAll('/user/products?is_new_arrival=1');
         let productsList = [];
         if (productsResponse?.data) {
            if (Array.isArray(productsResponse.data)) {
               productsList = productsResponse.data;
            } else if (Array.isArray(productsResponse.data.data)) {
               productsList = productsResponse.data.data;
            }
         }


         const productsResponse2 = await getAll('/user/products');
         let productsList2 = [];
         if (productsResponse2?.data) {
            if (Array.isArray(productsResponse2.data)) {
               productsList2 = productsResponse2.data;
            } else if (Array.isArray(productsResponse2.data.data)) {
               productsList2 = productsResponse2.data.data;
            }
         }

         // Map the products
         const mappedProducts = productsList.map(mapProduct).filter(Boolean);
         const mappedProducts2 = productsList2.map(mapProduct).filter(Boolean);

         // Get newest products for new arrivals (last 8 products)
         const sortedProducts = [...mappedProducts].sort((a, b) =>
            new Date(b.created_at || 0) - new Date(a.created_at || 0)
         );
         const newArrivals = sortedProducts.slice(0, 8);

         // Parallel API calls for other data
         const [
            homeBannerRes,
            ourStoryRes,
            testimonialsRes,
            giftRes,
         ] = await Promise.all([
            Promise.resolve(homeBannerData),
            Promise.resolve(ourStoryData),
            Promise.resolve(testimonialResponse),
            Promise.resolve(giftData),
         ]);

         setHomeData({
            homeBanner: homeBannerRes.status ? homeBannerRes.data : [],
            ourStory: ourStoryRes.status ? ourStoryRes.data : [],
            products: mappedProducts2,
            testimonials: testimonialsRes.status ? testimonialsRes.data : [],
            newArrivals: newArrivals,
            gift: giftRes.detail,
            loading: false,
            error: null,
         });

         // Debug: Check what we just set
         // console.log("Setting products to:", homeBannerRes.newArrivals.data);
      } catch (error) {
         console.error("Error fetching home data:", error);
         setHomeData((prev) => ({
            ...prev,
            loading: false,
            error: "Failed to load home data",
         }));
      }
   };

   useEffect(() => {
      fetchAllHomeData();
   }, []);

   // Add this useEffect to debug aims data changes
   // useEffect(() => {
   //   console.log("homeData.aims changed:", homeData.aims);
   // }, [homeData.aims]);

   const heroSectionRef = useRef(null);
   useEffect(() => {
      AOS.init({
         duration: 1000, // Animation duration
         once: false, // Run the animation only once
         offset: 200, // Trigger animation when 200px in view
      });
      AOS.refresh();

      const handleScroll = () => {
         AOS.refresh(); // Refresh AOS when user scrolls
      };

      window.addEventListener("scroll", handleScroll);

      // Clean up the event listener
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   // console.log(homeData.homeBanner, "test");
   // Pass data as props to sections
   return (
      <>
         {/* Hero Section */}
         <section className="hero-banner" ref={heroSectionRef}>
            <div className="header-slide position-relative">
               <img
                  className="img-fluid banner-image w-100"
                  src={images.heroBanner}
                  alt="Hero Banner"
               // data-aos="fade-up" // Animation trigger
               // data-aos-offset="200" // Offset from the viewport
               />
               <div className="slide-content-wrap container-fluid">
                  <div className="slide-content">
                     <h4 className="hero-description"
                        data-aos="fade-in"
                        data-aos-offset="100"
                        data-aos-delay="200"
                     >#{homeData.homeBanner.tag}</h4>
                     <h2
                        className="section-title mb-2 mb-md-3 mb-lg-2 text-white text-capitalize"
                        data-aos="fade-up"
                        data-aos-offset="100"
                        data-aos-delay="200"
                     >
                        {homeData.homeBanner.title}
                     </h2>
                     <h3 className="hero-subtitle"
                        data-aos="fade-up"
                        data-aos-offset="100"
                        data-aos-delay="230"
                     >{homeData.homeBanner.subtitle}</h3>
                     <p className="hero-price"
                        data-aos="fade-up"
                        data-aos-offset="100"
                        data-aos-delay="260"
                     >{homeData.homeBanner.price}</p>
                     <div className="hero-actions mt-5">
                        <Link
                           to={homeData.homeBanner.buttonLink}
                           className="btn btn-primary"
                           data-aos="fade-in"
                           data-aos-offset="100"
                           data-aos-delay="200"
                        >
                           Explore Now
                        </Link>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         <NewArrivalsSection
            data={homeData.newArrivals}
            loading={homeData.loading}
            error={homeData.error}
         />

         <OurStorySection
            data={homeData.ourStory}
            loading={homeData.loading}
            error={homeData.error}
         />

         <ProductSection
            data={homeData.products}
            loading={homeData.loading}
            error={homeData.error}
         />

         <TestimonialSection
            data={homeData.testimonials}
            loading={homeData.loading}
            error={homeData.error}
         />

         <GiftSection
            title={homeData.gift.title}
            description={homeData.gift.description}
            giftImage={homeData.gift.image}
         />
      </>
   );
};

// Helper function to map product data
function mapProduct(p) {
   if (!p) return null;
   const name = p.title || p.name || p.slug || 'Product';
   const imageFallback = p.main_image || p?.product_meta?.[0]?.images?.[0]?.path || '';
   const skus = Array.isArray(p.skus) ? p.skus : [];
   const variants = skus.map((sku) => {
      const attrs = Array.isArray(sku.attrs) ? sku.attrs : [];
      const colorAttr = attrs.find((a) => String(a.name || '').toLowerCase() === 'color');
      const vname = (colorAttr?.value || colorAttr?.name || sku.sku_id || 'Variant');
      const vimage = sku.image || (Array.isArray(sku.images) && sku.images[0]?.path) || imageFallback;
      const vprice = sku.price ?? null;
      return { name: vname, image: vimage, hex: hexFromColorName(vname), price: vprice, sku_id: sku.sku_id, stock: sku.stock };
   });

   const priceNum = (() => {
      const nums = variants
         .map((v) => parseFloat(v.price ?? '0'))
         .filter((n) => !Number.isNaN(n) && n > 0);
      if (nums.length) return Math.min(...nums);
      const p0 = parseFloat(p.price ?? '0');
      return Number.isNaN(p0) ? 0 : p0;
   })();

   const currency = p.currency || (skus[0]?.currency) || 'CHF';
   const priceStr = priceNum > 0 ? `${currency} ${priceNum.toFixed(2)}` : `${currency} ${p.price || '0.00'}`;
   const image = variants[0]?.image || imageFallback;

   return {
      id: p.id || p.ae_product_id || p.slug,
      name,
      price: priceStr,
      image,
      variants,
      currency,
      description: p.description || p.short_description || '',
      created_at: p.created_at || new Date().toISOString(),
   };
}

function hexFromColorName(name) {
   const n = String(name || '').toLowerCase().trim();
   const map = {
      black: '#111827',
      white: '#f3f4f6',
      gray: '#9ca3af', grey: '#9ca3af', 'light grey': '#cbd5e1', 'dark grey': '#6b7280',
      red: '#ef4444', 'light red': '#fca5a5', 'dark red': '#b91c1c',
      orange: '#f97316', 'light orange': '#fdba74',
      yellow: '#eab308', 'light yellow': '#fde68a',
      green: '#22c55e', 'light green': '#86efac', teal: '#14b8a6',
      blue: '#3b82f6', 'light blue': '#93c5fd',
      purple: '#a855f7', violet: '#8b5cf6',
      brown: '#92400e', beige: '#f5f5dc',
   };
   if (map[n]) return map[n];

   // Fallback to generating a color from the string
   let h = 0;
   for (let i = 0; i < String(name).length; i++) h = (h << 5) - h + String(name).charCodeAt(i);
   const c = (h & 0x00ffffff).toString(16).toUpperCase().padStart(6, '0');
   return `#${c.slice(0, 6)}`;
}

export default Home;
