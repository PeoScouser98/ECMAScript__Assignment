import instance from "../api/axios.config";

const Footer = {
    async render() {
        const settings = await instance.get("/settings")

        return /* html */ `
        <div class="navbar bg-base-100 max-w-6xl mx-auto">
            <div class="flex-1">
                <a href="/#/" class=" px-2 mx-2"><img src="${settings.logo}" class="hover:cursor-pointer max-w-[160px] object-contain object-center"/></a>
            </div>
            <div class="flex-none">
            <ul class="nav-menu flex justify-center items-center gap-10 font-medium">
                    <li><a>Home</a></li>
                    <li><a>Product</a></li> 
                    <li><a>About Us</a></li>
                    <li><a>Contact Us</a></li>
                </ul>
            </div>
        </div>
        `;
    },
};
export default Footer;
