import { images } from "../Assets";

export const loginCredentials = [
  {
    user_id: 1,
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
    user_id: 1,
    email: "admin@gmail.com",
    password: "123",
    language: "English",
    relationship: "Mother",
    phone: "+1561555768",
    status: true,
    role: "admin",
    message: "Login successfully",
    token: "1165|ihHvE9J6cn1U3St4Sk6v6JKOdm2ARA87hXYbIdS63831040a",
    full_name: "Tom albert",
    first_name: "Tom",
    last_name: "Albert",
    user_name: "albert",
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
        id: 1,
        name: "Ppot (Teapot)",

        short_description:
          "A beautifully crafted ceramic teapot perfect for your morning tea ritual. Made from high-quality materials with an elegant design.",
        description:
          "This is a finely crafted, matte charcoal teapot—its silhouette humble yet commanding, with soft curves that speak to centuries of quiet refinement. Born of fire and earth, its ceramic body bears the delicate speckling of stoneware forged in traditional kilns. The teapot is not merely a vessel, but a silent storyteller—echoing the heritage of East Asian tea traditions, where rituals unfold with grace and intention. Its destiny lies in moments of stillness: cradled between hands during morning solitude, passed reverently during ceremonial gatherings, or quietly steeping on a windowsill as dusk settles. The embossed “HQS” on its base is not just a mark—it is a signature of craftsmanship, a tribute to hands that shaped it and a lineage that spans generations. Rooted in tradition yet timeless in design, this teapot is more than an object—it is a bridge between history and the present, inviting you to pause, pour, and be.",
        price: "18",
        categories: [
          {
            id: 10,
            name: "premium",
            slug: "premium",
          },
          {
            id: 12,
            name: "bio",
            slug: "bio",
          },
          {
            id: 12,
            name: "ritual",
            slug: "ritual",
          },
        ],
        stock_quantity: 5,

        productType: "Physical Product",
        category: "Kitchenware",
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
          {
            name: "Chalk/Gray",
            value: "#808080",
            images: [images.productImage1, images.productImage2],
          },
          {
            name: "Brown",
            value: "#8B4513",
            images: [images.productImage3, images.productImage4],
          },
          {
            name: "Black",
            value: "#000000",
            images: [images.productImage1, images.productImage3],
          },
        ],
        sizes: ["Small", "Medium", "Large"],
        created_at: "2024-01-15T10:30:00.000Z",
      },
      {
        id: 2,
        name: "C-cup (Mug)",
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        price: "18",
        category: "Kitchenware",
        stock_quantity: 5,
        productType: "Physical Product",
        category: "Kitchenware",
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
        id: 3,
        name: "Tee (Tea Tin)",
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Premium tea storage tin with airtight seal to preserve freshness. Features elegant design and keeps your favorite teas organized.",
        price: "25",
        stock_quantity: 5,
        category: "Tea Accessories",
        productType: "Physical Product",
        category: "Kitchenware",
        status_detail: "1",
        photos: [images.productImage3, images.productImage4],
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
        id: 4,
        name: "Gift Card",
        short_description:
          "A comfortable ceramic mug with ergonomic handle design. Perfect for coffee, tea, or any hot beverage. Available in multiple sizes.",
        description:
          "Perfect gift for tea lovers! Redeemable for any products in our store. Available in multiple denominations to suit your needs.",
        price: "CHF 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        category: "Gift Cards",
        status_detail: "1",
        photos: [images.productImage4, images.productImage2],
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
        price: " 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        category: "Gift Cards",
        status_detail: "1",
        photos: [images.productImage5, images.productImage2],
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
        price: " 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        category: "Gift Cards",
        status_detail: "1",
        photos: [images.productImage6, images.productImage2],
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
        price: " 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        category: "Gift Cards",
        status_detail: "1",
        photos: [images.productImage1, images.productImage2],
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
        price: " 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        category: "Gift Cards",
        status_detail: "1",
        photos: [images.productImage7, images.productImage2],
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
        price: " 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        category: "Gift Cards",
        status_detail: "1",
        photos: [images.productImage7, images.productImage2],
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
        price: " 25 / 75 / 150",
        category: "Gift Cards",
        productType: "Digital Product",
        category: "Gift Cards",
        status_detail: "1",
        photos: [images.productImage7, images.productImage2],
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
        photos: [images.productImage3, images.productImage4],
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
        photos: [images.productImage4, images.productImage2],
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

export const giftData = {
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
    backgroundImage:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop",
  },
};

export const ourStoryData = {
  status: true,
  message: "Our Story fetched successfully",
  data: {
    title: "Designed For",
    subtitle: "A Few Not The Many",
    description:
      "A Ritual of Simplicity and Substance At HQSH, we believe that true luxury lies in simplicity...",
    tagline: "At HQSH, we believe that true luxury lies in simplicity...",
    buttonText: "— Our Story",
    buttonLink: "/about",
    backgroundImage: images.heroBannerbg,
  },
};

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
              user: {
                name: "Ai Boi",
                "photo-path":
                  "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
              },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
              },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp",
              },
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
              user: {
                name: "Ai Boi",
                "photo-path":
                  "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
              },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
              },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp",
              },
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
              user: {
                name: "Ai Boi",
                "photo-path":
                  "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
              },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
              },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp",
              },
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
              user: {
                name: "Ai Boi",
                "photo-path":
                  "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
              },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
              },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp",
              },
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
              user: {
                name: "Ai Boi",
                "photo-path":
                  "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
              },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
              },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp",
              },
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
              user: {
                name: "Ai Boi",
                "photo-path":
                  "https://www.profilebakery.com/wp-content/uploads/2024/05/Profile-picture-created-with-ai.jpeg",
              },
              comment:
                "Great for maintaining gut health. I've been using DigestAid regularly, and I've noticed a significant improvement in my overall digestive health. It's a great supplement to keep my gut in check.",
              rating: 4,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepic.photo-cdn.net//assets/images/article/profile.jpg?90af0c8",
              },
              comment:
                "Gentle and effective. I have a sensitive stomach, and DigestAid has been the perfect solution. It’s gentle on my system while effectively easing discomfort after meals.",
              rating: 5,
              timestamp: "Jul 14, 2023",
            },
            {
              user: {
                name: "Athalia Putri",
                "photo-path":
                  "https://newprofilepicapp.com/wp-content/uploads/2024/02/New-Profile-Pic-App.webp",
              },
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
          address:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod",
          country: "XYZ",
          state: "XYZ",
          city: "XYZ",
          zip_code: "123456",
        },
        billing_address: {
          user_name: "Tom Albert",
          phone_number: "+19159969739",
          address:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod",
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

export const productCategoryManagementData = {
  status: true,
  message: "product category listing",
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        categorytitle: "Electronics",
        creationdate: "2024-01-15T10:30:00.000000Z",
        NoofProducts: 25,
        status: 1,
        created_at: "2024-01-15T10:30:00.000000Z",
        updated_at: "2024-01-15T10:30:00.000000Z",
      },
      {
        id: 2,
        categorytitle: "Clothing",
        creationdate: "2024-01-20T14:45:00.000000Z",
        NoofProducts: 18,
        status: 1,
        created_at: "2024-01-20T14:45:00.000000Z",
        updated_at: "2024-01-20T14:45:00.000000Z",
      },
      {
        id: 3,
        categorytitle: "Home & Garden",
        creationdate: "2024-02-01T09:15:00.000000Z",
        NoofProducts: 32,
        status: 1,
        created_at: "2024-02-01T09:15:00.000000Z",
        updated_at: "2024-02-01T09:15:00.000000Z",
      },
      {
        id: 4,
        categorytitle: "Sports & Outdoors",
        creationdate: "2024-02-10T16:20:00.000000Z",
        NoofProducts: 15,
        status: 0,
        created_at: "2024-02-10T16:20:00.000000Z",
        updated_at: "2024-02-10T16:20:00.000000Z",
      },
      {
        id: 5,
        categorytitle: "Books & Media",
        creationdate: "2024-02-15T11:30:00.000000Z",
        NoofProducts: 42,
        status: 1,
        created_at: "2024-02-15T11:30:00.000000Z",
        updated_at: "2024-02-15T11:30:00.000000Z",
      },
    ],
    first_page_url:
      "http://localhost/food_app/admin-api/product-categories?page=1",
    from: 1,
    last_page: 1,
    last_page_url:
      "http://localhost/food_app/admin-api/product-categories?page=1",
    links: [
      {
        url: null,
        label: "&laquo; Previous",
        active: false,
      },
      {
        url: "http://localhost/food_app/admin-api/product-categories?page=1",
        label: "1",
        active: true,
      },
      {
        url: null,
        label: "Next &raquo;",
        active: false,
      },
    ],
    next_page_url: null,
    path: "http://localhost/food_app/admin-api/product-categories",
    per_page: 10,
    prev_page_url: null,
    to: 5,
    total: 5,
  },
};

export const userManagementData = {
  status: true,
  message: "user listing",
  detail: {
    current_page: 1,
    data: [
      {
        id: 1,
        user_name: "Toms",
        relationship: "father",
        language: "English",
        subscription_type: "monthly",
        name: "Darvesh Restuarant",
        email: "darvesh@gmail.com",
        phone: "03656558478",
        lat: 36.3212167,
        lng: 74.66940469,
        status: 1,
        address: "8MCC+G3G, Karim Abad Road, Hunza, Karimabad",
        created_at: "2024-06-25T14:29:37.000000Z",
        updated_at: "2024-07-05T08:21:31.000000Z",
        deleted_at: null,
        status_detail: "1",
        phone_number: "+9158552465",
        role: "branch",
        UserImage:
          "https://upload.wikimedia.org/wikipedia/commons/b/be/Pep_2017_%28cropped%29.jpg",
      },
      {
        id: 2,
        user_name: "Toms",
        relationship: "father",
        language: "English",
        subscription_type: "yearly",
        name: "Darvesh Restuarant",
        email: "darvesh@gmail.com",
        phone: "03656558478",
        lat: 36.3212167,
        lng: 74.66940469,
        status: 0,
        address: "8MCC+G3G, Karim Abad Road, Hunza, Karimabad",
        created_at: "2024-06-25T14:29:37.000000Z",
        updated_at: "2024-07-05T08:21:31.000000Z",
        deleted_at: null,
        status_detail: "0",
        phone_number: "+9658552465",
        role: "branch",
        UserImage:
          "https://upload.wikimedia.org/wikipedia/commons/b/be/Pep_2017_%28cropped%29.jpg",
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

export const userOrderLogsData = {
  status: true,
  message: "user Order Logs logs",
  detail: {
    current_page: 1,
    data: [
      {
        order_iD: "#123456",
        shop_name: "lifeline pharmacy",
        appointment_type: "Online",
        date: "2024-06-25T14:29:37.000000Z",
        orderid: "1",
        amount: "$30",
        status: "Delivered",
        id: "1",
        productlogs: [
          {
            sNo: "01",
            productName: "Digest Aid",
            productDescription: "Pain Relief",
            price: "$10",
            quantity: 10,
            total: "$100",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxUc8YW6VVv5JDUaWDIthYucrtBlhu33WIxhP9CnrNpiGQt-wz_t6GV5UVMRYqFu6Ykk&usqp=CAU",
          },
          {
            sNo: "02",
            productName: "Zinc",
            productDescription: "Antioxidant",
            price: "$20",
            quantity: 20,
            total: "$200",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2C5ilnsaq6kwACZ5ULs_swsKrlo0t_xhBg&s",
          },
          {
            sNo: "03",
            productName: "Omega 3",
            productDescription: "Heart Health",
            price: "$30",
            quantity: 30,
            total: "$300",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0g8S0XeoIdvhHZoSOJNk9cfrZ4gc3x8s3dQ&s",
          },
        ],
        sub_total: "$80.00",
        delivery_charges: "$80.00",
        customerInfo: {
          name: "Tom Albert",
          email: "tomalbert@gmail.com",
          phone: "+1 1234567890",
        },
        shippingAddress: {
          name: "Tom Albert",
          phone: "+1 1234567890",
          country: "America",
          state: "Alaska",
          city: "Juneau",
          zipCode: "99801",
          address: "700 ORCA ST ANCHORAGE AK 99501-4040 USA",
        },
        billingAddress: {
          name: "Tom Albert",
          phone: "+1 1234567890",
          country: "America",
          state: "Alaska",
          city: "Juneau",
          zipCode: "99801",
          address: "700 ORCA ST ANCHORAGE AK 99501-4040 USA",
        },
      },
      {
        id: "2",
        order_iD: "#123456",
        shop_name: "lifeline pharmacy",
        appointment_type: "Online",
        date: "2024-06-25T14:29:37.000000Z",
        orderid: "2",
        amount: "$30",
        status: "Cancelled",
        productlogs: [
          {
            sNo: "01",
            productName: "Digest Aid",
            productDescription: "Pain Relief",
            price: "$10",
            quantity: 10,
            total: "$100",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxUc8YW6VVv5JDUaWDIthYucrtBlhu33WIxhP9CnrNpiGQt-wz_t6GV5UVMRYqFu6Ykk&usqp=CAU",
          },
          {
            sNo: "02",
            productName: "Zinc",
            productDescription: "Antioxidant",
            price: "$20",
            quantity: 20,
            total: "$200",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2C5ilnsaq6kwACZ5ULs_swsKrlo0t_xhBg&s",
          },
          {
            sNo: "03",
            productName: "Omega 3",
            productDescription: "Heart Health",
            price: "$30",
            quantity: 30,
            total: "$300",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0g8S0XeoIdvhHZoSOJNk9cfrZ4gc3x8s3dQ&s",
          },
        ],
        sub_total: "$80.00",
        delivery_charges: "$80.00",
        customerInfo: {
          name: "Tom Albert",
          email: "tomalbert@gmail.com",
          phone: "+1 1234567890",
        },
        shippingAddress: {
          name: "Tom Albert",
          phone: "+1 1234567890",
          country: "America",
          state: "Alaska",
          city: "Juneau",
          zipCode: "99801",
          address: "700 ORCA ST ANCHORAGE AK 99501-4040 USA",
        },
        billingAddress: {
          name: "Tom Albert",
          phone: "+1 1234567890",
          country: "America",
          state: "Alaska",
          city: "Juneau",
          zipCode: "99801",
          address: "700 ORCA ST ANCHORAGE AK 99501-4040 USA",
        },
        cancellation_reason:
          "We’re unable to process your prescription due to missing or incorrect details. Please provide the correct information for us to proceed. The medication you’ve requested is currently out of stock. We’ll notify you once it becomes available, or we can suggest alternatives.",
      },
      {
        id: "3",
        order_iD: "#123456",
        shop_name: "lifeline pharmacy",
        appointment_type: "Online",
        date: "2024-06-25T14:29:37.000000Z",
        orderid: "3",
        amount: "$30",
        status: "Pending",
        productlogs: [
          {
            sNo: "03",
            productName: "Digest Aid",
            productDescription: "Pain Relief",
            price: "$10",
            quantity: 10,
            total: "$100",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmxUc8YW6VVv5JDUaWDIthYucrtBlhu33WIxhP9CnrNpiGQt-wz_t6GV5UVMRYqFu6Ykk&usqp=CAU",
          },
          {
            sNo: "02",
            productName: "Zinc",
            productDescription: "Antioxidant",
            price: "$20",
            quantity: 20,
            total: "$200",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRt2C5ilnsaq6kwACZ5ULs_swsKrlo0t_xhBg&s",
          },
          {
            sNo: "03",
            productName: "Omega 3",
            productDescription: "Heart Health",
            price: "$30",
            quantity: 30,
            total: "$300",
            image:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0g8S0XeoIdvhHZoSOJNk9cfrZ4gc3x8s3dQ&s",
          },
        ],
        cancellation_reason:
          "We’re unable to process your prescription due to missing or incorrect details. Please provide the correct information for us to proceed. The medication you’ve requested is currently out of stock. We’ll notify you once it becomes available, or we can suggest alternatives.",
        sub_total: "$80.00",
        delivery_charges: "$80.00",
        customerInfo: {
          name: "Tom Albert",
          email: "tomalbert@gmail.com",
          phone: "+1 1234567890",
        },
        shippingAddress: {
          name: "Tom Albert",
          phone: "+1 1234567890",
          country: "America",
          state: "Alaska",
          city: "Juneau",
          zipCode: "99801",
          address: "700 ORCA ST ANCHORAGE AK 99501-4040 USA",
        },
        billingAddress: {
          name: "Tom Albert",
          phone: "+1 1234567890",
          country: "America",
          state: "Alaska",
          city: "Juneau",
          zipCode: "99801",
          address: "700 ORCA ST ANCHORAGE AK 99501-4040 USA",
        },
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