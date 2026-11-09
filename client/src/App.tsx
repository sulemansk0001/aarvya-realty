import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollToTop } from './components/common/ScrollToTop';
import { BackToTop } from './components/common/BackToTop';
import { CustomCursor } from './components/common/CustomCursor';
import { WishlistProvider } from './context/WishlistContext';
import { AuthProvider } from './context/AuthContext';

// Pages
import { Home } from './pages/Home';
import { Properties } from './pages/Properties';
import { PropertyDetails } from './pages/PropertyDetails';
import { Residential } from './pages/Residential';
import { Commercial } from './pages/Commercial';
import { Buy } from './pages/Buy';
import { Rent } from './pages/Rent';
import { Sell } from './pages/Sell';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { AboutUs } from './pages/AboutUs';
import { Blog } from './pages/Blog';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactUs } from './pages/ContactUs';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { AddProperty } from './pages/AddProperty';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { Terms } from './pages/Terms';

const NotFound: React.FC = () => (
  <div className="min-h-[60vh] bg-[#F5F7FA] flex items-center justify-center py-20 px-4">
    <div className="text-center max-w-md bg-white p-8 rounded-2xl border border-[#E0E6ED] shadow-card">
      <span className="text-5xl font-poppins font-extrabold text-[#D4AF37] block mb-2">404</span>
      <h2 className="text-xl font-poppins font-bold text-[#0B1F3B]">Page Not Found</h2>
      <p className="text-xs text-[#667085] mt-2 mb-6">
        The real estate page or listing you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="px-6 py-2.5 bg-[#0B1F3B] hover:bg-[#D4AF37] text-white hover:text-[#0B1F3B] text-xs font-semibold rounded transition-colors inline-block"
      >
        Return to Aarvya Realty Home
      </Link>
    </div>
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <WishlistProvider>
        <BrowserRouter>
          <CustomCursor />
          <ScrollToTop />
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties/:id" element={<PropertyDetails />} />
                <Route path="/residential" element={<Residential />} />
                <Route path="/commercial" element={<Commercial />} />
                <Route path="/buy" element={<Buy />} />
                <Route path="/rent" element={<Rent />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/services" element={<Services />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/add-property" element={<AddProperty />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <BackToTop />
          </div>
        </BrowserRouter>
      </WishlistProvider>
    </AuthProvider>
  );
};

export default App;
