export const mockOrders = [
  {
    id: "VD-2026-00842",
    customerName: "Demo Customer",
    customerEmail: "demo@vitaderm.com",
    placedDate: "2026-08-22T10:15:00Z",
    items: [
      {
        productId: "VD-0001",
        name: "DermaCell Salicylic Acid 2% Foaming Cleanser",
        price: 199,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
        dosage: "100ml"
      },
      {
        productId: "VD-0021",
        name: "HydraShield Ceramide NP & AP Barrier Cream",
        price: 299,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80",
        dosage: "50ml"
      }
    ],
    total: 797,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    paymentMethod: "UPI",
    shippingAddress: {
      street: "Flat 402, Block A, Green Meadows Apartments",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560037",
      phone: "+91 98765 00000"
    },
    trackingNumber: "TRK-VD-55432"
  },
  {
    id: "VD-2026-00843",
    customerName: "Demo Customer",
    customerEmail: "demo@vitaderm.com",
    placedDate: "2026-08-23T16:45:00Z",
    items: [
      {
        productId: "VD-0061",
        name: "DermaCell Retinol 1% Liposomal Refining Serum",
        price: 499,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
        dosage: "30ml"
      },
      {
        productId: "VD-0101",
        name: "NutriCore Vitamin D3 60K IU Daily Capsules",
        price: 199,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
        dosage: "30 Tablets"
      }
    ],
    total: 1096,
    paymentStatus: "Paid",
    orderStatus: "Confirmed",
    paymentMethod: "Card",
    shippingAddress: {
      street: "Flat 402, Block A, Green Meadows Apartments",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560037",
      phone: "+91 98765 00000"
    },
    trackingNumber: "TRK-VD-88902"
  },
  {
    id: "VD-2026-00835",
    customerName: "Aarav Sharma",
    customerEmail: "aarav.sharma@gmail.com",
    placedDate: "2026-08-19T09:12:00Z",
    items: [
      {
        productId: "VD-0121",
        name: "ProFit Ultra-Filtered Whey Isolate Powder (Chocolate)",
        price: 1199,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
        dosage: "1kg Powder"
      }
    ],
    total: 1199,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    paymentMethod: "Card",
    shippingAddress: {
      street: "12, 4th Cross, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      phone: "+91 98765 43210"
    },
    trackingNumber: "TRK-VD-11002"
  },
  {
    id: "VD-2026-00836",
    customerName: "Diya Iyer",
    customerEmail: "diya.iyer@yahoo.com",
    placedDate: "2026-08-20T11:22:00Z",
    items: [
      {
        productId: "VD-0041",
        name: "SolarShield Zinc Oxide SPF 50 Matte Gel",
        price: 349,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
        dosage: "50g"
      }
    ],
    total: 698,
    paymentStatus: "Paid",
    orderStatus: "Delivered",
    paymentMethod: "UPI",
    shippingAddress: {
      street: "H-89, South Extension Part 1",
      city: "New Delhi",
      state: "Delhi",
      pincode: "110049",
      phone: "+91 91234 56789"
    },
    trackingNumber: "TRK-VD-11290"
  },
  {
    id: "VD-2026-00837",
    customerName: "Rohan Das",
    customerEmail: "rohan.das@outlook.com",
    placedDate: "2026-08-20T18:05:00Z",
    items: [
      {
        productId: "VD-0141",
        name: "ApoPure Ashwagandha KSM-66 Adaptogen Blend Capsules",
        price: 299,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
        dosage: "60 Veggie Caps"
      }
    ],
    total: 897,
    paymentStatus: "Pending",
    orderStatus: "Order Placed",
    paymentMethod: "COD",
    shippingAddress: {
      street: "Flat 101, Residency Towers, Salt Lake Sector V",
      city: "Kolkata",
      state: "West Bengal",
      pincode: "700091",
      phone: "+91 98888 77777"
    },
    trackingNumber: "Pending"
  },
  {
    id: "VD-2026-00838",
    customerName: "Ananya Reddy",
    customerEmail: "ananya.reddy@gmail.com",
    placedDate: "2026-08-21T13:30:00Z",
    items: [
      {
        productId: "VD-0022",
        name: "DermaCell Hyaluronic Acid 2% Hydrating Gel",
        price: 334,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80",
        dosage: "75ml"
      },
      {
        productId: "VD-0042",
        name: "DermaCell Titanium Dioxide SPF 30 Sunscreen",
        price: 376,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
        dosage: "60ml"
      }
    ],
    total: 710,
    paymentStatus: "Paid",
    orderStatus: "Packed",
    paymentMethod: "Card",
    shippingAddress: {
      street: "Plot 42, Jubilee Hills Road No 10",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500033",
      phone: "+91 87654 32109"
    },
    trackingNumber: "TRK-VD-44123"
  },
  {
    id: "VD-2026-00839",
    customerName: "Kabir Kapoor",
    customerEmail: "kabir.k@gmail.com",
    placedDate: "2026-08-21T15:20:00Z",
    items: [
      {
        productId: "VD-0081",
        name: "SeboClear Benzoyl Peroxide 2.5% Spot Correction Gel",
        price: 249,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
        dosage: "15g"
      }
    ],
    total: 498,
    paymentStatus: "Failed",
    orderStatus: "Cancelled",
    paymentMethod: "Card",
    shippingAddress: {
      street: "704, Sea Breeze Towers, Worli Sea Face",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400030",
      phone: "+91 99999 88888"
    },
    trackingNumber: "Cancelled"
  },
  {
    id: "VD-2026-00840",
    customerName: "Zara Khan",
    customerEmail: "zara.khan@gmail.com",
    placedDate: "2026-08-22T08:10:00Z",
    items: [
      {
        productId: "VD-0102",
        name: "Vitamend Chelated Iron & Zinc Mineral Complex",
        price: 230,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
        dosage: "60 Capsules"
      },
      {
        productId: "VD-0142",
        name: "NutriCore Standardized Curcumin 95% Joint Support",
        price: 349,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?auto=format&fit=crop&w=600&q=80",
        dosage: "90 Tablets"
      }
    ],
    total: 809,
    paymentStatus: "Paid",
    orderStatus: "Out for Delivery",
    paymentMethod: "UPI",
    shippingAddress: {
      street: "Villa 14, Palm Meadows, Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560066",
      phone: "+91 90000 11111"
    },
    trackingNumber: "TRK-VD-99221"
  },
  {
    id: "VD-2026-00841",
    customerName: "Ishaan Verma",
    customerEmail: "ishaan.v@hotmail.com",
    placedDate: "2026-08-22T09:40:00Z",
    items: [
      {
        productId: "VD-0122",
        name: "NutriCore Plant Protein Powder (Vanilla)",
        price: 1264,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
        dosage: "1kg Powder"
      }
    ],
    total: 1264,
    paymentStatus: "Paid",
    orderStatus: "Shipped",
    paymentMethod: "Card",
    shippingAddress: {
      street: "Flat 502, Skyview Residency, Gachibowli",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500032",
      phone: "+91 95555 44444"
    },
    trackingNumber: "TRK-VD-33421"
  }
];
