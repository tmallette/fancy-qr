'use client';

import { Nullable, QRData, QrPayloadData } from '@/types/CommonTypes';
import { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { FileExtension, Options } from 'qr-code-styling';
import QrPayloadGenerator from './QrPayloadGenerator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Info } from 'lucide-react';
import { Input } from '@/components/ui/input';
import ColorPickerPopover from './ColorPickerPopover';
import { Button } from '@/components/ui/button';

const dotOptions = [ 'square', 'dots', 'rounded', 'classy', 'classy-rounded', 'extra-rounded' ];
const cornerSquareOptions = ['square', 'dot', 'extra-rounded'];
const cornerDotOptions = ['square', 'dot', 'extra-rounded'];
const errorOptions = ['L', 'M', 'Q', 'H'];
const qrCodeOptions = {
  width: 400,
  height: 400,
  dotsOptions: {
    color: '#000000',
    type: 'square',
  },
  backgroundOptions: {
    color: '#ffffff',
  },
  imageOptions: {
    crossOrigin: 'anonymous',
    margin: 0,
    imageSize: 0.4,
    hideBackgroundDots: true,
  },
  cornersSquareOptions: {
    color: '#000000',
    type: 'dot',
  },
  cornersDotOptions: {
    color: '#000000',
    type: 'dot',
  },
  qrOptions: {
    typeNumber: 0,
    mode: 'Byte',
    errorCorrectionLevel: 'H',
  },
  margin: 0,
  scale: 4
};
const imageTypes = ['svg', 'png', 'jpg'];
const colorStyle = ['single', 'gradient'];
const gradientStyle = ['linear', 'radial'];

export default function QrCode() {
  const qrCodeRef = useRef<Nullable<HTMLDivElement>>(null);
  const qrCode = useRef<Nullable<QRCodeStyling>>(null);
  const [imageType, setImageType] = useState<FileExtension>('svg');

  const [qrData, setQRData] = useState<QRData>({
    text: 'hello',
    image: '',
    imageSize: 0.4,
    dotType: 'square',
    dotColorType: 'single',
    dotColor: '#000000',
    dotGradientColorType: 'linear',
    dotGradientColorOne: '#000000',
    dotGradientColorTwo: '#000000',
    dotGradientRotation: 0,
    cornerSquareType: 'square',
    cornerSquareColorType: 'single',
    cornerSquareColor: '#000000',
    cornerSquareGradientColorType: 'linear',
    cornerSquareGradientColorOne: '#000000',
    cornerSquareGradientColorTwo: '#000000',
    cornerSquareGradientRotation: 0,
    cornerDotType: 'square',
    cornerDotColorType: 'single',
    cornerDotColor: '#000000',
    cornerDotGradientColorType: 'linear',
    cornerDotGradientColorOne: '#000000',
    cornerDotGradientColorTwo: '#000000',
    cornerDotGradientRotation: 0,
    backgroundColorType: 'single',
    backgroundColor: '#ffffff',
    backgroundGradientColorType: 'linear',
    backgroundGradientColorOne: '#ffffff',
    backgroundGradientColorTwo: '#ffffff',
    backgroundGradientRotation: 0,
    errorType: 'H',
    mode: 'Byte',
    number: 0,
  });

  const [qrPayloadData, setQRPayloadData] = useState<QrPayloadData>({
    type: 'text',
    text: 'hello',
    url: '',
    ssid: '',
    password: '',
    encryption: 'WPA2',
    hidden: false,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    qrCode.current = new QRCodeStyling(qrCodeOptions as Partial<Options>);

    if (qrCodeRef.current) {
      qrCode.current.append(qrCodeRef.current);
    }
  },[]);

  useEffect(() => {
    if (!qrCode.current) return;

    qrCode.current.update({
      data: qrData.text,

      cornersSquareOptions: {
        type: qrData.cornerSquareType,
        color: qrData.cornerSquareColorType === 'single' ? qrData.cornerSquareColor : undefined,
        gradient: qrData.cornerSquareColorType === 'gradient' ? {
          type: qrData.cornerSquareGradientColorType,
          rotation: qrData.cornerSquareGradientRotation,
          colorStops: [
            { offset: 0, color: qrData.cornerSquareGradientColorOne },
            { offset: 1, color: qrData.cornerSquareGradientColorTwo }
          ],
        } : undefined,
      }, 
      cornersDotOptions: {
        type: qrData.cornerDotType,
        color: qrData.cornerDotColorType === 'single' ? qrData.cornerDotColor : undefined,
        gradient: qrData.cornerDotColorType === 'gradient' ? {
          type: qrData.cornerDotGradientColorType,
          rotation: qrData.cornerDotGradientRotation,
          colorStops: [
            { offset: 0, color: qrData.cornerDotGradientColorOne },
            { offset: 1, color: qrData.cornerDotGradientColorTwo },
          ],
        } : undefined,
      },
      image: qrData.image,
      imageOptions: {
        imageSize: qrData.imageSize,
      },
      dotsOptions: {
        type: qrData.dotType,
        color: qrData.dotColorType === 'single' ? qrData.dotColor : undefined,
        gradient: qrData.dotColorType === 'gradient' ? {
          type: qrData.dotGradientColorType,
          rotation: qrData.dotGradientRotation,
          colorStops: [
            { offset: 0, color: qrData.dotGradientColorOne },
            { offset: 1, color: qrData.dotGradientColorTwo },
          ],
        } : undefined,
      },
      backgroundOptions: {
        color: qrData.backgroundColorType === 'single' ? qrData.backgroundColor : undefined,
        gradient: qrData.backgroundColorType === 'gradient' ? {
          type: qrData.backgroundGradientColorType,
          rotation: qrData.backgroundGradientRotation,
          colorStops: [
            { offset: 0, color: qrData.backgroundGradientColorOne },
            { offset: 1, color: qrData.backgroundGradientColorTwo },
          ],
        } : undefined,
      },
      qrOptions: {
        errorCorrectionLevel: qrData.errorType,
        typeNumber: qrData.number,
        mode: qrData.mode,
      }
    });

  }, [qrData]);

  const handleQRChange = (target: string, value: string | number[]) => {
    setQRData((prev) => ({ ...prev, [target]: value }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setQRData((prev) => ({
          ...prev,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return <div className="flex flex-col gap-4 p-4 md:flex-row">
    <div className="order-2 w-full mx-auto md:order-1 md:w-[400px] md:max-w-[500px]">
      <Accordion type="single" collapsible defaultValue="data">
        <AccordionItem value="data">
          <AccordionTrigger>Data</AccordionTrigger>
          <AccordionContent>
            <QrPayloadGenerator details={qrPayloadData} setData={setQRPayloadData} onChange={(data:string)=>{handleQRChange('text',data)}} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="dot">
          <AccordionTrigger> <h2>Dots options</h2></AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="dotType">Dot type</Label>
            <Select key="type" onValueChange={(e)=>{handleQRChange('dotType',e)}}>
              <SelectTrigger id="dotType" className="mb-2">
                <SelectValue placeholder={qrData.dotType} />
              </SelectTrigger>
              <SelectContent>
                {dotOptions.map((item) => {
                  return <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                })}
              </SelectContent>
            </Select>

            <Label htmlFor="dotColorType">Dot color type</Label>
            <Select key="colorType" onValueChange={(e)=>{handleQRChange('dotColorType',e)}}>
              <SelectTrigger id="dotColorType" className="mb-2">
                <SelectValue placeholder={qrData.dotColorType} />
              </SelectTrigger>
              <SelectContent>
                {colorStyle.map((item) => {
                  return <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                })}
              </SelectContent>
            </Select>

            {qrData.dotColorType === 'single' ? <div>
              <Label>Dot color</Label>
              <ColorPickerPopover defaultColor={qrData.dotColor} onChange={(e)=>{handleQRChange('dotColor',e)}} />
            </div>:<div>
              <Label htmlFor="dotGradientColorType">Gradient type</Label>
              <Select key="gradientType" onValueChange={(e)=>{handleQRChange('dotGradientColorType',e)}}>
                <SelectTrigger id="dotGradientColorType" className="mb-2">
                  <SelectValue placeholder={qrData.dotGradientColorType} />
                </SelectTrigger>
                <SelectContent>
                  {gradientStyle.map((item) => {
                    return <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    })}
                  </SelectContent>
                </Select>

                <Label>Dot colors</Label>
                <ColorPickerPopover defaultColor={qrData.dotGradientColorOne} onChange={(e)=>{handleQRChange('dotGradientColorOne',e)}} />
                <ColorPickerPopover defaultColor={qrData.dotGradientColorTwo} onChange={(e)=>{handleQRChange('dotGradientColorTwo',e)}} />

                {qrData.dotGradientColorType === 'linear' ? <div className="mt-4">
                  <Label htmlFor="dotGradientRotation">Rotation</Label>
                  <Slider className="mt-2" defaultValue={[qrData.dotGradientRotation]} min={0} max={6} step={1} onValueChange={(e)=>{handleQRChange('dotGradientRotation',e)}} />
                </div>:null}
              </div>}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cornerSquare">
          <AccordionTrigger>Corner square options</AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="cornerSquareType">Dot type</Label>
            <Select key="type" onValueChange={(e)=>{handleQRChange('cornerSquareType',e)}}>
              <SelectTrigger id="cornerSquareType" className="mb-2">
                <SelectValue placeholder={qrData.cornerSquareType} />
              </SelectTrigger>
              <SelectContent>
                {cornerSquareOptions.map((item) => {
                  return <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                })}
              </SelectContent>
            </Select>

            <Label htmlFor="cornerSquareColorType">Color type</Label>
            <Select key="colorType" onValueChange={(e)=>{handleQRChange('cornerSquareColorType',e)}}>
              <SelectTrigger id="cornerSquareColorType" className="mb-2">
                <SelectValue placeholder={qrData.cornerSquareColorType} />
              </SelectTrigger>
              <SelectContent>
                {colorStyle.map((item) => {
                  return <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                })}
              </SelectContent>
            </Select>

            {qrData.cornerSquareColorType === 'single' ? <div>
              <Label>Dot color</Label>
              <ColorPickerPopover defaultColor={qrData.cornerSquareColor} onChange={(e)=>{handleQRChange('cornerSquareColor',e)}} />
            </div>:<div>
              <Label htmlFor="cornerSquareGradientColorType">Gradient type</Label>
              <Select key="gradientType" onValueChange={(e)=>{handleQRChange('cornerSquareGradientColorType',e)}}>
                <SelectTrigger id="cornerSquareGradientColorType" className="mb-2">
                  <SelectValue placeholder={qrData.cornerSquareGradientColorType} />
                </SelectTrigger>
                <SelectContent>
                    {gradientStyle.map((item) => {
                      return <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                    })}
                  </SelectContent>
              </Select>

              <Label>Dot colors</Label>
              <ColorPickerPopover defaultColor={qrData.cornerSquareGradientColorOne} onChange={(e)=>{handleQRChange('cornerSquareGradientColorOne',e)}} />
              <ColorPickerPopover defaultColor={qrData.cornerSquareGradientColorTwo} onChange={(e) => {handleQRChange('cornerSquareGradientColorTwo',e)}} />

              {qrData.cornerSquareGradientColorType === 'linear' ? <div className="mt-4">
                <Label htmlFor="cornerSquareGradientRotation"> Rotation </Label>
                <Slider className="mt-2" defaultValue={[qrData.cornerSquareGradientRotation]}  min={0} max={6} step={1} onValueChange={(e)=>handleQRChange('cornerSquareGradientRotation',e)} />
              </div>:null}
            </div>}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="cornerDot">
          <AccordionTrigger>Corner dot options</AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="cornerDotType">Dot type</Label>
            <Select key="type" onValueChange={(e)=>{handleQRChange('cornerDotType',e)}}>
              <SelectTrigger id="cornerDotType" className="mb-2" >
                <SelectValue placeholder={qrData.cornerDotType} />
              </SelectTrigger>
              <SelectContent>
                {cornerDotOptions.map((item) => {
                  return <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                })}
              </SelectContent>
            </Select>

            <Label htmlFor="cornerDotColorType">Color type</Label>
            <Select key="colorType" onValueChange={(e)=>{handleQRChange('cornerDotColorType',e)}}>
              <SelectTrigger id="cornerDotColorType" className="mb-2">
                <SelectValue placeholder={qrData.cornerDotColorType} />
              </SelectTrigger>
              <SelectContent>
                {colorStyle.map((item) => {
                  return <SelectItem key={item} value={item} >
                      {item}
                    </SelectItem>
                })}
              </SelectContent>
            </Select>

            {qrData.cornerDotColorType === "single" ? <div>
              <Label>Dot color</Label>
              <ColorPickerPopover defaultColor={qrData.cornerDotColor} onChange={(e)=>{handleQRChange("cornerDotColor", e)}} />
            </div>:<div>
              <Label htmlFor="cornerDotGradientColorType">Gradient type</Label>
              <Select key="gradientType" onValueChange={(e)=>{handleQRChange('cornerDotGradientColorType',e)}}>
                <SelectTrigger id="cornerDotGradientColorType" className="mb-2">
                  <SelectValue placeholder={qrData.cornerDotGradientColorType} />
                </SelectTrigger>
                <SelectContent>
                  {gradientStyle.map((item) => {
                    return <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                  })}
                </SelectContent>
              </Select>

              <Label>Dot colors</Label>
              <ColorPickerPopover defaultColor={qrData.cornerDotGradientColorOne} onChange={(e)=>{handleQRChange('cornerDotGradientColorOne',e)}} />
              <ColorPickerPopover defaultColor={qrData.cornerDotGradientColorTwo} onChange={(e)=>{handleQRChange('cornerDotGradientColorTwo',e)}} />

              {qrData.cornerDotGradientColorType === 'linear' ? <div className="mt-4">
                <Label htmlFor="cornerDotGradientRotation">Rotation</Label>
                <Slider className="mt-2" defaultValue={[qrData.cornerDotGradientRotation]} min={0} max={6} step={1} onValueChange={(e)=>handleQRChange('cornerDotGradientRotation',e)} />
              </div>:null}
            </div>}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="background">
          <AccordionTrigger>Background options</AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="backgroundColorType">Color type</Label>
            <Select key="colorType" onValueChange={(e)=>{handleQRChange('backgroundColorType',e)}}>
              <SelectTrigger id="backgroundColorType" className="mb-2">
                <SelectValue placeholder={qrData.backgroundColorType} />
              </SelectTrigger>
              <SelectContent>
                {colorStyle.map((item) => {
                  return <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                })}
              </SelectContent>
            </Select>

            {qrData.backgroundColorType === 'single' ? <div>
              <Label>Background color</Label>
              <ColorPickerPopover defaultColor={qrData.backgroundColor} onChange={(e)=>{handleQRChange('backgroundColor',e)}} />
            </div>:<div>
              <Label htmlFor="backgroundGradientColorType">Gradient type</Label>
              <Select key="gradientType" onValueChange={(e)=>{handleQRChange('backgroundGradientColorType',e)}}>
                <SelectTrigger id="backgroundGradientColorType" className="mb-2">
                  <SelectValue placeholder={qrData.backgroundGradientColorType} />
                </SelectTrigger>
                <SelectContent>
                  {gradientStyle.map((item) => {
                    return <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                  })}
                </SelectContent>
              </Select>

              <Label>Background colors</Label>
              <ColorPickerPopover defaultColor={qrData.backgroundGradientColorOne} onChange={(e)=>{handleQRChange('backgroundGradientColorOne',e)}} />
              <ColorPickerPopover defaultColor={qrData.backgroundGradientColorTwo} onChange={(e)=>{handleQRChange('backgroundGradientColorTwo',e)}} />

              {qrData.backgroundGradientColorType === 'linear' ? <div className="mt-4">
                <Label htmlFor="backgroundGradientRotation">Rotation</Label>
                <Slider id="backgroundGradientRotation" className="mt-2" defaultValue={[qrData.backgroundGradientRotation]} min={0} max={6} step={1} onValueChange={(e)=>handleQRChange('backgroundGradientRotation',e)} />
              </div>:null}
            </div>}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="image">
          <AccordionTrigger>Image options</AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="image">Upload image</Label>
            <Input id="image" className="mt-2 cursor-pointer" type="file" accept="image/*" onChange={handleImageUpload} />

            {qrData.image ? <div className="mt-4">
                <Label htmlFor="imageSize">Image size</Label>
                <Slider id="imageSize" className="mt-2" defaultValue={[qrData.imageSize]} min={0} max={1} step={0.1} onValueChange={(e)=>handleQRChange('imageSize',e)} />
            </div>:null}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="other">
          <AccordionTrigger>QR options</AccordionTrigger>
          <AccordionContent>
            <Label htmlFor="errorType" className="flex items-center">Error type
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger className="ml-2"><Info /></TooltipTrigger>
                  <TooltipContent>
                    <p>The error code controls redundeny in the QR code.</p>
                    <p>If you have the code set to H or High, the code will still be readable in case of damage.</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </Label>
            <Select key="error" onValueChange={(e)=>{handleQRChange('errorType',e)}}>
              <SelectTrigger id="errorType" className="mt-2">
                <SelectValue placeholder={qrData.errorType} />
              </SelectTrigger>
              <SelectContent>
                {errorOptions.map((item) => {
                  return <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                })}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>
        
      </Accordion>
    </div>
    <div className="flex flex-col flex-1 justify-start items-center order-1 mb-12 md:order-2 md:mb-0">
      <div ref={qrCodeRef}></div>
      <div className="flex items-center mt-12">
        <Button className="mr-4" onClick={()=>{qrCode?.current?.download({name:'qr',extension:imageType})}}>Download</Button>
        <Select key="imageType" onValueChange={(e:FileExtension)=>setImageType(e)}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder={imageType} />
          </SelectTrigger>
          <SelectContent>
            {imageTypes.map((item) => {
                return <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
            })}
          </SelectContent>
        </Select>
      </div>
    </div>
  </div>
};