import { $ } from "../utils/common";
import { logout } from "../api/auth";

const Header = {
	render() {
		const userData = JSON.parse(localStorage.getItem("auth"));
		const numOfItemsInCart = JSON.parse(localStorage.getItem("cart")).length;
		return /* html */ `
      <div class="w-full navbar justify-between bg-white">
        <div class="flex-none xl:hidden">
          <label for="my-drawer-3" class="btn hover:bg-transparent btn-ghost">
            <i class="bi bi-list"></i>        
          </label>
        </div> 
        
        <div class=" px-2 mx-2">
				<a href="/#/" ><img src="../../assets/img/Fudo..png" class="hover:cursor-pointer"/></a>
		  </div>
  
        <div class="hidden xl:block">
          <ul class="nav-menu flex justify-center items-center gap-10 font-medium">
            <!-- Navbar menu content here -->
            <li><a href="/#/">Home</a></li>
            <li><a href="/#/products">Products</a></li> 
            <li><a href="/#/about">Categories</a></li>
            <li><a href="/#/contact">Users</a></li>
          </ul>
        </div>
        <div class="flex items-center gap-5">
					
          <div class="dropdown dropdown-end">
					<label tabindex="0" class="inline-flex items-center gap-3 pr-5">
						<img src="${userData?.avatar}" class="rounded-full max-w-[50px] object-cover object-center"/>
						<span class="text-neutral font-medium sm:hidden">${userData?.username}</span>
						<i class="bi bi-chevron-compact-down font-medium sm:hidden"></i>
					</label>
					<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box max-w-xs">
						<li><a><i class="bi bi-person"></i> Account <span class="badge badge-lg sm:block">${userData?.username}</span></a></li>
						<li id="logout__btn"><a><i class="bi bi-arrow-bar-left"></i> Logout</a></li>
					</ul>
				</div>
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
