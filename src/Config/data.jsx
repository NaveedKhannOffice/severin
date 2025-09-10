import { images } from "../Assets";

export const loginCredentials = [
  {
    email: "admin@gmail.com",
    phone: "+1561555768",
    password: "123",
    status: true,
    role: "admin",
    message: "Login successfully",
    token: "1164|ihHvE9J6cn1U3St4Sk6v6JKOdm2ARA87hXYbIdS63831040a",
    "full-name": "John Wick",
    "first-name": "John",
    "last-name": "Wick",
    "photo-path": "https://media4.giphy.com/avatars/digitalducks/syqUuk9PflgI.png",
    "user-id": 1,
  },
  {
    user_id: 2,
    email: "user@gmail.com",
    password: "123",
    language: "English",
    relationship: "Mother",
    phone: "+1561555768",
    status: true,
    role: "user",
    message: "Login successfully",
    token: "1165|ihHvE9J6cn1U3St4Sk6v6JKOdm2ARA87hXYbIdS63831040a",
    full_name: "Tom albert",
    first_name: "Tom",
    last_name: "Albert",
    user_name: "albert",
    photo_path: images.UserImage,
  },
  {
    user_id: 3,
    email: "provider@gmail.com",
    password: "123",
    language: "spanish",
    relationship: "Mother",
    phone: "+1561555768",
    status: true,
    role: "provider",
    message: "Login successfully",
    token: "1166|ihHvE9J6cn1U3St4Sk6v6JKOdm2ARA87hXYbIdS63831040a",
    full_name: "Tom albert",
    first_name: "Tom",
    last_name: "Albert",
    user_name: "albert",
    gender: "male",
    state: "texas",
    city: "Dallas",
    bio: "Lorem ipsum",
    certificate_image: images.certificate_image,
    institution_name: " Institute ABC",
    certificate_title: "Certificate Abc",
    photo_path: images.UserImage,
  },
];

export const productsData = {
  status: true,
  message: "Service logs",
  detail: {
    current_page: 1,
    data: [
      {
        id: "1",
        name: "Ppot (Teapot)",

        short_description:
          "A beautifully crafted ceramic teapot perfect for your morning tea ritual. Made from high-quality materials with an elegant design.",
        description:
          "A beautifully crafted ceramic teapot perfect for your morning tea ritual. Made from high-quality materials with an elegant design.",
        price: "CHF 18",
        category: "Kitchenware",
        productType: "Physical Product",
        status_detail: "1",
        photos: [
          images.productImage1,
          images.productImage2,
          images.productImage3,
          images.productImage4,
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
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        price: "CHF 18",
        category: "Kitchenware",
        productType: "Physical Product",
        status_detail: "1",
        photos: [
          images.productImage2,
          images.productImage2,
          images.productImage3,
          images.productImage4,
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
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Premium tea storage tin with airtight seal to preserve freshness. Features elegant design and keeps your favorite teas organized.",
        price: "CHF 25",
        category: "Tea Accessories",
        productType: "Physical Product",
        status_detail: "1",
        photos: [
          images.productImage3,
          images.productImage4,
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
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Perfect gift for tea lovers! Redeemable for any products in our store. Available in multiple denominations to suit your needs.",
        price: "CHF 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        status_detail: "1",
        photos: [
          images.productImage4,
          images.productImage2,
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
      {
        id: 5,
        name: "Gift Card",
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Perfect gift for tea lovers! Redeemable for any products in our store. Available in multiple denominations to suit your needs.",
        price: "CHF 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        status_detail: "1",
        photos: [
          images.productImage5,
          images.productImage2,
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
      {
        id: 6,
        name: "Gift Card",
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Perfect gift for tea lovers! Redeemable for any products in our store. Available in multiple denominations to suit your needs.",
        price: "CHF 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        status_detail: "1",
        photos: [
          images.productImage6,
          images.productImage2,
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
      {
        id: 7,
        name: "Gift Card",
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Perfect gift for tea lovers! Redeemable for any products in our store. Available in multiple denominations to suit your needs.",
        price: "CHF 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        status_detail: "1",
        photos: [
          images.productImage1,
          images.productImage2,
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
      {
        id: 8,
        name: "Gift Card",
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Perfect gift for tea lovers! Redeemable for any products in our store. Available in multiple denominations to suit your needs.",
        price: "CHF 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        status_detail: "1",
        photos: [
          images.productImage7,
          images.productImage2,
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
      {
        id: 9,
        name: "Gift Card",
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Perfect gift for tea lovers! Redeemable for any products in our store. Available in multiple denominations to suit your needs.",
        price: "CHF 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        status_detail: "1",
        photos: [
          images.productImage7,
          images.productImage2,
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
      {
        id: 10,
        name: "Gift Card",
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Perfect gift for tea lovers! Redeemable for any products in our store. Available in multiple denominations to suit your needs.",
        price: "CHF 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        status_detail: "1",
        photos: [
          images.productImage7,
          images.productImage2,
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
    first_page_url: "http://localhost/food_app/admin-api/branches?page=1",
    from: 1,
    last_page: 2,
    last_page_url: "http://localhost/food_app/admin-api/branches?page=2",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=1",
        label: "1",
        active: true,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=2",
        label: "2",
        active: false,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=2",
        label: "Next &raquo;",
        active: false,
      },
    ],
    next_page_url: "http://localhost/food_app/admin-api/branches?page=2",
    path: "http://localhost/food_app/admin-api/branches",
    per_page: 10,
    prev_page_url: null,
    to: 10,
    total: 11,
  },
};

export const newArrivalsData = {
  status: true,
  message: "Service logs",
  detail: {
    current_page: 1,
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
          images.productImage1,
          images.productImage2,
          images.productImage3,
          images.productImage4,
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
          images.productImage2,
          images.productImage2,
          images.productImage3,
          images.productImage4,
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
          images.productImage3,
          images.productImage4,
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
          images.productImage4,
          images.productImage2,
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
    first_page_url: "http://localhost/food_app/admin-api/branches?page=1",
    from: 1,
    last_page: 2,
    last_page_url: "http://localhost/food_app/admin-api/branches?page=2",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=1",
        label: "1",
        active: true,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=2",
        label: "2",
        active: false,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=2",
        label: "Next &raquo;",
        active: false,
      },
    ],
    next_page_url: "http://localhost/food_app/admin-api/branches?page=2",
    path: "http://localhost/food_app/admin-api/branches",
    per_page: 10,
    prev_page_url: null,
    to: 10,
    total: 11,
  },
};

export const aimsData = {
  status: true,
  detail: {
    title: "The Gift of Choice",
    subtitle: "Support for Those Who Need It Most",
    description: `For your beloved ones who cherish quality, calm, balance, and design that lasts.`,
    image: images.gifthqs,
  },
};

export const homeBannerData = {
  status: true,
  message: "Hero fetched successfully",
  data: {
  tag: "NEW",
  title: "Matcha - Set",
  subtitle: "premium  -  bio - ritual",
  description: "A Ritual of Simplicity and Substance",
  tagline: "Premium  -  Bio - Ritual",
  price: "CHF 155.00",
  buttonText: "— Our Story",
  buttonLink: "/about",
  backgroundImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop"
  }
}

export const heroData = {
  status: true,
  message: "Hero fetched successfully",
  data: {
  title: "Designed For",
  subtitle: "A Few Not The Many",
  description: "A Ritual of Simplicity and Substance At HQSH, we believe that true luxury lies in simplicity...",
  tagline: "At HQSH, we believe that true luxury lies in simplicity...",
  buttonText: "— Our Story",
  buttonLink: "/about",
  backgroundImage: images.heroBannerbg
  }
}

export const testimonialResponse = {
  status: true,
  message: "Testimonials fetched successfully",
  data: [
    {
      id: 1,
      text: "I didn't expect a cup to change my routine so much. Now I actually look forward to mornings.",
      location: "Moustiers-Sainte-Marie - France",
      author: "Marie Dubois",
      rating: 5,
      product: "C-cup (Mug)",
      date: "2024-01-15",
    },
    {
      id: 2,
      text: "The teapot has become the centerpiece of my kitchen. Beautiful craftsmanship and perfect functionality.",
      location: "Zurich - Switzerland",
      author: "Hans Mueller",
      rating: 5,
      product: "Ppot (Teapot)",
      date: "2024-01-12",
    },
    {
      id: 3,
      text: "This tea tin keeps my favorite blends fresh and organized. The design is elegant and practical.",
      location: "London - United Kingdom",
      author: "Sarah Johnson",
      rating: 4,
      product: "Tee (Tea Tin)",
      date: "2024-01-10",
    },
    {
      id: 4,
      text: "Perfect gift for my tea-loving friend. The quality exceeded all expectations.",
      location: "Paris - France",
      author: "Pierre Martin",
      rating: 5,
      product: "Gift Card",
      date: "2024-01-08",
    },
    {
      id: 5,
      text: "The morning ritual with this mug has transformed my day. Highly recommend to all coffee lovers.",
      location: "Berlin - Germany",
      author: "Anna Schmidt",
      rating: 5,
      product: "C-cup (Mug)",
      date: "2024-01-05",
    },
  ],
};

export const wishListData = {
  status: true,
  message: "All Service Data",
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        title: "Drug Consultation",
        category: "abc Category",
        price: "$20.00",
        rating: 4.0,
        // reviews: "1.21K reviews",
        image: images.serviceImg1,
        isWishListed: true,
        provider_name: "ABC Service Provider Name",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        reviews: {
          count: 1000,
          comments: [
            {
              user: {
                name: "D. David",
                "photo-path":
                  "https://media.istockphoto.com/id/1347005975/photo/portrait-of-a-serious-muslim-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=mxRUDCuwDD3ML6-vMaUlTY7Ghqlj2R_LOhWWCB5CTXE=",
              },
              comment:
                "Excellent product for digestive relief! DigestAid worked wonders for my bloating and indigestion. After using it for just a week, I feel so much better. Highly recommend it for anyone with digestive discomfort",
              rating: 2,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Ai Boi", "photo-path": "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg" },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp" },
              comment:
                "Versatile digestive support. Whether I’m feeling gassy, bloated, or just need help digesting heavy meals, DigestAid always comes through. I like that it targets various digestive issues in one product",
              rating: 4,
              timestamp: "Dec 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg",
              },
              comment:
                "A must-have for gut health enthusiasts. DigestAid has become a staple in my daily routine. It's helped me stay regular and feel lighter throughout the day. It’s a comprehensive solution for anyone focused on gut health",
              rating: 3,
              timestamp: "Feb 16, 2024",
            },
          ],
        },
      },
      {
        id: 2,
        title: "Pet walker",
        category: "abc Category",
        price: "$50.00",
        rating: 4.8,
        reviews: "890 reviews",
        image: images.serviceImg2,
        isWishListed: true,
        provider_name: "ABC Service Provider Name",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        reviews: {
          count: 157,
          comments: [
            {
              user: {
                name: "D. David",
                "photo-path":
                  "https://media.istockphoto.com/id/1347005975/photo/portrait-of-a-serious-muslim-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=mxRUDCuwDD3ML6-vMaUlTY7Ghqlj2R_LOhWWCB5CTXE=",
              },
              comment:
                "Excellent product for digestive relief! DigestAid worked wonders for my bloating and indigestion. After using it for just a week, I feel so much better. Highly recommend it for anyone with digestive discomfort",
              rating: 2,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Ai Boi", "photo-path": "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg" },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp" },
              comment:
                "Versatile digestive support. Whether I’m feeling gassy, bloated, or just need help digesting heavy meals, DigestAid always comes through. I like that it targets various digestive issues in one product",
              rating: 4,
              timestamp: "Dec 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg",
              },
              comment:
                "A must-have for gut health enthusiasts. DigestAid has become a staple in my daily routine. It's helped me stay regular and feel lighter throughout the day. It’s a comprehensive solution for anyone focused on gut health",
              rating: 3,
              timestamp: "Feb 16, 2024",
            },
          ],
        },
      },
      {
        id: 3,
        title: "Drug Consultation",
        category: "abc Category",
        price: "$30.00",
        rating: 4.9,
        reviews: "720 reviews",
        image: images.serviceImg3,
        isWishListed: true,
        provider_name: "ABC Service Provider Name",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        reviews: {
          count: 157,
          comments: [
            {
              user: {
                name: "D. David",
                "photo-path":
                  "https://media.istockphoto.com/id/1347005975/photo/portrait-of-a-serious-muslim-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=mxRUDCuwDD3ML6-vMaUlTY7Ghqlj2R_LOhWWCB5CTXE=",
              },
              comment:
                "Excellent product for digestive relief! DigestAid worked wonders for my bloating and indigestion. After using it for just a week, I feel so much better. Highly recommend it for anyone with digestive discomfort",
              rating: 2,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Ai Boi", "photo-path": "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg" },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp" },
              comment:
                "Versatile digestive support. Whether I’m feeling gassy, bloated, or just need help digesting heavy meals, DigestAid always comes through. I like that it targets various digestive issues in one product",
              rating: 4,
              timestamp: "Dec 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg",
              },
              comment:
                "A must-have for gut health enthusiasts. DigestAid has become a staple in my daily routine. It's helped me stay regular and feel lighter throughout the day. It’s a comprehensive solution for anyone focused on gut health",
              rating: 3,
              timestamp: "Feb 16, 2024",
            },
          ],
        },
      },
      {
        id: 4,
        title: "Drug Consultation",
        category: "abc Category",
        price: "$30.00",
        rating: 4.9,
        reviews: "720 reviews",
        image: images.serviceImg3,
        isWishListed: true,
        provider_name: "ABC Service Provider Name",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        reviews: {
          count: 157,
          comments: [
            {
              user: {
                name: "D. David",
                "photo-path":
                  "https://media.istockphoto.com/id/1347005975/photo/portrait-of-a-serious-muslim-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=mxRUDCuwDD3ML6-vMaUlTY7Ghqlj2R_LOhWWCB5CTXE=",
              },
              comment:
                "Excellent product for digestive relief! DigestAid worked wonders for my bloating and indigestion. After using it for just a week, I feel so much better. Highly recommend it for anyone with digestive discomfort",
              rating: 2,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Ai Boi", "photo-path": "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg" },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp" },
              comment:
                "Versatile digestive support. Whether I’m feeling gassy, bloated, or just need help digesting heavy meals, DigestAid always comes through. I like that it targets various digestive issues in one product",
              rating: 4,
              timestamp: "Dec 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg",
              },
              comment:
                "A must-have for gut health enthusiasts. DigestAid has become a staple in my daily routine. It's helped me stay regular and feel lighter throughout the day. It’s a comprehensive solution for anyone focused on gut health",
              rating: 3,
              timestamp: "Feb 16, 2024",
            },
          ],
        },
      },
      {
        id: 5,
        title: "Pet walker",
        category: "abc Category",
        price: "$30.00",
        rating: 4.9,
        reviews: "720 reviews",
        image: images.serviceImg3,
        isWishListed: true,
        provider_name: "ABC Service Provider Name",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",

        reviews: {
          count: 157,
          comments: [
            {
              user: {
                name: "D. David",
                "photo-path":
                  "https://media.istockphoto.com/id/1347005975/photo/portrait-of-a-serious-muslim-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=mxRUDCuwDD3ML6-vMaUlTY7Ghqlj2R_LOhWWCB5CTXE=",
              },
              comment:
                "Excellent product for digestive relief! DigestAid worked wonders for my bloating and indigestion. After using it for just a week, I feel so much better. Highly recommend it for anyone with digestive discomfort",
              rating: 2,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Ai Boi", "photo-path": "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg" },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp" },
              comment:
                "Versatile digestive support. Whether I’m feeling gassy, bloated, or just need help digesting heavy meals, DigestAid always comes through. I like that it targets various digestive issues in one product",
              rating: 4,
              timestamp: "Dec 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg",
              },
              comment:
                "A must-have for gut health enthusiasts. DigestAid has become a staple in my daily routine. It's helped me stay regular and feel lighter throughout the day. It’s a comprehensive solution for anyone focused on gut health",
              rating: 3,
              timestamp: "Feb 16, 2024",
            },
          ],
        },
      },
      {
        id: 6,
        title: "Drug Consultation",
        category: "abc Category",
        price: "$30.00",
        rating: 4.9,
        reviews: "720 reviews",
        image: images.serviceImg3,
        isWishListed: true,
        provider_name: "ABC Service Provider Name",
        description:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        reviews: {
          count: 157,
          comments: [
            {
              user: {
                name: "D. David",
                "photo-path":
                  "https://media.istockphoto.com/id/1347005975/photo/portrait-of-a-serious-muslim-young-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=mxRUDCuwDD3ML6-vMaUlTY7Ghqlj2R_LOhWWCB5CTXE=",
              },
              comment:
                "Excellent product for digestive relief! DigestAid worked wonders for my bloating and indigestion. After using it for just a week, I feel so much better. Highly recommend it for anyone with digestive discomfort",
              rating: 2,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Ai Boi", "photo-path": "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg" },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8" },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: { name: "Athalia Putri", "photo-path": "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp" },
              comment:
                "Versatile digestive support. Whether I’m feeling gassy, bloated, or just need help digesting heavy meals, DigestAid always comes through. I like that it targets various digestive issues in one product",
              rating: 4,
              timestamp: "Dec 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://shotkit.com/wp-content/uploads/bb-plugin/cache/cool-profile-pic-matheus-ferrero-landscape-6cbeea07ce870fc53bedd94909941a4b-zybravgx2q47.jpeg",
              },
              comment:
                "A must-have for gut health enthusiasts. DigestAid has become a staple in my daily routine. It's helped me stay regular and feel lighter throughout the day. It’s a comprehensive solution for anyone focused on gut health",
              rating: 3,
              timestamp: "Feb 16, 2024",
            },
          ],
        },
      },
    ],
  },
  first_page_url: "http://localhost/food_app/admin-api/branches?page=1",
  from: 1,
  last_page: 2,
  last_page_url: "http://localhost/food_app/admin-api/branches?page=2",
  links: [
    {
      url: null,
      label: "&laquo; Previous",
      active: false,
    },
    {
      url: "http://localhost/food_app/admin-api/branches?page=1",
      label: "1",
      active: true,
    },
    {
      url: "http://localhost/food_app/admin-api/branches?page=2",
      label: "2",
      active: false,
    },
    {
      url: "http://localhost/food_app/admin-api/branches?page=2",
      label: "Next &raquo;",
      active: false,
    },
  ],
  next_page_url: "http://localhost/food_app/admin-api/branches?page=2",
  path: "http://localhost/food_app/admin-api/branches",
  per_page: 10,
  prev_page_url: null,
  to: 10,
  total: 11,
};

export const orderLogsData = {
  status: true,
  message: "Subscription logs",
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        order_id: "#123456",
        order_date: "2024-06-25T14:29:37.000000Z",
        amount: "100",
        shop_name: "Shop ABC",
        status: "delivered",
        contact_information: {
          user_name: "Tom Albert",
          phone_number: "+19159969739",
          email: "tomalbert@gmail.com",
        },
        shipping_address: {
          user_name: "Tom Albert",
          phone_number: "+19159969739",
          address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod",
          country: "XYZ",
          state: "XYZ",
          city: "XYZ",
          zip_code: "123456",
        },
        billing_address: {
          user_name: "Tom Albert",
          phone_number: "+19159969739",
          address: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod",
          country: "XYZ",
          state: "XYZ",
          city: "XYZ",
          zip_code: "123456",
        },
      },
      {
        id: 2,
        order_id: "#123456",
        order_date: "2024-06-25T14:29:37.000000Z",
        amount: "100",
        shop_name: "Shop ABC",
        status: "cancelled",
      },
      {
        id: 3,
        order_id: "#123456",
        order_date: "2024-06-25T14:29:37.000000Z",
        amount: "100",
        shop_name: "Shop ABC",
        status: "pending",
      },
      {
        id: 4,
        order_id: "#123456",
        order_date: "2024-06-25T14:29:37.000000Z",
        amount: "100",
        shop_name: "Shop ABC",
        status: "delivered",
      },
      {
        id: 5,
        order_id: "#123456",
        order_date: "2024-06-25T14:29:37.000000Z",
        amount: "100",
        shop_name: "Shop ABC",
        status: "cancelled",
      },
    ],
    first_page_url: "http://localhost/food_app/admin-api/branches?page=1",
    from: 1,
    last_page: 2,
    last_page_url: "http://localhost/food_app/admin-api/branches?page=2",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=1",
        label: "1",
        active: true,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=2",
        label: "2",
        active: false,
      },
      {
        url: "http://localhost/food_app/admin-api/branches?page=2",
        label: "Next &raquo;",
        active: false,
      },
    ],
    next_page_url: "http://localhost/food_app/admin-api/branches?page=2",
    path: "http://localhost/food_app/admin-api/branches",
    per_page: 10,
    prev_page_url: null,
    to: 10,
    total: 11,
  },
};
