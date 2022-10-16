import Header from "../../components/admin.header";
import Sidebar from "../../components/admin.sidebar";
import { $, $$ } from "../../utils/common";
import toast from "../../components/toast";
import * as productModel from "../../api/product"
import { reRender } from "../../utils/render-page";
import InventoryItem from "../../components/inventory-item";

const InventoryPage = {
   async render() {
      const url = location.href
      const products = await productModel.getAll()
      console.log(products);
      return /* html */ `
            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col justify-start items-stretch max-h-screen overflow-y-auto">
                    <header class="min-w-full"> ${await Header.render()}</header>
                   
                    <div class="flex-1 my-10 px-10 sm:px-5 h-full overflow-y-auto invisible-scroll bg-white">
                     <table class="table w-full max-h-fit">
                        <thead class="w-full sticky top-0 z-20">
                           <tr>
                              <th>#</th>
                              <th>Food</th>
                              <th>Category</th>
                              <th>Stock</th>
                              <th>Available</th>
                              <th>Action</th>
                           </tr>
                        </thead>
                        <tbody id="product-list">
                           ${products && Array.isArray(products) ?
            products.map((item, index) => InventoryItem.render(item, index)).join("") : ""
         }
                        </tbody>
                     </table>
                    </div>

                </div>
                ${await Sidebar.render()}
                </div>
   `
   },

   handleEvents() {
      Header.handleEvent();
      InventoryItem.handleEvents()
   },
};
export default InventoryPage;
