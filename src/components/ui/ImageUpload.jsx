import React from "react";
import { BsXLg, BsCamera } from "react-icons/bs"

const ImageUpload = ({
    value,
    onChange,
    size = 160,
}) => {
    const fileInputRef = React.useRef(null);

    const handleSelectFile = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert("A imagem deve possuir no máximo 2MB.");
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            onChange(reader.result);
        };

        reader.readAsDataURL(file);
    };

    const handleRemove = (e) => {
        e.stopPropagation();

        onChange("");

        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="flex justify-center">
            <div
                onClick={handleSelectFile}
                className="
                relative
                cursor-pointer
                overflow-hidden
                rounded-lg
                border-2
                border-dashed
                border-gray-300
                dark:border-gray-600
                hover:border-blue-500
                transition-colors
                group
                "
                style={{
                    width: size,
                    height: size,
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />

                {value ? (
                    <>
                        <img
                            src={value}
                            alt="Produto"
                            className="w-full h-full object-cover"
                        />

                        <button
                            type="button"
                            onClick={handleRemove}
                            className="
                                absolute
                                top-2
                                right-2
                                w-8
                                h-8
                                rounded-full
                                bg-red-600
                                text-white
                                font-bold
                                shadow-lg
                                hover:bg-red-700
                                flex
                                items-center
                                justify-center
                                z-50
                            "
                        >
                            <BsXLg />
                        </button>

                        <div
                            className="
                                absolute
                                inset-0
                                bg-black/40
                                opacity-0
                                group-hover:opacity-100
                                transition-opacity
                                flex
                                items-center
                                justify-center
                                text-white
                                font-medium
                            "
                        >
                            Alterar Foto
                        </div>
                    </>
                ) : (
                    <div
                        className="
                        w-full
                        h-full
                        flex
                        flex-col
                        items-center
                        justify-center
                        text-gray-500
                        dark:text-gray-400
                        gap-2
                        "
                    >
                        <span className="text-4xl">
                            <BsCamera />
                        </span>
                        <span className="text-sm text-center">
                            Clique para adicionar
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageUpload;