import * as React from "react";
import { useState, useEffect, useMemo } from 'react';
import styled from "styled-components";
import { CrossIcon, ListIcon, MenuIcon, ShuffleIcon } from "../components/icons";
import {
  BlackMarkIcon,
  BlackTypeIcon,
  BrandIcon,
  ColorMarkIcon,
  ColorTypeIcon,
  FlagIcon,
} from "../components/logos-icons";
import Footer from "../components/footer";
import { getLogos } from "../components/helpers";
import { getAllPngUrls } from "../utils/uiLogosHelper";
import ImageGrid from "../components/image-grid";
import Fuse from "fuse.js";
import { TagButton, TagGroup } from "../components/TagButton";
import { Dropdown } from "../components/Dropdown";

declare function require(path: string): any;

const Home = (props) => {
  const canvasRef = React.useRef(null);
  const imgRef = React.useRef(null);
  const apiUrl = 'https://uilogos.co/uilogos/uilogos-v2.json'
  const [selectedCategory, setSelectedCategory] = useState('logos');
  const [selectedTag, setSelectedTag] = useState('color');
  const [selectedCategories, setSelectedCategories] = useState<string[]>(['logos']);
  const [selectedTypes, setSelectedTypes] = useState<string[]>(['mark']); // For text/mark
  const [selectedVariants, setSelectedVariants] = useState<string[]>(['color']); // For color/bw
  const [selectedTags, setSelectedTags] = useState(['all']);
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const onClickIcon = (event) => {
    props.parentCallback(event);
  };

  const [jsonData, setJsonData] = useState(null);

  // Get available types and variants from the data
  const getAvailableFilters = (data: any) => {
    if (!data?.categories?.logos?.tags) return { types: [], variants: [] };

    const tags = data.categories.logos.tags;
    const types = tags.filter((tag: string) => ['text', 'mark'].includes(tag));
    const variants = tags.filter((tag: string) => ['color', 'bw'].includes(tag));

    return { types, variants };
  };



  // First effect remains largely the same
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const parsed = await response.json();
        setJsonData(parsed);
        const allItems = getAllPngUrls(parsed);
        setDisplayItems(allItems);
        setResults(allItems);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  // Modified second effect for multiple filters
  useEffect(() => {
    if (!jsonData) return;

    let filtered = getAllPngUrls(jsonData);

    // Filter by single selected category
    if (selectedCategory) {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Filter by type (text/mark)
    if (!selectedTypes.includes('all')) {
      filtered = filtered.filter(item => selectedTypes.includes(item.type));
    }

    // Filter by variant (color/bw)
    if (!selectedVariants.includes('all')) {
      filtered = filtered.filter(item => selectedVariants.includes(item.variant));
    }

    setDisplayItems(filtered);
    if (!query.trim()) {
      setResults(filtered);
    }
  }, [selectedCategory, selectedTypes, selectedVariants, jsonData, query]);

  const categories = ['logos', 'brands', 'flags'];
  const tags = ['all', 'color', 'bw', 'original', 'square', 'text', 'mark'];
  // Setup Fuse search
  // Third effect stays the same
  useEffect(() => {
    const fuse = new Fuse(displayItems, {
      threshold: 0.2,
      keys: ["name", "category", "variant"]
    });

    if (query.trim()) {
      const searchData = fuse.search(query.trim());
      setResults(searchData.map((result) => result.item));
    } else {
      setResults(displayItems);
    }
  }, [query, displayItems]);

  // Add handlers for multiple selections
  // Create a function to handle category change that also resets tags
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    // Reset both type and variant selections to default
    setSelectedTypes(['all']);
    setSelectedVariants(['all']);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
    if (values.includes('all')) {
      setSelectedTypes(['all']);
    } else {
      setSelectedTypes(values);
    }
  };

  const handleVariantChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.selectedOptions).map(opt => opt.value);
    if (values.includes('all')) {
      setSelectedVariants(['all']);
    } else {
      setSelectedVariants(values);
    }
  };

  const { types, variants } = useMemo(() =>
    getAvailableFilters(jsonData), [jsonData]
  );

  const colorMap = {
    color: '#3b82f6',
    bw: '#374151',
  };

  return (
    <HomeMenu>
      <TopNav>
        <button
          onClick={toggleMenu}
          className={`menu`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
        >
          {isOpen ? (
            <CrossIcon />
          ) : (
            <MenuIcon />
          )}
        </button>
        {isOpen && (
          <MenuList>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Menu Item 1</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Menu Item 2</a>
            <a href="#" className="block px-4 py-2 text-gray-800 hover:bg-gray-100">Menu Item 3</a>
          </MenuList>
        )}


        <NavWrap>
          <input
            value={query}
            type="text"
            autoFocus={true}
            className="inputSearch"
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search logos here..."
          />
          <TagGroup
            tags={variants}
            selectedTags={selectedVariants}
            onTagsChange={setSelectedVariants}
            variant="icon"
          />
        </NavWrap>
      </TopNav>
      <SelectMenu >
        <Dropdown
          selected={selectedCategory}
          options={categories}
          onChange={handleCategoryChange}
        />
        {/* Type Tags (text/mark) */}
        <TagGroup
          tags={types}
          selectedTags={selectedTypes}
          onTagsChange={setSelectedTypes}
        />
      </SelectMenu>

      <LogoWrapper>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <ImageContainer className={"grid-3"}>
            {results.map((logo, i) => (
              <ImageGrid
                name={logo.name}
                url={logo.url}
                keyword={"na"}
                key={`${logo.name}-${logo.id}-${i}`}
                color={"color"}
                type={props.title}
                imgRef={imgRef}
                canRef={canvasRef}
              />
            ))}
          </ImageContainer>
        )}
      </LogoWrapper>


      <canvas ref={canvasRef} style={{ display: "none" }} />
      <img ref={imgRef} style={{ display: "none" }} />
    </HomeMenu>
  );
};

export default Home;
const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
const HomeMenu = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;

const OptionBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 2px 0;
  cursor: pointer;
  :hover {
    background: var(--list-hover-bg);
  }
`;

const MenuList = styled.div`
  display: flex;
  position: absolute;
  flex-direction: column;
  top: 80px;
  background-color: white;
`;


const Title = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 0 10px 12px;
  .lefticon {
    margin-right: 12px;
  }
  p {
    color: var(--figma-color-text);
    font-weight: 500;
    font-size: 15px;
    margin: 0;
  }
`;

const TopNav = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 0.5px solid var(--figma-color-border);
  position: relative;
  z-index: 999;
  gap: 12px;
  .menu{
    padding: 2px;
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  overflow-y: scroll;
`;
const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .inputSearch{
    &:focus, &:active{
      outline: 0;
      border: none;
      box-shadow: none;
    }
    
  }
  border-left: 1px solid var(--figma-color-border);
`;

const SelectMenu = styled.div`
  display: flex;
  align-items: center;
  margin: 2px 0;
  border-left: 0.5px solid var(--figma-color-border);
`;

const ToolTip = styled.div`
  z-index: 100;
  display: flex;
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 11px;
  line-height: 16px;
  -webkit-box-align: center;
  align-items: center;
  text-align: center;
  letter-spacing: 0.01em;
  color: rgb(255, 255, 255);
  position: absolute;
  top: calc(100% + 1ch);
  &.r {
    right: 0;
  }
  .nib-l {
    position: absolute;
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
    top: -4px;
    left: 12px;
  }
  .nib-r {
    position: absolute;
    width: 0px;
    height: 0px;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid black;
    top: -4px;
    right: 12px;
  }
  .text {
    align-self: start;
    border: 0.5px solid rgb(0, 0, 0);
    box-sizing: border-box;
    border-radius: 2px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 4px 8px;
    background-color: rgb(34, 34, 34);
  }
`;

const ImageContainer = styled.div`
  display: grid;
  width: 100%;
  height: fit-content;
  &.grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
  &.grid-3 {
    grid-template-columns: repeat(3, 1fr);
    
  }
  &.grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
`;