import * as React from "react";
import styled from 'styled-components';
import { BWDotIcon, ColorDotIcon } from "./icons";

// Styled components for the tag buttons
const StyledTagButton = styled.button<{ $isSelected: boolean }>`
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 200ms;
  
  ${props => props.$isSelected ? `
    background-color: #3b82f6;
    color: white;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  ` : `
    background-color: #f3f4f6;
    color: #374151;
    &:hover {
      background-color: #e5e7eb;
    }
  `}
`;

// Icon variant styled components
const IconButton = styled.button<{ $isSelected: boolean }>`
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: all 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
  
  ${props => props.$isSelected && `
    &:after {
      content: '';
      position: absolute;
      inset: -2px;
      border: 2px solid #3b82f6;
      border-radius: 9999px;
    }
  `}

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

// Map of tags to their corresponding icons
const iconMap: Record<string, React.ReactNode> = {
  color: <ColorDotIcon />,
  bw: <BWDotIcon />
};

interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onToggle: (tag: string) => void;
  variant?: 'text' | 'icon';
}

export const TagButton: React.FC<TagButtonProps> = ({
  tag,
  isSelected,
  onToggle,
  variant = 'text'
}) => {
  if (variant === 'icon') {
    return (
      <IconButton
        $isSelected={isSelected}
        onClick={() => onToggle(tag)}
        title={tag}
      >
        {iconMap[tag]}
      </IconButton>
    );
  }

  return (
    <StyledTagButton
      $isSelected={isSelected}
      onClick={() => onToggle(tag)}
    >
      {tag}
    </StyledTagButton>
  );
};

// Container components
const TagGroupContainer = styled.div`
  
`;

const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const TagGroupTitle = styled.h3`
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
`;

interface TagGroupProps {
  title?: string;
  tags: string[];
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  variant?: 'text' | 'icon';
}

export const TagGroup: React.FC<TagGroupProps> = ({
  title,
  tags,
  selectedTags,
  onTagsChange,
  variant = 'text'
}) => {
  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      // If clicking selected tag, deselect it (set to 'all' internally)
      onTagsChange(['all']);
    } else {
      // Select new tag, removing any previous selections
      onTagsChange([tag]);
    }
  };

  return (
    <TagGroupContainer>
      {title && <TagGroupTitle>{title}</TagGroupTitle>}
      <TagsWrapper>
        {tags.map(tag => (
          <TagButton
            key={tag}
            tag={tag}
            isSelected={selectedTags.includes(tag)}
            onToggle={handleTagToggle}
            variant={variant}
          />
        ))}
      </TagsWrapper>
    </TagGroupContainer>
  );
};