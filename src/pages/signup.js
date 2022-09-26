import validation from "../utils/validate";
import { $ } from "../utils/common";
import instance from "../api/axios.config";
import { signup } from "../api/auth";
import toast from "../components/toast";

const SignupPage = {
	render() {
		return /* html */ `
		<div class="flex justify-center my-10">
			<div>
				<div class="flex justify-center mb-20"><img src="../../assets/img/Fudo..png" alt=""></div>
				<p class="text-center">Welcome to Fudo</p>
				<h1 class="font-bold text-center text-3xl mb-10">Create Account</h1>
				<form action="" id="signup__form" class="min-w-[375px] flex flex-col gap-2">
					<div class="form-control gap-2">
						<label for="">Email</label>
						<input type="email" id="email" class="input border-[#37A9CD]" data-name="Email" placeholder="example@gmail.com">
						<small class="error-message text-error font-medium"></small>
					</div>
					<div class="form-control gap-2">
						<label for="">Fullname</label>
						<input type="text" id="username" class="input border-[#37A9CD]" data-name="Fullname" placeholder="Username">
						<small class="error-message text-error font-medium"></small>
					</div>
					<div class="form-control gap-2">
						<label for="">Password</label>
						<input type="password" id="password" class="input border-[#37A9CD]" data-name="Password" placeholder="********">
						<small class="error-message text-error font-medium"></small>
					</div>
					<div class="form-control gap-2">
						<label for="">Re-Password</label>
						<input type="password" id="cfm-password" class="input border-[#37A9CD]" data-name="Confirm password" placeholder="********">
						<small class="error-message text-error font-medium"></small>
					</div>
					<button type="submit" class="btn bg-[#37A9CD] hover:bg-[#37A9CD] border-none outline-none">Create Now</button>
				</form>
			</div>

		</div>`;
	},
	handleEvents() {
		const form = $("#signup__form");
		if (form)
			form.addEventListener("submit", async (event) => {
				event.preventDefault();
				const email = $("#email");
				const username = $("#username");
				const password = $("#password");
				const confirmPassword = $("#cfm-password");
				if (!validation.areRequired(email, username, password, confirmPassword)) return;
				if (!validation.isEmail(email)) return;
				if (!validation.isValidPassword(password)) return;
				if (!validation.ckMatchingValue(password, confirmPassword)) return;

				const data = {
					email: email.value,
					username: username.value,
					password: password.value,
					avatar: "../../assets/img/",
					role: 0,
				};
				try {
					const existedUsers = await instance.get("/users");
					console.log(existedUsers);
					if (existedUsers) {
						const isExisted = existedUsers.find((user) => user.email == data.email) != undefined;
						if (isExisted) {
							validation.showMessage(email, "Account already existed!", "error");
							return;
						}
					}
					const user = await signup(data);
					if (!user) {
						toast("error", "Failed to signup!");
						return;
					}
					toast("success", "Signed up successfully!");
					console.log(user);
				} catch (error) {
					console.log(error.message);
				}
			});
	},
};
export default SignupPage;
