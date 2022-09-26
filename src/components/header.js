import { $ } from "../utils/common";
import { logout } from "../api/auth";

const Header = {
	render() {
		const userData = JSON.parse(localStorage.getItem("auth"));
		console.log(userData);
		return /* html */ `
      <div class="w-full navbar justify-between bg-white">
        <div class="flex-none xl:hidden">
          <label for="my-drawer-3" class="btn btn-square btn-ghost">
            <i class="bi bi-list"></i>        
          </label>
        </div> 
        
        <div class=" px-2 mx-2"><img src="../../assets/img/Fudo..png"/></div>
  
        <div class="hidden lg:block">
          <ul class="nav-menu flex justify-center items-center gap-10 font-medium">
            <!-- Navbar menu content here -->
            <li><a>Home</a></li>
            <li><a>Product</a></li> 
            <li><a>About Us</a></li>
            <li><a>Contact Us</a></li>
          </ul>
        </div>
        <div class="flex items-center gap-5">
            ${
				userData != null
					? /* html */ `
          <div class="dropdown dropdown-end">
					<label tabindex="0" class="inline-flex items-center gap-3 pr-5">
						<img src="${userData?.avatar}" class="rounded-full max-w-[50px] object-cover object-center"/>
						<span class="text-neutral font-medium">${userData?.username}</span>
						<i class="bi bi-chevron-compact-down font-medium"></i>
					</label>
					<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
						<li><a><i class="bi bi-person"></i> Account</a></li>
						<li id="logout__btn"><a><i class="bi bi-arrow-bar-left"></i> Logout</a></li>
					</ul>
				</div>
           
         `
					: /* html */ `
            <a href="/#/" role="button" class="btn btn-ghost text-2xl"><i class="bi bi-cart3"></i></a>
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
