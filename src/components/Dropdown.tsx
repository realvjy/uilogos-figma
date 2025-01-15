import * as React from "react";
import { useState, useRef, useEffect } from 'react';
import styled from "styled-components";
import { ArrowIcon } from "./icons";
// Custom Dropdown Component
export const Dropdown = ({
  selected,
  options,
  onChange
}: {
  selected: string | null;
  options: string[];
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownButton
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      >
        <SelectedText>
          {selected || 'Select Category'}
        </SelectedText>
        <StyledChevron isOpen={isOpen} />
      </DropdownButton>

      {isOpen && (
        <DropdownContent>
          {options.map((option) => (
            <OptionItem
              key={option}
              onClick={() => handleSelect(option)}
              isSelected={selected === option}
            >
              {option}
            </OptionItem>
          ))}
        </DropdownContent>
      )}
    </DropdownContainer>
  );
};



// Styled Components
const DropdownContainer = styled.div`
  position: relative;
  min-width: 90px;
`;

const DropdownButton = styled.button<{ isOpen: boolean }>`
  width: 100%;
  padding: 6px 10px;
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
  border-radius: 14px;
  transition: all 0.2s ease;
  background-color: var(--figma-color-bg-secondary);
  color: var(--figma-color-text);
  &:hover {
    background-color: var(--figma-color-bg-hover);
  }
  ${props => props.isOpen && `
    box-shadow: 0 0 0 1px var(--figma-color-bg-hover);
  `}
`;

const DropdownContent = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  border-radius: 8px;
  background-color: var(--figma-color-bg);
  color: var(--figma-color-text);
  box-shadow: var(--menu-shadow);
  padding: 2px;
  z-index: 10;
`;

const OptionItem = styled.div<{ isSelected: boolean }>`
  padding: 8px 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
  text-transform: capitalize;
  border-radius: 6px;
  font-weight: 500;
  &:hover {
    background: ${props => props.isSelected ? 'var(--figma-color-bg-hover)' : 'var(--figma-color-bg-secondary)'};
  }

  ${props => props.isSelected && `
    background-color: var(--figma-color-bg-hover);
  `}

  &:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }

  &:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

const Checkbox = styled.div<{ isSelected: boolean }>`
  width: 16px;
  height: 16px;
  border: 2px solid ${props => props.isSelected ? '#3B82F6' : '#CBD5E0'};
  border-radius: 4px;
  margin-right: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  ${props => props.isSelected && `
    background: #3B82F6;
  `}
`;

const SelectedText = styled.span`
  color: var(--figma-color-text);
  font-size: 12px;
  line-height: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
`;

const StyledChevron = styled(ArrowIcon) <{ isOpen: boolean }>`
  width: 16px;
  height: 16px;
  margin-left: 8px;
  transition: transform 0.2s ease;
  ${props => props.isOpen && 'transform: rotate(180deg);'}
`;
