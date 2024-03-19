export type urlBrand = `${"http" | "https"}://${string}`

export type user = {
	userId: string | number,
	name: string,
	photo: urlBrand,
	phone: string
}
