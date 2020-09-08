export const countryCodeToFlag = (code: string) =>
	(code.length <= 2 ? code : code.substring(3, 5))
		.toUpperCase()
		.replace(/./g, (c) => String.fromCodePoint(c.charCodeAt(0) + 127397));
