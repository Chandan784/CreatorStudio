import Footer from "@/components/common/Footer";
import RequestCall from "@/components/homepage/RequestCall";
import Header from "@/components/common/Header";
import Details from "@/components/common/Details";

export default function Home() {
  return (
    <>
      <Header />
      <Details />
      <RequestCall />
      <Footer />
    </>
  );
}