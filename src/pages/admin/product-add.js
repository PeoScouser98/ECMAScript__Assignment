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
		return /* html */ `
         <div class="drawer">
            <input type="checkbox" name="" class="drawer-toggle" id="my-drawer-3">
            <div class="drawer-content ">
                 <header class="max-w-6xl mx-auto">
               ${Header.render()}
            </header>
            <main class="my-10 bg-zinc-100 p-10">
            <form action="" id="add-product--form" class="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-5">
               <h1 class="text-center font-semibold text-3xl">Add Product</h1>
                  <div class="form-control gap-1 mb-5">
                     <label for="">Product's name</label>
                     <input type="text" id="name" class="input input-bordered" data-name="">
                     <small class="text-error error-message"></small>
                  </div>
                  <div class="form-control gap-1 mb-5">
                     <label for="">Price</label>
                     <input type="number" id="price" class="input input-bordered" data-name="">
                     <small class="text-error error-message"></small>
                  </div>
                  <div class="form-control gap-1 mb-5">
                     <label for="">Stock</label>
                     <input type="number" min="0" id="stock" class="input input-bordered" data-name="">
                     <small class="text-error error-message"></small>
                  </div>
              
                  <div class="form-control gap-1 mb-5">
                     <label for=""></label>
                     <select name="" id="cate" class="select select-bordered" data-name="">
                        ${categories.map((cate) => /* html */ `<option value="${cate.id}">${cate.name}</option>`)}
                     </select>
                     <small class="text-error error-message"></small>
                  </div>
                  <div class="form-control gap-1 mb-5">
                     <label for="">Image</label>
                     <button type="button" id="upload-btn" class="btn btn-primary w-fit">Choose image</button>
                     <small class="text-error error-message"></small>
                  </div>
                   <div class="form-control gap-1 mb-5">
                     <label for="">Description</label>
                     <textarea name="" id="desc" cols="30" rows="10" class="textarea textarea-bordered" data-name=""></textarea>
                     <small class="text-error error-message"></small>
                  </div> 
                  <button type="submit" class="btn btn-primary btn-block">Create new</button>
               </form>
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
