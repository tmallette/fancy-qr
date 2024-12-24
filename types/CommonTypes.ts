import {
    CornerDotType,
    CornerSquareType,
    DotType,
    Mode,
    TypeNumber,
  } from "qr-code-styling";

export interface QRData {
  text: string;
  image: string;
  imageSize: number;
  dotType: DotType | undefined;
  dotColorType: "single" | "gradient";
  dotColor: string;
  dotGradientColorType: "linear" | "radial";
  dotGradientColorOne: string;
  dotGradientColorTwo: string;
  dotGradientRotation: number;
  cornerSquareType: CornerSquareType | undefined;
  cornerSquareColorType: "single" | "gradient";
  cornerSquareColor: string;
  cornerSquareGradientColorType: "linear" | "radial";
  cornerSquareGradientColorOne: string;
  cornerSquareGradientColorTwo: string;
  cornerSquareGradientRotation: number;
  cornerDotType: CornerDotType | undefined;
  cornerDotColorType: "single" | "gradient";
  cornerDotColor: string;
  cornerDotGradientColorType: "linear" | "radial";
  cornerDotGradientColorOne: string;
  cornerDotGradientColorTwo: string;
  cornerDotGradientRotation: number;
  backgroundColorType: string;
  backgroundColor: string;
  backgroundGradientColorType: "linear" | "radial";
  backgroundGradientColorOne: string;
  backgroundGradientColorTwo: string;
  backgroundGradientRotation: number;
  errorType: "L" | "M" | "Q" | "H";
  mode: Mode | undefined;
  number: TypeNumber | undefined;
}

export interface QrPayloadData {
    type: "text" | "url" | "wifi";
    text?: string;
    url?: string;
    ssid?: string;
    password?: string;
    encryption?: "WPA2" | "WEP" | "nopass";
    hidden?: boolean;
  }

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;