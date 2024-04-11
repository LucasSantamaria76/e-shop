/* export const uploadOnlyImage = async (image:FileList) =>{
    const file = new FormData();
      file.append("file", image);
      file.append(
        "upload_preset",
        process.env.NEXT_PUBLIC_CLOUDINARY_PRODUCTS_PRESET
      );
      const {
        data: { public_id },
      } = await cloudinary.post("/image/upload", file);
} */
