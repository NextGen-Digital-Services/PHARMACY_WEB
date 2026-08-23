// Programmatic generator for 160 realistic pharmacy and nutrition products
// No Lorem Ipsum. All real product names, ingredients, dosages and Unsplash URLs.

const CATEGORY_TEMPLATES = {
  "face-cleansers": {
    subCategories: ["Foaming Cleanser", "Hydrating Wash", "Purifying Gel", "Cleansing Balm"],
    ingredients: [
      { name: "Salicylic Acid 2%", benefit: "exfoliating deep into pores to control sebum and prevent blackheads." },
      { name: "Centella Asiatica (Cica)", benefit: "soothing sensitive skin barriers and reducing redness during cleansing." },
      { name: "Cera-Moist Complex", benefit: "restoring essential skin lipids and maintaining hydration after washing." },
      { name: "Glycolic Acid 1.5%", benefit: "resurfacing dead skin cells to reveal a brighter, smoother complexion." },
      { name: "Tea Tree & Zinc PCA", benefit: "controlling acne-causing bacteria and calming inflammation." }
    ],
    brandPrefixes: ["DermaCell", "HydraShield", "ApoPure", "CuraCell", "SeboClear"],
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80"
    ],
    minPrice: 199,
    maxPrice: 699,
    dosage: ["100ml", "150ml", "200ml"],
    tags: ["Dermatologist Recommended", "Vegan", "Cruelty-Free"]
  },
  "moisturizers-creams": {
    subCategories: ["Barrier Cream", "Hydrating Gel", "Night Recovery Balm", "Daily Lotion"],
    ingredients: [
      { name: "Ceramide NP & AP", benefit: "strengthening the lipid barrier and locking in moisture for 24 hours." },
      { name: "Hyaluronic Acid 2%", benefit: "attracting water molecules to plump skin and smooth fine dehydration lines." },
      { name: "Niacinamide 5%", benefit: "reducing redness, evening out skin tone, and regulating oil production." },
      { name: "Squalane & Shea", benefit: "delivering deep emollient nourishment without clogging skin pores." },
      { name: "Cica Repair Balm", benefit: "accelerating skin healing and calming compromised, flaking skin." }
    ],
    brandPrefixes: ["HydraShield", "DermaCell", "CuraCell", "ApoPure", "Vitamend"],
    images: [
      "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80"
    ],
    minPrice: 299,
    maxPrice: 999,
    dosage: ["50ml", "75ml", "100ml"],
    tags: ["Dermatologist Recommended", "Bestseller", "New"]
  },
  "sunscreens": {
    subCategories: ["Matte Gel", "Invisible Fluid", "Physical sunscreen", "Aqua Gel"],
    ingredients: [
      { name: "Zinc Oxide SPF 50", benefit: "providing physical, broad-spectrum UVA & UVB protection without white cast." },
      { name: "Titanium Dioxide SPF 30", benefit: "delivering lightweight physical mineral protection for sensitive skin." },
      { name: "Hyaluronic Acid Tinted", benefit: "combining light coverage with hydration and SPF 40 sunscreen shield." },
      { name: "Silica Matte Control", benefit: "absorbing sweat and sebum for a long-lasting velvet matte look." },
      { name: "Vitamin C Infused SPF 50+", benefit: "boosting sunscreen defense and preventing sun-induced hyperpigmentation." }
    ],
    brandPrefixes: ["SolarShield", "DermaCell", "HydraShield", "ApoPure", "CuraCell"],
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556227834-09f1de7a7414?auto=format&fit=crop&w=600&q=80"
    ],
    minPrice: 349,
    maxPrice: 899,
    dosage: ["50g", "60ml", "80ml"],
    tags: ["Dermatologist Recommended", "Bestseller"]
  },
  "serums-actives": {
    subCategories: ["Refining Serum", "Brightening Drops", "Youth Elixir", "Peeling Solution"],
    ingredients: [
      { name: "Retinol 1% Liposomal", benefit: "stimulating collagen synthesis and accelerating skin cellular turnover." },
      { name: "Vitamin C 15% (L-Ascorbic)", benefit: "fading dark spots, fighting free radicals, and boosting radiance." },
      { name: "Niacinamide 10% + Zinc 1%", benefit: "tightening enlarged pores, clearing acne scars, and smoothing texture." },
      { name: "Salicylic Acid 2% BHA", benefit: "exfoliating follicular walls and dissolving trapped sebum and blackheads." },
      { name: "Hyaluronic Acid 2% + B5", benefit: "plumping multiple skin layers and soothing dry, irritated skin patches." }
    ],
    brandPrefixes: ["DermaCell", "ApoPure", "SeboClear", "CuraCell", "HydraShield"],
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601049676099-e7ed07d825b0?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80"
    ],
    minPrice: 499,
    maxPrice: 1499,
    dosage: ["30ml", "45ml", "50ml"],
    tags: ["Dermatologist Recommended", "Bestseller", "New", "Vegan"]
  },
  "acne-blemish-care": {
    subCategories: ["Spot Correction Gel", "Clarifying Toner", "Blemish Treatment", "Acne Patch"],
    ingredients: [
      { name: "Benzoyl Peroxide 2.5%", benefit: "killing acne bacteria instantly and preventing future follicular breakouts." },
      { name: "Azelaic Acid 10%", benefit: "reducing redness, calming inflammation, and clearing post-acne blemishes." },
      { name: "Zinc PCA & Niacinamide", benefit: "regulating sebaceous activity and healing broken skin tissue." },
      { name: "Salicylic Spot Balm", benefit: "reducing localized pimple size and redness overnight." },
      { name: "Colloidal Sulfur 3%", benefit: "drawing out skin impurities and drying active inflammatory acne." }
    ],
    brandPrefixes: ["SeboClear", "DermaCell", "CuraCell", "ApoPure", "Vitamend"],
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1617897903246-719242758050?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&w=600&q=80"
    ],
    minPrice: 249,
    maxPrice: 799,
    dosage: ["15g", "30ml", "50ml", "24 Patches"],
    tags: ["Dermatologist Recommended", "New"]
  },
  "vitamins-minerals": {
    subCategories: ["Daily Capsules", "Chewable Tablets", "Effervescent Multivitamin", "Mineral Complex"],
    ingredients: [
      { name: "Vitamin D3 60K IU", benefit: "supporting immune health, bone mineralization, and cardiovascular wellness." },
      { name: "Chelated Iron & Zinc", benefit: "boosting red blood cell production, cellular oxygenation, and skin healing." },
      { name: "Magnesium Glycinate 400mg", benefit: "promoting muscle relaxation, nervous system balance, and restful sleep." },
      { name: "Methylcobalamin B12 1500mcg", benefit: "enhancing nerve cell function, metabolic rate, and cognitive energy." },
      { name: "Vitamin C 1000mg + Zinc", benefit: "boosting collagen production, skin health, and daily immune defenses." }
    ],
    brandPrefixes: ["NutriCore", "Vitamend", "ApoPure", "CuraCell", "ProFit"],
    images: [
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1611926653458-09294b3142bf?auto=format&fit=crop&w=600&q=80"
    ],
    minPrice: 199,
    maxPrice: 799,
    dosage: ["30 Tablets", "60 Capsules", "90 Veggie Caps", "20 Effervescent Tabs"],
    tags: ["Vegan", "Bestseller"]
  },
  "protein-fitness": {
    subCategories: ["Whey Protein Isolate", "Plant Protein Powder", "Creatine Monohydrate", "BCAA Recovery"],
    ingredients: [
      { name: "Ultra-Filtered Whey Isolate", benefit: "delivering 25g pure fast-absorbing protein for muscle synthesis and repair." },
      { name: "Organic Pea & Rice Protein", benefit: "providing a complete plant-based amino acid profile, gentle on digestion." },
      { name: "Micronized Creatine 3g", benefit: "boosting phosphocreatine stores to increase explosive muscle strength and output." },
      { name: "L-Glutamine & BCAA 2:1:1", benefit: "accelerating workout recovery times and preventing muscle tissue breakdown." },
      { name: "Casein Night Protein", benefit: "releasing sustained-release amino acids slowly over 8 hours of sleep." }
    ],
    brandPrefixes: ["ProFit", "NutriCore", "ApoPure", "Vitamend", "DermaCell"],
    images: [
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1594882645126-14020914d58d?auto=format&fit=crop&w=600&q=80"
    ],
    minPrice: 1199,
    maxPrice: 2499,
    dosage: ["500g", "1kg Powder", "2.2lbs Jar"],
    tags: ["Bestseller", "New", "Vegan"]
  },
  "wellness-herbal": {
    subCategories: ["Adaptogen Blend", "Herbal Drops", "Ayurvedic Elixir", "Daily Tonic"],
    ingredients: [
      { name: "Ashwagandha KSM-66", benefit: "reducing cortisol levels, calming stress, and improving daily cognitive focus." },
      { name: "Standardized Curcumin 95%", benefit: "providing powerful cellular antioxidant action and supporting joint mobility." },
      { name: "Milk Thistle Extract 400mg", benefit: "detoxifying liver enzymes and supporting general digestive metabolism." },
      { name: "Organic Spirulina & Chlorella", benefit: "supplying essential superfood nutrients, trace minerals, and immune boost." },
      { name: "Triphala & Brahmi Extract", benefit: "cleansing the gastrointestinal tract and improving mental clarity." }
    ],
    brandPrefixes: ["ApoPure", "NutriCore", "Vitamend", "CuraCell", "ProFit"],
    images: [
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1616679911721-eff6eec18fcd?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=600&q=80"
    ],
    minPrice: 299,
    maxPrice: 1299,
    dosage: ["60 Veggie Caps", "90 Tablets", "100ml Liquid Drops", "250ml Tonic"],
    tags: ["Vegan", "Cruelty-Free", "Bestseller"]
  }
};

const generateMockProducts = () => {
  const products = [];
  let idCounter = 1;

  // Generate 20 products for each of the 8 categories = 160 products
  Object.entries(CATEGORY_TEMPLATES).forEach(([catKey, data]) => {
    for (let i = 1; i <= 20; i++) {
      const activeIdx = (i - 1) % data.ingredients.length;
      const subCatIdx = (i - 1) % data.subCategories.length;
      const prefixIdx = (i - 1) % data.brandPrefixes.length;
      const imgIdx = (i - 1) % data.images.length;
      const dosageIdx = (i - 1) % data.dosage.length;

      const active = data.ingredients[activeIdx];
      const subCat = data.subCategories[subCatIdx];
      const prefix = data.brandPrefixes[prefixIdx];
      const image = data.images[imgIdx];
      const dosage = data.dosage[dosageIdx];

      // Formulate unique product name
      const name = `${prefix} ${active.name} ${subCat}`;

      // Pricing & MRP (15% - 25% discount)
      const baseDiff = data.maxPrice - data.minPrice;
      const priceVal = data.minPrice + Math.floor((i / 20) * baseDiff);
      const discount = 15 + ((i * 3) % 15); // 15% to 30%
      const mrpVal = Math.floor(priceVal / (1 - discount / 100));

      // Rating: 3.8 to 5.0
      const ratingVal = parseFloat((3.8 + ((i * 7) % 13) * 0.1).toFixed(1));
      const reviewCountVal = 12 + ((i * 23) % 438);

      // Instock: 90% in stock
      const inStockVal = i % 10 !== 0;

      // Select 1-2 tags from standard pool
      const selectedTags = [];
      if (i % 3 === 0) selectedTags.push("Bestseller");
      if (i % 5 === 0) selectedTags.push("New");
      if (i % 4 === 0) selectedTags.push("Dermatologist Recommended");
      if (catKey.includes("nutrition") || i % 6 === 0) {
        selectedTags.push("Vegan");
        selectedTags.push("Cruelty-Free");
      }
      // Guarantee at least one tag if empty
      if (selectedTags.length === 0) {
        selectedTags.push(data.tags[i % data.tags.length]);
      }

      // Keep only unique tags
      const uniqueTags = [...new Set(selectedTags)];

      const shortDescription = `Clinical strength ${subCat} infused with ${active.name} for professional results.`;
      
      const fullDescription = `Formulated specifically by certified pharmacists, our ${name} combines pure botanical extracts with pharmaceutical-grade ${active.name}. This clinical formulation is designed for maximum absorption and bio-availability, ${active.benefit} Perfect for daily use and suitable for even highly sensitive profiles.`;

      products.push({
        id: `VD-${idCounter.toString().padStart(4, '0')}`, // VD-0001 format
        name,
        category: catKey,
        subCategory: subCat,
        price: priceVal,
        mrp: mrpVal,
        rating: ratingVal,
        reviewCount: reviewCountVal,
        shortDescription,
        fullDescription,
        image,
        inStock: inStockVal,
        dosage,
        tags: uniqueTags,
        sku: `SKU-${catKey.substring(0, 3).toUpperCase()}-${idCounter + 2000}`
      });

      idCounter++;
    }
  });

  return products;
};

export const mockProducts = generateMockProducts();
