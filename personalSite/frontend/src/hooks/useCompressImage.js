import { useContext, useState } from "react";

import { ModalDataDispatchContext } from "../contexts/ModalDataContext";
import ApiServices from "../services/ApiServices";


const MAX_WIDTH = 600;
const MAX_HEIGHT = 600;

export function useCompressImage(modalData) {
    const dispatch = useContext(ModalDataDispatchContext);

    const [imageUrl, setImageUrl] = useState(modalData?.data?.imgURL);
    const [originalSize, setOriginalSize] = useState('');
    const [compressedSize, setCompressedSize] = useState('');
    const [loading, setIsLoading] = useState(false);

    const handleCompressImage = e => {
        setIsLoading(true);

        if (e?.target?.files[0]) {
            const file = e.target.files[0];
            const blobURL = URL.createObjectURL(file);

            const img = new Image();
            img.src = blobURL;

            img.addEventListener('load', () => {
                const [newWidth, newHeight] = calculateSize(img, MAX_WIDTH, MAX_HEIGHT);
                const canvas = document.createElement('canvas');
                canvas.width = newWidth;
                canvas.height = newHeight;
                const ctx = canvas.getContext('2d');

                ctx.drawImage(img, 0, 0, newWidth, newHeight);
                canvas.toBlob(async blob => {
                    setOriginalSize(readableBytes(file.size));
                    setCompressedSize(readableBytes(blob.size));

                    const response = await ApiServices.uploadImage(blob);

                    if (response.ok) {
                        const responseJson = await response.json();

                        dispatch({
                            type: modalData.requestType,
                            data: { ...modalData.data, imgURL: responseJson.url },
                        })

                        setImageUrl(responseJson.url);
                    }
                    setIsLoading(false);
                })
            })
        }

    }

    return { imageUrl, originalSize, compressedSize, loading, setImageUrl, handleCompressImage }
}

function calculateSize(img, maxWidth, maxHeight) {
    let width = img.width;
    let height = img.height;

    if (width > height) {
        if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
        }
    }
    return [width, height];
}

function readableBytes(bytes) {
    const i = Math.floor(Math.log(bytes) / Math.log(1024)),
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
}
