import Head from "next/head";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600">
      <Head>
        <title>Marketing Marketplace</title>
        <meta
          name="description"
          content="Find influencers, video editors, scriptwriters, studios, agencies, and businesses for your next project."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-[80vh] text-center px-4">
        <h1 className="text-6xl font-bold text-white mb-4">
          Your Marketing Success Starts Here
        </h1>
        <p className="text-xl text-gray-200 mb-8">
          Connect with top influencers, video editors, scriptwriters, studios,
          agencies, and businesses to elevate your brand.
        </p>
        <button className="bg-white text-purple-600 px-8 py-4 rounded-lg hover:bg-gray-100 text-lg font-semibold transition duration-300 transform hover:scale-105">
          Get Started
        </button>
      </section>

      {/* What We Do Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            What We Do
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            At <span className="font-bold text-purple-600">MarketPro</span>, we
            specialize in connecting businesses, agencies, and individuals with
            the best talent in the marketing industry. Whether you're a brand
            looking for influencers, a studio seeking video editors, or an
            agency in need of scriptwriters, we provide a seamless platform to
            bring your vision to life.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "👩‍💼",
                title: "Influencer Matching",
                description:
                  "We connect you with the right influencers to amplify your brand’s reach and engagement.",
              },
              {
                icon: "🎬",
                title: "Video Editing",
                description:
                  "Our professional video editors transform raw footage into polished, engaging content.",
              },
              {
                icon: "📝",
                title: "Scriptwriting",
                description:
                  "Get captivating scripts tailored to your brand’s voice and audience.",
              },
              {
                icon: "🎥",
                title: "Studio Rentals",
                description:
                  "Access state-of-the-art studios for your production needs.",
              },
              {
                icon: "🏢",
                title: "Agency Partnerships",
                description:
                  "Collaborate with top agencies to execute large-scale marketing campaigns.",
              },
              {
                icon: "💼",
                title: "Business Solutions",
                description:
                  "Tailored solutions for businesses to streamline their marketing efforts.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-lg shadow-lg text-center hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-6xl mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto mb-12">
            We offer a wide range of services to meet your marketing needs. From
            influencer partnerships to video production, agency collaborations,
            and business solutions, our platform connects you with the best
            professionals in the industry. Here’s how we can help:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Influencers",
                description: "Find the perfect influencer for your brand.",
                icon: "👩‍💼",
                bgColor: "bg-purple-100",
              },
              {
                title: "Video Editors",
                description: "Professional video editing for your content.",
                icon: "🎬",
                bgColor: "bg-blue-100",
              },
              {
                title: "Scriptwriters",
                description: "Engaging scripts to captivate your audience.",
                icon: "📝",
                bgColor: "bg-green-100",
              },
              {
                title: "Studios",
                description: "High-quality studios for your production needs.",
                icon: "🎥",
                bgColor: "bg-yellow-100",
              },
              {
                title: "Agencies",
                description: "Collaborate with top marketing agencies.",
                icon: "🏢",
                bgColor: "bg-indigo-100",
              },
              {
                title: "Businesses",
                description: "Tailored solutions for businesses of all sizes.",
                icon: "💼",
                bgColor: "bg-pink-100",
              },
            ].map((service, index) => (
              <div
                key={index}
                className={`${service.bgColor} p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300`}
              >
                <div className="text-6xl mb-6">{service.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2023 MarketPro. All rights reserved.</p>
      </footer>
    </div>
  );
}
