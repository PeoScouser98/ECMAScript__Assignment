import instance from "../api/axios.config";


const Sidebar = {
	async render() {
		const settings = await instance.get("/settings")

		return /* html */ `
		<div class="drawer-side sm:bg-white">
			<label for="my-drawer-2" class="drawer-overlay"></label>
			<ul class="menu p-4 overflow-y-auto w-80 bg-base-100 bg-zinc-200">
				<a href="/#/admin/dashboard" class="block mb-10 w-full p-5 hover:cursor-pointer">
					<img src="${settings.logo}" alt="" class="text-center max-w-[160px] h-auto object-contain object-center">
				</a>
				<!-- Sidebar content here -->
				<li class="font-bold text-xl p-2">Main</li>
				<li><a href="/#/admin/dashboard"><i class="bi bi-house"></i> Dashboard</a></li>
				<li><a href="/#/admin/analytic"><i class="bi bi-bar-chart"></i> Analytic</a></li>
				<li><a href="/#/admin/customers"><i class="bi bi-people"></i> Customers</a></li>
				<li><a href="/#/admin/orders"><i class="bi bi-receipt"></i> Orders</a></a></li>
				<li class="font-bold text-xl p-2">Products</li>
				<li><a href="/#/admin/inventory"><i class="bi bi-shop-window"></i> Inventory</a></li>
				<li><a href="/#/admin/inventory/add-product"><i class="bi bi-plus"></i> Add New</a></li>
				<li class="font-bold text-xl p-2">Site Settings</li>
				<li><a href="/#/admin/site-settings"><i class="bi bi-gear"></i> Settings</a></li>
			</ul>
		</div>
          `;
	},
};
export default Sidebar;
