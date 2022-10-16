import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../api/firebase.config";
import { $ } from "../utils/common";

const firebaseUpload = async (file) => {
    try {
        const storage = getStorage(app);
        const storageRef = ref(storage, `images/${file?.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        const fileURL = await getDownloadURL(uploadTask.snapshot.ref)
        return fileURL
    } catch (error) {
        return Promise.reject(error)
    }

}

export default firebaseUpload