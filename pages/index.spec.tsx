import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_USERS , RandomUser } from "./index";

const mocks = [
    {
      request: {
        query: GET_USERS,
        variables: {
          firstName: "John"
        }
      },
      result: {
        data: {
          employee: { id: "1", firstName: "John", lastName: "David", address:"119 park street London" }
        }
      }
    }
  ];
it("renders without error", async () => {
  render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <RandomUser />
    </MockedProvider>
  );
  expect(await screen.getByText("John")).toHaveLength(4);
});