import { $ } from "../utils/common";
import * as filestack from "filestack-js";

const filestackUpload = () => {
    const client = filestack.init("AfLOI3jGURSCQm8UcHQD3z");
    const option = {
        accept: [".png", ".jpg", ".jpeg", ".webp"],
        acceptFn: (file, options) => {
            const mimeFromExtension = options.mimeFromExtension(file.originalFile.name);
            if (options.acceptMime.length && !options.acceptMime.includes(mimeFromExtension)) {
                return Promise.reject("Cannot accept that file");
            }
            return Promise.resolve();
        },
        onUploadDone: ({ filesUploaded }) => {
            const preview = $("#preview")
            if (preview)
                preview.src = filesUploaded[0].url;

        },
    };
    client.picker(option).open();
}
export default filestackUpload