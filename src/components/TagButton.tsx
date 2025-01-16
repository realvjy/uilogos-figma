import * as React from "react";
import styled from 'styled-components';
import { BWDotIcon, ColorDotIcon } from "./icons";

// Styled components for the tag buttons
const StyledTagButton = styled.button<{ $isSelected: boolean; $disabled: boolean }>`
  padding: 6px 10px;
  border-radius: 9999px;
  font-size: 12px;
  line-height: 14px;
  font-weight: 500;
  border: none;
  cursor: ${props => props.$disabled ? 'pointer' : 'pointer'};
  transition: all 200ms;
  text-transform: capitalize;
  opacity: ${props => props.$disabled ? 0.5 : 1};
  ${props => props.$isSelected ? `
    background-color: var(--figma-color-bg-selected);
    color: var(--figma-color-text-selected);
  ` : `
    background-color: var(--figma-color-bg-secondary);
    color: var(--figma-color-text);
    &:hover {
      opacity: ${props.$disabled ? 0.5 : 0.8};
    }
  `}
`;

// Icon variant styled components
const IconButton = styled.button<{ $isSelected: boolean; $disabled: boolean }>`
  border-radius: 9999px;
  border: none;
  cursor: ${props => props.$disabled ? 'not-allowed' : 'pointer'};
  transition: all 200ms;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: transparent;
  padding: 0;
  opacity: ${props => props.$disabled ? 0.7 : 1};
  ${props => props.$isSelected && !props.$disabled && `
    &:after {
      content: '';
      position: absolute;
      inset: -4px;
      border: 2px solid #3b82f6;
      border-radius: 9999px;
    }
  `}

  &:hover {
    transform: ${props => props.$disabled ? 'none' : 'scale(1.1)'};
  }
`;

// Map of tags to their corresponding icons
const iconMap: Record<string, React.ReactNode> = {
  color: <ColorDotIcon height={"16px"} width={"16px"} />,
  bw: <BWDotIcon height={"16px"} width={"16px"} className="icon-color" />
};

interface TagButtonProps {
  tag: string;
  isSelected: boolean;
  onToggle: (tag: string) => void;
  variant?: 'text' | 'icon';
  disabled?: boolean;
}

export const TagButton: React.FC<TagButtonProps> = ({
  tag,
  isSelected,
  onToggle,
  variant = 'text',
  disabled = false
}) => {
  const handleClick = () => {
    if (!disabled) {
      onToggle(tag);
    }
  };

  if (variant === 'icon') {
    return (
      <IconButton
        $isSelected={isSelected}
        $disabled={disabled}
        onClick={handleClick}
        title={tag}
        disabled={disabled}
      >
        {iconMap[tag]}
      </IconButton>
    );
  }

  return (
    <StyledTagButton
      $isSelected={isSelected}
      $disabled={disabled}
      onClick={handleClick}
      disabled={disabled}
    >
      {tag}
    </StyledTagButton>
  );
};

// Container components
const TagGroupContainer = styled.div<{ $disabled?: boolean }>`
  opacity: ${props => props.$disabled ? 0.7 : 1};
`;

const TagsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 6px;
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
  disabled?: boolean;
}

export const TagGroup: React.FC<TagGroupProps> = ({
  title,
  tags,
  selectedTags,
  onTagsChange,
  variant = 'text',
  disabled = false
}) => {
  const handleTagToggle = (tag: string) => {
    if (disabled) return;

    if (selectedTags.includes(tag)) {
      onTagsChange(['all']);
    } else {
      onTagsChange([tag]);
    }
  };

  return (
    <TagGroupContainer $disabled={disabled}>
      {title && <TagGroupTitle>{title}</TagGroupTitle>}
      <TagsWrapper className="tag-wrap">
        {tags.map(tag => (
          <TagButton
            key={tag}
            tag={tag}
            isSelected={selectedTags.includes(tag)}
            onToggle={handleTagToggle}
            variant={variant}
            disabled={disabled}
          />
        ))}
      </TagsWrapper>
    </TagGroupContainer>
  );
};