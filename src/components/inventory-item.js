import { $, $$ } from "../utils/common"
import * as productModel from "../api/product"
import { reRender } from "../utils/render-page"
import toast from "./toast"

const InventoryItem = {
    render(item, index) {
        return /* html */`
            <tr>
                <td>${index + 1}</td>
                <td class="font-medium">
                    <div class="flex items-center gap-2">
                        <img src="${item.image}" alt="" class="max-w-[50px] h-[50px] object-cover object-center">
                        <div>
                            <p>${item.name}</p>
                            <p class="text-secondary">$${item.price}</p>
                        </div>
                    </div>
            </td>
                <td>${item.category.name}</td>
                <td>${item.stock}</td>
                <td><input type="checkbox" class="checkbox disabled:bg" disabled ${item.stock !== 0 ? "checked" : ""}></td>
                <td>
                    <div class="dropdown dropdown-left">
                        <label tabindex="0" class=""><i class="bi bi-three-dots text-zinc-400"></i></label>
                        <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a href="/#/admin/inventory/edit-product/${item.id}"><i class="bi bi-pencil"></i> Edit</a></li>
                            <li class="remove-btn text-error" data-id="${item.id}"><a><i class="bi bi-trash"></i> Remove</a></li>
                        </ul>
                    </div>
                </td>
            </tr>
        `
    },
    handleEvents() {
        const removeBtns = $$(".remove-btn")
        if (removeBtns) {
            removeBtns.forEach(btn => btn.onclick = async () => {
                if (confirm("Are you sure?")) {
                    const removedProduct = await productModel.del(btn.dataset.id)
                    console.log(removedProduct);
                    toast("success", "Removed Product!")
                    const products = await productModel.getAll()
                    reRender("#product-list", products.map((item, index) => this.render(item, index)).join(""))
                }

            })
        }
    }

}


export default InventoryItem