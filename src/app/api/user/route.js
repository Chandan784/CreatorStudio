import mongoose from "mongoose";

// MongoDB Connection
const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(
      "mongodb+srv://chandansamantaray784:8TSC0mRSNNY5KJU6@cluster0.b3c32xr.mongodb.net/CreatorStudio",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
};

// MongoDB Schema and Model
const OnboardRequestSchema = new mongoose.Schema({
  name: String,
  mobile: String,
  city: String,
});
const OnboardRequest =
  mongoose.models.OnboardRequest ||
  mongoose.model("OnboardRequest", OnboardRequestSchema);

// Handle POST Requests
export async function POST(req) {
  try {
    const body = await req.json(); // Parse the incoming request body
    const { name, mobile, city } = body;

    // Validate input
    if (!name || !mobile || !city) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Connect to the database and save the user data
    await connectDB();
    const newUser = new OnboardRequest({ name, mobile, city });
    await newUser.save();

    return new Response(
      JSON.stringify({ message: "User saved successfully" }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to save user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// Handle other HTTP methods (optional, e.g., GET)
export async function GET(req) {
  try {
    await connectDB();
    const users = await OnboardRequest.find();

    return new Response(JSON.stringify(users), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch users" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
