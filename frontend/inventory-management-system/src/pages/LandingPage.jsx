import React from "react";
import NavBar from "../components/NavBar";
import Card from "../components/Card";
import Footer from "../components/Footer";

const ABOUT_US = [
  {
    title: "About Us",
    description:
      "We are a company dedicated to providing the best inventory management solutions.",
  },
  {
    title: "Our Mission",
    description:
      "To simplify inventory management for businesses of all sizes.",
  },
  {
    title: "Our Vision",
    description:
      "To be the leading provider of innovative inventory management systems.",
  },
  {
    title: "Contact Us",
    description:
      "For inquiries, please reach out to us at contact@inventorymanagement.com",
  },
];

function LandingPage() {
  return (
    <>
      <div>
        {" "}
        <NavBar />
      </div>

      <div className="flex flex-col items-center justify-center h-screen mx-auto w-4/5 ">
        <div className="text-center my-8 h-64 w-full items-center justify-center">
          <h2 className="text-2xl font-bold mb-4 ">
            Your Seamless Inventory Management System
          </h2>
          <p className="text-lg mb-8">Manage your inventory with ease.</p>
        </div>

        {/* about us */}
        <div className="flex flex-row gap-2.5 mt-4">
          {ABOUT_US.map((item, index) => (
            <Card
              key={index}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </>
  );
}

export default LandingPage;
