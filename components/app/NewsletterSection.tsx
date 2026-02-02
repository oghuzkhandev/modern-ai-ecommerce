"use client";

import { useState } from "react";
import { Mail, Gift, Percent, Bell, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const benefits = [
  { icon: Gift, text: "Exclusive offers & early access" },
  { icon: Percent, text: "10% off your first order" },
  { icon: Bell, text: "New arrivals & restocks" },
];

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsLoading(false);
    setIsSubmitted(true);
    setEmail("");

    // Reset after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-600 py-16">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-2 backdrop-blur-sm">
              <Mail className="h-4 w-4" />
              <span className="text-sm font-medium">
                Join 10,000+ subscribers
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Get Exclusive Deals
              <span className="block">Delivered to Your Inbox</span>
            </h2>

            <p className="text-lg text-white/90">
              Subscribe to our newsletter and never miss out on special offers,
              new arrivals, and interior design tips.
            </p>

            {/* Benefits */}
            <ul className="space-y-3">
              {benefits.map((benefit, idx) => {
                const Icon = benefit.icon;
                return (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-white/90">{benefit.text}</span>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Right Column - Form */}
          <div className="rounded-2xl bg-white p-8 shadow-2xl dark:bg-zinc-900">
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                  <CheckCircle className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                    You're all set!
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Check your inbox for a confirmation email and your 10% off
                    code.
                  </p>
                </div>
              </motion.div>
            ) : (
              <>
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Get 10% Off
                  </h3>
                  <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    Sign up now and receive an exclusive discount code.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="h-12 border-zinc-300 bg-white dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
                  >
                    {isLoading ? (
                      <>
                        <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        Subscribe Now
                        <Mail className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    By subscribing, you agree to our Privacy Policy and consent
                    to receive updates.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
