import { usePathname } from "next/navigation";

export default function useCheckActiveNav(prefix = "") {
	const pathname = usePathname();

	const checkActiveNav = (nav: string) => {
		if (prefix.trim().length > 0) {
			const pathArray = pathname
				.split("/")
				.filter((item) => item !== "" && item !== prefix);

			if (
				pathArray.length < 1 &&
				nav.replaceAll("/", "").replace(prefix, "") === ""
			)
				return true;
			return pathArray.includes(nav.replace(new RegExp(`^\/${prefix}\/`), ""));
		}
		return pathname === nav;

	};

	return { checkActiveNav };
}
