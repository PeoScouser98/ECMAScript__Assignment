const Sidebar = {
	render() {
		return /* html */ `
       <div class="drawer-side">
      <label for="my-drawer-3" class="drawer-overlay"></label> 
      <ul class="menu p-4 overflow-y-auto w-80 bg-base-100">
        <!-- Sidebar content here -->
        <li><a href="/#/admin/home">Home</a></li>
        <li><a href="/#/admin/product">Products</a></li> 
        <li><a href="/#/admin/category">Categories</a></li>
        <li><a href="/#/admin/order">Orders</a></a></li>
      </ul>
    </div>
          `;
	},
};
export default Sidebar;
