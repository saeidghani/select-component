import { KeyboardEvent, useCallback, useEffect, useState } from "react";

type KeysMap = {
  [k in "ArrowUp" | "ArrowDown" | "Enter"]: () => void;
};

type Value = number | string;

type Props = {
  options: {
    label: string;
    value: Value;
  }[];
  placeholder?: string;
  defaultValue?: Value
  onChange?: (e: KeyboardEvent<HTMLButtonElement>) => void;
};

export default function useSelect({
  options,
  placeholder = "Select an option",
  onChange, 
  defaultValue
}: Props) {
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(() => {
     if (!defaultValue) return null
     const index = options.findIndex(({value}) => value === defaultValue)
     if (index !== -1) return index
     return null
  });
  const [hoverOptionIndex, setHoverOptionIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) {
      setHoverOptionIndex(selectedOptionIndex || 0);
    }
  }, [isOpen, selectedOptionIndex]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      e.preventDefault();
      if (!isOpen) {
        setIsOpen(true);
        return;
      }
      const { key } = e;

      const keysMap: KeysMap = {
        ArrowUp: () => setHoverOptionIndex((prev) => Math.max(0, prev - 1)),
        ArrowDown: () =>
          setHoverOptionIndex((prev) => Math.min(options.length - 1, prev + 1)),
        Enter: () => {
          setSelectedOptionIndex(hoverOptionIndex);
          setIsOpen(false);
          onChange?.(e)
        },
      };

      if (key in keysMap) keysMap[key as keyof KeysMap]();
    },
    [hoverOptionIndex, isOpen, onChange, options.length]
  );

  const getSelectProps = useCallback(
    () => ({
      isOpen,
      onKeyDown,
      onClick: () => setIsOpen((prevState) => !prevState),
    }),
    [isOpen, onKeyDown]
  );

  const getOptionsProps = () => ({ 
    isOpen,
    'aria-hidden': !isOpen
 });

  const getOptionProps = useCallback(
    (index: number) => ({
      isSelected: index === selectedOptionIndex,
      isHover: index === hoverOptionIndex,
      onClick: () => {
        setSelectedOptionIndex(index);
        setIsOpen(false);
      },
      onMouseEnter: () => setHoverOptionIndex(index),
      'aria-selected': index === selectedOptionIndex
    }),
    [hoverOptionIndex, selectedOptionIndex]
  );

  const selectedOptionLabel =
    selectedOptionIndex !== null
      ? options?.[selectedOptionIndex]?.label
      : placeholder;

  const value =
    selectedOptionIndex !== null
      ? options?.[selectedOptionIndex]?.value
      : "";

  return {
    value,
    selectProps: {
      selectedOptionLabel,
      getSelectProps,
      getOptionsProps,
      getOptionProps,
      setIsOpen,
    },
  };
}
