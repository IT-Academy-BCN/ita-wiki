import { urls } from "../constants";

export const getCategories = async () =>
    fetch(urls.getCategories)
        .then((res) => {
            if (!res.ok) {
                throw new Error(`Error fetching categories: ${res.statusText}`)
            }
            return res.json()
        })
        .catch((err) => {
            throw new Error(`Error fetching categories: ${err.message}`)
        })