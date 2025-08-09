import { Audio } from "react-loader-spinner";

export default function LoadingSpinner() {
  return (
    <div className="text-align-center empty-bag">
      <Audio
        height="80"
        width="80"
        radius="9"
        color="#C81E2B"
        ariaLabel="loading"
        wrapperStyle={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          height: "100%",
        }}
        wrapperClass="loading-spinner"
      />
    </div>
  );
}
