import { ImageResponse } from "next/og";
import { FIT_MARK_PATH } from "@/components/icons";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <path d={FIT_MARK_PATH} fill="#3d5fff" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
