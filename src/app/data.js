const studios = [];

for (let i = 1; i <= 20; i++) {
  studios.push({
    id: i,
    name: `Studio ${i}`,
    email: `studio${i}@example.com`,
    phone: `9876543${100 + i}`,
    address: `${i}th Cross, MG Road`,
    landmark: `Near Landmark ${i}`,
    location: ["Indiranagar", "Koramangala", "Whitefield", "Jayanagar"][i % 4],
    city: "Bangalore",
    pincode: "5600" + ((i % 10) + 10),
    facilities: [
      "WiFi",
      "Parking",
      "Restrooms",
      i % 2 === 0 ? "Cafeteria" : "Green Screen",
    ],
    images: [
      "https://images.pexels.com/photos/164938/pexels-photo-164938.jpeg", // Only this image
    ],
    equipment: [
      {
        category: ["Camera", "Lighting", "Microphone", "Tripod"][i % 4],
        subcategory: ["DSLR", "Softbox", "Wireless", "Professional"][i % 4],
        model: `Model ${i}`,
        quantity: Math.ceil(Math.random() * 5),
        image: `https://example.com/equipment${i}.jpg`,
        questions: { "Feature 1": "Yes", "Feature 2": "No" },
      },
    ],
    distance: Math.ceil(Math.random() * 15),
    rating: (Math.random() * 2 + 3).toFixed(1),
    price: `₹${(Math.ceil(Math.random() * 5) + 1) * 1000}`,
    category: ["Photography Studio", "Recording Studio", "Film Set"][i % 3],
    createdAt: new Date(),
  });
}

module.exports = studios;
