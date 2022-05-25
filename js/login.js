const authStructure = [
    {
        user: 'admin',
        pass: '12345678',
        logged: false,
        role: true,
    },
    {
        user: 'alejandro',
        pass: '12345678',
        logged: false,
        role: false,
    },
    {
        user: 'isaac',
        pass: '12345678',
        logged: false,
        role: false,
    }
]


const auth = new Auth();

class Login {
	constructor(form, fields) {
		this.form = form;
		this.fields = fields;
		this.validateonSubmit();
	}

	validateonSubmit() {
		let self = this;

		this.form.addEventListener("submit", (e) => {
			e.preventDefault();
			var error = 0;
			self.fields.forEach((field) => {
				const input = document.querySelector(`#${field}`);
				if (self.validateFields(input) == false) {
					error++;
				}
			});
			if (error == 0) {
				//do login api here
				if(auth.validateAuth())
				{
					this.form.submit();
				}
				else 
				{
					alert("Nombre o Contraseña son erroneos");
					return false;
				}
			}
		});
	}

	validateFields(field) {
		if (field.value.trim() === "") {
			this.setStatus(
				field,
				`${field.previousElementSibling.innerText} cannot be blank`,
				"error"
			);
			return false;
		} else {
			if (field.type == "password") {
				if (field.value.length < 8) {
					this.setStatus(
						field,
						`${field.previousElementSibling.innerText} must be at least 8 characters`,
						"error"
					);
					return false;
				} else {
					this.setStatus(field, null, "success");
					return true;
				}
			} else {
				this.setStatus(field, null, "success");
				return true;
			}
		}
	}

	setStatus(field, message, status) {
		const errorMessage = field.parentElement.querySelector(".error-message");

		if (status == "success") {
			if (errorMessage) {
				errorMessage.innerText = "";
			}
			field.classList.remove("input-error");
		}

		if (status == "error") {
			errorMessage.innerText = message;
			field.classList.add("input-error");
		}
	}
}

const form = document.querySelector(".loginForm");
if (form) {
	const fields = ["username", "password"];
	const validator = new Login(form, fields);
}
