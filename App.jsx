import React, { useState, useEffect, useMemo } from 'react';
import { 
  Phone, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Utensils, 
  Award, 
  ShieldCheck, 
  Flame, 
  Search, 
  Menu as MenuIcon, 
  X, 
  Star, 
  Calendar, 
  Users, 
  Plus, 
  Minus, 
  ChevronRight, 
  ChevronLeft, 
  ShoppingBag, 
  Map, 
  Heart, 
  Maximize2 
} from 'lucide-react';

// Brand Constants
const BRAND_NAME = "S2E – Start To Eat";
const BRAND_PHONE = "+918925766465";
const BRAND_PHONE_DISPLAY = "+91 89257 66465";
const BRAND_LOCATION = "Avadi, Chennai";
const BRAND_ADDRESS = "No. 45, Gandhi Nagar Main Road, Near Railway Station, Avadi, Chennai - 600054";
const WHATSAPP_LINK = `https://wa.me/918925766465`;

// Sample Premium Food Images (Unsplash curated)
const IMAGES = {
  heroBg: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1920",
  biryani: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&q=80&w=800",
  shawarma: "https://images.unsplash.com/photo-1642821371190-6421c2576b5a?auto=format&fit=crop&q=80&w=800",
  grill: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=800",
  fish: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&q=80&w=800",
  chinese: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&q=80&w=800",
  restaurantExterior: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=800",
  diningArea: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800",
  kitchen: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=800"
};

const MENU_DATA = [
  // Biryani
  { id: 'b1', name: 'Premium Chicken Dum Biryani', category: 'Biryani', price: 240, desc: 'Aromatic basmati rice layered with succulent chicken pieces, slow-cooked in traditional dum-style.', isPopular: true, image: IMAGES.biryani },
  { id: 'b2', name: 'Special Mutton Dum Biryani', category: 'Biryani', price: 340, desc: 'Tender mutton cooked in rich spices, served with perfectly long-grained saffron rice.', isPopular: true, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800" },
  { id: 'b3', name: 'Egg Dum Biryani', category: 'Biryani', price: 160, desc: 'Classic spiced dum biryani served with boiled eggs and fresh gravy.', isPopular: false, image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=800" },
  
  // Shawarma
  { id: 's1', name: 'Arabian Chicken Shawarma (Plate)', category: 'Shawarma', price: 170, desc: 'Juicy, shredded grilled chicken rolled in soft rumali/pita with rich garlic mayonnaise.', isPopular: true, image: IMAGES.shawarma },
  { id: 's2', name: 'S2E Special Spicy Shawarma Roll', category: 'Shawarma', price: 130, desc: 'Our signature hot-sauce spiced chicken roll packed with fire-grilled protein.', isPopular: true, image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800" },
  { id: 's3', name: 'Cheese Burst Shawarma', category: 'Shawarma', price: 160, desc: 'Indulgent classic chicken shawarma loaded with a double helping of melted mozzarella and cheese sauce.', isPopular: false, image: "https://images.unsplash.com/photo-1626700051175-6518c4793f06?auto=format&fit=crop&q=80&w=800" },

  // Grill & BBQ
  { id: 'g1', name: 'S2E Signature Grilled Chicken (Full)', category: 'Grill & BBQ', price: 420, desc: 'Whole chicken marinated in house spices, charcoal-grilled to smokey perfection.', isPopular: true, image: IMAGES.grill },
  { id: 'g2', name: 'Tandoori Chicken (Half)', category: 'Grill & BBQ', price: 230, desc: 'Yogurt & tandoori-masala marinated chicken roasted in our clay tandoor oven.', isPopular: false, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800" },
  { id: 'g3', name: 'BBQ Spicy Pepper Chicken', category: 'Grill & BBQ', price: 260, desc: 'Tender fire-roasted chicken glazed with black pepper BBQ sauce.', isPopular: true, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800" },

  // Fish Specials
  { id: 'f1', name: 'Premium Fish Tikka', category: 'Fish Specials', price: 310, desc: 'Boneless fish cubes marinated in mustard and secret tandoori spices, charcoal-broiled.', isPopular: true, image: IMAGES.fish },
  { id: 'f2', name: 'Tawa Fish Fry (Chennai Style)', category: 'Fish Specials', price: 280, desc: 'Seer fish slices coated in local spicy masala and shallow fried on flat iron tawa.', isPopular: false, image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800" },

  // Chinese
  { id: 'c1', name: 'Schezwan Chicken Fried Rice', category: 'Chinese', price: 190, desc: 'Stir-fried rice with fiery Schezwan seasoning, assorted veggies, and stir-fried chicken.', isPopular: false, image: IMAGES.chinese },
  { id: 'c2', name: 'Dragon Chicken (Semi-Gravy)', category: 'Chinese', price: 210, desc: 'Crispy sweet and spicy chicken strips tossed with bell peppers and roasted cashews.', isPopular: true, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=800" },
  { id: 'c3', name: 'Chilli Garlic Noodles (Veg)', category: 'Chinese', price: 150, desc: 'Wok-tossed noodles flavored with abundant roasted garlic and chilli flakes.', isPopular: false, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800" },
];

export default function App() {
  // Navigation & State
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form States
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: ''
  });

  // Simple Notification System
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Gallery Images List
  const galleryImages = [
    { src: IMAGES.restaurantExterior, title: "Grand Exterior" },
    { src: IMAGES.diningArea, title: "Cozy Dining Area" },
    { src: IMAGES.biryani, title: "Classic Dum Biryani" },
    { src: IMAGES.shawarma, title: "Arabian Shawarma Station" },
    { src: IMAGES.grill, title: "Sizzling Charcoal Grill" },
    { src: IMAGES.kitchen, title: "Hygienic Modern Kitchen" }
  ];

  // Unique Categories
  const categories = useMemo(() => ['All', ...new Set(MENU_DATA.map(item => item.category))], []);

  // Filter & Search Menu
  const filteredMenu = useMemo(() => {
    return MENU_DATA.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Cart operations
  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(cartItem => cartItem.id === item.id);
      if (existing) {
        return prevCart.map(cartItem => 
          cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
    triggerToast(`Added ${item.name} to order list!`);
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => {
      const existing = prevCart.find(cartItem => cartItem.id === itemId);
      if (existing && existing.qty > 1) {
        return prevCart.map(cartItem => 
          cartItem.id === itemId ? { ...cartItem, qty: cartItem.qty - 1 } : cartItem
        );
      }
      return prevCart.filter(cartItem => cartItem.id !== itemId);
    });
  };

  const clearCart = () => {
    setCart([]);
    triggerToast("Cleared order list.");
  };

  // Pre-formatted checkout calculations
  const totalCartAmount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  }, [cart]);

  // Handle WhatsApp Checkout
  const handleCheckout = () => {
    if (cart.length === 0) return;
    let message = `*S2E – Start To Eat Order Reservation*%0A`;
    message += `---------------------------------%0A`;
    cart.forEach(item => {
      message += `• ${item.name} [x${item.qty}] - ₹${item.price * item.qty}%0A`;
    });
    message += `---------------------------------%0A`;
    message += `*Total Amount:* ₹${totalCartAmount}%0A`;
    message += `*Delivery / Takeaway / Dine-in Enquiry*%0A%0A`;
    message += `Please confirm my order and share processing time. Thank you!`;

    window.open(`https://wa.me/918925766465?text=${message}`, '_blank');
  };

  // Handle Booking form submission
  const submitBooking = (e) => {
    e.preventDefault();
    if (!bookingDetails.name || !bookingDetails.phone || !bookingDetails.date) {
      triggerToast("Please fill in all essential fields.");
      return;
    }
    let message = `*Table Booking Request at S2E*%0A`;
    message += `*Name:* ${bookingDetails.name}%0A`;
    message += `*Contact Phone:* ${bookingDetails.phone}%0A`;
    message += `*Guests:* ${bookingDetails.guests} Person(s)%0A`;
    message += `*Date:* ${bookingDetails.date}%0A`;
    message += `*Preferred Time:* ${bookingDetails.time || 'Not Specified'}%0A%0A`;
    message += `Please confirm table availability!`;

    window.open(`https://wa.me/918925766465?text=${message}`, '_blank');
    setIsBookingModalOpen(false);
    triggerToast("Redirecting reservation request to WhatsApp!");
  };

  return (
    <div className="bg-[#0c0c0e] text-slate-100 min-h-screen font-sans selection:bg-[#d4af37] selection:text-[#0c0c0e]">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-24 right-4 z-50 bg-[#16161a] border border-[#d4af37] text-white px-5 py-3 rounded-xl shadow-[0_0_15px_rgba(212,175,55,0.2)] flex items-center gap-3 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
          <span className="text-sm font-semibold tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Floating Sticky Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Cart trigger button with badge count */}
        <button 
          onClick={() => setIsCartOpen(true)}
          className="relative bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold p-4 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform hover:scale-110 flex items-center justify-center border border-amber-300"
          title="View Instant Order Bucket"
        >
          <ShoppingBag className="w-6 h-6 text-black" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center border-2 border-[#0c0c0e]">
              {cart.reduce((a, b) => a + b.qty, 0)}
            </span>
          )}
        </button>

        {/* Floating WhatsApp Action */}
        <a 
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20ba5a] text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 flex items-center justify-center border-2 border-white/10"
          title="Chat with S2E Team"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>

      {/* Global Navigation Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-[#0c0c0e]/90 border-b border-amber-500/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo Brand Brand */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-11 h-11 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-transform duration-300 group-hover:rotate-12">
              <span className="text-black font-black text-xl tracking-tighter">S2E</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-lg tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-white via-amber-200 to-amber-500">START TO EAT</span>
              <span className="text-[10px] text-amber-400 font-semibold tracking-widest uppercase">Family Restaurant</span>
            </div>
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 font-medium text-sm tracking-wider uppercase text-slate-300">
            <a href="#" className="hover:text-amber-400 transition-colors">Home</a>
            <a href="#why-us" className="hover:text-amber-400 transition-colors">Why S2E</a>
            <a href="#popular" className="hover:text-amber-400 transition-colors">Popular</a>
            <a href="#menu" className="hover:text-amber-400 transition-colors">Digital Menu</a>
            <a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a>
            <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href={`tel:${BRAND_PHONE}`} 
              className="flex items-center gap-2 text-slate-300 hover:text-amber-400 text-sm font-semibold transition-colors duration-200"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{BRAND_PHONE_DISPLAY}</span>
            </a>
            <button 
              onClick={() => setIsBookingModalOpen(true)}
              className="bg-transparent hover:bg-amber-400 text-amber-400 hover:text-black font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-lg border border-amber-400/50 hover:border-amber-400 transition-all duration-300"
            >
              Book Table
            </button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-amber-400 hover:text-white"
            >
              <ShoppingBag className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-black text-[10px] font-black rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.reduce((a, b) => a + b.qty, 0)}
                </span>
              )}
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-slate-300 hover:text-amber-400 transition-colors focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0c0c0e]/95 backdrop-blur-lg border-b border-amber-500/20 px-6 py-6 transition-all duration-300 animate-fadeIn">
            <div className="flex flex-col gap-4 text-center">
              <a 
                href="#" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg py-2 hover:text-amber-400 border-b border-white/5"
              >
                Home
              </a>
              <a 
                href="#why-us" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg py-2 hover:text-amber-400 border-b border-white/5"
              >
                Why S2E
              </a>
              <a 
                href="#popular" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg py-2 hover:text-amber-400 border-b border-white/5"
              >
                Popular
              </a>
              <a 
                href="#menu" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg py-2 hover:text-amber-400 border-b border-white/5"
              >
                Digital Menu
              </a>
              <a 
                href="#gallery" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg py-2 hover:text-amber-400 border-b border-white/5"
              >
                Gallery
              </a>
              <a 
                href="#contact" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-lg py-2 hover:text-amber-400 border-b border-white/5"
              >
                Contact Us
              </a>
              
              <div className="flex flex-col gap-3 mt-4">
                <button 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setIsBookingModalOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-extrabold py-3 px-6 rounded-lg shadow-lg hover:from-amber-500 hover:to-yellow-700 transition-all"
                >
                  Book Table
                </button>
                <a 
                  href={`tel:${BRAND_PHONE}`}
                  className="w-full bg-white/5 border border-white/10 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  Call S2E Office
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
        {/* Background Overlay with Parallax style gradient */}
        <div className="absolute inset-0 z-0">
          <img 
            src={IMAGES.heroBg} 
            alt="S2E Sizzling Charcoal Grill" 
            className="w-full h-full object-cover object-center opacity-40 scale-105 transform transition-transform duration-10000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/80 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e] via-transparent to-[#0c0c0e]"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-10 pb-20">
          
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-400/30 backdrop-blur-md mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            <span className="text-amber-400 text-xs font-bold tracking-widest uppercase">Avadi’s Premier Food Experience</span>
          </div>

          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-white mb-6 leading-tight">
            S2E – <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-yellow-600">START TO EAT</span>
          </h1>

          <p className="max-w-2xl mx-auto text-lg sm:text-xl md:text-2xl text-slate-300 font-light mb-10 leading-relaxed">
            Feast upon authentic, legendary <span className="text-amber-400 font-semibold">Biryani</span>, savory <span className="text-amber-400 font-semibold">Shawarma</span>, smoky <span className="text-amber-400 font-semibold">Grills</span>, and spiced Chinese delicacy. Created for family cravings!
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
            <a 
              href="#menu" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-extrabold tracking-wider uppercase text-sm shadow-[0_5px_30px_rgba(212,175,55,0.4)] hover:from-amber-500 hover:to-yellow-700 hover:shadow-[0_10px_40px_rgba(212,175,55,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 text-center"
            >
              Explore Digital Menu
            </a>
            <a 
              href={`tel:${BRAND_PHONE}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#16161a] hover:bg-[#202026] text-white font-bold tracking-wider uppercase text-sm border border-amber-500/30 hover:border-amber-400 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              Call Now to Order
            </a>
          </div>

          {/* Delivery Services Badges */}
          <div className="mt-16 pt-8 border-t border-white/5 max-w-3xl mx-auto">
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-4">Fast Home Delivery via</p>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-75 grayscale hover:grayscale-0 transition-all duration-300">
              <span className="text-white font-bold text-lg tracking-wider">WHATSAPP ORDERS</span>
              <span className="text-red-500 font-black text-xl tracking-tighter">SWIGGY</span>
              <span className="text-red-600 font-black text-xl tracking-wider">ZOMATO</span>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
          <span className="text-xs text-slate-400 tracking-widest uppercase">Scroll Down</span>
          <div className="w-6 h-10 border-2 border-slate-500 rounded-full p-1 flex justify-center">
            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-24 relative bg-gradient-to-b from-[#0c0c0e] to-[#121215]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">Uncompromising Standards</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-4">
              WHY DINING AT S2E IS SPECIAL
            </h2>
            <p className="text-slate-400">
              We focus heavily on visual presentations, authentic flavors, absolute kitchen hygiene, and fast customer fulfillment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-[#16161a] border border-amber-500/10 p-8 rounded-2xl hover:border-amber-400/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 text-amber-400">
                <Flame className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Fresh Ingredients</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Hand-picked farm fresh produce, halal meats sourced daily, and spices ground in-house to guarantee unmatched authentic taste.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#16161a] border border-amber-500/10 p-8 rounded-2xl hover:border-amber-400/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 text-amber-400">
                <Utensils className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Experienced Chefs</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Our master culinary artists bring decades of specialty experience crafting delicious Biryanis, succulent shawarmas, and rich tandoor items.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#16161a] border border-amber-500/10 p-8 rounded-2xl hover:border-amber-400/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Hygienic Modern Kitchen</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Strict food-safety audits, sterile preparation areas, and complete contactless standards to protect your family’s health.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#16161a] border border-amber-500/10 p-8 rounded-2xl hover:border-amber-400/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 text-amber-400">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Affordable Pricing</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Savor five-star culinary quality at honest, budget-friendly prices. Premium dining made easily accessible for families.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#16161a] border border-amber-500/10 p-8 rounded-2xl hover:border-amber-400/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 text-amber-400">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Family-Friendly Dining</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                A warm, inviting atmosphere with cozy seating arrangements specifically curated for lovely family gatherings and weekend events.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-[#16161a] border border-amber-500/10 p-8 rounded-2xl hover:border-amber-400/40 transition-all duration-300 group hover:-translate-y-1">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-black transition-all duration-300 text-amber-400">
                <MessageCircle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lightning Fast Checkout</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Quick, responsive support over WhatsApp. Receive clear delivery updates or seamlessly schedule a convenient takeaway timeslot.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Popular Dishes Section */}
      <section id="popular" className="py-24 bg-[#0a0a0c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">Crowd Favorites</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2">
                PEOPLE’S MOST LOVED DISHES
              </h2>
            </div>
            <a 
              href="#menu" 
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-amber-400 hover:text-white transition-colors text-sm font-bold tracking-widest uppercase"
            >
              <span>View All Menu Items</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MENU_DATA.filter(item => item.isPopular).slice(0, 4).map(item => (
              <div 
                key={item.id} 
                className="bg-[#16161a] rounded-3xl overflow-hidden border border-white/5 hover:border-amber-400/40 transition-all duration-300 group flex flex-col h-full"
              >
                {/* Image Wrap */}
                <div className="h-56 relative overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent"></div>
                  <span className="absolute top-4 left-4 bg-amber-500 text-black text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                    Signature Popular
                  </span>
                </div>

                {/* Info */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-amber-400 text-[11px] font-extrabold uppercase tracking-widest">{item.category}</span>
                    <h3 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-amber-300 transition-colors">{item.name}</h3>
                    <p className="text-slate-400 text-xs line-clamp-2 leading-relaxed mb-4">{item.desc}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-xl font-black text-amber-400">₹{item.price}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-[#202025] hover:bg-amber-400 text-slate-300 hover:text-black px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors duration-200 flex items-center gap-1.5"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to Order
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Full Digital Menu with Interactive Filters */}
      <section id="menu" className="py-24 bg-[#121215] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">Digital Ordering Board</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-4">
              OUR COMPLETE MENU
            </h2>
            <p className="text-slate-400">
              Browse through our fresh preparations. Add items to your bucket and instantly complete your order directly through WhatsApp!
            </p>
          </div>

          {/* Search and Category Filter Controls */}
          <div className="bg-[#16161a] p-6 rounded-3xl border border-white/5 mb-12 flex flex-col md:flex-row gap-6 items-center justify-between shadow-xl">
            {/* Category Pills */}
            <div className="flex flex-wrap gap-2 w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                    activeCategory === cat 
                      ? 'bg-gradient-to-r from-amber-400 to-yellow-600 text-black shadow-md' 
                      : 'bg-[#202025] text-slate-400 hover:text-white hover:bg-[#2c2c34]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Live Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search Biryani, Shawarma..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#202025] text-white pl-11 pr-4 py-3 rounded-xl text-sm border border-white/10 focus:outline-none focus:border-amber-400 transition-colors"
              />
              <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-1/2 transform -translate-y-1/2" />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Dynamic Menu Grid */}
          {filteredMenu.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredMenu.map(item => (
                <div 
                  key={item.id} 
                  className="bg-[#16161a] p-4 rounded-3xl border border-white/5 hover:border-amber-400/30 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    {/* Visual */}
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-4">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {item.isPopular && (
                        <span className="absolute top-3 left-3 bg-black/85 border border-amber-400/50 text-amber-400 text-[9px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md">
                          Popular
                        </span>
                      )}
                    </div>

                    {/* Metadata */}
                    <div className="px-1">
                      <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">{item.category}</span>
                      <h3 className="text-lg font-bold text-white mt-1 group-hover:text-amber-300 transition-colors">{item.name}</h3>
                      <p className="text-slate-400 text-xs mt-1 leading-relaxed mb-4">{item.desc}</p>
                    </div>
                  </div>

                  {/* Add action */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between px-1">
                    <span className="text-xl font-extrabold text-white">₹{item.price}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-extrabold px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest transition-transform duration-150 transform active:scale-95 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add to order
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-[#16161a] rounded-3xl border border-white/5 max-w-xl mx-auto">
              <Utensils className="w-12 h-12 text-slate-600 mx-auto mb-4" />
              <p className="text-slate-400 font-semibold mb-2">No menu item found</p>
              <p className="text-xs text-slate-500">Try adjusting your search queries or category filters</p>
            </div>
          )}

        </div>
      </section>

      {/* Visual Photo Gallery */}
      <section id="gallery" className="py-24 bg-[#0c0c0e]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">Inside S2E World</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-4">
              VISUAL PHOTO GALLERY
            </h2>
            <p className="text-slate-400">
              Take a virtual tour of our family-friendly dining layout, modern hygienic kitchen preparation standards, and delightful signature presentations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, idx) => (
              <div 
                key={idx} 
                className="relative group rounded-2xl overflow-hidden h-72 cursor-pointer border border-white/5"
                onClick={() => setActiveGalleryIndex(idx)}
              >
                <img 
                  src={image.src} 
                  alt={image.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Caption info */}
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">S2E Avadi</span>
                    <h3 className="text-lg font-bold text-white mt-1">{image.title}</h3>
                  </div>
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-black shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Customer Testimonials Reviews */}
      <section className="py-24 bg-[#121215]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">Verified Guest Feedback</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-4">
              WHAT FAMILIES SAY
            </h2>
            <p className="text-slate-400">
              We take pride in building regular, long-term relationships with food lovers across Avadi, Chennai. Here are our latest community reviews!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Review 1 */}
            <div className="bg-[#16161a] p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-300 italic text-sm leading-relaxed mb-6">
                  "S2E is our absolute go-to place for Friday night takeaway dinners. The Chicken Dum Biryani is packed with authentic flavors and has an incredible aroma. Highly recommended!"
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 text-black font-bold flex items-center justify-center text-sm">
                  AR
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Anand Ramachandran</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Avadi Local Guide</p>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#16161a] p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-300 italic text-sm leading-relaxed mb-6">
                  "Incredibly juicy Shawarmas and BBQ Chicken. We ordered for a home get-together of 15 guests via their WhatsApp contact, and they organized everything perfectly. Super hygiene standard."
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 text-black font-bold flex items-center justify-center text-sm">
                  KP
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Kavitha Priya</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Resident, Avadi</p>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#16161a] p-8 rounded-3xl border border-white/5 flex flex-col justify-between">
              <div>
                <div className="flex gap-1 text-amber-400 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-slate-300 italic text-sm leading-relaxed mb-6">
                  "Outstanding customer service. I called to request mild spice levels on Chinese noodles for my children, and the kitchen customized it perfectly. Great value for money."
                </p>
              </div>
              <div className="flex items-center gap-4 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-600 text-black font-bold flex items-center justify-center text-sm">
                  SS
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Shabbir Shah</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Regular Customer</p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Contact & Location Section */}
      <section id="contact" className="py-24 bg-[#0c0c0e] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Quick Contact Panel */}
            <div className="lg:pr-8">
              <span className="text-amber-400 text-sm font-bold tracking-widest uppercase">Reach Out to S2E</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-2 mb-6">
                FIND US IN AVADI, CHENNAI
              </h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Drop in with your family for an memorable hot dining experience, or contact us directly to arrange takeaway or fast home delivery.
              </p>

              <div className="space-y-6">
                
                {/* Detail 1 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#16161a] border border-white/5 flex items-center justify-center text-amber-400 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 uppercase tracking-widest">S2E Restaurant Address</h4>
                    <p className="text-slate-200 font-semibold mt-1 text-sm">{BRAND_ADDRESS}</p>
                  </div>
                </div>

                {/* Detail 2 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#16161a] border border-white/5 flex items-center justify-center text-amber-400 shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 uppercase tracking-widest">Call Desk</h4>
                    <p className="text-amber-400 font-bold mt-1 text-lg">
                      <a href={`tel:${BRAND_PHONE}`}>{BRAND_PHONE_DISPLAY}</a>
                    </p>
                  </div>
                </div>

                {/* Detail 3 */}
                <div className="flex gap-4">
                  <div className="w-11 h-11 rounded-lg bg-[#16161a] border border-white/5 flex items-center justify-center text-amber-400 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs text-slate-500 uppercase tracking-widest">Operational Hours</h4>
                    <p className="text-slate-200 font-semibold mt-1 text-sm">Daily: 11:30 AM to 11:00 PM</p>
                    <p className="text-xs text-slate-500 mt-1">Open all 7 days of the week including holidays</p>
                  </div>
                </div>

              </div>

              {/* Instant Call / WhatsApp Actions */}
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <a 
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-extrabold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider text-center flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 fill-current" />
                  Order on WhatsApp
                </a>
                <button 
                  onClick={() => setIsBookingModalOpen(true)}
                  className="bg-transparent border border-amber-400/50 hover:border-amber-400 text-amber-400 hover:text-black hover:bg-amber-400 font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider text-center transition-all duration-300"
                >
                  Pre-Book Tables
                </button>
              </div>

            </div>

            {/* Custom Google Maps Mockup / Embed for Production Quality */}
            <div className="relative rounded-3xl overflow-hidden border border-white/5 shadow-2xl h-[450px]">
              {/* Note: In production you can easily embed real Google Maps iframe */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m12!1m3!1d3885.698715784263!2d80.11186717592476!3d13.11942698720892!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a526279f53c9e69%3A0xf690558ec405a7cf!2sAvadi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin" 
                className="w-full h-full border-0 grayscale opacity-80" 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
              <div className="absolute top-4 left-4 bg-black/90 border border-amber-500/30 px-4 py-2 rounded-lg text-xs font-semibold text-white flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span>Near Avadi Railway Station, Chennai</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer Details */}
      <footer className="bg-[#08080a] border-t border-white/5 py-12 text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 pb-8 border-b border-white/5">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-black text-black text-lg">
                S2E
              </div>
              <div className="flex flex-col text-left">
                <span className="font-bold text-white text-md tracking-wider">START TO EAT</span>
                <span className="text-[9px] text-amber-400 tracking-widest uppercase">Family Restaurant</span>
              </div>
            </div>

            {/* Quick footer menu links */}
            <div className="flex flex-wrap justify-center gap-6 text-xs uppercase tracking-wider text-slate-400">
              <a href="#" className="hover:text-amber-400 transition-colors">Home</a>
              <a href="#why-us" className="hover:text-amber-400 transition-colors">Why Choose Us</a>
              <a href="#menu" className="hover:text-amber-400 transition-colors">Digital Menu</a>
              <a href="#gallery" className="hover:text-amber-400 transition-colors">Gallery</a>
              <a href="#contact" className="hover:text-amber-400 transition-colors">Find S2E</a>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between text-xs gap-4 text-center">
            <p>© {new Date().getFullYear()} S2E – Start To Eat (Avadi, Chennai). All rights reserved.</p>
            <p className="text-slate-600">
              Crafting premium Biryani, Shawarma, and Smokey BBQ experiences. Designed by culinary specialists.
            </p>
          </div>

        </div>
      </footer>

      {/* Slide-out Order Bucket Cart Modal */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Overlay background */}
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
            onClick={() => setIsCartOpen(false)}
          ></div>

          <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-md bg-[#121215] border-l border-white/10 shadow-2xl flex flex-col justify-between">
              
              {/* Modal Header */}
              <div className="px-6 py-6 border-b border-white/5 flex items-center justify-between bg-[#16161a]">
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-5 h-5 text-amber-400" />
                  <h2 className="text-lg font-black text-white uppercase tracking-wider">Your Order Bucket</h2>
                </div>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
                {cart.length > 0 ? (
                  cart.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-[#16161a] p-4 rounded-2xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-14 h-14 object-cover rounded-xl"
                        />
                        <div>
                          <h4 className="font-bold text-white text-sm">{item.name}</h4>
                          <p className="text-xs text-amber-400 font-extrabold mt-0.5">₹{item.price}</p>
                        </div>
                      </div>
                      
                      {/* Quantity Control Buttons */}
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 rounded bg-[#202025] hover:bg-amber-400 text-slate-300 hover:text-black transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-sm font-bold text-white">{item.qty}</span>
                        <button 
                          onClick={() => addToCart(item)}
                          className="p-1 rounded bg-[#202025] hover:bg-amber-400 text-slate-300 hover:text-black transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-24">
                    <Utensils className="w-16 h-16 text-slate-700 mx-auto mb-4" />
                    <p className="text-slate-400 font-bold mb-1">Your order list is empty</p>
                    <p className="text-xs text-slate-500">Go back and add delicious dishes!</p>
                  </div>
                )}
              </div>

              {/* Cart Footer */}
              <div className="bg-[#16161a] px-6 py-6 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-400">Total Items:</span>
                  <span className="font-bold text-white">{cart.reduce((a, b) => a + b.qty, 0)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-base text-slate-300">Total Bill Amount:</span>
                  <span className="text-2xl font-black text-amber-400">₹{totalCartAmount}</span>
                </div>

                <div className="pt-2 flex gap-3">
                  <button 
                    onClick={clearCart}
                    disabled={cart.length === 0}
                    className="w-1/3 py-3.5 rounded-xl border border-white/10 hover:border-red-500/50 hover:text-red-400 text-xs font-bold uppercase tracking-wider text-center transition-all disabled:opacity-50 disabled:pointer-events-none"
                  >
                    Clear All
                  </button>
                  <button 
                    onClick={handleCheckout}
                    disabled={cart.length === 0}
                    className="w-2/3 bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest text-center shadow-lg transition-transform duration-100 active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    Checkout WhatsApp
                  </button>
                </div>
                <p className="text-[10px] text-center text-slate-500 pt-2">
                  *Checkout formats order and redirects to S2E WhatsApp desk instantly.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Interactive Table Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            onClick={() => setIsBookingModalOpen(false)}
          ></div>

          {/* Form Container */}
          <div className="relative bg-[#16161a] border border-white/10 rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl z-10 animate-scaleUp">
            
            {/* Header banner */}
            <div className="px-6 py-6 border-b border-white/5 bg-gradient-to-r from-amber-500/10 to-transparent flex justify-between items-center">
              <div>
                <span className="text-amber-400 text-[10px] font-bold uppercase tracking-widest">S2E Restaurant</span>
                <h3 className="text-lg font-black text-white uppercase mt-0.5">Reserve S2E Dining Table</h3>
              </div>
              <button 
                onClick={() => setIsBookingModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={submitBooking} className="p-6 space-y-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Your Full Name</label>
                <input 
                  type="text" 
                  required
                  value={bookingDetails.name}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full bg-[#202025] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  value={bookingDetails.phone}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, phone: e.target.value })}
                  placeholder="e.g. 9876543210"
                  className="w-full bg-[#202025] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">No. of Guests</label>
                  <select 
                    value={bookingDetails.guests}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, guests: e.target.value })}
                    className="w-full bg-[#202025] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-400 text-sm"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} Guest(s)</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Booking Date</label>
                  <input 
                    type="date" 
                    required
                    value={bookingDetails.date}
                    onChange={(e) => setBookingDetails({ ...bookingDetails, date: e.target.value })}
                    className="w-full bg-[#202025] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Preferred Time Slot</label>
                <input 
                  type="time" 
                  value={bookingDetails.time}
                  onChange={(e) => setBookingDetails({ ...bookingDetails, time: e.target.value })}
                  className="w-full bg-[#202025] text-white px-4 py-3 rounded-xl border border-white/10 focus:outline-none focus:border-amber-400 text-sm"
                />
              </div>

              <div className="pt-4">
                <button 
                  type="submit"
                  className="w-full bg-gradient-to-r from-amber-400 to-yellow-600 text-black font-extrabold py-3.5 rounded-xl text-xs uppercase tracking-widest text-center shadow-lg transition-transform duration-100 active:scale-95"
                >
                  Send Booking Request via WhatsApp
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

      {/* Visual Gallery Lightbox Overlay */}
      {activeGalleryIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-6">
          
          {/* Top header area */}
          <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
            <span className="text-amber-400 text-xs font-extrabold uppercase tracking-widest">
              Image {activeGalleryIndex + 1} of {galleryImages.length}
            </span>
            <button 
              onClick={() => setActiveGalleryIndex(null)}
              className="text-white hover:text-amber-400 transition-colors p-2 bg-white/5 rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Central image display with arrows */}
          <div className="flex-grow flex items-center justify-between max-w-7xl mx-auto w-full gap-4">
            
            {/* Prev */}
            <button 
              onClick={() => setActiveGalleryIndex(prev => prev > 0 ? prev - 1 : galleryImages.length - 1)}
              className="p-3 bg-white/5 hover:bg-amber-400 hover:text-black transition-all rounded-full text-slate-300"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Main Picture */}
            <div className="max-h-[70vh] max-w-[85%] overflow-hidden rounded-2xl border border-white/10 shadow-2xl relative">
              <img 
                src={galleryImages[activeGalleryIndex].src} 
                alt={galleryImages[activeGalleryIndex].title} 
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            {/* Next */}
            <button 
              onClick={() => setActiveGalleryIndex(prev => prev < galleryImages.length - 1 ? prev + 1 : 0)}
              className="p-3 bg-white/5 hover:bg-amber-400 hover:text-black transition-all rounded-full text-slate-300"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

          </div>

          {/* Bottom caption area */}
          <div className="text-center pb-6">
            <h3 className="text-xl font-bold text-white">{galleryImages[activeGalleryIndex].title}</h3>
            <p className="text-xs text-slate-400 mt-1">S2E – Start To Eat • Avadi, Chennai</p>
          </div>

        </div>
      )}

    </div>
  );
      }
