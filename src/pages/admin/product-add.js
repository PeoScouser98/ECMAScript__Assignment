import Header from "../../components/admin.header";
import Footer from "../../components/footer";
import Sidebar from "../../components/admin.sidebar";
import instance from "../../api/axios.config";
import { $ } from "../../utils/common";
import validation from "../../utils/validate";
import { create } from "../../api/product";
import toast from "../../components/toast";

import firebaseUpload from "../../services/firebase";

const AddProductPage = {
	async render() {
		const categories = await instance.get("/categories");

		return /* html */`
			<div class="drawer drawer-mobile">
				<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
				<div class="drawer-content flex flex-col justify-start gap-10 items-stretch max-h-screen bg-">
					<header class="min-w-full"> ${await Header.render()}</header>

					<div class="flex-1 px-10 sm:px-5">
						<form action="" id="edit-product--form" class="max-w-full mx-auto bg-white rounded-2xl shadow-2xl sm:p-5 p-10">
							<h1 class="text-center font-semibold text-3xl mb-10">Add product</h1>
							<div class="grid grid-cols-2 gap-10 sm:grid-cols-1 sm:gap-5 mb-10">
								<div class="flex flex-col justify-between sm:justify-start" >
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Product's name</label>
										<input type="text" id="name" class="input input-bordered" data-name="Product's name">
										<small class="text-error error-message"></small>
									</div>
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Price</label>
										<input type="number" id="price" class="input input-bordered" data-name="Price">
										<small class="text-error error-message"></small>
									</div>
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Stock</label>
										<input type="number" min="0" id="stock" class="input input-bordered" data-name="Stock">
										<small class="text-error error-message"></small>
									</div>
		
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Category</label>
										<select name="" id="cate" class="select select-bordered" data-name="Category">
											${categories.map((cate) =>/* html */ `<option value="${cate.id}">${cate.name}</option>`,)}
											</select>
										<small class="text-error error-message"></small>
									</div>

									
								</div>

								<div>
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Image</label>
										<input type="file" name="" id="file" class="file hidden" data-name="Image"  accept="image/*">
										<div class="relative flex justify-center items-center w-[200px] h-[200px] border rounded-lg overflow-hidden">
											<label class="font-medium italic relative z-10 h-full w-full flex justify-center items-center bg-transparent text-zinc-300 duration-500 hover:bg-zinc-900 hover:text-white" for="file" >Upload</label>
											<img src="" alt="" id="preview" class="absolute top-0 left-0 max-w-full h-full  object-cover object-center z-0">
										</div>
										<small class="text-error error-message"></small>
									</div> 
									<div class="form-control gap-1 mb-5">
										<label class="font-medium italic" for="">Description</label>
										<textarea name="" id="desc" cols="20" rows="5" class="textarea textarea-bordered" data-name="Description"></textarea>
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

		const addProductForm = $("#add-product--form");
		if (addProductForm) {
			addProductForm.addEventListener("submit", async (event) => {
				event.preventDefault();
				const productName = $("#name");
				const price = $("#price");
				const stock = $("#stock");
				const category = $("#cate");
				const desc = $("#desc");

				// if not pass through validation -> stop submitting
				if (!validation.areRequired(productName, price, stock, category, desc, file)) return;

				try {
					const image = await firebaseUpload(file.files[0])
					console.log(image && typeof image == "string");
					if (image) {
						const newProduct = {
							name: productName.value,
							price: price.value,
							stock: stock.value,
							categoryId: category.value,
							desc: desc.value,
							image: image,
						};

						const res = await create(newProduct);
						if (res) toast("success", "Create product successfully!");

						console.log(res);
						event.target.reset();
					}
				} catch (error) {
					return Promise.reject(error)
				}

			});
		}
	},
};
export default AddProductPage;
