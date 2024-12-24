"use client";

import React, { useEffect, useRef, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Nullable, QrPayloadData } from "@/types/CommonTypes";

interface QrPayloadGeneratorProps {
  onChange: (code: string) => void;
  details: QrPayloadData;
  setData: (data: QrPayloadData) => void;
}

const qrTypes = ["text", "url", "wifi"];

export default function QrPayloadGenerator({
  onChange,
  details,
  setData,
}: QrPayloadGeneratorProps) {
  const debounce = useRef<Nullable<NodeJS.Timeout>>(null);
  const [qrPayloadDetails, setQRPayloadDetails] =
    useState<QrPayloadData>(details);

  const generateQRCode = () => {
    let code = "";

    if (qrPayloadDetails.type === "text") {
      code = qrPayloadDetails.text as string;
    } else if (qrPayloadDetails.type === "url") {
      code = qrPayloadDetails.url as string;
    } else if (qrPayloadDetails.type === "wifi") {
      code = `WIFI:T:${qrPayloadDetails.encryption};S:${qrPayloadDetails.ssid};P:${qrPayloadDetails.password};H:${qrPayloadDetails.hidden};`;
    }

    return code;
  };

  const handleQRDetailChange = (target: string, value: any) => {
    setQRPayloadDetails((prev: any) => ({ ...prev, [target]: value }));
  };

  useEffect(() => {
    if (debounce.current) {
      clearTimeout(debounce.current);
    }

    debounce.current = setTimeout(() => {
      onChange(generateQRCode());
      setData(qrPayloadDetails);
    }, 500);
  }, [qrPayloadDetails]);

  return (
    <>
      <Label htmlFor="dotType">QR code type</Label>
      <Select key="type" onValueChange={(e) => handleQRDetailChange("type", e)}>
        <SelectTrigger id="dotType" className="mb-2">
          <SelectValue placeholder={qrPayloadDetails.type} />
        </SelectTrigger>
        <SelectContent>
          {qrTypes.map((item) => {
            return (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {qrPayloadDetails.type === "text" ? (
        <>
          <Label htmlFor="text">Text</Label>
          <Input
            id="text"
            type="text"
            placeholder="Enter text"
            value={qrPayloadDetails.text}
            onChange={(e) => handleQRDetailChange("text", e.target.value)}
          />
        </>
      ) : null}

      {qrPayloadDetails.type === "url" ? (
        <>
          <Label htmlFor="url">Url</Label>
          <Input
            id="url"
            type="text"
            placeholder="Enter URL"
            value={qrPayloadDetails.url}
            onChange={(e) => handleQRDetailChange("url", e.target.value)}
          />
        </>
      ) : null}

      {qrPayloadDetails.type === "wifi" ? (
        <>
          <Label htmlFor="ssid">Ssid</Label>
          <Input
            id="ssid"
            type="text"
            placeholder="Enter SSID"
            className="mb-2"
            value={qrPayloadDetails.ssid}
            onChange={(e) => handleQRDetailChange("ssid", e.target.value)}
          />

          <Label htmlFor="passowrd">Password</Label>
          <Input
            id="ssid"
            type="password"
            placeholder="Enter Password"
            className="mb-2"
            value={qrPayloadDetails.password}
            onChange={(e) => handleQRDetailChange("password", e.target.value)}
          />

          <Label htmlFor="encryption">Encryption</Label>
          <Select
            key="encryption"
            onValueChange={(e) => handleQRDetailChange("encryption", e)}
          >
            <SelectTrigger id="encryption" className="mb-2">
              <SelectValue placeholder={qrPayloadDetails.encryption} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem key="WPA2" value="WPA2">
                WPA2
              </SelectItem>
              <SelectItem key="WEP" value="WEP">
                WEP
              </SelectItem>
              <SelectItem key="nopass" value="nopass">
                No Password
              </SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center">
            <Label htmlFor="hidden">Hidden</Label>
            <Checkbox
              id="hidden"
              className="ml-2"
              checked={qrPayloadDetails.hidden}
              onCheckedChange={(e) => handleQRDetailChange("hidden", e)}
            />
          </div>
        </>
      ) : null}
    </>
  );
}
