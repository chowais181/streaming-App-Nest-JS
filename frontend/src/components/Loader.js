import { Vortex } from "react-loader-spinner";
export default function Loader() {
  return (
    <div
      style={{
        height: "40em",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Vortex
        visible={true}
        height="200"
        width="200"
        ariaLabel="vortex-loading"
        wrapperStyle={{}}
        wrapperClass="vortex-wrapper"
        colors={["red", "green", "blue", "yellow", "orange", "purple"]}
      />
    </div>
  );
}
