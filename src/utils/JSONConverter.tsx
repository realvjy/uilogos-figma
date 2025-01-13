import * as React from "react";
import { useState, useEffect } from 'react';

const BASE_URL = "https://uilogos.co/";
const API_URL = "https://uilogos.co/uilogos/uilogos.json";

// Helper function to create unique IDs
const createUniqueId = (name, index) => {
    return `${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${index}`;
};

// Helper function to construct full URLs
const constructUrl = (type, variant, filename) => {
    const paths = {
        flags: `${BASE_URL}uilogos/flags/`,
        brand: {
            color: `${BASE_URL}uilogos/brand/color/`,
            black: `${BASE_URL}uilogos/brand/black/`
        },
        "full-logo": {
            color: `${BASE_URL}uilogos/full-logo/color/`,
            black: `${BASE_URL}uilogos/full-logo/black/`
        },
        mark: {
            color: `${BASE_URL}uilogos/mark/color/`,
            black: `${BASE_URL}uilogos/mark/black/`
        }
    };

    if (type === 'flags') return paths.flags + filename;
    return paths[type][variant] + filename;
};

// Main conversion function
const convertToNewStructure = (originalData) => {
    // Initialize new structure
    const newStructure = {
        version: "2.0.0",
        encoding: "UTF-8",
        metadata: {
            created: originalData.created?.date || new Date().toISOString(),
            updated: originalData.updated?.date || new Date().toISOString(),
            author: originalData.author?.name || "UI Logos",
            baseUrl: BASE_URL,
            apiUrl: API_URL
        },
        categories: {
            logos: {
                name: "Logos",
                description: "Collection of various logo designs",
                tags: ["text", "mark", "color", "bw"],
                items: []
            },
            brands: {
                name: "Brands",
                description: "Popular brand logos and icons",
                tags: ["color", "bw"],
                items: []
            },
            flags: {
                name: "Flags",
                description: "National and regional flags",
                tags: ["original", "square"],
                items: []
            }
        }
    };

    // Process flags
    if (originalData.uilogos?.flags?.["all-flags"]) {
        originalData.uilogos.flags["all-flags"].forEach((item, index) => {
            const filename = item.Name.toLowerCase() + '.png';
            newStructure.categories.flags.items.push({
                id: createUniqueId(item.Name, index + 1),
                name: item.Name,
                variants: {
                    original: constructUrl('flags', null, filename),
                    square: null
                }
            });
        });
    }

    // Process brands
    if (originalData.uilogos?.brand?.color) {
        originalData.uilogos.brand.color.forEach((item, index) => {
            const filename = item.Name.toLowerCase() + '.png';
            newStructure.categories.brands.items.push({
                id: createUniqueId(item.Name, index + 1),
                name: item.Name,
                variants: {
                    color: [constructUrl('brand', 'color', filename)],
                    bw: null
                }
            });
        });
    }

    // Create a map to group logos by name
    const logoMap = new Map();

    // Process full logos and marks
    if (originalData.uilogos) {
        // Process full-logo color
        if (originalData.uilogos["full-logo"]?.color) {
            originalData.uilogos["full-logo"].color.forEach(item => {
                const filename = item.Name.toLowerCase().replace(/\s+/g, '-') + '.png';
                if (!logoMap.has(item.Name)) {
                    logoMap.set(item.Name, {
                        name: item.Name,
                        variants: {
                            text: { color: null, bw: null },
                            mark: { color: null, bw: null }
                        }
                    });
                }
                const logo = logoMap.get(item.Name);
                logo.variants.text.color = constructUrl('full-logo', 'color', filename);
            });
        }

        // Process full-logo black
        if (originalData.uilogos["full-logo"]?.black) {
            originalData.uilogos["full-logo"].black.forEach(item => {
                const filename = item.Name.toLowerCase().replace(/\s+/g, '-') + '.png';
                if (!logoMap.has(item.Name)) {
                    logoMap.set(item.Name, {
                        name: item.Name,
                        variants: {
                            text: { color: null, bw: null },
                            mark: { color: null, bw: null }
                        }
                    });
                }
                const logo = logoMap.get(item.Name);
                logo.variants.text.bw = constructUrl('full-logo', 'black', filename);
            });
        }

        // Process mark color
        if (originalData.uilogos.mark?.color) {
            originalData.uilogos.mark.color.forEach(item => {
                const filename = item.Name.toLowerCase().replace(/\s+/g, '-') + '.png';
                if (!logoMap.has(item.Name)) {
                    logoMap.set(item.Name, {
                        name: item.Name,
                        variants: {
                            text: { color: null, bw: null },
                            mark: { color: null, bw: null }
                        }
                    });
                }
                const logo = logoMap.get(item.Name);
                logo.variants.mark.color = constructUrl('mark', 'color', filename);
            });
        }

        // Process mark black
        if (originalData.uilogos.mark?.black) {
            originalData.uilogos.mark.black.forEach(item => {
                const filename = item.Name.toLowerCase().replace(/\s+/g, '-') + '.png';
                if (!logoMap.has(item.Name)) {
                    logoMap.set(item.Name, {
                        name: item.Name,
                        variants: {
                            text: { color: null, bw: null },
                            mark: { color: null, bw: null }
                        }
                    });
                }
                const logo = logoMap.get(item.Name);
                logo.variants.mark.bw = constructUrl('mark', 'black', filename);
            });
        }
    }

    // Add all logos to the new structure
    Array.from(logoMap.entries()).forEach(([name, logo], index) => {
        newStructure.categories.logos.items.push({
            id: createUniqueId(name, index + 1),
            name: name,
            variants: logo.variants
        });
    });

    return newStructure;
};

const JSONConverter = () => {
    const [originalJson, setOriginalJson] = useState(null);
    const [convertedJson, setConvertedJson] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setOriginalJson(data);
            handleConvert(data);
        } catch (err) {
            setError('Error fetching data: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleConvert = (data = originalJson) => {
        try {
            if (data) {
                const newStructure = convertToNewStructure(data);
                setConvertedJson(newStructure);
                setError(null);
            }
        } catch (err) {
            setError('Error converting: ' + err.message);
        }
    };

    if (isLoading) {
        return (
            <div className="w-full max-w-4xl mx-auto p-4 text-center">
                <div className="animate-pulse">Loading data...</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-4xl mx-auto p-4 space-y-4">
            <h2 className="text-2xl font-bold mb-4">JSON Structure Converter</h2>

            <div className="space-y-4">
                <button
                    onClick={() => handleConvert()}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
                    disabled={!originalJson}
                >
                    Refresh Conversion
                </button>

                {error && (
                    <div className="p-4 bg-red-100 text-red-700 rounded">
                        {error}
                    </div>
                )}

                {convertedJson && (
                    <div className="space-y-2">
                        <h3 className="text-lg font-semibold">Converted Structure:</h3>
                        <pre className="p-4 bg-gray-100 rounded overflow-auto max-h-96">
                            {JSON.stringify(convertedJson, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JSONConverter;