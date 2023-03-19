import Select from "@/components/Select";
import styled from "styled-components";

const categories = [
  { key: 1, label: "Education", value: "education" },
  { key: 2, label: "Science", value: "science" },
  { key: 3, label: "Art", value: "art" },
  { key: 4, label: "Sport", value: "sport" },
  { key: 5, label: "Games", value: "games" },
  { key: 6, label: "Health", value: "health" },
];

export default function Home() {
  return (
    <Container>
      <SelectWrapper>
        <Select options={categories} placeholder="Please select a category" />
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
