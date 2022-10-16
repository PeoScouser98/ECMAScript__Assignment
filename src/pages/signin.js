import validation from "../utils/validate";
import { $ } from "../utils/common";
import { signin } from "../api/auth";
import toast from "../components/toast";

const SiginPage = {
	render() {
		return /* html */ `
		<div class="flex justify-center my-10">
			<div>
				<div class="flex justify-center mb-20"><img src="../../assets/img/Fudo..png" alt=""></div>
				<p class="text-center">Welcome back</p>
				<h1 class="font-bold text-center text-3xl mb-10">Login to your account</h1>
				<form action="" id="signin__form" class="min-w-[375px] flex flex-col gap-2">
					<div class="form-control gap-2">
						<label for="">Email</label>
						<input type="email" id="email" class="input border-[#37A9CD]" data-name="Email" placeholder="example@gmail.com">
						<small class="error-message text-error font-medium"></small>
					</div>
					
					<div class="form-control gap-2">
						<label for="">Password</label>
						<input type="password" id="password" class="input border-[#37A9CD]" data-name="Password" placeholder="********">
						<small class="error-message text-error font-medium"></small>
					</div>
					
					<button type="submit" class="btn bg-[#37A9CD] hover:bg-[#37A9CD] border-none outline-none">Sign in</button>
					<a href="" role="button" class="btn bg-neutral gap-2"><img src="../../assets/img/iconfinder_Google_1298745 1.svg" alt=""> Or sign-in with google</a>
					<div class="flex flex-col gap-3 my-5">
						<a href="/#/forgot-password" class="font-medium text-center text-[#37A9CD] hover:link">Forgot password?</a>
						<p class="font-medium text-center">Don't have account ? <a href="/#/signup" class="text-[#37A9CD] hover:link">Join free today</a></p>	
					</div>
				</form>
			</div>

		</div>`;
	},
	handleEvents() {
		const form = $("#signin__form");
		if (form)
			form.addEventListener("submit", async (event) => {
				event.preventDefault();
				const email = $("#email");
				const password = $("#password");

				if (!validation.areRequired(email, password)) return;
				if (!validation.isEmail(email)) return;

				try {
					const userData = await signin({
						email: email.value,
						password: password.value,

					});

					if (!userData) {
						toast("error", "Failed to sign in!");
						return;
					}
					const { accessToken, user } = userData;
					toast("success", "Sign in successfully!");
					localStorage.setItem("auth", JSON.stringify({ id: user.id, email: user.email }));
					localStorage.setItem("accessToken", accessToken);

					console.log(user)
					if (user.role == 1) window.location.href = "/#/admin/dashboard";
					else window.location.href = "/#/";
				} catch (error) {
					console.log(error);
				}

			});
	},
};
export default SiginPage;
