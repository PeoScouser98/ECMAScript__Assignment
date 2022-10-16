import router from "../../main"
import * as productModel from "../../api/product"
import * as orderModel from "../../api/orders"
import Header from "../../components/admin.header"
import Sidebar from "../../components/admin.sidebar"
import * as userModel from "../../api/user"
import instance from "../../api/axios.config"
import { $$ } from "../../utils/common"
const Dashboard = {
    async render() {
        const products = await productModel.getAll()
        const customers = await userModel.getAll()

        const orders = await orderModel.getAll()
        console.log("Before reducer:", orders);

        const allOrderDetails = orders.reduce((prev, curr) => {
            let { orderItems } = curr
            if (orderItems && Array.isArray(orderItems)) {
                orderItems = orderItems.map(item => {
                    return {
                        orderId: curr.id,
                        customer: curr.username,
                        address: curr.address,
                        status: curr.status.name,
                        ...item
                    }
                })
                prev = [orderItems, ...prev]
                return prev.flat()
            }
        }, [])

        console.log("After reducer:", allOrderDetails);
        const turnover = allOrderDetails.reduce((prev, curr) => {
            return prev + curr.total
        }, 0)
        return /* html */ `
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col justify-start gap-10 items-stretch max-h-screen bg-">
                    <header class="min-w-full"> ${await Header.render()}</header>
                   
                    <div class="flex-1 px-10 sm:px-5 flex flex-col gap-20">
                        <section>
                            <h1 class="font-semibold text-3xl mb-5">Overview</h1>
                            <div class="grid grid-cols-4 gap-5 sm:grid-cols-1 md:grid-cols-1 w-full">
                                <!-- products summary -->
                                <div class="stack">
                                    <div class="flex items-center gap-5 max-w-sm h-40 rounded bg-base-100 p-5">
                                        <i class="bi bi-currency-dollar text-6xl text-success font-extralight"></i>
                                        <div class="flex flex-col gap-2">
                                            <span class="text-3xl font-bold">$${turnover}</span>
                                            <span class="text-xl text-zinc-500">Turnover</span>
                                        </div>
                                    </div>
                                    <div class="grid max-w-sm h-40 rounded bg-zinc-200 place-content-center"></div>
                                    <div class="grid max-w-sm h-40 rounded bg-zinc-500 place-content-center shadow-2xl"></div>
                                </div>
                                <!-- orders summary -->
                                <div class="stack">
                                    <div class="flex items-center gap-5 max-w-sm h-40 rounded bg-base-100 p-5">
                                        <i class="bi bi-receipt text-accent text-6xl text-primary"></i>
                                        <div class="flex flex-col gap-2">
                                            <span class="text-3xl font-bold">${orders.length} </span>
                                            <span class="text-xl text-zinc-500">New Orders</span>
                                        </div>
                                    </div>
                                    <div class="grid max-w-sm h-40 rounded bg-zinc-200 place-content-center"></div>
                                    <div class="grid max-w-sm h-40 rounded bg-zinc-500 place-content-center shadow-2xl"></div>
                                </div>
                                <!-- total customer -->
                                <div class="stack">
                                    <div class="flex items-center gap-5 max-w-sm h-40 rounded bg-base-100 p-5">
                                        <i class="bi bi-box-seam text-secondary text-6xl text-primary"></i>
                                    <div class="flex flex-col gap-2">
                                        <span class="text-3xl font-bold">${products.length} </span>
                                        <span class="text-xl text-zinc-500">Total Products</span>
                                    </div>
                                    </div>
                                    <div class="grid max-w-sm h-40 rounded bg-zinc-200 place-content-center"></div>
                                    <div class="grid max-w-sm h-40 rounded bg-zinc-500 place-content-center shadow-2xl"></div>
                                </div>
                                <!-- total customer -->
                                <div class="stack">
                                    <div class="flex items-center gap-5 max-w-sm h-40 rounded bg-base-100 p-5">
                                        <i class="bi bi-people text-info text-6xl text-primary"></i>
                                    <div class="flex flex-col gap-2">
                                    <span class="text-3xl font-bold">${customers.length}</span>
                                        <span class="text-xl text-zinc-500">Total Customers</span>
                                    </div>
                                    </div>
                                    <div class="grid max-w-sm h-40 rounded bg-zinc-200 place-content-center"></div>
                                    <div class="grid max-w-sm h-40 rounded bg-zinc-500 place-content-center shadow-2xl"></div>
                                </div>
                            </div>
                        </section>
                        <!-- lastest orders -->
                        <section>
                            <h1 class="font-semibold text-3xl mb-5">Recently Sold</h1>
                            <table class="table w-full">
                                <thead>
                                    <tr>
                                    <th><input type="checkbox" name="" id="" class="checkbox checkbox-secondary"></th>
                                    <th class="text-base normal-case">Product</th>
                                    <th class="text-base normal-case">Total</th>
                                    <th class="text-base normal-case">Customer</th>
                                    <th class="text-base normal-case">Status</th>
                                    <th class="text-base normal-case">Action</th>
                                </tr>
                            </thead>
                            <tbody id="order-list"></tbody>
                                ${allOrderDetails.map((order, index) => {

            return /* html */ `
                                        <tr>
                                            <td><input type="checkbox" name="" id="" class="checkbox checkbox-secondary"></td>
                                            <td>
                                                <div class="flex items-center gap-2">
                                                    <img src="${order.image}" alt="" class="max-w-[50px] h-[50px] object-cover object-center">
                                                    <div>
                                                        <p class="font-medium">${order.name}</p>
                                                        <p class="text-secondary font-medium">$${order.price} <span class="indent-2 font-normal text-zinc-500">× ${order.qty}</span></p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td class="font-medium text-xl text-secondary">$${+order.price * +order.qty}</td>
                                            <td>
                                                <p class="font-medium">${order.customer}</p>
                                                <p class="w-auto truncate text-sm text-zinc-400">${order.address}</p>
                                            </td>
                                            <td class="order-status font-medium italic">${order.status}</td>
                                            <td>
                                                <div class="dropdown dropdown-end">
                                                    <label tabindex="0" class="btn btn-ghost hover:bg-transparent m-1 text-zinc-400"><i class="bi bi-three-dots"></i></label>
                                                    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                                                        <li><a href="/#/admin/order-detail/${order.orderId}"><i class="bi bi-eye"></i> View details</a></li>
                                                        <li><a><i class="bi bi-pencil"></i> Update</a></li>
                                                    </ul>
                                                </div>
                                            </td>
                                        </tr>
                                        `}).join("")}
                            </table>

                        </section>
                        <section></section>
                    </div>

                </div>
                ${await Sidebar.render()}
                </div>
   `
    },
    async handleEvents() {
        Header.handleEvent()

        const orderStt = $$(".order-status")
        if (orderStt) {
            orderStt.forEach(ost => {
                switch (ost.innerText.toLowerCase()) {
                    case "processing":
                        ost.classList.add("text-warning")
                        break;
                    case "delivering":
                        ost.classList.add("text-info")
                        break;
                    case "completed":
                        ost.classList.add("text-success")
                        break;
                    case "refund":
                        ost.classList.add("text-error")
                        break;
                    default:
                        break;
                }


            })
        }


    }
}

export default Dashboard