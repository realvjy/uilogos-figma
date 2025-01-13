// Utility function to flatten all PNG URLs from the data
interface LogoVariant {
    color: string | null;
    bw: string | null;
}

interface LogoItem {
    id: string;
    name: string;
    variants: {
        text?: LogoVariant;
        mark?: LogoVariant;
    };
}

export const getAllPngUrls = (data) => {
    const urls = [];

    // Process logos category
    // Process logos category
    data.categories.logos.items.forEach((item: LogoItem) => {
        const variants = item.variants;

        // Handle text variants
        if (variants.text) {
            if (variants.text.color) {
                urls.push({
                    url: variants.text.color,
                    category: 'logos',
                    type: 'text',
                    variant: 'color',
                    name: item.name,
                    id: item.id
                });
            }
            if (variants.text.bw) {
                urls.push({
                    url: variants.text.bw,
                    category: 'logos',
                    type: 'text',
                    variant: 'bw',
                    name: item.name,
                    id: item.id
                });
            }
        }

        // Handle mark variants
        if (variants.mark) {
            if (variants.mark.color) {
                urls.push({
                    url: variants.mark.color,
                    category: 'logos',
                    type: 'mark',
                    variant: 'color',
                    name: item.name,
                    id: item.id
                });
            }
            if (variants.mark.bw) {
                urls.push({
                    url: variants.mark.bw,
                    category: 'logos',
                    type: 'mark',
                    variant: 'bw',
                    name: item.name,
                    id: item.id
                });
            }
        }
    });

    // Process brands category
    data.categories.brands.items.forEach(item => {
        if (item.variants.color) {
            item.variants.color.forEach(url => {
                urls.push({ url, category: 'brands', type: 'brand', variant: 'color', name: item.name });
            });
        }
        if (item.variants.bw) {
            item.variants.bw.forEach(url => {
                urls.push({ url, category: 'brands', type: 'brand', variant: 'bw', name: item.name });
            });
        }
    });

    // Process flags category
    data.categories.flags.items.forEach(item => {
        if (item.variants.original) {
            urls.push({ url: item.variants.original, category: 'flags', type: 'flag', variant: 'original', name: item.name });
        }
        if (item.variants.square) {
            urls.push({ url: item.variants.square, category: 'flags', type: 'flag', variant: 'square', name: item.name });
        }
    });

    return urls;
};

// Function to get items by category
export const getByCategory = (data, category) => {
    return getAllPngUrls(data).filter(item => item.category === category);
};

// Function to get items by tag/variant (color, bw, etc.)
export const getByTag = (data, tag) => {
    return getAllPngUrls(data).filter(item => item.variant === tag);
};

// Modified utility functions that support multiple tags/categories
export const getByCategories = (data, categories) => {
    // If 'all' is included or no categories specified, return all items
    if (categories.includes('all') || categories.length === 0) {
        return getAllPngUrls(data);
    }
    return getAllPngUrls(data).filter(item => categories.includes(item.category));
};

export const getByTags = (data, tags) => {
    // If 'all' is included or no tags specified, return all items
    if (tags.includes('all') || tags.length === 0) {
        return getAllPngUrls(data);
    }
    return getAllPngUrls(data).filter(item => tags.includes(item.variant));
};

// Combined function to filter by both categories and tags
export const getByTagsAndCategories = (data, categories, tags) => {
    let results = getAllPngUrls(data);

    if (!categories.includes('all')) {
        results = results.filter(item => categories.includes(item.category));
    }

    if (!tags.includes('all')) {
        results = results.filter(item => tags.includes(item.variant));
    }

    return results;
};