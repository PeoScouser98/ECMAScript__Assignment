import * as filestack from "filestack-js";
import Header from "../../components/admin.header";
import Footer from "../../components/footer";
import Sidebar from "../../components/admin.sidebar";
import instance from "../../api/axios.config";
import { $ } from "../../utils/common";
import validation from "../../utils/validate";
import { create } from "../../api/product";
import toast from "../../components/toast";

const AddProductPage = {
	async render() {
		const categories = await instance.get("/categories");
		const products = await instance.get("/products?_expand=category");
		return /* html */ `
         <div class="drawer">
            <input type="checkbox" name="" class="drawer-toggle" id="my-drawer-3">
            <div class="drawer-content ">
                 <header class="max-w-6xl mx-auto">
               ${Header.render()}
            </header>
            <main class="my-10 bg-zinc-100 p-10">
               <table class="table">
                  <thead>
                     <tr>
                        <th>#</th>
                        <th>Food</th>
                        <th>Quantity</th>
                        <th>Category</th>
                        <th>Out of stock</th>
                        <th>Action</th>
                     </tr>
                  </thead>
                  <tbody id="product-list">
                     ${products.map((item,index) => /* html */ `
                        <tr>
                           <td>${index+1}</td>
                           <td>${item.name}</td>
                           <td>${item.}</td>
                           <td></td>
                           <td></td>
                           <td></td>
                        </tr>
                     `)}
                     
                  </tbody>
               </table>
            </main>
            <footer class="max-w-6xl mx-auto">
               ${Footer.render()}
            </footer>
            </div>
          ${Sidebar.render()}
         </div>
      `;
	},
	handleEvents() {
		const { role } = JSON.parse(localStorage.getItem("auth"));
		if (role != 1) {
			toast("error", "You don't have permission to access to this page!");
			window.location.href = "/#/";
		}

		Header.handleEvent();

		let file;
		const uploadBtn = $("#upload-btn");
		if (uploadBtn)
			uploadBtn.addEventListener("click", () => {
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
						file = filesUploaded[0].url;
						console.log(file);
					},
				};
				client.picker(option).open();
			});
		const addProductForm = $("#add-product--form");
		if (addProductForm) {
			addProductForm.addEventListener("submit", (event) => {
				event.preventDefault();
				const productName = $("#name");
				const price = $("#price");
				const stock = $("#stock");
				const category = $("#cate");
				const desc = $("#desc");

				if (!validation.areRequired(productName, price, stock, category, desc)) return;

				const newProduct = {
					name: productName.value,
					price: price.value,
					stock: stock.value,
					categoryId: category.value,
					desc: desc.value,
					image: file,
				};
				console.log(newProduct);
				const res = create(newProduct);
				if (res) toast("success", "Create product successfully!");
				event.target.reset();
			});
		}
	},
};
export default AddProductPage;
