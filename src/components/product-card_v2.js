const ProductCard_v2 = {
	render(item) {
		return /* html */ `
         <div class="flex flex-col gap-5">
            <a href="/#/product/${item.id}"><img src="${item.image}" class="max-w-full h-[200px] object-cover object-center rounded-2xl"/></a>
            <a href="/#/product/${item.id}" class="text-[#F54748] font-semibold text-lg hover:link">${item.name}</a>
            <div class="flex items-start gap-10">
               <span class="inline-flex items-center gap-1"><img src="../../assets/img/Timer.svg" alt="" loading="lazy"> 30s</span>
               <span class="inline-flex item-center gap-1">
                  <img src="../../assets/img/ForkKnife.svg" alt="" loading="lazy"> ${item.category.name}
               </span>
            </div>
         </div>
      `;
	},
};
export default ProductCard_v2;
