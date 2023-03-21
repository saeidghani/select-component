import useClickOutside from "@/hooks/useClickOutside";
import Image from "next/image";
import { KeyboardEvent, useRef } from "react";
import styled from "styled-components";

type Props = {
  options: {
    label: string;
    value: number | string;
  }[];
  placeholder?: string;
  selectedOptionLabel: string;
  getSelectProps: () => {
    isOpen: boolean;
    onKeyDown: (e: KeyboardEvent<HTMLButtonElement>) => void;
    onClick: () => void;
  };
  getOptionsProps: () => { isOpen: boolean };
  getOptionProps: (index: number) => {
    isSelected: boolean;
    isHover: boolean;
    onClick: () => void;
    onMouseEnter: () => void;
  };
  setIsOpen: (bool: boolean) => void;
};

export default function CustomSelect(props: Props) {
  const {
    options,
    selectedOptionLabel,
    getSelectProps,
    getOptionsProps,
    getOptionProps,
    setIsOpen,
  } = props;

  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setIsOpen(false));

  return (
    <Container ref={ref}>
      <Select {...getSelectProps()}>
        <span>{selectedOptionLabel}</span>
        <Image
          className="arrow-icon"
          src="/icons/arrow.svg"
          width={24}
          height={24}
          alt="arrow"
        />
      </Select>
      <Options {...getOptionsProps()}>
        {options.map(({ label, value }, index) => (
          <Option key={value} {...getOptionProps(index)}>
            <span>{label}</span>
            <Image
              className="check-icon"
              src="/icons/check.svg"
              width={24}
              height={24}
              alt="check"
            />
          </Option>
        ))}
      </Options>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const Select = styled.button<{ isOpen: boolean }>`
  color: ${({ theme }) => theme.colors.grayDark};
  border-radius: 10px;
  width: 200px;
  padding: 10px;
  background-color: white;
  font-size: 18px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  outline: 0;

  .arrow-icon {
    transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: all 0.2s;
  }

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayLight};
  }

  &:focus {
    border: ${({ theme }) => `1px solid ${theme.colors.primary}`};
  }
`;

const Options = styled.ul<{ isOpen: boolean }>`
  background-color: white;
  display: ${({ isOpen }) => (isOpen ? "flex" : "none")};
  flex-direction: column;
  gap: 8px;
  border: ${({ theme }) => `1px solid ${theme.colors.gray}`};
  border-radius: 12px;
  margin-top: 5px;
  padding: 8px;
  list-style: none;
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Option = styled.li<{ isSelected?: boolean; isHover?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: ${({ theme }) => theme.colors.grayDark};
  border-radius: 8px;
  padding: 6px 12px;
  background-color: ${({ isSelected, isHover, theme }) =>
    isSelected
      ? theme.colors.primaryLight
      : isHover
      ? theme.colors.grayLight
      : "transparent"};
  color: ${({ isSelected, theme }) => (isSelected ? theme.colors.primary : "")};

  &:hover {
    cursor: pointer;
  }

  .check-icon {
    display: ${({ isSelected }) => (isSelected ? "block" : "none")};
  }
`;
