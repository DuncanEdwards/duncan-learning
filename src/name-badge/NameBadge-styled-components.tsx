import styled from "styled-components";

const MainDescription = styled.div`
  color: blue;
  margin: 10px;
`;

const Button = styled.button<{ isGroovy?: boolean }>`
  background: ${(props) => (props.isGroovy ? "purple" : "red")};
  border: "solid 3px black";
`;

export const NameBadge = () => {
  return (
    <div>
      <h1>This is a badge</h1>
      <MainDescription>This is a description</MainDescription>
      <Button isGroovy={false}>Press me</Button>
    </div>
  );
};
