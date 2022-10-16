import { $ } from "../utils/common";
import { logout } from "../api/auth";
import { getUser } from "../api/auth";
import instance from "../api/axios.config";

const Header = {
	async render() {
		const user = await getUser()
		const settings = await instance.get("/settings")
		const numOfItemsInCart = JSON.parse(localStorage.getItem("cart")).length;
		return /* html */ `
			<div class="w-full navbar justify-between bg-white sticky top-0 z-50 max-w-6xl mx-auto">
				<div class="flex-none xl:hidden">
					<label for="my-drawer-3" class="btn btn-ghost hover:bg-transparent">
						<i class="bi bi-list"></i>
					</label>
				</div>

				<div class=" px-2 mx-2">
					<a href="/#/"><img src="${settings.logo}" class="hover:cursor-pointer max-w-[160px] object-contain object-center" /></a>
				</div>

				<div class="hidden xl:block">
					<ul class="nav-menu flex justify-center items-center gap-10 font-medium">
						<!-- Navbar menu content here -->
						<li><a href="/#/">Home</a></li>
						<li><a href="/#/products">Product</a></li>
						<li><a href="/#/about">About Us</a></li>
						<li><a href="/#/contact">Contact Us</a></li>
					</ul>
				</div>
				<div class="flex items-center gap-5">
					<div class="indicator">
						<div class="indicator-item w-5 h-5 rounded-full bg-[color:var(--primary-color)] inline-flex items-center justify-center text-[#fff]">
							<span id="cart-counter">${numOfItemsInCart}</span>
						</div>
						<a href="/#/cart" class="text-2xl"><i class="bi bi-cart3"></i></a>
					</div>
						${user
				? /* html */ `
					<div class="dropdown dropdown-end">
								<label tabindex="0" class="inline-flex items-center gap-3 pr-5 bg-zinc-200 rounded-full">
									<img src="${user?.avatar}" class="rounded-full max-w-[40px] object-cover object-center"/>
									<span class="text-neutral font-medium sm:hidden">${user?.username}</span>
									<i class="bi bi-caret-down-fill text-xs"></i>
								</label>
								<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
									<li><a><i class="bi bi-person"></i> Account</a></li>
									<li id="logout__btn"><a><i class="bi bi-arrow-bar-left"></i> Logout</a></li>
								</ul>
							</div>
					`
				: /* html */ `
					<a href="/#/signin" role="button"  class="btn btn-outline-primary">Sign in</a>
					<a href="/#/signup" role="button" class="btn btn-primary">Sign up</a>`
			}
				</div>
			</div >
          `;
	},
	handleEvent() {
		const logoutBtn = $("#logout__btn");
		if (logoutBtn)
			logoutBtn.addEventListener("click", () => {
				logout();
			});
	},
};
export default Header;
