"use client";
import { Fragment, useState, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import Logo from "../../media/Frame 50.png";
import Banner from "./Banner";
import { usePathname } from "next/navigation";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  PlayCircleIcon,
  SquaresPlusIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon, PhoneIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
interface NavigationItem {
  name: string;
  href: string;
}

interface SolutionItem {
  name: string;
  description: string;
  href: string;
  icon: React.ElementType;
}

interface CtaItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const navigation: NavigationItem[] = [
  // { name: 'Blog', href: '#' },
  // { name: 'Pricing', href: '#' },
  { name: "Contact", href: "#" },
];

const solutions: SolutionItem[] = [
  {
    name: "Global Payments",
    description: "Facilitate secure and seamless international transactions.",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Portfolio URL",
    description:
      "Showcase your work and projects with a professional portfolio.",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Events & Bookings",
    description: "Manage and schedule events with ease.",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Masterclass",
    description: "Access expert-led courses and training sessions.",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Payment Links",
    description: "Create and share payment links for quick transactions.",
    href: "#",
    icon: ArrowPathIcon,
  },
];

const resources: SolutionItem[] = [
  {
    name: "Founding Stories",
    description:
      " Explore the origins and journeys of Nestsite, from humble beginnings to industry leaders",
    href: "#",
    icon: ChartPieIcon,
  },
];
const callsToAction: CtaItem[] = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

const RcallsToAction: CtaItem[] = [
  { name: "Popular Topics", href: "#", icon: PlayCircleIcon },
  { name: "Help & Support", href: "#", icon: PhoneIcon },
];
function classNames(...classes: (string | boolean)[]): string {
  return classes.filter(Boolean).join(" ");
}
interface HeaderProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const Header = ({ mobileMenuOpen, setMobileMenuOpen }: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false); // Change the initial value to true
  const pathname = usePathname();
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    setIsScrolled(scrollPosition > 0);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div>
      <Banner />

      <header
        className={`fixed inset-x-0  z-50 ${
          pathname == "/" && !isScrolled
            ? "bg-transparent"
            : "bg-black bg-opacity-80"
        } ${
          isScrolled
            ? "top-0 bg-black bg-opacity-80 rounded-full my-4 mx-2 lg:mx-4"
            : "bg-hero-image bg-cover bg-center"
        } `}
      >
        <nav
          className="flex items-center justify-between px-6 py-4 lg:px-8 text-lg"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">NestSite</span>
              <Image
                className="h-8 lg:h-10 w-auto "
                src={Logo}
                alt="NestSite Logo"
                width={160.8}
                height={60.9}
              />
            </Link>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12 ">
            <FlyoutMenu
              solutions={solutions}
              callsToAction={callsToAction}
              mobileMenu={mobileMenuOpen}
            />
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-white font-semibold "
              >
                {item.name}
              </Link>
            ))}
            <ResourceMenu
              resources={resources}
              RcallsToAction={RcallsToAction}
              mobileMenu={mobileMenuOpen}
            />
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Link
              href="https://nestsite-app.vercel.app/login"
              className="text-white text-lg font-semibold leading-6 bg-gradient-to-r from-red-500 via-orange-600 to-purple-500 text-black px-8 py-3 rounded-full mr-4"
            >
              Get started
            </Link>
            <Link
              href="https://nestsite-app.vercel.app/login"
              className="text-white text-lg font-semibold leading-6   py-2.5"
            >
              Login
            </Link>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {/* Mobile Menu Content */}
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black text-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <></>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon
                  className="h-6 w-6 text-gray-300"
                  aria-hidden="true"
                />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-primary">
                          Solutions
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...solutions, ...callsToAction].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-300 hover:bg-primary"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block text-white rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-800"
                    >
                      {item.name}
                    </Link>
                  ))}
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-white hover:bg-primary">
                          Resources
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...resources, ...RcallsToAction].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-300 hover:bg-primary"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                </div>
                <div className="py-6 flex justify-between items-center">
                  <div className="lg:flex">
                    <Link
                      href="https://nestsite-app.vercel.app/login"
                      className="-mx-3 block text-white rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-indigo-800"
                    >
                      Log in
                    </Link>
                  </div>
                  <div className="lg:flex">
                    <Link
                      href="https://nestsite-app.vercel.app/login"
                      className="text-white text-lg font-semibold leading-6 bg-gradient-to-r from-red-500 via-orange-600 to-purple-500 text-black px-5 py-2.5 rounded-full mr-4"
                    >
                      Get started
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </div>
  );
};

function FlyoutMenu({
  solutions,
  callsToAction,
  mobileMenu,
}: {
  solutions: SolutionItem[];
  callsToAction: CtaItem[];
  mobileMenu: boolean;
}) {
  const dropdownClasses = mobileMenu
    ? "mt-2 grid grid-cols-1 gap-y-1"
    : "mt-2 grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-6 text-lg";

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span className="text-white text-lg font-semibold leading-6">
          Solutions
        </span>
        <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {solutions.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon
                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <Link
                      href={item.href}
                      className="font-semibold text-gray-900"
                    >
                      {item.name}
                      <span className="absolute inset-0" />
                    </Link>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={dropdownClasses}>
              {callsToAction.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <item.icon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

function ResourceMenu({
  resources,
  RcallsToAction,
  mobileMenu,
}: {
  resources: SolutionItem[];
  RcallsToAction: CtaItem[];
  mobileMenu: boolean;
}) {
  const dropdownClasses = mobileMenu
    ? "mt-2 grid grid-cols-1 gap-y-1"
    : "mt-2 grid grid-cols-1 gap-y-1 sm:grid-cols-2 sm:gap-x-6";

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <span className="text-white text-lg font-semibold leading-6">
          Resources
        </span>
        <ChevronDownIcon className="h-5 w-5 text-white" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {resources.map((item) => (
                <div
                  key={item.name}
                  className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                >
                  <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                    <item.icon
                      className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div>
                    <Link
                      href={item.href}
                      className="font-semibold text-gray-900"
                    >
                      {item.name}
                      <span className="absolute inset-0" />
                    </Link>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className={dropdownClasses}>
              {RcallsToAction.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <item.icon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

export default Header;
