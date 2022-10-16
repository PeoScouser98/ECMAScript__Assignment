import firebaseUpload from "../../services/firebase"
import Sidebar from "../../components/admin.sidebar"
import Header from "../../components/admin.header"
import { $, $$ } from "../../utils/common"
import validation from "../../utils/validate"
import instance from "../../api/axios.config"
import toast from "../../components/toast"

const AdminOrderPage = {
    async render() {
        return /* html */ `
             <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col justify-start items-stretch max-h-screen overflow-y-auto">
                    <header class="min-w-full"> ${await Header.render()}</header>
                   
                    <div class="flex-1 my-10 px-10 sm:px-5 h-full overflow-y-auto invisible-scroll bg-white">
                    <h1 class="text-3xl font-semibold mb-10"><i class="bi bi-gear"></i> Settings</h1>
                      
                    </div>

                </div>
                ${await Sidebar.render()}
                </div>
        `
    },
    handleEvents() {
        Header.handleEvent();



    }
}
export default AdminOrderPage