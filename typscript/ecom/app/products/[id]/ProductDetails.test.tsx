import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { useRouter } from "next/router";
import Page from "./page";

jest.mock("next/router");

describe("renders the logo", () => {
  it("renders the logo", () => {
      query: { id: "3" }
    render(<Page />);
  });
});
