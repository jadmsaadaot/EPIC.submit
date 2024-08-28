import React from "react";
import { mount } from "cypress/react18";
import { TestWrapper } from "../utils";
import { Project } from "../../../src/components/Projects/Project";

const MockProjectComponent = () => {
  return (
    <Project
      accountProject={{
        project: {
          name: "Test Project 2",
          ea_certificate: "1234",
        },
        packages: [],
      }}
    />
  );
};
describe("<Project />", () => {
  it("renders", () => {
    mount(<TestWrapper component={MockProjectComponent} />);
  });
});
