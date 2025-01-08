import Footer from "@/components/common/Footer";
import RequestCall from "@/components/homepage/RequestCall";
import Header from "@/components/common/Header";
import Details from "@/components/common/Details";
import StepsToPartner from "@/components/homepage/StepsToPartner";

export default function Home() {
  return (
    <>
      <Header />
      <Details />
      <StepsToPartner />
      <RequestCall />
      <Footer />
    </>
  );
}