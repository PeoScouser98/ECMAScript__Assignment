import * as filestack from "filestack-js";
import Header from "../../components/admin.header";
import Footer from "../../components/footer";
import Sidebar from "../../components/admin.sidebar";
import { $ } from "../../utils/common";
import validation from "../../utils/validate";
import toast from "../../components/toast";
import instance from "../../api/axios.config";
import { update } from "../../api/product";
import firebaseUpload from "../../services/firebase";

const EditProductPage = {
	async render(id) {
		const categories = await instance.get("/categories");
		const product = await instance.get(`/products/${id}`);
		console.log(product);
		return /* html */`
			<div class="drawer drawer-mobile">
				<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
				<div class="drawer-content flex flex-col justify-start gap-10 items-stretch max-h-screen bg-">
					<header class="min-w-full"> ${await Header.render()}</header>

					<div class="flex-1 px-10 sm:px-5">
						<form action="" id="edit-product--form" class="max-w-full mx-auto bg-white rounded-2xl shadow-2xl sm:p-5 p-10">
							<h1 class="text-center font-semibold text-3xl mb-10">Edit product</h1>
							<div class="grid grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-5 mb-10">
								<div class="flex flex-col justify-between sm:justify-start" >
									<input type="hidden" id="product-id" value="${product.id}">
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Product's name</label>
										<input type="text" id="name" class="input input-bordered" value="${product.name}" data-name="Product's name">
										<small class="text-error error-message"></small>
									</div>
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Price</label>
										<input type="number" id="price" value="${product.price}" class="input input-bordered" data-name="Price">
										<small class="text-error error-message"></small>
									</div>
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Stock</label>
										<input type="number" min="0" value="${product.stock}" id="stock" class="input input-bordered" data-name="Stock">
										<small class="text-error error-message"></small>
									</div>
		
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Category</label>
										<select name="" id="cate" class="select select-bordered" data-name="Category">
											${categories.map((cate) =>/* html */ `<option value="${cate.id}" ${cate.id == product.categoryId ? "selected" : ""}>${cate.name}</option>`,)}
											</select>
										<small class="text-error error-message"></small>
									</div>

									
								</div>

								<div>
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Description</label>
										<textarea name="" id="desc" cols="20" rows="5" class="textarea textarea-bordered" data-name="Description">${product.desc}</textarea>
										<small class="text-error error-message"></small>
									</div> 
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Image</label>
										<input type="file" name="" data-current="${product.image}" id="file" class="file hidden" data-name="Image"  accept="image/*">
										<div class="relative flex justify-center items-center w-[200px] h-[200px] border rounded-lg overflow-hidden">
											<label class="font-medium italic relative z-10 h-full w-full flex justify-center items-center bg-transparent text-zinc-300 duration-500 hover:bg-zinc-900 hover:text-white" for="file" >Upload</label>
											<img src="${product.image}" alt="" id="preview" class="absolute top-0 left-0 max-w-full h-full  object-cover object-center z-0">
										</div>
										<small class="text-error error-message"></small>
									</div> 
								</div>
							</div>
								
								<button type="submit" class="btn btn-primary w-fit">Save</button>
							</form>
						</div>
					</div>
					${await Sidebar.render()}
				</div>
      `;
	},

	handleEvents() {

		Header.handleEvent()
		const uploadBtn = $("#upload-btn");
		if (uploadBtn)
			uploadBtn.addEventListener("click", () => {

			});


		// preview before uploading
		const file = $("#file")
		const preview = $("#preview")
		if (file)
			file.onchange = (e) => {
				const url = URL.createObjectURL(e.target.files[0])
				if (preview)
					preview.src = url
			}
		const editProductForm = $("#edit-product--form");
		if (editProductForm) {
			editProductForm.addEventListener("submit", async (event) => {
				event.preventDefault();
				const productId = $("#product-id")
				const productName = $("#name");
				const price = $("#price");
				const stock = $("#stock");
				const category = $("#cate");
				const desc = $("#desc");
				let image;

				// if not pass through validation -> stop submitting
				if (!validation.areRequired(productName, price, stock, category, desc)) return;
				if (!validation.isValidFile(file, validation.allowedImgExt) && file.dataset.current != "") return
				validation.showMessage(file, "", "success")

				if (file.files[0])
					image = await firebaseUpload(file.files[0])
				console.log(image);
				const newProduct = {
					name: productName.value,
					price: price.value,
					stock: stock.value,
					cate: cate.value,
					desc: desc.value,
					image: image || file.dataset.current
				};

				const updatedProduct = await update(productId.value, newProduct);
				console.log(updatedProduct);
				toast("success", "Updated product successfully!");
			});
		}
	},
};

export default EditProductPage;
