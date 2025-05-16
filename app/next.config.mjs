import { createCivicAuthPlugin } from "@civic/auth-web3/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/dqny2b4gb/**",
      },
    ],
  },
};

const withCivicAuth = createCivicAuthPlugin({
  clientId: "4aaf29b6-a501-4d60-8260-2acf83329545",
});

export default withCivicAuth(nextConfig);
