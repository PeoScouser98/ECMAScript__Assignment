import router from "../../main"
import * as productModel from "../../api/product"
import * as orderModel from "../../api/orders"
import Header from "../../components/admin.header"
import Sidebar from "../../components/admin.sidebar"
import instance from "../../api/axios.config"

const CustomerPage = {
    async render() {

        const customers = await instance.get("/users?role=0")
        console.log(customers);
        return /* html */ `
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col justify-start gap-10 items-stretch max-h-screen bg-">
                    <header class="min-w-full"> ${await Header.render()}</header>
                   
                    <div class="flex-1 px-10 sm:px-5 flex flex-col">
                        <h1 class="font-semibold text-3xl mb-5">Customers List</h1>
                       <table class="table w-full">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Customer</th>
                                <th>Email</th>
                                <th>Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${customers.map(cus => /* html */ `
                                <tr>
                                    <td>${cus.id}</td>
                                    <td>
                                        <div class="flex items-center gap-2">
                                            <img src="${cus.avatar}" alt="" class="max-w-[40px] h-[40px] object-cover object-center">
                                            <div>
                                                <p class="font-medium">${cus.username}</p>
                                                <p class="hidden sm:block">${cus.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>${cus.email}</td>
                                    <td>${cus.address}</td>
                                </tr>
                            `).join("")}
                        </tbody>
                       </table>
                    </div>

                </div>
                ${await Sidebar.render()}
                </div>
   `
    },
    handleEvents() {
        Header.handleEvent()
    }
}

export default CustomerPage