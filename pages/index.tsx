import Select from "@/components/Select";
import useSelect from "@/hooks/useSelect";
import styled from "styled-components";

const options = [
  { label: "Education", value: "education" },
  { label: "Science", value: "science" },
  { label: "Art", value: "art" },
  { label: "Sport", value: "sport" },
  { label: "Games", value: "games" },
  { label: "Health", value: "health" },
];

export default function Home() {
  const {
    selectProps,
  } = useSelect({ options, placeholder: "Please select a category"});

  return (
    <Container>
      <SelectWrapper>
        <Select
          options={options}
          {...selectProps}
        />
      </SelectWrapper>
    </Container>
  );
}

const Container = styled.div`
  background-color: #c0ecfb;
  display: flex;
  justify-content: center;
  padding: 200px;
  min-height: 100vh;
`;

const SelectWrapper = styled.div`
  width: 300px;
`;
