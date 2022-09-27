const HeroBanner = {
	render() {
		return /* html */ `
            <div class="flex justify-between items-stretch sm:flex-col-reverse md:flex-cols-reverse gap-10 flex-grow">
            <!-- col-left -->
                <div class="flex flex-col gap-10 basis-1/2">
                    <span class="bg-[#F54748]/20 text-[color:var(--primary-color)] rounded-lg px-5 py-3 w-fit">Quality Food</span>
                    <h1 class="font-bold text-7xl mb-5">Fastest <br> <span class="text-[color:var(--primary-color)]">Delivery</span>  & <br> Easy <span class="text-[color:var(--primary-color)]">Pickup</span> </h1>
                    <p>Best cooks and best delivery guys all at your service. Hot tasty food will reach you in 60 minutes.</p>
                    <div class="form-control">
                    <div class="input-group">
                        <input type="text" placeholder="Enter your delivery location" class="min-w-[300px] input border border-[#F54748] focus:outline-none" />
                        <button class="btn btn-primary">Discover</button>
                    </div>
                    </div>
                </div>
                <!-- col-right-->
                <div class="basis-1/2">
                    <img src="../../assets/img/home-hero.png" alt="">
                </div>
            </div>
  
        `;
	},
};
export default HeroBanner;
