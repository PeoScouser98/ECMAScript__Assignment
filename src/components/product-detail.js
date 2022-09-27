import instance from "../api/axios.config";
import { $ } from "../utils/common";
import Header from "../components/header";
import Footer from "../components/footer";
import Sidebar from "../components/sidebar";
import ProductCard from "../components/product-card";
import { addCart } from "../utils/handle-cart";

const ProductDetailsPage = {
	async render(id) {
		// console.log(id);
		const product = await instance.get(`/products/${id}`);
		// console.log(product);
		if (!product) return /* html */ `<div class="alert alert-error">Not found</div>`;
		const { products } = await instance.get(`/categories/${product.categoryId}?_embed=products`);
		console.log(products);
		return /* html */ `
      <div class="max-w-6xl mx-auto  drawer">
            <input id="my-drawer-3" type="checkbox" class="drawer-toggle" /> 
				<div class="drawer-content invisible-scroll flex flex-col">
                ${Header.render()}

				  <main class="py-10 px-5 flex flex-col gap-12">
				  <section>
                  <div class="grid gap-10 items-stretch sm:grid-cols-1 md:grid-cols-2 lg:gird-cols-2 xl:grid-cols-2">
                     <div class="flex flex-col gap-5">
                        <h1 class="text-4xl font-bold">${product.name}</h1>
                        <h3 class="font-semibold text-3xl text-[color:var(--primary-color)] mb-3">$${product.price}</h3>
                        <p class="mb-3">${product.desc}</p>
                        <form action="" id="add-product__form">
                           <input type="number" name="qty" min="0" max="${
								product.stock
							}" class="input input-bordered min-w-[200px]" placeholder="Quantity">
                           <input type="hidden" name="id" value="${product.id}">
                           <input type="hidden" name="name" value="${product.name}">
                           <input type="hidden" name="price" value="${product.price}">
                           <input type="hidden" name="img" value="${product.image}">
                           <input type="hidden" name="stock" value="${product.stock}">
                           <button type="submit" class="btn">Add to Cart</button>
                        </form>
                     </div>

                     <div><img src="${product.image}" alt="" class="max-w-full h-full object-cover object-center"></div>
                  </div>
              </section>
              <!-- products list-->
					<section class="mt-10">
                  <h3 class="font-semibold text-2xl mb-5">Related products</h3>
                  <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-x-8 gap-y-16">
                     ${products?.map((item) => ProductCard.render(item)).join("")}
                  </div>
               </section>
				  
					<!-- categories list -->
               
                <div class="divider"></div>
					 </main>
					 <footer> ${Footer.render()}</footer>
            </div> 
            ${Sidebar.render()}
        </div>

        
      `;
	},
	handleEvents() {
		const addProductForm = $("#add-product__form");
		if (addProductForm)
			addProductForm.addEventListener("submit", (e) => {
				e.preventDefault();
				const item = {
					id: addProductForm["id"].value,
					name: addProductForm["name"].value,
					price: addProductForm["price"].value,
					img: addProductForm["img"].value,
					stock: addProductForm["stock"].value,
					qty: addProductForm["qty"].value,
				};
				console.log(item);
				addCart(item);
			});
	},
};
export default ProductDetailsPage;
