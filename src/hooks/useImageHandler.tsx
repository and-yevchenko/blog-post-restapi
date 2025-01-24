import { useState } from "react";
import { ImageNameStatus } from "../components/AddPost/_type";


export const useImageHandler = () => {
    const [imagePost, setImagePost] = useState<string | null>(null);
    const [nameImage, setNameImage] = useState<string | null>(null);

    const validateFile = (file: File) => {
        const allowedFormats = ['image/png', 'image/jpeg', 'image/jpg'];
        return file.size <= 20 && allowedFormats.includes(file.type);
    };

    const handleImageChange = (file: File | null) => {
        if (!file || !validateFile(file)) {
            setNameImage(ImageNameStatus.INVALID_FILE)
            return
        }
        setNameImage(
            file.name.slice(0, file.name.lastIndexOf('.')).slice(0, 10) +
                `${file.name.length > 10 ? '...' + file.name.split('.').pop() : ''}`,
        );
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePost(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    const deleteImage = () => {
        setNameImage(null)
        setImagePost(null)
    }

    return { imagePost, nameImage, handleImageChange, deleteImage }
}