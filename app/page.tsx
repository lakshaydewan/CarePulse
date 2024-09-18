import PrimaryHeading from "../components/PrimaryHeading";
import Heading_Logo from "../components/Heading_Logo";
import Footer from "@/components/Footer";
import PatientForm from "@/components/Forms/PatientForm";
import Image from "next/image";

export default function Home() {
  return (
      <div className="bg-custom-dark h-screen flex w-screen">
        <div className="lg:min-w-[50vw] w-full lg:px-28 md:px-20 px-10 flex flex-col justify-around">
          <Heading_Logo />
          <div className="flex flex-col gap-7">
            <PrimaryHeading heading="Hi, There 👋" subHeading="Get started with your appointments"></PrimaryHeading>
            <PatientForm />
          </div>
          <Footer></Footer>
        </div>
        <div className="lg:w-full h-screen w-0 overflow-hidden flex justify-center rounded-md">
            <Image className="min-w-[1024px]" src={"/assets/images/onboarding-img.png"} alt="onboarding-img" width={1000} height={1000}/>
        </div>
      </div>
  );
}
