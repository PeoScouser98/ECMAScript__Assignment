const Sidebar = {
	render() {
		return /* html */ `
       <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label> 
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
        <!-- Sidebar content here -->
        <li><a>Home</a></li>
        <li><a>Product</a></li> 
        <li><a>About Us</a></li>
        <li><a>Contact Us</a></li>
      </ul>
    </div>
          `;
	},
};
export default Sidebar;
