// New Arrivals Data
export const newArrivalsData = {
  status: true,
  message: "New arrivals fetched successfully",
  data: [
    {
      id: "1",
      name: "Ppot (Teapot)",
      description:
        "A beautifully crafted ceramic teapot perfect for your morning tea ritual. Made from high-quality materials with an elegant design.",
      price: "CHF 18",
      category: "Kitchenware",
      productType: "Physical Product",
      status_detail: "1",
      photos: [
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=300&fit=crop",
      ],
      rating: "4.8",
      reviews: {
        count: 24,
        comments: [],
      },
      colors: [
        { name: "Chalk/Gray", value: "#808080" },
        { name: "Brown", value: "#8B4513" },
        { name: "Black", value: "#000000" },
      ],
      created_at: "2024-01-15T10:30:00.000Z",
    },
    {
      id: "2",
      name: "C-cup (Mug)",
      description:
        "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
      price: "CHF 18",
      category: "Kitchenware",
      productType: "Physical Product",
      status_detail: "1",
      photos: [
        "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=300&fit=crop",
      ],
      rating: "4.6",
      reviews: {
        count: 18,
        comments: [],
      },
      sizes: ["Small", "Medium", "Large"],
      created_at: "2024-01-14T14:20:00.000Z",
    },
    {
      id: "3",
      name: "Tee (Tea Tin)",
      description:
        "Premium tea storage tin with airtight seal to preserve freshness. Features elegant design and keeps your favorite teas organized.",
      price: "CHF 25",
      category: "Tea Accessories",
      productType: "Physical Product",
      status_detail: "1",
      photos: [
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop",
      ],
      rating: "4.9",
      reviews: {
        count: 32,
        comments: [],
      },
      colors: [
        { name: "Chalk/Gray", value: "#808080" },
        { name: "Brown", value: "#8B4513" },
        { name: "Black", value: "#000000" },
      ],
      created_at: "2024-01-13T09:15:00.000Z",
    },
    {
      id: "4",
      name: "Gift Card",
      description:
        "Perfect gift for tea lovers! Redeemable for any products in our store. Available in multiple denominations to suit your needs.",
      price: "CHF 25 / 75 / 150",
      category: "Gift Cards",
      productType: "Digital Product",
      status_detail: "1",
      photos: [
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
        "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop",
      ],
      rating: "5.0",
      reviews: {
        count: 45,
        comments: [],
      },
      denominations: ["CHF 25", "CHF 75", "CHF 150"],
      colors: [
        { name: "Chalk/Gray", value: "#808080" },
        { name: "Brown", value: "#8B4513" },
        { name: "Black", value: "#000000" },
      ],
      created_at: "2024-01-12T16:45:00.000Z",
    },
  ],
};

// API endpoint simulation
export const fetchNewArrivalsAPI = async () => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Return mock data
  return newArrivalsData;
};
