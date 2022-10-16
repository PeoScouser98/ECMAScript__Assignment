import { $ } from "../utils/common";
import { logout } from "../api/auth";
import { getUser } from "../api/auth";
import router from "../main";

const Header = {
	async render() {
		const user = await getUser()

		return /* html */ `
			<div class="w-full navbar justify-between bg-white px-10">
				<div class="flex-none xl:hidden">
					<label for="my-drawer-2" class="btn hover:bg-transparent btn-ghost">
						<i class="bi bi-list"></i>
					</label>
				</div>
				   <div class="text-sm breadcrumbs">
						<div class="text-xl breadcrumbs">
							<ul id="breadcrums-path">
								<li><a href="/#/admin/dashboard" class="capitalize">Admin</a></li> 
							</ul>
						</div>
					</div>

				<div class="flex justify-end items-center gap-5">
					<div class="flex justify-start items-center gap-3  px-3 rounded-full bg-zinc-100">
						<label for=""><i class="bi bi-search"></i></label>
						<input type="text" placeholder="Search ..." class="py-2 border-none bg-transparent focus:outline-none">
					</div>
	
					<div class="flex items-center gap-5">
						<div class="dropdown dropdown-end">
							<label tabindex="0" class="inline-flex items-center gap-3 pr-5 rounded-full bg-zinc-100 py-[2px]">
								<img src="${user?.avatar}" class="rounded-full max-w-[40px] object-cover object-center" />
								<span class="font-medium">${user.username}</span>
								<i class="bi bi-caret-down-fill text-xs"></i>
							</label>
							<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box max-w-xs">
								<li><a><i class="bi bi-person"></i> Account <span class="badge badge-lg sm:block">${user?.username}</span></a></li>
								<li id="logout__btn"><a><i class="bi bi-arrow-bar-left"></i> Logout</a></li>
							</ul>
						</div>
					</div>
				</div>
			</div>
          `;
	},
	handleEvent() {
		console.log(router.current[0].url);
		const paths = router.current[0].url.split("/")
		const breadcrumsPath = $("#breadcrums-path")
		if (breadcrumsPath)
			paths.forEach((path, index) => {
				if (index + 1 < paths.length)
					breadcrumsPath.innerHTML += /* html */`<li><a href="/#/admin/${paths[index + 1]}" class="capitalize">${paths[index + 1].replace("-", " ")}</a></li>`
			})
		const logoutBtn = $("#logout__btn");
		if (logoutBtn)
			logoutBtn.addEventListener("click", () => {
				logout();
			});
	},
};
export default Header;
