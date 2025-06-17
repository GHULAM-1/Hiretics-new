"use client";
import React from "react";
import { Sidebar } from "@/components/layout/SideBar";
import { Header } from "@/components/layout/Header";
import { useState, useEffect } from "react";
import { MobileHeader } from "@/components/layout/MobileHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { stripePromise } from "@/lib/stripe";
import { toast } from "sonner";
import axios from "axios";

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with basic campaign management",
    features: [
      "Up to 3 campaigns",
      "Basic analytics",
      "Email support",
      "Standard templates",
      "100 applications per month",
    ],
    limitations: [
      "Limited customization",
      "No advanced analytics",
      "No priority support",
      "No team collaboration",
    ],
    popular: false,
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$29",
    period: "per month",
    description: "Advanced features for growing businesses and teams",
    features: [
      "Unlimited campaigns",
      "Advanced analytics & insights",
      "Priority email & chat support",
      "Custom templates & branding",
      "Unlimited applications",
      "Team collaboration tools",
      "API access",
      "Advanced reporting",
      "Custom integrations",
    ],
    limitations: [],
    popular: true,
    buttonText: "Subscribe",
    buttonVariant: "default" as const,
  },
];

export default function PricingPage() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser || "{}");

  const updateUserSubscription = async () => {
    if (user.id) {
      await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL_SUBSCRIPTION}/subs?user_id=${user.id}`,
        {
          user_id: user.id,
          plan: "pro",
        }
      );
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (sessionId) {
      toast.success("🎉 Subscription successful! Welcome to Pro!", {
        duration: 5000,
      });
      updateUserSubscription();
      window.history.replaceState({}, document.title, "/pricing");
    }
  }, []);

  const handleSubscribe = async () => {
    try {
      setIsLoading(true);
      if (!user.id) {
        toast.error("Please log in to subscribe");
        return;
      }
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
        }),
      });

      const session = await response.json();

      if (response.ok) {
        const stripe = await stripePromise;
        const { error } = await stripe!.redirectToCheckout({
          sessionId: session.id,
        });

        if (error) {
          console.error("Error:", error);
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error(session.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="w-full bg-muted/20">
        <div className="max-w-[1440px] mx-auto flex px-0 lg:px-6 lg:pt-6 pt-2">
          <div className="border-[#E4E4E7] border-[1px] shadow-md rounded-[6px] h-screen">
            <Sidebar
              isMobileOpen={isMobileOpen}
              setIsMobileOpen={setIsMobileOpen}
              collapsed={collapsed}
              setCollapsed={setCollapsed}
            />
          </div>

          <div className="flex-1 flex flex-col">
            <MobileHeader
              onMobileMenuClick={() => setIsMobileOpen(true)}
              title="Pricing Plans"
            />

            <Header
              title="Pricing Plans"
              subtitle="Choose the perfect plan for your hiring needs"
              user={{ name: "Abdul Moiz", avatarUrl: "" }}
            />

            <div className="flex-1 p-6 overflow-auto pb-20">
              {/* Header Section */}
              <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Simple, Transparent Pricing
                </h1>
                <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                  Start for free and scale as you grow. No hidden fees, no
                  surprises.
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-stretch">
                {pricingPlans.map((plan, index) => (
                  <Card
                    key={plan.name}
                    className={`relative rounded-xl shadow-lg border transition-all duration-200 hover:shadow-xl h-full flex flex-col ${
                      plan.popular
                        ? "border-[#16A34A] ring-2 ring-[#16A34A]/20 scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-[#16A34A] text-white px-4 py-2 rounded-full text-sm font-medium">
                          Most Popular
                        </span>
                      </div>
                    )}

                    <CardHeader className="text-center pb-4">
                      <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </CardTitle>
                      <div className="mb-4">
                        <span className="text-5xl font-bold text-gray-900">
                          {plan.price}
                        </span>
                        <span className="text-gray-600 ml-2">
                          {plan.name === "Free" ? plan.period : plan.period}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {plan.description}
                      </p>
                    </CardHeader>

                    <CardContent className="flex-1 flex flex-col space-y-6">
                      {/* Features */}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-3">
                          What's included:
                        </h4>
                        <ul className="space-y-3">
                          {plan.features.map((feature, featureIndex) => (
                            <li
                              key={featureIndex}
                              className="flex items-start gap-3"
                            >
                              <Check className="h-5 w-5 text-[#16A34A] mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700 text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Limitations (only for Free plan) */}
                        {plan.limitations.length > 0 && (
                          <div className="mt-6">
                            <h4 className="font-semibold text-gray-900 mb-3">
                              Limitations:
                            </h4>
                            <ul className="space-y-3">
                              {plan.limitations.map(
                                (limitation, limitationIndex) => (
                                  <li
                                    key={limitationIndex}
                                    className="flex items-start gap-3"
                                  >
                                    <X className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-500 text-sm">
                                      {limitation}
                                    </span>
                                  </li>
                                )
                              )}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4">
                        <Button
                          variant={plan.buttonVariant}
                          onClick={
                            plan.name === "Pro" ? handleSubscribe : undefined
                          }
                          disabled={plan.name === "Pro" && isLoading}
                          className={`w-full h-12 text-base font-medium ${
                            plan.popular
                              ? "bg-[#16A34A] hover:bg-[#15803D] text-white"
                              : "border-[#16A34A] text-[#16A34A] hover:bg-[#F0FDF4]"
                          }`}
                        >
                          {plan.name === "Pro" && isLoading
                            ? "Processing..."
                            : plan.buttonText}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
