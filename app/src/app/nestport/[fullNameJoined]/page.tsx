"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Twitter, Linkedin, Instagram, Facebook, Youtube } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
interface Project {
  id: string;
  name: string;
  liveUrl: string | null;
  imageUrl: string | null;
  description: string | null;
}

interface PortfolioWithUser {
  id: string;
  fullName: string;
  skill: string;
  description: string | null;
  profilePhoto: string | null;
  projects: Project[];
  user: {
    solWalletAddress: string | null;
    twitterUrl: string | null; // Add social URLs
    linkedInUrl: string | null;
    instagramUrl: string | null;
    facebookUrl: string | null;
    youTubeUrl: string | null;
  };
}

const PortfolioDetailPage = () => {
  const { fullNameJoined: routeFullnameJoined } = useParams<{
    fullNameJoined: string;
  }>();
  const [portfolio, setPortfolio] = useState<PortfolioWithUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (routeFullnameJoined) {
        console.log(routeFullnameJoined);
        try {
          const response = await fetch(`/api/nestport`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ fullNameJoined: routeFullnameJoined }),
          });

          if (!response.ok) {
            if (response.status === 307) {
              router.replace(response.headers.get("Location") || "/");
              return;
            }
            const errorData = await response.json();
            throw new Error(
              errorData.error || `HTTP error! status: ${response.status}`
            );
          }

          const data = await response.json();
          setPortfolio(data);
          setLoading(false);
        } catch (err: any) {
          console.error("Error fetching portfolio:", err);
          setError("Failed to load portfolio details.");
          setLoading(false);
        }
      }
    };

    fetchPortfolio();
  }, [routeFullnameJoined, router]);

  const handleCopyToWallet = () => {
    if (portfolio?.user?.solWalletAddress) {
      navigator.clipboard
        .writeText(portfolio.user.solWalletAddress)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => {
            setCopySuccess(false);
          }, 2000);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy wallet address.");
        });
    } else {
      alert("No wallet address available.");
    }
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5, delayChildren: 0.2, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  const profileImageVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.4, delay: 0.3 },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <motion.div
          className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"
          role="status"
          aria-label="loading"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360, transition: { loop: Infinity, duration: 1 } }}
        />
        <p className="mt-2 text-gray-500"></p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  }

  if (!portfolio) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <motion.div
          className="bg-white p-8 rounded-lg shadow-md"
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h2
            className="text-2xl font-bold text-gray-800 mb-4 text-center"
            variants={itemVariants}
          >
            Oops!
          </motion.h2>
          <motion.p
            className="text-gray-700 text-center"
            variants={itemVariants}
            transition={{ delay: 0.2 }}
          >
            We couldn't find a portfolio with that name.
          </motion.p>
          <motion.p
            className="text-gray-700 text-center mt-4"
            variants={itemVariants}
            transition={{ delay: 0.4 }}
          >
            Perhaps there was a typo in the URL, or the portfolio hasn't been
            created yet.
          </motion.p>
          <motion.div
            className="mt-6 flex justify-center"
            variants={itemVariants}
            transition={{ delay: 0.6 }}
          >
            <Link href="/" className="text-blue-500 hover:underline">
              Go back to the main page
            </Link>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gray-100 py-12"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <motion.div
        className=" mx-auto  rounded-lg overflow-hidden"
        variants={itemVariants}
      >
        <motion.div
          className="relative h-64 overflow-hidden "
          variants={profileImageVariants}
        >
          {portfolio?.profilePhoto && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-gray-400 rounded-full transform -translate-x-1/2 scale-125 opacity-90 blur-md"></div>

              <Avatar className="w-60 h-60 rounded-full bg-purple-200 text-purple-700 mb-2 relative z-10">
                <img
                  src={portfolio.profilePhoto}
                  alt={portfolio.fullName}
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                />
              </Avatar>
            </div>
          )}
        </motion.div>

        <div className="px-8 py-2">
          <motion.h1
            className="text-3xl font-semibold text-gray-800 text-center mt-4 mb-2"
            variants={itemVariants}
          >
            {portfolio?.fullName}
          </motion.h1>
          <motion.p
            className="text-lg text-gray-600 text-center mb-4"
            variants={itemVariants}
            transition={{ delay: 0.1 }}
          >
            {portfolio.skill &&
              portfolio.skill.split(",").map((skill: string, index: number) => (
                <span
                  key={index}
                  className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700"
                >
                  {skill.trim()}
                </span>
              ))}
          </motion.p>
          {portfolio?.description && (
            <motion.p
              className="text-gray-700 mb-6 mx-auto max-w-3xl text-center"
              variants={itemVariants}
              transition={{ delay: 0.2 }}
            >
              {portfolio.description}
            </motion.p>
          )}
          <motion.div
            className="flex justify-center gap-4 mb-6"
            variants={itemVariants}
            transition={{ delay: 0.4 }}
          >
            {portfolio?.user?.twitterUrl && (
              <a
                href={portfolio.user.twitterUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
            )}
            {portfolio?.user?.linkedInUrl && (
              <a
                href={portfolio.user.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            )}
            {portfolio?.user?.instagramUrl && (
              <a
                href={portfolio.user.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
            )}
            {portfolio?.user?.facebookUrl && (
              <a
                href={portfolio.user.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
            )}
            {portfolio?.user?.youTubeUrl && (
              <a
                href={portfolio.user.youTubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-red-600 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-6 w-6" />
              </a>
            )}
          </motion.div>

          <motion.div
            className="flex justify-center gap-2 mb-6"
            variants={itemVariants}
            transition={{ delay: 0.3 }}
          >
            <div className="text-primary mt-2">Tip Solana? 💰</div>

            {portfolio?.user?.solWalletAddress && (
              <Button
                variant="outline"
                className="bg-black text-white "
                onClick={handleCopyToWallet}
              >
                Copy Address
              </Button>
            )}
          </motion.div>

          {copySuccess && (
            <motion.div
              className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg z-50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              Wallet address copied!
            </motion.div>
          )}
        </div>
        <div className="bg-gray-200  px-4 lg:px-8 md:px-4 py-5">
          {portfolio?.projects && portfolio.projects.length > 0 && (
            <motion.div
              className="mt-8"
              variants={itemVariants}
              transition={{ delayChildren: 0.1, staggerChildren: 0.05 }}
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Projects
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.projects.map((project) => (
                  <motion.div
                    key={project.id}
                    className="bg-gray-100 rounded-md shadow-md border border-gray-300 p-4"
                    variants={itemVariants}
                  >
                    <h3 className="font-semibold text-lg mb-2">
                      {project.name}
                    </h3>
                    {project.imageUrl && (
                      <div className="rounded-md overflow-hidden mb-2">
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          width={600}
                          height={400}
                          className="object-cover w-full h-auto"
                        />
                      </div>
                    )}
                    <p className="text-gray-700 text-sm line-clamp-2 mb-2">
                      {project.description}
                    </p>
                    {project.liveUrl && (
                      <motion.div
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <Link
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-primary text-white rounded-full p-1 px-2 text-sm"
                        >
                          Visit Live
                        </Link>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PortfolioDetailPage;
