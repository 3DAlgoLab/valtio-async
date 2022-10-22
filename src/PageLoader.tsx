import MoonLoader from "react-spinners/MoonLoader";

export const PageLoader = () => (
  <div
    style={{
      display: "grid",
      justifyContent: "center",
      alignContent: "center",
      height: "100vh"
    }}
  >
    <MoonLoader color={"var(--text-bright)"} />
  </div>
);
