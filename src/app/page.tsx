"use client";
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
export default function Home() {
  const [openDetailEditor, setOpenDetailEditor] = useState(false);
  const [enableCrop, setEnableCrop] = useState(false);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [fileinfo, setFileInfo] = useState<{
    name: string;
    size: number;
    type: string;
  } | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [cropSize, setCropSize] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const [cropIntoMutiple, setCropIntoMultiple] = useState(false);

  const [specifileMutipleData, setSpecifileMutipleData] = useState<{
    height: number;
    width: number;
    imgPos: number;
  } | null>(null);

  const onCropComplete = (
    croppedArea: { x: number; y: number; width: number; height: number },
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    console.log(croppedArea, croppedAreaPixels);
  };

  const [imageInfo, setImageInfo] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const onFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new window.Image();
        img.onload = () => {
          setImage(reader.result as string);
          setImageInfo({ width: img.width, height: img.height });
          setFileInfo({
            name: file.name,
            size: file.size,
            type: file.type,
          });
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }, []);

  function onDetailSave() {
    if (cropIntoMutiple) {
      if (!imageInfo || !image) return;

      // Get number of rows and columns from the input fields
      const rowInput = document.getElementById(
        "rows"
      ) as HTMLInputElement | null;
      const colInput = document.getElementById(
        "columns"
      ) as HTMLInputElement | null;
      const rows = rowInput ? parseInt(rowInput.value, 10) : 2;
      const cols = colInput ? parseInt(colInput.value, 10) : 2;

      const { width: imgWidth, height: imgHeight } = imageInfo;
      const sectionWidth = Math.floor(imgWidth / cols);
      const sectionHeight = Math.floor(imgHeight / rows);

      const croppedImages: string[] = [];

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = new window.Image();
      img.onload = () => {
        for (let row = 0; row < rows; row++) {
          for (let col = 0; col < cols; col++) {
            const sx = col * sectionWidth;
            const sy = row * sectionHeight;
            const sw = col === cols - 1 ? imgWidth - sx : sectionWidth;
            const sh = row === rows - 1 ? imgHeight - sy : sectionHeight;

            canvas.width = sw;
            canvas.height = sh;
            ctx.clearRect(0, 0, sw, sh);
            ctx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh);
            const croppedDataUrl = canvas.toDataURL();
            croppedImages.push(croppedDataUrl);
          }
        }
        import("jszip").then((JSZipModule) => {
          const JSZip = JSZipModule.default;
          const zip = new JSZip();
          croppedImages.forEach((dataUrl, idx) => {
            // Convert base64 to blob
            const arr = dataUrl.split(",");
            const mime = arr[0].match(/:(.*?);/)?.[1] || "image/png";
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
              u8arr[n] = bstr.charCodeAt(n);
            }
            zip.file(`cropped_${idx + 1}.png`, u8arr, { binary: true });
          });
          zip.generateAsync({ type: "blob" }).then((content) => {
            const link = document.createElement("a");
            link.href = URL.createObjectURL(content);
            link.download = `${fileinfo?.name}_${Date.now()}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          });
        });
      };
      img.src = image;
    }
  }

  return (
    <div style={{ width: "100%", height: "100vh", position: "relative" }}>
      <div
        style={{
          position: "absolute",
          top: 0,
          padding: "0",
          backgroundColor: "#000",
          width: "100%",
          height: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        className={`${openDetailEditor ? "flex" : "hidden"}  `}
      >
        <div
          style={{
            padding: "20px",
            color: "#fff",
            backgroundColor: "#333",
            zIndex: 1000,
            height: "80%",
            width: "80%",
            overflowY: "auto",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Detail Editor</h2>
            <button
              style={{ color: "red" }}
              onClick={() => setOpenDetailEditor(!openDetailEditor)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-x"
                style={{ cursor: "pointer" }}
              >
                <path
                  d="M12 10.586l4.95-4.95 1.414 1.414-4.95 4.95 4.95 4.95-1.414 1.414-4.95-4.95-4.95 4.95-1.414-1.414 4.95-4.95-4.95-4.95 1.414-1.414z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: "start",
              flexGrow: 1,
            }}
          >
            <span style={{ fontSize: "16px", color: "#ccc" }}>
              Image Detail:
              <span style={{ fontWeight: "bold" }}>
                {imageInfo
                  ? `${imageInfo.width} x ${imageInfo.height}`
                  : "No image selected"}
              </span>
            </span>
            <div style={{ marginTop: "10px" }}>
              <label>
                Crop into multiple:
                <input
                  type="checkbox"
                  checked={cropIntoMutiple}
                  onChange={(e) => setCropIntoMultiple(e.target.checked)}
                  style={{ marginLeft: "10px" }}
                />
              </label>
              {cropIntoMutiple && (
                <div
                  style={{
                    marginTop: "10px",
                    display: "flex",
                    alignItems: "start",
                    gap: "10px",
                    flexDirection: "column",
                  }}
                >
                  <label style={{ marginLeft: "20px" }}>
                    Number of rows:
                    <input
                      id="rows"
                      type="number"
                      defaultValue={2}
                      style={{ width: "60px", marginLeft: "10px" }}
                    />
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    Number of columns:
                    <input
                      id="columns"
                      type="number"
                      defaultValue={2}
                      style={{ width: "60px", marginLeft: "10px" }}
                    />
                  </label>
                  <label style={{ marginLeft: "20px" }}>
                    Specifile for image at :
                    {specifileMutipleData ? (
                      <span style={{ display: "inline" }}>
                        <input
                          type="number"
                          value={specifileMutipleData.imgPos}
                          onChange={(e) =>
                            setSpecifileMutipleData({
                              ...specifileMutipleData,
                              imgPos: parseInt(e.target.value, 10),
                            })
                          }
                          style={{ width: "60px", marginLeft: "10px" }}
                        />
                        <input
                          type="number"
                          value={specifileMutipleData.height}
                          onChange={(e) =>
                            setSpecifileMutipleData({
                              ...specifileMutipleData,
                              height: parseInt(e.target.value, 10),
                            })
                          }
                          placeholder="Height"
                          style={{ width: "60px", marginLeft: "10px" }}
                        />
                        <input
                          type="number"
                          value={specifileMutipleData.width}
                          onChange={(e) =>
                            setSpecifileMutipleData({
                              ...specifileMutipleData,
                              width: parseInt(e.target.value, 10),
                            })
                          }
                          placeholder="Width"
                          style={{ width: "60px", marginLeft: "10px" }}
                        />
                      </span>
                    ) : (
                      <p style={{ marginLeft: "10px", display: "inline" }}>
                        Default
                      </p>
                    )}
                    <button
                      onClick={() => {
                        setSpecifileMutipleData({
                          height: 100,
                          width: 100,
                          imgPos: 1,
                        });
                      }}
                      style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Add Specifile
                    </button>
                  </label>
                  <div
                    style={{
                      marginLeft: "20px",
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <button
                      onClick={() => {}}
                      style={{
                        marginLeft: "10px",
                        padding: "5px 10px",
                        backgroundColor: "#007bff",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Preview All Crop Image
                    </button>
                    <button
                      onClick={() => {
                        setCropIntoMultiple(false);
                        setSpecifileMutipleData(null);
                        setCropSize({ width: 0, height: 0 });
                      }}
                      style={{
                        padding: "5px 10px",
                        backgroundColor: "#28a745",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <button
              onClick={() => {
                onDetailSave();
                setOpenDetailEditor(false);
              }}
              style={{
                padding: "10px 20px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          height: "10vh",
        }}
      >
        <div>
          <input type="file" accept="image/*" onChange={onFileChange} />
          {imageInfo && (
            <div>
              <p>Image Width: {imageInfo.width}px</p>
              <p>Image Height: {imageInfo.height}px</p>
            </div>
          )}
          <button
            onClick={() => {
              setOpenDetailEditor(true);
            }}
            style={{ marginLeft: "10px" }}
          >
            Open Detail editor
          </button>
        </div>
        <div>
          <p>
            Crop Position: {`x: ${crop.x.toFixed(2)}, y: ${crop.y.toFixed(2)}`}
          </p>
          <span>
            Zoom: {zoom.toFixed(2)}
            <input
              type="range"
              min="1"
              max="20"
              step="0.01"
              value={zoom}
              onChange={(e) => setZoom(parseFloat(e.target.value))}
              style={{ width: "200px", marginLeft: "10px" }}
            />
          </span>
          <span>
            <span style={{ marginRight: "10px" }}>
              Crop Size: {cropSize.width} x {cropSize.height} (px)
              <button
                onClick={() => {
                  setEnableCrop(!enableCrop);
                  if (!enableCrop) {
                    setCropSize({ width: 200, height: 200 });
                  } else {
                    setCropSize({ width: 0, height: 0 });
                  }
                }}
                style={{
                  marginLeft: "10px",
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {enableCrop ? "Disable Crop" : "Enable Crop"}
              </button>
            </span>
            {enableCrop && (
              <div>
                <label style={{ marginRight: "10px" }}>
                  Height:
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="1"
                    value={cropSize.height}
                    onChange={(e) =>
                      setCropSize({
                        ...cropSize,
                        height: parseInt(e.target.value),
                      })
                    }
                    style={{ width: "200px", marginRight: "10px" }}
                  />
                </label>
                <label>
                  Width:
                  <input
                    type="range"
                    min="20"
                    max="1000"
                    step="1"
                    value={cropSize.width}
                    onChange={(e) =>
                      setCropSize({
                        ...cropSize,
                        width: parseInt(e.target.value),
                      })
                    }
                    style={{ width: "200px", marginRight: "10px" }}
                  />
                </label>
              </div>
            )}
          </span>
        </div>
      </div>
      <div style={{ position: "relative", width: "100%", height: "90vh" }}>
        {image && (
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            maxZoom={20}
            cropSize={cropSize}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        )}
      </div>
    </div>
  );
}
