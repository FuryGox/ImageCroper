"use client"
const PreviewCropedImage = ({
    images, table
}: { images: string[], table: { rows: number, cols: number } }) => {

    return (
        <>
            <div className="flex flex-wrap gap-4 flex-col items-center">
                {Array.from({ length: table.rows }).map((_, rowIdx) => (
                    <div key={rowIdx} className="flex flex-row gap-4">
                        {Array.from({ length: table.cols }).map((_, colIdx) => {
                            const imgIdx = rowIdx * table.cols + colIdx;
                            return images[imgIdx] ? (
                                <img
                                    key={colIdx}
                                    src={images[imgIdx]}
                                    alt={`Cropped ${imgIdx}`}
                                    className="w-32 h-32 object-cover border"
                                />
                            ) : null;
                        })}
                    </div>
                ))}
            </div>
        </>
    );
}

export default PreviewCropedImage;