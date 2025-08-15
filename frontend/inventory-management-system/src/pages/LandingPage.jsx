import Card from "../components/common/Card";
import infographic from "../assets/infographic.jpg";
import { useEffect, useState } from "react";
import {
  Package,
  Target,
  Eye,
  Mail,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const ABOUT_US = [
  {
    title: "About Us",
    description:
      "We are a company dedicated to providing the best inventory management solutions with innovative technology and exceptional service quality.",
    icon: Package,
  },
  {
    title: "Our Mission",
    description:
      "To simplify inventory management for businesses of all sizes through intelligent automation and seamless user experiences.",
    icon: Target,
  },
  {
    title: "Our Vision",
    description:
      "To be the leading provider of innovative inventory management systems that empower businesses to achieve operational excellence.",
    icon: Eye,
  },
  {
    title: "Contact Us",
    description:
      "Ready to transform your inventory management? Reach out to us at contact@inventorymanagement.com for personalized consultation.",
    icon: Mail,
  },
];

const features = [
  "Real-time inventory tracking",
  "Advanced analytics & reporting",
  "Multi-location management",
  "Automated reorder alerts",
];

function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-white to-gray-50 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='m0 40 40-40h-40z'/%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div
            className={`flex flex-col lg:flex-row items-center justify-between transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Hero Content */}
            <div className="flex-1 text-center lg:text-left lg:pr-12 mb-12 lg:mb-0">
              <div className="mb-6">
                <span className="inline-flex items-center bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Trusted by 500+ businesses worldwide
                </span>
              </div>

              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Your Seamless
                <span className="block text-blue-600">
                  Inventory Management
                </span>
                <span className="block">System</span>
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl">
                Manage your inventory with ease and precision. Streamline
                operations, reduce costs, and boost efficiency with our
                comprehensive solution.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button className="group bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 flex items-center justify-center">
                  Get Started Today
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                <button className="group bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center">
                  Watch Demo
                  <Package className="w-5 h-5 ml-2" />
                </button>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="flex-1 max-w-lg">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-10 blur-xl"></div>
                <div className="relative bg-white rounded-2xl shadow-2xl p-2 border border-gray-100">
                  <img
                    src={infographic}
                    alt="Inventory Management Dashboard"
                    className="w-full h-80 object-cover rounded-xl"
                  />
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                    <span className="text-blue-600 font-semibold text-sm flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                      Live Dashboard
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                99.9%
              </div>
              <div className="text-gray-600 font-medium">System Uptime</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                500+
              </div>
              <div className="text-gray-600 font-medium">Happy Clients</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                50M+
              </div>
              <div className="text-gray-600 font-medium">Items Managed</div>
            </div>
            <div className="group hover:scale-105 transition-transform duration-300">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                24/7
              </div>
              <div className="text-gray-600 font-medium">Expert Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`text-center mb-16 transition-all duration-1000 delay-300 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Businesses Choose Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the key factors that make us the preferred inventory
              management partner for growing businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {ABOUT_US.map((item, index) => (
              <Card
                key={index}
                title={item.title}
                description={item.description}
                icon={item.icon}
                delay={index * 200}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-16">
        <div
          className={`max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 transition-all duration-1000 delay-500 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h3 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Business Operations?
          </h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of businesses that have streamlined their inventory
            management with our comprehensive solution.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 hover:bg-gray-50 font-semibold py-4 px-8 rounded-lg transition-all duration-300 hover:shadow-lg">
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-4 px-8 rounded-lg transition-all duration-300">
              Schedule Demo
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}

export default LandingPage;
