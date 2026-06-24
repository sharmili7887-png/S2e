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

const BRAND_NAME = "S2E – Start To Eat";
const BRAND_PHONE = "+918925766465";
const BRAND_PHONE_DISPLAY = "+91 89257 66465";
const BRAND_LOCATION = "Avadi, Chennai";
const BRAND_ADDRESS = "No. 45, Gandhi Nagar Main Road, Near Railway Station, Avadi, Chennai - 600054";
const WHATSAPP_LINK = `https://wa.me/918925766465`;

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
  { id: 'b1', name: 'Premium Chicken Dum Biryani', category: 'Biryani', price: 240, desc: 'Aromatic basmati rice layered with succulent chicken pieces, slow-cooked in traditional dum-style.', isPopular: true, image: IMAGES.biryani },
  { id: 'b2', name: 'Special Mutton Dum Biryani', category: 'Biryani', price: 340, desc: 'Tender mutton cooked in rich spices, served with perfectly long-grained saffron rice.', isPopular: true, image: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&q=80&w=800" },
  { id: 'b3', name: 'Egg Dum Biryani', category: 'Biryani', price: 160, desc: 'Classic spiced dum biryani served with boiled eggs and fresh gravy.', isPopular: false, image: "https://images.unsplash.com/photo-1541832676-9b763b0239ab?auto=format&fit=crop&q=80&w=800" },
  { id: 's1', name: 'Arabian Chicken Shawarma (Plate)', category: 'Shawarma', price: 170, desc: 'Juicy, shredded grilled chicken rolled in soft rumali/pita with rich garlic mayonnaise.', isPopular: true, image: IMAGES.shawarma },
  { id: 's2', name: 'S2E Special Spicy Shawarma Roll', category: 'Shawarma', price: 130, desc: 'Our signature hot-sauce spiced chicken roll packed with fire-grilled protein.', isPopular: true, image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&q=80&w=800" },
  { id: 's3', name: 'Cheese Burst Shawarma', category: 'Shawarma', price: 160, desc: 'Indulgent classic chicken shawarma loaded with a double helping of melted mozzarella and cheese sauce.', isPopular: false, image: "https://images.unsplash.com/photo-1626700051175-6518c4793f06?auto=format&fit=crop&q=80&w=800" },
  { id: 'g1', name: 'S2E Signature Grilled Chicken (Full)', category: 'Grill & BBQ', price: 420, desc: 'Whole chicken marinated in house spices, charcoal-grilled to smokey perfection.', isPopular: true, image: IMAGES.grill },
  { id: 'g2', name: 'Tandoori Chicken (Half)', category: 'Grill & BBQ', price: 230, desc: 'Yogurt & tandoori-masala marinated chicken roasted in our clay tandoor oven.', isPopular: false, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&q=80&w=800" },
  { id: 'g3', name: 'BBQ Spicy Pepper Chicken', category: 'Grill & BBQ', price: 260, desc: 'Tender fire-roasted chicken glazed with black pepper BBQ sauce.', isPopular: true, image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&q=80&w=800" },
  { id: 'f1', name: 'Premium Fish Tikka', category: 'Fish Specials', price: 310, desc: 'Boneless fish cubes marinated in mustard and secret tandoori spices, charcoal-broiled.', isPopular: true, image: IMAGES.fish },
  { id: 'f2', name: 'Tawa Fish Fry (Chennai Style)', category: 'Fish Specials', price: 280, desc: 'Seer fish slices coated in local spicy masala and shallow fried on flat iron tawa.', isPopular: false, image: "https://images.unsplash.com/photo-1599084993091-1cb5c0721cc6?auto=format&fit=crop&q=80&w=800" },
  { id: 'c1', name: 'Schezwan Chicken Fried Rice', category: 'Chinese', price: 190, desc: 'Stir-fried rice with fiery Schezwan seasoning, assorted veggies, and stir-fried chicken.', isPopular: false, image: IMAGES.chinese },
  { id: 'c2', name: 'Dragon Chicken (Semi-Gravy)', category: 'Chinese', price: 210, desc: 'Crispy sweet and spicy chicken strips tossed with bell peppers and roasted cashews.', isPopular: true, image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=format&fit=crop&q=80&w=800" },
  { id: 'c3', name: 'Chilli Garlic Noodles (Veg)', category: 'Chinese', price: 150, desc: 'Wok-tossed noodles flavored with abundant roasted garlic and chilli flakes.', isPopular: false, image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=800" },
];

export default function App() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    guests: '2',
    date: '',
    time: ''
  });

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const galleryImages = [
    { src: IMAGES.restaurantExterior, title: "Grand Exterior" },
    { src: IMAGES.diningArea, title: "Cozy Dining Area" },
    { src: IMAGES.biryani, title: "Classic Dum Biryani" },
    { src: IMAGES.shawarma, title: "Arabian Shawarma Station" },
    { src: IMAGES.grill, title: "Sizzling Charcoal Grill" },
    { src: IMAGES.kitchen, title: "Hygienic Modern Kitchen" }
  ];

  const categories = useMemo(() => ['All', ...new Set(MENU_DATA.map(item => item.category))], []);

  const filteredMenu = useMemo(() => {
    return MENU_DATA.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

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

  const totalCartAmount = useMemo(() => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0);
  }, [cart]);

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
    message += `Please confirm table
