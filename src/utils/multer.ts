import multer, { diskStorage } from "multer";
import { nanoid } from "nanoid/non-secure";``

export const filterObject = {
    image: ["image/png", "image/jpg", "image/jpeg"],
    // video: ["video/mp4", "video/mpeg"],
};

export const fileUpload = ({ folder, filetype }: { folder: string; filetype: string }) => {
    const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
        if (!filterObject[filetype as keyof typeof filterObject]?.includes(file.mimetype)) {
            cb(null, false);
        }
        return cb(null, true);
    };
    const storage = diskStorage({
        destination: `uploads/${folder}`,
        filename: (req, file, cb) => {
            cb(null, nanoid() + "__" + file.originalname);
        },
    });
    return multer({ storage, fileFilter });
};
