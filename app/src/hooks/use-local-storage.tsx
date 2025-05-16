import { useEffect, useState } from "react";

interface LocalStorageProps<T> {
	key: string;
	defaultValue: T;
}

export default function useLocalStorage<T>({
	key,
	defaultValue,
}: LocalStorageProps<T>) {
	const [value, setValue] = useState<T>(() => {
		const storedValue = global.localStorage?.getItem(key);
		return storedValue !== null
			? (JSON?.parse(storedValue ?? `${defaultValue}`) as T)
			: defaultValue;
	});

	useEffect(() => {
		global.localStorage?.setItem(key, JSON?.stringify(value));
	}, [value, key]);

	return [value, setValue] as const;
}
