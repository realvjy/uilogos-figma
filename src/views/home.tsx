import * as React from "react";
import { useState, useEffect, useMemo } from 'react';
import styled from "styled-components";
import { CrossIcon, ListIcon, MenuIcon, RealvjyC2, ShuffleIcon } from "../components/icons";
import { RadialBlur, LinearBlur } from "progressive-blur";

import {
  BlackMarkIcon,
  BlackTypeIcon,
  BrandIcon,
  ColorMarkIcon,
  ColorTypeIcon,
  FlagIcon,
} from "../components/logos-icons";
import Footer from "../components/footer";
import { getLogos, shuffle } from "../components/helpers";
import { getAllPngUrls } from "../utils/uiLogosHelper";
import ImageGrid from "../components/image-grid";
import Fuse from "fuse.js";
import { TagButton, TagGroup } from "../components/TagButton";
import { Dropdown } from "../components/Dropdown";
import GradientBlurOverlay from "../components/GradientBlurOverlay";

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
    setSelectedVariants(['color']);
    if (category == "flags") {
      setSelectedVariants(['all']);
    }
    setQuery("");
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
            <CrossIcon height={"20px"} width={"20px"} />
          ) : (
            <MenuIcon height={"20px"} width={"20px"} />
          )}
        </button>
        {isOpen && (
          <MenuList>
            <List><a href="https://uilogos.co" target="_blank">uiLogos.co</a></List>
            <List><a href="https://vjy.me" target="_blank">Author</a></List>
            <List><a href="https://x.com/realvjy" target="_blank">X/Twiter</a></List>
            <List><a href="https://instagram.com/realvjy" target="_blank">Instagram</a></List>
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
          <ColorTag>
            <TagGroup
              tags={variants}
              selectedTags={selectedVariants}
              onTagsChange={setSelectedVariants}
              variant="icon"
            />
          </ColorTag>
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
          <div className="load">Loading...</div>
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

        <h4>made by <a href="https://vjy.me?ui" target="_blank"><RealvjyC2 height={30} width={48} /></a></h4>
      </LogoWrapper>

      <BlurDiv>
        <LinearBlur
          side="bottom"
        />
      </BlurDiv>
      <BigButton>
        <ButtonWrap>
          <LinkButton href="https://www.figma.com/community/plugin/1120667703468196103" className="blue-btn">Fill selection <ShuffleIcon height={14} width={14} /></LinkButton>
        </ButtonWrap>
      </BigButton>
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
  position: relative;
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
  top: 40px;
  background-color: var(--figma-color-bg);
  box-shadow: var(--menu-shadow);
  border-radius: 12px;
  padding: 4px;
`;



const List = styled.div`
  display: flex;
  
  a{
    font-size: 12px;
    line-height: 16px;
    padding: 8px 10px;
    min-width: 100px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 500;
    color: var(--figma-color-text-secondary);
    &:hover{
      background-color: var(--figma-color-bg-hover);
      color: var(--figma-color-text-hover);
    }
  }
`;

const ColorTag = styled.div`
  padding: 12px;
  .tag-wrap{
    gap: 12px;
  }
  .icon-color{
    filter: var(--image-filter);
  }
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
  .menu{
    padding: 10px;
    border: none;
    box-shadow: none;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    cursor: pointer;
    font-size: 12px;
    line-height: 18px;
    font-weight: 500;
    transition: all 0.2s ease;
    color: var(--figma-color-text);
    background-color: transparent;
    &:hover{
      background-color: var(--figma-color-bg-hover);
    }
  }
`;

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  padding-bottom: 90px;
  
  .load{
    width: 100%;
    text-align: center;
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
  }
  h4{
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: 500;
    gap: 4px;
    margin-top: 20px;
    color: var(--figma-color-text);
    opacity: 0.6;
  }
`;
const NavWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .inputSearch{
    background-color: transparent;
    &:focus, &:active, &:hover{
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
  border-bottom: 0.5px solid var(--figma-color-border);
  padding: 8px;
  gap: 6px;
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
  background-color: var(--white);
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

const BigButton = styled.div`
    background: transparent;
    position: absolute;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

`

const ButtonWrap = styled.div`
    background: transparent;
    bottom: 0;
    width: 100%;
    justify-content: center;
    align-items: center;

`
export const LinkButton = styled.a`
  padding: 12px;
  margin: 12px;
  line-height: 16px;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 0.1px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  color: var(--white);
  @media screen and (max-width: 768px) {
     min-width: 220px;
     justify-content: center;
  }
  svg{
    fill: var(--white);
  }
  &.blue-btn{
    background: var(--blue);
    color: var(--white);
    padding-bottom: 14px;
    box-shadow: 0px 0px 0px 1px #264DDB, 0px 1px 3px rgba(20, 52, 135, 0.6), inset 0px -3px 0.4px #234DE2;
    &:hover{
        box-shadow: 0px 0px 0px 1px #264DDB, 0px 1px 3px rgba(20, 52, 135, 0.6), inset 0px -1px 0.4px #234DE2;
    }
  }
`;


const BlurDiv = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 110px;
  pointer-events: none;
`