import firebaseUpload from "../../services/firebase"
import Sidebar from "../../components/admin.sidebar"
import Header from "../../components/admin.header"
import { $, $$ } from "../../utils/common"
import validation from "../../utils/validate"
import instance from "../../api/axios.config"
import toast from "../../components/toast"

const SiteSettingsPage = {
    async render() {
        return /* html */ `
             <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col justify-start items-stretch max-h-screen overflow-y-auto">
                    <header class="min-w-full"> ${await Header.render()}</header>
                   
                    <div class="flex-1 my-10 px-10 sm:px-5 h-full overflow-y-auto invisible-scroll bg-white">
                    <h1 class="text-3xl font-semibold mb-10"><i class="bi bi-gear"></i> Settings</h1>
                      <form action="" id="setting-form"class="flex flex-col gap-5 max-w-[500px]">
                            <div class="form-control gap-1">
                                <label for="" class="font-medium italic">Site title</label>
                                <input type="text" class="input input-bordered" id="title">
                                <small class="text-error error-message"></small>

                            </div>
                            <div class="form-control gap-1 mb-5">
                                <label class="font-medium italic" for="">Logo</label>
                                <input type="file" name="" id="file" class="file hidden" data-name="Image"  accept="image/*">
                                <div class="relative flex justify-center items-center w-[200px] h-[200px] border rounded-lg overflow-hidden">
                                    <label class="font-medium italic relative z-10 h-full w-full flex justify-center items-center bg-transparent text-zinc-200 duration-500 hover:bg-zinc-900 hover:text-white" for="file" >Upload</label>
                                    <img src="" alt="" id="preview" class="absolute top-0 left-0 max-w-full h-full  object-contain object-center z-0">
                                </div>
                                <small class="text-error error-message"></small>
                            </div> 
                            <button type="submit" class="btn btn-primary w-fit">Save</button>
                      </form>
                    </div>

                </div>
                ${await Sidebar.render()}
                </div>
        `
    },
    handleEvents() {
        Header.handleEvent();

        // preview before uploading
        const file = $("#file")
        if (file)
            file.onchange = (e) => {
                const url = URL.createObjectURL(e.target.files[0])
                const preview = $("#preview")
                if (preview)
                    preview.src = url
            }

        const settingForm = $("#setting-form")
        if (settingForm)
            settingForm.addEventListener("submit", async (event) => {
                event.preventDefault()
                const title = $("#title")
                if (!validation.areRequired(file, title)) return
                if (!validation.isValidFile(file, validation.allowedImgExt)) return
                try {
                    const fileUploaded = await firebaseUpload(file.files[0])
                    if (fileUploaded) {
                        const res = await instance.patch("/settings", {
                            title: title.value,
                            logo: fileUploaded
                        })
                        console.log(res)
                        if (res) {
                            toast("success", "Saved the settings!")
                            location.href = "/#/admin/dashboard"
                        }
                    }

                } catch (error) {
                    console.log(error);
                }

            })
    }
}
export default SiteSettingsPage