// massachusetts.test.js

const fetchMassachusettsParks = require("../src/_data/massachusetts");
const EleventyFetch = require("@11ty/eleventy-fetch");

jest.mock("@11ty/eleventy-fetch");
jest.mock("dotenv", () => ({
  config: jest.fn(),
}));

describe("Fetch Massachusetts Parks", () => {
  afterEach(() => {
    EleventyFetch.mockReset();
  });

  it("should fetch Massachusetts parks data", async () => {
    const mockData = {
      data: [
        { id: "1", name: "Park A" },
        { id: "2", name: "Park B" },
      ],
    };
    EleventyFetch.mockResolvedValue(mockData);

    const result = await fetchMassachusettsParks();
    expect(result).toEqual(mockData);
    expect(EleventyFetch).toHaveBeenCalledTimes(1);
  });

  it("should handle errors gracefully", async () => {
    EleventyFetch.mockRejectedValue(new Error("Fetch error"));

    const consoleErrorSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});
    const consoleLogSpy = jest
      .spyOn(console, "log")
      .mockImplementation(() => {});

    const result = await fetchMassachusettsParks();
    expect(result).toBeUndefined();
    expect(EleventyFetch).toHaveBeenCalledTimes(1);
    expect(consoleErrorSpy).toHaveBeenCalledWith("something is wrong");
    expect(consoleLogSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
  });
});
