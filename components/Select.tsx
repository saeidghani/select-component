import { useState } from "react";
import Image from 'next/image'
import styled from "styled-components";

type Props = {
  options: {
    label: string;
    value: number | string;
  }[];
  placeholder?: string;
};

export default function CustomSelect(props: Props) {
const [isActive, setIsActive] = useState(false);
const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);

  const {
    options,
    onChange,
    onFocus,
    onBlur,
    defaultValue,
    placeholder,
    autofocus,
    defaultOpen,
    open,
    disabled,
    optionsRender,
    notFoundContent,
    showArrow,
    size,
  } = props;

  return (
    <Container>
      <Select onClick={() => setIsActive(prevState => !prevState)} isActive={isActive}>
        <span>
          {selectedItemIndex !== null
            ? options?.[selectedItemIndex]?.label
            : "Select an option"}
        </span>
        <Image
          className="arrow-icon"
          src="/icons/arrow.svg"
          width={24}
          height={24}
          alt="arrow"
        />
      </Select>
      <Options isActive={isActive}>
        {options.map(({ label, value }, index) => (
          <Option
            key={value}
            value={value}
            onClick={() => setSelectedItemIndex(index)}
            selected={index === selectedItemIndex}
          >
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
`;

const Select = styled.button<{ isActive: boolean}>`
  color: dimgray;
  border-radius: 10px;
  width: 200px;
  padding: 10px;
  background-color: white;
  font-size: 18px;
  border: 1px solid silver;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  outline: 0;

  .arrow-icon {
    transform: ${({isActive}) => isActive ? 'rotate(180deg)' : 'rotate(0deg)'};
    transition: all .2s;
  }

  &:focus {
    border: 1px solid royalblue;
  }
`;

const Options = styled.ul<{ isActive: boolean }>`
  background-color: white;
  display: ${({isActive}) => isActive ? 'flex' : 'none'};
  flex-direction: column;
  gap: 8px;
  border: 1px solid silver;
  border-radius: 12px;
  margin-top: 5px;
  padding: 8px;
  list-style: none;
`;

const Option = styled.li<{ selected?: boolean }>`
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: dimgray;
  border-radius: 8px;
  padding: 6px 12px;
  background-color: ${({ selected }) =>
    selected ? "rgba(65, 105, 225, 0.1)" : "transparent"};

  &:hover {
    background-color: lightgray;
    color: royalblue;
    cursor: pointer;
  }

  .check-icon {
    display: ${({selected}) => selected ? 'block' : 'none'};
  }
`;

