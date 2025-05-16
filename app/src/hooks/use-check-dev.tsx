import { useSearchParams } from "next/navigation";

export default function useCheckDev() {
	const searchParams = useSearchParams();
	const isDev = Boolean(searchParams.get("dev"));
	return { isDev };
}
