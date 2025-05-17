# Nestsite Web3 for Creators

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Next.js](https://img.shields.io/badge/Next.js-v14+-blue?logo=next.js)
![Civic Auth](https://img.shields.io/badge/Civic%20Auth-Web3-brightgreen?logo=civic)

## Overview

Nestsite is a revolutionary Web3 platform meticulously crafted to empower online creators by addressing critical challenges associated with traditional centralized platforms. This innovative solution provides creators with the tools they need to establish a strong, independent online presence, take full ownership of their content and earnings, and seamlessly integrate with the burgeoning Web3 ecosystem. Built with Next.js, this repository houses the codebase for the web3-enabled Nestsite, thoughtfully structured to separate the public-facing landing page from the core creator application.

## What is Nestsite?

Nestsite is a comprehensive and user-friendly platform designed to equip online creators with a diverse suite of tools to thrive in the decentralized web. Recognizing the limitations and drawbacks of existing centralized platforms, Nestsite offers a pathway for creators to regain control over their digital lives and unlock new monetization opportunities within the Web3 space.

![Nestsite Preview](https://res.cloudinary.com/dqny2b4gb/image/upload/v1747436714/rrrehcjwutnod2zxrray.png)

**You can visit the live Nestsite platform here: [https://nestsite.vercel.app](https://nestsite.vercel.app)**

**See a preview of a creator's portfolio built with Nestsite: [https://nestsite-app.vercel.app/nestport/nzubechi-samuel](https://nestsite-app.vercel.app/nestport/nzubechi-samuel)**

### The Problem Nestsite Solves

In today's digital landscape, creators often face significant hurdles:

- **Over-reliance on Centralized Platforms:** Creators are often bound by the rules, algorithms, and monetization policies of large social media and content-sharing platforms. This dependency can lead to instability, censorship, and significant portions of their earnings being siphoned off.
- **Struggles with Monetization:** Generating sustainable income can be a constant challenge for creators. Traditional platforms often impose high fees, complex payout structures, and limited options for direct fan support.
- **Lack of Ownership and Control:** Creators often lack true ownership and control over their content and the data associated with it. Platform policies can change without notice, impacting their reach and revenue streams. Furthermore, the integration of newer Web3 technologies like cryptocurrency payments and blockchain-based content ownership is often absent.
- **Technical Barriers to Independence:** Building and managing a personal website or platform that offers greater freedom and control can be technically daunting for many creators, who may lack the necessary coding skills or resources to navigate complex payment systems, security measures, and professional online presence setup. The landscape of online tools can be fragmented and overwhelming.

### Our Solution: Empowering Creators in the Web3 Era

Nestsite offers a unified and intuitive platform that empowers creators to overcome these challenges and embrace the benefits of Web3:

- **Easy Portfolio Builder:** Creators can effortlessly build professional and visually appealing websites to showcase their diverse work, including videos, embedded links, digital art, and more. This drag-and-drop interface requires no coding knowledge, allowing creators to establish a personalized online hub.
- **Crypto Payments Made Simple:** Nestsite enables creators to seamlessly accept payments in various cryptocurrencies from a global audience. This direct payment method reduces transaction fees and eliminates the need for intermediaries, putting more earnings directly into the creators' pockets.
- **Web3 Storefronts:** Creators can establish their own fully functional online stores to sell digital products (e.g., ebooks, music, templates), merchandise, or exclusive content directly to their fans. Leveraging Web3 principles ensures greater transparency and potential for innovative ownership models.
- **Crypto Ticketing for Events:** Nestsite facilitates the secure and transparent sale of tickets for both online and in-person events using cryptocurrencies. Blockchain technology can enhance ticket authenticity, prevent fraud, and offer new ways for creators to engage with their audience.
- **Booking Management:** For service-based creators (e.g., consultants, coaches, artists offering commissions), Nestsite provides an intuitive system for managing appointments and bookings. Integrating blockchain technology can add a layer of trust and immutability to scheduling and agreements.

By consolidating these essential tools into a single, user-friendly platform, Nestsite significantly lowers the barrier to entry for creators looking to leverage the power of Web3. We provide the infrastructure and intuitive interfaces necessary for creators to gain more freedom, exercise greater control over their income and content, and cultivate stronger, more direct relationships with their audience, ultimately fostering sustainable and independent online careers.

## Nestsite Solution: Embracing Web3

This iteration of Nestsite deeply integrates Web3 technologies to provide creators with a distinct advantage:

- **Decentralized Authentication via Civic Auth:** By utilizing Civic Auth, creators can securely authenticate their identity using their web3 wallets. This method offers a more user-centric and potentially censorship-resistant alternative to traditional logins, placing control back in the hands of the creator.
- **Seamless Creator Wallet Integration:** Civic Auth facilitates the effortless connection of creators' existing web3 wallets to the Nestsite platform. This foundational integration paves the way for future enhancements, such as accepting cryptocurrency payments directly into their wallets and exploring tokenized access to exclusive content.
- **Enhanced Security and Trust:** Leveraging the inherent security of blockchain technology for authentication and future wallet interactions provides a more robust and trustworthy environment for creators and their valuable data.

## Civic Auth Integration

This project incorporates [Civic Auth](https://www.civic.com/) as a cornerstone for both secure authentication and streamlined wallet management for creators within the Nestsite ecosystem.

### Why Civic Auth?

- **Frictionless Web3 Onboarding:** Civic Auth offers a smooth and intuitive authentication process for users already familiar with web3 wallets, minimizing friction and encouraging adoption.
- **Direct Wallet Connectivity:** It enables creators to seamlessly link their preferred cryptocurrency wallets to the Nestsite platform, establishing a direct connection to the Web3 ecosystem.
- **Robust Security Infrastructure:** By leveraging the cryptographic security of blockchain technology for authentication, Civic Auth significantly enhances the protection of user accounts against unauthorized access.
- **Foundation for Future Web3 Capabilities:** Integrating wallet connectivity is a strategic step towards unlocking a wide range of future Web3 functionalities, including direct cryptocurrency payments, tokenized content access, decentralized governance, and more.
- **Empowering User Ownership:** Authenticating with their own web3 wallets grants creators greater autonomy and control over their digital identity and interactions within the Nestsite platform.

### How Civic Auth is Implemented:

1.  **Secure and Passwordless Sign-in:** Creators can securely log in to their Nestsite accounts using their connected web3 wallets, eliminating the vulnerabilities associated with traditional username and password combinations. This method leverages the security of the user's private keys.
2.  **Wallet as a Digital Identity:** The connected web3 wallet address serves as a unique and verifiable digital identity for the creator within the Nestsite environment, fostering transparency and trust.

## Project Structure

The project's codebase is logically organized into distinct directories to ensure clarity and maintainability:

- **`landing_page/`:** This directory houses all the necessary files, components, and assets for the public-facing landing page of Nestsite. It serves as the initial point of contact for potential users and provides an overview of the platform's features and benefits.
- **`app/`:** This directory contains the core Next.js application that powers the creator platform. It includes user dashboards, content creation tools, web3 integration logic, and all functionalities accessible to logged-in creators.

## Getting Started

To run the Nestsite Web3 project on your local development environment, please follow these instructions:

### Prerequisites

- **Node.js:** Ensure you have Node.js installed on your system (version 18 or later is highly recommended for optimal compatibility). You can download it from [https://nodejs.org/](https://nodejs.org/).
- **npm** or **yarn:** Nestsite utilizes npm or yarn as its package manager. They are typically installed alongside Node.js. You can find more information at [https://www.npmjs.com/](https://www.npmjs.com/) and [https://yarnpkg.com/](https://yarnpkg.com/), respectively.

### Running the Landing Page

1.  Navigate to the `landing_page` directory in your terminal:

    ```bash
    cd landing_page
    ```

2.  Install the required dependencies for the landing page:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the development server for the landing page:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  Once the development server is running, open your web browser and navigate to the address displayed in your terminal (usually `http://localhost:3000`). This will allow you to view and interact with the Nestsite landing page.

### Running the Main Application

1.  Navigate to the `app` directory in your terminal:

    ```bash
    cd app
    ```

2.  Install the necessary dependencies for the main application:

    ```bash
    npm install
    # or
    yarn install
    ```

3.  Start the development server for the main application:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4.  After the development server has started, open your web browser and navigate to the address shown in your terminal (typically `http://localhost:3000`). This will allow you to access and explore the core Nestsite creator application.

**Important Note:** By default, both the landing page and the main application are configured to run on the same local development server port (`http://localhost:3000`). To avoid conflicts, ensure that only one development server is running at any given time, unless you have specifically configured different ports for each.

## Contributing

[Optional: If you intend to accept contributions to this project, please provide clear guidelines for how other developers can contribute. This might include information on code style, branching conventions, and the pull request process.]

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for detailed terms and conditions.

## Acknowledgements

We would like to express our gratitude to the following technologies and communities that have been instrumental in the development of Nestsite Web3:

- [Next.js](https://nextjs.org/) - For providing a powerful and flexible React framework for building performant web applications.
- [Civic Auth](https://www.civic.com/) - For enabling seamless and secure web3 authentication and wallet integration.
